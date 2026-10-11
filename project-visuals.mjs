// Industry-specific concepts derived from the six supplied project descriptions.
// These are illustrations of the work, not screenshots of client applications.
import {escapeHtml as e} from './layout.mjs';

const symbol = (name) => {
 const paths = {
  enquiry:'<path d="M5 5h14v11H9l-4 4V5Z"/><path d="M8 9h8M8 12h5"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  calendar:'<rect x="4" y="5" width="16" height="16" rx="3"/><path d="M8 3v4M16 3v4M4 10h16m-11 5 2 2 4-4"/>',
  bag:'<path d="M5 8h14l1 12H4L5 8Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/>',
  plan:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 3h6v3H9zM9 11h6M9 15h6"/>',
  voice:'<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11v1a7 7 0 0 0 14 0v-1M12 19v3M9 22h6"/>',
  person:'<circle cx="12" cy="7" r="3"/><path d="M5 21v-3a7 7 0 0 1 14 0v3"/>',
  document:'<path d="M6 3h8l4 4v14H6V3Z"/><path d="M14 3v5h4M9 12h6M9 16h6"/>',
  home:'<path d="m3 10 9-7 9 7M5 9v12h14V9M9 21v-8h6v8"/>',
  arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>'
 };
 return `<svg class="px-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.check}</svg>`;
};

const steps = (items) => `<div class="px-path">${items.map(([name,label])=>`<span class="px-path-step">${symbol(name)}<span>${e(label)}</span></span>`).join('')}</div>`;
const heading = (title, description) => `<div class="px-copy"><p class="px-title">${title}</p><p class="px-description">${description}</p></div>`;

const property = `<svg class="px-architecture" viewBox="0 0 480 320" fill="none" aria-hidden="true">
 <path d="M20 257 218 149l237 64-198 98L20 257Z" fill="#d8dfcf"/>
 <path d="m83 119 177-71 150 73-176 72L83 119Z" fill="#fcfaf2" stroke="#244135" stroke-width="1.5"/>
 <path d="M83 119v108l151 68V193L83 119Z" fill="#c3cbb8" stroke="#244135" stroke-width="1.5"/>
 <path d="M234 193v102l176-80v-94l-176 72Z" fill="#faf8ef" stroke="#244135" stroke-width="1.5"/>
 <path d="m83 119 49-20 151 72-49 22L83 119Z" fill="#385144"/>
 <path d="m114 153 50 25v62l-50-25v-62Z" fill="#718878" stroke="#244135" stroke-width="1.5"/>
 <path d="m177 186 28 14v60l-28-13v-61Z" fill="#8da193"/>
 <path d="m267 190 45-20v49l-45 20v-49Zm57-26 45-20v49l-45 20v-49Z" fill="#c0d2cb" stroke="#244135" stroke-width="1.5"/>
 <path d="m289 181 1 49m55-74v48m-78-90 13 6 83-33-13-6-83 33Z" stroke="#244135" stroke-width="1.5"/>
 <path d="m40 262 37-19m223 54 67-33m50-95 29-13" stroke="#244135" stroke-width="1.5" stroke-dasharray="4 5"/>
 <path d="M47 187v67m0-89c-25 0-27 45 0 45s25-45 0-45Z" fill="#72886d" stroke="#244135" stroke-width="1.5"/>
 <path d="M438 232v33m0-63c-17 0-18 36 0 36s18-36 0-36Z" fill="#72886d" stroke="#244135" stroke-width="1.5"/>
 <circle cx="319" cy="67" r="13" fill="#d39462"/>
 <path d="m319 59 4 8-4 7-4-7 4-8Z" fill="#f9f7ed"/>
</svg>`;

const garment = `<svg class="px-garment" viewBox="0 0 360 360" fill="none" aria-hidden="true">
 <path d="M181 38c-15 0-20 24-1 24v14m0 0-76 31h152l-76-31Z" stroke="#7c4b43" stroke-width="2" stroke-linecap="round"/>
 <path d="m137 107-42 17-57 76 41 25 34-45-12 150h158l-12-150 34 45 41-25-57-76-42-17-43 30-43-30Z" fill="#a85446" stroke="#65382f" stroke-width="2"/>
 <path d="m137 107 43 30-26 38-32-61m101-7-43 30 26 38 32-61M180 137v193" stroke="#ead6c3" stroke-width="2"/>
 <path d="M133 216h27m40 0h27m-94 4v30h27v-30m40 0v30h27v-30" stroke="#e4b4a1" stroke-width="1.5"/>
 <circle cx="188" cy="209" r="2.5" fill="#ead6c3"/><circle cx="188" cy="239" r="2.5" fill="#ead6c3"/><circle cx="188" cy="269" r="2.5" fill="#ead6c3"/>
 <path d="M15 335h331M49 26h16m-8-8v16m257 23h16m-8-8v16" stroke="#7c4b43" stroke-width="1.2"/>
</svg>`;

