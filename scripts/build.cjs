// Pre-render every public route with no framework or build dependencies.
const fs = require('node:fs/promises');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const staticPages = {
  '/': ['index.html', 'homePage', 'Zykken — AI Agents, Automation & CRM That Grow Your Business', 'Answer leads in seconds, not hours, with Hindi & English WhatsApp and voice AI agents, CRM and automation. Book your free 30-minute audit.', 'home'],
  '/about': ['about.html', 'aboutPage', 'About Zykken — AI & Business Systems Studio in India', 'Zykken is an AI and business-systems studio in India that builds practical automation, AI agents, CRM, websites and custom software for growing businesses.', 'about'],
  '/services': ['services.html', 'servicesPage', 'AI Automation, WhatsApp Chatbot, CRM & Website Development Services', 'Five custom-quoted services from Zykken, India: Business Automation, WhatsApp & Voice AI Agents (Hindi and English), Website Design & Development, Custom Software & Portals, and CRM & Lead Follow-up.', 'services'],
  '/process': ['process.html', 'processPage', 'Our Process', 'How Zykken maps, proves, builds and hands over a custom AI system, with clear checkpoints at every stage.', 'process'],
  '/benefits': ['benefits.html', 'benefitsPage', 'Why Work with Zykken', 'Explore the practical benefits of outcome-led, carefully tested and design-led business systems.', 'benefits'],
  '/features': ['features.html', 'featuresPage', 'Features & Tools', 'Five signature capabilities, connected tools and ownership from day one. Explore how Zykken builds useful systems.', 'features'],
  '/team': ['team.html', 'teamPage', 'Meet the Team', 'Meet the people responsible for strategy, design, engineering and delivery at Zykken.', 'team'],
  '/testimonials': ['testimonials.html', 'testimonialsPage', 'Client Stories', 'Read client perspectives alongside the Zykken projects and systems behind them.', 'testimonials'],
  '/faq': ['faq.html', 'faqPage', 'FAQs: AI Automation, WhatsApp Chatbots & CRM in India', 'Answers about Zykken’s AI automation, WhatsApp chatbots, Hindi AI voice agents, CRM for real estate and website development in India: pricing, ownership, support and the free audit.', 'faq'],
  '/work': ['work.html', 'workPage', 'Case Studies: AI Automation & CRM Results', 'Selected Zykken projects, including Luxe Estates, where real estate lead follow-up went from 6 hours to 38 seconds.', 'work'],
  '/custom-quote': ['custom-quote.html', 'customQuotePage', 'Custom Quote for AI Automation & Website Projects', 'Every Zykken project is scoped and custom-priced around your business. Start with a free 30-minute audit and receive a clear proposal.', 'custom-quote'],
  '/contact': ['contact.html', 'contactPage', 'Contact Zykken — Book a Free 30-Minute Audit', 'Tell Zykken about your business and the automation, WhatsApp agent, CRM or website you need. Book a free 30-minute audit or email info@zykken.com.', 'contact'],
  '/insights': ['insights.html', 'insightsPage', 'Insights', 'Ideas and practical perspectives on automation, websites, and digital growth from Zykken.', 'insights'],
  '/privacy': ['privacy.html', 'legalPage', 'Privacy Policy', 'How Zykken handles website enquiries, technical information, retention and privacy requests.', 'privacy'],
  '/terms': ['terms.html', 'legalPage', 'Terms & Conditions', 'Terms for website use, project quotations, ownership and working with Zykken.', 'terms'],
  '/cookies': ['cookies.html', 'legalPage', 'Cookie & Storage Policy', 'The browser storage and hosting technologies used by the Zykken website.', 'cookies'],
  '/cancellation-refunds': ['cancellation-refunds.html', 'legalPage', 'Cancellation & Refund Policy', 'How to discuss a pause, cancellation or refund under your Zykken project agreement.', 'cancellation-refunds'],
  '/disclaimer': ['disclaimer.html', 'legalPage', 'Website & AI Disclaimer', 'Understand Zykken illustrations, client stories, calculator estimates and AI limitations.', 'disclaimer']
};
const aliases = { '/pricing': '/custom-quote', '/case-study': '/work', '/portfolio': '/work', '/blog': '/insights', '/privacy-policy': '/privacy', '/terms-and-conditions': '/terms', '/cookie-policy': '/cookies', '/refund-policy': '/cancellation-refunds', '/cancellation-policy': '/cancellation-refunds', '/legal': '/privacy' };

