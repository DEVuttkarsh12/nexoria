const test = require('node:test');
const assert = require('node:assert/strict');
const {loadSite, renderRoute} = require('../scripts/build.cjs');

test('Business Automation page has an AI automation for businesses in India section built from published case studies', async () => {
  const site = await loadSite();
  const html = (await renderRoute('/services/flowback', site)).html;
  const section = /<section[^>]*id="ai-automation-india"[\s\S]*?<\/section>/.exec(html);
  assert.ok(section, 'section rendered');
  assert.match(section[0], /<h2 id="automation-india-title">AI automation for businesses in India\.<\/h2>/);
  assert.match(section[0], /Kinetic Logistics in Goa/);
  assert.match(section[0], /the ops team got 31h back per week/);
  assert.match(section[0], /billing disputes fell 50% in 60 days/);
  assert.match(section[0], /Hearth &amp; Home in Kochi/);
  assert.match(section[0], /first live in 2 days/);
  assert.match(section[0], /2\.6× with no new hires/);
  assert.match(section[0], /Luxe Estates in Mumbai/);
  assert.match(section[0], /38s median speed-to-lead, 24\/7/);
  for (const slug of ['kinetic-logistics', 'hearth-home', 'luxe-estates']) assert.ok(section[0].includes(`href="/case-study/${slug}"`), slug);
  assert.doesNotMatch(section[0], /₹|\$|Rs\.?\s?\d/);
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  const faq = ld.flatMap(d => d['@graph'] || [d]).find(n => n['@type'] === 'FAQPage');
  for (const q of [/What business tasks can AI automation handle\?/, /How long does it take to set up AI automation for a business\?/]) {
    assert.match(html, new RegExp(`<summary><span>${q.source}</span>`), 'visible FAQ');
    assert.ok(faq.mainEntity.find(x => q.test(x.name)), 'FAQPage schema');
  }
  for (const slug of ['pledgedesk', 'intentpath', 'carryline', 'previewops']) {
    const other = (await renderRoute(`/services/${slug}`, site)).html;
    assert.ok(!other.includes('id="ai-automation-india"'), `${slug} should not include the automation section`);
  }
});
