import {escapeHtml as e, icon} from './layout.mjs';

// These are explanatory specimens, not screenshots of a deployed client product.
export function serviceFlow() {
 return `<figure class="nv-flow reveal"><div class="nv-flow-header"><span class="nv-label">A REQUEST, RESOLVED</span><span class="nv-specimen">Workflow specimen</span></div><ol class="nv-flow-stages"><li style="--stage:0"><span class="nv-stage-number">01</span><div><span class="nv-label">REQUEST</span><p>“Can I book a viewing this Friday?”</p><span class="nv-stage-note">A message arrives through your existing channel.</span></div></li><li style="--stage:1"><span class="nv-stage-number">02</span><div><span class="nv-label">CONTEXT</span><dl class="nv-context"><div><dt>Intent</dt><dd>Book a viewing</dd></div><div><dt>Record</dt><dd>Matched in CRM</dd></div></dl></div></li><li style="--stage:2"><span class="nv-stage-number">03</span><div><span class="nv-label">DECISION</span><div class="nv-decision"><span>${icon('check')} Agreed rules checked</span><span class="nv-stage-note">An exception goes to your team.</span></div></div></li><li style="--stage:3"><span class="nv-stage-number">04</span><div><span class="nv-label">ACTION</span><div class="nv-action"><strong>Ready for the next step</strong><span>Calendar updated · owner notified</span></div></div></li></ol><figcaption>One enquiry, carried from the first message to a useful action. Your rules govern every handoff.</figcaption></figure>`;
}

export function integrationRoutes() {
 const routes = [
  {tool:'n8n', file:'n8n.svg', purpose:'Workflow orchestration', from:'Web enquiry', to:'CRM record'},
  {tool:'Make', file:'make.svg', purpose:'Connected app workflows', from:'Qualified lead', to:'Calendar slot'},
  {tool:'Zapier', file:'zapier.svg', purpose:'Event-driven handoffs', from:'New booking', to:'Team inbox'}
 ];
 return `<figure class="nv-integrations reveal"><div class="nv-integration-head"><span class="nv-label">YOUR TOOLS, CONNECTED</span><span>Example integration paths</span></div><div class="nv-integration-routes">${routes.map((r,i)=>`<div class="nv-integration-row" style="--route:${i}"><div class="nv-tool"><img src="/assets/tools/${r.file}" width="36" height="36" alt="" loading="lazy"><div><strong>${r.tool}</strong><span>${r.purpose}</span></div></div><div class="nv-route"><span>${r.from}</span><span class="nv-route-line" aria-hidden="true"><i></i></span><span>${r.to}</span></div></div>`).join('')}</div><figcaption>We choose the orchestration layer around your existing tools. Accounts, workflows and operating rules stay with you.</figcaption></figure>`;
}

export function outcomeComparisons() {
 const comparisons = [
  {client:'Luxe Estates',slug:'luxe-estates',label:'Reported first response',before:'6 hours',after:'38 seconds',beforeWidth:100,afterWidth:38/21600*100,direction:'After: a reported 38-second median follow-up.'},
  {client:'Velvet & Co',slug:'velvet-co',label:'Reported storefront loading',before:'4.2 seconds',after:'1.1 seconds',beforeWidth:100,afterWidth:1.1/4.2*100,direction:'Before: store load time. After: mobile 4G LCP, as reported in the case study.'},
  {client:'Velvet & Co',slug:'velvet-co',label:'Storefront conversion rate',before:'0.9%',after:'3.1%',beforeWidth:.9/3.1*100,afterWidth:100,direction:'More visits becoming purchases.'}
 ];
 return `<figure class="nv-results reveal"><div class="nv-results-heading"><span class="nv-label">BEFORE / AFTER</span><span>Selected client outcomes</span></div>${comparisons.map(c=>`<div class="nv-result"><div class="nv-result-heading"><h3>${e(c.label)}</h3><a href="/case-study/${c.slug}">${e(c.client)} <span aria-hidden="true">↗</span></a></div><div class="nv-compare" role="img" aria-label="${e(c.label)}: before ${e(c.before)}, after ${e(c.after)}"><div class="nv-compare-row"><span>Before</span><div class="nv-bar-track"><i class="nv-bar-before" style="--value:${c.beforeWidth}%"></i></div><strong>${e(c.before)}</strong></div><div class="nv-compare-row"><span>After</span><div class="nv-bar-track"><i class="nv-bar-after" style="--value:${c.afterWidth}%"></i></div><strong>${e(c.after)}</strong></div></div><p>${e(c.direction)}</p></div>`).join('')}<figcaption>Results reported in our supplied case studies. Each pair uses its own scale; these are comparisons, not a timeline.</figcaption></figure>`;
}

export function insightVisual(item) {
 if (item.slug === 'automate-your-highest-impact-workflow') return `<div class="nv-insight nv-insight-map" aria-hidden="true"><span class="nv-label">FOLLOW THE HANDOFF</span><div class="nv-map-steps"><span>Inbox</span><i></i><span class="nv-map-focus">Manual review<small>Start here</small></span><i></i><span>CRM</span></div><div class="nv-map-baseline"><span>Capture</span><span>Repeated work</span><span>Next action</span></div></div>`;
 if (item.slug === 'from-first-enquiry-to-booked-call') return `<div class="nv-insight nv-insight-record" aria-hidden="true"><span class="nv-label">ONE RECORD, FORWARD</span><div class="nv-record"><span class="nv-record-id">ENQUIRY / 01</span><div class="nv-record-steps"><span>Captured <i>✓</i></span><span>Qualified <i>✓</i></span><span>Booked <i>↗</i></span></div></div></div>`;
 return `<div class="nv-insight nv-insight-log" aria-hidden="true"><span class="nv-label">THE WORK AFTER LAUNCH</span><div class="nv-log"><div><span>Operating checks</span><strong>Measured</strong></div><div><span>Exception owner</span><strong>Assigned</strong></div><div><span>Working handover</span><strong>Documented</strong></div></div></div>`;
}
