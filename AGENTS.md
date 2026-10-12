# Future work in Zykken New

## October 12 About page correction

The user explicitly requested removing the About page's team/names section too, fixing its empty-looking dark panel, checking the page and publishing. `aboutPage()` no longer renders teamCards or a Meet the Team CTA. Its hero and approach headings now describe the business rather than introduce the people. The original nearly blank globe image is replaced with the native `dottedGlobe()` component and a three-step Enquiry → Decision → Action line. About-specific styles live in `assets/ui/home-refinement.css`; preserve the visible graphic, readable labels, responsive geometry and original client quotations/metrics. Do not restore the removed About team section. Read `docs/ABOUT_REFINEMENT_2026-10-12.md` for completed checks and recovery.

## October 12 legal and policy pages

The user's latest request explicitly authorizes adding the relevant website policies and pushing them to `main`. `legal-data.mjs` holds Privacy, Terms & Conditions, Cookie & Storage, Cancellation & Refund, and Website & AI Disclaimer content. `legal-pages.mjs` renders these body-only pages; `assets/ui/legal.css` loads last. The user then clarified that policy links must appear only in the footer, opening their individual pages. There is no policy hub, policy entry in the main navigation or related-policy directory. The old `/legal` URL redirects to `/privacy`. The site now has 32 public routes plus 404. Each footer links directly to all five policies above the wordmark. Contact forms retain a plain-language purpose notice without a separate policy link, additional consent fields or an API change. The copy must match actual site behavior: Resend enquiry delivery, Vercel hosting and the greeting's `zykken_greeting_boot_v3` sessionStorage preference. Do not invent a registered entity, address, jurisdiction, fixed retention period, refund percentage or compliance certification. Project agreements define the paid engagement and mandatory legal rights remain intact. Read `docs/LEGAL_POLICIES_2026-10-12.md` for sources, completed checks and business details that still need confirmation.

## October 12 Windows homepage refinement

The current workspace is the Windows export at `C:/Users/GIGABYTE/Downloads/nexoria-main (1)/nexoria-main`, with no Git metadata. Earlier Linux checkout paths below are historical. The user requested a wider homepage hero; a concise visual process/benefits overview; systems placed directly on the background; removal of the homepage team section; larger outcomes; clearer delivery standards; more FAQs; and the large footer wordmark below all links. `homepage-visuals.mjs` and the last-loaded `assets/ui/home-refinement.css` implement these updates. Shared `homeProcess()` and `systemsShowcase()` delegate to the new visuals, while detailed Process and Benefits artifacts remain available. Preserve the original hero headline, logos, art and cascade. The homepage team section and shared navigation/footer team links are removed; deeper About/Team pages are retained. The footer wordmark uses normal flow, sufficient line height and spacing, never an absolute background behind links. Read `docs/HOME_REFINEMENT_2026-10-12.md` for checks and the Windows recovery checkpoint. On October 12, the user explicitly authorized pushing these changes to `main`. The current publication checkout is `C:/Users/GIGABYTE/Downloads/nexoria-main (1)/nexoria-publish-2026-10-12`; the verified preceding main commit is `52394556a07b4ea7213145dc7926c35042a0cd7e`. Use that Git checkout for publication while retaining the source preview and local proof in this export.

This is the authorized redesign workspace: `/home/uttkarsh/Downloads/Zykken New`. The user explicitly asked to preserve the original and work separately. Keep `/home/uttkarsh/Downloads/nexoria-main` and `/home/uttkarsh/Downloads/Zykken Checkpoint 2026-10-08` unchanged unless the user requests otherwise.

The repository checkout for publication is `/home/uttkarsh/Downloads/Zykken GitHub`, with origin `https://github.com/DEVuttkarsh12/nexoria.git`. On October 9, the user authorized replacing the old website in that repository and pushing the verified redesign to its default branch, `main`. Use that checkout for Git operations; the separate `Zykken New` folder is the local preview/source copy.

