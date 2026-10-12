import {escapeHtml as e, icon} from './layout.mjs';
import {visualTimeline, visualBenefits, openSystems} from './homepage-visuals.mjs';

// Delivery artifacts describe what gets agreed; they are not client dashboard captures.

function stageDiagram(index) {
  if (index===0) return `<div class="ed-stage-study ed-map-study"><span class="ed-study-label">Trace one real task</span><div class="ed-task-line"><span>${icon('mail')}<strong>Input</strong></span><i aria-hidden="true"></i><span class="ed-task-focus">${icon('voice')}<strong>Handoff</strong></span><i aria-hidden="true"></i><span>${icon('check')}<strong>Outcome</strong></span></div><span class="ed-study-caption">Find the repeated work between the tools.</span></div>`;
  if (index===1) return `<div class="ed-stage-study ed-pilot-study"><span class="ed-study-label">Check both paths</span><div class="ed-pilot-lines"><div><span>Complete input</span><i aria-hidden="true"></i><strong>Continue</strong></div><div><span>Missing context</span><i aria-hidden="true"></i><strong>Human review</strong></div></div><span class="ed-study-caption">A useful pilot includes the exception.</span></div>`;
  return `<div class="ed-stage-study ed-launch-study"><span class="ed-study-label">Leave a working handover</span><div class="ed-handover-stack"><span class="ed-handover-back" aria-hidden="true"></span><span class="ed-handover-middle" aria-hidden="true"></span><div>${icon('code')}<strong>Code & workflows</strong><span>Operating guide · Team training</span></div></div><span class="ed-study-caption">In your accounts. With a named owner.</span></div>`;
}

export function deliveryArtifact(index) {
  const samples = [
    {heading: 'The project brief', label: 'Agree before we build', rows: [['Outcome', 'One useful first result'], ['Scope', 'Tools, actions and boundaries'], ['Plan', 'Milestones and responsibilities']]},
    {heading: 'The pilot review', label: 'See the core behaviour', rows: [['Walkthrough', 'The normal journey'], ['Exceptions', 'Missing context and failed steps'], ['Decision', 'Review before expanding']]},
    {heading: 'The handover', label: 'Ready for everyday use', rows: [['Build', 'Code and workflows in your accounts'], ['Guide', 'Operating notes and team training'], ['Care', 'The agreed support coverage']]}
  ];
  const sample = samples[index % samples.length];
  return `<div class="ds-artifact ds-artifact-${index + 1}" aria-label="Illustrative ${e(sample.heading.toLowerCase())}"><div class="ds-artifact-head"><span class="ds-artifact-symbol">${icon(['workflow', 'code', 'shield'][index])}</span><div><strong>${e(sample.heading)}</strong><span>${e(sample.label)}</span></div></div>${stageDiagram(index)}<dl class="ds-artifact-rows">${sample.rows.map(([label, value]) => `<div><dt>${e(label)}</dt><dd>${e(value)}</dd></div>`).join('')}</dl></div>`;
}

export const processArtifact = deliveryArtifact;

export function homeProcess() {
  return visualTimeline();
}


export function benefitArtifact(index) {
  if (index === 0) return `<div class="ds-benefit-art ds-outcome-art" aria-label="Illustrative scope agreement"><div class="ds-art-top"><span>${icon('workflow')}The first useful build</span><span class="ds-art-stamp">Agreed together</span></div><div class="ds-outcome-flow"><div><span>Understand</span><strong>The real bottleneck</strong></div><span class="ds-art-arrow" aria-hidden="true">${icon('arrow')}</span><div><span>Define</span><strong>A focused first outcome</strong></div></div><div class="ds-art-note">Scope follows the workflow. Tools follow the scope.</div></div>`;
  if (index === 1) return `<div class="ds-benefit-art ds-check-art" aria-label="Illustrative acceptance checks"><div class="ds-art-top"><span>${icon('check')}Before the launch</span><span class="ds-art-stamp">Review scenarios</span></div><dl class="ds-check-list">${[['Complete request', 'Agreed checks'], ['Missing context', 'Human review'], ['Failed integration', 'Recovery path']].map(([label, next]) => `<div><dt><span class="ds-check-square" aria-hidden="true">${icon('check')}</span>${label}</dt><dd>${next}</dd></div>`).join('')}</dl></div>`;
  if (index === 2) return `<div class="ds-benefit-art ds-control-art" aria-label="Illustrative action approval"><div class="ds-art-top"><span>${icon('shield')}The important decisions</span><span class="ds-art-stamp">Your operating rules</span></div><ol class="ds-approval-flow"><li><span>${icon('code')}</span><strong>Preview</strong></li><li><span>${icon('shield')}</span><strong>Approve</strong></li><li><span>${icon('check')}</span><strong>Keep a receipt</strong></li></ol><div class="ds-art-note">Sensitive changes wait for the right person.</div></div>`;
  return `<div class="ds-benefit-art ds-journey-art" aria-label="Illustrative enquiry journey"><div class="ds-art-top"><span>${icon('globe')}A considered customer journey</span><span class="ds-art-stamp">Context included</span></div><div class="ds-journey-preview"><div class="ds-journey-copy"><span>From the first question</span><strong>A goal your team can act on.</strong><div class="ds-journey-lines" aria-hidden="true"><i></i><i></i></div></div><span class="ds-journey-action">Review the brief ${icon('arrow')}</span></div></div>`;
}

export function homeBenefits() {
  return visualBenefits();
}

export function systemsShowcase() {
  return openSystems();
}
