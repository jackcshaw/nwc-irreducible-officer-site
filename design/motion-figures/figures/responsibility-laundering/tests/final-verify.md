# Responsibility laundering: final verification

October 28, 2026. Report only: nothing in the figure was edited or committed.

**Method.** I served `design/motion-figures/` on 127.0.0.1:5311 and used Playwright 1.63 from the site-motion `node_modules` at 1440×900, 1280×720 and 390×844. I held moments with `?t=` and swept the whole timeline in 0.1 s steps through the runtime's `seek` hook. At each step I measured text and mark overlaps, the controls' offset, the caption band's height and any caption clipping. The rendered font sizes, the poster (with autoplay blocked and on a normal load) and the final-frame text came from the live page. At 1440 and 1280 the drawn SVG stage is shown (scale 1.081 and 0.911). At 390 the stacked text stage takes over.

| # | Item | Result |
| --- | --- | --- |
| 1 | Split dot | **PASS** (drawn stage); weak at 390 |
| 2 | Caption 7 and page copy | **PASS** |
| 3 | No overlaps at 390 px | **PASS** |
| 4 | Reading pace | **FAIL**: beats 1, 2, 5, 6 |
| 5 | What faculty see | **PASS** |
| 6 | Final frame | **PASS** |
| 7 | Consistency | **PASS** |

## 1. The split dot: PASS (1440, 1280), weak at 390

- **Drawn stage, 69.4–70.6 s.** The first student's dot shrinks from r 5 to r 3.5, and a second r 3.5 dot separates from it. At 69.7 s they are two dots stacked 9 units apart. The second dot travels up the margin to (82, 180), beside the outlined "The analysis" on the first copy. Over 70.0–70.6 s it turns into a hollow grey (#5b564f) dashed ring at r 7. Each half is a whole smaller circle, not a semicircle, but the dot visibly splits in two.
- **Key.** "REASON HANDED TO THE AI" with a dashed ring fades in at 70.2–70.6 s, at every viewport.
- **Second student's dot.** It stays r 5 throughout.
- **Final frame (89.9 s).** The ring and the half dot remain, and the weight rests on the half dot.
- **390 caveat.** On the stacked stage the half doesn't travel. The signature dot scales to 70%, and the ring fades in place before "The analysis" (`renderNarrow`, `responsibility-laundering.js` lines 510–512). It is legible, but nothing visibly moves to the phrase.

## 2. Caption 7: PASS

- **Caption.** It renders "The first gives the AI's reason. The second gives their own." (JS line 554; checked on screen at 70.4 s at all three widths).
- **Page copy.** `index.html` line 105 contains "Both answer for the call. Only the second can say what it rested on."
- **Wording.** The word "right" doesn't appear in the page or the JS. The only "wrong" phrasing is "proves wrong" / "prove wrong".

## 3. No overlaps at 390 px: PASS

The sweep found no text-on-text or mark-on-text overlap at 390 except planned crossfades: the draft card over the copies during the divide (13.5–14.5 s), and "Faculty don't see this" replacing the "—" at 38.9–39.4 and 66.0–66.6 s.

- **"FACULTY DON'T SEE THIS" (39–66.5 s).** It spans x 29–185 px, in the first student's cell. The note spans x 199–361 px, so they don't share any horizontal space.
- **"WHAT FACULTY SEE" (x 34–167, y 642–658).** It is also clear of the note.
- **Note and frame.** The note's last line, "normal.", clears the frame's top edge by about 3 CSS px. Tight, but clear.
- **Weights, 77.5–80.8 s.** The falling navy marker has no text, and "Answerable" appears only as the chip in the signature row. Neither touches "The analysis". The marker passes over the grey ring for about 0.5 s (77.5–78.0 s) as designed.
- **Desktop note (outside this item).** At 1440 and 1280 the first weight's "ANSWERABLE" label passes under the grey ring for about 0.3 s (77.9–78.2 s). Hanging at 75–77.5 s, the weight sits 3 units from the "The analysis" outline without touching it.

## 4. Reading pace: FAIL

The rule checked: beat length ≥ (caption words + on-screen words to read) ÷ 3 + 1.5 s. Timings are from `T`/`BEAT_AT` in the JS, which match the storyboard. On-screen word counts follow the storyboard's pacing table, or my count where noted.

