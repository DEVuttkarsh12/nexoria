import {serviceSpecimen} from './systems-visuals.mjs';
import {services} from './content.mjs';
import {escapeHtml as e, icon, tag, button} from './layout.mjs';
import {serviceRelatedLinks} from './related-links.mjs';

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
  flowback: ['Business Automation & AI Workflow Automation in India', 'Zykken builds AI workflow automation for lead routing, onboarding, document processing and reporting around your existing tools, with a recovery desk for failed steps. Custom-quoted; free 30-minute audit.'],
  carryline: ['WhatsApp Chatbot & AI Voice Agents in Hindi and English', 'WhatsApp chatbots and AI voice agents for businesses in India, in Hindi and English, for enquiries, qualification and booking, with a shared handoff brief for your team.'],
  intentpath: ['Website Design & Development Company in India', 'Zykken website design and development: copy, design, development and measurement in one build, with a guided enquiry journey that sends visitors to the right person.'],
  previewops: ['Custom Software Development, Portals & Dashboards', 'Custom portals, dashboards, member apps and internal tools with an approval preview: inspect affected records, review the change, then commit with a receipt.'],
  pledgedesk: ['CRM & Lead Follow-up for Real Estate and Sales Teams', 'A custom CRM that tracks leads and the commitments inside conversations. For Luxe Estates, real estate lead follow-up went from 6 hours to 38 seconds.']
};
export const serviceDetailRoutes = services.map(item => ({
  slug: slugOf(item),
  path: `/services/${slugOf(item)}`,
  title: SEO[item.slug]?.[0] || `${item.title} — ${item.category}`,
  description: SEO[item.slug]?.[1] || item.description
}));

const checkedList = items => `<ul class="detail-check-list">${items.map(item => `<li>${icon('check')}<span>${e(item)}</span></li>`).join('')}</ul>`;

function receipt(item) { return serviceSpecimen(item); }

function faq(items) {
  return `<div class="detail-faq-list">${items.map(([question, answer]) => `<details><summary><span>${e(question)}</span><span class="faq-plus" aria-hidden="true"></span></summary><div class="faq-answer"><p>${e(answer)}</p></div></details>`).join('')}</div>`;
}

