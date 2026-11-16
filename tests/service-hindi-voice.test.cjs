const test = require('node:test');
const assert = require('node:assert/strict');
const {loadSite, renderRoute} = require('../scripts/build.cjs');

test('WhatsApp & Voice AI Agents page has a Hindi & English voice agent section built from the Noir Clinic case study', async () => {
  const site = await loadSite();
  const html = (await renderRoute('/services/carryline', site)).html;
  const section = /<section[^>]*id="hindi-voice-agents"[\s\S]*?<\/section>/.exec(html);
  assert.ok(section, 'section rendered');
  assert.match(section[0], /<h2 id="hindi-voice-title">AI voice agents that speak Hindi and English\.<\/h2>/);
  assert.match(section[0], /Hinglish/);
  assert.match(section[0], /Noir Clinic in Pune/);
  assert.match(section[0], /In 11 days/);
  assert.match(section[0], /0 missed calls in 4 months/);
  assert.ok(section[0].includes('href="/case-study/noir-clinic"'));
  assert.doesNotMatch(section[0], /₹|\$|Rs\.?\s?\d/);
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  const faq = ld.flatMap(d => d['@graph'] || [d]).find(n => n['@type'] === 'FAQPage');
  for (const q of [/Can an AI voice agent talk in Hindi and Hinglish\?/, /Do we need a new phone number for a Hindi voice agent\?/]) {
    assert.match(html, new RegExp(`<summary><span>${q.source}</span>`), 'visible FAQ');
    assert.ok(faq.mainEntity.find(x => q.test(x.name)), 'FAQPage schema');
  }
  for (const slug of ['pledgedesk', 'intentpath', 'flowback', 'previewops']) {
    const other = (await renderRoute(`/services/${slug}`, site)).html;
    assert.ok(!other.includes('id="hindi-voice-agents"'), `${slug} should not include the voice section`);
  }
});
