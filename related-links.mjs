import {caseStudies, insights, services} from './content.mjs';
import {escapeHtml as e, icon} from './layout.mjs';

// Contextual internal links between services, case studies and insights.
// Each pairing follows what the existing case study or article actually describes.
export const serviceRelated = {
  flowback: {cases: ['kinetic-logistics', 'luxe-estates'], insights: ['automate-your-highest-impact-workflow', 'what-happens-after-your-ai-system-launches']},
  carryline: {cases: ['noir-clinic', 'luxe-estates'], insights: ['from-first-enquiry-to-booked-call', 'what-happens-after-your-ai-system-launches', 'reply-to-every-lead-in-seconds']},
  intentpath: {cases: ['velvet-co', 'hearth-home'], insights: ['from-first-enquiry-to-booked-call']},
  previewops: {cases: ['pulse-fit-os'], insights: ['what-happens-after-your-ai-system-launches']},
  pledgedesk: {cases: ['luxe-estates', 'hearth-home'], insights: ['from-first-enquiry-to-booked-call', 'automate-your-highest-impact-workflow', 'reply-to-every-lead-in-seconds']}
};

const caseCopy = slug => caseStudies.find(c => c.slug === slug);
const insightCopy = slug => insights.find(i => i.slug === slug);
const serviceCopy = slug => services.find(s => s.slug === slug);

const card = (href, label, title, text) => `<li><a class="related-link-card surface reveal" href="${e(href)}"><span class="detail-label">${e(label)}</span><strong>${e(title)}</strong><span class="related-link-text">${e(text)}</span><span class="related-link-arrow" aria-hidden="true">${icon('arrow')}</span></a></li>`;

// India-focused sections on the service pages and the published case studies each one cites
// (mirrors hindiVoiceSection, whatsappChatbotSection, automationIndiaSection, websiteIndiaSection
// and realEstateCrmSection in service-pages.mjs). Used to deep-link case studies to those sections.
export const indiaSections = [
  {service: 'carryline', id: 'whatsapp-chatbot-india', title: 'WhatsApp chatbots for businesses in India', cases: ['luxe-estates', 'noir-clinic', 'kinetic-logistics']},
  {service: 'carryline', id: 'hindi-voice-agents', title: 'AI voice agents that speak Hindi and English', cases: ['noir-clinic']},
  {service: 'flowback', id: 'ai-automation-india', title: 'AI automation for businesses in India', cases: ['kinetic-logistics', 'hearth-home', 'luxe-estates']},
  {service: 'intentpath', id: 'website-development-india', title: 'Website development for businesses in India', cases: ['velvet-co', 'hearth-home']},
  {service: 'pledgedesk', id: 'real-estate-crm-india', title: 'CRM for real estate businesses in India', cases: ['luxe-estates', 'hearth-home']}
];

export function caseIndiaLinks(caseSlug) {
  const c = caseCopy(caseSlug);
  const items = indiaSections.filter(sec => sec.cases.includes(caseSlug)).map(sec => ({sec, svc: serviceCopy(sec.service)})).filter(x => x.svc);
  if (!c || !items.length) return '';
  return `<div class="case-india-links"><h3>Where ${e(c.client)} appears on our service pages</h3><ul>${items.map(({sec, svc}) => `<li><a class="detail-text-link" href="/services/${e(sec.service)}#${e(sec.id)}">${e(sec.title)} ${icon('arrow')}</a><span> on the ${e(svc.title)} page</span></li>`).join('')}</ul></div>`;
}

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

// Insight articles built from case studies link to those case studies.
export function insightRelatedCases(insightSlug) {
  const post = insightCopy(insightSlug);
  const items = (post?.cases || []).map(caseCopy).filter(Boolean);
  if (!items.length) return '';
  return `<aside class="article-related" aria-labelledby="article-cases-title"><h3 id="article-cases-title">Read the full case studies</h3><ul class="related-link-grid">${items.map(c => card(`/case-study/${c.slug}`, `Case study · ${c.industry.charAt(0)}${c.industry.slice(1).toLowerCase()}`, c.title, c.seoDescription || c.problem)).join('')}</ul></aside>`;
}

// Case study pages: the services that project used (per serviceRelated) and the articles tied to those services.
export function caseRelatedLinks(caseSlug, primaryService) {
  const used = Object.entries(serviceRelated).filter(([, rel]) => rel.cases.includes(caseSlug)).map(([s]) => s);
  const slugs = [...new Set([primaryService, ...used].filter(Boolean))];
  const reading = [...new Set(slugs.flatMap(s => serviceRelated[s]?.insights || []))].slice(0, 3);
  const items = [
    ...slugs.map(serviceCopy).filter(Boolean).map(s => card(`/services/${s.slug}`, `Service · ${s.category}`, s.title, s.description)),
    ...reading.map(insightCopy).filter(Boolean).map(i => card(`/blog/${i.slug}`, `Insight · ${i.readTime}`, i.title, i.intro))
  ];
  return items.length ? `<ul class="related-link-grid">${items.join('')}</ul>` : '';
}
