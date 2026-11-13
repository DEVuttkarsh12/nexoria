const test = require('node:test');
const assert = require('node:assert/strict');
const {loadSite, renderRoute} = require('../scripts/build.cjs');

const cases = ['luxe-estates', 'velvet-co', 'pulse-fit-os', 'noir-clinic', 'kinetic-logistics', 'hearth-home'];

test('every case study links to the services and articles behind it', async () => {
  const site = await loadSite();
  for (const slug of cases) {
    const html = (await renderRoute(`/case-study/${slug}`, site)).html;
    const m = /<section class="project-related"[\s\S]*?<\/section>/.exec(html);
    assert.ok(m, `${slug} has a Behind this project section`);
    assert.match(m[0], /href="\/services\/[a-z]+"/, `${slug} links a service`);
    assert.match(m[0], /href="\/blog\/[a-z-]+"/, `${slug} links an article`);
  }
  const luxe = /<section class="project-related"[\s\S]*?<\/section>/.exec((await renderRoute("/case-study/luxe-estates", site)).html)[0];
  for (const s of ['flowback', 'carryline', 'pledgedesk']) assert.ok(luxe.includes(`/services/${s}"`), `luxe links ${s}`);
});

test('every service page answers which published projects used it, in visible FAQ and FAQPage schema', async () => {
  const site = await loadSite();
  for (const [slug, title, client] of [['flowback', 'Business Automation', 'Kinetic Logistics'], ['carryline', 'WhatsApp &amp; Voice AI Agents', 'Noir Clinic'], ['intentpath', 'Website Design &amp; Development', 'Velvet &amp; Co'], ['previewops', 'Custom Software &amp; Portals', 'Pulse Fit OS'], ['pledgedesk', 'CRM &amp; Lead Follow-up', 'Luxe Estates']]) {
    const html = (await renderRoute(`/services/${slug}`, site)).html;
    assert.ok(html.includes(`Which Zykken projects used ${title}?`), `${slug} visible question`);
    assert.ok(html.includes(client), `${slug} names ${client}`);
    const ld = JSON.parse(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(html)[1]);
    const faq = ld['@graph'].find(n => n['@type'] === 'FAQPage');
    assert.ok(faq.mainEntity.some(q => q.name.startsWith('Which Zykken projects used')), `${slug} FAQPage has it`);
  }
});
