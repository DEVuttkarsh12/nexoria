import {original, caseStudies, services, testimonials, team, values, timeline, faqs, insights} from './content.mjs';
import {escapeHtml as e, icon, tag, button, sectionHeading, pageHero, ctaSection, faqSection, contactForm} from './layout.mjs';
import {caseCard, insightCards} from './home.mjs';
import {projectVisual} from './project-visuals.mjs';
import {teamCards,clientEmblem} from './people-visuals.mjs';
import {homeProcess} from './delivery-visuals.mjs';

const list = items => `<ul class="feature-list">${items.map(item => `<li>${icon('check')}<span>${e(item)}</span></li>`).join('')}</ul>`;
const metrics = (items, cls = 'inner-stats') => `<div class="${cls}">${items.map(item => `<div class="stat-item"><strong>${e(item.value)}</strong><span>${e(item.label)}</span></div>`).join('')}</div>`;
const agencyStats = [{value:'120+',label:'AI systems shipped'},{value:'98%',label:'Clients stay with us'},{value:'21 days',label:'Go-live target'},{value:'80%',label:'Less manual work'}];
const contactDetails = () => `<div class="contact-details"><a class="contact-detail" href="mailto:info@zykken.com">${icon('mail')}<div><span>EMAIL US</span><strong>info@zykken.com</strong></div></a><div class="contact-detail">${icon('clock')}<div><span>OUR RESPONSE</span><strong>Within 12 hours</strong></div></div><div class="contact-detail">${icon('globe')}<div><span>WHERE WE WORK</span><strong>Hindi + English. Worldwide.</strong></div></div></div>`;
const testimonialSection = (items = testimonials.slice(0,3)) => `<section class="section inner-testimonials"><div class="container">${sectionHeading('Testimonials','What our clients say','The teams using our systems, in their own words.')}<div class="inner-testimonial-shell reveal"><div class="inner-testimonial-track" data-carousel data-autoplay="5000" aria-label="Client testimonials">${items.map((item,i) => `<article class="inner-testimonial-slide">${clientEmblem(item,i)}<div class="inner-testimonial-copy"><span class="inner-quote-mark" aria-hidden="true">“</span><blockquote>${e(item.quote)}</blockquote><div class="quote-author"><span class="initial-avatar" aria-hidden="true">${e(item.initials)}</span><div><strong>${e(item.name || item.person)}</strong><span>${e(item.role)}</span></div></div><span class="inner-quote-count">0${i+1}<span> / 0${items.length}</span></span></div></article>`).join('')}</div><div class="inner-testimonial-controls"><button class="circle-button" type="button" data-carousel-prev aria-label="Previous testimonial">${icon('arrow')}</button><button class="circle-button" type="button" data-carousel-next aria-label="Next testimonial">${icon('arrow')}</button></div></div></div></section>`;
const auditSection = () => `<section class="section" id="start"><div class="container contact-grid"><div class="contact-copy reveal">${tag('Let’s talk')}<h2>One call.<br>A clear way forward.</h2><p>${e(original.contact.description)}</p>${contactDetails()}<div class="audit-inclusions">${list(['One 30-minute call + one workflow recording','Three opportunities ranked by potential return','Your scope, custom quote and delivery plan'])}</div></div>${contactForm()}</div></section>`;

