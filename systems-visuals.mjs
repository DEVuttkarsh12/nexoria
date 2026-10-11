import {services} from './content.mjs';
import {escapeHtml as e, icon} from './layout.mjs';

// This is a selectable explanation of a possible custom build, not a live console.
const handoffs = [
  {name:'IntentPath', action:'Shape the request', title:'A brief the visitor can check.', caption:'The website turns a goal into an editable enquiry. The visitor reviews it before anything is sent.', detail:'A useful first conversation begins with the right context.', artifact:'Decision Brief'},
  {name:'Carryline', action:'Carry the context', title:'The channel changes. The brief travels.', caption:'Selected channels share confirmed facts and open questions. A human handoff stays open until the next owner accepts.', detail:'Identity is verified before records are connected.', artifact:'Context Passport'},
  {name:'PledgeDesk', action:'Own the next step', title:'A promise becomes someone’s work.', caption:'Approved conversation notes become a source-linked commitment. Your team confirms the owner and due date.', detail:'Unclear promises wait for a person to confirm them.', artifact:'Commitment Radar'},
  {name:'PreviewOps', action:'Review the change', title:'See the impact before it happens.', caption:'A supported business action gets a before-and-after preview. Permissions and changed records are checked again at approval.', detail:'A preview does not change the live record.', artifact:'Change Rehearsal'},
  {name:'Flowback', action:'Recover the handoff', title:'Keep what worked. Review what stopped.', caption:'Step receipts show the confirmed result and the unfinished handoff. Supported recovery resumes only after the agreed checks.', detail:'An uncertain result stays in review; it is never assumed complete.', artifact:'Safe Replay Desk'}
];

const pointer = '<svg viewBox="0 0 28 18" fill="none" aria-hidden="true"><path d="M1 9h25M19 2l7 7-7 7" stroke="currentColor" stroke-width="1.5"/></svg>';
const dot = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor"/><path d="m8 12 3 3 5-6" stroke="currentColor" stroke-width="1.5"/></svg>';
const registration = '<svg class="sx-registration" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M20 0v40M0 20h40" stroke="currentColor"/><circle cx="20" cy="20" r="12" stroke="currentColor"/></svg>';

function brief() {
  return `<div class="sx-paper sx-brief"><div class="sx-paper-head"><span>Request / 01</span><span class="sx-paper-seal">Visitor reviewed ${dot}</span></div><p class="sx-paper-quote">“Can we arrange a consultation next week?”</p><dl class="sx-brief-fields"><div><dt>Goal</dt><dd>Discuss the right service</dd></div><div><dt>Preferred window</dt><dd>Next week</dd></div><div><dt>Next step</dt><dd>Review with your team</dd></div></dl><div class="sx-paper-foot"><span>Editable before sending</span>${pointer}</div></div>`;
}

function context() {
  return `<div class="sx-context"><div class="sx-channel-flow"><div><span class="sx-channel-index">01</span><strong>Website</strong><span>Reviewed brief</span></div><span class="sx-channel-connector">${pointer}<span>Verified link</span></span><div><span class="sx-channel-index">02</span><strong>Phone</strong><span>Context included</span></div></div><div class="sx-context-packet"><span class="sx-packet-tab">The same enquiry</span><div class="sx-packet-columns"><div><span>Confirmed</span><strong>Consultation.<br>Next week.</strong></div><div><span>Still open</span><strong>Which service?<br>Who takes over?</strong></div></div><div class="sx-packet-handoff"><span class="sx-state-dot" aria-hidden="true"></span>Handoff awaits a named owner.</div></div></div>`;
}

function promise() {
  return `<div class="sx-promise"><div class="sx-source-excerpt"><span>Source / conversation note</span><p>“I’ll send the revised quote on Friday.”</p></div><div class="sx-commitment"><div class="sx-commitment-rule" aria-hidden="true"><span></span>${pointer}</div><div class="sx-commitment-task"><span>Confirmed next step</span><strong>Send the<br>revised quote.</strong></div><dl><div><dt>Owner</dt><dd>Sales lead</dd></div><div><dt>Due</dt><dd>Friday</dd></div></dl></div><div class="sx-artifact-caption">Illustrative owner and deadline · confirmed by your team</div></div>`;
}

