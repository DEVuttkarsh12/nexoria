import {caseStudies, insights, services} from './content.mjs';
import {escapeHtml as e, icon} from './layout.mjs';

// Contextual internal links between services, case studies and insights.
// Each pairing follows what the existing case study or article actually describes.
export const serviceRelated = {
  flowback: {cases: ['kinetic-logistics', 'luxe-estates'], insights: ['automate-your-highest-impact-workflow', 'what-happens-after-your-ai-system-launches']},
  carryline: {cases: ['noir-clinic', 'luxe-estates'], insights: ['from-first-enquiry-to-booked-call', 'what-happens-after-your-ai-system-launches']},
  intentpath: {cases: ['velvet-co', 'hearth-home'], insights: ['from-first-enquiry-to-booked-call']},
  previewops: {cases: ['pulse-fit-os'], insights: ['what-happens-after-your-ai-system-launches']},
  pledgedesk: {cases: ['luxe-estates', 'hearth-home'], insights: ['from-first-enquiry-to-booked-call', 'automate-your-highest-impact-workflow']}
};

const caseCopy = slug => caseStudies.find(c => c.slug === slug);
const insightCopy = slug => insights.find(i => i.slug === slug);
const serviceCopy = slug => services.find(s => s.slug === slug);

const card = (href, label, title, text) => `<li><a class="related-link-card surface reveal" href="${e(href)}"><span class="detail-label">${e(label)}</span><strong>${e(title)}</strong><span class="related-link-text">${e(text)}</span><span class="related-link-arrow" aria-hidden="true">${icon('arrow')}</span></a></li>`;

export function serviceRelatedLinks(slug) {
  const rel = serviceRelated[slug];
  if (!rel) return '';
  const items = [
    ...rel.cases.map(caseCopy).filter(Boolean).map(c => card(`/case-study/${c.slug}`, `Case study · ${c.industry.charAt(0)}${c.industry.slice(1).toLowerCase()}`, c.title, c.seoDescription || c.problem)),
    ...rel.insights.map(insightCopy).filter(Boolean).map(i => card(`/blog/${i.slug}`, `Insight · ${i.readTime}`, i.title, i.intro))
  ];
  return `<ul class="related-link-grid">${items.join('')}</ul>`;
}

// Reverse direction: which services each insight article discusses.
export function insightRelatedServices(insightSlug) {
  const slugs = Object.entries(serviceRelated).filter(([, rel]) => rel.insights.includes(insightSlug)).map(([s]) => s);
  const items = slugs.map(serviceCopy).filter(Boolean);
  if (!items.length) return '';
  return `<aside class="article-related" aria-labelledby="article-related-title"><h3 id="article-related-title">Services for this step</h3><ul class="related-link-grid">${items.map(s => card(`/services/${s.slug}`, s.category, s.title, s.description)).join('')}</ul></aside>`;
}
