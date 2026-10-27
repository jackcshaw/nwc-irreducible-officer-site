# Author brief: one motion figure

You are building one teaching figure for Judgment Lab (judgmentlab.net). Read [PLAN.md](PLAN.md) for the eight figures and the loop, and [CONVENTIONS.md](CONVENTIONS.md) for the visual vocabulary earlier figures settled; follow it, and add to it when you settle something new.

The working folder is `/Users/jackcshaw-2/dev/comprendo-clients/nwc-irreducible-officer-site-motion/design/motion-figures/`. Work only there. Don't commit; the orchestrator commits. Don't touch any other checkout.

## Why this exists

Jack saw the first concepts in `concepts-v0/` and said: "The motion videos are just a little bit too fast. These might be okay as concepts, but to turn them into actual teaching documents... it's evident what's happening on screen. We probably need to script each one so the beats are right... make it a thick storyboard." A first-time educator should be able to watch once and say what went wrong, why, and what to ask.

## Sources

- **The essay:** `/Users/jackcshaw-2/dev/comprendo-clients/nwc-irreducible-officer-companion/the-irreducible-officer.md`. Section II defines the failure modes; Section V covers reliance.
- **The claims:** `claims.md`.
- **The evidence:** `sources/source-spine.md`.
- **The failure-mode lab:** `labs/failure-mode-lab/`. Its `cases.md` has a case per failure mode, which is a good source for a concrete scenario.
- **The first concepts:** `concepts-v0/proposal.md`, §2 storyboards, plus the prototypes and `motion.js` runtime.
- **The book:** `book-v0/proposal.md` and `four-moves-book.html`.

Never invent evidence. Every number on screen must be in a source, and fictional scenario details must read as an example.

## Step A: the thick storyboard

Write `figures/<slug>/storyboard.md` with these sections, in this order:

1. **Intent** (the tester won't see this section):
   - the one-sentence point;
   - what a first-time educator should be able to say afterwards;
   - the faculty check;
   - the essay passage it comes from, quoted;
   - common misreadings to design against.
2. **Scenario:** the concrete situation the figure shows (who, what task, what the AI does), in two or three sentences. Prefer a case from `labs/failure-mode-lab/cases.md`, or one of the essay's own examples.
3. **Cast and grammar:** every visual element, what it stands for, and how it looks. Grey and navy are machine work; red is what a person decided.
4. **Beats.** For each beat:
   - its number and time range;
   - what is on screen at the start, with positions;
   - what moves, in order, and over how long;
   - the exact caption text;
   - what the viewer should notice;
   - why this beat is needed.
5. **Final frame:** the still that carries the idea alone. It also serves as the reduced-motion view, the print view and the poster for social cards. Describe it exactly, including the faculty check as it appears.
6. **Standalone page copy:**
   - the title;
   - the one-paragraph setup;
   - the beat list as the text equivalent;
   - the faculty check;
   - the essay quote;
   - the links (book chapter, Practice, essay section).
7. **Pacing table:**
   - each beat's caption word count;
   - its reading time at 3 words per second;
   - its motion time;
   - its hold after the motion settles (at least 1.5 seconds);
   - the total.

### Pacing rules

- One idea per beat, and one movement at a time.
- No caption replaces another until it can be read twice.
- Expect 30 to 60 seconds in total, not 6 to 10.
- The setup beat names the situation before anything goes wrong.
- The turn beat makes the mechanism visible.
- The figure ends on the faculty check.

### Voice

Captions and page copy are plain and direct: name who does what. No "X, not Y" openings, no slogans, and no morals after the example.

## Step B: build the figure

After the storyboard passes its cold read, build `figures/<slug>/index.html` as a standalone page.

- **Runtime:** the shared runtime, `runtime/motion.js` and `runtime/figures.css`. Create these from `concepts-v0/` if they don't exist yet; keep changes backward compatible and note them in CONVENTIONS.md.
- **Page:** follow the storyboard exactly. Include:
  - visible play, pause and replay controls, plus a scrubber;
  - the beat list, which highlights the current beat;
  - reduced motion (`prefers-reduced-motion`, or `?reduced`) showing the final frame with the full beat list;
  - `?t=` to hold a moment;
  - layout from 390px to 1440px with no horizontal scroll;
  - site palette and fonts (ink #0a2242, red #b81b2b, paper #f6f1e8; Source Serif 4 and Source Sans 3).
- **Stills:** export one per beat, plus the final frame, to `figures/<slug>/shots/`.
- **Preview video:** reuse the scripts in `concepts-v0/scripts/`. Playwright can record video; for conversion, ffmpeg isn't on PATH, but Playwright and Remotion ship ffmpeg binaries under node_modules caches.

## What to return

Under 250 words:
- what you made, with its paths;
- the total running time;
- anything you couldn't resolve;
- any convention you added.
