# Zykken New

A custom-coded redesign of Zykken’s AI automation agency website, using the [AgenAI Framer template](https://agen-ai.framer.website/) as the visual reference. The business content, original logo and contact endpoint are retained. This project uses static HTML generated from JavaScript modules; editing Framer is not required.

The user confirmed the brand spelling **Zykken**. The existing domain is **zykken.com**, its live site redirects to **www.zykken.com**, and the confirmed contact mailbox is **info@zykken.com**.

## Preserved original

- Untouched original: `/home/uttkarsh/Downloads/nexoria-main`
- Redesign workspace: `/home/uttkarsh/Downloads/Zykken New`
- Git repository checkout: `/home/uttkarsh/Downloads/Zykken GitHub` (origin `DEVuttkarsh12/nexoria`, branch `main`)
- Recovery checkpoint: `/home/uttkarsh/Downloads/Zykken Checkpoint 2026-10-08`
- Pre-Agen redesign recovery: `/home/uttkarsh/Downloads/Zykken Before AgenAI 2026-10-09.tar.gz`

The checkpoint contains `zycon-original.tar.gz` (the original 41 project files), `sha256-manifest.json`, `original-home.jpg`, `ORIGINAL_SITE_CONTEXT.md` and `RESTORE.md`. It also holds `axonix-reference-capture.tar.gz`, preserving the reference’s source, route captures and downloaded assets. The original archive’s filename reflects the initially spoken brand spelling; its contents are the original Zykken site. Follow the checkpoint’s restore notes to extract into a fresh folder. Keep both the original folder and the archive intact.

The five original content pages, shared CSS/JS, robots file and sitemap were compared byte-for-byte with the live site on October 8, 2026. They matched the downloaded original project.

## Run and build

Use a recent Node.js version with native `fetch`, ES modules and the built-in test runner. No npm packages or framework build dependencies are required.

```bash
cd "/home/uttkarsh/Downloads/Zykken New"
npm run dev
```

Open [http://127.0.0.1:4180](http://127.0.0.1:4180). The development server renders routes from the source modules and serves local assets. `PORT` and `HOST` can override the default loopback address and port. Node’s watch mode restarts the server when imported source modules change. Refresh the browser after source, CSS or asset edits. `npm start` runs the server without watch mode.

```bash
npm run build
npm test
```

The build recreates `dist/` with **30 pre-rendered pages**: fifteen main/topic routes, five service details, six case studies, three insight articles and the 404 page. It also copies browser runtime assets and generates a sitemap and robots file. The contact function remains at the project root in `api/contact.js` for serverless hosting; its source is excluded from the static output. Edit source files rather than generated files in `dist/`. The test suite covers the preserved contact API, inquiry validation, routing aliases and ROI calculation. Provider calls are mocked by the tests.

## Project map

| Source | Purpose |
| --- | --- |
| `content.mjs` | Structured business content, six original cases, custom-quote FAQs, services, team, testimonials and three explanatory insights |
| `offers.mjs` | Active signature systems: Flowback, Carryline, IntentPath, PreviewOps and PledgeDesk |
| `layout.mjs` | Shared document metadata, navigation, footer, icons, buttons, page headings, native FAQs and contact form |
| `home.mjs` | Homepage, custom-quote introduction, shared case and insight cards |
| `pages.mjs` | Body-only render functions for inner pages, case details, articles and legal overviews |
| `topic-pages.mjs` | Detailed process, benefits, features/tools, team, client stories and FAQ pages |
| `service-pages.mjs` | Five dedicated system pages with fit, features, examples, deliverables and operating rules |
| `site.css` | Reference-inspired responsive visual system |
| `app.mjs` | Progressive enhancements: greeting loader, navigation, reveals, carousel, work filters, ROI and form handling |
| `scripts/build.cjs` | Route registry, aliases, document rendering and static generation |
| `scripts/dev-server.cjs` | Local preview and contact API adapter; default port 4180 |
| `api/contact.js` | Preserved Resend email handler |
| `assets/` | Local reference artwork/fonts, original Zykken marks and six original case-photo copies |
| `tests/` | Contact and interaction logic checks |
| `vercel.json` | Build output, clean URLs, route aliases and detail-page rewrites |

Main routes are `/`, `/about`, `/services`, `/process`, `/benefits`, `/features`, `/team`, `/testimonials`, `/faq`, `/work`, `/custom-quote`, `/contact`, `/insights`, `/privacy` and `/terms`. Details use `/services/:slug`, `/case-study/:slug` and `/blog/:slug`. The five service slugs are `flowback`, `carryline`, `intentpath`, `previewops` and `pledgedesk`. `/features` is a real page. Legacy aliases include `/case-study`, `/portfolio` and `/blog`; both old pricing URLs resolve to the custom-quote page. Navigation uses real page destinations, with a native More disclosure and a complete footer directory. The detailed homepage remains an overview with direct links to the relevant pages.

## Content and design context

Start with these durable records before future work:

- `docs/ORIGINAL_SITE_CONTEXT.md`: original architecture, every route, detailed business context, contact contract, source hashes and full visible original text.
- `docs/original-content.json`: extracted original content before the redesign.
- `docs/AGEN_REFERENCE.md` and `docs/AGEN_INNER_REFERENCE.md`: current reference structure, artwork, typography, geometry, animation and breakpoint notes.
- `docs/AGEN_VERIFICATION.md`: current build, responsive browser and interaction checks.
- `docs/REFERENCE_DESIGN.md`: historical Axonix reference capture.
- `docs/reference-assets.json` and `docs/reference-inner-assets.json`: reference asset provenance.
- `docs/CONTACT_SETUP.md`: original contact-delivery setup notes. Its old preview-port and form-location descriptions refer to the original site; use this README for the new preview.
- `docs/VERIFICATION.md`: completed build, browser and interaction checks, remaining configuration and preview screenshots.
- `docs/VERIFICATION_2026-10-09.md`: current custom-quote change and full responsive recheck before repository replacement.
- `docs/GREETING_LOADER.md`: restored white grain greeting intro, behavior, asset provenance and verification.
- `docs/SIGNATURE_SYSTEMS.md`: current named offers, feature blueprints, research and responsive checks.

The current reference replaces the previous Axonix version. Its chrome-and-orange hero, floating tool tiles, accordion services, editorial project cards, three-step process, benefit diagrams, connector hub, spotlight team and slide components are custom-coded with local Urbanist fonts and optimized artwork. Exact reference captures, responsive measurements and animation settings are in `docs/AGEN_REFERENCE.md` and `docs/AGEN_INNER_REFERENCE.md`. Original artwork is retained for provenance; production copies only assets used by the generated pages and CSS. Every service and ongoing support are **custom-quoted**. The user removed published packages, price tiers and Pricing navigation on October 9, 2026. Historical packages in the original context records are archival content; they are not current offers. Team cards use the original names and initials. No template office address, phone number or social profiles were adopted.

Client metrics, testimonials, team biographies and timeline statements came from the existing website. They were **not independently verified** through client dashboards or external evidence. Avoid inventing new proof. Project covers are conceptual editorial illustrations from the template; they are not client interface screenshots. The original industry stock photographs are preserved in source assets. The new insights are original explanatory articles derived from Zykken’s existing service approach.

The Agen adaptation was checked across all 19 routes at 320, 390, 768, 1024 and 1440 CSS pixels. It builds all 19 pages and passes all seventeen automated tests, including greeting deadlines, dismissal, fallback, local artwork and slideshow controls/autoplay pauses. See `docs/AGEN_VERIFICATION.md` for current checks and limits. The reference’s visual system and artwork are reproduced with Zykken’s content; business-specific pages and custom quoting reflect the agency’s offer.

The previous website’s eight-language greeting loader is restored in white with monochrome grain and dark serif lettering. It runs the full sequence on the first visit and a shorter Welcome on subsequent visits within the tab session. Visitors can skip it by button, Escape, or tapping the backdrop after a moment. Reduced motion bypasses it; a separate timeout prevents a failed script or stalled load from trapping the page.

## Contact delivery

Audit forms on `/contact` and `/custom-quote#start` submit to `/api/contact`. Delivery requires server-only `RESEND_API_KEY` and `RESEND_FROM_EMAIL` environment variables, with a sender domain verified in Resend. The recipient remains `info@zykken.com`; the visitor’s email becomes Reply-To. No credentials are committed or required to render the site.

For local delivery, create `.env.local` from `.env.example`, add your own authorized configuration, and run:

```bash
node --env-file=.env.local scripts/dev-server.cjs
```

Keep the file untracked. Never place keys in browser code, generated HTML or asset files. Without configured credentials, the endpoint reports unavailable and offers direct email; it does not simulate successful delivery. Test requests mock the provider and do not send real messages.

“Book a Free Audit” and consultation CTAs lead to the inquiry form. **No calendar-booking integration is configured.** Adding one requires a real business booking URL or service configuration.

The user authorized pushing this redesign to `DEVuttkarsh12/nexoria` on `main`, using the existing automatic Vercel production deployment. No domain or mail configuration changes are part of that request.

### October 10 visual polish

The hero is modestly wider (1560px maximum), with a visible native dotted globe beneath the About copy. Process stages have direct selection, the benefits use a balanced bento layout, and the connected feature hub remains visible on smaller screens. Role-specific team workbenches and client-result illustrations replace inherited portrait artwork. The shared footer is more compact. See `docs/POLISH_VERIFICATION_2026-10-10.md` for browser checks and recovery details.

## October 10 multipage expansion

The latest verification is in `docs/MULTIPAGE_VERIFICATION_2026-10-10.md`. Supporting labels and captions have a 14px minimum, descriptive copy generally uses 16–18px, and native diagrams have additional room for the larger text. The recoverable pre-expansion source is `/home/uttkarsh/Downloads/Zykken Before Multipage 2026-10-10.tar.gz`.