export function aboutPage() {
 return `${pageHero('About Zykken','People who build.<br>Systems that work.','A compact senior team. Strategy, design and engineering under one roof. The person who scopes your system is the person who ships it.')}
 <section class="section section-tight"><div class="container">${metrics(agencyStats)}</div></section>
 <section class="section"><div class="container about-inner-grid"><div class="about-inner-art surface reveal"><img src="/assets/agen/optimized/about-globe.webp" width="1200" height="1200" alt="A softly lit globe representing connected systems" loading="lazy"><span class="about-art-caption">CONNECTED THINKING.<br>REAL-WORLD DELIVERY.</span></div><div class="split-copy reveal">${tag('Our approach')}<h2>Senior people.<br>No hand-offs.</h2><p>${e(original.about.description.replace(' Contact: info@zykken.com','').replace(/^zykken/,'Zykken'))}</p><p>Three clients a month max. One person who knows your business. A Loom from the builder every 48 hours.</p>${button('Build with Zykken','/contact')}</div></div></section>
 <section class="section section-muted"><div class="container">${sectionHeading('Our commitments','Useful by design.<br>Yours from day one.','Clear scope, useful systems, and ownership from the first working version.')}<div class="value-grid">${values.map((item,i) => `<article class="value-card card surface reveal"><span class="card-icon">${icon(['heart','chart','shield','chip','clock','workflow'][i])}</span><h3>${e(item.title)}</h3><p>${e(item.description)}</p></article>`).join('')}</div></div></section>
 <section class="section"><div class="container">${sectionHeading('The team','The people shipping<br>your next system.',e(original.about.teamDescription))}${teamCards(team)}<div class="section-end">${button('Meet the Team','/team',true)}</div></div></section>
 <section class="section section-muted"><div class="container">${sectionHeading('Our journey','One useful system<br>at a time.','From early automation rescues to connected systems for growing businesses.')}<div class="timeline-grid">${timeline.map(item => `<article class="timeline-card reveal"><span class="timeline-year">${e(item.year)}</span><h3>${e(item.title)}</h3><p>${e(item.description.replace('This site is our standard: black, calm, fast — proof over promises.','Our standard is calm, useful systems — proof over promises.').replace(/zykken/g,'Zykken'))}</p></article>`).join('')}</div></div></section>
 <div id="voices">${testimonialSection(testimonials)}</div><div class="container section-end">${button('Explore All Client Stories','/testimonials',true)}</div>${ctaSection()}`;
}

const signatureFeature = item => `<article class="signature-feature surface reveal" aria-labelledby="signature-${e(item.id)}"><div class="signature-copy">${tag('The signature build')}<h3 id="signature-${e(item.id)}">${e(item.signature.name)}</h3><p>${e(item.signature.description)}</p><div class="signature-example"><span class="eyebrow">IN PRACTICE</span><p>${e(item.signature.example)}</p></div></div><ol class="signature-steps">${item.signature.steps.map(([title,description],i)=>`<li><span class="signature-step-number" aria-hidden="true">0${i+1}</span><div><h4>${e(title)}</h4><p>${e(description)}</p></div></li>`).join('')}</ol></article>`;
const servicePreview = item => `<div class="service-graphic service-system-preview surface reveal" aria-label="Illustrative ${e(item.signature.name)} workflow"><div class="system-preview-halo" aria-hidden="true"></div><div class="system-preview-symbol" aria-hidden="true">${icon(item.icon)}</div><div class="system-preview-window"><div class="system-window-bar"><span></span><span></span><span></span><small>ZYKKEN / ${e(item.title.toUpperCase())}</small></div><div class="system-window-content"><span class="eyebrow">${e(item.signature.name)}</span>${item.signature.preview.map((row,i)=>`<div class="system-preview-row"><span class="system-preview-node" aria-hidden="true">${i===2?icon('clock'):icon('check')}</span><span>${e(row)}</span><i aria-hidden="true"></i></div>`).join('')}<div class="system-preview-status">${icon('shield')}<span>Your rules. Your team. Your next step.</span></div></div></div><span class="system-preview-caption">ILLUSTRATIVE CUSTOM BUILD</span></div>`;