## Context to preserve

- Correct brand: **Zykken**, explicitly confirmed by the user. Initial speech said “Zycon”; existing archive filenames may retain that spelling.
- Existing domain: `zykken.com`, live at `https://www.zykken.com/`.
- Existing mailbox and fixed contact recipient: `info@zykken.com`. Do not invent or silently substitute an email, domain, address, phone or social account.
- Current visual reference: `https://agen-ai.framer.website/`, explicitly replacing Axonix on October 9, 2026. Recreate the chrome/orange hero, floating tool tiles, raised light surfaces, editorial work cards, process/metric/testimonial slides and spotlight dark sections. The template has one home page and four work details; Zykken now has 29 public native routes with that design language. Keep its actual business content and original logo.
- Five services, six case studies and existing client/team identities are preserved. On October 9, 2026, the user explicitly removed all fixed packages and published price tiers: **every service and ongoing support are custom-quoted**. Do not restore old pricing cards, package selectors, monthly tiers or Pricing navigation. Historical offers remain only in the original audit records.
- Original claims and testimonials are supplied website content, not independently audited evidence. Do not fabricate new results, client photos or verification claims.

Read `README.md`, `docs/ORIGINAL_SITE_CONTEXT.md`, `docs/AGEN_REFERENCE.md`, `docs/AGEN_INNER_REFERENCE.md` and the latest verification report before substantial work. `docs/original-content.json` is the original structured content record; `content.mjs` is the current rendering data. The original contact setup notes remain in `docs/CONTACT_SETUP.md` and describe the older preview port.

## Implementation contracts

- The main website is dependency-free pre-rendered HTML with progressive enhancement, not a React, Next.js or Framer application.
- `layout.mjs` owns the complete HTML document and shared UI helpers. `home.mjs` and `pages.mjs` return **body-only markup**. Do not nest documents or duplicate shared card implementations.
- Shared case and insight cards are exported from `home.mjs`. Keep homepage and inner-page card styling consistent.
- Edit source modules and `site.css`, not `dist/`. `scripts/build.cjs` recreates `dist/` with 30 pages (29 public routes and 404) and copies local assets.
- Routes and aliases live in `scripts/build.cjs`; production clean URLs/detail rewrites live in `vercel.json`. Keep both consistent.
- Use optimized `assets/agen/optimized/` artwork. Originals and exact provenance are retained in `assets/agen/provenance.json` and `docs/agen-reference/optimized-assets.json`. `projectVisual(c)` in `project-visuals.mjs` returns contextual native markup for cards and detail covers, explicitly labeled conceptual illustration. The old caseVisual image mapping is retired. The build copies only assets referenced by generated HTML and CSS; retain research sources outside production output.
- Preserve service anchors `#automation`, `#voice`, `#web`, `#software`, `#crm`; inquiry anchor `#start`; and About testimonials anchor `#voices`. Custom proposals use `/custom-quote`; legacy `/pricing` and `/pricing.html` resolve there.
- Keep content readable without JavaScript. FAQs are native `details`/`summary`; reveals are enhancement-only. Honor reduced motion and maintain keyboard access.
- The old multilingual greeting loader is restored with a white grain theme. Its markup and fail-open bootstrap are shared in `layout.mjs`, behavior is in `app.mjs`, and styling is in `site.css`. Preserve Skip/Escape, reduced-motion bypass, shorter repeat visits, focus/inert restoration and the independent timeout. Read `docs/GREETING_LOADER.md` before changing it.
- The current service catalog is in `offers.mjs`: Flowback, Carryline, IntentPath, PreviewOps and PledgeDesk. Keep the plain-language categories and concrete signature features with these names across home, services, forms and footer. `docs/SIGNATURE_SYSTEMS.md` explains their custom-build scope; do not advertise the illustrated client systems as live SaaS products or invent exclusivity/client results. Preserve the existing API values and fragment IDs.

## Contact contract

