# Design

## Source of truth
Active, refreshed 2026-09-15. Assignment presentation, task pages, design library, quotation/invoice creator. User screenshots and live review take precedence over generic style rules.

## Brand
Editorial, cinematic, curious, direct. Real footage and clear commercial scope build trust. Avoid rigid template feeds, artificial testimonials, invented founder quotes and AI-generated imagery.

## Product goals
Explain the choices, show the selected result, let each task export independently. The root is the assignment presentation. homepage.html is a separate company landing exploration with three logo-led type, color and layout treatments. Preserve all previous work in the library or Git history. No bundled submission PDF in the new navigation.

## Personas and jobs
Chris reviews thinking and craft. Jerio presents, compares, exports and revises. A visitor must distinguish observed source facts, proposals and unresolved production checks.

## Information architecture
Final presentation / Design library. Hero links to 13 named tasks: audit, direction, logo, mini system, social grid, finished applications, founder, landing page, existing Instagram review, pillars, source annotations/teasers/how-to, Anjuna, commercial. Task PDFs match task boundaries. Quotation creator has three logos, two layouts each, plus quotation/invoice mode.

## Design principles
One idea per frame; varied scale and composition across a sequence. Brand rules live in the system task; examples live in applications; source critique lives in reviews. No visible author watermark on pages, creative assets or current PDFs. Explanation is open editorial text, not a side-stripe callout.

## Visual language
Ink #121212, near-white #f6f6f4 and vermilion #df301c lead the submission. Earlier blue, orange and yellow remain secondary brand options. The latest image set drives the compositions: documentary image scale, asymmetric information, intentional empty space, small factual labels and contrasting type sizes. Bold Jost leads the interface; Anton is reserved for selected campaign headlines. No emoji-capable arrows, stock face icons, star stickers or generic callout cards. Original abstract contour lips are part of the requested motion artwork, not navigation icons. Photography must come from approved project assets, never borrowed reference subjects. Do not imply a pictured performer is Christobal. Inspiration names stay outside the submission; original work remains visible where source critique is required.

## Components
Reuse native buttons, details, dialogs, print selection and asset files. New phase renderer and quotation form use plain HTML/CSS/JS. No framework or animation dependency. Logo 02 changes from underlined heavy text to a rounded upright wordmark with a contained accent, with rounded geometry and a contained fragment. Editorial remains the primary recommendation, Studio remains the compact alternative.

## Accessibility
Visible focus, semantic heading order, text labels, 44px controls. No essential text over busy imagery. A dominant contour-lips composition, moving display type and photographic cuts start automatically on the assignment and company openings. Supporting photographic loops remain in the applications. A discreet footer pause control stops both SVG and CSS motion. Honor reduced motion. Print is static.

## Responsive behavior
320, 390, 768, 1024, 1440. Task layouts collapse to one column. Quote artboard remains proportionate in its scroll container on narrow screens; print uses A4. No page-level horizontal overflow or accidental text overlap.

## Interaction states
Unknown task shows a return link. Downloads point only to generated files. Quote inputs stay local; no send/payment action. Native form validation precedes export. Media loading and errors remain explicit.

## Content voice
Plain, specific sentences. Say what is in the shot, what to change and why. No inflated performance claims. Founder prompts are proposed prompts, not attributed speech. Explain the decision directly, without name-dropping inspiration.

## Implementation constraints
GitHub Pages with project-relative paths. Keep internal shared archive URLs and source file index out of the public package. Review frames can be published as the user-requested assignment examples, not the full private videos. Preserve quotation #578 prices and scope; flag conflicting dates/durations outside the mockup rather than silently changing terms. Use self-hosted OFL fonts. Screenshot each task, render every PDF, verify exports and public links.

## Graphic revision

Keep the existing seven-section company structure. Editorial uses ink, orange contour lips and a cobalt cut. Signal uses vermilion, black contours, yellow cuts and condensed upright type. Studio uses a white field, black contours, a vermilion cut and bold black type. Each has a full-width motion composition before the separate business message. The selected logo, typography and color treatment carry through the opening, work, tour and contact surfaces.

The assignment homepage has four chapters and a collapsible mapping to the 21-page source brief. Titles answer requirements; descriptions identify the evidence rather than repeat the rationale. Internal responses use native section selection.

Motion vocabulary: a short opening reveal, scroll-linked perspective framing, an Anjuna preview that follows the setting/phase/proposal story, and immediate control feedback. No scroll hijacking or hidden-content entrances. Native scroll timelines enhance supporting graphics where supported. Other browsers retain the composition.

At tablet and phone sizes, Anjuna becomes three inline image/text steps rather than a sticky desktop preview. Chapter links become a two-column index on phones. Headline and imagery have separate layout regions at every size.

See BRIEF-COVERAGE.md for the requirement map and evidence boundaries.

## Motion on every assignment page

Every assignment route has automatic graphic motion and working interactions. The company and assignment openings retain the contour-lips composition. Other task pages use content-specific studies: audit apertures, direction ribbons, supplied-mark selection, colour relationships, a fifteen-frame sequence, exact format ratios, conversation rhythm, review shutters, six content territories, annotation crops, supplied tour scenes and a commercial reading-order composition. The library, logo applications and quotation creator have companion studies. No emoji or stock decorative icon layer is introduced.

Each study has native buttons with pressed states, keyboard focus and a persistent explanatory caption. It runs without activation and pauses through the shared footer, offscreen, in a hidden tab or under reduced-motion preferences. The interaction studies are screen-only; the existing static task PDFs, source annotations, 15 campaign exports, 36 applications and quotation values stay intact. Never require someone to interact with the artwork to read or navigate a task.

## Unresolved source questions
Founder portrait and final identity approval remain user decisions. Source examples are sampled-frame reviews unless full playback is explicitly evidenced. Before issuing a real quotation, confirm the two source dates, teaser duration and legal company spelling.

## Submission QA

Review the 15 campaign frames and 36 application exports separately from functional checks. Remove emoji-capable Unicode arrows from navigation; use Previous / Next text. Chapter and section indexes remain in document flow, not over the reading area. Native SVG morphing and CSS handle the artwork; no Remotion runtime or new dependency is needed for browser motion. SVG pauses offscreen, when the document is hidden, for reduced motion, in print and through the footer control. All 20 PDF downloads must be regenerated from this same composition layer and visually checked before publication.
