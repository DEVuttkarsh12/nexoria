import {serviceSpecimen} from './systems-visuals.mjs';
import {services, caseStudies} from './content.mjs';
import {escapeHtml as e, icon, tag, button} from './layout.mjs';
import {serviceRelatedLinks, serviceRelated} from './related-links.mjs';

// These pages explain the custom builds in offers.mjs. The receipts are examples,
// rather than interactive products or promises about an unscoped integration.
const context = {
  flowback: {
    headline: 'Workflows with a way forward.',
    fit: 'Your team already has a repeatable process, but its handoffs depend on someone watching an inbox, updating a sheet or spotting a failed integration.',
    questions: ['Where does work wait for a person?', 'Which actions must never run twice?', 'Who takes responsibility when a step stops?'],
    proof: 'We walk through a completed run, a failed handoff and an uncertain external result. Your team can see which step needs attention and which recovery requires approval.',
    boundaries: [
      ['Supported retries', 'Recovery is defined for specific actions. A payment, message or other external action is checked before a retry is allowed.'],
      ['Uncertain results', 'When a provider cannot confirm what happened, the action stays in review. Your team receives the evidence and a clear next step.'],
      ['Visible ownership', 'Exceptions have an owner. Receipts and operating notes make the flow understandable after the build is handed over.']
    ],
    faq: ['Can every failed action be retried automatically?', 'No. We define supported recovery paths against the tools in your scope. Some actions need reconciliation or a human decision; we do not promise a universal undo or safe retry for every external service.'],
    case: ['kinetic-logistics', 'See the Kinetic Logistics workflow build']
  },
  carryline: {
    headline: 'One conversation. Less repetition.',
    fit: 'Enquiries arrive through several channels. Customers repeat their needs, while your team searches messages, calls and notes to work out what happens next.',
    questions: ['Which channels should share context?', 'What can the agent confirm on its own?', 'What happens if a human cannot accept a handoff?'],
    proof: 'We test an enquiry across the agreed channels, inspect the brief received by the next person and check the fallback when that person cannot accept the handoff.',
    boundaries: [
      ['Confirmed identity', 'Context follows a verified customer reference or a continuation link. Unrelated enquiries are not merged through a guessed identity.'],
      ['Clear escalation', 'The agent stays within the agreed booking, qualification and response rules. Requests outside those rules go to your team.'],
      ['Accepted handoffs', 'A named owner and acceptance state show whether the next step was received. Unanswered transfers follow the fallback agreed with you.']
    ],
    faq: ['Which channels and languages can be included?', 'We agree the phone, chat and messaging channels in discovery, including Hindi and English where relevant. Channel permissions, booking tools, identity checks and retention rules are part of the scope.'],
    case: ['noir-clinic', 'See the Noir Clinic conversation build']
  },
  intentpath: {
    headline: 'A website that starts a useful conversation.',
    fit: 'Visitors understand your brand, but struggle to choose between services or explain what they need. Your first sales call becomes a long exercise in collecting basic context.',
    questions: ['What decision should the visitor make?', 'Which answers help you route an enquiry?', 'What should a visitor review before sending?'],
    proof: 'We test the important visitor journeys on phones and larger screens. The visitor can inspect and edit the brief, and a failed submission keeps their answers available.',
    boundaries: [
      ['Your actual offers', 'Routes and suggestions follow the services you approve. The site does not invent a package, quote or booked appointment.'],
      ['Visitor approval', 'The brief stays editable until the visitor chooses to submit it. The questions focus on information useful to the first conversation.'],
      ['A working handover', 'Responsive pages, content editing and measurement are scoped together. Your team receives the accounts, source and publishing notes.']
    ],
    faq: ['Does the guided brief need an AI model?', 'No. A clear question flow and approved routing rules can be enough. If AI helps draft a summary, the visitor still reviews the information before submitting it. The appropriate approach is agreed for your build.'],
    case: ['velvet-co', 'See the Velvet & Co website build']
  },
  previewops: {
    headline: 'Review the impact. Then make the change.',
    fit: 'Your operations have outgrown spreadsheets, or one bulk edit can create hours of cleanup. Operators need a useful tool and a clear view of what their next action will change.',
    questions: ['Which business actions need a preview?', 'Who can approve a sensitive change?', 'What should happen if records change during review?'],
    proof: 'We test a preview without applying its changes, an approval by the wrong role and a preview made stale by another edit. A successful action retains its change receipt.',
    boundaries: [
      ['Defined coverage', 'Change Rehearsal covers the selected actions in your proposal. External effects are shown where the connected tools can measure them.'],
      ['Permission checks', 'The system rechecks authorization and relevant record versions when an action is committed. A stale preview needs a new review.'],
      ['Change receipts', 'Approved actions retain a before-and-after reference and the responsible person. External notifications have their own delivery status.']
    ],
    faq: ['Can the preview guarantee that every change is reversible?', 'No. Preview coverage and recovery depend on the action and connected tools. We define what can be checked before approval and explain external effects that cannot be predicted or undone universally.'],
    case: ['pulse-fit-os', 'See the Pulse Fit OS software build']
  },
  pledgedesk: {
    headline: 'Keep the promises inside the pipeline.',
    fit: 'Your CRM records the lead, but the small commitments inside calls and messages get lost. Quotes, demos and callbacks rely on somebody remembering the next step.',
    questions: ['Where are customer promises recorded?', 'Who confirms the owner and due date?', 'What evidence should close a commitment?'],
    proof: 'We turn an approved sample note into a source-linked item. We check vague dates, duplicate notes and a completed follow-up so your team can trust the review queue.',
    boundaries: [
      ['Approved sources', 'The system reads the notes and message sources included in your scope. Access and retention rules are agreed with your team.'],
      ['Human confirmation', 'Unclear owners, vague dates and ambiguous promises enter review. A draft is not treated as an agreed commitment.'],
      ['Recorded completion', 'Reminders follow the agreed rules. A task closes through a team action or a confirmed integrated event, with its source still available.']
    ],
    faq: ['Will it automatically send every customer a follow-up?', 'Follow-up rules are agreed for your business. Commitment Radar can remind the internal owner; any customer messaging is separately scoped against your approved channels and preferences.'],
    case: ['hearth-home', 'See the Hearth & Home follow-through build']
  }
};

