const test = require('node:test');
const assert = require('node:assert/strict');
const {loadSite, renderRoute} = require('../scripts/build.cjs');

test('Website Design & Development page has a website development in India section built from published case studies', async () => {
  const site = await loadSite();
  const html = (await renderRoute('/services/intentpath', site)).html;
  const section = /<section[^>]*id="website-development-india"[\s\S]*?<\/section>/.exec(html);
  assert.ok(section, 'section rendered');
  assert.match(section[0], /<h2 id="website-india-title">Website development for businesses in India\.<\/h2>/);
  assert.match(section[0], /Velvet &amp; Co in Delhi/);
  assert.match(section[0], /In 18 days/);
  assert.match(section[0], /1\.1s LCP on 4G mobile/);
  assert.match(section[0], /from 0\.9% to 3\.1%/);
  assert.match(section[0], /Hearth &amp; Home/);
  assert.match(section[0], /2\.6×/);
  assert.ok(section[0].includes('href="/case-study/velvet-co"'));
  assert.ok(section[0].includes('href="/case-study/hearth-home"'));
  assert.doesNotMatch(section[0], /₹|\$|Rs\.?\s?\d/);
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  const faq = ld.flatMap(d => d['@graph'] || [d]).find(n => n['@type'] === 'FAQPage');
  for (const q of [/How long does it take to build a business website\?/, /Can you build a website in Hindi and English\?/]) {
    assert.match(html, new RegExp(`<summary><span>${q.source}</span>`), 'visible FAQ');
    assert.ok(faq.mainEntity.find(x => q.test(x.name)), 'FAQPage schema');
  }
  for (const slug of ['pledgedesk', 'carryline', 'flowback', 'previewops']) {
    const other = (await renderRoute(`/services/${slug}`, site)).html;
    assert.ok(!other.includes('id="website-development-india"'), `${slug} should not include the website section`);
  }
});
