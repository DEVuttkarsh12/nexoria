const test = require('node:test');
const assert = require('node:assert/strict');
const {loadSite, renderRoute} = require('../scripts/build.cjs');

// Each case study deep-links to the India-focused service-page sections that cite it, and each anchor exists.
const expected = {
  'luxe-estates': ['/services/carryline#whatsapp-chatbot-india', '/services/flowback#ai-automation-india', '/services/pledgedesk#real-estate-crm-india'],
  'noir-clinic': ['/services/carryline#whatsapp-chatbot-india', '/services/carryline#hindi-voice-agents'],
  'kinetic-logistics': ['/services/carryline#whatsapp-chatbot-india', '/services/flowback#ai-automation-india'],
  'hearth-home': ['/services/flowback#ai-automation-india', '/services/intentpath#website-development-india', '/services/pledgedesk#real-estate-crm-india'],
  'velvet-co': ['/services/intentpath#website-development-india']
};

test('case studies deep-link to the India sections that cite them', async () => {
  const site = await loadSite();
  for (const [slug, links] of Object.entries(expected)) {
    const html = (await renderRoute(`/case-study/${slug}`, site)).html;
    const block = /<div class="case-india-links">[\s\S]*?<\/ul><\/div>/.exec(html);
    assert.ok(block, `${slug} has India section links`);
    assert.equal((block[0].match(/href=/g) || []).length, links.length, `${slug} link count`);
    for (const href of links) {
      assert.ok(block[0].includes(`href="${href}"`), `${slug} links ${href}`);
      const [path, id] = href.split('#');
      const target = (await renderRoute(path, site)).html;
      assert.ok(target.includes(`id="${id}"`), `${path} has #${id}`);
      const clientName = site.content.caseStudies.find(c => c.slug === slug).client;
      const section = new RegExp(`<section[^>]*id="${id}"[\\s\\S]*?</section>`).exec(target)[0];
      assert.ok(section.includes(clientName.replace(/&/g, '&amp;')), `#${id} cites ${clientName}`);
    }
  }
  const pulse = (await renderRoute('/case-study/pulse-fit-os', site)).html;
  assert.ok(!pulse.includes('case-india-links'), 'no India links where no section cites the case');
});
