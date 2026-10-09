# White grain greeting loader — October 9, 2026

The user requested the previous Zykken greeting loader in the new website, with a white theme and grain. The old source remains preserved in `nexoria-main` and in Git history before commit `3b391e9`.

The restored intro preserves **Hello → नमस्ते → Bonjour → こんにちは → مرحباً → Hola → Ciao → Welcome**, the 520ms sequence interval, blurred vertical transitions, language label, eight-step count and progress line. Arabic retains RTL direction. The previous serif lettering is preserved with a locally served Instrument Serif italic font. Dark ink, white/silver lighting and multiply-blended grain adapt the component to the redesigned site.

## Behavior

- Shared across all 19 generated pages, through `layout.mjs`.
- First tab visit runs the complete sequence, with a minimum 4.38s display and a 6s load deadline. Repeat visits show Welcome with a 1.18s minimum and 2.2s deadline, followed by the original soft exit timing.
- Session key: `zykken_greeting_boot_v3`. Storage failures do not prevent completion.
- Skip intro or Escape dismisses immediately and records the visit. Tapping the backdrop after 1.05s completes with the soft exit.
- Background content is inert while the intro is visible. Dismissal restores interaction and focus. The decorative words are excluded from accessibility announcements; the dialog exposes the Skip button.
- Reduced motion bypasses the intro. A change to that preference during playback also dismisses it.
- Without JavaScript the loader stays hidden. A separate head bootstrap watchdog removes the overlay, unlocks marked regions and restores visible content after 8.5s if the application module fails.

## Asset provenance

- `assets/loader-grain.svg` is copied from the original Zykken site’s procedural SVG texture.
- `assets/instrument-serif-italic.ttf` comes from the same Google Fonts family used in the original loader: `https://fonts.gstatic.com/s/instrumentserif/v5/jizHRFtNs2ka5fXjeivQ4LroWlx-6zATiw.ttf`.
- The font’s SIL Open Font License is included as `assets/instrument-serif-LICENSE.txt`, sourced from Google Fonts’ `ofl/instrumentserif/OFL.txt`.

## Verification

- Fourteen tests pass, including four loader lifecycle tests for the complete sequence, no load event, blocked storage, shorter repeat visit, Skip/Escape, reduced motion, preserved inert state and the independent module-failure watchdog.
- Browser checks confirm normal completion releases scroll/focus, repeat reload starts on Welcome, Skip and Escape release the page, and mobile navigation works afterwards.
- Actual viewport checks at 320×740, 390×844 and 844×390 confirm no page overflow and a visible footer. All eight text ranges fit at 320px, including Japanese and Arabic.
- Desktop white theme and grain were visually inspected. Browser error/warning logs were empty.
- Reduced-motion and failed-module paths are covered by deterministic browser stand-ins in the test suite; a browser emulation of those settings was not used.

Preview images are in `docs/previews/loader-desktop.jpg` and `loader-mobile.jpg`.
