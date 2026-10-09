import {
  original, caseStudies, services, testimonials,
  team, values, timeline, process, faqs, insights,
} from './content.mjs';
import {
  escapeHtml as e, icon, tag, button, sectionHeading, pageHero,
  ctaSection, faqSection, contactForm,
} from './layout.mjs';
import {caseCard, insightCards} from './home.mjs';

const list = items => `<ul class="feature-list">${items.map(item => `<li>${icon('check')}<span>${e(item)}</span></li>`).join('')}</ul>`;
const metrics = (items, cls = 'inner-stats') => `<div class="${cls}">${items.map(item => `<div class="stat-item"><strong>${e(item.value)}</strong><span>${e(item.label)}</span></div>`).join('')}</div>`;
const agencyStats = [
  {value:'120+', label:'AI systems shipped'},
  {value:'98%', label:'Clients stay with us'},
  {value:'21 days', label:'Go-live target'},
  {value:'80%', label:'Less manual work'},
];
const quotation = item => `<article class="testimonial-card surface reveal"><div class="stars" aria-label="5 out of 5 stars">★★★★★</div><blockquote>“${e(item.quote)}”</blockquote><div class="quote-author"><span class="initial-avatar" aria-hidden="true">${e(item.initials)}</span><div><strong>${e(item.name || item.person)}</strong><span>${e(item.role)}</span></div></div>${item.proof ? `<span class="testimonial-proof">${e(item.proof.replace('✓ VERIFIED · ',''))}</span>` : ''}</article>`;
const testimonialSection = (items = testimonials.slice(0,3)) => `<section class="section"><div class="container">${sectionHeading('CLIENT STORIES','What Our Clients Say','The people who work with our systems, in their own words.')}<div class="grid-three testimonial-grid">${items.map(quotation).join('')}</div></div></section>`;
const processCards = () => `<div class="process-grid">${process.map(item => `<article class="process-card surface reveal"><span class="step-number">${e(item.number)}</span><h3>${e(item.title)}</h3><p>${e(item.description)}</p></article>`).join('')}</div>`;
const contactDetails = () => `<div class="contact-details"><a class="contact-detail" href="mailto:info@zykken.com">${icon('mail')}<div><span>OUR EMAIL</span><strong>info@zykken.com</strong></div></a><div class="contact-detail">${icon('clock')}<div><span>OUR RESPONSE</span><strong>Within 12 hours</strong></div></div><div class="contact-detail">${icon('globe')}<div><span>BUILT FOR YOUR BUSINESS</span><strong>Hindi + English. Worldwide.</strong></div></div></div>`;
const auditSection = () => `<section class="section" id="start"><div class="container contact-grid"><div class="contact-copy reveal">${tag('START WITH A FREE AUDIT')}<h2>One call.<br>A clear way forward.</h2><p>${e(original.contact.description)}</p>${contactDetails()}<div class="audit-inclusions">${list(['One 30-minute call + one workflow recording','Three opportunities ranked by potential return','Your scope, fixed quote and go-live date'])}</div></div>${contactForm()}</div></section>`;

