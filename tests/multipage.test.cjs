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
  assert.equal(routes.length, 29, 'The site has 29 public pages plus its 404 document');
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
