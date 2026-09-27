# Hero DitherVeil integration checkpoint

## Seamless hero artwork follow-up

- Before edits: commit `5c5049b54f7bc1479e9811d3fac73cfadbd7611a`. Branch `codex/checkpoint-pre-seamless-hero` points to this version.
- User wants the DitherVeil artwork larger and visually fused with the hero background. Use transparent canvas pixels for the dark areas, a subtle background treatment, and preserve the full-screen phone layout.
- [x] Enabled WebGL alpha and made ink-coloured pixels transparent, so the shared hero background shows through the canvas. The static image fallback fades out once the canvas is ready.
- [x] Increased the artwork's desktop column and height, expanded the phone artwork behind the copy, and kept a restrained cool glow behind the whole hero. No star field was added.
- [x] Rebuilt `assets/hero-dither.js`. Browser checks at 280×500, 390×844, 768×1024, and 1440×900 showed the artwork without a visible panel edge, no horizontal overflow, and no console errors. On phones, the next section starts exactly one viewport below the top and scrolling over the artwork reaches it.
- [x] Committed as `17266b66912d8c68b4ccf67e38fde067140c136d` and pushed to `origin/main` and `origin/codex/dither-hero`. Pushed `codex/checkpoint-pre-seamless-hero` as the recovery branch.

## Zykken logo replacement

- Before edits: commit `ee159c468192c057b99bf16832e0c36dde88f643`. Branch `codex/checkpoint-pre-logo-replacement` points to that version.
- User identified the current two-line mark as incorrect and requested the actual supplied Zykken logo everywhere, including the icon shown in the screenshot.
- The user supplied three 1600×1600 JPEG logo variations: white mark and wordmark, white mark, and black mark. They are preserved in `assets/zykken-*.jpg`.
- [x] Replaced the two-line mark in the headers, greeting loaders, and favicons on all six HTML pages; replaced footer brand text on the five content pages. The visible site uses cropped areas of the supplied logo images, and the favicon embeds the supplied white mark.
- [x] Added the supplied full logo as the social preview image on the five content pages, and updated the local static server to serve SVG favicons.
- [x] Browser checks: homepage and Services render the new header mark at phone width with no horizontal overflow; header, loader, footer, favicon, and social image references are present. The SVG favicon and all three source JPGs return HTTP 200 with the expected MIME types. A fresh homepage load and the Services page had no console errors.
- [x] `git diff --check` is clean and the existing contact test suite passes (6/6).
- [x] Committed as `c2902ac24130bde7cfe7e8636db9ac9938ade7a7` and pushed to `origin/main` and `origin/codex/dither-hero`. Pushed the recovery branch `codex/checkpoint-pre-logo-replacement` to `origin`.

## Responsive site audit

- Before these edits: commit `2750e4734952aedc08536cd36a5a29d2941e3b85`. Branch `codex/checkpoint-pre-responsive-audit` points to that exact version.
- Goal: make the homepage and secondary pages responsive across phone, tablet, and desktop widths. On smartphones, the hero should fill the viewport while all later homepage sections remain reachable by scrolling.
- [x] Measured homepage and secondary pages from 280px phones through 1440px desktop, including compact portrait and landscape screens. No horizontal page overflow found.
- [x] Put the header, hero, and stats in a dedicated viewport-height screen. On phones the artwork sits behind readable copy; from 700px to 900px the hero uses two columns. Compact phone spacing and shared mobile section spacing were adjusted.
- [x] Verified the mobile menu, the DitherVeil canvas, and scrolling from the first screen to the first content section, including scrolling over the artwork.
- [x] Final checks: `git diff --check` is clean, the existing contact test suite passes (6/6), and the hero canvas has no browser errors at phone and tablet sizes.
- [x] Committed the responsive changes as `b4f1dc0` and pushed them to `origin/main` and `origin/codex/dither-hero`. Pushed `codex/checkpoint-pre-responsive-audit` as the recovery branch.

## Follow-up: frameless artwork

- Before the follow-up edits, `codex/dither-hero` was at commit `6ef13d25ccfb468022285cb4ba3e03a38a30871b`. Branch `codex/checkpoint-pre-frameless-dither` points to that version.
- User requested removing the visible frame around DitherVeil so the artwork sits directly on the hero background, then pushing the result to GitHub.
- [x] Removed the artwork border, rounded card, shadow, and overlaid caption. The dither uses the hero background colour and fades at its edges.
- [x] Verified the canvas, desktop side-by-side layout, mobile stacked layout, no horizontal overflow, no browser errors, and click-to-reveal colour interaction.
- [x] Committed the frameless change as `cb46e1c` and pushed `codex/dither-hero` to `origin`. Also pushed `codex/checkpoint-pre-frameless-dither` so the previous framed version is recoverable from GitHub.
- [x] Published the frameless version to `origin/main` on 2026-09-27. `main` and `codex/dither-hero` now include the hero change.

## Recovery point

- Before changes: commit `b9fff5c3db7168b6b9f24bdf214842c15fd2481b` on `main`.
- Git branch `codex/checkpoint-pre-dither-hero` points to that exact commit. The current implementation is on `main` and `codex/dither-hero`. To see the original site again after saving any new work, run `git switch codex/checkpoint-pre-dither-hero`. Switch to `codex/checkpoint-pre-frameless-dither` for the earlier framed version.
- `framer-shim.js` was already untracked before this task and is unrelated. Leave it in place.

## Requested result

- Integrate the supplied React Bits `DitherVeil` component with its `ogl` dependency.
- Replace the homepage video hero with a desktop split layout: existing text on the left, interactive DitherVeil visual on the right. Keep mobile layout usable.

## Progress

- [x] Inspected pasted component, homepage hero, CSS, and repository status.
- [x] Created baseline Git branch before editing site files.
- [x] Copied the supplied component to `src/DitherVeil.jsx` and its CSS; added React, OGL, and esbuild with a committed static bundle target.
- [x] Saved the example image locally at `assets/dither-hero.jpg` so the effect and fallback do not depend on remote image CORS.
- [x] Updated homepage hero markup and responsive styling for left text and right DitherVeil artwork. The previous hero video markup is removed.
- [x] Ran `npm run build:hero`; output is `assets/hero-dither.js` and `assets/hero-dither.css`.
- [x] Fixed the local static preview server to serve JPEG assets.
- [x] Verified the desktop split layout, stacked mobile layout, loaded canvas, click reveal, image and JS responses, and no browser errors. No horizontal overflow was observed on mobile.
- [x] Ran `node --test tests/contact.test.cjs` (6 passed) and `git diff --check` (clean).

## Resume here

The site is plain HTML/CSS/JS. The homepage mounts React only inside `.hero-visual`; the rest of the page remains static. If source changes, run `npm install` (if needed) and `npm run build:hero` so the static assets match the source. Preview with `node scripts/dev-server.cjs`. The baseline branch above remains the recovery point. `framer-shim.js` was present before this task and must not be added or removed as part of this work.