export function servicesPage() {
 const serviceBody = services.map((item,i) => `<section class="section service-detail ${i%2?'section-muted':''}" id="${e(item.id)}"><div class="container"><div class="service-detail-top ${i%2?'split-reverse':''}"><div class="service-copy reveal">${tag(`${item.number} / ${item.category}`)}<h2>${e(item.title)}</h2><p class="service-tagline">${e(item.tagline)}</p><p>${e(item.description)}</p>${button(`Explore ${item.title}`,`/services/${item.title.toLowerCase()}`)}</div>${servicePreview(item)}</div><div class="catalog-signature surface"><span class="eyebrow">SIGNATURE FEATURE</span><h3>${e(item.signature.name)}</h3><p>${e(item.signature.description)}</p></div></div></section>`).join('');
 return `${pageHero('Our expertise','Five systems.<br>A signature edge.','Recover a stalled workflow. Carry a conversation forward. Clarify an enquiry. Preview a change. Keep a promise. Custom-built around your business.')}
 <section class="section section-tight"><div class="container"><div class="service-jump-links">${services.map(item => `<a href="#${e(item.id)}">${icon(item.icon)}<span><strong>${e(item.title)}</strong><small>${e(item.category)}</small></span>${icon('arrow')}</a>`).join('')}</div><p class="service-scope-note">Choose a starting point. We shape the feature, integrations and delivery plan together. Every system receives a custom quote.</p></div></section>
 ${serviceBody}
 <section class="section"><div class="container">${sectionHeading('How we work','From real work<br>to a working system.','A clear scope, a custom quote, and updates from the person building your system.')}${homeProcess()}<div class="section-end">${button('See the Full Delivery Process','/process',true)}</div><div class="grid-two service-working-notes"><article class="card surface reveal"><h3>What we need from you</h3><p>One decision-maker, access to the tools you already use, and 30 minutes a week to review progress. Start with one call and one workflow recording.</p></article><article class="card surface reveal"><h3>Everything agreed together</h3><p>Your project investment, deliverables, timeline and post-launch support are agreed before the build. Additional work is scoped and quoted separately.</p></article></div></div></section>
 <section class="section section-muted" id="calculator"><div class="container">${sectionHeading('The opportunity','What does manual<br>work cost?','Explore the value of time recovered. No email required. This estimate assumes automation recovers 80% of your repeated work.')}
 <div class="roi-panel surface reveal" data-roi-calculator><div class="roi-controls"><label class="roi-control" for="roi-hours"><span>TEAM HOURS LOST / WEEK</span><output id="roi-hours-value" for="roi-hours" data-roi-hours-label>30 hrs/wk</output><input id="roi-hours" name="hours" type="range" min="5" max="120" value="30" data-roi-hours></label><label class="roi-control" for="roi-cost"><span>AVERAGE HOURLY COST</span><output id="roi-cost-value" for="roi-cost" data-roi-cost-label>$25/hr</output><input id="roi-cost" name="cost" type="range" min="5" max="120" value="25" data-roi-cost></label></div><div class="roi-results" aria-live="polite"><div><strong data-roi-monthly>$2,598</strong><span>Estimated recoverable value / month</span></div><div><strong data-roi-hours-saved>104 hrs</strong><span>Estimated time recovered / month</span></div><div><strong data-roi-yearly>$31,176</strong><span>Estimated recoverable value / year</span></div></div><p class="form-note">An estimate of time value, based on 4.33 weeks per month. Your actual scope and return depend on the workflow.</p></div></div></section>
 ${testimonialSection()}${faqSection(faqs.services)}${ctaSection()}`;
}