Preserve `/api/contact` and its validated fields: `name`, `email`, optional `phone`, `need` (`automation`, `website`, `voice`, `software`, `crm`), optional `message`, and hidden honeypot `company_site`. Never show success until the provider accepts a message. Preserve entered values on failure and provide a direct email alternative.

`RESEND_API_KEY` and `RESEND_FROM_EMAIL` are server-only configuration. No credentials should enter source, client modules, build output or logs. Keep local environment files untracked. Use mocked tests for routine verification; do not send real production inquiries as a side effect of checking the site. No booking/calendar service is currently connected; consultation CTAs lead to the audit form.

## Verification and resume

- Preview: `npm run dev` at `http://127.0.0.1:4180`.
- Build: `npm run build`.
- Relevant tests: `npm test`.
- For source/template visual work, compare actual rendered pages at desktop, tablet and phone widths. Check page overflow, navigation, card layout, artwork sizing, filters, ROI, loader behavior and form errors. Report checks actually performed.
- The current Agen checks are recorded in `docs/AGEN_VERIFICATION.md`: 19 generated pages, seventeen passing tests, all 19 routes checked at 320, 390, 768, 1024 and 1440 CSS pixels, actual slider/form/FAQ/navigation/ROI checks and tablet cover spacing corrections. Older reports describe earlier versions. Real email delivery remains untested.
- Keep a recoverable checkpoint before broad future visual changes. The user has explicitly authorized this Agen redesign and a push to main for the existing automatic Vercel deployment; no additional release approval is required. Do not alter mail routing or domain configuration without a request. Pre-Agen recovery: `/home/uttkarsh/Downloads/Zykken Before AgenAI 2026-10-09.tar.gz`.

## October 10 visual refinements

The user requested a modestly wider hero and clearer About, process, benefits, features, team, testimonial and footer components. The homepage hero is now max1560px. `polish-visuals.mjs` renders the dotted globe, delivery diagrams, benefit consoles and testimonial emblems; `team-visuals.mjs` renders role-specific workbenches. All graphics are native, pre-rendered and decorative. The four supplied team identities and original client quotations/results remain unchanged. Do not replace conceptual visuals with unverified portrait photos.

Process stage buttons use `data-slide-to` and the shared slider runtime updates `aria-current`; maintain slide widths equal to the track width. The feature hub stays visible on phones and tablets, with CSS connectors adapting to stacked cards. CSS for the new components lives in the October 10 refinement block in `site.css`, followed by the scoped `tw-*` workbench rules. The shared footer has a direct email link, compact destination cards and a smaller gap; the floating back-to-top control hides when the footer is visible.

Read `docs/POLISH_VERIFICATION_2026-10-10.md` for the latest verification. Recovery checkpoint: `/home/uttkarsh/Downloads/Zykken Before Polish 2026-10-10.tar.gz`.

## October 10 multipage and readability expansion

The homepage is a complete overview; its cards and section CTAs lead to detail pages. The shared navigation uses actual page URLs, six primary destinations, a native More disclosure and a footer directory. Header mobile navigation switches below 1100px; keep this CSS boundary consistent with setupNavigation. Every Back To Top link uses the current document's #top anchor.

`topic-pages.mjs` owns six body-only pages: /process, /benefits, /features, /team, /testimonials and /faq. Features includes #integrations and #ownership. `service-pages.mjs` exports serviceDetailPage and serviceDetailRoutes for /services/{flowback,carryline,intentpath,previewops,pledgedesk}. All styles live in site.css. Do not restore the former /features redirect/alias to /services. Service details use the production /services/:slug -> /services/:slug/index rewrite. Keep publicRoutes, sitemap and the build output consistent.

The active team export normalizes biographies around agreed scope and support while preserving the four supplied identities. The original archived content remains unchanged. Supporting visible text is at least 14px; descriptive copy generally uses 16–18px. Keep the larger native labels readable without shrinking them to fit; adjust geometry or simplify redundant decorations instead.

