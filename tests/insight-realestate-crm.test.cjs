const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const root = path.join(__dirname, '..');
const origin = 'https://www.zykken.com';
const slug = 'real-estate-crm-india';

test('real estate CRM insight restates only published Luxe Estates and Hearth & Home facts and is linked both ways', async () => {
  const { insights, caseStudies } = await import(pathToFileURL(path.join(root, 'content.mjs')));
  const post = insights.find(i => i.slug === slug);
  assert.ok(post, 'article exists');
  assert.ok(`${post.seoTitle} — Zykken`.length <= 60, 'full title fits in 60 chars');
  assert.match(post.seoTitle, /CRM for Real Estate in India/);
  assert.ok(post.description.length <= 160, 'description fits in 160 chars');
  assert.equal(post.faqs.length, 3);
  assert.deepEqual(post.cases, ['luxe-estates', 'hearth-home']);
  const src = JSON.stringify(caseStudies.filter(c => post.cases.includes(c.slug)));
  // the source facts are published on the case studies
  for (const re of [/Meta and portal leads into a shared inbox/, /Median first response was 6 hours/, /night and weekend enquiries sat until morning/, /In 16 days/, /WhatsApp \+ voice qualifier onto every ad and portal/, /instant CRM routing, duplicate detection/, /viewing scheduler synced to each agent's calendar/, /90-day nurture/, /Owners only ever see hot, booked viewings/, /\+312%/, /Qualified viewings in 90 days/, /"38s"/, /Median speed-to-lead, 24\/7/, /Mumbai/, /Aarav Mehta/, /Night enquiries get qualified before my team wakes up/, /agents only talk to people ready to visit/, /Kochi/, /"12 days"/, /follow-ups dying after day 2/, /under 60 seconds/, /60-day auto follow-up/, /2\.6×/, /no new hires/]) assert.match(src, re);
  const text = [post.intro, post.description, ...post.sections.flat(), ...post.faqs.flat()].join(' ');
  for (const fact of ['6 hours', '38 seconds', '312%', '90 days', '16 days', 'Mumbai', 'Aarav Mehta', '90-day nurture', 'Kochi', '12 days', 'day 2', 'under 60 seconds', '60 days', '2.6×', 'free 30-minute audit']) assert.ok(text.includes(fact), `article states ${fact}`);
  assert.doesNotMatch(text, /₹|\$|Rs\.?\s?\d|per month|lakh|crore|\bCr\b|\bL\b/, 'no prices or money figures');
  for (const other of caseStudies.filter(c => !post.cases.includes(c.slug))) assert.ok(!text.includes(other.client), `does not cite ${other.client}`);

  const build = require('../scripts/build.cjs');
  const site = await build.loadSite();
  assert.ok(build.publicRoutes(site).includes(`/blog/${slug}`), 'in sitemap routes');
  const page = await build.renderRoute(`/blog/${slug}`, site);
  assert.equal(page.status, 200);
  for (const href of ['/case-study/luxe-estates', '/case-study/hearth-home', '/services/pledgedesk']) assert.ok(page.html.includes(`href="${href}"`), `links ${href}`);
  for (const route of ['/services/pledgedesk', '/case-study/luxe-estates', '/case-study/hearth-home']) {
    const p = await build.renderRoute(route, site);
    assert.ok(p.html.includes(`href="/blog/${slug}"`), `${route} links the article`);
  }
  const crm = (await build.renderRoute('/services/pledgedesk', site)).html;
  const section = /<section[^>]*id="real-estate-crm-india"[\s\S]*?<\/section>/.exec(crm)[0];
  assert.ok(section.includes(`href="/blog/${slug}"`), 'real estate CRM India section links the article');
  const graph = [...page.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1])).flatMap(b => b['@graph'] || [b]);
  const article = graph.find(n => n['@type'] === 'BlogPosting');
  assert.equal(article.url, `${origin}/blog/${slug}`);
  assert.deepEqual(article.about.map(a => a['@id']), [`${origin}/services/pledgedesk#service`]);
  const faq = graph.find(n => n['@type'] === 'FAQPage');
  assert.equal(faq.mainEntity.length, 3);
  const hub = await build.renderRoute('/insights', site);
  assert.ok(hub.html.includes(`href="/blog/${slug}"`), 'listed on /insights');
  assert.ok(hub.html.match(/<meta name="description" content="([^"]*)"/)[1].length <= 160);
});