const slugOf = item => item.slug;
const SEO = {
  flowback: ['AI Workflow & Business Automation in India', 'AI workflow automation for lead routing, onboarding, documents and reporting, built around your existing tools. Custom-quoted, with a free 30-minute audit.'],
  carryline: ['WhatsApp Chatbot & Hindi AI Voice Agents in India', 'WhatsApp chatbots and AI voice agents in Hindi and English for Indian businesses: answer enquiries, qualify leads, book calls and hand off to your team.'],
  intentpath: ['Website Design & Development Company in India', 'Website design and development in India: copy, design, build and measurement in one project, with a guided enquiry journey to the right person.'],
  previewops: ['Custom Software Development, Portals & Dashboards', 'Custom portals, dashboards, member apps and internal tools with an approval preview: inspect affected records, review the change, then commit with a receipt.'],
  pledgedesk: ['CRM for Real Estate & Sales Teams in India', 'A custom CRM that tracks leads and the commitments inside conversations. For Luxe Estates, real estate lead follow-up went from 6 hours to 38 seconds.']
};
// Visible hero sentence that repeats each page's search phrase in plain words,
// followed by the first published project mapped to the service (client, industry, city).
const LEDE = {
  flowback: 'AI workflow and business automation for businesses in India, built around the tools your team already uses.',
  carryline: 'WhatsApp chatbots and AI voice agents in Hindi and English for businesses in India.',
  intentpath: 'A website design and development company in India for service businesses with complex enquiries.',
  previewops: 'Custom software development for businesses in India: portals, dashboards, member apps and internal tools.',
  pledgedesk: 'A custom CRM for real estate and sales teams in India, so every lead gets an owner and a follow-up.'
};
export function serviceHeroLede(slug) {
  if (!LEDE[slug]) return '';
  const c = caseStudies.find(x => x.slug === serviceRelated[slug]?.cases?.[0]);
  const proof = c ? ` See it in practice: <a href="/case-study/${e(c.slug)}">${e(c.client)} (${e(c.industry.toLowerCase())}, ${e(c.city)})</a>.` : '';
  return `<p class="detail-hero-lede">${e(LEDE[slug])}${proof}</p>`;
}
export const serviceDetailRoutes = services.map(item => ({
  slug: slugOf(item),
  path: `/services/${slugOf(item)}`,
  title: SEO[item.slug]?.[0] || `${item.title} — ${item.category}`,
  description: SEO[item.slug]?.[1] || item.description
}));

const checkedList = items => `<ul class="detail-check-list">${items.map(item => `<li>${icon('check')}<span>${e(item)}</span></li>`).join('')}</ul>`;

function receipt(item) { return serviceSpecimen(item); }

