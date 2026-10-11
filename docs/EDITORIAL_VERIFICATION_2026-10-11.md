# Editorial refinements — October 11, 2026

## Requested changes and source

The user asked for the hero tools to emerge from inside the capsule, a slightly wider navbar, relevant artwork for every project, and clearer process, benefits, connected-systems, team and testimonial components. This extends the current Agen design with Zykken-specific content. Recovery source is the Git archive at `/home/uttkarsh/Downloads/Zykken Before Editorial Refine 2026-10-11.tar.gz`, from commit `7adf70dc026fcfa17e53970db00191568fc0a285`.

The shared hero now contains a masked emission plane. Cards begin within the red capsule, pass its lower edge, fade below it and reset while invisible. Genuine n8n, Make and Zapier SVGs, the original headline and supplied transparent brand PNGs remain. Reduced motion keeps the three tiles still. Desktop navbar width is 920px with balanced spacing; the existing mobile menu boundary remains below1100px.

`project-visuals.mjs` supplies six separate native compositions: property qualification/viewings, fashion/concierge, training/coach-reviewed plans, bilingual clinic voice reception, logistics document exceptions and home enquiries/CRM. These are conceptual illustrations with explicit labels, not client application screenshots. They replace the repeated abstract art on the homepage, Work, six detail pages and next-project cards. Covers size naturally rather than clipping content to an image aspect ratio. The logistics composition stacks at the smallest container widths.

`delivery-visuals.mjs` supplies a three-stage roadmap with a concrete deliverable and review checkpoint for every stage, balanced benefit artifacts, and a connected-systems architecture containing all five catalog entries and ownership. Home and Services share the roadmap; dedicated Process/Benefits use the same artifact components and preserve their detailed copy and anchors. Features shares the architecture while preserving its signature details, integrations and ownership.

`people-visuals.mjs` supplies a balanced 2×2 team grid, four source biographies and responsibilities, client industry symbols and standalone story cards. Home, About and Team share the people cards. Home and existing inner testimonial carousels keep their runtime behavior while using the same client identity panels. Testimonials preserves all six supplied quotations and all18 result pairs. No generated portraits, invented client logos or new performance claims were added.

## Checks completed before publication

- `npm run build`: 30 documents,29 public routes plus404;29 referenced assets.
- `npm test`: all22 existing tests pass. These cover semantic documents, routes/aliases, links and fragments, custom quoting, carousel/slider behavior, contact validation/provider errors with mocks, ROI and greeting lifecycle.
- `git diff --check`: pass.
- Native Codex browser responsive matrix: all30 documents at320,390,768,1024 and1440px (150 checks). No page overflow, broken loaded images, clipped text in the new components or text below14px in those components. The complete record is `EDITORIAL_RESPONSIVE_2026-10-11.json`.
- Native visual inspection: desktop/phone hero, process, benefits, systems, team and testimonials; all six desktop project compositions; phone fashion cover; dedicated process and client-story cards. Screenshots are saved under `/home/uttkarsh/Downloads/Zykken New/docs/editorial-proof/`.
- Native interaction checks: phone menu opens/closes and navigates Home; Work filtering shows the correct website case; homepage and shared inner testimonial controls advance. Browser console check has no warning/error entries.
- Local HTTP: all29 public HTML responses and4 runtime files match the current build; all29 referenced assets return200; four unknown detail/general routes return404 withnoindex. Evidence: `/home/uttkarsh/Downloads/Zykken New/docs/EDITORIAL_LOCAL_HTTP_2026-10-11.json`. Its commit field is the pre-commit HEAD; local source changes were already built and verified.

Contact delivery and configuration were left as previously verified. No real inquiry was sent during this visual work. Routine tests use a mocked provider. CSS reduced-motion behavior was inspected and existing runtime reduced-motion tests pass; a system-level reduced-motion browser setting was not separately emulated. Responsive evidence uses browser viewport sizes, not a claim to have tested every physical handset.

## Publication evidence

Push the verified source to the existing authorized `main` branch and use its normal GitHub-to-Vercel deployment. Production HTTP and native browser evidence are recorded separately in the redesign workspace after deployment: `EDITORIAL_LIVE_CHECKS_2026-10-11.json` and `EDITORIAL_RELEASE_2026-10-11.md`. Retain the original workspace and the recovery archive.
