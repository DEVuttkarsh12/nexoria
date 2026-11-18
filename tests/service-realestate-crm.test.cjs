const test = require('node:test');
const assert = require('node:assert/strict');
const {loadSite, renderRoute} = require('../scripts/build.cjs');

test('CRM page has a CRM for real estate in India section built from published case studies', async () => {
  const site = await loadSite();
  const html = (await renderRoute('/services/pledgedesk', site)).html;
  const section = /<section[^>]*id="real-estate-crm-india"[\s\S]*?<\/section>/.exec(html);
  assert.ok(section, 'section rendered');
  assert.match(section[0], /<h2 id="realestate-crm-title">CRM for real estate businesses in India\.<\/h2>/);
  assert.match(section[0], /Luxe Estates in Mumbai/);
  assert.match(section[0], /median first response was 6 hours/);
  assert.match(section[0], /In 16 days/);
  assert.match(section[0], /38s median speed-to-lead, 24\/7/);
  assert.match(section[0], /\+312% qualified viewings in 90 days/);
  assert.match(section[0], /90-day nurture/);
  assert.match(section[0], /Hearth &amp; Home in Kochi/);
  assert.match(section[0], /2\.6×/);
  assert.ok(section[0].includes('href="/case-study/luxe-estates"'));
  assert.ok(section[0].includes('href="/case-study/hearth-home"'));
  assert.doesNotMatch(section[0], /₹|\$|Rs\.?\s?\d|Cr\b/);
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  const faq = ld.flatMap(d => d['@graph'] || [d]).find(n => n['@type'] === 'FAQPage');
  for (const q of [/How fast can a real estate CRM follow up with new leads\?/, /How long does it take to set up a CRM for a real estate business\?/]) {
    assert.match(html, new RegExp(`<summary><span>${q.source}</span>`), 'visible FAQ');
    assert.ok(faq.mainEntity.find(x => q.test(x.name)), 'FAQPage schema');
  }
  assert.ok(faq.mainEntity.find(x => /from 6 hours to 38 seconds/.test(x.acceptedAnswer.text)));
  for (const slug of ['intentpath', 'carryline', 'flowback', 'previewops']) {
    const other = (await renderRoute(`/services/${slug}`, site)).html;
    assert.ok(!other.includes('id="real-estate-crm-india"'), `${slug} should not include the real estate CRM section`);
  }
});