// Key-term pricing question per service. Answers restate the site's published pricing
// policy (custom-priced, third-party usage separate, free audit first); no prices are invented.
const COST = {
  flowback: ['How much does business automation cost in India?', 'how many workflows and tools are connected, which steps need recovery paths, and the support plan you choose'],
  carryline: ['How much does a WhatsApp chatbot or AI voice agent cost in India?', 'the channels (WhatsApp, phone or chat), the languages (Hindi, English or both), booking and calendar connections, and the handoff rules for your team'],
  intentpath: ['How much does website design and development cost in India?', 'the number of pages and customer journeys, copy and brand work, the guided enquiry flow, and any CMS, analytics or CRM connections'],
  previewops: ['How much does custom software development cost in India?', 'the portals, dashboards or MVP features in scope, the roles and permissions, which actions get an approval preview, and the integrations'],
  pledgedesk: ['How much does a custom CRM for real estate or sales teams cost in India?', 'your pipeline stages and lead sources, how enquiries are routed, which notes and messages are tracked for follow-up, and the reminder rules']
};
export function serviceCostFaq(slug) {
  const c = COST[slug];
  if (!c) return null;
  return [c[0], `Every Zykken project is custom-quoted; we do not sell fixed packages. The price depends on ${c[1]}. Software subscriptions, hosting and API, AI, SMS, WhatsApp or email usage are separate from our build fee, and we list them during discovery. Start with a free 30-minute audit; you see the full scope, price and payment schedule in your proposal before approving the build.`];
}

// A factual FAQ built only from the published case studies mapped to this service.
export function serviceProjectsFaq(slug, title) {
  const used = (serviceRelated[slug]?.cases || []).map(id => caseStudies.find(c => c.slug === id)).filter(Boolean);
  if (!used.length) return null;
  const lines = used.map(c => {
    const r = c.results?.[0];
    return `${c.client} (${c.industry.toLowerCase()}, ${c.city}), live in ${c.elapsed}${r ? ` (${r.label.charAt(0).toLowerCase()}${r.label.slice(1)}: ${r.value})` : ''}`;
  });
  const count = ['', 'one published project', 'two published projects', 'three published projects'][used.length] || `${used.length} published projects`;
  return [`Which Zykken projects used ${title}?`, `We used ${title} on ${count} in India: ${lines.join('; ')}. Each case study on the Work page explains the problem, the build and the results.`];
}

// Hindi & English voice agent section for the WhatsApp & Voice AI Agents page.
// Every line restates published facts: the service copy (offers.mjs/content.mjs) and the
// Noir Clinic case study (build, city, build time, first result, client quote). No new capabilities.
export function hindiVoiceSection(slug) {
  if (slug !== 'carryline') return null;
  const c = caseStudies.find(x => x.slug === 'noir-clinic');
  if (!c) return null;
  const r = c.results[0];
  const cards = [
    ['Hindi, English or both', `We build Hindi and English agents for enquiries, qualification and booking on your website, WhatsApp and phone line. Trained on your FAQs, pricing and tone, they qualify with 3 smart questions and book straight into your calendar. The languages are agreed in discovery.`],
    ['Callers who mix Hindi and English', `Hinglish means moving between Hindi and English within one sentence. At ${c.client} in ${c.city}, ${c.person} describes the agent: “it switches between Hindi and English mid-sentence, books politely, and sends prep on WhatsApp.”`],
    ['What it handles on a clinic line', `In ${c.elapsed} we put a Hindi + English voice agent on ${c.client}'s line plus WhatsApp reminders. It books, reschedules, sends prep notes, confirms the day before and escalates anything urgent to a human with the full transcript. Result: ${r.value} ${r.label.charAt(0).toLowerCase()}${r.label.slice(1)}.`]
  ];
  const faqs = [
    ['Can an AI voice agent talk in Hindi and Hinglish?', `Yes. We build Hindi and English voice agents, and the languages are agreed in discovery. At ${c.client} in ${c.city}, the Hindi and English voice agent switches between the two languages mid-sentence. Requests outside the agreed booking, qualification and response rules go to your team.`],
    ['Do we need a new phone number for a Hindi voice agent?', `Not necessarily. ${c.client}'s Hindi + English voice agent went live on the clinic's existing line in ${c.elapsed}, with zero change to the clinic's number. Phone and channel permissions are checked in discovery for your setup.`]
  ];
  const html = `<section class="section detail-section detail-hindi-voice" id="hindi-voice-agents" aria-labelledby="hindi-voice-title"><div class="container"><div class="detail-section-heading reveal">${tag('Hindi & English voice agents')}<h2 id="hindi-voice-title">AI voice agents that speak Hindi and English.</h2><p>For businesses in India, we build voice agents in Hindi and English that answer enquiries in seconds, qualify leads, book calls and hand off hot or hard cases to a human with full transcript and summary.</p></div><div class="detail-deliverable-grid">${cards.map(([title, text], i) => `<article class="detail-deliverable surface reveal"><span class="detail-card-symbol" aria-hidden="true">${icon(['voice', 'workflow', 'shield'][i])}</span><h3>${e(title)}</h3><p>${e(text)}</p></article>`).join('')}</div><a class="detail-text-link detail-related-work" href="/case-study/${e(c.slug)}">Read the ${e(c.client)} Hindi voice agent case study ${icon('arrow')}</a> <a class="detail-text-link detail-related-work" href="/blog/ai-voice-receptionist-hindi-english">Read how a Hindi and English AI voice receptionist works ${icon('arrow')}</a></div></section>`;
  return {html, faqs};
}