| Beat | Span (s) | Length | Caption | On screen | Needed | Result |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 0.0–6.4 | 6.4 | 6 | 13 (task card 9, two names 4) | 7.8 | **FAIL, 1.4 s short** |
| 2 | 6.4–18.4 | 12.0 | 13 | 23 (draft 16, key 3, tags 4; 31 counting tags in full) | 13.5 | **FAIL, 1.5 s short** |
| 3 | 18.4–25.6 | 7.2 | 7 | 0 | 3.8 | pass |
| 4 | 25.6–37.9 | 12.3 | 14 | 18 (key 3, note label 6, note 9) | 12.2 | pass (0.1 s spare) |
| 5 | 37.9–52.2 | 14.3 | 6 | 37 (two overlays 7, Q1 10, answers 11 + 9) | 15.8 | **FAIL, 1.5 s short** |
| 6 | 52.2–65.0 | 12.8 | 4 | 35 (Q2 7, answers 8 + 20; storyboard says 34) | 14.5 | **FAIL, 1.7 s short** |
| 7 | 65.0–74.0 | 9.0 | 11 | 5 | 6.8 | pass |
| 8 | 74.0–82.7 | 8.7 | 13 | 1 | 6.2 | pass |
| 9 | 82.7–89.9 | 7.2, then rests | 8 + 12 | 2 | 8.8 | pass only because the player rests on this frame (the move line has 4.3 s before 89.9 and needs 5.5 s) |

- **Total.** 89.9 s, shown as 1:29. Within 88–90 s.
- **Cause.** The storyboard budgets words ÷ 3 ≤ beat length (beats 1, 2 and 5 sit at exactly 3.0 words a second). It measures the 1.5 s hold after the last motion instead of adding it to the reading time.
- **Cost of fixing.** Lengthening beats 1, 2, 5 and 6 adds about 6.2 s (about 96 s in all). To stay near 90 s, that time has to come out of beats 3, 7 and 8, which together have about 8 s spare in reading terms, or words have to be cut.
- **Beat 1 is sensitive to counting.** With only the caption and the task sentence (13 words), it needs 5.8 s and passes.

## 5. What faculty see: PASS

- **Note row.** It dims to 20% at 38.9–39.4 s, with "FACULTY DON'T SEE THIS" at its right (desktop) or in the first student's cell (390).
- **Frame.** The frame round both copies draws at 39.5–40.1 s, and "WHAT FACULTY SEE" appears at 39.9–40.3 s. Both stay through question 1 (40.5 s), question 2 (53.5 s) and every answer, and fade at 66.0–66.6 s.
- **Inside the frame.** The only red is each student's own signature and dot. The note is in its own dimmed row above the frame.
- **Below the frame.** The first-person answers and the red speaker names sit in speech panels below the frame, under the question line, never on a copy. The bracket is inside the second speech panel and appears only at 71.2 s.

## 6. Final frame: PASS

At 89.9 s the caption shows "Faculty check", "Who owns the recommendation if it proves wrong?" (verbatim), and then "Name one way it could prove wrong. Ask why they relied on it." The second line has the class `mf-follow is-equal` and the same size and style as the check: 30 px italic at 1440 and 1280, 20 px italic at 390, at opacity 1. The page's Faculty check section sets both lines as `.fig-check`.

## 7. Consistency: PASS

- **Poster.** It shows before play: scrub 6.38 s, "1 / 9 Two students get the same task.", the task card and both labelled dots, at all three widths. It shows both with autoplay blocked and on a normal load, where the shot starts below the fold.
- **Names.** "First student" and "Second student" are red (#b81b2b) in the SVG dot labels and speech panels, and on the 390 stacked stage.
- **Label sizes at 1280×720.** The smallest SVG label renders at 11.84 px (13 units × 0.911), and the smallest HTML text at 12 px (the "5 / 9" counter). No SVG text is hidden by `legibility`.
- **Controls at 390×844.** The controls stay 722.6 px from the figure top across the full 0.1 s sweep and during real playback from seven start points. The caption band is a fixed 160 px, with no clipping in any beat. The stacked stage is a fixed 560 px.
- **Setup.** No "pause" anywhere in the page or the JS.