const caseCards = (items = caseStudies) => items.map(item => caseCard(item)).join('');
export function workPage() {
 const categories=[['all','All work'],['automation','Automation'],['website','Websites'],['saas','Software'],['voice','Voice'],['crm','CRM']];
 return `${pageHero('Selected work','Real problems.<br>Working solutions.','Six systems. Clear problems, considered builds, and the results that followed. Discover what we built for teams like yours.')}
 <section class="section section-tight"><div class="container"><div class="case-filters" role="group" aria-label="Filter case studies">${categories.map(([value,label],i)=>`<button type="button" class="filter-button ${i===0?'active':''}" data-filter="${value}" aria-pressed="${i===0}">${label}</button>`).join('')}</div><div class="case-grid">${caseCards()}</div><p class="filter-result" data-filter-count role="status" aria-live="polite">Showing all 6 case studies</p></div></section>${testimonialSection()}${ctaSection()}`;
}
export function customQuotePage() {
 return `${pageHero('Your custom quote','Your business.<br>Your build plan.','Your workflows, goals, integrations and support needs shape your proposal. Start with a free audit and receive a clear custom quote before work begins.')}
 <section class="section section-tight"><div class="container">${sectionHeading('A considered scope','A clear path from<br>idea to investment.','Understand the problem, shape the solution, and agree the scope together.')}${homeProcess()}<div class="quote-principles"><article class="card surface reveal"><span class="card-icon">${icon('workflow')}</span><h3>A proposal for your requirements</h3><p>Every service is custom-priced. Your proposal covers the deliverables, integrations, delivery timeline, project investment and payment milestones.</p></article><article class="card surface reveal"><span class="card-icon">${icon('shield')}</span><h3>Support that fits your system</h3><p>Handover and post-launch support are agreed in your scope. Ongoing care, additional development and relevant third-party usage receive a clear custom quote.</p></article><article class="card surface reveal"><span class="card-icon">${icon('code')}</span><h3>Ownership from day one</h3><p>Your code, accounts, workflows, prompts, documentation and data stay under your ownership. The proposal sets out a working handover for your team.</p></article></div></div></section>
 ${auditSection()}${faqSection(faqs.quote)}${ctaSection()}`;
}
export function contactPage() {
 return `${pageHero('Get in touch','Let’s shape your<br>next useful system.','Have a project in mind? Start with a free audit. One 30-minute call, one workflow recording, and three opportunities ranked by potential return.')}
 <section class="section section-tight" id="start"><div class="container contact-grid contact-page-grid"><div class="contact-copy reveal">${tag('Start a conversation')}<h2>Bring the problem.<br>We’ll map the way.</h2><p>Tell us about your business, the tools you already use and the work that needs a better way forward.</p>${contactDetails()}<div class="contact-promise surface">${icon('shield')}<p>A clear scope, a custom quote, and a system you own. If we can’t see a useful return, we’ll tell you before the build.</p></div></div>${contactForm()}</div></section>${faqSection(faqs.services.slice(0,6))}`;
}

