# Original headline and falling tool cards — October 11, 2026

The homepage H1 is restored to the exact original: **Build AI systems that print revenue fast.** The preserved source is `nexoria-main/index.html`, lines 65–68; `ORIGINAL_SITE_CONTEXT.md`, lines 190–192, records the same text. The existing supporting paragraph and custom-quote actions remain.

The shared red capsule now lets three white cards fall visibly below it. The old mirrored 15px floating animation and clipping are removed. Each new 3.6s CSS cycle enters above the capsule, falls with drift and rotation, fades, and remains invisible from 72–100% before resetting. The three negative delays stagger the sequence. No JavaScript, animation library or external asset request is required. Reduced motion displays all three cards still and visible.

## Authentic artwork

`assets/tools/n8n.svg`, `make.svg` and `zapier.svg` preserve the original upstream Simple Icons paths, viewBoxes and titles. Their fills use the recorded upstream brand colors. Downloads are pinned to commit `dc7b10662a0a2cfdfc9305e2a2b06c023c30724a`; exact source URLs and hashes are in `assets/tools/provenance.json`. The CC0 license and brand-resource notes are retained beside them. Zapier's current app identity is the orange square with the reverse wordmark, as confirmed by its official brand resources; the older asterisk was not substituted.

## Checks performed

- Final source builds all 30 documents. All 22 existing tests pass, including local artwork, every public route/link and the preserved contact/loader contracts. Contact tests are mocked and send no email.
- Initial rendered homepage inspected at 320×740, 390×844, 768×900, 1024×900, 1200×900, 1280×720, 1440×1000, 1920×1080 and 844×390. The exact H1, loaded icons, responsive wrapping and absence of horizontal overflow were confirmed.
- Desktop inspection captured a fully visible Make card below the capsule: its top was 467px while the capsule bottom was 435px, opacity 0.75. Subsequent phone and About-page frames show other points in the falling sequence, rather than the former hanging float.
- The shared About hero was visually inspected at 390px. Clear space below the component was then increased: homepage gaps 160px desktop/148px phone; shared inner component bottom margins 96px desktop/112px phone. This keeps the drop away from descriptive text and the next section.
- Independent read-only review found no semantic, crop, reset or reduced-motion source issues. The decorative icons remain excluded from the accessible headline.
- `git diff --check` passes. Source is kept recoverable in Git, with the original website untouched.

Rendered captures and geometry records are retained in the redesign folder under `docs/hero-proof/`. The browser connection dropped during the final spacing/Features check; that rendered recheck and publication evidence are recorded separately in the local redesign folder once available. No reduced-motion browser emulation was available; its static fallback was reviewed in source.
