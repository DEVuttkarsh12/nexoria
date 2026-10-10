const test = require('node:test');
const assert = require('node:assert/strict');
test('contact validation matches the preserved contact API contract', async () => {
  const { validateInquiry } = await import('../app.mjs');
  const valid = { name: 'Visitor Name', email: 'visitor@example.com', need: 'automation', phone: '', message: '' };
  assert.deepEqual(validateInquiry(valid), {});
  assert.deepEqual(Object.keys(validateInquiry({ ...valid, name: '', email: 'broken', need: '' })), ['name', 'email', 'need']);
  assert.ok(validateInquiry({ ...valid, phone: '123' }).phone);
  assert.ok(validateInquiry({ ...valid, message: 'x'.repeat(1201) }).message);
  for (const need of ['automation', 'website', 'voice', 'software', 'crm']) assert.deepEqual(validateInquiry({ ...valid, need }), {});
});
test('clean route aliases resolve to the intended pages', () => {
  const { normalizeRoute } = require('../scripts/build.cjs');
  assert.equal(normalizeRoute('/index.html'), '/');
  assert.equal(normalizeRoute('/about.html'), '/about');
  assert.equal(normalizeRoute('/features'), '/features');
  assert.equal(normalizeRoute('/pricing.html'), '/custom-quote');
  assert.equal(normalizeRoute('/case-study/'), '/work');
  assert.equal(normalizeRoute('/case-study/example/index.html'), '/case-study/example');
});
test('all public pages use custom quotes and contain no retired package offers', async () => {
  const {loadSite, renderRoute, publicRoutes} = require('../scripts/build.cjs');
  const site = await loadSite();
  const routes = publicRoutes(site);
  for (const route of routes) {
    const page = await renderRoute(route, site);
    assert.equal(page.status, 200, route);
    assert.doesNotMatch(page.html, /Automation Starter|Growth System|Revenue System|\$900|\$2,250|\$4,000|\$6,000|\$199|\$399|\$750|\$1,250|data-package-fit|class="price-card|>Pricing<|href="\/pricing"/, route);
  }
  const legacy = await renderRoute('/pricing.html', site);
  assert.equal(legacy.filename, 'custom-quote.html');
  assert.match(legacy.html, /Every service is custom-priced/);
  assert.match(legacy.html, /id="start"/);
  assert.match(legacy.html, /action="\/api\/contact"/);
});
test('ROI estimate recovers 80 percent of time over 4.33 weeks each month', async () => {
  const { estimateROI } = await import('../app.mjs');
  const estimate = estimateROI(30, 25);
  assert.equal(Math.round(estimate.monthly), 2598);
  assert.equal(Math.round(estimate.yearly), 31176);
  assert.equal(Math.round(estimate.hoursSaved), 104);
  assert.equal(estimateROI(0, 25).monthly, 0);
  assert.equal(estimateROI(30, 0).hoursSaved, estimate.hoursSaved);
  assert.equal(estimateROI(120, 120).monthly, 49881.6);
  assert.equal(estimateROI(-5, 'invalid').monthly, 0);
});
