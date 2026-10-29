# Business edition brief

For the authors of figures 2–8. Frame capture piloted this; its business edition is in round 2. Jack's decisions are in [EDITIONS-PLAN.md](EDITIONS-PLAN.md). Your figure's approved example is in [BUSINESS-EXAMPLES.md](BUSINESS-EXAMPLES.md). The schema, loader and frame-diff are in CONVENTIONS.md, "Editions".

## Build

- **The edition:** `figures/<slug>/editions/business.json`, with `"cast": "workplace"`. Use the `casts.json` keys (`{first}`, `{check}`, `{reviewer_ask}`, `{what_reviewer_sees}`, `{group}`…). Don't edit `casts.json`; propose missing keys in your report.
- **The storyboard:** `figures/<slug>/storyboard-business.md`, with the beat-by-beat words that differ from PME and a pace table (every caption and on-screen text at 3 words per second, plus a 1.5-second hold).
- **Evidence, option A:**
  - "Illustration based on [study]" in the setup;
  - a one-line source under the final frame (`labels.source` / `narrow.source`);
  - the full finding on the page, with its limits.
  - The evidence beat is kept only where the finding is the turn (uncalibrated reliance and appropriate reliance already work this way).
- **The workplace check:** start from the draft in EDITIONS-PLAN.md, keep the separating follow-up at equal weight, and record the wording in your storyboard for Jack.
- **The edition switch** on the page: "See this with: Workplace · PME", with PME labelled "Example from *The Irreducible Officer*, the National War College essay".

## Lessons from the frame-capture pilot (round 1)

1. **Never let the contrast endorse what the study found wrong.** If the "good" person's choice conflicts with the study's finding, make the finding the payoff: the check reveals it and the call changes. That's the one allowed core change. Flag it in your report.
2. **Verify every number against the full paper, not just the abstract.** Remove anything you can't verify. List the verified figures in your storyboard's notes, so they can be added to the companion's source spine.
3. **The business page copy is fully business:** no "student", "faculty", "seminar", "adversary", and no PME-only links. Link the original essay with a label such as "The original essay, written for military education".
4. **Timing:**
   - any new note or label gets its reading time plus a 1.5-second hold;
   - keys and legends never contradict the caption on screen;
   - on phones, keep the task card through the final frame.
5. **Load fonts before measuring** (CONVENTIONS.md, loader notes), or the business text will mis-measure.
6. **PME must still frame-diff to 0** after your changes.

## Check before returning

- Both editions at 1440×900, 1280×720 and 390×844, plus reduced and print.
- The nameplate is unchanged: the name and definition are universal.
- Visitor copy passes the writing-as-jack mechanical check (`/Users/jackcshaw-2/.claude/skills/writing-as-jack/scripts/jack_eval.py`).
- Export the business stills, finals (1440 and 390) and preview (`--edition business`).

Return under 150 words:
- the example used and any core change;
- the workplace check wording;
- what you couldn't verify;
- the PME diff result;
- the paths.

A fresh tester then cold-reads your business edition.
