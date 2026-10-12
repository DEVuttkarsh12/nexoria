const test = require('node:test');
const assert = require('node:assert/strict');
const {loadSite,renderRoute,normalizeRoute,publicRoutes} = require('../scripts/build.cjs');

test('legal documents are public, reachable from the footer, and their legacy aliases resolve',async()=>{
  const site=await loadSite();
  const home=(await renderRoute('/',site)).html;
  const footer=home.slice(home.indexOf('<footer'));
  for(const route of ['/legal','/privacy','/terms','/cookies','/cancellation-refunds','/disclaimer']){
    assert.ok(publicRoutes(site).includes(route));
    const page=await renderRoute(route,site);
    assert.equal(page.status,200,route);
    assert.ok(footer.includes(`href="${route}"`),`${route}: discoverable before the wordmark`);
    assert.ok(footer.indexOf(`href="${route}"`)<footer.indexOf('footer-wordmark'));
    assert.match(page.html,/<time datetime="2026-10-12">/);
    assert.doesNotMatch(page.html,/\[Your|\[Company|lorem ipsum|TODO|TBD/i);
  }
  for(const [alias,destination] of [['/privacy-policy','/privacy'],['/terms-and-conditions','/terms'],['/cookie-policy','/cookies'],['/refund-policy','/cancellation-refunds'],['/cancellation-policy','/cancellation-refunds']]){
    assert.equal(normalizeRoute(alias),destination);
    assert.equal((await renderRoute(alias,site)).status,200);
  }
});

test('every inquiry form provides privacy information without changing the validated payload',async()=>{
  const site=await loadSite();
  for(const route of publicRoutes(site)){
    const {html}=await renderRoute(route,site);
    const forms=[...html.matchAll(/<form\b[^>]*data-contact-form[\s\S]*?<\/form>/g)];
    for(const [form] of forms){
      assert.match(form,/class="form-privacy"[\s\S]*?href="\/privacy"/);
      assert.equal(form.match(/\bname="(?:name|email|phone|need|message|company_site)"/g).length,6);
      assert.doesNotMatch(form,/name="(?:marketing|newsletter|card_number|privacy_consent)"/);
    }
  }
});
