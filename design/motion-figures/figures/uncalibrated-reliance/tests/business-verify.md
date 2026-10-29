# Verify: uncalibrated reliance, business edition, round 3 fixes

**Verifier:** not a cold reader. I checked the fixes requested in `business-figure-read-2.md` against the intent in `storyboard-business.md` (Otis et al. 2026: equally confident advice on a two-part plan, with Part 2 resting on records the AI never had; the panel shows the study's split without mapping it onto the owners and without claiming that the study measured checking).

**Build:** commit `50d471e` plus the uncommitted working tree as served. Another session has uncommitted changes in progress to the edition gate: `runtime/motion.js` and `runtime/figures.css` are modified, and the `<head>` snippet in `index.html` is staged. Served on 127.0.0.1:5371, now stopped.

**Method (Playwright, Chromium 1.63):**
- **Real-time runs.** Business at 1280×900, 1280×720 and 390×844, plus PME at 1280×900. Each time I wheel-scrolled the player fully into view, let it autoplay (autoplay started within 5 ms every time) and took a viewport frame every 0.5 s through 1:33.
- **Real-time stalls.** Headless screenshots stalled now and then, and the rAF clock caps each step at 0.1 s, so the clock fell up to 2.5 s *behind* wall time. Real-time playback therefore ran slower than designed, never faster.
- **Exact frames for timing and content.** Seek frames every 0.5 s across 0–93.6 s at all three sizes (188 per size).
- **Seek pass for reading time.** Every 0.1 s I logged the effective opacity of every SVG text and every stacked-stage text, and the caption.
- **Other checks:** DPR-2 crops; laptop and reduced-motion checks; an overflow scan at 390; PME `frame-diff.mjs` against `regression/baseline`; the Crossref abstract.
- **Scripts and frames:** session scratchpad, `ur-biz-verify/`.

Times below are on the player clock (figure clock + 3.0 s), as the readout shows them.

## Verdict

| # | Item | Result |
|---|---|---|
| 1 | Part 2's logic is decisive and coherent | **Pass** |
| 2 | Desktop panel: "not these owners", revenue and profit, scene dimmed | **Pass** |
| 3 | Beat 7: frontier draws as its caption lands, holds before the dim | **Pass** |
| 4 | Sources: every claim names its version; "over 0.20 SD" checked | **Pass** (one wording risk) |
| 5 | Pacing: (words ÷ 3) + 1.5 s for every caption and new text | **Pass** (thin margin on the panel as a block) |
| — | Picture shows at 1280×720 and 1366×657 | **Pass** |
| — | No horizontal scroll at 390; no console errors | **Pass** |
| — | Reduced motion: final frame, full text | **Pass** |
| — | PME still plays | **Pass** |

**New defect (minor, not on the fix list):** "FROM THEIR FLYER" overruns the AI's Part 2 card. Its bounding box ends at x = 623.4 against the card edge at 622, so the final "R" sits on the border line. It shows from 53.5 s to the end at every desktop size (seen at 1280×900, 1280×720 and 1366×657). PME's "CAPACITY" ends at 556.6, so only business is affected. Fix: use the phone's shorter "THEIR FLYER", or tighten the gap or letter-spacing.

---

## 1. Part 2's logic: pass

What the reader sees in beat 6, 1280×900:
- **The task:** "Part 2 · Win back customers".
- **Rival's flyer:** "THEIR OFFER / Cheaper prints".
- **Sales records:** "OUR SALES / Lost: rush jobs / *(not given to AI)*".
- **The AI's answer:** "Win them back: loyalty discount".
- **The second plan:** "Win them back: ~~loyalty discount~~ same-day service".

Beat 7's caption is "Part 2 depends on why customers left." In beat 9 the second owner says "Our records. Rush customers left in blackouts." The phone has "Sales records · lost: rush jobs." and "Our records: we lost rush jobs."

- **Can a business reader see why the suggestion misses and what's better? Yes.** The records name the customers who left: rush jobs.
  - Rush customers pay for speed, not price. A loyalty discount is a price lever and targets the wrong customers.
  - Part 1's task, "Keep printing in blackouts", supplies the link: a shop that can't print in a blackout can't do rush work. That makes "same-day service" the fitting move, and Part 1's battery makes it possible.
  - The decisive fact sits in the one document the AI never got.
  - Round 2's gap is closed: "Mostly same-day" described the customers who stayed, while "Lost" describes the ones who left.
- **Anything contradictory? No.** "Lost: rush jobs" and "same-day service" now point the same way. "Cheaper prints" is what the rival advertises, not the reason this shop lost customers, which is the whole point.
  - Two softer spots, neither a contradiction:
    - The blackout cause is stated only in beat 9's speech (desktop) and on the page. Phone readers never see "blackouts" tied to the lost customers in the animation, so they must infer it from the task.
    - "Same-day service" doesn't say "even in blackouts", so the link to Part 1 is left to the reader.
- **First owner reasonable, not careless? Yes.** They check Part 1 against both quotes. They accept a modest, ordinary suggestion (no 20% cut any more), and their stated reason, "Part 1 checked out, so I trusted the rest", is a reasonable person's mistake.
- **Is the AI's suggestion sound given what it was told? Yes.** It was told to win back customers and shown a flyer offering cheaper prints. A loyalty discount is a sensible, measured answer, and "FROM THEIR FLYER" shows where it came from. The AI isn't careless. It just lacked the records.

## 2. Desktop panel: pass

At 1280×900 and 1280×720 the panel is up from 62.9 to 72.2 s:
- the heading "A REAL STUDY, NOT THESE OWNERS" over the title "Revenue and profit";
- **Weaker businesses:** a solid bar left of zero, "nearly 10% worse";
- **Stronger businesses:** a light dashed bar right of zero, "may have gained over 15%", with "LESS CERTAIN" under it;
- **Source:** "OTIS ET AL. (2026) · KENYAN ENTREPRENEURS · MANAGEMENT SCIENCE".

**It doesn't read as the two owners' rows:**
- the rows are businesses, not people;
- they're stacked top and bottom, while the owners are left and right;
- the zero line is centred under the AI's column;
- the heading denies the mapping outright.

**The scene dims to 10% opacity** (scene opacity 0.1 from 62.8 s). The plans, marks and owner labels show only as faint ghosts around the panel's edges. The phone panel carries the same heading and "Change in revenue and profit.", over a body dimmed to 15%.

The caption, "A real study suggests what mattered was which AI advice owners acted on.", is the study's finding in general terms. It doesn't name either owner.

## 3. Beat 7: pass

At 1280×900 (contact sheet `sheet-beat7.jpg`):

| Moment | Time (s) |
|---|---|
| Caption lands | 51.6–51.9 |
| "Lost: rush jobs" underlined | 52.6–53.1 |
| "loyalty discount" underlined, "FROM THEIR FLYER" | 53.3–53.8 |
| Frontier draws | 54.0–55.4 |
| "Inside / Outside the frontier" | 55.4–55.8 |
| Cards pulse together | 56.0–56.6 |
| Beat 8 caption | 61.4 |
| Dim begins | 62.4 |

- **The line draws as its sentence is read.** The first sentence (7 words) takes 2.3 s at 3 words a second, so a reader reaches "A jagged frontier…" at about 53.9 s, just as the line starts.
- **The finished frontier holds 6.6 s before the dim:** 5.6 s under its own caption, then 1.0 s under beat 8's. Its labels need 3.5 s and its sentence 4.8 s.
- **The phone matches:** the frontier row fades in over 54.0–55.4 s.
- **PME keeps its own timing:** labels at 58.7–59.1 s.

## 4. Sources: pass

- **"Over 0.20 SD" checked.** The Crossref record for doi 10.1287/mnsc.2024.06909 (published online July 10, 2026) has, word for word: "the effect for entrepreneurs who were low performing at baseline is over 0.20-standard-deviations lower than for initial high performers."
- **The page's other four published-abstract quotes also match Crossref word for word:**
  - "randomizing access to a GPT-4-powered AI business assistant";
  - the null-hypothesis sentence;
  - "nearly 10% worse… may have benefited by over 15%";
  - "does not appear to result from…".
- **Every claim names its version:**
  - Paragraph 1: "From the published paper's abstract".
  - Paragraph 2: "Also from the abstract". Its sentence about checking is labelled as the figure's reading, not the study's.
  - Paragraph 3: "the revised working paper on eScholarship (PDF created July 2024)", with page numbers.
  - Paragraph 4: "The same revised working paper". The exploratory reading is labelled exploratory, and the February 2024 version is named for its different explanation.
  - On screen: the panel names "Otis et al. (2026) · Management Science". The line under the final frame says "Otis et al. (2026) and its working paper".
- **Not re-checked:** the working paper's page citations. I didn't download the eScholarship PDF. An earlier copy in the scratchpad is a 919-byte HTML error page, and I didn't try to get around that.
- **Wording risk:** paragraph 3 says "the percentages convert that index into an 'equivalent' change… (p. 11)".
  - Read next to the panel, "the percentages" means the published 10% and 15%.
  - The working paper's own conversion on p. 11 gives about 8%, according to storyboard section 6, so a reader who opens p. 11 won't find 10%.
  - Suggested fix: "In the working paper, the percentages are…", or add "(about 8% there)".

## 5. Pacing: pass

These durations are measured from the seek pass, at opacity 0.5 or more.

**Captions.** Every caption clears (words ÷ 3) + 1.5 s, at desktop and phone sizes alike. The tightest is beat 7: 9.6 s on screen against 7.2 s needed. The rest:

| Beat | On screen (s) | Needed (s) |
|---|---|---|
| 1 | 8.4 | 6.2 |
| 2 | 6.8 | 3.5 |
| 3 | 7.3 | 5.5 |
| 4 | 7.0 | 4.8 |
| 5 | 7.1 | 5.2 |
| 6 | 10.8 | 5.8 |
| 8 | 9.3 | 5.8 |
| 9 | 15.8 | 7.5 |

The final caption (30 words) gets 6.5 s on the clock, then rests on the final frame indefinitely, so it passes.

**Texts that leave the screen:**
- "Owner": 14.0 s, against 1.8 s needed.
- "First owner" and "Second owner" dot labels: over 26 s.
- Working marks: written between 23.4 and 48.5 s, and up until the dim at 62.4 s.
- "FROM THEIR FLYER": 9.0 s, against 2.5 s needed.
- Frontier labels: 7.1 s, against 2.5 s needed.

**Panel texts:**

| Text | On screen (s) | Needed (s) |
|---|---|---|
| Heading | 9.3 | 3.5 |
| "nearly 10% worse" | 8.1 | 2.5 |
| "may have gained over 15%" | 7.4 | 3.2 |
| Source line | 9.3 | 4.2 |

Phone panel texts pass the same way. Everything else stays up to the end.

**Thin margin on the panel as a block.** If the panel is read as one block, it has 23 words without the mono source line, which needs 9.2 s, and it gets 9.3 s. With the source line it has 31 words, needing 11.8 s. With the caption read too, it has 36 words (without the source line), needing 13.5 s. That isn't a failure under the per-text rule, but it is the tightest moment in the figure.

## Mechanical checks

**Laptop picture: pass.** The SVG stage stays on (not stacked) at every moment sampled, in both editions:

| Size | Picture scale | 13-unit labels | Final caption band (content / box) |
|---|---|---|---|
| 1280×720 | 0.854 | 11.1 px | 143 / 143 px |
| 1366×657 | 0.848 | 11.03 px | 99 / 99 px |

The controls stay in view: their bottom edge sits at 701 of 720 px and 654 of 657 px. The real-time run at 1280×720 kept the same layout in all 193 frames.

**390 overflow and console: pass.**
- `scrollWidth` was 390 in all 191 real-time frames and all 188 seek frames.
- No element extended past the viewport at any of 47 moments checked.
- `scrollTo(200, …)` left `scrollX` at 0.
- No console errors or warnings and no failed requests, in any run or load.

**Reduced motion: pass.** Both emulated `prefers-reduced-motion` and `?reduced`, at 1280×900 and 390×844, open at 1:33 / 1:33 with the final frame:
- caption and follow-up line at opacity 1;
- every typed word fully drawn (0 partly drawn tspans);
- the owners' answers and the source line shown.

**PME: pass.** It autoplays and plays to 1:33 with no errors, in its own words and timing. `frame-diff.mjs` result: 206 of 209 frames are identical. Three 1440×900 frames (46.0, 50.0 and 51.6 s) differ by 7 pixels, each off by one colour level, inside one 6×17 px glyph box. That's antialiasing noise.

## Left as they were (not on this fix list)

- The flyer and records callouts stay at full strength while "THE REVIEWER SEES ONLY THE PLANS" is shown (cold read 2, item 6). The storyboard keeps them on purpose.
- On the phone, "Not given to the AI." still sits on its own line under both the flyer and records lines (item 5). The heading "Given the quotes and flyer" now disambiguates it.
- The page's edition switch still reads "PME" (item 9).
- With `keepB`, the "Second owner" label stays at home while its dot travels during beats 5–6 (about 36–50 s). That leaves a label with no dot beside it.