Read docs/MULTIPAGE_VERIFICATION_2026-10-10.md before further changes. The 22 tests include all 29 routes, canonicals, unique IDs, every internal link/fragment, discoverability from the homepage and unknown-route 404s. Responsive proof covers all 30 rendered pages at 320/390/768/1024/1440px. Recovery checkpoint: /home/uttkarsh/Downloads/Zykken Before Multipage 2026-10-10.tar.gz.

## October 11 page structure refinements

All six project details now use normal document flow through the shared `caseStudyPage` renderer: breadcrumb, separate client title and project deck, three labeled facts, a contained conceptual illustration, and numbered challenge/solution/results sections. They finish with the current client's quotation, a next-project card and the custom-project CTA. The former absolute cover, inline headline capsule and manual cover spacer are retired. Keep hero, story and related-project gutters aligned, and preserve each case's exact source problem, build, results and quotation.

Project layout styles use `project-*` selectors. The hero stacks below 900px; result cards stack below 700px; narrow-phone facts become labeled rows. Supporting text remains at least 14px. Shared inner heroes and article openings are content-driven; articles lead directly into their readable body without a second decorative cover. Tablet insight/service/quote cards have wider columns.

Recovery checkpoint: `/home/uttkarsh/Downloads/Zykken Before Page Structure 2026-10-11.tar.gz` (source at d7eab20). Read `docs/PAGE_STRUCTURE_VERIFICATION_2026-10-11.md` for checks and any pending browser verification before further layout work.

## October 11 supplied transparent logos

The navbar and greeting loader use the user's exact transparent PNGs through the shared `brand()` helper: `assets/zykken-monogram-transparent.png` and `assets/zykken-wordmark-transparent.png`. Keep their source bytes unchanged. `site.css` frames the visible artwork with overflow-hidden wrappers and proportional offsets, so the large transparent source margins do not shrink the displayed logo. The base widths are 34px/100px, with 32px/96px at 810–1199px. Do not restore the old JPEG backgrounds, wordmark inversion or multiply blend. Existing loader behavior is preserved. Read `docs/BRAND_VERIFICATION_2026-10-11.md` for checks and provenance.

## October 11 hero headline and falling tools

The user requested the original homepage headline: **Build AI systems that print revenue fast.** It is restored exactly in `home.mjs`; current supporting copy and custom-quote CTAs remain. The user's latest animation request supersedes the reference's clipped floating cards: the shared `heroMark()` now uses authentic n8n, Make and Zapier SVGs from `assets/tools/`, and the cards visibly fall below the red capsule, fade out and reset invisibly. Source provenance and the upstream CC0 license are retained beside these assets. Do not identify the older generically named Framer SVGs as genuine OpenAI/Claude/Gemini icons.

The native CSS animation is `hero-tool-drop`, now1.8 seconds with two staggered triplets0.9 seconds apart. Keep capsule overflow visible, enough clear space for the drop trajectory, an invisible reset, and three still visible cards for reduced motion. Hero typography and capsule wrapping adapt to the longer original headline. Read `docs/HERO_VERIFICATION_2026-10-11.md` for actual checks and any pending browser verification.

## October 11 editorial refinement

The latest user request supersedes the older process/workbench/hub artwork. `delivery-visuals.mjs` now renders the static three-stage roadmap, benefit artifacts and five-system architecture; preserve Process anchors #map/#prove/#launch, Benefits #outcomes/#checks/#control/#experience and Features #ownership/#integrations. The homepage process is fully visible rather than a slider. Service illustrations, statistics and testimonials still use the existing slider runtime.

`project-visuals.mjs` renders six distinct conceptual illustrations tied to each supplied case. Shared caseCard and caseStudyPage use it on home, Work, details and next-project cards. Do not restore the former abstract work images or fixed aspect ratio around these content-driven illustrations. Narrow logistics illustrations stack below290px container width. Preserve explicit conceptual labels and source results outside the art.

