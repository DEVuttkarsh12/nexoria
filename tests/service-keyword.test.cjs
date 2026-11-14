const test = require('node:test');
const assert = require('node:assert/strict');
const {loadSite, renderRoute} = require('../scripts/build.cjs');

const expected = {
  carryline: [/WhatsApp chatbots and AI voice agents in Hindi and English for businesses in India/, '/case-study/noir-clinic', 'Pune'],
  pledgedesk: [/custom CRM for real estate and sales teams in India/, '/case-study/luxe-estates', 'Mumbai'],
  intentpath: [/website design and development company in India/, '/case-study/velvet-co', 'Delhi'],
  flowback: [/AI workflow and business automation for businesses in India/, '/case-study/kinetic-logistics', 'Goa'],
  previewops: [/Custom software development for businesses in India/, '/case-study/pulse-fit-os', 'Bengaluru']
};

test('service heroes repeat the page search phrase visibly and link a real mapped project', async () => {
  const site = await loadSite();
  for (const [slug, [phrase, href, city]] of Object.entries(expected)) {
    const html = (await renderRoute(`/services/${slug}`, site)).html;
    const lede = /<p class="detail-hero-lede">([\s\S]*?)<\/p>/.exec(html);
    assert.ok(lede, `${slug} has no hero lede`);
    assert.match(lede[1], phrase);
    assert.ok(lede[1].includes(`href="${href}"`), `${slug} lede should link ${href}`);
    assert.ok(lede[1].includes(city), `${slug} lede should name ${city}`);
    assert.match(html, /<h1>[^<]+<\/h1>/);
  }
});
