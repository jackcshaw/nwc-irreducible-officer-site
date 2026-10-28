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

## Re-verify

October 28, 2026. Report only. I appended this section and didn't edit anything else.

**Method.** I served `design/motion-figures/` on 127.0.0.1:5341 (stopped afterwards) and used Playwright 1.63 at 1440×900 and 390×844. Beat times are from the live runtime (`__motionFigures[...].beats`, `duration`), and they match `T`/`BEAT_AT` in the JS and the storyboard. For each beat I swept 0.1 s steps and collected every text item that became readable (effective opacity ≥ 0.5, typed words included), in the SVG at 1440 and in the stacked stage at 390. The word counts are from that rendered text, not from the storyboard table. At 390 I tracked the half dot every 0.1 s (0.02 s where it meets the text) and took screenshots at 3× and 4×. I ran a full 0.1 s overlap sweep (930 steps) and checked the final frame by seek, by `?t=92.9` and with reduced motion.

| # | Item | Result |
| --- | --- | --- |
| 1 | Reading pace | **FAIL, narrowly: beat 2 at 390 only** (0.17 s short). Desktop passes every beat. |
| 2 | Split dot at 390 | **PASS** |
| 3 | No overlaps at 390 (spot check) | **PASS** |
| 4 | Final frame | **PASS**, unchanged |

### 1. Reading pace: desktop PASS, 390 FAIL on beat 2

The rule: beat length ≥ (caption words + new on-screen words) ÷ 3 + 1.5 s. I used the storyboard's counting rule: repeated names aren't counted, question numbers aren't counted, and the two copy tags count once. A note row that only returns from 20% (beat 7) isn't counted as new.

| Beat | Span (s) | Length | Caption | On screen (as rendered) | Needed | Spare |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 0.0–7.4 | 7.4 | 4 | 13 (task card 9, two names 4) | 7.17 | +0.23 |
| 2 | 7.4–19.4 | 12.0 | 10 | 20 at 1440 (draft 16, tags "copy · drafted with AI" 4); 22 at 390 (draft label "One AI draft" 3, draft 16, card tag "Drafted with AI" 3) | 11.50 at 1440; 12.17 at 390 | +0.50 at 1440; **−0.17 at 390** |
| 3 | 19.4–26.6 | 7.2 | 7 | 3 (key) | 4.83 | +2.37 |
| 4 | 26.6–38.9 | 12.3 | 14 | 18 (key 3, note label 6, note 9) | 12.17 | +0.13 |
| 5 | 38.9–53.5 | 14.6 | 4 | 34 (overlays 4 + 3, Q1 8, answers 10 + 9) | 14.17 | +0.43 |
| 6 | 53.5–67.1 | 13.6 | 3 | 33 (Q2 6, answers 8 + **19**) | 13.50 | +0.10 |
| 7 | 67.1–75.3 | 8.2 | 11 | 5 (key) | 6.83 | +1.37 |
| 8 | 75.3–84.0 | 8.7 | 13 | 1 ("Answerable") | 6.17 | +2.53 |
| 9 | 84.0–92.9, then rests | 8.9 | 8 + **13** move line | 2 ("Faculty check") | 9.17 | −0.27 before the rest; passes because the figure stops on this frame |

- **Total.** 92.9 s, shown as "1:32" (the runtime floors seconds). This matches the expected 93 s.
- **Beat 2 at 390.** The stacked stage labels the draft "One AI draft" (fades in 8.8–9.3 s) on top of the card tags, so the beat carries 32 words, not the desktop's 30. It needs 12.17 s against 12.0 s.
- **Storyboard miscounts.** The second student's answer 2 is 19 words, not 18. Beat 6 still passes, with 0.1 s spare. The move line "Name one way it could prove wrong. Ask why they relied on it." is 13 words, not 12. With 13, beat 9's timed 8.9 s is 0.27 s short. The move line alone gets 6.0 s (86.9–92.9) against the 5.83 s it needs, and the player then rests on the frame, so nothing is cut off.
- **Sensitive to counting.** Beat 2 at 1440 fails if both tags are counted in full (38 words, 14.17 s needed). Beat 5 at 1440 fails if the speech panels' "First student" / "Second student" headers are counted (42 words, 15.5 s needed). The 390 panels have no headers.
- **No truncation.** All 19 words of the long answer render on its three lines at 1440. They render whole at 390 too.

### 2. Split dot at 390: PASS

- **71.3–71.5 s.** The first card's signature dot scales to 70% (7 → 5 px), and a second 7 px red dot separates from it. At 71.5 s the two are stacked.
- **71.5–72.5 s.** The half travels about 118 px up the card's left edge, from (24.9, 151.3) to (10, 33) in card coordinates. It passes "for ships.", "It is recommended" and "estimates ships can" on the way, which is visible in every frame.
- **71.9–72.5 s.** On the way it grows to 12 px. The red fill fades out and a dashed rgb(91, 86, 79) border fades in.
- **Where it ends.** It settles as a hollow grey dashed ring at x 4–16, y 27–39. That is 6 px left of the outlined "The analysis" (x 22–99.6, y 23.6–40.6) and centred on its line.
- **Key and final frame.** "Reason handed to the AI" fades in at 72.1–72.5 s. The ring stays to 92.9 s.
- **Minor.** At 71.68–71.86 s the red half passes behind the left edge of row 2's beige band ("that civilians wait", "for ships."), so up to about 5 of its 7 px are hidden for about 0.2 s. It covers no glyph, because the rows paint above it.

### 3. No overlaps at 390: PASS (spot check)

The full sweep found no text-on-text or mark-on-text overlap except planned crossfades:

- **Divide (14.5–15.5 s).** The draft lies over the cards.
- **Note row (40.0–40.3 and 68.2–68.6 s).** "Faculty don't see this" lies over the "—".
- **Half dot (71.7–71.8 s).** The box test also flagged the half's tuck behind the row 2 band, described in item 2.

Across the whole sweep, the controls stayed 722.6 px from the figure top, the caption band never clipped, and nothing overflowed the stacked stage. I didn't test mark-on-mark (the falling weight over the ring, which the first report recorded as designed).

### 4. Final frame: PASS, unchanged

At 92.9 s (by seek, by `?t=92.9` and with reduced motion), at both 390 and 1440, the caption reads as follows:

- **Label.** "Faculty check", in IBM Plex Mono 13 px.
- **Check.** "Who owns the recommendation if it proves wrong?", verbatim.
- **Follow-up.** "Name one way it could prove wrong. Ask why they relied on it.", with the class `mf-follow is-equal`.
- **Size and style.** The check and the follow-up are both Source Serif 4, italic, weight 400 and opacity 1: 20 px at 390 and 30 px at 1440. The caption is not clipped.

At 390 the stacked stage shows the following:

- **Marks.** The dashed ring, the first student's dot at 70%, both "Answerable" chips, and the note.
- **Words.** All four answers and both questions.
- **Annotations.** Both "The analysis" outlines, the bracket mark, and all three key entries.
- **Gone.** The frame and "Faculty don't see this".