const interior = `<svg class="px-interior" viewBox="0 0 440 310" fill="none" aria-hidden="true">
 <path d="M48 272h349" stroke="#70493c" stroke-width="1.5"/>
 <rect x="88" y="140" width="240" height="100" rx="23" fill="#b65f43"/>
 <rect x="105" y="147" width="97" height="67" rx="14" fill="#d88b69"/>
 <rect x="211" y="147" width="97" height="67" rx="14" fill="#d88b69"/>
 <path d="M86 193c-15-10-32-3-32 11v34c0 8 7 15 15 15h275c8 0 15-7 15-15v-34c0-14-17-21-32-11v38H86v-38Z" fill="#a64c35" stroke="#70493c" stroke-width="1.5"/>
 <path d="M81 253v19m252-19v19" stroke="#70493c" stroke-width="7"/>
 <path d="M61 46v160m-21-96h44L72 39H53l-13 71Z" fill="#ead2a8" stroke="#70493c" stroke-width="1.5"/>
 <path d="M28 206h63m-31-96v22" stroke="#70493c" stroke-width="1.5"/>
 <rect x="172" y="30" width="99" height="76" rx="2" fill="#f8f1e3" stroke="#70493c" stroke-width="1.5"/>
 <path d="m191 84 25-33 36 36m-58-46h53" stroke="#9b6d49" stroke-width="1.5"/>
 <circle cx="240" cy="49" r="6" fill="#d0994f"/>
 <path d="M370 235v-81m0 51c-22-11-23-34-12-46 16 12 23 31 12 46Zm0-11c19-8 24-28 16-41-17 9-26 28-16 41Z" fill="#7c8b58" stroke="#5a6343" stroke-width="1.5"/>
 <path d="m351 229 8 43h22l8-43h-38Z" fill="#b89471" stroke="#70493c" stroke-width="1.5"/>
 <ellipse cx="205" cy="273" rx="136" ry="10" fill="#c1a88b" opacity=".25"/>
</svg>`;

const waveform = `<div class="px-waveform" aria-hidden="true">${[20,34,54,27,68,91,42,75,38,63,98,47,77,30,57,84,39,68,25,48,79,43,59,92,49,33,66,24,47,31].map((height,i)=>`<i style="--px-wave:${height}%;--px-wave-order:${i}"></i>`).join('')}</div>`;

