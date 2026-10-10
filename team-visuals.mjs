// Conceptual workbenches illustrate the team's roles without invented portraits.
const spark = '<svg viewBox="0 0 24 24" fill="none"><path d="m12 2 2.7 7.3L22 12l-7.3 2.7L12 22l-2.7-7.3L2 12l7.3-2.7L12 2Z" fill="currentColor"/></svg>';
const check = '<svg viewBox="0 0 20 20" fill="none"><path d="m5 10 3 3 7-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const header = (label, mode) => `<div class="tw-toolbar"><span class="tw-window-dots"><i></i><i></i><i></i></span><span>${label}</span></div>`;

const workbenches = [
  `<div class="tw-window tw-strategy">${header('Workflow map', 'SCOPE')}<div class="tw-map">
    <svg class="tw-route" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M14 30H86M50 30V58M50 58H35V77M50 58H65V77"/><path class="tw-route-signal" d="M14 30H86M50 30V58M50 58H65V77"/></svg>
    <span class="tw-node tw-input">Input</span><span class="tw-node tw-router">${spark}<b>Route</b></span><span class="tw-node tw-output">Outcome</span><span class="tw-node tw-rules">Rules</span><span class="tw-node tw-review">Review</span>
  </div></div>`,
  `<div class="tw-window tw-design">${header('Interface studio', 'DESIGN')}<div class="tw-design-body"><div class="tw-layer-rail"><span></span><span></span><span></span><i></i><i></i></div><div class="tw-interface"><div class="tw-ui-header"><span class="tw-ui-brand"></span><i></i><i></i></div><div class="tw-ui-content"><span class="tw-ui-orb"></span><div class="tw-ui-lines"><i></i><i></i><i></i></div></div><div class="tw-ui-actions"><span></span><span></span></div><div class="tw-cursor"><svg viewBox="0 0 24 28"><path d="M2 2v20l6-6 4 9 4-2-4-9h9L2 2Z" fill="white" stroke="#222226" stroke-width="1.5" stroke-linejoin="round"/></svg><span>Design</span></div></div></div></div>`,
  `<div class="tw-window tw-engineer">${header('Agent builder', 'BUILD')}<div class="tw-agent-map"><svg class="tw-route" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M14 40H86M50 40V83"/><path class="tw-route-signal" d="M14 40H86"/></svg><span class="tw-agent-port tw-context">Context</span><div class="tw-agent-core">${spark}<span>Reason</span></div><span class="tw-agent-port tw-action">Tools</span><div class="tw-guardrail">${check}<span>Evaluate before action</span></div></div></div>`,
  `<div class="tw-window tw-delivery">${header('Launch checklist', 'DELIVER')}<div class="tw-delivery-body"><div class="tw-checklist"><span>${check}<b>Test inputs</b></span><span>${check}<b>Review outputs</b></span><span>${check}<b>Document handover</b></span></div><div class="tw-delivery-orbit"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="48" fill="none" stroke="#dedee1" stroke-width="1"/><circle class="tw-orbit-arc" cx="60" cy="60" r="48" fill="none" stroke="#fd3a25" stroke-width="2" stroke-linecap="round" stroke-dasharray="68 234"/><circle cx="60" cy="60" r="35" fill="#efeff0" stroke="white"/><path d="m44 59 11 11 23-23" stroke="#fd3a25" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="60" cy="12" r="4" fill="#fd3a25"/></svg><span>Handover</span></div></div></div>`
];

export function teamWorkbench(index) {
  const i = Number.isInteger(index) && index >= 0 && index < workbenches.length ? index : 0;
  return `<div class="team-workbench team-workbench-${i}" aria-hidden="true"><div class="tw-ambient"></div>${workbenches[i]}<span class="tw-stage-index">0${i + 1} / ${['Map','Design','Build','Deliver'][i]}</span></div>`;
}
