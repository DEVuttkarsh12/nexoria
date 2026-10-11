# Graphite redesign — October 11, 2026

## Direction and implementation

The user requested a distinctive Zykken identity, a better All Systems in One showcase, and custom visual explanations throughout the site. Their latest correction retains the original flowing WebP shard and rounded hero geometry, recoloring its orange hue light gray with `background-blend-mode: luminosity` over a neutral background. The large Z background is removed. Original responsive cropping remains, and background blending leaves text, logos and authentic tool icons unchanged. Surfaces, buttons, labels and component chrome are quieter and neutral.

- `systems-visuals.mjs` provides a native five-radio system walkthrough and five reusable illustrative service specimens. Services, service detail heroes and Features use these instead of repeated browser chrome and checkmark cards.
- `narrative-visuals.mjs` provides the request journey, authentic n8n/Make/Zapier integration paths, three case-study comparisons and topical insight artwork. Random decorative metric bars are retired.
- Shared delivery artifacts now contain task, exception-path and layered-handover diagrams.
- Team cards use four discipline-specific vector studies; client identities use typography and source results.
- The existing ROI estimate gains a dynamic weekly-hours bar comparison on a stated 0–120-hour scale and existing 80% recovery assumption.
- Styles load as four local component stylesheets after site.css. The static build collects nested CSS asset references.

Preserved: original homepage headline, supplied transparent PNGs, six authentic falling tool tiles, five offers, six projects, four people, source quotations/results, custom quotes, all 29 routes and the existing contact API. No credentials, domain settings or email routing changed. No real email sent.

## Completed checks

- Both authorized source folders build all 30 documents.
- All 22 existing tests pass, including route links/fragments, native page semantics, greeting loader, contact error behavior and ROI formulas. Email provider calls are mocked.
- `git diff --check` passes.
- Independent source review checks all 30 documents: one H1 each, no duplicate IDs, images have alt, all 23 referenced local assets exist, native radio labels and reduced-motion support present.
- Local HTTP check covers 29 public pages, 4 runtime files, 23 assets and 4 unknown routes; no failures. Report: Zykken New/docs/GRAPHITE_LOCAL_HTTP_2026-10-11.json. Its commit field identifies the preceding HEAD because changes are still unpublished.
- Native browser layout checks cover all 30 documents at 320, 390, 768, 1024 and 1440 CSS pixels: 150 checks, no document overflow, broken loaded images or body/UI text below 14px. Local evidence: `Zykken New/docs/graphite-proof/responsive-pages.json`. Referenced lazy artwork is covered by the separate HTTP asset checks.
- The corrected original hero is visually inspected on desktop and phone: original WebP, light gray luminosity blending, original responsive corners/crops, no large Z. Text, supplied transparent logos and authentic tool icons retain their colors.
- All five native system selections show one corresponding pane on desktop and a narrow phone; ArrowRight selects the next native radio. State evidence: `systems-states.json` and `interactions.json` in the proof folder.
- Native screenshots inspect the service journey, delivery stages, benefits, systems sheet, team roster, integration paths, reported-result charts, testimonials, project hero and narrow feature/service specimens. Source review caught and fixed the light-card specialty contrast, small specimen-label contrast, nested specimen diagrams and ambiguous comparison labels.
- The final phone visual inspection caught a long service category label. Shared labels now wrap instead of clipping. A fresh 320px Carryline service screenshot confirms the category fits its 241px content width.
- Mobile navigation opens and closes. The ROI range responds to the End key: 120 weekly hours, before bar 100%, remaining 24 hours, after bar 20%, monthly estimate $10,392. Empty contact submission shows name/email errors without sending an email. The existing API and credentials are unchanged.
- Full browser screenshot/interaction runs dismiss the greeting intro before inspection. Two optional large repeat-check batches exceeded the browser tool deadline; their partial results are discarded. The saved 150-check report above is the completed initial run, followed by targeted verification of the small label correction.

## Publication

These changes are prepared for the authorized main-branch push to `DEVuttkarsh12/nexoria`, which triggers the existing Vercel Git deployment. Production status, matching page/asset hashes and live screenshots are recorded after deployment in the local-only `Zykken New/docs/GRAPHITE_RELEASE_2026-10-11.md`. No environment, DNS, contact destination or deployment configuration is modified.

## Recovery and working state

Pre-change source: Git commit `059d270e4cdb36f85629969d149da260afc809f6` and `/home/uttkarsh/Downloads/Zykken Before Graphite 2026-10-11.tar.gz` (git archive of that commit). Original `/home/uttkarsh/Downloads/nexoria-main` remains untouched.

Implementation checkout: `/home/uttkarsh/Downloads/Zykken GitHub`; preview/source copy: `/home/uttkarsh/Downloads/Zykken New`. Both copies are synced without removing local-only evidence or environment files. Local server: http://127.0.0.1:4181/. The source and native proof remain available locally; see the release record for the published commit and deployment checks.