`people-visuals.mjs` supplies the shared team grid and client identity panels. Keep the four supplied identities/biographies and original six quotations/results. Replace old art wrappers rather than nesting these complete components in them. New CSS uses px-*, ds-* and pe-* prefixes.

The hero emission plane clips above the capsule: tools begin inside and fall out of its bottom, with an invisible reset and reduced-motion still state. The desktop navigation is920px with balanced spacing; mobile navigation behavior is unchanged. The exact original headline and supplied transparent PNGs remain.

Read `docs/EDITORIAL_VERIFICATION_2026-10-11.md` and its150-check responsive JSON for actual checks. Recovery: `/home/uttkarsh/Downloads/Zykken Before Editorial Refine 2026-10-11.tar.gz`. Live release evidence lives in the Zykken New/docs folder. Continue syncing the two redesign folders without overwriting local-only proof/environment files or changing the original.

## October11 faster capsule cascade

The user reported a horizontal line crossing the falling cards. The thin `.hero-mark::after` lower-edge overlay is removed. `heroToolCards(repeat)` renders two decorative triplets of the same authentic tool assets. The1.8s fall cycle uses primary delays-.12/-.28/-.44s; `.tile-echo` follows0.9s later. This keeps multiple cards flowing out of the capsule together. Preserve the inside origin, unchanged trajectory, invisible reset and emission mask. Hide `.tile-echo` under reduced motion, leaving exactly the three original still cards.

Read `docs/CAPSULE_CASCADE_VERIFICATION_2026-10-11.md`. The previous release is recoverable at Git commit71ec2e0; this is a focused CSS/shared-helper change. New-only native proofs and responsive/release JSON stay in the redesign docs folder.

## October 11 graphite identity and visual explanations

The user's latest correction retains the original flowing shard WebP (`assets/agen/optimized/hero-background.webp`) and rounded hero geometry. Recolor the orange hue light gray using `background-blend-mode: luminosity` over a neutral background; preserve the original responsive cropping and corner radii. The large Z background is removed. The falling-tool capsule is graphite. Shared labels, buttons, borders and surfaces are quieter and neutral. Preserve the supplied transparent logos, original H1 and 1.8-second inside-origin cascade. Apply background blending only to the background so text, logos and authentic tool icons retain their colors.

Shared component styles are linked after site.css in layout.mjs: assets/ui/editorial.css, systems.css, narrative.css and people-editorial.css. The build recursively collects local asset references in those CSS files. Do not use a late CSS @import; it would be ignored. Edit the native source components rather than generated dist files.

`systems-visuals.mjs` exports systemsOperatingSheet() and serviceSpecimen(item). Five native radios inspect one illustrative enquiry through IntentPath, Carryline, PledgeDesk, PreviewOps and Flowback. These are educational scenarios, not live software/telemetry. The same five specimens now appear across Services, service details and Features. Container queries adapt their diagrams when a nested specimen is much narrower than its viewport. Preserve native keyboard selection, hidden inactive panels, all actual service links and ownership.

`narrative-visuals.mjs` exports serviceFlow, integrationRoutes, outcomeComparisons and insightVisual. They replace recycled reference artwork, generic tool tiles and random metric bars. Charts show the exact supplied before/after figures; their labels identify source measures and each pair's scale. The service ROI calculator includes a dynamic 0–120-hour weekly comparison using its existing 80% recovery assumption. Do not introduce invented metrics or trend lines.

Delivery stages include native checkpoint diagrams. Team cards contain discipline-specific vector studies; testimonials use typographic client identity rather than oversized generic badges. Motion pauses offscreen and respects reduced motion. Source biographies, quotations and project results stay unchanged. Legal and FAQ content remains straightforward readable prose.

Recovery: Git commit 059d270 and `/home/uttkarsh/Downloads/Zykken Before Graphite 2026-10-11.tar.gz`. Read docs/GRAPHITE_VERIFICATION_2026-10-11.md for the completed checks and remaining limits.
