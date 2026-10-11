# Page structure refinements — October 11, 2026

## Request and recovery

The user reported an unstructured opening when selecting a project, with a screenshot of `/case-study/velvet-co`, and requested well-structured, responsive pages throughout the website. The previous source is preserved at `/home/uttkarsh/Downloads/Zykken Before Page Structure 2026-10-11.tar.gz` (Git archive of d7eab20). The original `nexoria-main` folder remains untouched.

## Changes

All six case-study pages share a new normal-flow composition. The opening has a breadcrumb, client H1, separate project deck, summary, labeled industry/project/build-time facts, clear links and a contained conceptual illustration. The oversized inline capsule and absolute overlapping cover are removed, together with their manual spacer rules. The body has a local section directory, numbered challenge/solution/results sections, readable deliverables and the current client's own quotation. A next-project card, return-to-work link and custom-project CTA complete the journey.

Hero, story and related-project gutters align. The hero stacks below 900px; result cards stack below 700px, avoiding split metric units; phone facts become labeled rows. Copy uses 16–18px supporting text, with labels/captions at 14px or larger. Project imagery remains clearly described as conceptual artwork.

Shared inner heroes are bounded to 1440px, have content-driven heights and balanced headings. Articles use a compact breadcrumb/title/metadata opening followed directly by their introduction and chapters. Their duplicate decorative cover is removed. Insights now use a real shared grid, with two columns on tablets, and related-article cards exclude the current article while retaining the correct artwork. Service detail and quote cards also use wider tablet columns. The 404 opening has explicit title/description/action spacing.

Original project problems, builds, outcomes, quotations and identities are preserved. Routes, canonicals, custom quotes, greeting loader, contact validation and business contact details remain intact.

## Checks completed

- `npm test`: 22 passing tests.
- `npm run build`: 30 generated documents (29 public pages plus 404).
- `git diff --check`: clean.
- All six project renderers preserve the client, industry, category, duration, exact problem/build, every result, author/role/quotation, valid local section links, mapped service detail and next-project link.
- All three articles retain their introduction and chapter content, and their two related cards exclude the current article.
- Local HTTP checks: all 29 pages return 200 and exactly match build output; four runtime/metadata files match; all 35 referenced assets return 200; four unknown routes return 404 with noindex. See the preview folder's `docs/PAGE_STRUCTURE_LOCAL_CHECKS_2026-10-11.json`. Its commit field identifies the checkout base before publication; the checked files were the updated working source.
- Existing integration checks cover one H1, unique IDs, exact canonicals, sitemap, every internal link/fragment, homepage discoverability and current navigation parents.
- Contact-provider checks use mocks; no real inquiry was sent.

## Browser limitation

The Codex browser connection timed out while creating a preview tab, then reported no available browsers. A reconnect request was sent to the user; a subsequent selection of the known site URL also returned “No browser is available.” Rendered viewport/screenshot and interaction checks for this revision could not be completed. Source review and HTTP checks are not a substitute for rendered responsive verification.

When the browser reconnects, check all six project pages at 320, 390, 560, 700, 768, 810, 900, 1024, 1099, 1100, 1199, 1200, 1439, 1440 and 1920 CSS px. Check header/title clearance, artwork containment, reading order, aligned gutters, metric units, clipping ancestors and navigation. Review one page of every other type, including article/insight grids and 404; broader responsive proof from the previous revision is historical evidence only.

## Publication

The source is prepared for the already-authorized push to `DEVuttkarsh12/nexoria` main and automatic Vercel deployment. Exact production route/runtime matching and deployment status are recorded after publication in the preview folder's live-check report.
