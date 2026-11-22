const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const root = path.join(__dirname, '..');
const origin = 'https://www.zykken.com';
const load = async () => {
  const build = require('../scripts/build.cjs');
  return build;
};

test('speed-to-lead insight is built only from published case-study facts and links those cases', async () => {
  const { insights, caseStudies } = await import(pathToFileURL(path.join(root, 'content.mjs')));
  const post = insights.find(i => i.slug === 'reply-to-every-lead-in-seconds');
  assert.ok(post, 'article exists');
  assert.ok(`${post.seoTitle} — Zykken`.length <= 60, "full title fits in 60 chars");
  assert.ok(post.description.length <= 160, 'description fits in 160 chars');
  assert.equal(post.faqs.length, 3);
  const text = [post.intro, ...post.sections.flat(), ...post.faqs.flat()].join(' ');
  // every client named is a published case study, and the facts quoted match those case studies
  const byslug = Object.fromEntries(caseStudies.map(c => [c.slug, c]));
  for (const slug of post.cases) assert.ok(byslug[slug], `${slug} is a published case study`);
  const luxe = JSON.stringify(byslug['luxe-estates']), noir = JSON.stringify(byslug['noir-clinic']), hearth = JSON.stringify(byslug['hearth-home']);
  assert.match(luxe, /6 hours/); assert.match(luxe, /38s/); assert.match(luxe, /\+312%/); assert.match(luxe, /90-day nurture/);
  assert.match(noir, /40% of calls went unanswered/); assert.match(noir, /Missed calls in 4 months/); assert.match(noir, /Hindi \+ English voice agent/);
  assert.match(hearth, /under 60 seconds/); assert.match(hearth, /60-day auto follow-up/); assert.match(hearth, /2\.6×/);
  for (const fact of ['6 hours', '38 seconds', '312%', '40% of calls', 'zero missed calls in 4 months', 'under 60 seconds', '60 days', '2.6 times']) assert.ok(text.includes(fact), `article states ${fact}`);
  assert.doesNotMatch(text, /₹|\$|Rs\.?\s?\d|per month/, 'no prices');

  const { renderRoute } = await load();
  const site = await (require('../scripts/build.cjs').loadSite());
  const page = await renderRoute('/blog/reply-to-every-lead-in-seconds', site);
  assert.equal(page.status, 200);
  for (const slug of post.cases) assert.ok(page.html.includes(`href="/case-study/${slug}"`), `links ${slug}`);
  for (const svc of ['carryline', 'pledgedesk']) assert.ok(page.html.includes(`href="/services/${svc}"`), `links service ${svc}`);
  for (const svc of ['carryline', 'pledgedesk']) {
    const s = await renderRoute(`/services/${svc}`, site);
    assert.ok(s.html.includes('href="/blog/reply-to-every-lead-in-seconds"'), `${svc} links the article`);
  }
  const hub = await renderRoute('/insights', site);
  const hubDesc = hub.html.match(/<meta name="description" content="([^"]*)"/)[1];
  assert.ok(hubDesc.length <= 160, `insights description ${hubDesc.length} chars`);
  const graph = [...page.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1])).flatMap(b => b['@graph'] || [b]);
  const article = graph.find(n => n['@type'] === 'BlogPosting');
  assert.equal(article.url, `${origin}/blog/reply-to-every-lead-in-seconds`);
  assert.deepEqual(article.about.map(a => a['@id']).sort(), [`${origin}/services/carryline#service`, `${origin}/services/pledgedesk#service`]);
});
