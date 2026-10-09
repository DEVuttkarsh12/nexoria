# AgenAI inner-page implementation handoff

`pages.mjs` owns only body markup and keeps its existing nine exports. It now imports the root-owned `heroMark()` and `caseVisual(c)` helpers. The caseVisual result is an asset **src string**, with conceptual illustration alt text rather than claims of client UI screenshots. Root owns CSS, runtime, layout helpers and shared cards.

The case composition follows `AGEN_INNER_REFERENCE.md`: one semantic H1 visually split into two lines, the three floating icon-card capsule, absolute overlapping image frame, full-width narrative and **horizontal metadata below the overview**, research, results, two-image gallery, black testimonial band, next-project card. All six client records are retained. Other Zykken routes extend the same visual primitives because the actual template does not have independent About/Services/Contact/etc pages.

The inner testimonial markup uses the existing `data-carousel`, `data-carousel-prev`, `data-carousel-next` contracts, plus `data-autoplay="5000"`. Root should use the same 5-second autoplay/hover and offscreen pause behavior as its home testimonials. The carousel parent is `.inner-testimonial-shell`; controls are siblings of its scroll track. Existing tests do not cover autoplay.

The following CSS is a handoff block, **not an independently shipped stylesheet**. Merge with root styles and adapt its shared variables as appropriate. The desktop overlap dimensions come from the source. Longer real client titles need a fluid phone hero, preserving the same spacing/shape while preventing text/art collisions.