// Website development section for the Website Design & Development page, targeting
// "website development company India". Every figure restates the published Velvet & Co
// and Hearth & Home case studies (content.mjs); no new clients, prices or results.
export function websiteIndiaSection(slug) {
  if (slug !== 'intentpath') return null;
  const v = caseStudies.find(x => x.slug === 'velvet-co');
  const h = caseStudies.find(x => x.slug === 'hearth-home');
  if (!v || !h) return null;
  const cards = [
    ['Fast on Indian mobile networks', `${v.client} in ${v.city} had a 4.2-second theme store converting at 0.9%. In ${v.elapsed} we rebuilt it on Next.js with sub-second loads on 4G. Results: ${v.results[1].value} LCP on 4G mobile, and conversion rate up from 0.9% to 3.1%.`],
    ['Hindi and English, with answers on the page', `The ${v.client} rebuild added Hindi + English support and an AI concierge that answers sizing, pairing and gifting questions and routes visitors to checkout. Support tickets fell ${v.results[2].value.replace('−', '')} in 60 days.`],
    ['A website connected to your CRM', `For ${h.client}, a home services business in ${h.city}, we built a calm site plus CRM in ${h.elapsed}: accurate quotes in under 60 seconds and 60-day auto follow-up. Enquiries rose ${h.results[0].value} with no new hires.`]
  ];
  const faqs = [
    ['How long does it take to build a business website?', `It depends on the scope agreed in your proposal. For reference, we rebuilt the ${v.client} e-commerce website in ${v.elapsed}, and the ${h.client} website and CRM went live in ${h.elapsed}. Your proposal sets the delivery plan before the build starts.`],
    ['Can you build a website in Hindi and English?', `Yes. The ${v.client} rebuild included Hindi + English support, along with an AI concierge for sizing, pairing and gifting questions. The languages and content for your site are agreed in discovery.`]
  ];
  const html = `<section class="section detail-section detail-website-india" id="website-development-india" aria-labelledby="website-india-title"><div class="container"><div class="detail-section-heading reveal">${tag('Website development in India')}<h2 id="website-india-title">Website development for businesses in India.</h2><p>We design and build websites that load fast on mobile, answer common questions in Hindi or English, and send every enquiry to the right person. Copy, design, development and measurement are one project.</p></div><div class="detail-deliverable-grid">${cards.map(([title, text], i) => `<article class="detail-deliverable surface reveal"><span class="detail-card-symbol" aria-hidden="true">${icon(['globe', 'code', 'workflow'][i])}</span><h3>${e(title)}</h3><p>${e(text)}</p></article>`).join('')}</div><a class="detail-text-link detail-related-work" href="/case-study/${e(v.slug)}">Read the ${e(v.client)} website case study ${icon('arrow')}</a> <a class="detail-text-link detail-related-work" href="/case-study/${e(h.slug)}">Read the ${e(h.client)} website and CRM case study ${icon('arrow')}</a> <a class="detail-text-link detail-related-work" href="/blog/website-that-loads-fast-and-sells">Read how a fast, bilingual website lifts sales ${icon('arrow')}</a></div></section>`;
  return {html, faqs};
}