export function aboutPage() {
  const body = `${pageHero('ABOUT US','Building the Future with<br>Human-Centered AI','A compact senior team. Strategy, design and engineering under one roof. The person who scopes your system is the person who ships it.')}
  <section class="section section-tight"><div class="container">${metrics(agencyStats)}</div></section>
  <section class="section"><div class="container split-layout"><div class="sculpture-panel surface reveal"><img src="/assets/about-sculpture.png" width="800" height="800" alt="Sculptural silver form" loading="lazy"></div><div class="split-copy reveal">${tag('THE ZYKKEN WAY')}<h2>Senior people.<br>No hand-offs.</h2><p>${e(original.about.description.replace(' Contact: info@zykken.com','').replace(/^zykken/,'Zykken'))}</p><p>Three clients a month max. One person who knows your business. A Loom from the builder every 48 hours.</p>${button('Work With Us','/contact')}</div></div></section>
  <section class="section"><div class="container">${sectionHeading('OUR CORE COMMITMENTS','Calm work. Loud results.','Clear scope, useful systems, and ownership from day one.')}<div class="grid-three">${values.map((item,i) => `<article class="value-card card surface reveal"><span class="card-icon">${icon(['heart','chart','shield','chip','clock','workflow'][i])}</span><h3>${e(item.title)}</h3><p>${e(item.description)}</p></article>`).join('')}</div></div></section>
  <section class="section"><div class="container">${sectionHeading('MEET THE TEAM','Real humans. Real experience.<br>Real results.',e(original.about.teamDescription))}<div class="team-grid">${team.map(item => `<article class="team-card surface reveal"><div class="team-avatar" aria-hidden="true">${e(item.initials)}</div><div class="team-card-body"><h3>${e(item.name)}</h3><span class="team-role">${e(item.role)}</span><span class="team-specialty">${e(item.specialty)}</span><p>${e(item.bio)}</p></div></article>`).join('')}</div></div></section>
  <section class="section"><div class="container">${sectionHeading('OUR JOURNEY','Built one useful system at a time.','From early automation rescues to connected systems for growing businesses.')}<div class="timeline-grid">${timeline.map(item => `<article class="timeline-card surface reveal"><span class="timeline-year">${e(item.year)}</span><h3>${e(item.title)}</h3><p>${e(item.description.replace('This site is our standard: black, calm, fast — proof over promises.','Our standard is calm, useful systems — proof over promises.').replace(/zykken/g,'Zykken'))}</p></article>`).join('')}</div></div></section>
  <section class="section" id="voices"><div class="container">${sectionHeading('CLIENT STORIES','Loved, specifically.','Detailed notes from the founders and teams who live with our systems every day.')}<div class="grid-three testimonial-grid">${testimonials.map(quotation).join('')}</div></div></section>${ctaSection()}`;
  return body;
}

const serviceVisuals = ['/assets/analytics-dial.png','/assets/process-hands.png','/assets/growth-chart.png','/assets/about-sculpture.png','/assets/analytics-dial.png'];
const serviceIcons = ['workflow','voice','globe','code','chart'];
const serviceTimelines = ['48 hours → 14 days','7–12 days','10–18 days','3–8 weeks','7–14 days'];

export function servicesPage() {
  const serviceBody = services.map((item,i) => `<section class="section service-detail" id="${e(item.id)}"><div class="container"><div class="split-layout ${i%2?'split-reverse':''}"><div class="service-copy reveal">${tag(`${item.number} · ${item.title.toUpperCase()}`)}<h2>${e(item.tagline)}</h2>${item.detailParagraphs.map(p => `<p>${e(p)}</p>`).join('')}${button('Discuss Your System','/contact')}</div><div class="service-graphic surface reveal"><img src="${serviceVisuals[i]}" alt="${e(item.title)} sculptural illustration" loading="lazy"><span class="graphic-label">${icon(serviceIcons[i])}${e(item.title)}</span></div></div><div class="service-detail-grid">${item.details.map((detail,j) => `<div class="service-detail-cell surface reveal"><span class="eyebrow">${e(detail.label)}</span>${j===2?`<strong class="service-timeline">${serviceTimelines[i]}</strong>`:''}${list(detail.items)}</div>`).join('')}</div></div></section>`).join('');
  const body = `${pageHero('OUR SERVICES','Everything You Need to Build,<br>Scale & Succeed with AI','Five connected capabilities. One senior team. Fixed scope, useful outcomes, and systems owned entirely by you.')}
  <section class="section section-tight"><div class="container"><div class="service-jump-links">${services.map((item,i) => `<a class="surface" href="#${e(item.id)}">${icon(serviceIcons[i])}<span>${e(item.title)}</span>${icon('arrow')}</a>`).join('')}</div></div></section>
  ${serviceBody}
  <section class="section"><div class="container">${sectionHeading('HOW WE WORK','From audit to live system.<br>Without the chaos.','Senior-only. Three clients a month max. A clear scope, a fixed quote, and a Loom every 48 hours.')}${processCards()}<div class="grid-two service-working-notes"><article class="card surface reveal"><h3>What we need from you</h3><p>One decision-maker on WhatsApp, access to the tools you already use, and 30 minutes a week to review Looms. Start with one call and one workflow recording.</p></article><article class="card surface reveal"><h3>Everything agreed in writing</h3><p>Your fixed project price, deliverables, go-live date and post-launch support are agreed before the build. Additional work is scoped and quoted separately.</p></article></div></div></section>
  <section class="section" id="calculator"><div class="container">${sectionHeading('ROI CALCULATOR','What does manual work cost?','Explore the value of time recovered. No email required. This estimate assumes automation recovers 80% of your repeated work.')}
  <div class="roi-panel surface reveal" data-roi-calculator><div class="roi-controls"><label class="roi-control" for="roi-hours"><span>TEAM HOURS LOST / WEEK</span><output id="roi-hours-value" for="roi-hours" data-roi-hours-label>30 hrs/wk</output><input id="roi-hours" name="hours" type="range" min="5" max="120" value="30" data-roi-hours></label><label class="roi-control" for="roi-cost"><span>AVERAGE HOURLY COST</span><output id="roi-cost-value" for="roi-cost" data-roi-cost-label>$25/hr</output><input id="roi-cost" name="cost" type="range" min="5" max="120" value="25" data-roi-cost></label></div><div class="roi-results" aria-live="polite"><div><strong data-roi-monthly>$2,598</strong><span>Estimated recoverable value / month</span></div><div><strong data-roi-hours-saved>104 hrs</strong><span>Estimated time recovered / month</span></div><div><strong data-roi-yearly>$31,176</strong><span>Estimated recoverable value / year</span></div></div><p class="form-note">An estimate of time value, based on 4.33 weeks per month. Your actual scope and return depend on the workflow.</p></div></div></section>
  ${testimonialSection()}${faqSection(faqs.services)}${ctaSection()}`;
  return body;
}

