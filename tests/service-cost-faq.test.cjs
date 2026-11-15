const test = require('node:test');
const assert = require('node:assert/strict');
const {loadSite, renderRoute} = require('../scripts/build.cjs');

const expected = {
  carryline: /How much does a WhatsApp chatbot or AI voice agent cost in India\?/,
  pledgedesk: /How much does a custom CRM for real estate or sales teams cost in India\?/,
  intentpath: /How much does website design and development cost in India\?/,
  flowback: /How much does business automation cost in India\?/,
  previewops: /How much does custom software development cost in India\?/
};

test('service pages answer a key-term pricing question visibly and in FAQPage schema, without inventing prices', async () => {
  const site = await loadSite();
  for (const [slug, q] of Object.entries(expected)) {
    const html = (await renderRoute(`/services/${slug}`, site)).html;
    assert.match(html, new RegExp(`<summary><span>${q.source}</span>`), `${slug} visible FAQ`);
    const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
    const faq = ld.flatMap(d => d['@graph'] || [d]).find(n => n['@type'] === 'FAQPage');
    const item = faq.mainEntity.find(x => q.test(x.name));
    assert.ok(item, `${slug} FAQPage includes pricing question`);
    assert.match(item.acceptedAnswer.text, /custom-quoted/);
    assert.match(item.acceptedAnswer.text, /free 30-minute audit/);
    assert.doesNotMatch(item.acceptedAnswer.text, /₹|\$|Rs\.?\s?\d/);
  }
});
