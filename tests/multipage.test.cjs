const test = require('node:test');
const assert = require('node:assert/strict');
const {loadSite, renderRoute, normalizeRoute, publicRoutes, sitemapXml} = require('../scripts/build.cjs');

const origin = 'https://www.zykken.com';
const overviewRoutes = ['/process', '/benefits', '/features', '/team', '/testimonials', '/faq'];
const serviceRoutes = ['flowback', 'carryline', 'intentpath', 'previewops', 'pledgedesk'].map(slug => `/services/${slug}`);
const primaryRoutes = ['/', '/about', '/services', '/work', '/custom-quote', '/contact'];
const retiredOffers = /Automation Starter|Growth System|Revenue System|\$900|\$2,250|\$4,000|\$6,000|\$199|\$399|\$750|\$1,250|data-package-fit|class="price-card|>Pricing<|href="\/pricing"/;

function decodeEntities(value) {
  return value.replace(/&(?:amp|quot|apos|lt|gt|#39);/g, entity => ({
    '&amp;': '&', '&quot;': '"', '&apos;': "'", '&#39;': "'", '&lt;': '<', '&gt;': '>'
  }[entity]));
}

function attribute(tag, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = new RegExp(`(?:^|\\s)${escaped}\\s*=\\s*(["'])(.*?)\\1`).exec(tag);
  return match ? decodeEntities(match[2]) : null;
}