// Real estate CRM section for the CRM & Lead Follow-up page, targeting "CRM for real estate India".
// Every figure restates the published Luxe Estates and Hearth & Home case studies (content.mjs);
// no new clients, prices or results.
export function realEstateCrmSection(slug) {
  if (slug !== 'pledgedesk') return null;
  const l = caseStudies.find(x => x.slug === 'luxe-estates');
  const h = caseStudies.find(x => x.slug === 'hearth-home');
  if (!l || !h) return null;
  const lc = s => s.charAt(0).toLowerCase() + s.slice(1);
  const cards = [
    ['Every portal and ad lead answered in seconds', `${l.client} in ${l.city} ran Meta and portal leads into a shared inbox, and median first response was 6 hours. In ${l.elapsed} we put a WhatsApp + voice qualifier on every ad and portal, with instant CRM routing and duplicate detection. Result: ${l.results[1].value} ${lc(l.results[1].label)}.`],
    ['Viewings booked into each agent\'s calendar', `The ${l.client} CRM includes a viewing scheduler synced to each agent's calendar, so agents talk to people ready to visit and owners see hot, booked viewings. Result: ${l.results[0].value} ${lc(l.results[0].label)}.`],
    ['Follow-up that keeps going after day 2', `A 90-day nurture revives cold ${l.client} enquiries automatically. For ${h.client} in ${h.city}, follow-ups used to die after day 2; their site + CRM build added a 60-day auto follow-up, and enquiries rose ${h.results[0].value} with no new hires.`]
  ];
  const faqs = [
    ['How fast can a real estate CRM follow up with new leads?', `For ${l.client} in ${l.city}, median speed-to-lead went from 6 hours to ${l.results[1].value.replace('s', ' seconds')}, 24/7. Leads from Meta ads and property portals are qualified on WhatsApp and voice, routed in the CRM and booked into an agent's calendar. Your lead sources and routing rules are agreed in discovery.`],
    ['How long does it take to set up a CRM for a real estate business?', `It depends on the scope agreed in your proposal. For reference, the ${l.client} lead qualifier, CRM routing, viewing scheduler and 90-day nurture went live in ${l.elapsed}. Your proposal sets the delivery plan before the build starts.`]
  ];
  const html = `<section class="section detail-section detail-realestate-crm" id="real-estate-crm-india" aria-labelledby="realestate-crm-title"><div class="container"><div class="detail-section-heading reveal">${tag('CRM for real estate')}<h2 id="realestate-crm-title">CRM for real estate businesses in India.</h2><p>We build custom CRMs for real estate teams in India: every enquiry from ads and property portals gets a fast reply, an owner, a booked viewing or a follow-up plan, so hot buyers do not wait until morning.</p></div><div class="detail-deliverable-grid">${cards.map(([title, text], i) => `<article class="detail-deliverable surface reveal"><span class="detail-card-symbol" aria-hidden="true">${icon(['workflow', 'shield', 'code'][i])}</span><h3>${e(title)}</h3><p>${e(text)}</p></article>`).join('')}</div><a class="detail-text-link detail-related-work" href="/case-study/${e(l.slug)}">Read the ${e(l.client)} real estate case study ${icon('arrow')}</a> <a class="detail-text-link detail-related-work" href="/case-study/${e(h.slug)}">Read the ${e(h.client)} CRM case study ${icon('arrow')}</a></div></section>`;
  return {html, faqs};
}

