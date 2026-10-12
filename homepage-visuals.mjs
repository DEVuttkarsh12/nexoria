import {escapeHtml as e, icon, tag, button, sectionHeading} from './layout.mjs';

// Native illustrations explain the build. They do not depict live client software.
const drawing = (body, cls='') => `<svg class="hv-drawing ${cls}" viewBox="0 0 300 220" fill="none" aria-hidden="true">${body}</svg>`;

const scopeDrawing = () => drawing(`<ellipse cx="150" cy="183" rx="92" ry="13" fill="#20252b" opacity=".08"/><g transform="translate(150 102) rotate(-16)"><circle r="76" fill="#e9eae7" stroke="#b6bbb5"/><circle r="57" fill="#f9faf7" stroke="#c8ccc5"/><circle r="37" fill="#e0e4dc" stroke="#b5bdb0"/><circle r="16" fill="#2d3631"/><path d="M0 0 69-61" stroke="#414d44" stroke-width="5" stroke-linecap="round"/><path d="m62-70 4 18 18 2-5-17Z" fill="#556b56"/></g><path d="m63 156-13 16m187-94 16-5" stroke="#b3bbb1" stroke-width="2"/>`);
const buildDrawing = () => drawing(`<ellipse cx="150" cy="189" rx="96" ry="12" fill="#20252b" opacity=".08"/><path d="M67 110h38m90 0h38M150 66v-20m0 108v22" stroke="#849582" stroke-width="2" stroke-dasharray="5 5"/><rect x="105" y="66" width="90" height="90" rx="23" fill="#e1e5dd" stroke="#aeb9a8"/><rect x="115" y="76" width="70" height="70" rx="18" fill="#f9faf7" stroke="#c5ccbe"/><path d="m135 111 11 11 22-26" stroke="#344b35" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><rect x="30" y="89" width="42" height="42" rx="12" fill="#f4f5f1" stroke="#b6bdb0"/><rect x="228" y="89" width="42" height="42" rx="12" fill="#f4f5f1" stroke="#b6bdb0"/><circle cx="150" cy="33" r="14" fill="#f4f5f1" stroke="#b6bdb0"/><circle cx="150" cy="188" r="12" fill="#556b56"/><path d="M43 103h16m-16 9h11m191-7 5 5 8-9" stroke="#697a62" stroke-width="2" stroke-linecap="round"/>`);
const launchDrawing = () => drawing(`<ellipse cx="153" cy="192" rx="93" ry="12" fill="#20252b" opacity=".08"/><rect x="90" y="56" width="139" height="121" rx="12" fill="#ced5c8" stroke="#aab5a3" transform="rotate(8 150 115)"/><rect x="76" y="47" width="139" height="121" rx="12" fill="#e2e7dc" stroke="#b2bbaa" transform="rotate(-5 150 115)"/><rect x="69" y="34" width="139" height="121" rx="12" fill="#fafbf7" stroke="#b2bbaa"/><path d="M92 62h61m-61 25h90m-90 17h66m-66 17h78" stroke="#bec7b7" stroke-width="5" stroke-linecap="round"/><circle cx="209" cy="143" r="34" fill="#2e3e31" stroke="#f3f6ee" stroke-width="7"/><path d="m194 143 10 10 20-22" stroke="#ecf1e6" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`);

export function visualTimeline() {
  const stages = [
    ['Map & Scope', 'Choose the right problem. Agree the plan.', 'Agreed scope', '/process#map', scopeDrawing],
    ['Prove & Build', 'Connect your tools. Test the real journey.', 'Working pilot', '/process#prove', buildDrawing],
    ['Validate & Launch', 'Check, train and hand over. It’s yours.', 'Owned system', '/process#launch', launchDrawing]
  ];
  return `<div class="hv-timeline"><svg class="hv-rope" viewBox="0 0 1200 110" preserveAspectRatio="none" aria-hidden="true"><path d="M12 56C140 6 250 106 400 56S660 6 800 56 1060 106 1188 56"/><path class="hv-rope-highlight" d="M12 56C140 6 250 106 400 56S660 6 800 56 1060 106 1188 56"/></svg><ol class="hv-stages">${stages.map(([title,copy,outcome,href,visual],i)=>`<li class="hv-stage"><span class="hv-stage-number">0${i+1}</span><div class="hv-stage-art">${visual()}</div><span class="hv-output">${icon('check')}${outcome}</span><h3><a href="${href}">${title} <span aria-hidden="true">↗</span></a></h3><p>${copy}</p></li>`).join('')}</ol></div>`;
}

const controlDrawing = () => drawing(`<ellipse cx="150" cy="184" rx="81" ry="12" fill="#20252b" opacity=".07"/><path d="m150 34 66 24v52c0 38-66 74-66 74s-66-36-66-74V58Z" fill="#e0e6da" stroke="#afbaa5" stroke-width="2"/><path d="m150 47 52 19v44c0 29-52 58-52 58s-52-29-52-58V66Z" fill="#f8faf4" stroke="#c3ccbb"/><circle cx="150" cy="98" r="14" fill="#3b4b37"/><path d="m145 108-5 27h20l-5-27" fill="#3b4b37"/>`);
const clarityDrawing = () => drawing(`<ellipse cx="155" cy="185" rx="94" ry="12" fill="#20252b" opacity=".07"/><rect x="48" y="48" width="200" height="127" rx="12" fill="#f9faf7" stroke="#b9c2b1"/><path d="M48 76h200" stroke="#c7cfbf"/><circle cx="63" cy="62" r="3" fill="#a6b69b"/><circle cx="75" cy="62" r="3" fill="#bec7b4"/><path d="M70 98h68m-68 16h51" stroke="#bcc8b1" stroke-width="6" stroke-linecap="round"/><rect x="70" y="135" width="90" height="22" rx="11" fill="#3b4b37"/><path d="m184 106 41 32-24 4-10 24Z" fill="#dfe9d3" stroke="#637755" stroke-width="2" stroke-linejoin="round"/>`);

