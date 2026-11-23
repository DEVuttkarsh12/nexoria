const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const root = path.join(__dirname, '..');
const origin = 'https://www.zykken.com';
const slug = 'automate-invoices-and-delivery-paperwork';

test('invoice/POD automation insight restates only published Kinetic Logistics facts and is linked both ways', async () => {
  const { insights, caseStudies } = await import(pathToFileURL(path.join(root, 'content.mjs')));
  const post = insights.find(i => i.slug === slug);
  assert.ok(post, 'article exists');
  assert.ok(`${post.seoTitle} — Zykken`.length <= 60, 'full title fits in 60 chars');
  assert.ok(post.description.length <= 160, 'description fits in 160 chars');
  assert.equal(post.faqs.length, 3);
  assert.deepEqual(post.cases, ['kinetic-logistics']);
  const kinetic = caseStudies.find(c => c.slug === 'kinetic-logistics');
  const src = JSON.stringify(kinetic);
  // the source facts are published on the case study
  for (const re of [/31h/, /Back per week/, /−50%/, /Billing disputes in 60 days/, /14 days/, /2 Looms/, /shipped 4 days early/, /driver update parser/, /Friday auto-reconciliation/, /POD \+ invoice/, /sheet \+ CRM/, /one inbox/, /Goa/]) assert.match(src, re);
  const text = [post.intro, post.description, ...post.sections.flat(), ...post.faqs.flat()].join(' ');
  for (const fact of ['31 hours a week', '50%', '60 days', '14 days', 'four days early', 'two Loom', 'Goa']) assert.ok(text.includes(fact), `article states ${fact}`);
  assert.doesNotMatch(text, /₹|\$|Rs\.?\s?\d|per month/, 'no prices');
  // no other client names or numbers sneak in
  for (const other of caseStudies.filter(c => c.slug !== 'kinetic-logistics')) assert.ok(!text.includes(other.client), `does not cite ${other.client}`);

  const build = require('../scripts/build.cjs');
  const site = await build.loadSite();
  assert.ok(build.publicRoutes(site).includes(`/blog/${slug}`), 'in sitemap routes');
  const page = await build.renderRoute(`/blog/${slug}`, site);
  assert.equal(page.status, 200);
  assert.ok(page.html.includes('href="/case-study/kinetic-logistics"'), 'links the case study');
  assert.ok(page.html.includes('href="/services/flowback"'), 'links the automation service');
  for (const route of ['/services/flowback', '/case-study/kinetic-logistics']) {
    const p = await build.renderRoute(route, site);
    assert.ok(p.html.includes(`href="/blog/${slug}"`), `${route} links the article`);
  }
  const graph = [...page.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1])).flatMap(b => b['@graph'] || [b]);
  const article = graph.find(n => n['@type'] === 'BlogPosting');
  assert.equal(article.url, `${origin}/blog/${slug}`);
  assert.deepEqual(article.about.map(a => a['@id']), [`${origin}/services/flowback#service`]);
  const faq = graph.find(n => n['@type'] === 'FAQPage');
  assert.equal(faq.mainEntity.length, 3);
  const hub = await build.renderRoute('/insights', site);
  assert.ok(hub.html.includes(`href="/blog/${slug}"`), 'listed on /insights');
  assert.ok(hub.html.match(/<meta name="description" content="([^"]*)"/)[1].length <= 160);
});