// WhatsApp chatbot section for the WhatsApp & Voice AI Agents page, targeting "WhatsApp chatbot for business India".
// Every figure restates the published Luxe Estates, Noir Clinic and Kinetic Logistics case studies (content.mjs)
// and the service copy (Hindi + English, WhatsApp API in the stack, usage billed separately). No new clients, prices or results.
export function whatsappChatbotSection(slug) {
  if (slug !== 'carryline') return null;
  const l = caseStudies.find(x => x.slug === 'luxe-estates');
  const n = caseStudies.find(x => x.slug === 'noir-clinic');
  const k = caseStudies.find(x => x.slug === 'kinetic-logistics');
  if (!l || !n || !k) return null;
  const lc = s => s.charAt(0).toLowerCase() + s.slice(1);
  const cards = [
    ['Every ad and portal lead answered on WhatsApp', `${l.client} in ${l.city} ran Meta and portal leads into a shared inbox, and median first response was 6 hours. In ${l.elapsed} we put a WhatsApp + voice qualifier on every ad and portal, with instant CRM routing. Follow-up went from 6 hours to ${l.results[1].value.replace('s', ' seconds')}, and qualified viewings rose ${l.results[0].value} in 90 days.`],
    ['Reminders and prep notes on WhatsApp', `At ${n.client} in ${n.city}, 40% of calls went unanswered at lunch and after hours. In ${n.elapsed} we added a Hindi + English voice agent plus WhatsApp reminders: it books, sends prep notes on WhatsApp and confirms the day before. Result: ${n.results[0].value} ${lc(n.results[0].label)}.`],
    ['Driver updates on WhatsApp, read for you', `At ${k.client} in ${k.city}, PODs, invoices and driver WhatsApp updates ate the ops manager's entire week. In ${k.elapsed} we added a driver update parser alongside document AI that syncs to sheet + CRM and flags only exceptions. Result: ${k.results[0].value} ${lc(k.results[0].label)}.`]
  ];
  const faqs = [
    ['Can a WhatsApp chatbot reply in Hindi and English?', `Yes. Our WhatsApp agents work in Hindi and English, trained on your FAQs, pricing and tone. They answer in seconds, qualify with 3 smart questions, book into your calendar and hand off hot or hard cases to your team with the full transcript and summary. The languages are agreed in discovery.`],
    ['Do we need the WhatsApp Business API for a WhatsApp chatbot?', `Our WhatsApp agents are built on the WhatsApp API, and we start from the tools you already use. Any new subscription is in your name, and WhatsApp usage is billed separately from our project fee. We check your current setup, permissions and third-party costs during discovery, so your proposal is clear.`]
  ];
  const html = `<section class="section detail-section detail-whatsapp-chatbot" id="whatsapp-chatbot-india" aria-labelledby="whatsapp-chatbot-title"><div class="container"><div class="detail-section-heading reveal">${tag('WhatsApp chatbots')}<h2 id="whatsapp-chatbot-title">WhatsApp chatbots for businesses in India.</h2><p>We build WhatsApp chatbots for businesses in India that answer enquiries in seconds, qualify leads, book calls and send reminders, then hand hot or hard cases to your team with the full conversation.</p></div><div class="detail-deliverable-grid">${cards.map(([title, text], i) => `<article class="detail-deliverable surface reveal"><span class="detail-card-symbol" aria-hidden="true">${icon(['workflow', 'voice', 'code'][i])}</span><h3>${e(title)}</h3><p>${e(text)}</p></article>`).join('')}</div><a class="detail-text-link detail-related-work" href="/case-study/${e(l.slug)}">Read the ${e(l.client)} WhatsApp lead case study ${icon('arrow')}</a> <a class="detail-text-link detail-related-work" href="/case-study/${e(n.slug)}">Read the ${e(n.client)} case study ${icon('arrow')}</a> <a class="detail-text-link detail-related-work" href="/case-study/${e(k.slug)}">Read the ${e(k.client)} case study ${icon('arrow')}</a></div></section>`;
  return {html, faqs};
}

