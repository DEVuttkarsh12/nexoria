# Supplied transparent logos — October 11, 2026

The user's supplied monogram and geometric wordmark replace the old JPEG background crops in both the shared navbar and the greeting loader's top-left corner. Both PNGs are copied unchanged; CSS wrappers frame their visible artwork and preserve its proportions. The white rectangles, inversion and multiply blend from the old lockup are removed. The existing brand link retains its accessible name, while the two decorative images use empty alt text.

## Exact source provenance

- `Angular Split-Stroke Z Monogram.png` → `assets/zykken-monogram-transparent.png`, 1254×1254 RGBA, SHA-256 `ca9ba2b5aa5d117c04553e05f25af8782a5875a1c62ec9c42bcd68c503793be5`.
- `Zykken Geometric Wordmark.png` → `assets/zykken-wordmark-transparent.png`, 2172×724 RGBA, SHA-256 `f095371e63ad6acedc2b85fe26e5d300349a5306c613ba4cc3827aee6d74ecd5`.

The source and copied hashes match. The monogram frame is (300,378)–(951,891), and the wordmark frame is (341,233)–(1805,564); both include a small transparent inset around the meaningful artwork. Original pixels and transparency remain intact.

## Verification

- `npm run build`: 30 generated documents (29 public routes and the 404).
- `npm test`: all 22 existing tests pass, including shared semantics/navigation, local artwork, contact contracts and loader lifecycle checks. Contact tests use mocks and send no email.
- Rendered desktop navbar and loader, phone navbar at 320px and 390px, and phone loader at 390px inspected. Both assets load and the transparent backgrounds blend with the existing surfaces.
- Logo geometry inspected at 320, 390, 768, 810, 1099, 1100, 1199, 1200 and 1440 CSS pixels. Both images load, proportions remain consistent, and no horizontal page overflow occurs. The 810–1199px widths are 32px/96px; other widths use 34px/100px.
- Phone navigation opens and closes after the greeting loader completes. The greeting sequence, dismissal logic and timing are unchanged.
- Read-only independent review confirms the crop offsets, tablet override and accessible shared markup; no actionable issues found.
- `git diff --check` passes.

Rendered screenshots and geometry records are retained in the local redesign folder at `docs/brand-proof/`. Publication and exact production asset/page checks are recorded there after deployment.
