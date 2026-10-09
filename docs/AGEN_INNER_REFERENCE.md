# AgenAI inner-page reference audit

Captured October 9, 2026 from [AgenAI](https://agen-ai.framer.website/), the replacement reference supplied by the user. This audit used public HTTP responses, the sitemap, rendered HTML markup, embedded CSS, and the reference's shipped component modules. Browser behavior and final visual similarity are verified separately by the main agent; animation notes below describe authored source settings rather than every frame of observed behavior.

## Actual route inventory

The reference is a **single landing page with four work details**. Its navigation uses `/#home`, `/#about`, `/#services`, `/#works`, `/#pricing`, and `/#contact`; About, Services, Works, Pricing, and Contact are sections, not standalone pages.

| Route | HTTP response | Detail title | Next-project link |
| --- | --- | --- | --- |
| `/` | 200 | Homepage | Four work cards |
| `/work/support-copilot` | 200 | Support Copilot / for SaaS | Underwriting risk copilot |
| `/work/underwriting-risk-copilot` | 200 | Underwriting Risk / Copilot | Support copilot |
| `/work/clinical-note-summarizer` | 200 | Clinical Note / Summarizer | Support copilot |
| `/work/catalog-intelligence-engine` | 200 | Catalog Intelligence / Engine | Support copilot |
| `/about`, `/services`, `/contact` | 404 | Shared designed error page | Back to Home |
| `/privacy`, `/terms`, `/404`, an unknown path | 404 | Same designed error page | Back to Home |

The XML sitemap confirms only the five 200 routes. No separate legal, blog, service detail, or team pages are advertised. Raw captures, extracted text, response statuses, and CSS layout data are saved in `docs/agen-reference/pages/`.

## Work-detail page composition

1. Shared floating frosted pill navigation: logo left, six section links, dark pill CTA right; mobile replaces links with a two-line hamburger. Desktop and tablet links have a thin orange hover underline. Inner-page links point back to homepage sections. Replace template remix CTAs with Zykken's inquiry CTA.
2. Rounded light hero with the same background artwork as the homepage. Centered first headline line; second line combines the rest of the project title with a red capsule containing three gently floating white icon cards. Centered 16px subtitle underneath. The reference mistakenly uses the catalog subtitle on every work detail; preserve each Zykken case's own summary instead.
3. Large landscape project artwork overlapping the hero's bottom edge. A pale shell with inset highlights frames the image. Source names it “Sticky image,” but the CSS positions it **absolute**, rather than sticky; do not infer a sticky scroll behavior from that name.
4. Spacious narrative area: “Project Details,” long-form overview, then horizontal “DELIVERABLES” and “INDUSTRY” blocks. The metadata row follows the overview and is not a sticky sidebar. Deliverables use individual rounded small tags.
5. “Project Research” (the underwriting variant says “Project Requirements”) with two prose paragraphs, followed by “Project Results.”
6. Two-image gallery in a row, stacking on phones. The reference contains mixed generic stock and interface artwork, with some duplicates per responsive variant; duplicates are responsive rendering copies, not additional gallery items.
7. Black rounded testimonial band. Small dark section tag, large white heading, three-slide carousel with an image panel left and quotation/identity panel right, 01 /03 counter and circular arrow controls. Mobile stacks the image and quotation.
8. Light gray “Next Project” section with one shared large work card: image, image-overlay action, dot decoration, then title/description/deliverables/industry metadata below.
9. Shared spacious light footer: large headline, four raised social cards, thin gradient divider, underlined section links, copyright, Back To Top, huge decorative wordmark entering upward behind the footer.

## CSS measurements from the detail source

The CSS has desktop at 1440px and above, tablet 810–1439px, and phone below 810px. Values apply to the original short template titles; longer Zykken copy needs wrapping without viewport overflow.

| Element | Desktop | Tablet | Phone |
| --- | --- | --- | --- |
| Outer hero inset | 16px top/sides | 16px | 16px |
| Hero container | max1440, height959, radius40, padding-top180 | height937 | height640, top120, sides16 |
| Hero H1 | Urbanist600, 96/96px, tracking −2.88px | 82/82px, −1.8px | 32/40px, −.96px |
| Hero title stack | 12px line gap, 24px subtitle gap | same | same, title/icons stack |
| Red capsule | 255×80px, fully rounded | 223×70px | narrow responsive variant |
| Cover frame | absolute top630, shell padding10, radius32 | top580 | top566, artwork radius12 |
| Cover artwork | 1272×660px nominal | responsive width | responsive width |
| Narrative container | max1440, padding465px 72px 120px, gap32 | 144px 12px 120px | 167px 12px 50px |
| Narrative H3 | Urbanist600, 48/56px, −.96px | 42/50px, −.84px | 26/34px, −.52px |
| Body | Urbanist500, 16/24px, gray #71717a, paragraph gap20 | same | same |
| Deliverables/industry | horizontal, first block68% | horizontal | vertical, gap20 |
| Research/results | top28, heading/body gap20 | same | top13 |
| Gallery | two columns, gap24, top28 | same | stacked, top13 |
| Testimonial section | black, radius50, padding120px 56px 62px | radius40, 120px 12px 60px | radius40, 64px 12px 50px |
| Next-project section | #edecec, max1440, padding120px 56px, gap64 | padding60px 12px | padding50px 0, gap24 |
| Footer container | max1440, padding43px 56px 40px, gap165 | sides12, gap125 | sides12, gap60 |

## Animation and interactions from shipped source

- Hero title, title/capsule row, narrative sections: opacity0 and translateY60 to their resting position; spring damping40, stiffness220, mass1, no delay. Several below-fold reveals use a 50% visibility threshold.
- Hero cover frame: opacity0, scale.85 to scale1, same spring; horizontal centering is retained throughout. Details heading/body groups also use y60 entrance rather than arbitrary fade-only animation.
- Capsule: red gradient `#ba1e0d` to `#ff3b26`, deep orange diffuse shadows; three white cards rotate30°, −20°, and19° respectively. Each loops toward y15 with a2s tween, cubic-bezier(.44,0,.56,1), mirror repeat, no repeat delay. This is floating movement, not replacement text/icons.
- Testimonial carousel: autoplay every5s, one slide, directionright, dragging disabled. Motion spring stiffness200/damping40; pauses on hover and when offscreen. No progress dots; visible numeric count and previous/next controls. Arrow buttons54px desktop,52px tablet,44px phone, round; tap scales to.9 over.15s. The image panel has a y60→0 movement and inset bevel.
- Next-project card: dot/footer decoration reveals y60→0, metadata y140→0; spring stiffness350/damping60. Image overlay button has frosted blur44 and pill shape. It appears over the card image along with diagonal blurred shine accents on hover. Card link goes to the next work detail.
- Shared nav underline transitions use a.5s tween cubic-bezier(.12,.23,.5,1). Shared buttons use short spring transitions. Back To Top scrolls to home anchor. The footer wordmark starts translated down240px and enters upward.
- The source's placeholder social links point to platform homepages, and its contact strings are malformed placeholders. Do not copy those into Zykken. Use only the existing verified Zykken destinations or useful internal/email links in the same visual card design.

## Adaptation to Zykken

- The designed404 is intentionally simple: centered “Oops! Page Not Found,” paragraph and dark raised Back to Home pill, then the same footer. Its source labels the section “Benefits”; it contains no404 illustration. Keep one semanticH1 in the custom page even though the reference uses anH2.
- Retain the named catalog: **Flowback, Carryline, IntentPath, PreviewOps, PledgeDesk**, including plain-language categories and signature features. Map the template's service accordion/card treatment onto all five offers; do not silently discard the fifth.
- Retain custom quotes and `/custom-quote`. Adapt the template pricing visual section to a tailored-scope consultation block; the previous user explicitly rejected package cards, published tiers, and Pricing navigation.
- Apply the work-detail composition to all six existing `/case-study/:slug` routes: `luxe-estates`, `velvet-co`, `pulse-fit-os`, `noir-clinic`, `kinetic-logistics`, `hearth-home`. Keep their existing source content/metrics and cycle next-project links through those six. The user requests the reference component artwork; its downloaded work cover images can be used as clearly labeled editorial illustrations, with original case photos preserved in the assets/archive. Do not rename real client work to the template's invented cases or imply reference art shows a Zykken client's interface.
- Preserve current standalone `/about`, `/services`, `/case-studies`, `/custom-quote`, `/contact`, `/blog`, article details, `/privacy-policy`, `/terms`, and404. These are Zykken route/content extensions styled with the new hero, accordion, work-card, prose, dark-band, and footer primitives; the reference offers no direct separate equivalents.
- Keep the shared white grain greeting loader and its Skip/Escape/fail-open behavior. Preserve working `/api/contact`, original fields/API values, and fixed recipient `info@zykken.com`.
- Maintain reduced-motion alternatives, semantic heading order, native readable content with JavaScript unavailable, keyboard controls, mobile menu dismissal, and safe form errors. The reference has duplicate responsive DOM and split H1 elements; custom code should recreate the visual shape with one semantic H1.

## Asset provenance

The homepage and inner hero share `https://framerusercontent.com/images/kfKAzacagS0R7Ij9vT6fmCqUbcI.jpg`. Capsule icon sources are `yfsLT2onNPzdTy6lskdqFZwOeA.svg`, `zhU8cI9xwgR4X1ydqycLzILYMDw.svg`, and `iPJBeCVdtlOOx0RCojmB366vhw.svg` under the same `/images/` host. Shared assets are acquired by the homepage audit agent; this audit does not duplicate them.

Downloaded cover assets are `assets/agen-inner/work-support.svg`, `work-risk.svg`, `work-clinic.png`, and `work-catalog.jpg`, with source URLs, page origins, media types and byte sizes in `assets/agen-inner/provenance.json` and `docs/agen-reference/pages/inner-assets.json`. Native SVG/PNG/JPEG extensions preserve the exact source formats and cropped artwork. They are reference editorial artwork, not Zykken client product screenshots.

The downloaded component modules in `docs/agen-reference/pages/modules/` are audit records only; do not execute, import, or ship the Framer runtime as the custom-code implementation.
