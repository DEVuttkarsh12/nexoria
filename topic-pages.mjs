import {serviceSpecimen} from './systems-visuals.mjs';
import {integrationRoutes} from './narrative-visuals.mjs';
import {caseStudies, services, team, process, faqs} from './content.mjs';
import {escapeHtml as e, icon, tag, button, sectionHeading, pageHero, ctaSection} from './layout.mjs';
import {processArtifact,benefitArtifact,systemsShowcase} from './delivery-visuals.mjs';
import {teamCards,testimonialCards} from './people-visuals.mjs';

const serviceHref = item => `/services/${item.slug}`;
const list = items => `<ul class="topic-list">${items.map(item => `<li>${icon('check')}<span>${e(item)}</span></li>`).join('')}</ul>`;
const textLink = (label, href) => `<a class="topic-text-link" href="${href}">${e(label)}${icon('arrow')}</a>`;
const jumpLinks = items => `<nav class="topic-jump-nav container" aria-label="On this page">${items.map(([label,href])=>`<a href="${href}">${e(label)}${icon('arrow')}</a>`).join('')}</nav>`;
const page = (body) => `<div class="topic-page">${body}</div>`;
const related = (label, title, description, links) => `<section class="section"><div class="container"><div class="topic-related surface reveal"><div>${tag(label)}<h2>${title}</h2><p>${e(description)}</p></div><div class="topic-related-links">${links.map(([name,href])=>textLink(name,href)).join('')}</div></div></div></section>`;

const deliveryStages = [
  {
    id:'map', name:'Map & scope', description:process[0].description,
    intro:'We follow one real task from the first input to the person responsible for the result. This gives the build a clear purpose before we choose a tool or write a workflow.',
    inputs:['A 30-minute conversation about the bottleneck','A recording of the workflow as it happens today','Your current tools, owners and access constraints'],
    outputs:['A map of the current workflow and its exceptions','A prioritized first outcome and signature feature','A written scope, custom quote and proposed timeline'],
    check:'You confirm the outcome, supported actions, exclusions and responsibilities before the build begins.'
  },
  {
    id:'prove', name:'Prove & build', description:process[1].description,
    intro:'The difficult part gets a working pilot first. Once the core behaviour makes sense to your team, we connect the surrounding experience and integrations within the agreed scope.',
    inputs:['Agreed sample inputs and realistic edge cases','Your operating rules and approval requirements','Authorized access to the tools in the project scope'],
    outputs:['A pilot of the recovery, handoff, brief, preview or commitment flow','Connected workflows and a clear exception path','Builder walkthroughs so you can review progress'],
    check:'We review normal use, missing information, repeated requests and failed integrations. Uncertain actions have a named human review path.'
  },
  {
    id:'launch', name:'Validate & launch', description:'Check the complete journey, train the people running it and hand over the working system with a clear support plan.',
    intro:'We check the complete journey with your team, prepare the handover and agree who owns the system after launch. Training and tuning are part of the delivery plan defined in your proposal.',
    inputs:['Your review of the working system','Realistic operating data and user scenarios','The people who will run and maintain the system'],
    outputs:['A tested launch checklist and operating instructions','Your code, workflows, prompts and accounts','Team training and an agreed post-launch support plan'],
    check:'Your team can explain the workflow, find the exception inbox and identify the next owner. Support coverage and further improvements are agreed explicitly.'
  }
];

// Process FAQs: every answer restates the stage copy above or the existing service/quote FAQs; no new claims.
const processFaqs = [
  ['What are the steps in a Zykken project?', `Three stages. ${deliveryStages[0].name}: we follow one real task from the first input to the person responsible for the result. ${deliveryStages[1].name}: the difficult part gets a working pilot first, then we connect the integrations within the agreed scope. ${deliveryStages[2].name}: we check the complete journey with your team, train the people running it and hand over the working system with a clear support plan.`],
  ['What do you need from us to start?', 'One 30-minute call, one screen-recording of how you work today, and access to the tools you already use. We map the workflows worth automating in your free audit, then fix scope and price before you pay anything.'],
  ['How long does a build take?', 'We agree the first pilot and full delivery timeline after checking your tools and scope. You receive a clear timeline in your proposal and a Loom update every 48 hours during the build.'],
  ['How do revisions and scope changes work?', 'Small tweaks inside the agreed outcome, such as copy, prompts and routing rules, are handled during the build. If you add a new workflow or integration mid-build, we quote it first and you approve before we build it.'],
  ['What do we receive at launch?', 'A tested launch checklist and operating instructions, your code, workflows, prompts and accounts, and team training with an agreed post-launch support plan. Ongoing monitoring and additional development are custom-quoted around the system and workload.']
];

