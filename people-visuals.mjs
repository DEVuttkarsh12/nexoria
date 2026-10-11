import {caseStudies} from './content.mjs';
import {escapeHtml as e, icon} from './layout.mjs';

// Line studies describe responsibility. These are not portraits or measured charts.
const disciplines = [
  {label:'Strategy',steps:['Observe','Map','Decide'],
    paths:'<path d="M20 20h52c19 0 18 28 38 28h40M20 48h130M20 76h52c19 0 18-28 38-28h40"/><path d="M178 48h38M244 48h36"/><circle cx="164" cy="48" r="14"/><rect x="216" y="34" width="28" height="28" rx="2"/><path d="m154 48 7 7 13-14"/>',
    route:'M20 20h52c19 0 18 28 38 28h40m28 0h38m28 0h36'},
  {label:'Design',steps:['Frame','Refine','Read'],
    paths:'<rect x="20" y="18" width="58" height="60" rx="2"/><path d="M20 32h58M32 44h34M32 56h22M32 66h30M96 48h25"/><rect x="138" y="18" width="58" height="60" rx="2"/><path d="M138 32h58M150 44h34M150 56h22M150 66h30M212 48h25"/><path d="m246 47 9 9 23-23"/>',
    route:'M20 32h58m18 16h25m17-16h58m16 16h25'},
  {label:'Engineering',steps:['Connect','Check','Run'],
    paths:'<rect x="20" y="16" width="28" height="28" rx="2"/><rect x="20" y="56" width="28" height="28" rx="2"/><path d="M48 30h33c21 0 17 18 36 18h18M48 70h33c21 0 17-22 36-22h18"/><rect x="135" y="28" width="40" height="40" rx="2"/><path d="m149 39-8 9 8 9m12-18 8 9-8 9M175 48h45"/><circle cx="246" cy="48" r="26"/><path d="m237 36 20 12-20 12V36Z"/>',
    route:'M48 30h33c21 0 17 18 36 18h18m40 0h45'},
  {label:'Delivery',steps:['Review','Launch','Own'],
    paths:'<path d="M28 48h245"/><circle cx="42" cy="48" r="18"/><circle cx="150" cy="48" r="18"/><circle cx="258" cy="48" r="18"/><path d="m34 48 6 6 12-13m90 7 6 6 12-13m90 7 6 6 12-13"/><path d="M42 12v10M150 12v10M258 12v10M42 74v10M150 74v10M258 74v10"/>',
    route:'M60 48h72m36 0h72'}
];

function disciplineStudy(discipline){
  return `<div class="pe-discipline-study" aria-label="${e(discipline.label)} approach"><svg viewBox="0 0 300 96" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="pe-study-structure">${discipline.paths}</g><path class="pe-study-route" d="${discipline.route}"/></svg><ol>${discipline.steps.map(step=>`<li>${e(step)}</li>`).join('')}</ol></div>`;
}

export function teamCards(items){
  return `<div class="pe-team-grid">${items.map((person,index)=>{
    const discipline=disciplines[index] || disciplines[0];
    return `<article class="pe-team-card reveal"><div class="pe-team-band"><span class="pe-team-discipline"><span>0${index+1}</span>${e(discipline.label)}</span><span class="pe-team-note">The systems team</span></div><div class="pe-team-body"><div class="pe-team-heading"><span class="pe-person-initials" aria-hidden="true">${e(person.initials)}</span><div><h3>${e(person.name)}</h3><p class="pe-team-role">${e(person.role)}</p></div></div><p class="pe-team-bio">${e(person.bio)}</p>${disciplineStudy(discipline)}<p class="pe-team-specialty">${e(person.specialty)}</p></div></article>`;
  }).join('')}</div>`;
}

function clientRecord(item){
  return caseStudies.find(project=>project.slug===item.slug || project.client===item.client || project.person===(item.person || item.name)) || item;
}

export function clientEmblem(item,index=0){
  const project=clientRecord(item);
  const result=project.results?.[project.slug==='luxe-estates'?1:0];
  return `<div class="pe-client-emblem"><div class="pe-client-top"><span>Client perspective</span><span>0${index+1}</span></div><div class="pe-client-identity"><strong class="pe-client-name">${e(project.client || item.client || 'Client perspective')}</strong>${project.industry?`<span class="pe-client-industry">${e(project.industry)}</span>`:''}</div>${result?`<div class="pe-client-result"><strong>${e(result.value)}</strong><span>${e(result.label)}</span></div>`:''}${project.elapsed?`<div class="pe-client-project"><span>${e(project.categoryLabel)}</span><span>${e(project.elapsed)} build</span></div>`:''}</div>`;
}

export function testimonialCards(items){
  return `<div class="pe-story-grid">${items.map((item,index)=>{
    const project=clientRecord(item);
    const person=item.person || item.name;
    return `<article class="pe-story-card reveal"><div class="pe-story-header"><span class="pe-story-index">0${index+1}</span><div><h3>${e(project.client || item.client || 'Client perspective')}</h3>${project.industry?`<span>${e(project.industry)}</span>`:''}</div></div><blockquote>${e(item.quote)}</blockquote><div class="pe-story-person"><span class="pe-person-initials" aria-hidden="true">${e(item.initials)}</span><div><strong>${e(person)}</strong><span>${e(item.role)}</span></div></div>${project.results?.length?`<dl class="pe-story-results">${project.results.map(result=>`<div><dt>${e(result.label)}</dt><dd>${e(result.value)}</dd></div>`).join('')}</dl>`:''}${project.slug?`<a class="pe-story-link" href="/case-study/${e(project.slug)}">Read the ${e(project.client)} story ${icon('arrow')}</a>`:''}</article>`;
  }).join('')}</div>`;
}
