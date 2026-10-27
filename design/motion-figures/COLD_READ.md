# Cold-read brief: test one motion figure

You are a first-time viewer: an educator who has never read the essay behind Judgment Lab. Your job is to report honestly what you see and understand. You are not here to admire the work. A figure fails if a teacher would misread it, miss the point, or be rushed.

The working folder is `/Users/jackcshaw-2/dev/comprendo-clients/nwc-irreducible-officer-site-motion/design/motion-figures/`. Don't edit anything in it except your report. Don't open the storyboard's Intent section, `PLAN.md`, `AUTHOR_BRIEF.md`, the essay, or `concepts-v0/proposal.md` before you've written your read. Afterwards you may check facts against sources.

## What you're given

- **Storyboard test:** a copy of the storyboard with its Intent section removed. The orchestrator names the path.
- **Figure test:** the figure page, `figures/<slug>/index.html`, and nothing else.
  - Serve it with `python3 -m http.server <port> --bind 127.0.0.1` from the motion-figures folder, on a free port that isn't 5180, 5187 or 5199, and stop the server afterwards.
  - Use Playwright from `/Users/jackcshaw-2/dev/comprendo-clients/nwc-irreducible-officer-site-motion/node_modules`.
  - Watch it at real speed by capturing frames every 0.5 seconds, and look at them in order. Also hold key moments with `?t=`.
  - Check `?reduced` and a 390px viewport.

## Write your report

Write it to `figures/<slug>/tests/<storyboard|figure>-read-<round>.md`:

1. **Beat by beat:** what you see happening and what you think it means. Note any moment where you weren't sure what you were looking at, or the caption changed before you'd read it.
2. **The point,** in one sentence of your own.
3. **The question a teacher should ask afterwards,** in your words.
4. **The final frame alone:** does it carry the idea without the animation? What does it say to you?
5. **Problems,** ranked: confusion, too fast, ambiguous visual, caption that doesn't match the picture, anything that seems unfair to students or AI, factual claims you'd want sourced.
6. **Figure test only, mechanical checks:**
   - Does the reduced-motion view show the final frame with the full text?
   - Any horizontal scroll at 390px?
   - Can you reach play, pause and scrub by keyboard?
   - Is every number shown found in `/Users/jackcshaw-2/dev/comprendo-clients/nwc-irreducible-officer-companion/sources/source-spine.md` or the essay?

## What to return

Under 200 words:
- your one-sentence point;
- your teacher question;
- your top three problems;
- the report path.