export function processPage(){
  return page(`${pageHero('Our process','A clear path.<br>From idea to production.','Understand the work, prove the core behaviour and launch a system your team can confidently operate.')}
    ${jumpLinks(deliveryStages.map(s=>[s.name,`#${s.id}`]))}
    <section class="section"><div class="container topic-intro-grid"><div class="topic-intro-copy reveal">${tag('Built with you')}<h2>Know what happens.<br>At every step.</h2><p>A workflow is useful when the people using it understand its limits, own its next steps and can recover when something changes. Our delivery process makes those decisions visible.</p>${textLink('Explore the five systems','/services')}</div><div class="topic-summary surface reveal">${icon('workflow')}<h3>One outcome, a clear scope</h3><p>Every build is custom-scoped around your tools, your team and the problem that matters most. Dates, responsibilities and third-party costs belong in the proposal.</p>${list(['A defined first outcome','Review points with the builder','An explicit handover and support plan'])}</div></div></section>
    <div class="topic-stage-list">${deliveryStages.map((s,i)=>`<section class="section topic-stage" id="${s.id}"><div class="container"><div class="topic-stage-heading reveal"><span class="topic-stage-index" aria-hidden="true">0${i+1}</span><div>${tag(`Stage 0${i+1}`)}<h2>${e(s.name)}</h2><p>${e(s.description)}</p></div></div><div class="topic-stage-grid"><div class="topic-stage-main surface reveal"><p class="topic-lead">${e(s.intro)}</p><div class="topic-deliverables"><div><h3>What we need</h3>${list(s.inputs)}</div><div><h3>What you receive</h3>${list(s.outputs)}</div></div><div class="topic-checkpoint">${icon('shield')}<div><strong>Your review checkpoint</strong><p>${e(s.check)}</p></div></div></div><div class="topic-stage-visual reveal">${processArtifact(i)}</div></div></div></section>`).join('')}</div>
    <section class="section"><div class="container"><div class="topic-aftercare surface reveal"><span class="topic-aftercare-symbol">${icon('loops')}</span><div>${tag('After launch')}<h2>Train, tune and keep it yours.</h2><p>${e(process[3].description)} Ongoing monitoring and additional development are custom-quoted around the system and workload.</p></div>${button('Plan your build','/custom-quote')}</div></div></section>
    <section class="section faq-section" id="process-questions"><div class="container">${sectionHeading('Process questions','How a Zykken project<br><span>actually runs</span>')}<div class="faq-list reveal">${processFaqs.map(([q,a],i)=>`<details ${i===0?'open':''}><summary>${e(q)}<span class="faq-plus" aria-hidden="true"></span></summary><div class="faq-answer"><p>${e(a)}</p></div></details>`).join('')}</div></div></section>
    ${related('Before we start','Questions are part<br>of the process.','Read how scope, ownership, revisions and support work before we discuss your project.',[['Read the FAQs','/faq'],['Meet the team','/team'],['Request a custom quote','/custom-quote']])}${ctaSection()}`);
}

const benefitDetails = [
  {id:'outcomes',title:'Useful outcomes first',description:'Start with the result you need, then choose the smallest system that can make it happen.',body:'A faster handoff, fewer repeated updates or clearer customer context is more useful than adding AI to every step. We map the current workflow and agree which result the first version should improve.',points:['Choose a clear first outcome','Connect the workflow to its existing tools','Review the result with the people doing the work'],example:'If document updates consume the operations team’s week, begin with extraction, routing and the exception inbox before expanding the system.'},
  {id:'checks',title:'Confidence through real checks',description:'Check the complete journey, including the moments when information is missing or a connected tool fails.',body:'A working demonstration is a starting point. The build needs agreed test scenarios, a sensible recovery path and clear rules for when a person should take over.',points:['Review ordinary and unusual inputs','Inspect failed steps and repeated requests','Make human review part of the workflow'],example:'A payment can succeed while an invoice sync fails. The Safe Replay Desk in our Business Automation is scoped to inspect the completed steps and supported recovery actions.'},
  {id:'control',title:'Human control and ownership',description:'Keep important decisions visible and the resulting system under your ownership.',body:'Your proposal identifies the supported actions, access needs and approval steps. Code, prompts, workflows, documentation and accounts belong to you, with an agreed handover and support plan.',points:['Define permissions and next owners','Approve sensitive actions before they run','Keep the build and documentation in your accounts'],example:'Before a roster update is applied, the Change Rehearsal in our Custom Software & Portals can show the affected bookings and require the appropriate manager’s approval.'},
  {id:'experience',title:'An experience people can use',description:'Clear interfaces and thoughtful context make the system easier to understand in everyday work.',body:'We shape the copy, layout and interaction around the task. A customer should know the next step, and an operator should be able to find the context without piecing together separate messages.',points:['Make the next action clear','Carry useful context across the journey','Keep the experience readable on phone and desktop'],example:'the Decision Brief on our websites lets a visitor review their goal and constraints before sending an enquiry your sales team can act on.'}
];

// Benefits FAQs: every answer restates the benefit copy above or the existing ownership/support FAQs; no new claims.
const benefitFaqs = [
  ['Why choose Zykken for business automation?', 'We start with the result you need, then choose the smallest system that can make it happen. We map the current workflow, agree which result the first version should improve, check the complete journey before launch and hand over a system your team owns.'],
  ['Where should the first version of a system start?', 'With one clear outcome, such as a faster handoff, fewer repeated updates or clearer customer context. That is more useful than adding AI to every step, so we agree the first outcome and connect the workflow to the tools you already use.'],
  ['How do you test a system before launch?', 'We check the complete journey, including the moments when information is missing or a connected tool fails. The build has agreed test scenarios, a sensible recovery path and clear rules for when a person should take over.'],
  ['Do we stay in control of important decisions?', 'Yes. Your proposal identifies the supported actions, access needs and approval steps, and sensitive actions can require approval before they run.'],
  ['Who owns what Zykken builds?', 'You do. Code, prompts, workflows, documentation and accounts belong to you, with an agreed handover and support plan.']
];

export function benefitsPage(){
  return page(`${pageHero('Why Zykken','Built for your work.<br>Designed for your people.','The value is in a clearer workflow, a useful customer experience and a system your team can own.')}
    ${jumpLinks(benefitDetails.map(b=>[b.title,`#${b.id}`]))}
    <section class="section"><div class="container">${sectionHeading('What changes','Less friction.<br>More room for real work.','We make the intended outcome and operating rules part of the build, so the technology serves the task.')}<div class="topic-benefit-list">${benefitDetails.map((b,i)=>`<article class="topic-benefit surface reveal" id="${b.id}"><div class="topic-benefit-art">${benefitArtifact(i)}</div><div class="topic-benefit-copy"><span class="topic-meta">0${i+1} / THE BENEFIT</span><h3>${e(b.title)}</h3><p class="topic-lead">${e(b.description)}</p><p>${e(b.body)}</p>${list(b.points)}<div class="topic-example"><strong>In practice</strong><p>${e(b.example)}</p></div></div></article>`).join('')}</div></div></section>
    <section class="section faq-section" id="benefit-questions"><div class="container">${sectionHeading('Why Zykken questions','What working with us<br><span>actually changes</span>')}<div class="faq-list reveal">${benefitFaqs.map(([q,a],i)=>`<details ${i===0?'open':''}><summary>${e(q)}<span class="faq-plus" aria-hidden="true"></span></summary><div class="faq-answer"><p>${e(a)}</p></div></details>`).join('')}</div></div></section>
    ${related('From benefit to build','See the systems<br>behind the experience.','Explore the signature capabilities, the delivery process and the results described in our client stories.',[['Explore the features','/features'],['See how we work','/process'],['Read client projects','/work']])}${ctaSection()}`);
}

// Features FAQs: every answer restates the signature, ownership or integrations copy above; no new claims.
const featureFaqs = [
  ['What signature features can a Zykken build include?', 'Five signature capabilities across five systems: Safe Replay Desk for business automation (a receipt for every step, with a recovery path your team can inspect before it runs), Context Passport for WhatsApp and voice AI agents (a compact, source-linked brief that travels with the enquiry), Decision Brief for websites (a visitor-approved brief that connects the website journey to the first useful sales conversation), Change Rehearsal for custom software and portals (a preview and approval step for business actions), and Commitment Radar for CRM and lead follow-up (turning an agreed next step into an accountable CRM item with the original conversation attached). Your proposal defines the supported actions, integrations, channels and operating rules.'],
  ['How does the Context Passport help with WhatsApp and voice handoffs?', 'It keeps a compact, source-linked brief that travels with the enquiry and stays open until someone accepts the next step. Confirmed context is captured, carried forward through verified identity or a continuation link, and the handoff names the next owner with an agreed fallback if they cannot accept.'],
  ['How do your systems connect to the tools we already use?', 'We start with what you use. Your CRM, website, calendars, documents and communication channels inform the scope. Available APIs, permissions and data quality determine what can be connected, and we agree the integration approach before the build.'],
  ['How do you choose AI models for a project?', 'We assess models such as OpenAI, Claude and Gemini around the task, required output and cost. A model is one part of the system; it works alongside your operating rules. The proposal also keeps the next step visible: which actions can run, which need approval and where exceptions go, with the relevant hosting, software and usage costs included.'],
  ['Who owns the features Zykken builds?', 'You do. Your code, workflows, prompts, accounts and documentation belong to you. Handover and support are agreed as part of your project scope, with team training and a working handover, and custom-quoted ongoing care when you need it.']
];

export function featuresPage(){
  return page(`${pageHero('Signature features','Every system.<br>A thoughtful next step.','Recovery you can inspect. Context you can carry. Changes you can approve. Explore the capabilities we scope into a custom build.')}
    ${jumpLinks([...services.map(s=>[s.signature.name,`#${s.slug}`]),['Your ownership','#ownership'],['Connected tools','#integrations']])}
    <section class="section"><div class="container">${sectionHeading('Connected systems','Five systems.<br>One working architecture.','Your proposal defines the supported actions, integrations, channels and operating rules.')}${systemsShowcase()}</div></section>
    <section class="section topic-feature-section"><div class="container topic-feature-list">${services.map((s,i)=>`<article class="topic-feature surface reveal" id="${s.slug}"><div class="topic-feature-copy"><div class="topic-feature-label"><span class="topic-feature-icon">${icon(s.icon)}</span><span class="topic-meta">0${i+1} / ${e(s.title)}<span>${e(s.category)}</span></span></div><h2>${e(s.signature.name)}</h2><p class="topic-lead">${e(s.signature.description)}</p><div class="topic-example"><strong>In practice</strong><p>${e(s.signature.example)}</p></div>${textLink(`Explore ${s.title}`,serviceHref(s))}<div class="ed-feature-specimen">${serviceSpecimen(s)}</div></div><ol class="topic-feature-steps">${s.signature.steps.map(([title,description],index)=>`<li><span class="topic-step-dot" aria-hidden="true">0${index+1}</span><div><h3>${e(title)}</h3><p>${e(description)}</p></div></li>`).join('')}</ol></article>`).join('')}
    <article class="topic-feature topic-ownership reveal" id="ownership"><div class="topic-feature-copy"><div class="topic-feature-label"><span class="topic-feature-icon">${icon('shield')}</span><span class="topic-meta">06 / YOUR OWNERSHIP<span>The standard across every build</span></span></div><h2>Keep what we build.</h2><p class="topic-lead">Your code, workflows, prompts, accounts and documentation belong to you. Handover and support are agreed as part of your project scope.</p>${textLink('Read the ownership FAQs','/faq#ownership')}</div><div class="topic-ownership-list">${list(['Code and workflows in your accounts','Documented operating rules and access','Team training and a working handover','Custom-quoted ongoing care when you need it'])}</div></article></div></section>
    ${related('Choosing a starting point','Bring us the bottleneck.<br>We’ll shape the build.','You do not need to specify the technology first. Explain where the work gets stuck, and we’ll map the useful next step.',[['Discuss your project','/contact'],['Read the process','/process'],['See custom quoting','/custom-quote']])}<section class="section" id="integrations"><div class="container">${sectionHeading('Connected tools','Your stack.<br>A considered connection.','The right system fits the tools and people already in your business. We agree the integration approach before the build.')}${integrationRoutes()}<div class="topic-integration-grid">${[['Start with what you use','Your CRM, website, calendars, documents and communication channels inform the scope. Available APIs, permissions and data quality determine what can be connected.','workflow'],['Choose the model for the job','We assess models such as OpenAI, Claude and Gemini around the task, required output and cost. A model is one part of the system; it works alongside your operating rules.','chip'],['Keep the next step visible','Agree which actions can run, which need approval and where exceptions go. Include the relevant hosting, software and usage costs in the proposal so your team can operate the system.','shield']].map(([title,copy,symbol])=>`<article class="topic-summary surface"><span class="topic-feature-icon">${icon(symbol)}</span><h3>${title}</h3><p>${copy}</p></article>`).join('')}</div></div></section>
    <section class="section faq-section" id="feature-questions"><div class="container">${sectionHeading('Feature questions','What goes into<br><span>a custom build</span>')}<div class="faq-list reveal">${featureFaqs.map(([q,a],i)=>`<details ${i===0?'open':''}><summary>${e(q)}<span class="faq-plus" aria-hidden="true"></span></summary><div class="faq-answer"><p>${e(a)}</p></div></details>`).join('')}</div></div></section>
    ${ctaSection()}`);
}

const teamPractice = [
  ['Direct collaboration','You work with the people building the system. Reviews focus on the workflow, the experience and the decisions needed to move forward.','voice'],
  ['Clear reviews','Walkthroughs make progress visible. Your team can review the pilot, understand the operating rules and raise changes within the agreed scope.','check'],
  ['A usable handover','The project finishes with ownership, documentation and training. The people running the system know where to find help and what happens next.','shield']
];

// Team FAQs: every answer restates the team bios, practice copy or page intro above; no new claims.
const teamFaqs = [
  ['Who is on the Zykken team?', 'Four specialists with distinct responsibilities and a shared delivery standard. Uttkarsh (Founder, Systems) maps your workflow, reviews sales conversations and prioritizes practical opportunities. Ananya Rao (Design lead) connects copy, layout and motion around the customer journey. Kabir Shah (AI engineer) builds voice and chat agents, integrations and operating checks. Meera Iyer (Delivery lead) keeps delivery on track, tests agreed scenarios, connects the CRM, trains your team and coordinates the support plan.'],
  ['Who will I work with on a project?', 'You work with the people building the system. Reviews focus on the workflow, the experience and the decisions needed to move forward.'],
  ['How do project reviews work with the team?', 'Walkthroughs make progress visible. Your team can review the pilot, understand the operating rules and raise changes within the agreed scope.'],
  ['What do we receive at handover?', 'The project finishes with ownership, documentation and training. The people running the system know where to find help and what happens next.'],
  ['How does the team work together?', 'Strategy, design, engineering and delivery work together from the first workflow map to the final handover. Your business knowledge shapes the system. We bring the specialist work and make the decisions easy to review.']
];

export function teamPage(){
  return page(`${pageHero('The team','The people shipping<br>your next system.','Strategy, design, engineering and delivery work together from the first workflow map to the final handover.')}
    <section class="section"><div class="container">${sectionHeading('Four specialists','Close to the work.<br>Clear about the outcome.','A compact team with distinct responsibilities and a shared delivery standard.')}${teamCards(team)}</div></section>
    <section class="section topic-dark-band"><div class="container">${sectionHeading('Working together','Your team is part<br>of the build.','Your business knowledge shapes the system. We bring the specialist work and make the decisions easy to review.')}<div class="topic-practice-grid">${teamPractice.map(([title,description,symbol])=>`<article class="topic-practice reveal"><span>${icon(symbol)}</span><h3>${e(title)}</h3><p>${e(description)}</p></article>`).join('')}</div><div class="topic-band-action">${button('Meet us through your project','/contact',true)}</div></div></section>
    <section class="section faq-section" id="team-questions"><div class="container">${sectionHeading('Team questions','Who builds with you<br><span>and how we work</span>')}<div class="faq-list reveal">${teamFaqs.map(([q,a],i)=>`<details ${i===0?'open':''}><summary>${e(q)}<span class="faq-plus" aria-hidden="true"></span></summary><div class="faq-answer"><p>${e(a)}</p></div></details>`).join('')}</div></div></section>
    ${related('Get to know Zykken','People, process<br>and practical work.','Read the story behind the agency, see the delivery journey and explore the projects described by our clients.',[['About Zykken','/about'],['Our process','/process'],['Client stories','/testimonials']])}${ctaSection()}`);
}

export function testimonialsPage(){
  return page(`${pageHero('Client stories','What changed.<br>In their own words.','Hear from the people using the workflows, websites, conversation systems and business tools we built.')}
    <section class="section"><div class="container">${sectionHeading('The client perspective','The work behind<br>the words.','Read each client’s full quotation alongside the results described in their project story.')}${testimonialCards(caseStudies)}</div></section>
    ${related('Explore the work','See the workflow<br>behind each result.','Each project page explains the original bottleneck, the system built and the results supplied in that client story.',[['Browse all projects','/work'],['Explore the services','/services'],['Discuss your workflow','/contact']])}${ctaSection()}`);
}

export const aboutZykkenFaqs = [
    ['What is Zykken?','Zykken is an AI automation agency and business-systems studio in India. We build business automation, WhatsApp and voice AI agents, website design and development, custom software and CRM for growing businesses, and every project is custom-quoted.'],
    ['What services does Zykken offer?','Five services: Website Design & Development, WhatsApp & Voice AI Agents (in Hindi and English), CRM & Lead Follow-up, Business Automation, and Custom Software & Portals (portals, dashboards and internal tools with an approval preview).'],
    ['Do you build WhatsApp chatbots for businesses in India?','Yes. We build WhatsApp chatbots and AI agents for enquiries, qualification and booking, connected to the other channels you choose so an approved handoff keeps its context.'],
    ['Can your AI voice agents speak Hindi?','Yes. Our WhatsApp and AI voice agents work in Hindi and English, with a shared handoff brief so your team knows what was asked, what was agreed and who takes over.'],
    ['Do you build CRM and lead follow-up for real estate businesses?','Yes. For Luxe Estates, a real estate business, we reduced lead follow-up time from 6 hours to 38 seconds. Our CRM & Lead Follow-up service is custom-built around how your team sells.'],
    ['Are you a website development company?','Yes. Website Design & Development brings copy, design, development and measurement into one build, with a guided enquiry journey that helps visitors reach the right person.'],
    ['Do you work with small businesses?','Yes. Every project is scoped around your business and custom-quoted, so you only pay for the system you need. Start with a free 30-minute audit.'],
    ['How much does a Zykken project cost?','All work is custom-quoted. We do not publish fixed packages; you receive a proposal after a free 30-minute audit of your business and tools.'],
    ['How do I get started with Zykken?','Book a free 30-minute audit through the contact page or email info@zykken.com.']
];

const faqGroups = [
  {id:'about-zykken',title:'About Zykken',description:'Quick, factual answers about who we are and what we build.',items:[...aboutZykkenFaqs
  ]},
  {id:'getting-started',title:'Getting started',description:'What to bring, how we scope the first version and whether your existing system can be improved.',items:[faqs.index[0],faqs.services[3],faqs.services[8],['How do we start?','Request a free audit through our contact form. We begin with a conversation and a workflow recording, then confirm the scope, custom quote and delivery plan.']]},
  {id:'systems',title:'Systems and integrations',description:'How the signature builds work and how they connect to the tools your business already uses.',items:[faqs.services[0],faqs.services[1],faqs.services[7]]},
  {id:'ownership',title:'Ownership, revisions and support',description:'What belongs to you, how scope changes are handled and what happens after launch.',items:[faqs.services[5],faqs.services[6],faqs.services[4]]},
  {id:'quotes',title:'Custom quotes and costs',description:'Every service is custom-priced around the project. Your proposal defines the investment, milestones and separate usage costs.',items:faqs.quote.filter(([question])=>question!=='Do we own code, data and accounts?')}
];

export function faqPage(){
  return page(`${pageHero('FAQs','Clear answers.<br>A confident next step.','How custom builds, ownership, integrations and ongoing support work at Zykken.')}
    ${jumpLinks(faqGroups.map(group=>[group.title,`#${group.id}`]))}
    <section class="section"><div class="container topic-faq-groups">${faqGroups.map(group=>`<section class="topic-faq-group" id="${group.id}" aria-labelledby="faq-${group.id}"><div class="topic-faq-intro reveal">${tag('Your questions')}<h2 id="faq-${group.id}">${e(group.title)}</h2><p>${e(group.description)}</p></div><div class="faq-list topic-faq-list reveal">${group.items.map(([question,answer],i)=>`<details ${i===0?'open':''}><summary>${e(question)}<span class="faq-plus" aria-hidden="true"></span></summary><div class="faq-answer"><p>${e(answer)}</p></div></details>`).join('')}</div></section>`).join('')}</div></section>
    ${related('Still have a question?','Tell us what<br>you’re working on.','Share the goal, the tools you use and where the current workflow gets stuck. We can discuss the right starting point together.',[['Ask us directly','/contact'],['Read the delivery process','/process'],['Request a custom quote','/custom-quote']])}${ctaSection()}`);
}