const caseCards = (items = caseStudies) => items.map(item => caseCard(item)).join('');

export function workPage() {
  const categories=[['all','All Work'],['automation','Automation'],['website','Website'],['saas','SaaS'],['voice','Voice AI'],['crm','CRM']];
  const body = `${pageHero('CASE STUDIES','Proven Results,<br>Real Impact','Six systems. Clear problems, fixed-scope builds, and the results that followed. Discover what we built for teams like yours.')}
  <section class="section section-tight"><div class="container">${metrics(agencyStats)}<div class="case-filters" role="group" aria-label="Filter case studies">${categories.map(([value,label],i)=>`<button type="button" class="filter-button ${i===0?'active':''}" data-filter="${value}" aria-pressed="${i===0}">${label}</button>`).join('')}</div><div class="case-grid">${caseCards()}</div><p class="filter-result" data-filter-count role="status" aria-live="polite">Showing all 6 case studies</p></div></section>${testimonialSection()}${ctaSection()}`;
  return body;
}


export function customQuotePage() {
  const body = `${pageHero('YOUR CUSTOM QUOTE','Built Around Your Business.<br>Scoped Together.','Your workflows, goals, integrations, and support needs shape your proposal. Start with a free audit and receive a clear custom quote before any work begins.')}
  <section class="section section-tight"><div class="container">${sectionHeading('HOW WE SCOPE YOUR PROJECT','A clear path from idea<br>to investment.','We understand the problem, shape the solution, and agree the scope with you.')}${processCards()}<div class="grid-two service-working-notes"><article class="card surface reveal"><h3>A proposal for your requirements</h3><p>Every service is custom-priced. Your proposal includes the deliverables, integrations, delivery timeline, project investment, and payment milestones.</p></article><article class="card surface reveal"><h3>Support that fits your system</h3><p>Handover and post-launch support are agreed in your scope. Ongoing care, additional development, and relevant third-party usage receive a clear custom quote.</p></article></div></div></section>
  ${auditSection()}${testimonialSection()}${faqSection(faqs.quote)}${ctaSection()}`;
  return body;
}

export function contactPage() {
  const body = `${pageHero('CONTACT US','Let’s Build Something<br>Intelligent, Together','Have a project in mind? Start with a free audit. One 30-minute call, one workflow recording, and three opportunities ranked by potential return.')}
  <section class="section section-tight" id="start"><div class="container contact-grid contact-page-grid">${contactForm()}<div class="contact-copy reveal"><div class="contact-art"><img src="/assets/contact-sculpture.png" width="640" height="640" alt="Interlocking silver sculpture" loading="lazy"></div>${contactDetails()}<p class="contact-promise">A clear scope, a fixed quote, and a go-live date. If we can’t save you 10× our fee in a year, we’ll tell you not to hire us.</p></div></div></section>${faqSection(faqs.services.slice(0,6))}${ctaSection()}`;
  return body;
}

