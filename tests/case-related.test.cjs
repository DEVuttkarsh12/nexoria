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