async function importSource(filename, fresh = false) {
  const fullPath = path.join(root, filename);
  const url = pathToFileURL(fullPath);
  if (fresh) url.searchParams.set('v', String((await fs.stat(fullPath)).mtimeMs));
  return import(url.href);
}
async function loadSite(fresh = false) {
  const [layout, home, pages, content, topics, servicePages] = await Promise.all([
    importSource('layout.mjs', fresh), importSource('home.mjs', fresh),
    importSource('pages.mjs', fresh), importSource('content.mjs', fresh),
    importSource('topic-pages.mjs', fresh), importSource('service-pages.mjs', fresh)
  ]);
  return { layout, home, pages, content, topics, servicePages };
}
function normalizeRoute(pathname) {
  const route = pathname.replace(/\/index\.html$/, '').replace(/\.html$/, '').replace(/\/+$/, '') || '/';
  return aliases[route] || route;
}
async function renderRoute(pathname, site) {
  const route = normalizeRoute(pathname);
  const entry = staticPages[route];
  if (entry) {
    const [filename, renderName, title, description, page] = entry;
    const render = renderName === 'homePage' ? site.home[renderName] : (site.pages[renderName] || site.topics[renderName]);
    const body = await render(...(renderName === 'legalPage' ? [page] : []));
    return { filename, html: site.layout.documentHtml(title, description, body, page), status: 200 };
  }
  const serviceMatch = /^\/services\/([^/]+)$/.exec(route);
  if (serviceMatch) {
    const item = site.servicePages.serviceDetailRoutes.find(item => item.slug === serviceMatch[1]);
    if (item) return { filename: `services/${item.slug}/index.html`, html: site.layout.documentHtml(item.title, item.description, await site.servicePages.serviceDetailPage(item.slug), `services/${item.slug}`), status: 200 };
  }
  const caseMatch = /^\/case-study\/([^/]+)$/.exec(route);
  if (caseMatch) {
    const item = (site.content.caseStudies || []).find(item => item.slug === caseMatch[1]);
    if (item) return { filename: `case-study/${item.slug}/index.html`, html: site.layout.documentHtml(item.title || item.name || 'Case Study', item.description || item.summary || 'Explore a selected project from Zykken.', await site.pages.caseStudyPage(item.slug), `case-study/${item.slug}`), status: 200 };
  }
  const blogMatch = /^\/blog\/([^/]+)$/.exec(route);
  if (blogMatch) {
    const item = (site.content.insights || []).find(item => item.slug === blogMatch[1]);
    if (item) return { filename: `blog/${item.slug}/index.html`, html: site.layout.documentHtml(item.title || 'Insight', item.description || item.summary || item.intro || 'Practical insights from Zykken.', await site.pages.blogPage(item.slug), `blog/${item.slug}`), status: 200 };
  }
  const body = '<section class="page-hero section"><div class="container"><span class="eyebrow">404 / Page not found</span><h1>Let’s get you<br>back on track.</h1><p>The page you are looking for could not be found.</p><a class="button button-dark" href="/">Back to home <span aria-hidden="true">↗</span></a></div></section>';
  return { filename: '404.html', html: site.layout.documentHtml('Page Not Found', 'Return to the Zykken website.', body, '404'), status: 404 };
}
function publicRoutes(site) {
  return [...Object.keys(staticPages), ...site.servicePages.serviceDetailRoutes.map(item => item.path), ...(site.content.caseStudies || []).map(item => `/case-study/${item.slug}`), ...(site.content.insights || []).map(item => `/blog/${item.slug}`)];
}
function sitemapXml(site) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${publicRoutes(site).map(route => `  <url><loc>https://www.zykken.com${route}</loc><lastmod>${new Date().toISOString().slice(0,10)}</lastmod></url>`).join('\n')}\n</urlset>\n`;
}
const robotsTxt = ['GPTBot','OAI-SearchBot','ChatGPT-User','PerplexityBot','ClaudeBot','Claude-Web','Google-Extended','Applebot-Extended','*'].map(a=>`User-agent: ${a}\nAllow: /\nDisallow: /api/\n`).join('\n') + '\nSitemap: https://www.zykken.com/sitemap.xml\n';
async function copyIfPresent(filename) {
  try { await fs.cp(path.join(root, filename), path.join(dist, filename), { recursive: true }); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
}
async function build() {
  const site = await loadSite();
  await fs.rm(dist, { recursive: true, force: true });
  await fs.mkdir(dist, { recursive: true });
  const routes = [...publicRoutes(site), '/404'];
  const publicAssets = new Set();
  const collectAssets = text => { for (const match of text.matchAll(/\/assets\/[^\s\"'()<>?#]+/g)) publicAssets.add(match[0]); };
  collectAssets(await fs.readFile(path.join(root, 'site.css'), 'utf8'));
  for (const route of routes) {
    const page = await renderRoute(route, site);
    collectAssets(page.html);
    const target = path.join(dist, page.filename);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, page.html);
  }
  // Shared component stylesheets may reference their own local fonts or artwork.
  for (const asset of publicAssets) {
    if (asset.endsWith('.css')) collectAssets(await fs.readFile(path.join(root, asset), 'utf8'));
  }
  await Promise.all(['site.css', 'app.mjs'].map(copyIfPresent));
  await Promise.all([...publicAssets].map(async asset => {
    const target = path.join(dist, asset);
    await fs.mkdir(path.dirname(target), {recursive: true});
    await fs.copyFile(path.join(root, asset), target);
  }));
  await fs.writeFile(path.join(dist, 'robots.txt'), robotsTxt);
  await fs.copyFile(path.join(root, 'llms.txt'), path.join(dist, 'llms.txt'));
  await fs.writeFile(path.join(dist, 'sitemap.xml'), sitemapXml(site));
  console.log(`Built ${routes.length} pre-rendered pages in ${dist}`);
  return routes.length;
}
module.exports = { root, dist, build, loadSite, renderRoute, normalizeRoute, publicRoutes, sitemapXml, robotsTxt };
if (require.main === module) build().catch(error => { console.error(error); process.exitCode = 1; });