export function caseStudyPage(slug) {
  const item = caseStudies.find(c => c.slug === slug);
  if (!item) return null;
  const others = caseStudies.filter(c => c.slug !== slug).slice(0,3);
  const body = `${pageHero('CASE STUDY',e(item.title),`${e(item.industry)} · ${e(item.categoryLabel)} · Delivered in ${e(item.elapsed)}`)}
  <section class="section section-tight"><div class="container"><a class="back-link text-link" href="/work">← All Case Studies</a><div class="case-cover surface reveal"><img src="${e(item.localImage)}" width="1200" height="800" alt="${e(item.imageAlt)}"></div>${metrics(item.results,'case-metrics inner-stats')}
  <div class="case-detail-layout"><aside class="case-sidebar surface reveal"><span class="eyebrow">PROJECT DETAILS</span><dl><div><dt>Client</dt><dd>${e(item.client)}</dd></div><div><dt>Industry</dt><dd>${e(item.industry)}</dd></div><div><dt>System</dt><dd>${e(item.categoryLabel)}</dd></div><div><dt>Build time</dt><dd>${e(item.elapsed)}</dd></div><div><dt>Delivered</dt><dd>${e(item.delivered)}</dd></div><div><dt>Location</dt><dd>${e(item.city)}</dd></div></dl>${button('Build Your System','/contact')}</aside><article class="prose reveal"><span class="eyebrow">THE CHALLENGE</span><h2>What was getting in the way.</h2><p>${e(item.problem)}</p><span class="eyebrow">THE BUILD</span><h2>A system built for the real work.</h2><p>${e(item.build)}</p><span class="eyebrow">THE OUTCOME</span><h2>The numbers that followed.</h2>${list(item.results.map(r=>`${r.value} — ${r.label}`))}</article></div>
  <div class="case-testimonial reveal"><div class="stars" aria-label="5 out of 5 stars">★★★★★</div><blockquote>“${e(item.quote)}”</blockquote><div class="quote-author"><span class="initial-avatar" aria-hidden="true">${e(item.initials)}</span><div><strong>${e(item.person)}</strong><span>${e(item.role)} · ${e(item.city)}</span></div></div></div></div></section>
  <section class="section"><div class="container">${sectionHeading('MORE CASE STUDIES','Explore more connected systems.')}<div class="case-grid">${caseCards(others)}</div></div></section>${ctaSection()}`;
  return body;
}


export function insightsPage() {
  const body = `${pageHero('OUR INSIGHTS','Insights on AI,<br>Automation & Innovation','Practical notes on choosing your first workflow, connecting your sales systems, and keeping them useful after launch.')}
  <section class="section section-tight"><div class="container">${insightCards()}</div></section>${ctaSection()}`;
  return body;
}

export function blogPage(slug) {
  const item=insights.find(i=>i.slug===slug);
  if (!item) return null;
  const body = `${pageHero('INSIGHTS',e(item.title),`${e(item.category)} · ${e(item.readTime)}`)}
  <section class="section section-tight"><div class="container"><a class="back-link text-link" href="/blog">← All Insights</a><div class="article-cover surface reveal"><img src="${e(item.image)}" width="1200" height="800" alt="${e(item.category)} abstract silver illustration"></div><article class="article-body prose reveal"><p class="article-intro">${e(item.intro)}</p>${item.sections.map(([title,copy])=>`<h2>${e(title)}</h2><p>${e(copy)}</p>`).join('')}<div class="article-audit"><h3>Start with your free audit.</h3><p>One workflow recording. Three opportunities. A fixed scope and quote.</p>${button('Request Your Free Audit','/contact')}</div></article></div></section><section class="section"><div class="container">${sectionHeading('KEEP EXPLORING','More practical insights.')}${insightCards(insights.filter(i=>i.slug!==slug))}</div></section>${ctaSection()}`;
  return body;
}

export function legalPage(kind) {
  const privacy=kind==='privacy';
  const title=privacy?'Privacy Policy':'Terms & Conditions';
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
    ['Optional ongoing care','Monthly retainers are separate from the implementation and are customized to system complexity and ongoing workload. Additional build work requires a separate scope and quote.'],
    ['Get in touch','For questions about a proposal, project or this website, contact info@zykken.com.'],
  ];
  const body = `${pageHero(privacy?'YOUR INFORMATION':'WORKING WITH ZYKKEN',title,privacy?'How inquiries through this website are handled.':'An overview of our existing project approach. Your agreed proposal sets out your project terms.')}
  <section class="section section-tight"><div class="container"><article class="legal-content prose surface reveal">${sections.map(([heading,copy])=>`<h2>${e(heading)}</h2><p>${e(copy)}</p>`).join('')}<p><a class="text-link" href="mailto:info@zykken.com">info@zykken.com ${icon('arrow')}</a></p></article></div></section>`;
  return body;
}
