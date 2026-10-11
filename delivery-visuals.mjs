import {services} from './content.mjs';
import {escapeHtml as e, icon} from './layout.mjs';

// Delivery artifacts describe what gets agreed; they are not client dashboard captures.
const stages = [
  {
    title: 'Map & Scope',
    description: 'Follow the real workflow. Choose the first outcome, then agree the feature, tools and boundaries of the build.',
    review: 'You approve the scope, custom quote and delivery plan.',
    href: '/process#map'
  },
  {
    title: 'Prove & Build',
    description: 'Prove the difficult part with a working pilot. Connect the surrounding experience and review progress with the builder.',
    review: 'We review real scenarios and agree the exception path.',
    href: '/process#prove'
  },
  {
    title: 'Validate & Launch',
    description: 'Check the whole journey with your team. Prepare the operating notes, training and ownership before launch.',
    review: 'Your team receives the build, handover and agreed support plan.',
    href: '/process#launch'
  }
];

const textLink = (label, href) => `<a class="ds-link" href="${href}"><span>${e(label)}</span>${icon('arrow')}</a>`;

export function deliveryArtifact(index) {
  const samples = [
    {heading: 'The project brief', label: 'Agree before we build', rows: [['Outcome', 'One useful first result'], ['Scope', 'Tools, actions and boundaries'], ['Plan', 'Milestones and responsibilities']]},
    {heading: 'The pilot review', label: 'See the core behaviour', rows: [['Walkthrough', 'The normal journey'], ['Exceptions', 'Missing context and failed steps'], ['Decision', 'Review before expanding']]},
    {heading: 'The handover', label: 'Ready for everyday use', rows: [['Build', 'Code and workflows in your accounts'], ['Guide', 'Operating notes and team training'], ['Care', 'The agreed support coverage']]}
  ];
  const sample = samples[index % samples.length];
  return `<div class="ds-artifact ds-artifact-${index + 1}" aria-label="Illustrative ${e(sample.heading.toLowerCase())}"><div class="ds-artifact-head"><span class="ds-artifact-symbol">${icon(['workflow', 'code', 'shield'][index])}</span><div><strong>${e(sample.heading)}</strong><span>${e(sample.label)}</span></div></div><dl class="ds-artifact-rows">${sample.rows.map(([label, value]) => `<div><dt>${e(label)}</dt><dd>${e(value)}</dd></div>`).join('')}</dl></div>`;
}

export const processArtifact = deliveryArtifact;

export function homeProcess() {
  return `<div class="ds-roadmap"><ol class="ds-stage-grid">${stages.map((stage, index) => `<li class="ds-stage"><div class="ds-stage-heading"><span class="ds-stage-number" aria-hidden="true">0${index + 1}</span><h3>${e(stage.title)}</h3></div><p class="ds-stage-description">${e(stage.description)}</p>${deliveryArtifact(index)}<div class="ds-stage-review"><span class="ds-label">Your checkpoint</span><p>${e(stage.review)}</p></div>${textLink(`Explore stage ${index + 1}`, stage.href)}</li>`).join('')}</ol><div class="ds-roadmap-foot"><span>${icon('voice')}Reviews with the person doing the work.</span><span>${icon('shield')}A clear scope. A usable handover.</span></div></div>`;
}

const benefits = [
  ['Outcome over Output', 'Start with the work that matters. Agree the result your team needs before choosing the technology.', 'An agreed outcome, with a useful first version.', '/benefits#outcomes'],
  ['Prove the Difficult Part', 'Test the journey early, including missing information, repeated requests and failed integrations.', 'Real scenarios. A clear path when things change.', '/benefits#checks'],
  ['Control Built In', 'Important actions have approval rules, named owners and a clear record of what happened.', 'Your rules, your accounts and your ownership.', '/benefits#control'],
  ['Design-Led Experiences', 'Make the next action clear. Give customers and operators the context they need to move forward.', 'Readable journeys, from first enquiry to handover.', '/benefits#experience']
];

