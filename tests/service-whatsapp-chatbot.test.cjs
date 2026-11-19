const test = require('node:test');
const assert = require('node:assert/strict');
const {loadSite, renderRoute} = require('../scripts/build.cjs');

test('WhatsApp & Voice AI Agents page has a WhatsApp chatbot for businesses in India section built from published case studies', async () => {
  const site = await loadSite();
  const html = (await renderRoute('/services/carryline', site)).html;
  const section = /<section[^>]*id="whatsapp-chatbot-india"[\s\S]*?<\/section>/.exec(html);
  assert.ok(section, 'section rendered');
  assert.match(section[0], /<h2 id="whatsapp-chatbot-title">WhatsApp chatbots for businesses in India\.<\/h2>/);
  assert.match(section[0], /Luxe Estates in Mumbai/);
  assert.match(section[0], /from 6 hours to 38 seconds/);
  assert.match(section[0], /\+312% in 90 days/);
  assert.match(section[0], /Noir Clinic in Pune/);
  assert.match(section[0], /0 missed calls in 4 months/);
  assert.match(section[0], /Kinetic Logistics in Goa/);
  assert.match(section[0], /31h back per week, ops team/);
  for (const slug of ['luxe-estates', 'noir-clinic', 'kinetic-logistics']) assert.ok(section[0].includes(`href="/case-study/${slug}"`), slug);
  assert.doesNotMatch(section[0], /₹|\$|Rs\.?\s?\d/);
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  const faq = ld.flatMap(d => d['@graph'] || [d]).find(n => n['@type'] === 'FAQPage');
  for (const q of [/Can a WhatsApp chatbot reply in Hindi and English\?/, /Do we need the WhatsApp Business API for a WhatsApp chatbot\?/]) {
    assert.match(html, new RegExp(`<summary><span>${q.source}</span>`), 'visible FAQ');
    assert.ok(faq.mainEntity.find(x => q.test(x.name)), 'FAQPage schema');
  }
  for (const slug of ['pledgedesk', 'intentpath', 'flowback', 'previewops']) {
    const other = (await renderRoute(`/services/${slug}`, site)).html;
    assert.ok(!other.includes('id="whatsapp-chatbot-india"'), `${slug} should not include the WhatsApp section`);
  }
});