function preview() {
  return `<div class="sx-preview"><div class="sx-diff-heading"><span>Proposed CRM update</span><span>Approval required</span></div><div class="sx-diff"><div class="sx-diff-state"><span>Before</span><dl><div><dt>Next action</dt><dd>No agreed task</dd></div><div><dt>Owner</dt><dd>Unassigned</dd></div></dl></div><span class="sx-diff-arrow">${pointer}</span><div class="sx-diff-state sx-diff-proposed"><span>Preview</span><dl><div><dt>Next action</dt><dd>Quote review</dd></div><div><dt>Owner</dt><dd>Sales lead</dd></div></dl></div></div><div class="sx-approval-gate"><span class="sx-gate-mark" aria-hidden="true">‖</span><span>Permission check</span><span>Current record check</span><strong>Then approve</strong></div></div>`;
}

function recovery() {
  return `<div class="sx-recovery"><ol class="sx-run-trace"><li><span class="sx-trace-node" aria-hidden="true">${dot}</span><div><span>01 / Confirmed</span><strong>Enquiry received</strong></div><span class="sx-trace-tail">Keep</span></li><li><span class="sx-trace-node" aria-hidden="true">${dot}</span><div><span>02 / Confirmed</span><strong>CRM record created</strong></div><span class="sx-trace-tail">Keep</span></li><li class="sx-trace-review"><span class="sx-trace-node" aria-hidden="true">?</span><div><span>03 / Result uncertain</span><strong>Confirmation delivery</strong></div><span class="sx-trace-tail">Review</span></li></ol><div class="sx-recovery-path"><span>Check the provider result</span>${pointer}<strong>Approve a supported recovery</strong></div></div>`;
}

const artifacts = [brief, context, promise, preview, recovery];

export function serviceSpecimen(item) {
  const service = typeof item === 'string' ? services.find(s=>s.title===item) : item;
  const index = Math.max(0, handoffs.findIndex(s=>s.name===service?.title));
  const handoff = handoffs[index];
  return `<div class="sx-service-specimen"><div class="sx-specimen-head"><span class="sx-scene-label">Illustrative flow / ${e(handoff.name)}</span><h3>${e(service?.signature?.name || handoff.artifact)}</h3></div><div class="sx-artifact">${artifacts[index]()}</div><p class="sx-specimen-rule">${e(handoff.detail)}</p></div>`;
}

export function systemsOperatingSheet() {
  return `<div class="sx-sheet"><div class="sx-masthead"><div><span class="sx-index">Zykken / systems study</span><h3>One enquiry.<br>Five considered handoffs.</h3></div><p>Follow the work from first request to follow-through. Choose a handoff to inspect what the system carries.</p>${registration}</div><fieldset class="sx-selector"><legend class="sx-accessible">Inspect a handoff in an illustrative enquiry</legend>${handoffs.map((s,i)=>`<input class="sx-radio" type="radio" name="systems-handoff" id="systems-handoff-${i+1}" ${i===0?'checked':''}>`).join('')}<div class="sx-route">${handoffs.map((s,i)=>`<label class="sx-route-stop" for="systems-handoff-${i+1}"><span class="sx-stop-number">0${i+1}</span><span class="sx-stop-copy"><strong>${e(s.name)}</strong><span>${e(s.action)}</span></span></label>`).join('')}</div><div class="sx-scene">${handoffs.map((s,i)=>`<section class="sx-stage sx-stage-${i+1}" aria-label="${e(s.name)} illustrative handoff"><div class="sx-stage-title"><span class="sx-scene-label">Illustrative scenario / 0${i+1}</span><h4>${e(s.title)}</h4><span class="sx-stage-artifact">${e(s.artifact)}</span></div><div class="sx-stage-body"><div class="sx-artifact">${artifacts[i]()}</div><div class="sx-stage-notes"><p>${e(s.caption)}</p><div class="sx-note-rule"><span class="sx-note-index">The rule</span><p>${e(s.detail)}</p></div><a href="/services/${s.name.toLowerCase()}" class="sx-detail-link">Explore ${e(s.name)} ${icon('arrow')}</a></div></div></section>`).join('')}</div><div class="sx-scenario-note"><span class="sx-note-mark" aria-hidden="true">*</span><p>A possible custom build, shown for explanation. Your proposal defines which systems, tools and actions connect.</p></div></fieldset><div class="sx-ownership"><span class="sx-ownership-label">The common foundation</span><p>Your accounts. Your rules.<br><strong>Your team owns the handover.</strong></p><a href="/features#ownership" class="sx-detail-link">Explore ownership ${icon('arrow')}</a></div></div>`;
}
