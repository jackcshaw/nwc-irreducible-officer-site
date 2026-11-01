# Verify: responsibility laundering, business edition, final fixes

I checked the fixes requested in `business-figure-read-2.md` against the intent in `storyboard-business.md`, at commit 4bb58a2.

**Setup.** I served `motion-figures/` on 127.0.0.1:5261 and loaded `figures/responsibility-laundering/index.html?edition=business`.
- **Real-time runs** at 1280×900, 1280×720 and 390×844. Frames came from a CDP screencast, with a DOM probe every 0.5 s of wall time. Each run scrolled the figure fully into view and autoplayed through to Replay.
- **Deterministic sweeps** every 0.1 s at all three sizes, using the player clock (`__motionFigures` seek). I used these for the pacing numbers.
- **Held stills at 2×** around the landing and the final frame.

Times below are on the player clock: figure time plus the 3 s name card.

Scripts, frames and logs are in my scratchpad folder `rl-business-verify/`.

## Verdict

| Item | Result |
| --- | --- |
| 1. Split dot no longer reads as shared responsibility | **Pass** |
| 2. Source line carries the case context, is legible at 390, holds | **Pass**, with a minor defect at 390 (below the fold) |
| 3. "agents, servants, or representatives" attributed as the tribunal's summary | **Pass** |
| 4. Pacing: (words ÷ 3) + 1.5 s; run about 100 s | **Pass** |
| No personal legal exposure or legal advice | **Pass** |
| No horizontal scroll at 390 | **Pass** |
| No console errors | **Pass** |
| Reduced motion shows the final frame with full text | **Pass** |
| PME unchanged; its dot stays as before | **Pass** |

## 1. The split dot

The first weight lands at 86.0 s. Here is the first analyst's signature dot at each size, measured against the second analyst's:

| Viewport | Before 86.0 s | During the landing | After |
| --- | --- | --- | --- |
| 1280×900 | r 4 (8.7 px) against r 5 (10.8 px) | r 4.18 at 86.2 s | r 5 (10.8 px) from 86.7 s to the end, equal to the second |
| 1280×720 | 6.8 px against 8.5 px | | equal (8.5 px) by 86.5–87.0 s |
| 390×844 | scale 0.75 (5.25 px against 7 px) | 0.83 at 86.1 s, while its "Answerable" chip fades in | 1.0 (7 px) at 86.6 s, with the chip fully in |

The first weight now rests at the same height as the second. The 2× stills at 85.0, 86.0, 90.0 and 99.6 s show a small dot under the falling weight, then a whole dot under the landed weight, matching the second analyst's.

The grey ring stays the whole time:
- On the drawn stage it is a dashed grey ring (r 9, stroke opacity 1) beside "The analysis estimates", from beat 7 to the end and in the final frame.
- At 390 it is 14 px.
- The key "Reason handed to the AI" is on screen from 76.2 s to the end at every size.

Nothing on screen now suggests the first analyst carries less when "Answerable" lands.

## 2. The source line

**Wording:** "Related case: Moffatt v. Air Canada (2024), where a company was held responsible for its chatbot's answer." It gives the case context without implying the case is about staff signing AI memos.

**Drawn stage:**
- Three right-aligned italic lines at the top right, clear of the task card. They fade in at 92.8–93.3 s and stay through the final frame and the rest.
- At 1280×900 the text is about 14 px.
- At 1280×720 it is about 11 px. That is the runtime's legibility floor, and it is readable in the frames.

**Hold:**
- The line never leaves the screen, so it passes the per-item rule.
- Measured only up to the moment Replay appears, it is fully visible for 6.3 s (93.3–99.6 s). The rule asks for 7.2 s at 17 words, or 6.8 s at the storyboard's 16.
- The storyboard's claim of "reading time plus 1.5 s by 96.6 s" counts from the start of the fade. This is minor, because the final frame rests and nothing replaces the line.

**390 (minor defect):**
- It is one two-line paragraph in 14 px navy italic under the controls. It is static from page load, so it holds trivially, and it is legible.
- At 390×844 it is partly or wholly below the fold whenever the whole player is on screen:
  - with the name plate at the top of the viewport, the controls end at 821 px and the line spans 829–868 px (the fold is at 844);
  - with the player centred for autoplay, it spans 841–880 px, so it is off screen from 0 s through the final frame.
- A phone viewer sees it only after scrolling about 25–40 px.
- This is cold read 2's problem 6, unchanged. The reduced view at 390 shows it in place under the controls.

