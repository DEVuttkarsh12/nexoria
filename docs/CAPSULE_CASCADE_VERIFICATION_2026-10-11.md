# Capsule cascade refinement — October11,2026

The user’s screenshot showed a line crossing the Make card near the capsule’s lower edge. Its source was the5px, z-index2 `.hero-mark::after` overlay. That pseudo-element is removed entirely; the rounded capsule retains its existing light and shadow.

The shared decorative component now renders two triplets of authentic n8n/Make/Zapier cards. A1.8s fall cycle replaces3.6s. Closely staggered primary starts (-.12/-.28/-.44s), with the repeated group0.9s apart, produce overlapping groups flowing out of the capsule. The inside origin, masked upper edge, fall trajectory and invisible reset remain. Reduced motion hides the second triplet and shows the original three still cards.

Checks completed before publication:

- Build succeeds for all30 documents; all22 existing tests pass. Mocked contact tests send no mail.
- `git diff --check` passes.
- Native browser checks Home and the shared About hero at320/390/768/1024/1440px (10 checks): no page overflow; `::after` content is none; all six images load and all six animations resolve to1.8s with expected grouped delays.
- Native desktop/phone screenshots show cards together below the capsule with a clear lower edge and readable copy beyond the trajectory. Browser warning/error scan returned no entries.
- Independent source review confirmed the offending overlay and checked repeated-card/reduced-motion behavior. Reduced-motion still styling was reviewed in source; no system-level browser emulation was performed.

Local proof and geometry: `/home/uttkarsh/Downloads/Zykken New/docs/cascade-proof/` and `CASCADE_RESPONSIVE_2026-10-11.json` in that docs directory. Production verification is recorded there after the authorized GitHub-to-Vercel release. Recovery source is the previous Git commit71ec2e0. The original project remains unchanged.