export function benefitArtifact(index) {
  if (index === 0) return `<div class="ds-benefit-art ds-outcome-art" aria-label="Illustrative scope agreement"><div class="ds-art-top"><span>${icon('workflow')}The first useful build</span><span class="ds-art-stamp">Agreed together</span></div><div class="ds-outcome-flow"><div><span>Understand</span><strong>The real bottleneck</strong></div><span class="ds-art-arrow" aria-hidden="true">${icon('arrow')}</span><div><span>Define</span><strong>A focused first outcome</strong></div></div><div class="ds-art-note">Scope follows the workflow. Tools follow the scope.</div></div>`;
  if (index === 1) return `<div class="ds-benefit-art ds-check-art" aria-label="Illustrative acceptance checks"><div class="ds-art-top"><span>${icon('check')}Before the launch</span><span class="ds-art-stamp">Review scenarios</span></div><dl class="ds-check-list">${[['Complete request', 'Agreed checks'], ['Missing context', 'Human review'], ['Failed integration', 'Recovery path']].map(([label, next]) => `<div><dt><span class="ds-check-square" aria-hidden="true">${icon('check')}</span>${label}</dt><dd>${next}</dd></div>`).join('')}</dl></div>`;
  if (index === 2) return `<div class="ds-benefit-art ds-control-art" aria-label="Illustrative action approval"><div class="ds-art-top"><span>${icon('shield')}The important decisions</span><span class="ds-art-stamp">Your operating rules</span></div><ol class="ds-approval-flow"><li><span>${icon('code')}</span><strong>Preview</strong></li><li><span>${icon('shield')}</span><strong>Approve</strong></li><li><span>${icon('check')}</span><strong>Keep a receipt</strong></li></ol><div class="ds-art-note">Sensitive changes wait for the right person.</div></div>`;
  return `<div class="ds-benefit-art ds-journey-art" aria-label="Illustrative enquiry journey"><div class="ds-art-top"><span>${icon('globe')}A considered customer journey</span><span class="ds-art-stamp">Context included</span></div><div class="ds-journey-preview"><div class="ds-journey-copy"><span>From the first question</span><strong>A goal your team can act on.</strong><div class="ds-journey-lines" aria-hidden="true"><i></i><i></i></div></div><span class="ds-journey-action">Review the brief ${icon('arrow')}</span></div></div>`;
}

export function homeBenefits() {
  return `<div class="ds-benefits-grid">${benefits.map(([title, description, caption, href], index) => `<article class="ds-benefit"><div class="ds-benefit-copy"><span class="ds-benefit-number" aria-hidden="true">0${index + 1}</span><h3>${e(title)}</h3><p>${e(description)}</p></div>${benefitArtifact(index)}<div class="ds-benefit-foot"><p>${e(caption)}</p>${textLink('See the approach', href)}</div></article>`).join('')}</div>`;
}

const systemDescriptions = {
  Flowback: 'Inspect the failed step. Approve the supported recovery.',
  Carryline: 'Carry confirmed context into the next conversation.',
  IntentPath: 'Turn the visitor’s goal into a reviewed enquiry brief.',
  PreviewOps: 'Review the impact before applying a business change.',
  PledgeDesk: 'Give each customer promise an owner and a next step.'
};

export function systemsShowcase() {
  return `<div class="ds-systems"><div class="ds-systems-top"><span>${icon('workflow')}One considered architecture</span><span>Custom-built around your business</span></div><div class="ds-systems-grid"><div class="ds-system-foundation"><span class="ds-foundation-symbol">${icon('chip')}</span><span class="ds-label">The starting point</span><h3>Your work.<br>Your rules.</h3><p>Your tools, people and operating decisions shape the system.</p><ul><li>${icon('check')}Connected tools</li><li>${icon('check')}Agreed approvals</li><li>${icon('check')}Named next owners</li></ul></div><div class="ds-systems-list">${services.map(system => `<a class="ds-system-row" href="/services/${system.title.toLowerCase()}"><span class="ds-system-icon">${icon(system.icon)}</span><div class="ds-system-name"><span class="ds-system-category">${e(system.category)}</span><h3>${e(system.title)}</h3></div><div class="ds-system-purpose"><strong>${e(system.signature.name)}</strong><p>${e(systemDescriptions[system.title])}</p></div><span class="ds-system-arrow" aria-hidden="true">${icon('arrow')}</span></a>`).join('')}</div></div><div class="ds-ownership"><span class="ds-ownership-icon">${icon('shield')}</span><div><h3>Built in your accounts. Owned by your team.</h3><p>Your code, workflows and operating notes come with a working handover. We agree the supported connections and scope in your proposal.</p></div>${textLink('Explore ownership', '/features#ownership')}</div></div>`;
}