export function serviceDetailPage(slug) {
  const item = services.find(service => slugOf(service) === slug);
  if (!item) return null;
  const copy = context[slug];
  const index = services.indexOf(item);
  const next = services[(index + 1) % services.length];
  const faqs = [
    copy.faq,
    ['Do we have to replace our current tools?', 'We begin with the tools you already use. Discovery checks their available integrations, permissions and data before we recommend the build. Any new software and third-party usage costs are made clear in the proposal.'],
    ['What will the proposal and handover include?', 'Your proposal defines the selected feature, deliverables, integrations, delivery plan, investment and support. Every project is custom-quoted. You own the resulting code, workflows and data in your accounts, with documentation and a working team handover.']
  ];
  return `<div class="service-dedicated">
    <section class="detail-hero"><div class="detail-hero-inner">
      <nav class="detail-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/services">Services</a><span aria-hidden="true">/</span><span aria-current="page">${e(item.title)}</span></nav>
      <div class="detail-hero-grid"><div class="detail-hero-copy reveal">${tag(item.category, true)}<h1>${e(item.title)}</h1><p class="detail-hero-headline">${e(copy.headline)}</p><p>${e(item.description)}</p><div class="detail-actions">${button(`Discuss ${item.title}`, '/contact#start')}${button('Explore the signature build', '#signature-build', true)}</div></div>${receipt(item)}</div>
    </div></section>

    <section class="section detail-section"><div class="container detail-fit-grid"><div class="detail-copy reveal">${tag('The right starting point')}<h2>When ${e(item.title)} makes sense.</h2><p>${e(copy.fit)}</p>${item.detailParagraphs.map(paragraph => `<p>${e(paragraph)}</p>`).join('')}</div><aside class="detail-fit-card surface reveal"><span class="detail-label">Start with these questions</span><h3>Map the work before choosing the build.</h3>${checkedList(copy.questions)}<a class="detail-text-link" href="/process">See how we scope a project ${icon('arrow')}</a></aside></div></section>

    <section class="section detail-section detail-feature-section" id="signature-build"><div class="container"><div class="detail-section-heading reveal">${tag('The signature build')}<h2>${e(item.signature.name)}</h2><p>${e(item.signature.description)}</p></div><ol class="detail-step-grid">${item.signature.steps.map(([title, description], i) => `<li class="surface reveal"><span class="detail-step-index" aria-hidden="true">0${i + 1}</span><h3>${e(title)}</h3><p>${e(description)}</p></li>`).join('')}</ol><div class="detail-example surface reveal"><span class="detail-example-symbol" aria-hidden="true">${icon(item.icon)}</span><div><span class="detail-label">A practical example</span><p>${e(item.signature.example)}</p></div></div></div></section>

    <section class="section detail-section"><div class="container"><div class="detail-section-heading reveal">${tag('Your project scope')}<h2>The pieces of your build.</h2><p>We agree the useful first version, the connected tools and the operating rules before expanding the system.</p></div><div class="detail-deliverable-grid">${item.details.map((detail, i) => `<article class="detail-deliverable surface reveal"><span class="detail-card-symbol" aria-hidden="true">${icon(['code', 'workflow', 'shield'][i])}</span><h3>${e(['What we deliver', 'Where it fits', 'What we agree together'][i])}</h3>${checkedList(detail.items)}</article>`).join('')}</div><a class="detail-text-link detail-related-work" href="/case-study/${e(copy.case[0])}">${e(copy.case[1])} ${icon('arrow')}</a></div></section>

    <section class="section detail-section detail-safeguards"><div class="container"><div class="detail-safety-grid"><div class="detail-copy reveal">${tag('Useful guardrails')}<h2>A system your team can understand.</h2><p>${e(copy.proof)}</p><a class="detail-text-link" href="/process">Explore testing, launch and handover ${icon('arrow')}</a></div><div class="detail-boundary-list">${copy.boundaries.map(([title, description]) => `<article class="reveal"><span aria-hidden="true">${icon('shield')}</span><div><h3>${e(title)}</h3><p>${e(description)}</p></div></article>`).join('')}</div></div></div></section>

    <section class="section detail-section"><div class="container detail-faq-grid"><div class="detail-section-heading heading-left reveal">${tag('Before we build')}<h2>A few useful answers.</h2><p>Bring your real workflow to the first conversation. We’ll help define what belongs in the scope.</p></div>${faq(faqs)}</div></section>

    <section class="section detail-section detail-related-section" aria-labelledby="related-title"><div class="container"><div class="detail-section-heading reveal">${tag('Related work and reading')}<h2 id="related-title">See ${e(item.title)} in practice.</h2><p>Client projects that used this kind of build, and practical notes on planning it.</p></div>${serviceRelatedLinks(slug)}</div></section>

    <section class="detail-next-section"><div class="container"><div class="detail-next-heading"><div><span class="detail-label">Explore another starting point</span><h2>Next: ${e(next.title)}</h2><p>${e(next.category)}</p></div>${button(`Explore ${next.title}`, `/services/${slugOf(next)}`, true)}</div><nav class="detail-service-navigation" aria-label="Service pages">${services.map(service => `<a href="/services/${slugOf(service)}" ${service === item ? 'aria-current="page"' : ''}>${icon(service.icon)}<span>${e(service.title)}</span></a>`).join('')}</nav></div></section>

    <section class="detail-contact-section"><div class="container"><div><span class="detail-label">A custom build. A clear proposal.</span><h2>Let’s shape your ${e(item.title)}.</h2><p>Tell us where the work gets stuck and what you already use. We’ll map a useful starting point and prepare your custom quote.</p></div><div class="detail-actions">${button('Get a custom quote', '/custom-quote#start')}${button('Email Zykken', 'mailto:info@zykken.com', true)}</div></div></section>
  </div>`;
}
