import {legalDocuments,legalUpdated} from './legal-data.mjs';
import {escapeHtml as e,tag} from './layout.mjs';

const legalHero = (title,intro) => `<section class="legal-hero"><div class="container"><nav class="legal-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">${e(title)}</span></nav>${tag('Clear terms. Clear information.')}<h1>${e(title)}</h1><p>${e(intro)}</p><span class="legal-updated">Last updated: <time datetime="2026-10-12">${e(legalUpdated)}</time></span></div></section>`;

export function renderLegalPage(kind) {
  const doc=legalDocuments[kind];
  if(!doc) throw new Error(`Unknown legal document: ${kind}`);
  return `${legalHero(doc.title,doc.intro)}<section class="section section-tight"><div class="container legal-reading"><aside class="legal-contents"><nav aria-label="On this policy page"><h2>On this page</h2>${doc.sections.map(([id,title],i)=>`<a href="#${id}"><span>${String(i+1).padStart(2,'0')}</span>${e(title)}</a>`).join('')}</nav></aside><article class="legal-copy prose">${doc.sections.map(([id,title,copy],i)=>`<section id="${id}" class="legal-chapter"><span class="legal-chapter-index">${String(i+1).padStart(2,'0')}</span><h2>${e(title)}</h2><p>${copy}</p></section>`).join('')}<div class="legal-contact-note"><h2>Need to ask something?</h2><p>Send policy questions or privacy requests to <a href="mailto:info@zykken.com">info@zykken.com</a>.</p></div></article></div></section>`;
}
