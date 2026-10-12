# About page refinement — October 12, 2026

The user requested removal of the About page's “The people shipping your next system” section, a visible component in its nearly blank dark panel, a clean layout, and publication.

- The complete team section and its Meet the Team link are removed from `aboutPage()`, with no empty wrapper or spacer retained. Uttkarsh, Ananya Rao, Kabir Shah and Meera Iyer no longer appear in this page's rendering. Client identities and quotations remain intact.
- The nearly blank reference globe WebP is replaced with the native `dottedGlobe()` component, a “Connected by design” label and an Enquiry → Decision → Action workflow. The graphic renders without JavaScript and has no dependency on image loading.
- The hero now leads with “Connected thinking. Systems that work.” and the approach heading is “Built around your real work.” The remaining commitments, history, reported metrics, client stories, contact CTA and footer remain available.
- About-specific styles are scoped in `assets/ui/home-refinement.css`. The native graphic has one set of SVG IDs on this page and adapts to desktop, tablet and phone widths.

Verification: the build produces all 33 documents; all 24 tests pass, including unique IDs, one H1, valid internal links and local assets. Native browser checks at 320, 390, 768, 1024, 1440 and 1920px find no horizontal overflow, no listed team names, no empty content cards and no broken loaded images. Desktop and phone screenshots confirm a visible globe, readable workflow labels and continuous layout after removal of the team section. Local proof is in the preview export's `docs/about-proof/` folder. No real enquiry is submitted.

Recovery: prior Git commit `c571c200a329dc63907c6752e4033449ec440597`. Publication uses the existing `main` branch and automatic Vercel deployment, as explicitly requested by the user.