```css
/* Additional standalone pages */
.section-muted{background:#edecec}
.inner-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:24px;padding:40px 0;border-bottom:1px solid #d4d4d8}
.stat-item{display:flex;flex-direction:column;gap:8px;text-align:center;min-width:0}
.stat-item strong{font-size:clamp(32px,4vw,56px);line-height:1.1;font-weight:600;letter-spacing:-.03em}
.stat-item span{font-size:14px;color:#71717a}
.about-inner-grid,.service-detail-top{display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:64px}
.about-inner-art{position:relative;min-height:500px;border-radius:32px;overflow:hidden;background:#edecec}
.about-inner-art>img{width:100%;height:100%;position:absolute;inset:0;object-fit:cover}
.about-art-caption{position:absolute;left:32px;bottom:32px;font-size:12px;line-height:1.6;letter-spacing:.1em}
.split-copy,.service-copy{min-width:0}
.split-copy h2,.service-copy h2{margin:24px 0;font-size:clamp(36px,4.5vw,64px);font-weight:600;line-height:1.06;letter-spacing:-.03em}
.split-copy p,.service-copy p{color:#71717a;line-height:1.6;margin:16px 0}
.split-copy .button,.service-copy .button{margin-top:20px}
.value-grid,.quote-principles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}
.card{padding:32px;border-radius:28px;min-width:0}
.card-icon{display:flex;width:52px;height:52px;border-radius:15px;background:#fff;align-items:center;justify-content:center;box-shadow:inset 0 2px 2px #fff,0 3px 8px #09090b0c;margin-bottom:28px}
.card h3{font-size:26px;line-height:1.2;font-weight:600;margin:0 0 16px;letter-spacing:-.02em}
.card p{font-size:16px;line-height:1.5;color:#71717a}
.team-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:24px}
.team-card{border-radius:28px;padding:28px;min-width:0}
.team-identity{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:28px}
.team-avatar{display:flex;width:70px;height:70px;border-radius:50%;align-items:center;justify-content:center;font-size:24px;font-weight:600;background:linear-gradient(160deg,#fff,#d6d6da);box-shadow:inset 0 3px 3px #fff,0 5px 12px #09090b0a}
.team-index{font-size:12px;color:#a1a1aa}
.team-card h3{font-size:23px;font-weight:600;margin:0 0 8px}
.team-role,.team-specialty{display:block;font-size:14px;color:#71717a;line-height:1.5}
.team-specialty{font-size:12px;margin-top:6px}
.team-card p{font-size:14px;color:#71717a;line-height:1.6;margin-top:20px}
.timeline-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:32px}
.timeline-card{min-width:0;border-top:1px solid #c8c8ce;padding-top:24px}
.timeline-year{font-size:48px;font-weight:600;letter-spacing:-.03em}
.timeline-card h3{font-size:24px;line-height:1.2;margin:24px 0 16px}
.timeline-card p{color:#71717a;line-height:1.6;font-size:14px}
.inner-process{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:24px}
.process-card{padding:28px;border-radius:28px;min-width:0}
.step-number{font-size:42px;font-weight:600;color:#a1a1aa}
.process-card h3{font-size:23px;margin:32px 0 16px;line-height:1.2}
.process-card p{color:#71717a;line-height:1.6;font-size:15px}
.quote-principles,.service-working-notes{margin-top:32px}
.grid-two{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}
.feature-list{list-style:none;margin:20px 0 0;padding:0;display:grid;gap:14px}
.feature-list li{display:flex;align-items:flex-start;gap:10px;line-height:1.5;color:#71717a;font-size:15px}
.feature-list .icon{flex:none;width:18px;height:18px;color:#09090b;margin-top:3px}
.eyebrow{display:block;font-size:12px;letter-spacing:.06em;font-weight:600;line-height:1.5;color:#71717a}
/* The five signature systems */
.service-jump-links{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}
.service-jump-links>a{display:flex;align-items:flex-start;gap:12px;border-radius:22px;background:#edecec;padding:20px;min-width:0;transition:background .2s,transform .2s}
.service-jump-links>a:hover{background:#e2e2e4;transform:translateY(-3px)}
.service-jump-links>a>.icon{flex:none;width:20px;height:20px}
.service-jump-links>a>.icon:last-child{display:none}
.service-jump-links strong,.service-jump-links small{display:block}
.service-jump-links strong{font-size:18px;font-weight:600;margin-bottom:8px}
.service-jump-links small{font-size:12px;color:#71717a;line-height:1.4}
.service-scope-note{max-width:760px;margin:28px auto 0;text-align:center;color:#71717a;line-height:1.6}
.service-copy .service-tagline{font-size:24px;line-height:1.35;color:#09090b}
.service-detail-top.split-reverse>.service-copy{order:2}
.service-system-preview{position:relative;overflow:hidden;min-height:480px;border-radius:32px;background:#edecec;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:48px 30px}
.system-preview-halo{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 15%,#fff,transparent 65%);pointer-events:none}
.system-preview-symbol{position:relative;z-index:1;width:66px;height:66px;border-radius:20px;background:linear-gradient(150deg,#fff,#d4d4d8);box-shadow:inset 0 2px 2px #fff,0 12px 30px #09090b10;display:grid;place-items:center;transform:rotate(-12deg);margin-bottom:32px}
.system-preview-symbol .icon{width:30px;height:30px}
.system-preview-window{position:relative;z-index:1;max-width:400px;width:100%;background:#fafafa;border:1px solid #fff;border-radius:20px;box-shadow:0 24px 48px #09090b10;transform:rotate(2deg)}
.system-window-bar{display:flex;align-items:center;gap:5px;padding:16px;border-bottom:1px solid #eee}
.system-window-bar>span{width:5px;height:5px;border-radius:50%;background:#a1a1aa}
.system-window-bar>small{font-size:9px;letter-spacing:.1em;margin-left:auto;color:#71717a}
.system-window-content{padding:24px 20px}
.system-window-content>.eyebrow{margin-bottom:20px}
.system-preview-row{display:flex;align-items:center;gap:10px;padding:14px 0;border-top:1px solid #e4e4e7;font-size:12px;line-height:1.5}
.system-preview-node{display:grid;place-items:center;width:26px;height:26px;flex:none;border-radius:8px;background:#edecec}
.system-preview-node>.icon{width:15px;height:15px}
.system-preview-row>i{margin-left:auto;width:5px;height:5px;border-radius:50%;background:#ff3b26;flex:none}
.system-preview-status{display:flex;gap:8px;font-size:10px;line-height:1.4;color:#71717a;margin-top:18px}
.system-preview-status>.icon{width:14px;height:14px;flex:none}
.system-preview-caption{position:relative;font-size:9px;letter-spacing:.12em;color:#71717a;margin-top:28px}
.signature-feature{display:grid;grid-template-columns:1fr 1fr;gap:64px;border-radius:32px;padding:40px;margin-top:48px}
.signature-copy h3{font-size:38px;line-height:1.15;font-weight:600;letter-spacing:-.025em;margin:24px 0 20px}
.signature-copy p{color:#71717a;line-height:1.6}
.signature-example{margin-top:26px;padding-top:24px;border-top:1px solid #d4d4d8}
.signature-example p{font-size:14px;margin-top:10px}
.signature-steps{list-style:none;padding:0;margin:0;display:grid;gap:24px}
.signature-steps li{display:flex;align-items:flex-start;gap:20px}
.signature-step-number{width:40px;height:40px;display:grid;place-items:center;background:#fff;border-radius:12px;flex:none;font-size:14px}
.signature-steps h4{font-size:20px;font-weight:600;margin:0 0 8px}
.signature-steps p{color:#71717a;font-size:14px;line-height:1.6;margin:0}
.service-detail-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:32px;margin-top:40px}
.service-detail-cell{padding-top:24px;border-top:1px solid #d4d4d8}
/* ROI, inquiry, and filters preserve the existing behavior contracts. */
.roi-panel{border-radius:32px;padding:40px}
.roi-controls{display:grid;grid-template-columns:1fr 1fr;gap:48px}
.roi-control{display:grid;gap:20px}
.roi-control>span{font-size:12px;color:#71717a;letter-spacing:.05em}
.roi-control output{font-size:28px;font-weight:600}
.roi-control input{width:100%;accent-color:#ff3b26}
.roi-results{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:40px;padding-top:32px;border-top:1px solid #d4d4d8}
.roi-results strong,.roi-results span{display:block}
.roi-results strong{font-size:36px;font-weight:600;letter-spacing:-.02em;margin-bottom:12px}
.roi-results span{color:#71717a;font-size:13px;line-height:1.5}
.case-filters{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:48px}
.filter-button{padding:12px 22px;border:1px solid #d4d4d8;border-radius:100px;background:#edecec;color:#71717a;font:inherit;font-size:14px;cursor:pointer}
.filter-button.active{background:#09090b;border-color:#09090b;color:#fff}
.filter-result{text-align:center;font-size:13px;color:#71717a;margin-top:28px}
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start}
.contact-copy h2{font-size:clamp(36px,4vw,56px);font-weight:600;line-height:1.1;letter-spacing:-.03em;margin:24px 0}
.contact-copy>p{color:#71717a;line-height:1.6}
.contact-details{display:grid;gap:24px;margin-top:36px}
.contact-detail{display:flex;align-items:center;gap:18px}
.contact-detail>.icon{width:22px;height:22px;flex:none}
.contact-detail span{display:block;font-size:10px;letter-spacing:.08em;color:#71717a;margin-bottom:6px}
.contact-detail strong{font-size:17px;font-weight:500}
.contact-promise{display:flex;gap:16px;padding:24px;border-radius:22px;margin-top:32px}
.contact-promise>.icon{flex:none}
.contact-promise p{color:#71717a;font-size:14px;line-height:1.5;margin:0}
.audit-inclusions{margin-top:32px}
/* The six reference-composition detail pages */
.case-hero{padding:16px 16px 0}
.case-hero-panel{position:relative;max-width:1440px;height:959px;border-radius:40px;margin:auto;background:#edecec url('/assets/agen/hero-background.jpg') center/cover no-repeat;padding:180px 24px 0}
.case-hero-copy{text-align:center;position:relative;z-index:1;margin:auto;max-width:1260px}
.case-hero-copy h1{font-size:clamp(64px,6.667vw,96px);font-weight:600;line-height:1;letter-spacing:-.03em;margin:24px 0}
.case-hero-copy h1>span{display:block}
.case-hero-copy h1>.case-title-second{display:flex;align-items:center;justify-content:center;gap:18px;margin-top:12px}
.case-title-second>span:last-child{max-width:900px;min-width:0}
.case-title-second .hero-mark{flex:none}
.case-hero-copy>p{font-size:16px;line-height:24px;color:#71717a;max-width:640px;margin:24px auto}
.back-link{display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:600}
.back-link>.icon{width:18px;height:18px}
.case-cover{position:absolute;z-index:2;top:630px;left:72px;right:72px;padding:10px;margin:0;background:#f4f4f5;border-radius:32px;box-shadow:0 3px 3px #0000001a,0 7.77px 2.21px #0000000f,inset 0 4px #fff9,inset 0 -8px #eaeaea}
.case-cover-inner{width:100%;height:660px;border-radius:24px;overflow:hidden}
.case-cover img{width:100%;height:100%;object-fit:cover;display:block}
.case-project-content{position:relative}
.case-project-content>.case-narrative{max-width:1440px;padding:465px 72px 120px;display:flex;flex-direction:column;gap:32px}
.case-narrative-section{width:100%;padding-top:28px;min-width:0}
.case-narrative-section:first-child{padding-top:0}
.case-narrative h2{font-size:48px;font-weight:600;line-height:56px;letter-spacing:-.02em;margin:0 0 20px}
.case-narrative p{font-size:16px;line-height:24px;color:#71717a;margin:0 0 20px;font-weight:500}
.case-project-meta{display:grid;grid-template-columns:68% 1fr;gap:0;margin-top:32px;padding-bottom:30px}
.case-project-meta .eyebrow{margin-bottom:15px}
.deliverable-pills{display:flex;flex-wrap:wrap;gap:8px;padding-right:24px}
.deliverable-pills>span{border-radius:100px;background:#edecec;padding:8px 15px;font-size:14px;font-weight:500;line-height:1.4}
.case-project-media{border-radius:32px;padding:12px;margin:0;background:#f4f4f5;box-shadow:0 3px 3px #0000001a,inset 0 4px #fff9,inset 0 -8px #eaeaea}
.case-project-media img{width:100%;height:660px;object-fit:cover;border-radius:24px;display:block}
.case-requirements{border-top:1px solid #d4d4d8;margin-top:24px;padding-top:24px}
.case-requirements h3{font-size:23px;font-weight:600;margin:0 0 16px}
.case-results-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:28px}
.case-results-grid>.stat-item{text-align:left;padding:28px;border-radius:24px;background:#edecec}
.case-results-grid strong{font-size:44px}
.case-detail-gallery{display:grid;grid-template-columns:1fr 1fr;gap:24px;padding-top:28px}
.case-gallery-art{margin:0;padding:10px;border-radius:28px;min-width:0;background:#f4f4f5}
.case-gallery-art img{display:block;width:100%;height:420px;object-fit:cover;border-radius:20px}
.next-project-section{background:#edecec}
.case-grid-single{grid-template-columns:1fr}
/* All inner testimonial bands match the black reference gallery. */
.inner-testimonials{margin:0 16px;background:#000;color:#fff;border-radius:50px;padding:120px 56px 62px}
.inner-testimonials .section-heading p{color:#a1a1aa}
.inner-testimonials .section-tag{background:#202020;color:#fff}
.inner-testimonial-shell{position:relative}
.inner-testimonial-track{display:flex;gap:0;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}
.inner-testimonial-track::-webkit-scrollbar{display:none}
.inner-testimonial-slide{flex:0 0 100%;min-width:0;display:grid;grid-template-columns:1fr 1fr;gap:64px;scroll-snap-align:start}
.inner-testimonial-art{border-radius:32px;overflow:hidden;padding:10px;background:linear-gradient(160deg,#3d3d3d,#181818);box-shadow:inset 0 2px 2px #ffffff26}
.inner-testimonial-art img{width:100%;height:100%;min-height:430px;max-height:520px;object-fit:cover;display:block;border-radius:24px}
.inner-testimonial-copy{padding:20px 0 80px;display:flex;flex-direction:column;align-items:flex-start;min-width:0}
.inner-quote-mark{font-size:100px;line-height:80px;color:#ff3b26;font-family:Georgia,serif}
.inner-testimonial-copy blockquote{font-size:clamp(22px,2.1vw,30px);line-height:1.3;letter-spacing:-.015em;margin:12px 0 32px;flex:1}
.quote-author{display:flex;align-items:center;gap:14px}
.initial-avatar{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:#2a2a2a;font-size:13px;flex:none}
.quote-author strong,.quote-author span{display:block;font-size:15px;line-height:1.5}
.quote-author div>span{font-size:13px;color:#a1a1aa}
.inner-quote-count{margin-top:28px;font-size:24px;font-weight:500}
.inner-quote-count>span{font-size:16px;color:#71717a}
.inner-testimonial-controls{position:absolute;bottom:14px;right:0;display:flex;gap:12px}
.inner-testimonial-controls .circle-button{width:54px;height:54px;border:1px solid #3f3f46;border-radius:50%;background:#18181b;color:#fff;display:grid;place-items:center;cursor:pointer;transition:transform .15s}
.inner-testimonial-controls .circle-button:active{transform:scale(.9)}
.inner-testimonial-controls .circle-button:disabled{opacity:.35;cursor:default}
.inner-testimonial-controls [data-carousel-prev]>.icon{transform:rotate(180deg)}
/* Journals and policy extensions */
.article-cover{height:440px;border-radius:32px;background:#edecec url('/assets/agen/hero-background.jpg') center/cover no-repeat;display:grid;place-items:center;position:relative;margin-top:32px;overflow:hidden}
.article-cover-pattern{transform:scale(1.7)}
.article-cover-label{position:absolute;bottom:28px;left:32px;font-size:12px;letter-spacing:.08em}
.article-body{max-width:840px;margin:64px auto 0}
.prose h2{font-size:32px;font-weight:600;letter-spacing:-.02em;line-height:1.2;margin:44px 0 20px}
.prose p{color:#71717a;line-height:1.75;font-size:16px;margin:0 0 24px}
.prose .article-intro{font-size:22px;line-height:1.6;color:#09090b}
.article-audit{margin-top:44px;padding:32px;border-radius:24px}
.article-audit h3{font-size:26px;margin:0 0 16px}
.legal-content{padding:48px;border-radius:32px;max-width:900px;margin:auto}
.legal-content h2:first-child{margin-top:0}
@media(max-width:1439px){
 .team-grid,.timeline-grid,.inner-process{grid-template-columns:repeat(2,minmax(0,1fr))}
 .service-jump-links{grid-template-columns:repeat(3,minmax(0,1fr))}
 .about-inner-grid,.service-detail-top,.contact-grid,.signature-feature{gap:36px}
 .case-hero-panel{height:937px}
 .case-cover{top:580px;left:12px;right:12px}
 .case-cover-inner,.case-project-media img{height:auto;aspect-ratio:1272/660}
 .case-project-content>.case-narrative{padding:144px 12px 120px}
 .case-narrative h2{font-size:42px;line-height:50px}
 .inner-testimonials{padding:120px 12px 60px;border-radius:40px}
 .inner-testimonial-slide{gap:36px}
}
@media(max-width:809px){
 .value-grid,.quote-principles{grid-template-columns:repeat(2,minmax(0,1fr))}
 .about-inner-grid,.service-detail-top,.contact-grid,.signature-feature{grid-template-columns:1fr;gap:32px}
 .service-detail-top.split-reverse>.service-copy{order:0}
 .about-inner-art{min-height:400px}
 .service-system-preview{min-height:420px}
 .signature-feature{padding:28px}
 .service-detail-grid{grid-template-columns:1fr;gap:24px}
 .service-jump-links{grid-template-columns:repeat(2,minmax(0,1fr))}
 .case-hero-panel{min-height:640px;height:auto;padding:120px 16px 0;border-radius:32px}
 .case-hero-copy h1{font-size:32px;line-height:40px;letter-spacing:-.96px}
 .case-hero-copy h1>.case-title-second{flex-direction:column;gap:16px;margin-top:12px}
 .case-cover{position:relative;inset:auto;margin:48px -4px -100px;padding:8px;border-radius:20px}
 .case-cover-inner{border-radius:12px}
 .case-project-content>.case-narrative{padding:167px 12px 50px;gap:24px}
 .case-narrative h2{font-size:26px;line-height:34px;letter-spacing:-.52px}
 .case-narrative-section{padding-top:13px}
 .case-project-meta{grid-template-columns:1fr;gap:20px;padding-bottom:13px}
 .case-project-media{padding:8px;border-radius:20px}
 .case-project-media img{border-radius:12px}
 .case-results-grid{grid-template-columns:1fr}
 .case-detail-gallery{grid-template-columns:1fr;padding-top:13px}
 .case-gallery-art img{height:auto;aspect-ratio:4/3}
 .inner-testimonials{padding:64px 12px 50px;margin:0 12px}
 .inner-testimonial-slide{grid-template-columns:1fr;gap:28px}
 .inner-testimonial-art img{min-height:0;height:auto;aspect-ratio:1.2;max-height:400px}
 .inner-testimonial-copy{padding:0 8px 72px}
 .inner-testimonial-controls{bottom:12px;right:8px}
 .inner-testimonial-controls .circle-button{width:44px;height:44px}
 .next-project-section{padding:50px 0}
 .article-cover{height:300px}
 .article-cover-pattern{transform:scale(1.2)}
 .legal-content{padding:28px}
}
@media(max-width:560px){
 .inner-stats{grid-template-columns:repeat(2,minmax(0,1fr));gap:28px;padding:24px 0}
 .value-grid,.quote-principles,.team-grid,.timeline-grid,.inner-process,.grid-two{grid-template-columns:1fr}
 .service-jump-links{grid-template-columns:1fr}
 .service-jump-links>a{align-items:center}
 .service-jump-links>a>.icon:last-child{display:block;margin-left:auto}
 .service-jump-links small{margin:0}
 .service-jump-links strong{margin-bottom:3px}
 .service-system-preview{padding:36px 18px;min-height:380px}
 .system-window-content{padding:20px 16px}
 .signature-copy h3{font-size:30px}
 .signature-steps li{gap:14px}
 .signature-feature{padding:24px}
 .roi-panel{padding:24px}
 .roi-controls,.roi-results{grid-template-columns:1fr;gap:28px}
 .roi-results strong{font-size:34px}
 .contact-detail strong{font-size:15px;overflow-wrap:anywhere}
 .about-inner-art{min-height:320px}
 .about-art-caption{left:24px;bottom:24px}
 .article-cover-label{left:24px;font-size:10px}
 .article-body{margin-top:40px}
 .article-audit{padding:24px}
 .prose h2{font-size:27px}
 .prose .article-intro{font-size:19px}
 .case-filters{gap:7px;margin-bottom:32px}
 .filter-button{padding:10px 16px;font-size:12px}
}
```

Verification performed by this agent: `node --check pages.mjs` passes. Root still must run its integrated build and browser visual/interaction checks once shared helpers/CSS/runtime are complete. No browser or external mutation performed by this agent.
