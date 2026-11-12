const test = require('node:test');
const assert = require('node:assert/strict');
const {loadSite, renderRoute} = require('../scripts/build.cjs');

test('homepage targets "AI automation agency in India" in title, description and visible copy', async () => {
  const site = await loadSite();
  const page = (await renderRoute('/', site)).html;
  const title = /<title>([^<]*)<\/title>/.exec(page)[1].replace(/&amp;/g, '&');
  const desc = /name="description" content="([^"]*)"/.exec(page)[1].replace(/&amp;/g, '&');
  assert.match(title, /AI Automation Agency in India/);
  assert.ok(title.length <= 60, `title too long: ${title.length}`);
  assert.match(desc, /AI automation agency in India/);
  assert.ok(desc.length <= 160, `description too long: ${desc.length}`);
  assert.match(page, /As an AI automation agency in India, our five services/);
});