## 3. Attribution

The rendered page reads: "The tribunal summed up the airline's position: "Air Canada argues it cannot be held liable for information provided by one of its agents, servants, or representatives – including a chatbot." It went on: "In effect, … This is a remarkable submission." (para. 27)". That presents the words as the tribunal's summary of Air Canada's argument, not as Air Canada's own words.

## 4. Pacing

**Run length:** 99.6 s on the player clock (readout 1:39). The figure's own clock is 96.6 s.

**Wall-clock timing:**
- At 1280×720 and 390×844, playback held to the wall clock: Replay appeared 100.0 s after the scroll.
- At 1280×900 the run took 107 s, because the machine was heavily loaded (load average 8–12). The runtime caps each frame's time step at 0.1 s, so under load the figure plays slower. Holds get longer, never shorter.

**Captions** (identical at all three sizes):

| Caption | On screen | Needed |
| --- | --- | --- |
| Beat 1 | 7.2 s | 2.8 s |
| Beat 2 | 10.4 s | 4.8 s |
| Beat 3 | 7.1 s | 3.8 s |
| Beat 4 | 12.1 s | 6.2 s |
| Beat 5 | 12.4 s | 3.2 s |
| Beat 6 | 13.4 s | 2.8 s |
| Beat 7 | 14.3 s | 5.2 s |
| Beat 8 | 8.1 s | 5.8 s |

The final caption arrives at 89.7 s and rests. Its follow-up line arrives at 92.4 s.

**On-screen text:** every item stays at least its required time, or stays to the end. The items that leave the screen:

| Item | On screen | Needed |
| --- | --- | --- |
| Analyst labels | 17.2 s | 2.2 s |
| Note row, first appearance | 8.5–8.8 s | 3.2 s |
| "The manager doesn't see this" | 26 s | 3.2 s |
| "What the manager sees" | 25 s | 2.8 s |

Two apparent exceptions, neither a real loss:
- The large name card is up for 2.6 s against 3.8 s needed. The name carries on in the corner plate, which is the runtime standard in all eight figures.
- At 390, the draft's second line is on the central sheet for 2.3 s before the sheet divides. The same line carries on in both copies to the end.

**Storyboard per-beat rule,** using its own counting conventions (repeated text, names and question numbers aren't counted): beats 1–8 meet it. Beat 9 is the final frame and rests.

## Also checked

**Legal reading:** Pass.
- The page says "answer for it" means "inside the organization, to the manager and the company" and that the figure "makes no claim about anyone's personal legal liability".
- It says the order was against the airline, the case "says nothing about employees signing an internal recommendation", and the record is one small-claims decision.
- Nothing gives advice.
- The in-figure source line now names the company, not individuals, as the party held responsible.

**Horizontal scroll at 390:** none. `scrollWidth` was 390 at 12 seeked moments from 0 to 99.6 s, and on every 0.5 s tick of the real-time run. No element extends past the viewport.

**Console:** no errors or page errors in any run: three business runs, the PME run, the sweeps, the reduced-motion loads and the frame-diff.

**Reduced motion:** Pass.
- I checked `?reduced` at 1280×900 and 390, and `prefers-reduced-motion` at 1280×900, 1280×720 and 390.
- All open at 1:39 / 1:39, on the final frame.
- The caption shows the name, the definition, the check and the follow-up line, all at full opacity.
- The source line shows on the stage, or under the controls at 390.
- Both dots are full size, and the ring and both "Answerable" tags are present.
- The beat list has 10 entries, each with its "On screen" detail.

**PME:** Pass.
- The frame-diff against `regression/baseline` matched on all 209 captures: every beat at three sizes, plus the reduced, print and full-page views.
- A real-time PME run at 1280×900 autoplayed through to Replay at 1:36.
- The first student's dot stays a half (r 3.5 against 5) from about 79 s to the end, as before, and there is no source line.

## Observations outside the fixes

- **Edition fallback.** On my first load, under heavy machine load, `?edition=business` rendered the PME edition: the military scenario, students and "Faculty check", ending at 1:36. The runtime abandons an edition fetch after 2.5 s and silently falls back to PME. A business reader on a slow connection would get the military edition. This is runtime-wide, not specific to this figure, and worth a decision. My scripts reloaded until the right edition loaded; the later runs needed no retry.
- **Still open from cold read 2, as planned:**
  - the poster still reads 0:10 before autoplay;
  - the switch link still says "PME", and the meta description still says "A teaching figure" (left for the eight-figure sweep).
