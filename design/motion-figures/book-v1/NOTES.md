# Book v1: notes

`four-moves-book.html` is v0's book with a spread for each figure. Serve `motion-figures/` (`python3 -m http.server 5311 --bind 127.0.0.1`) and open `/book-v1/four-moves-book.html`. Deep links: `?figure=frame-capture`, `?move=calibrate`, `?spread=7`, `?flat`, `?reduced`, and `?figure=<slug>&play` to open a figure playing.

## Structure

The book runs cover, how to read it, contents, then the four chapters, then a closing spread: 15 spreads, 28 pages. Each chapter opens with v0's move spread unchanged, except that the failure-mode names now link to their spreads. A spread for each of the chapter's figures follows.
- **Left page:** the name, "What goes wrong" (verbatim from PLAN.md), the faculty check with the figure's follow-up under it at the same size, and a sentence or two from the essay passage. Appropriate reliance says "What it looks like" instead.
- **Right page:** the figure.

## Embedding: poster on the page, the figure over the book

The right page shows the figure's poster still (`shots/final.png`, its last frame and check). It offers two actions:
- **Play here** opens the figure over the open book in a modal `<dialog>`. Inside is an iframe of the figure's own standalone page. The book hides that page's header, setup and text sections, and keeps the player and the beat list.
- **Open the figure** goes to the standalone page.

Closing (button, Escape or the backdrop) stops the figure and returns focus to "Play here".

Why not play the figure on the page:
- **The page is too small.** At 1440 a page is 520 × 650 px with a 442 px text column. The figures are drawn for 1,040 px. At 442 px the stage scale is 0.46, so 12-unit labels would render at 5.5 px. The runtime's legibility rule would then hide every label, and FS, PS and UR would switch to their phone layouts. The player (stage, a 136 px caption band, controls) and the beat list don't fit the page height either.
- **The whole spread is still too small.** At 1,040 × 650 the runtime caps the stage at 650 − 228 px, which letterboxes it to 750 px wide. That still hides FC's labels, which need about 880 px.
- **Mounting the figure scripts in the book breaks things.** Each script finds its root by id and depends on its page's markup and styles. The book would duplicate every page and drift from it. The 3D faces (`overflow: hidden`, `backface-visibility`) would clip the figures, and autoplay would fire behind hidden pages.

What the dialog keeps:
- the figure at the size it was designed and tested for (1,118 × 589 px stage at 1440 × 900, labels on);
- the figure page as the single source;
- the runtime's own player, keyboard access, autoplay rule and reduced motion, unchanged. Under reduced motion the figure opens on its final frame. Arrow keys on the scrubber move the figure and don't turn the book.

On phones the dialog is full screen and the figure runs its tested phone layout. The dialog sits outside the 3D stage, in the top layer, so no transform can flatten or clip it.

Limits:
- **Opened from `file://`:** the iframe is cross-origin, so the page can't be trimmed. A `#slug` fragment scrolls it to the figure instead, and Escape works only while focus is outside the iframe.
- **No JavaScript:** the fixed pages read as a document, and a note links to the figures index.

## Switching a figure on

Edit `figures.js`, which holds one line per figure: slug, title, chapter, status.
- **Switch on:** set `status: 'done'`. The spread then gets the poster, Play here and Open the figure.
- **Any other status:** a dashed "In progress" plate with the left-page text. It uses the poster if `shots/final.png` exists, or the figure's last caption set as type.
- **Move a figure:** change its `chapter` (`frame`, `calibrate`, `garden`, `own`). Order within a chapter follows the list.
- **Left-page text:** in the same file. The contents page, page numbers, closing map and nav labels are all derived from the list.

## For the orchestrator

- Each figure page's "Book chapter" link still points to `book-v0/...?spread=N`. Change it to `../../book-v1/four-moves-book.html?figure=<slug>`.
- Appropriate reliance has no page yet. Leave it in progress until it does.
- The follow-ups for in-progress figures come from their current pages or storyboards. `node book-v1/scripts/book-shots.mjs 5311` compares every check and follow-up with the figure pages and every quote with the essay, and prints any drift.
- The script also checks:
  - page overflow at 1440, 1280 and 1101;
  - keyboard turns, contents focus and `inert`;
  - the dialog: player state, Escape, focus return;
  - reduced motion;
  - horizontal scroll at 390 on every spread;
  - the flat view.

  It writes `shots/`. Posters and shots are gitignored, so a fresh clone shows the typographic stand-in.