const compositions = {
 'luxe-estates': {
  label:'Property enquiries, qualification and booked viewings.',
  industry:'Real estate',
  body:`<div class="px-body px-property">${heading('From enquiry<br> to viewing.','WhatsApp + voice qualification,<br> connected to the agent’s calendar.')}<div class="px-scene">${property}<span class="px-scene-note">A viewing. A person. A next step.</span></div></div>${steps([['enquiry','Enquiry'],['check','Qualified buyer'],['calendar','Viewing']])}`
 },
 'velvet-co': {
  label:'An editorial fashion storefront with a bilingual concierge for sizing, pairing and gifting.',
  industry:'E-commerce',
  body:`<div class="px-body px-storefront"><div class="px-fashion-stage">${garment}<div class="px-swatches" aria-hidden="true"><i></i><i></i><i></i></div></div><div class="px-storefront-copy">${heading('A storefront<br> with good taste.','Editorial product pages.<br> A concierge that knows the details.')}<div class="px-concierge"><span class="px-concierge-icon">${symbol('enquiry')}</span><div><strong>Your AI concierge</strong><p>Sizing · Pairing · Gifting</p><span>Hindi + English</span></div></div></div></div><div class="px-storefront-footer"><span>Discover the collection</span><span>Find your fit</span><span>Move to checkout ${symbol('arrow')}</span></div>`
 },
 'pulse-fit-os': {
  label:'Member bookings, payments and tracking connected to trainer plans with coach approval.',
  industry:'Fitness',
  body:`<div class="px-body px-fitness">${heading('More coaching.<br> Less admin.','Members book and track.<br> Trainers approve the plan.')}<div class="px-training"><div class="px-training-orbit" aria-hidden="true"><svg viewBox="0 0 220 220" fill="none"><circle cx="110" cy="110" r="93" stroke="currentColor" stroke-width="1" stroke-dasharray="2 8"/><path d="M110 29a81 81 0 1 1-80 94" stroke="#bedd84" stroke-width="9" stroke-linecap="round"/><path d="M110 49a61 61 0 1 1-55 88" stroke="#7c9d8d" stroke-width="8" stroke-linecap="round"/><path d="M87 108h46m-55-17v34m-8-28v22m72-28v34m8-28v22" stroke="#f3f6e9" stroke-width="5" stroke-linecap="round"/></svg></div><div class="px-coach"><span>${symbol('check')}</span><strong>Coach-reviewed plans</strong><p>AI drafts. Your trainer decides.</p></div></div></div><div class="px-member-flow"><span>THE MEMBER JOURNEY</span>${steps([['calendar','Book'],['plan','Train & track'],['check','Renew']])}</div>`
 },
 'noir-clinic': {
  label:'Hindi and English voice reception connects bookings, rescheduling and urgent human handoffs.',
  industry:'Clinic',
  body:`<div class="px-body px-reception">${heading('A clearer answer.<br> At any hour.','Voice reception on the clinic’s line.<br> Human care when it matters.')}<div class="px-call"><div class="px-call-heading"><span class="px-voice-seal">${symbol('voice')}</span><div><strong>Voice reception</strong><span>Hindi + English</span></div></div>${waveform}<div class="px-call-footer"><span>Booking & rescheduling</span><span>${symbol('person')}Human handoff</span></div></div></div><div class="px-reception-flow"><span>${symbol('calendar')}Appointment</span><span>${symbol('enquiry')}Prep & reminders</span><span>${symbol('person')}Urgent escalation</span></div>`
 },
 'kinetic-logistics': {
  label:'Proof of delivery and invoice extraction, driver updates and a single exception inbox connected to sheets and CRM.',
  industry:'Logistics',
  body:`<div class="px-body px-freight">${heading('Documents in.<br> Exceptions out.','Proof of delivery and invoices,<br> connected to sheets + CRM.')}<div class="px-document-flow"><div class="px-papers"><div class="px-paper"><span>${symbol('document')}POD</span><i></i><i></i><i></i><span class="px-paper-sign" aria-hidden="true"></span></div><div class="px-paper"><span>${symbol('document')}Invoice</span><i></i><i></i><i></i><div class="px-paper-rows" aria-hidden="true"><b></b><b></b><b></b></div></div></div><div class="px-exception-line" aria-hidden="true">${symbol('arrow')}</div><div class="px-exception-desk"><span class="px-exception-marker" aria-hidden="true">!</span><strong>Only exceptions<br> reach your desk.</strong><span>Documents attached</span></div></div></div><div class="px-freight-footer"><span>${symbol('document')}Extract & sync</span><span>Driver updates</span><span>Friday reconciliation</span></div>`
 },
 'hearth-home': {
  label:'A home-services enquiry journey connects the website, accurate quotes, follow-up and CRM.',
  industry:'Home services',
  body:`<div class="px-body px-home">${heading('A home for<br> every enquiry.','A calm website. A connected CRM.<br> Quotes and follow-up in one flow.')}<div class="px-scene">${interior}<span class="px-scene-note">From the first hello to the next follow-up.</span></div></div>${steps([['home','Website enquiry'],['document','Quote'],['enquiry','CRM & follow-up']])}`
 }
};

export function projectVisual(item, options = {}) {
 const slug = item?.slug || item?.id;
 const composition = compositions[slug];
 if (!composition) return '';
 const variant = options.variant === 'detail' ? 'detail' : 'card';
 return `<div class="px-art px-art--${e(slug)} px-art--${variant}" role="img" aria-label="${e(item.client)}. Conceptual illustration: ${e(composition.label)}"><div class="px-art-inner"><div class="px-art-topline"><span>${e(composition.industry)} / Connected systems</span><span>Conceptual illustration</span></div>${composition.body}</div></div>`;
}
