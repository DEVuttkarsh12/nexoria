const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const root = path.join(__dirname, '..');
const origin = 'https://www.zykken.com';
const slug = 'website-that-loads-fast-and-sells';

test('website development insight restates only published Velvet & Co and Hearth & Home facts and is linked both ways', async () => {
  const { insights, caseStudies } = await import(pathToFileURL(path.join(root, 'content.mjs')));
  const post = insights.find(i => i.slug === slug);
  assert.ok(post, 'article exists');
  assert.ok(`${post.seoTitle} — Zykken`.length <= 60, 'full title fits in 60 chars');
  assert.match(post.seoTitle, /Website Development in India/);
  assert.ok(post.description.length <= 160, 'description fits in 160 chars');
  assert.equal(post.faqs.length, 3);
  assert.deepEqual(post.cases, ['velvet-co', 'hearth-home']);
  const src = JSON.stringify(caseStudies.filter(c => post.cases.includes(c.slug)));
  // the source facts are published on the case studies
  for (const re of [/4\.2-second theme store converting at 0\.9%/, /18-day editorial rebuild on Next\.js/, /sub-second loads on 4G/, /one-click checkout/, /Hindi \+ English support/, /sizing, pairing and gifting/, /0\.9% → 3\.1%/, /"1\.1s"/, /LCP on 4G mobile/, /−41%/, /Support tickets in 60 days/, /Delhi/, /Sara Kapoor/, /handles sizing better than our old FAQ ever did/, /Kochi/, /"12 days"/, /under 60 seconds/, /60-day auto follow-up/, /2\.6×/, /no new hires/]) assert.match(src, re);
  const text = [post.intro, post.description, ...post.sections.flat(), ...post.faqs.flat()].join(' ');
  for (const fact of ['4.2-second', '0.9%', '3.1%', '1.1s', '18 days', 'Hindi + English', '41%', 'Delhi', 'Sara Kapoor', 'Kochi', '12 days', 'under 60 seconds', '2.6×']) assert.ok(text.includes(fact), `article states ${fact}`);
  assert.doesNotMatch(text, /₹|\$|Rs\.?\s?\d|per month|lakh|\bL\b/, 'no prices');
  for (const other of caseStudies.filter(c => !post.cases.includes(c.slug))) assert.ok(!text.includes(other.client), `does not cite ${other.client}`);

  const build = require('../scripts/build.cjs');
  const site = await build.loadSite();
  assert.ok(build.publicRoutes(site).includes(`/blog/${slug}`), 'in sitemap routes');
  const page = await build.renderRoute(`/blog/${slug}`, site);
  assert.equal(page.status, 200);
  for (const href of ['/case-study/velvet-co', '/case-study/hearth-home', '/services/intentpath']) assert.ok(page.html.includes(`href="${href}"`), `links ${href}`);
  for (const route of ['/services/intentpath', '/case-study/velvet-co', '/case-study/hearth-home']) {
    const p = await build.renderRoute(route, site);
    assert.ok(p.html.includes(`href="/blog/${slug}"`), `${route} links the article`);
  }
  const web = (await build.renderRoute('/services/intentpath', site)).html;
  const section = /<section[^>]*id="website-development-india"[\s\S]*?<\/section>/.exec(web)[0];
  assert.ok(section.includes(`href="/blog/${slug}"`), 'website development India section links the article');
  const graph = [...page.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1])).flatMap(b => b['@graph'] || [b]);
  const article = graph.find(n => n['@type'] === 'BlogPosting');
  assert.equal(article.url, `${origin}/blog/${slug}`);
  assert.deepEqual(article.about.map(a => a['@id']), [`${origin}/services/intentpath#service`]);
  const faq = graph.find(n => n['@type'] === 'FAQPage');
  assert.equal(faq.mainEntity.length, 3);
  const hub = await build.renderRoute('/insights', site);
  assert.ok(hub.html.includes(`href="/blog/${slug}"`), 'listed on /insights');
  assert.ok(hub.html.match(/<meta name="description" content="([^"]*)"/)[1].length <= 160);
});