// These scopes are taken from the preserved Zykken records, not the template projects.
const caseDeliverables = {
 'luxe-estates':['Lead qualification','CRM routing','Viewing calendar','Follow-up nurture'],
 'velvet-co':['Editorial storefront','AI concierge','Checkout experience','Bilingual support'],
 'pulse-fit-os':['Member application','Trainer dashboard','Payment workflows','Coach-reviewed AI plans'],
 'noir-clinic':['Voice agent','WhatsApp reminders','Calendar booking','Human escalation'],
 'kinetic-logistics':['Document extraction','Exception inbox','CRM sync','Reconciliation'],
 'hearth-home':['Website','CRM capture','Quote automation','Follow-up nurture'],
};
const caseRequirements = {
 'luxe-estates':['Respond across day, night and weekend enquiries','Qualify and route leads without creating duplicates','Connect viewing bookings to each agent’s calendar'],
 'velvet-co':['Make the premium product experience work on mobile','Answer sizing, pairing and gifting questions','Keep the path from product discovery to checkout clear'],
 'pulse-fit-os':['Bring bookings, payments and member tracking together','Give trainers one view of rosters and retention','Keep generated plans under a coach’s approval'],
 'noir-clinic':['Handle bookings on the clinic’s existing number','Support Hindi and English callers','Escalate urgent enquiries with the conversation attached'],
 'kinetic-logistics':['Extract useful fields from delivery and invoice documents','Send incomplete or uncertain cases to one exception inbox','Connect driver updates, records and reconciliation'],
 'hearth-home':['Give the founder a simple enquiry and quote flow','Keep follow-up moving beyond the first two days','Summarize the day’s activity in one place'],
};
export function caseStudyPage(slug) {
 const item = caseStudies.find(c => c.slug === slug);
 if (!item) return null;
 const next = caseStudies[(caseStudies.indexOf(item)+1)%caseStudies.length];
 const suffix = (item.title.split(' — ')[1] || 'A connected business system').replace(/^the /,'');
 const deliverables = caseDeliverables[item.slug];
 const overviews = {
  'luxe-estates':'Lead qualification, viewing bookings and follow-up connected to the agents’ existing workflow.',
  'velvet-co':'An editorial storefront with a bilingual AI concierge and a clearer journey from discovery to checkout.',
  'pulse-fit-os':'Bookings, payments and coach-reviewed plans brought together in one member and trainer platform.',
  'noir-clinic':'A bilingual voice assistant connects callers, appointments and reminders, with urgent enquiries handed to staff.',
  'kinetic-logistics':'Document extraction, reconciliation and an exception inbox connect the everyday delivery workflow.',
  'hearth-home':'A website, CRM and quote flow keep enquiries and follow-up moving together.',
 };
 const servicePath = {automation:'flowback',website:'intentpath',saas:'previewops',voice:'carryline',crm:'pledgedesk'}[item.category];
 return `<div class="project-page">
 <section class="project-hero" aria-labelledby="project-title"><div class="project-hero-panel">
 <nav class="project-breadcrumb" aria-label="Breadcrumb"><a href="/work">Selected work</a><span aria-hidden="true">/</span><span aria-current="page">${e(item.client)}</span></nav>
 <div class="project-hero-grid"><div class="project-hero-copy">${tag('Selected project',true)}<h1 id="project-title">${e(item.client)}</h1><p class="project-deck">${e(suffix)}</p><p class="project-summary">${e(overviews[item.slug])}</p>
 <dl class="project-facts"><div><dt>Industry</dt><dd>${e(item.industry)}</dd></div><div><dt>Project</dt><dd>${e(item.categoryLabel)}</dd></div><div><dt>Build time</dt><dd>${e(item.elapsed)}</dd></div></dl>
 <div class="project-actions">${button('Explore the project','#project-challenge')}<a class="text-link" href="/work">All projects ${icon('arrow')}</a></div></div>
 <figure class="project-cover surface"><div class="project-cover-image">${projectVisual(item,{variant:'detail'})}</div><figcaption><span>${e(item.client)} / ${e(item.categoryLabel)}</span><span>Conceptual system illustration</span></figcaption></figure>
 </div></div></section>
 <div class="container project-story">
 <nav class="project-section-nav" aria-label="On this project"><span>Inside the project</span><a href="#project-challenge">01 · The challenge</a><a href="#project-solution">02 · The solution</a><a href="#project-results">03 · The results</a></nav>
 <section class="project-story-row" id="project-challenge" aria-labelledby="challenge-title"><div class="project-section-heading"><span class="project-index">01 / THE STARTING POINT</span><h2 id="challenge-title">The challenge.</h2></div><div class="project-story-copy"><p>${e(item.problem)}</p><div class="project-requirements surface"><h3>What needed to change</h3>${list(caseRequirements[item.slug])}</div></div></section>
 <section class="project-story-row" id="project-solution" aria-labelledby="solution-title"><div class="project-section-heading"><span class="project-index">02 / THE BUILD</span><h2 id="solution-title">A connected solution.</h2><a class="text-link" href="/services/${servicePath}">Explore this expertise ${icon('arrow')}</a></div><div class="project-story-copy"><p>${e(item.build)}</p><div class="project-deliverables"><h3>What we delivered</h3><ul>${deliverables.map((label,i)=>`<li><span aria-hidden="true">0${i+1}</span><strong>${e(label)}</strong>${icon('check')}</li>`).join('')}</ul></div></div></section>
 <section class="project-results-section" id="project-results" aria-labelledby="results-title"><div class="project-results-heading"><div class="project-section-heading"><span class="project-index">03 / THE OUTCOME</span><h2 id="results-title">The results.</h2></div><p>The project outcomes for ${e(item.client)}, following a ${e(item.elapsed)} build around their team’s needs.</p></div><dl class="project-results-grid">${item.results.map(result=>`<div class="project-result surface"><dt>${e(result.label)}</dt><dd>${e(result.value)}</dd></div>`).join('')}</dl></section>
 <section class="project-perspective" aria-labelledby="perspective-title"><div><span class="project-index">THE CLIENT PERSPECTIVE</span><h2 id="perspective-title">In their words.</h2><div class="quote-author"><span class="initial-avatar" aria-hidden="true">${e(item.initials)}</span><div><strong>${e(item.person)}</strong><span>${e(item.role)}</span></div></div></div><blockquote><span aria-hidden="true">“</span><p>${e(item.quote).replace(/zykken/g,'Zykken')}</p></blockquote></section>
 </div>
 <section class="section project-next"><div class="container"><div class="project-next-heading"><div><span class="project-index">KEEP EXPLORING</span><h2>Next project.</h2></div><a class="text-link" href="/work">Back to all work ${icon('arrow')}</a></div><div class="case-grid case-grid-single">${caseCard(next)}</div></div></section>
 ${ctaSection()}
 </div>`;
}
export function insightsPage() {
 return `${pageHero('The journal','Clear thinking.<br>Useful next steps.','Practical notes on choosing a first workflow, connecting your sales systems, and keeping them useful after launch.')}<section class="section section-tight"><div class="container">${insightCards()}</div></section>${ctaSection()}`;
}
export function blogPage(slug) {
 const item=insights.find(i=>i.slug===slug);
 if (!item) return null;
 return `<section class="page-hero article-hero"><div class="article-hero-inner"><nav class="article-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/insights">Insights</a><span aria-hidden="true">/</span><span aria-current="page">Article</span></nav>${tag('The journal',true)}<h1>${e(item.title)}</h1><div class="article-meta"><span>${e(item.category)}</span><span>${e(item.readTime)}</span></div></div></section>
 <section class="section article-reading"><div class="container"><article class="article-body prose"><p class="article-intro">${e(item.intro)}</p>${item.sections.map(([title,copy])=>`<section class="article-chapter"><h2>${e(title)}</h2><p>${e(copy)}</p></section>`).join('')}<div class="article-audit surface"><h3>Start with your free audit.</h3><p>One workflow recording. Three opportunities. A clear scope and a custom quote.</p>${button('Request your free audit','/contact')}</div><a class="back-link text-link" href="/insights">All insights ${icon('arrow')}</a></article></div></section><section class="section section-muted"><div class="container">${sectionHeading('Keep exploring','More practical insights.')}${insightCards(insights.filter(i=>i.slug!==slug))}</div></section>${ctaSection()}`;
}
export function legalPage(kind) {
 const privacy=kind==='privacy';
 const title=privacy?'Privacy policy':'Terms & conditions';
 const sections=privacy ? [
  ['Information you provide','The inquiry form asks for your name, email address, the service you are interested in, and any details you choose to share about your project. A phone or WhatsApp number and a message are optional.'],
  ['How your inquiry is handled','The form sends your inquiry to info@zykken.com through Resend, our email delivery provider. Your email address is used as Reply-To so we can respond to your request. We use the details you provide to discuss your project and prepare the requested audit or quote.'],
  ['Form validation','The website validates the information you enter and uses a hidden form field to reduce automated spam. It reports success only after the email provider accepts the inquiry. If delivery fails, your form details remain available for you to retry or contact us by email.'],
  ['Your choices','You can contact us directly at info@zykken.com instead of submitting the form. Send questions about information you have shared, or requests relating to your inquiry, to that same address.'],
 ] : [
  ['Project scope and quotations','Every service receives a custom quote based on your requirements. Following discovery, the deliverables, timeline, project investment, payment milestones and post-launch support are set out in your proposal before work begins. The agreed project proposal defines your engagement.'],
  ['Additional work','Changes inside the agreed outcome are handled within the project scope. New workflows, integrations or other additional build work are scoped and fixed-quoted for your approval before work begins.'],
  ['Separate operating costs','Your proposal identifies applicable taxes and relevant operating costs. Software subscriptions, hosting and API, AI, SMS, WhatsApp or email usage are separate from build and management fees. Relevant third-party costs are identified during discovery.'],
  ['Ownership and handover','Code, workflows, prompts, CRM, analytics, documentation and data are owned by you and built in your accounts from day one. The handover, team training and post-launch support are agreed in your project scope.'],
  ['Optional ongoing care','Ongoing care is separate from implementation and is customized to system complexity and ongoing workload. Additional build work requires a separate scope and quote.'],
  ['Get in touch','For questions about a proposal, project or this website, contact info@zykken.com.'],
 ];
 return `${pageHero(privacy?'Your information':'Working with Zykken',title,privacy?'How inquiries through this website are handled.':'An overview of our project approach. Your agreed proposal sets out your project terms.')}<section class="section section-tight"><div class="container"><article class="legal-content prose surface reveal">${sections.map(([heading,copy])=>`<h2>${e(heading)}</h2><p>${e(copy)}</p>`).join('')}<p><a class="text-link" href="mailto:info@zykken.com">info@zykken.com ${icon('arrow')}</a></p></article></div></section>`;
}