// AI automation section for the Business Automation page, targeting "AI automation agency India".
// Every figure restates the published Kinetic Logistics, Hearth & Home and Luxe Estates case studies (content.mjs)
// and the service copy (workflows we prioritise). No new clients, prices or results.
export function automationIndiaSection(slug) {
  if (slug !== 'flowback') return null;
  const k = caseStudies.find(x => x.slug === 'kinetic-logistics');
  const h = caseStudies.find(x => x.slug === 'hearth-home');
  const l = caseStudies.find(x => x.slug === 'luxe-estates');
  if (!k || !h || !l) return null;
  const lc = s => s.charAt(0).toLowerCase() + s.slice(1);
  const cards = [
    ['Documents and invoices that process themselves', `At ${k.client} in ${k.city}, PODs, invoices and driver WhatsApp updates ate the ops manager's entire week. In ${k.elapsed} we added document AI that extracts POD + invoice fields, syncs to sheet + CRM and flags only exceptions in one inbox, plus Friday auto-reconciliation. Results: the ops team got ${k.results[0].value} back per week, and billing disputes fell ${k.results[1].value.replace('−', '')} in 60 days.`],
    ['First automation live in 2 days', `${h.client} in ${h.city} had a non-technical founder, slow manual quotes and follow-ups that died after day 2. We recorded one sales call, mapped 3 automations and had the first live in 2 days: accurate quotes in under 60 seconds, 60-day auto follow-up and one Slack summary a day. Enquiries rose ${h.results[0].value} with no new hires.`],
    ['Lead routing and follow-up without a shared inbox', `${l.client} in ${l.city} ran Meta and portal leads into a shared inbox. In ${l.elapsed} we added instant CRM routing, duplicate detection and a 90-day nurture that revives cold enquiries automatically. Result: ${l.results[1].value} ${lc(l.results[1].label)}.`]
  ];
  const faqs = [
    ['What business tasks can AI automation handle?', `We prioritise the workflows that burn the most hours: lead routing and instant follow-up, onboarding and reminders, reporting and reconciliation. For ${k.client}, that meant reading PODs and invoices and syncing them to sheet + CRM; for ${h.client}, instant quotes and 60-day follow-up. Your workflows and integrations are scoped in discovery.`],
    ['How long does it take to set up AI automation for a business?', `It depends on the scope agreed in your proposal. For reference, ${h.client}'s first automation went live in 2 days, and the ${k.client} document AI and reconciliation build went from audit to live in ${k.elapsed}. Your proposal sets the delivery plan before the build starts.`]
  ];
  const html = `<section class="section detail-section detail-automation-india" id="ai-automation-india" aria-labelledby="automation-india-title"><div class="container"><div class="detail-section-heading reveal">${tag('AI automation in India')}<h2 id="automation-india-title">AI automation for businesses in India.</h2><p>We build AI automation for businesses in India around the tools your team already uses: inbox, sheets, CRM and invoices. The work that waits for a person moves on its own, and only exceptions reach your team.</p></div><div class="detail-deliverable-grid">${cards.map(([title, text], i) => `<article class="detail-deliverable surface reveal"><span class="detail-card-symbol" aria-hidden="true">${icon(['code', 'workflow', 'shield'][i])}</span><h3>${e(title)}</h3><p>${e(text)}</p></article>`).join('')}</div><a class="detail-text-link detail-related-work" href="/case-study/${e(k.slug)}">Read the ${e(k.client)} automation case study ${icon('arrow')}</a> <a class="detail-text-link detail-related-work" href="/case-study/${e(h.slug)}">Read the ${e(h.client)} case study ${icon('arrow')}</a> <a class="detail-text-link detail-related-work" href="/case-study/${e(l.slug)}">Read the ${e(l.client)} case study ${icon('arrow')}</a></div></section>`;
  return {html, faqs};
}

function faq(items) {
  return `<div class="detail-faq-list">${items.map(([question, answer]) => `<details><summary><span>${e(question)}</span><span class="faq-plus" aria-hidden="true"></span></summary><div class="faq-answer"><p>${e(answer)}</p></div></details>`).join('')}</div>`;
}