export function visualBenefits() {
  const items=[
    ['A useful first win', 'The outcome sets the scope.', '/benefits#outcomes', scopeDrawing, ['Real problem','Clear goal']],
    ['Proven before launch', 'Test the happy path and the exceptions.', '/benefits#checks', buildDrawing, ['Real scenarios','Human fallback']],
    ['Control stays with you', 'Your code, accounts and operating rules.', '/benefits#control', controlDrawing, ['Your accounts','Your ownership']],
    ['Clear at every step', 'Designed for the people using it.', '/benefits#experience', clarityDrawing, ['Less friction','Clear next step']]
  ];
  return `<div class="hv-benefits">${items.map(([title,copy,href,visual,labels],i)=>`<a class="hv-benefit" href="${href}"><div class="hv-benefit-top"><span>0${i+1}</span>${icon('arrow')}</div><div class="hv-benefit-art">${visual()}</div><div class="hv-benefit-labels">${labels.map(label=>`<span>${label}</span>`).join('')}</div><h3>${title}</h3><p>${copy}</p></a>`).join('')}</div>`;
}

export function openSystems() {
  const items=[
    ['IntentPath','Website','Shape the enquiry','globe'],
    ['Carryline','Voice & chat','Carry the context','voice'],
    ['PledgeDesk','CRM','Own the follow-up','chart'],
    ['PreviewOps','Software','Approve the change','code'],
    ['Flowback','Automation','Recover the workflow','workflow']
  ];
  return `<div class="os-map"><svg class="os-connections" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true"><path d="M500 295C380 295 370 48 205 48M500 295C360 295 370 336 190 336M500 295C640 295 620 48 805 48M500 295C640 295 640 336 810 336M500 295v178"/><circle cx="500" cy="295" r="95" stroke-dasharray="3 9"/><circle cx="500" cy="295" r="130" opacity=".4"/></svg><div class="os-core"><span class="os-core-orb">${icon('chip')}</span><strong>Your business</strong><span>One connected workflow</span></div>${items.map(([name,category,action,symbol],i)=>`<a class="os-node os-node-${i+1}" href="/services/${name.toLowerCase()}"><span class="os-orb">${icon(symbol)}</span><span class="os-category">0${i+1} / ${category}</span><h3>${name}</h3><p>${action} ${icon('arrow')}</p></a>`).join('')}</div><div class="os-foundation">${icon('shield')}<span>Your tools. Your rules. Your ownership.</span><a href="/features#ownership">How it connects ${icon('arrow')}</a></div>`;
}

export function deliveryStandards() {
  const items=[
    ['Clear scope','Know what we’re building before we start.','workflow','/process','Scope'],
    ['Visible progress','Regular updates as your system takes shape.','voice','/process#prove','Build'],
    ['A working handover','Your code, accounts and operating guide.','shield','/features#ownership','Handover'],
    ['Agreed support','Care and improvements scoped around you.','clock','/custom-quote','Care']
  ];
  return `<section class="home-standards section"><div class="container hv-standards-layout"><div class="hv-standards-heading">${tag('Delivery Standards')}<h2>Clear from <br><span>start to finish.</span></h2></div><ol class="hv-standards">${items.map(([title,copy,symbol,href,label],i)=>`<li><a href="${href}"><span class="hv-standard-marker">${icon(symbol)}</span><span class="hv-standard-index">0${i+1} / ${label}</span><h3>${title}</h3><p>${copy}</p><span class="hv-standard-arrow" aria-hidden="true">↗</span></a></li>`).join('')}</ol></div></section>`;
}

export function homeFAQs() {
  const items=[
    ['How do we start?', 'Request a free audit: one 30-minute call and a recording of your current workflow. We identify useful opportunities, then agree your scope and custom quote.'],
    ['Are these ready-made products?', 'Every system is custom-built around your business. Your proposal defines the features, channels, integrations and actions included.'],
    ['How much will it cost?', 'Every project and ongoing support plan is custom-quoted. We agree the investment, milestones and relevant software or usage costs before the build.'],
    ['Can you work with our existing tools?', 'Yes. We start with the tools you already use and check the integrations during discovery. Any new subscriptions are discussed as part of your scope.'],
    ['How soon can we launch?', 'We confirm the first pilot and delivery timeline after reviewing your workflow, tools and scope. The agreed plan is included in your proposal.'],
    ['Will we own the finished system?', 'Yes. Your code, workflows, prompts, accounts, documentation and data remain under your ownership, with a working handover.'],
    ['What happens after launch?', 'Training, handover and post-launch support are agreed in your scope. Ongoing monitoring, fixes and improvements receive a separate custom quote.'],
    ['Can you improve a system we already have?', 'Yes. We review your existing automation, website or CRM and recommend a repair or rebuild based on the work it needs to do.']
  ];
  return `<section class="home-faq section" id="faqs"><div class="container hv-faq-layout"><div class="hv-faq-intro">${sectionHeading('FAQs','Good questions.<br><span>Clear answers.</span>','The essentials before we build.','left')}${button('Explore All Questions','/faq',true)}</div><div class="hv-faq-list">${items.map(([question,answer],i)=>`<details${i===0?' open':''}><summary><span class="hv-faq-number">0${i+1}</span><span>${e(question)}</span><span class="faq-plus" aria-hidden="true"></span></summary><div class="faq-answer"><p>${e(answer)}</p></div></details>`).join('')}</div></div></section>`;
}
