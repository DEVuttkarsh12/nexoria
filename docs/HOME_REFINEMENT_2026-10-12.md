# Homepage refinement — October 12, 2026

The user's supplied hero and footer screenshots define the current request. Work is implemented in the Windows export at `C:/Users/GIGABYTE/Downloads/nexoria-main (1)/nexoria-main`. This folder has no Git metadata. The initial edit request produced a local preview and build. The user then explicitly authorized pushing all changes to `main`; publication is prepared in a fresh checkout at `C:/Users/GIGABYTE/Downloads/nexoria-main (1)/nexoria-publish-2026-10-12`, based on verified remote commit `52394556a07b4ea7213145dc7926c35042a0cd7e`.

## Changes

- The homepage hero artwork fills nearly the viewport width with small outer gutters. It retains the original background, transparent logo, headline and falling tool cascade.
- `homepage-visuals.mjs` renders a three-stage rope timeline with native layered illustrations and one short sentence per stage. It replaces the verbose shared homepage overview, also used on Services and Custom Quote. The detailed Process page retains its deeper explanations and anchors.
- Why Choose Us uses four concise illustrated benefits instead of repeated descriptions, artifacts and captions.
- All Systems in One places the five linked systems around an open central workflow, directly on the page background. The shared Features overview uses the same diagram. Narrow phones use a readable two-column arrangement.
- The homepage's people/team section is removed. Team links are removed from shared primary/More navigation and the footer. Existing About and Team routes remain available; their content was outside this homepage removal.
- Measured Outcomes uses three large side-by-side comparisons on desktop and stacked charts on phones. Exact existing figures, source measures, client links and qualification of reported results are preserved.
- Delivery Standards is a compact four-stop rail: scope, progress, handover and support.
- The homepage has eight numbered native FAQ disclosures with short answers, keyboard access and a link to all questions.
- The shared footer's large Zykken wordmark is its final element in normal document flow, with space above it and sufficient line height for the full lettering. It no longer overlaps any links.

New styles load last from `assets/ui/home-refinement.css`. Source modules, not generated output, own the change. No packages or generated bitmap assets were needed.

## Verification

- `npm run build`: 30 pre-rendered documents.
- `npm test`: 22 passing tests, including every internal link/fragment, unique headings/IDs, route discovery, contact contracts and loader behavior. Provider calls are mocked.
- Local HTTP checks: all 29 public routes plus the 404 document return the expected status; all 17 directly referenced homepage runtime/assets return 200.
- Final homepage layout checks at 320, 390, 768, 1024, 1440, 1920 and 2560 CSS pixels: no horizontal document overflow, eight FAQ items, no homepage team section, footer wordmark below legal links. At 2560px the hero is 2465px wide, compared with the preceding 1560px maximum.
- Services, Custom Quote, Features and About checked at 320, 768 and 1440px: no horizontal overflow and correct footer order.
- Actual screenshots inspect the desktop hero, timeline, benefits, open systems, outcomes, standards and footer, plus phone timeline, benefits, FAQ and footer. Screenshots are viewport captures; phone captures show the relevant visible portion, not the entire long section.
- Phone navigation opens and closes; Enter expands the pricing FAQ. No browser console errors in the checked session.

Evidence is in `docs/home-refinement-proof/`. JSON contains the measured layouts and HTTP checks; JPEGs show the native browser output.

## Recovery and limits

Source checkpoint: `C:/Users/GIGABYTE/Downloads/nexoria-main (1)/checkpoints/zykken-before-home-refinement-2026-10-12.zip`. It contains the preceding modified source files and shared styles. To restore, remove the two newly introduced source files (`homepage-visuals.mjs` and `assets/ui/home-refinement.css`) and restore the checkpoint files, then rebuild.

Preview: `http://127.0.0.1:4180/`. Publication uses the existing GitHub-to-Vercel integration. No DNS, email routing, credentials or deployment configuration are changed. Real contact delivery was not exercised; no real inquiry was sent. The earlier Linux checkout locations in historical documentation are not the current Windows workspace.