function identifiers(html) {
  return [...html.matchAll(/\bid\s*=\s*(["'])(.*?)\1/g)].map(match => decodeEntities(match[2]));
}

function internalLinks(html, sourceRoute) {
  const links = new Map();
  for (const [, , encoded] of html.matchAll(/\bhref\s*=\s*(["'])(.*?)\1/g)) {
    const href = decodeEntities(encoded);
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    const url = new URL(href, origin + sourceRoute);
    if (url.origin !== origin || url.pathname.startsWith('/assets/')) continue;
    if (/\.(?:svg|css|m?js|json|xml|txt|woff2?|ttf|jpe?g|png|webp|avif|gif|ico|mp4)$/i.test(url.pathname)) continue;
    const target = normalizeRoute(url.pathname);
    const fragment = decodeURIComponent(url.hash.slice(1));
    links.set(`${target}#${fragment}`, {href, target, fragment});
  }
  return [...links.values()];
}

let fixture;
function siteFixture() {
  if (!fixture) fixture = (async () => {
    assert.equal(typeof publicRoutes, 'function', 'The route catalog must be exported for integration checks');
    const site = await loadSite();
    const routes = publicRoutes(site);
    const pages = new Map();
    for (const route of routes) pages.set(route, await renderRoute(route, site));
    return {site, routes, pages};
  })();
  return fixture;
}

test('all overview and service-detail pages render with unique semantics, exact canonicals and custom quotes', async () => {
  const {site, routes, pages} = await siteFixture();
  assert.equal(routes.length, 32, 'The site has 32 public pages plus its 404 document');
  assert.equal(new Set(routes).size, routes.length, 'The public catalog contains no duplicates');
  for (const route of [...overviewRoutes, ...serviceRoutes]) assert.ok(pages.has(route), `Missing dedicated page ${route}`);

  const sitemap = sitemapXml(site);
  for (const [route, page] of pages) {
    assert.equal(page.status, 200, route);
    assert.equal((page.html.match(/<h1(?:\s|>)/g) || []).length, 1, `${route}: one page heading`);
    const ids = identifiers(page.html);
    assert.equal(new Set(ids).size, ids.length, `${route}: duplicate document IDs`);
    const canonicalTags = [...page.html.matchAll(/<link\b[^>]*>/g)].map(match => match[0]).filter(tag => attribute(tag, 'rel') === 'canonical');
    assert.equal(canonicalTags.length, 1, `${route}: one canonical`);
    assert.equal(attribute(canonicalTags[0], 'href'), origin + route, `${route}: exact canonical`);
    assert.ok(sitemap.includes(`<loc>${origin + route}</loc>`), `${route}: included in sitemap`);
    assert.doesNotMatch(page.html, retiredOffers, `${route}: retired packages stay removed`);
  }
});

test('every internal navigation link and fragment reaches a rendered destination', async () => {
  const {site, pages} = await siteFixture();
  for (const [sourceRoute, page] of pages) {
    for (const {href, target, fragment} of internalLinks(page.html, sourceRoute)) {
      if (!pages.has(target)) pages.set(target, await renderRoute(target, site));
      const destination = pages.get(target);
      assert.equal(destination.status, 200, `${sourceRoute}: ${href} reaches a public page`);
      if (fragment) assert.ok(identifiers(destination.html).includes(fragment), `${sourceRoute}: ${href} has a matching target ID`);
    }
  }
});

test('all public destinations are discoverable by following links from the homepage', async () => {
  const {routes, pages} = await siteFixture();
  const discovered = new Set(['/']);
  const queue = ['/'];
  while (queue.length) {
    const source = queue.shift();
    for (const {target} of internalLinks(pages.get(source).html, source)) {
      if (!pages.has(target) || discovered.has(target)) continue;
      discovered.add(target);
      queue.push(target);
    }
  }
  assert.deepEqual(routes.filter(route => !discovered.has(route)), [], 'No page is orphaned from the public website');
});

test('shared navigation opens dedicated pages and identifies the current page or detail parent', async () => {
  const {pages} = await siteFixture();
  for (const [route, page] of pages) {
    const nav = /<nav\b[^>]*\bdata-nav\b[^>]*>([\s\S]*?)<\/nav>/.exec(page.html);
    assert.ok(nav, `${route}: shared primary navigation`);
    const links = [...nav[1].matchAll(/<a\b[^>]*>/g)].map(match => ({
      href: attribute(match[0], 'href'), current: attribute(match[0], 'aria-current')
    }));
    for (const href of primaryRoutes) assert.ok(links.some(link => link.href === href), `${route}: dedicated ${href} navigation`);
    assert.ok(links.filter(link => link.current === 'page').length <= 1, `${route}: at most one current page`);
    const parent = route.startsWith('/services/') ? '/services' : route.startsWith('/case-study/') ? '/work' : route.startsWith('/blog/') ? '/insights' : null;
    if (parent) assert.ok(links.some(link => link.href === parent && link.current === 'true'), `${route}: current parent ${parent}`);
    else if (links.some(link => link.href === route)) assert.ok(links.some(link => link.href === route && link.current === 'page'), `${route}: current page`);
  }
});

test('unknown detail routes remain real 404s and the Features page is no longer a service alias', async () => {
  const {site} = await siteFixture();
  assert.equal(normalizeRoute('/features'), '/features');
  assert.equal(normalizeRoute('/features.html'), '/features');
  for (const route of ['/services/not-a-zykken-service', '/case-study/not-a-project', '/blog/not-an-article', '/not-a-page', '/404']) {
    const page = await renderRoute(route, site);
    assert.equal(page.status, 404, route);
    assert.match(page.html, /name="robots" content="noindex"/, `${route}: excluded from indexing`);
    assert.equal((page.html.match(/<h1(?:\s|>)/g) || []).length, 1, `${route}: one page heading`);
  }
});

test('service pages publish an enriched Service JSON-LD linked as the page main entity', async () => {
  const site = await loadSite();
  for (const route of serviceRoutes) {
    const {html} = await renderRoute(route, site);
    const graph = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(m => JSON.parse(m[1])['@graph']);
    const service = graph.find(node => node['@type'] === 'Service');
    const page = graph.find(node => String(node['@id']).endsWith('#webpage'));
    assert.ok(service, `${route} has Service`);
    assert.equal(page.mainEntity['@id'], service['@id']);
    for (const key of ['serviceType', 'description', 'alternateName', 'availableChannel', 'offers']) assert.ok(service[key], `${route} Service.${key}`);
    assert.deepEqual(service.availableChannel.availableLanguage.map(l => l.alternateName), ['en', 'hi']);
    assert.equal(service.areaServed.name, 'India');
  }
});

test('case studies and insight posts use descriptive search titles while keeping their headlines', async () => {
  const fs = require('node:fs'); const path = require('node:path');
  const read = rel => fs.readFileSync(path.join(__dirname, '..', 'dist', rel), 'utf8');
  const luxe = read('case-study/luxe-estates/index.html');
  assert.match(luxe, /<title>Luxe Estates: Real Estate Follow-up in 38 Seconds — Zykken<\/title>/);
  assert.match(luxe, /38-second follow-up/);
  const post = read('blog/automate-your-highest-impact-workflow/index.html');
  assert.match(post, /<title>Which Business Process Should You Automate First\? — Zykken<\/title>/);
  assert.match(post, /Start with the workflow that costs you the most\./);
});

test('llms.txt lists every case study and insight', async () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const txt = fs.readFileSync(path.join(__dirname, '..', 'llms.txt'), 'utf8');
  const { caseStudies, insights } = await import('../content.mjs').then(m => m.default || m.content || m);
  for (const item of [...caseStudies.map(c => `/case-study/${c.slug}`), ...insights.map(i => `/blog/${i.slug}`)]) {
    assert.ok(txt.includes(`https://www.zykken.com${item}`), `llms.txt missing ${item}`);
  }
});

test('case studies carry Article structured data linked to their service', async () => {
  const site = await loadSite();
  const expected = {'luxe-estates': 'flowback', 'velvet-co': 'intentpath', 'pulse-fit-os': 'previewops', 'noir-clinic': 'carryline', 'kinetic-logistics': 'flowback', 'hearth-home': 'pledgedesk'};
  for (const [slug, svc] of Object.entries(expected)) {
    const page = await renderRoute(`/case-study/${slug}`, site);
    const blocks = [...page.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
    const graph = blocks.flatMap(b => b['@graph'] || [b]);
    const article = graph.find(node => node['@type'] === 'Article');
    assert.ok(article, `${slug} missing Article`);
    assert.equal(article.about['@id'], `${origin}/services/${svc}#service`);
    assert.ok(article.headline && article.description && article.mentions.name);
    assert.ok(!('aggregateRating' in article) && !('review' in article));
  }
});

test('insight posts show quick answers marked up as FAQPage, and BlogPosting links its services', async () => {
  const site = await loadSite();
  const { insights } = await import('../content.mjs');
  for (const post of insights) {
    const page = await renderRoute(`/blog/${post.slug}`, site);
    assert.match(page.html, /Quick answers/);
    const graph = [...page.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1])).flatMap(b => b['@graph'] || [b]);
    const faq = graph.find(n => n['@type'] === 'FAQPage');
    assert.ok(faq && faq.mainEntity.length === post.faqs.length, `${post.slug} FAQPage`);
    const article = graph.find(n => n['@type'] === 'BlogPosting');
    assert.ok(article.about && article.about.length >= 1, `${post.slug} about`);
    assert.equal(article.image, `${origin}${post.image}`);
    assert.equal(graph.find(n => n['@type'] === 'WebPage').mainEntity['@id'], `${origin}/blog/${post.slug}#article`);
  }
});

test('header and footer logo images are sized for display, not full-resolution', async () => {
  const fs = require('node:fs');
  const path = require('node:path');
  for (const name of ['zykken-monogram-transparent.png', 'zykken-wordmark-transparent.png']) {
    const size = fs.statSync(path.join(__dirname, '..', 'assets', name)).size;
    assert.ok(size < 60000, `${name} is ${size} bytes`);
  }
  const site = await loadSite();
  const page = await renderRoute('/', site);
  assert.match(page.html, /zykken-monogram-transparent\.png" width="256" height="256"/);
  assert.match(page.html, /zykken-wordmark-transparent\.png" width="640" height="213"/);
});

test('every built page has a search title of 60 characters or fewer so results do not cut it off', async () => {
  const fs = require('node:fs'); const path = require('node:path');
  const dist = path.join(__dirname, '..', 'dist');
  const files = [];
  (function walk(d) { for (const e of fs.readdirSync(d, {withFileTypes: true})) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (e.name.endsWith('.html')) files.push(p); } })(dist);
  assert.ok(files.length > 20);
  for (const f of files) {
    const m = /<title>([^<]*)<\/title>/.exec(fs.readFileSync(f, 'utf8'));
    if (!m) continue;
    const title = decodeEntities(m[1]);
    assert.ok(title.length <= 60, `${path.relative(dist, f)}: "${title}" is ${title.length} chars`);
  }
});
