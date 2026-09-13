# MPBrand Direction - Jerio

Meta Pacific assignment review by Jerio.

Live review: https://jorkspace-a11y.github.io/mpbrand-assignment-jerio/

The assignment is organised into 13 task pages and a separate design library. It includes the brand audit, creative direction, three logo explorations and recommendation, mini identity system, a 15-post social concept, cross-platform applications, Christobal Grego founder direction, landing-page direction, three Instagram reviews, six content pillars, six annotation reviews, two teaser reviews, a How To treatment, Anjuna case study and quotation/invoice creator.

The library preserves 36 logo applications and 18 earlier poster studies. Signal is now rounded and upright, with a contained word fragment; the old underlined version is superseded. The commercial task offers six quotation layouts, two per logo, and an invoice example mode.

## Working on the live review

Edit the HTML, CSS and JavaScript here. No build dependencies or server API are required. GitHub Pages publishes the root of the `main` branch after a push. Use a short-lived `codex/` branch for revisions and merge reviewed changes into `main`.

Preview locally with `python -m http.server 8768` from this directory. Test mobile layout, logo switching, image loading and PDF export before publishing.

Each task has its own native Save PDF button and a separate snapshot in `pdf/`. Six quotation PDFs and one invoice example are also provided. No bundled submission PDF is linked from the new navigation. Older submission files remain historical snapshots, not the current submission.

Downloaded PDFs and PNGs are versioned snapshots; regenerate them after visual revisions. `tests/review.js` is the Playwright review/export function for the local workspace. `python tests/check-pdfs.py` checks credits and quoted prices, requires single-page commercial layouts, and rewrites local PDF links to the public site. See `QA.md` for scope and evidence boundaries.

## Public package boundaries

Only assignment assets are included. The internal shared-file index, private archive links, local server, source documents and Windows font files are excluded. The production metapacific.co repository is separate and unchanged.

Anton and Jost web fonts are bundled with their SIL Open Font License notices in `fonts/`. Brand lettering remains outlined SVG. Photography and reference covers retain their existing ownership; this repository does not grant a general reuse license for that artwork.
