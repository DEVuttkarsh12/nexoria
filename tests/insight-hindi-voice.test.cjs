const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const root = path.join(__dirname, '..');
const origin = 'https://www.zykken.com';
const slug = 'ai-voice-receptionist-hindi-english';

test('Hindi/English voice receptionist insight restates only published Noir Clinic facts and is linked both ways', async () => {
  const { insights, caseStudies } = await import(pathToFileURL(path.join(root, 'content.mjs')));
  const post = insights.find(i => i.slug === slug);
  assert.ok(post, 'article exists');
  assert.ok(`${post.seoTitle} — Zykken`.length <= 60, 'full title fits in 60 chars');
  assert.match(post.seoTitle, /Hindi/);
  assert.match(post.seoTitle, /AI Voice/);
  assert.ok(post.description.length <= 160, 'description fits in 160 chars');
  assert.equal(post.faqs.length, 3);
  assert.deepEqual(post.cases, ['noir-clinic']);
  const noir = caseStudies.find(c => c.slug === 'noir-clinic');
  const src = JSON.stringify(noir);
  // the source facts are published on the case study
  for (const re of [/40% of calls went unanswered at lunch and after hours/, /In 11 days/, /Hindi \+ English voice agent/, /WhatsApp reminders/, /books, reschedules, sends prep notes, confirms the day before/, /escalates anything urgent to a human instantly with full transcript/, /Zero change to the clinic's number/, /Missed calls in 4 months/, /mid-sentence/, /Pune/, /Dr\. Rohan Shah/]) assert.match(src, re);
  const text = [post.intro, post.description, ...post.sections.flat(), ...post.faqs.flat()].join(' ');
  for (const fact of ['40%', '11 days', 'zero missed calls in 4 months', 'mid-sentence', 'existing number', 'full transcript', 'Pune', 'Dr. Rohan Shah']) assert.ok(text.includes(fact), `article states ${fact}`);
  assert.doesNotMatch(text, /₹|\$|Rs\.?\s?\d|per month|per minute/, 'no prices');
  for (const other of caseStudies.filter(c => c.slug !== 'noir-clinic')) assert.ok(!text.includes(other.client), `does not cite ${other.client}`);

  const build = require('../scripts/build.cjs');
  const site = await build.loadSite();
  assert.ok(build.publicRoutes(site).includes(`/blog/${slug}`), 'in sitemap routes');
  const page = await build.renderRoute(`/blog/${slug}`, site);
  assert.equal(page.status, 200);
  assert.ok(page.html.includes('href="/case-study/noir-clinic"'), 'links the case study');
  assert.ok(page.html.includes('href="/services/carryline"'), 'links the WhatsApp & voice service');
  for (const route of ['/services/carryline', '/case-study/noir-clinic']) {
    const p = await build.renderRoute(route, site);
    assert.ok(p.html.includes(`href="/blog/${slug}"`), `${route} links the article`);
  }
  const carry = (await build.renderRoute('/services/carryline', site)).html;
  const voice = /<section[^>]*id="hindi-voice-agents"[\s\S]*?<\/section>/.exec(carry)[0];
  assert.ok(voice.includes(`href="/blog/${slug}"`), 'Hindi voice section links the article');
  const graph = [...page.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1])).flatMap(b => b['@graph'] || [b]);
  const article = graph.find(n => n['@type'] === 'BlogPosting');
  assert.equal(article.url, `${origin}/blog/${slug}`);
  assert.deepEqual(article.about.map(a => a['@id']), [`${origin}/services/carryline#service`]);
  const faq = graph.find(n => n['@type'] === 'FAQPage');
  assert.equal(faq.mainEntity.length, 3);
  const hub = await build.renderRoute('/insights', site);
  assert.ok(hub.html.includes(`href="/blog/${slug}"`), 'listed on /insights');
  assert.ok(hub.html.match(/<meta name="description" content="([^"]*)"/)[1].length <= 160);
});
