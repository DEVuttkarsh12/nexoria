import {caseStudies} from './content.mjs';
import {escapeHtml as e, icon} from './layout.mjs';

// These are editorial role and industry symbols, not portraits or client logos.
const disciplines = [
  {label:'Strategy', symbol:'workflow'},
  {label:'Design', symbol:'spark'},
  {label:'Engineering', symbol:'code'},
  {label:'Delivery', symbol:'check'}
];

export function teamCards(items){
  return `<div class="pe-team-grid">${items.map((person,index)=>{
    const discipline=disciplines[index] || disciplines[0];
    return `<article class="pe-team-card reveal"><div class="pe-team-band"><span class="pe-team-discipline"><span>0${index+1}</span>${e(discipline.label)}</span><span class="pe-team-symbol" aria-hidden="true">${icon(discipline.symbol)}</span></div><div class="pe-team-body"><div class="pe-team-heading"><span class="pe-person-initials" aria-hidden="true">${e(person.initials)}</span><div><h3>${e(person.name)}</h3><p class="pe-team-role">${e(person.role)}</p></div></div><p class="pe-team-bio">${e(person.bio)}</p><div class="pe-team-specialty"><span aria-hidden="true"></span>${e(person.specialty)}</div></div></article>`;
  }).join('')}</div>`;
}

const industryPaths={
  'luxe-estates':'<path d="M14 48V24l18-12 18 12v24M23 48V32h18v16M10 48h44M23 23h.01M32 23h.01M41 23h.01"/>',
  'velvet-co':'<path d="m20 12-9 9 8 8 4-4v25h18V25l4 4 8-8-9-9-7 4H27l-7-4Z"/><path d="M27 12c0 7 10 7 10 0M23 40h18"/>',
  'pulse-fit-os':'<path d="M11 26v12M17 22v20M23 29h18M41 22v20M47 26v12M10 17h44M10 47h44"/>',
  'noir-clinic':'<path d="M25 12h14v13h13v14H39v13H25V39H12V25h13V12Z"/>',
  'kinetic-logistics':'<path d="m13 22 19-10 19 10v22L32 54 13 44V22Z"/><path d="m13 22 19 10 19-10M32 32v22M23 17l18 10M9 34H3M9 41H5"/>',
  'hearth-home':'<path d="m9 29 23-19 23 19M15 24v28h34V24M26 52V36h12v16"/><path d="M41 17v-6h8v13"/>'
};

function clientRecord(item){
  return caseStudies.find(project=>project.slug===item.slug || project.client===item.client || project.person===(item.person || item.name)) || item;
}

const industrySymbol = item => `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${industryPaths[item.slug] || '<path d="M14 21h15v16H18l-4 7V21Zm21 0h15v16H39l-4 7V21Z"/>'}</svg>`;

export function clientEmblem(item,index=0){
  const project=clientRecord(item);
  const result=project.results?.[project.slug==='luxe-estates'?1:0];
  return `<div class="pe-client-emblem"><div class="pe-client-top"><span>Client story</span><span>0${index+1}</span></div><div class="pe-client-identity"><span class="pe-client-symbol" aria-hidden="true">${industrySymbol(project)}</span><div><strong class="pe-client-name">${e(project.client || item.client || 'Client perspective')}</strong>${project.industry?`<span class="pe-client-industry">${e(project.industry)}</span>`:''}</div></div>${result?`<div class="pe-client-result"><strong>${e(result.value)}</strong><span>${e(result.label)}</span></div>`:''}</div>`;
}

export function testimonialCards(items){
  return `<div class="pe-story-grid">${items.map((item,index)=>{
    const project=clientRecord(item);
    const person=item.person || item.name;
    return `<article class="pe-story-card reveal"><div class="pe-story-header"><span class="pe-story-symbol" aria-hidden="true">${industrySymbol(project)}</span><div><h3>${e(project.client || item.client || 'Client perspective')}</h3>${project.industry?`<span>${e(project.industry)}</span>`:''}</div><span class="pe-story-quote-mark" aria-hidden="true">“</span></div><blockquote>${e(item.quote)}</blockquote><div class="pe-story-person"><span class="pe-person-initials" aria-hidden="true">${e(item.initials)}</span><div><strong>${e(person)}</strong><span>${e(item.role)}</span></div></div>${project.results?.length?`<dl class="pe-story-results">${project.results.map(result=>`<div><dt>${e(result.label)}</dt><dd>${e(result.value)}</dd></div>`).join('')}</dl>`:''}${project.slug?`<a class="pe-story-link" href="/case-study/${e(project.slug)}">Read the ${e(project.client)} story ${icon('arrow')}</a>`:''}</article>`;
  }).join('')}</div>`;
}