export function serviceDetailPage(slug) {
  const item = services.find(service => slugOf(service) === slug);
  if (!item) return null;
  const copy = context[slug];
  const index = services.indexOf(item);
  const next = services[(index + 1) % services.length];
  const hindi = hindiVoiceSection(slug);
  const web = websiteIndiaSection(slug);
  const crm = realEstateCrmSection(slug);
  const wa = whatsappChatbotSection(slug);
  const auto = automationIndiaSection(slug);
  const faqs = [
    copy.faq,
    ...(hindi ? hindi.faqs : []),
    ...(wa ? wa.faqs : []),
    ...(auto ? auto.faqs : []),
    ...(web ? web.faqs : []),
    ...(crm ? crm.faqs : []),
    serviceProjectsFaq(slug, item.title),
    serviceCostFaq(slug),
    ['Do we have to replace our current tools?', 'We begin with the tools you already use. Discovery checks their available integrations, permissions and data before we recommend the build. Any new software and third-party usage costs are made clear in the proposal.'],
    ['What will the proposal and handover include?', 'Your proposal defines the selected feature, deliverables, integrations, delivery plan, investment and support. Every project is custom-quoted. You own the resulting code, workflows and data in your accounts, with documentation and a working team handover.']
  ].filter(Boolean);
  return `<div class="service-dedicated">
    <section class="detail-hero"><div class="detail-hero-inner">
      <nav class="detail-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/services">Services</a><span aria-hidden="true">/</span><span aria-current="page">${e(item.title)}</span></nav>
      <div class="detail-hero-grid"><div class="detail-hero-copy reveal">${tag(item.category, true)}<h1>${e(item.title)}</h1><p class="detail-hero-headline">${e(copy.headline)}</p>${serviceHeroLede(slug)}<p>${e(item.description)}</p><div class="detail-actions">${button(`Discuss ${item.title}`, '/contact#start')}${button('Explore the signature build', '#signature-build', true)}</div></div>${receipt(item)}</div>
    </div></section>

    <section class="section detail-section"><div class="container detail-fit-grid"><div class="detail-copy reveal">${tag('The right starting point')}<h2>When ${e(item.title)} makes sense.</h2><p>${e(copy.fit)}</p>${item.detailParagraphs.map(paragraph => `<p>${e(paragraph)}</p>`).join('')}</div><aside class="detail-fit-card surface reveal"><span class="detail-label">Start with these questions</span><h3>Map the work before choosing the build.</h3>${checkedList(copy.questions)}<a class="detail-text-link" href="/process">See how we scope a project ${icon('arrow')}</a></aside></div></section>
${auto ? `\n    ${auto.html}\n` : ''}${wa ? `\n    ${wa.html}\n` : ''}${hindi ? `\n    ${hindi.html}\n` : ''}${web ? `\n    ${web.html}\n` : ''}${crm ? `\n    ${crm.html}\n` : ''}
    <section class="section detail-section detail-feature-section" id="signature-build"><div class="container"><div class="detail-section-heading reveal">${tag('The signature build')}<h2>${e(item.signature.name)}</h2><p>${e(item.signature.description)}</p></div><ol class="detail-step-grid">${item.signature.steps.map(([title, description], i) => `<li class="surface reveal"><span class="detail-step-index" aria-hidden="true">0${i + 1}</span><h3>${e(title)}</h3><p>${e(description)}</p></li>`).join('')}</ol><div class="detail-example surface reveal"><span class="detail-example-symbol" aria-hidden="true">${icon(item.icon)}</span><div><span class="detail-label">A practical example</span><p>${e(item.signature.example)}</p></div></div></div></section>

    <section class="section detail-section"><div class="container"><div class="detail-section-heading reveal">${tag('Your project scope')}<h2>The pieces of your build.</h2><p>We agree the useful first version, the connected tools and the operating rules before expanding the system.</p></div><div class="detail-deliverable-grid">${item.details.map((detail, i) => `<article class="detail-deliverable surface reveal"><span class="detail-card-symbol" aria-hidden="true">${icon(['code', 'workflow', 'shield'][i])}</span><h3>${e(['What we deliver', 'Where it fits', 'What we agree together'][i])}</h3>${checkedList(detail.items)}</article>`).join('')}</div><a class="detail-text-link detail-related-work" href="/case-study/${e(copy.case[0])}">${e(copy.case[1])} ${icon('arrow')}</a></div></section>

    <section class="section detail-section detail-safeguards"><div class="container"><div class="detail-safety-grid"><div class="detail-copy reveal">${tag('Useful guardrails')}<h2>A system your team can understand.</h2><p>${e(copy.proof)}</p><a class="detail-text-link" href="/process">Explore testing, launch and handover ${icon('arrow')}</a></div><div class="detail-boundary-list">${copy.boundaries.map(([title, description]) => `<article class="reveal"><span aria-hidden="true">${icon('shield')}</span><div><h3>${e(title)}</h3><p>${e(description)}</p></div></article>`).join('')}</div></div></div></section>

    <section class="section detail-section"><div class="container detail-faq-grid"><div class="detail-section-heading heading-left reveal">${tag('Before we build')}<h2>A few useful answers.</h2><p>Bring your real workflow to the first conversation. We’ll help define what belongs in the scope.</p></div>${faq(faqs)}</div></section>

    <section class="section detail-section detail-related-section" aria-labelledby="related-title"><div class="container"><div class="detail-section-heading reveal">${tag('Related work and reading')}<h2 id="related-title">See ${e(item.title)} in practice.</h2><p>Client projects that used this kind of build, and practical notes on planning it.</p></div>${serviceRelatedLinks(slug)}</div></section>

    <section class="detail-next-section"><div class="container"><div class="detail-next-heading"><div><span class="detail-label">Explore another starting point</span><h2>Next: ${e(next.title)}</h2><p>${e(next.category)}</p></div>${button(`Explore ${next.title}`, `/services/${slugOf(next)}`, true)}</div><nav class="detail-service-navigation" aria-label="Service pages">${services.map(service => `<a href="/services/${slugOf(service)}" ${service === item ? 'aria-current="page"' : ''}>${icon(service.icon)}<span>${e(service.title)}</span></a>`).join('')}</nav></div></section>

    <section class="detail-contact-section"><div class="container"><div><span class="detail-label">A custom build. A clear proposal.</span><h2>Let’s shape your ${e(item.title)}.</h2><p>Tell us where the work gets stuck and what you already use. We’ll map a useful starting point and prepare your custom quote.</p></div><div class="detail-actions">${button('Get a custom quote', '/custom-quote#start')}${button('Email Zykken', 'mailto:info@zykken.com', true)}</div></div></section>
  </div>`;
}
