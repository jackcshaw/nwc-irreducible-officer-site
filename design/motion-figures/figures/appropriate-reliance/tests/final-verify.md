# Appropriate reliance: final verification

October 30, 2026, against `motion-figures` at `7e607cb`. This report replaces the October 28 verification. I only reported: no figure or runtime file was edited.

**Method.** I served `design/motion-figures/` on 127.0.0.1:5373 and drove Playwright 1.63 (site-motion `node_modules`), running one browser at a time and closing it between viewports. The scripts and screenshots are in the scratchpad (`fv3-rl-ar/`: `ar.mjs`, `ar-real.mjs`, `ar-leak.mjs`, `ar-switch.mjs`, and `out/ar*/`).

- **Fast passes.** Every version was played at 1280×900, 1280×720 and 390×844 along three paths, 36 runs in all:
  - *own calls*: check Task A, then "Keep my check here";
  - *always check*: check Task B, then "Ask for a week to check both";
  - *never check*: skip, then "Rely on it, after a careful read".

  These runs used Playwright's fake clock, stepped in 1 s chunks with real pauses so scrolling can settle.
- **Real clock.** The phone verdict was replayed with real time in every version, in play and under reduced motion.
- **Times.** All times below are player time, which is figure time plus the 3 s name card. Question 1 is at 0:28 and question 2 at 1:31.

| # | Item | Result |
| --- | --- | --- |
| 1a | No answer reaches readers or the accessibility tree before a call | **PASS** (36 paths) |
| 1b | `?t=`, scrubbing, the beat list and reduced motion leak nothing | **PASS** |
| 1c | Gates and locks | **PASS** |
| 2 | At 390 the verdict shows after each call, PME included | **FAIL in PME** after the second call (play and reduced). Workplace, classroom and high school pass |
| 3a | Classroom: reads as a class project, "AI use allowed" shown before the first call | **PASS** at 1280×900 and 1280×720; **phone gap** at 390 |
| 3b | Stage labels 13 px or more at 1280×720 | **PARTIAL**: 21 of 28 labels at 13.23 px, 7 at 11.10 px (kept small by design) |
| 3c | High school: plainer task names | **PASS** |
| 3d | The switch's third link fits at every size | **PASS** |
| — | Switch text and `aria-current`, 390 scroll, console, reduced-motion text | **PASS** |

## 1. Leaks, gates and locks: PASS

**Before each call** (every version, every viewport, every path). At question 1, nothing that the call reveals is in:
- Playwright's `ariaSnapshot()` of `<body>`;
- `document.body.innerText`, which includes the SVG's text;
- the SVG's whole `textContent`;
- the shown parts of the stacked stage;
- the live region.

I checked for the frontier labels, 12.2 / 25.1 / 40%, 84.5 / 70.6, "rated higher", "deciding/key details", "key facts", "suggested call", "from the interviews", "leaves Task B unchecked", "no hidden facts / nothing hidden", "reasoning: reading", "looked complete" and "nobody checks". At question 2, none of the second call's answers appeared ("read it first / before it's built", "read-through / quick read only", "a week late", "launch slips", "misses the deadline", matches / differs / defensible, "tends to miss", the bar notes).

What the scan flagged at question 2 is first-call material, correctly shown by then:
- "The gap between the two AI groups is uncertain", from the screen-reader summary part 2 (business casts);
- the high-school note "Then nobody checks Task B".

**Hidden DOM.** The stacked stage builds its later phases with their text in place, but those phases are `display:none` (phase 2/3 parts) or `visibility:hidden` (the bar panel), and the whole stage is `aria-hidden`. So they never reach a reader, find-in-page or the accessibility tree. The SVG's answer text is truly absent until revealed.

**Reader routes** (`ar-leak.mjs`; 1280×900 and 390×844 in play, 1280×720 and 390×844 under reduced motion; every version):
- **`?t=`.** `?t=60`, `?t=115` and `?t=1:55` all hold at 0:28 with question 1 open: state `gate`, 7 beats locked, summary parts 2–3 hidden, 0 leaks.
- **Scrubber.** End, PageDown, eight ArrowRight presses, Shift+ArrowRight and a mouse drag to the far right all stay at 0:28 (`gate`, 0 leaks).
- **After call 1.** Pressing End during play stops at 1:31 (question 2), with 0 second-call leaks.
- **Beat list.** Locked beats show "Make your call to see this." and their buttons are disabled; force-clicking beats 5 and 10 changes nothing.
- **Reduced motion.** The figure opens on question 1, and End, arrows and beat 10 can't pass it. After call 1 it moves to the settled question 2, which scrubbing and beat 10 can't pass. After call 2 it shows the final frame, with the page copy unlocked and opened.

**Gates and locks** (every path):
- **Continue.** It is disabled until an option is chosen, at both questions.
- **Play at a question.** It shows "Make your call first, or skip this question." and stays at the gate.
- **Enter.** Enter on a chosen option continues.
- **Skip.** It records "No call made". The workplace verdict reads "FIRST DRAFT: NO CALL".
- **Unlocking.** "After you make your call" stays hidden, with the locked note shown, until both calls are made. It opens at the end.
- **Beat list.** It unlocks question by question: 7 beats locked, then 2, then 0.
- **Start over.** It re-locks everything: 7 beats, summary parts hidden, page copy hidden, live region emptied.

**Verdicts** (workplace / classroom / high school, at the end):
- Own calls: "YOUR CALLS · FIRST DRAFT: DIFFERS · LAUNCH PLAN [CASE WRITE-UP]: DIFFERS".
- Always check: "MATCHES · … DEFENSIBLE".
- Never check: "NO CALL · … MATCHES".

PME keeps "YOUR CALLS", as designed.

## 2. The phone verdict at 390×844: FAIL in PME

Measured against the top of the sticky caption band (the free view is above it). Real clock, own calls:

| Version | After call 1 (1:18–1:31) | After call 2, 1:45–1:50 | From 1:51 (the final caption grows) to the end and 1.5 s later |
| --- | --- | --- | --- |
| PME | both suggested calls in view (303–327, 333–403; band at 543) | "Rely on it · read it before it's built" in view (464–535; band at 543) | **Hidden.** The band rises to 461 and the suggested call stays at 464–535, under it. Nothing scrolls. PME has no verdict line, so nothing on screen answers the second call |
| Workplace | in view | in view (488–535) | At 1:51 both are briefly under the band. At 1:52 the page scrolls: the verdict line is at 402–453 and the suggested call at 170–217, band at 459 |
| Classroom | in view | in view | same as workplace |
| High school | in view | in view | same as workplace |

- **Reduced motion.** After call 2, PME's suggested call sits at 615–686 under a band at 461, so it is hidden. The business casts show the verdict line at 402–453 and the suggested call at 170–217.
- **Fast passes.** All three paths in PME end the same way (sug2 at 464–535, band at 461). Screenshots: `out/ar/pme-390x844-*-end.png` and `out/ar-real/pme-play-end.png`.
- **Cause.** `FOLLOW()` only adds the end-of-figure scroll when `NW.keyVerdict` exists (business), so PME never brings anything above the band once the last caption grows. The storyboard's "every business cast; PME has no verdict" describes this, but the bug the brief names is not fixed in PME.

## 3. Classroom and high school

**a. Class project, "AI use allowed" before the first call.**
- **On stage (both casts):**
  - "IF IT'S YOUR GROUP'S FIRST DRAFT" on each card;
  - "IF IT GOES STRAIGHT INTO THE CASE WRITE-UP" (question 2);
  - the key line "… CASE WRITE-UP: …";
  - "AI USE ALLOWED · TIME FOR ONE CHECK: WORK IT YOURSELF, THEN COMPARE".
- **Elsewhere.** The question 1 live prompt says "Your group may use AI", and screen-reader summary part 1 says "AI use is allowed in this class project". The check is "Instructor’s check" / "Teacher’s check".
- **1280×900.** The budget line is at y 633–651 at question 1, fully visible and in view. **PASS.**
- **1280×720.** At question 1 the compact stacked view shows it at 443–460, above the gate bar (screenshot `classroom-1280x720-own-q1.png`). **PASS.**
- **390×844 (phone gap).** At question 1 the line sits at 626–660 (high school 607–641), under the sticky caption and controls, whose band is at 601. A phone reader sees the cards and the options and can answer without it. Scrolling down shows it. Phone is secondary, so I note this rather than failing the item.

**b. Labels at 1280×720 (after question 1, the drawn stage at scale 0.8537).**
- **13.23 px:** the 15.5-unit labels (21 of 28 visible mono labels).
- **11.10 px:** 7 labels kept at 13 units, as `storyboard-business.md` documents ("all the room they have"):
  - the two READY tags;
  - "DEFENSIBLE · A WEEK LATE";
  - "SUGGESTED CALL · REASONED FROM THE RESULTS";
  - the verdict line "YOUR CALLS · FIRST DRAFT: … · CASE WRITE-UP: …";
  - the two bar notes.
- **Other casts.** Workplace and PME draw every mono label at 11.10 px, unchanged.
- **Verdict.** Strictly, "13 px or more" isn't met for those 7. The verdict line is the one that matters most when projected.

**c. High-school task names: PASS.**
- **Task A.** "Group shoe customers by how / they use the shoes." (classroom: "Segment the footwear industry market based on users.")
- **Task B.** "Use a spreadsheet and *interviews* to pick which brand to invest in." (classroom: "…insider interviews to pick the brand a clothing firm should back.")
- **Reasons and notes.** They are plain too: "THE KEY FACTS WERE IN THE INTERVIEWS / THE SPREADSHEET JUST LOOKED COMPLETE", "Nothing hidden: a weak answer shows when read.", "DO IT FROM THE INTERVIEWS, THEN COMPARE", "THEN NOBODY CHECKS TASK B", "TASK B: QUICK READ ONLY". The option labels match.

**d. Switch fit: PASS.**
- **Text.** "Workplace · Classroom · PME" sits on one line, 16 px tall, at every width tested (360, 390, 768, 1280, 1366 and 1440). "See this with:" is read but not shown at 480 px and below.
- **PME link.** Its right edge is at 344 of 360 and 374 of 390 (a 16 px gutter), 745 of 768, and 1160–1240 on laptops.
- **`aria-current="page"`.** It marks PME on PME, Workplace on workplace, and Classroom on both classroom casts.

## Also checked

- **Horizontal scroll at 390: PASS.** `scrollWidth` is 390 (and 360 at 360) in every version and path.
- **Console: PASS.** No errors or warnings appeared in any of the 36 fast runs, the real-clock runs, the leak routes or the switch loads.
- **Reduced motion: PASS for the text.** The final frame carries the full caption: name, definition, check label, question and follow-up. In business it also has "Change one condition, like details AI tends to miss, and ask again."
- **Laptop fit: PASS.**
  - **1280×720:** at the end, the stage (35–496), caption and controls (bottom 705) fit the 720 px window.
  - **1280×900:** the controls end at 828 (PME) or 894 (business).
- **Never autoplays: PASS.** It opens on question 1 and waits, even after a natural scroll into view (`RUNTIME-VERIFY.md`).
- **Observation (runtime, not this figure).** Under reduced motion, Start over animates the figure from 0:00. The runtime's restart calls `play()` without a reduced-motion check. See `RUNTIME-VERIFY.md`.

## Defects

1. **PME, 390×844, after the second call:** the suggested call ("Rely on it · read it before it's built") ends under the sticky caption band from 1:51 to the end, in play and under reduced motion. Nothing scrolls it into view (item 2).
2. **Classroom and high school, 1280×720:** 7 stage labels render at 11.10 px, under 13 px. They are kept at 13 units by design, the verdict line among them (item 3b).
3. **Classroom and high school, 390×844, question 1:** "AI USE ALLOWED" is under the sticky band when the question opens, so it isn't seen before the first call unless the reader scrolls (item 3a; phone, minor).

## Recheck (October 30, after the fixes and the 4.2 s name card)

**Build:** `d54d0cb` (which includes `279d728`). Served on port 5463 (stopped afterwards), one headless Chromium at a time, closed between viewports. The player clock is now figure time + 4.2 s:
- question 1 is at 0:29 (29.7 s);
- question 2 is at 1:32;
- the end is 2:02.

**Method.** I ran three kinds of pass:
- **Fast passes:** Playwright's fake clock, run along the three paths (own calls, always check, never check):
  - PME and classroom at 1280×720 and 390×844;
  - classroom and high school at 1280×720 for the text sizes.
- **Real clock:** PME at 390×844, in play.
- **Reduced motion:** a real `prefers-reduced-motion: reduce`, PME and classroom at 390×844.

Scripts: scratchpad `recheck-final/` (`ar.mjs`, `ar-sizes.mjs`, `card.mjs`).

| # | Check | Result |
|---|---|---|
| 1 | PME at 390×844: the answer to the second call is visible after it, in play and under reduced motion | **Pass** |
| 2 | Classroom and high school at 390×844: "AI use allowed" visible at question 1 | **Pass** |
| 3 | Classroom labels 13 px or more at 1280×720, the cost note excepted, and the cost note fits | **Pass** (one note) |
| 4 | Leak check: nothing in the accessibility tree before a call (`ariaSnapshot`), PME and classroom | **Pass** |
| 5 | The intro's "The skill" holds 2.17 s or more | **Pass** |

**1. PME's second call at 390×844.**
- **In play (real clock, own calls):**
  - 1:46–1:52: the suggested call "Rely on it · read it before it's built" is in view (464–535, band at 543).
  - At 1:52 the last caption grows (band at 461), and for under a second the call is under the band.
  - At 1:53 the page scrolls. The suggested call is at 164–235 and the key line at 420–453, both above the band at 459. They stay there to the end (2:02) and 3 s after it.
- **Reduced motion:** 0.6 s after call 2, the final frame shows the suggested call at 164–235 and the key line at 420–453, band at 459. They are unchanged at 2.5 s.
- **Fast passes:** all three PME paths end the same way (164–235, 420–453, band 459).
- **The other versions:** classroom ends with the verdict line in view, "Your calls · first draft: differs · case write-up: differs" (402–453), and the suggested call at 170–217. This held in the fast passes and under reduced motion.
- **Screenshot:** `out/ar/pme-real-end.png`.

**2. "AI use allowed" at question 1, 390×844.** The line reads "AI use allowed · Time for one check: work it yourself, then compare".

| View | Classroom | High school |
|---|---|---|
| First view, unscrolled (controls in the page flow) | 626–660, band at 670 | 607–641, band at 651 |
| Shot scrolled to 40 px from the top | 449–483, band at 493 | 430–464, band at 474 |
| Shot at the top of the window | 409–443, band at 453 | 390–424, band at 434 |

It is fully opaque in every view, and nothing needs a scroll.

**3. Classroom labels at 1280×720.**
- **Mono labels:** every visible one measures **13.23 px**, after question 1, at question 2 and at the end, on all three paths. The one exception is the cost note "DEFENSIBLE · A WEEK LATE" at **11.1 px**, by design. The high-school version matches.
- **Question 1:** at this size it shows the compact stacked view, where every text is 13 px or more.
- **The cost note fits:** its box is x 440.2–608.1, y 362.3–376.3, inside Task A's card (right edge 619.5, a margin of 11 px). It overlaps no other text; the "Rely on it · read it first" tag sits below it (screenshot `out/ar/classroom-1280x720-always-end.png`).
- **Note, outside the mono-label scope of the original item:**
  - some sans and serif stage text is still under 13 px at 1280×720 in both classroom casts;
  - the reader's choice chips ("Check this one", "You rely on it", "Rely on it, after a careful read", "Move my check here", "Ask for a week to check both") are at 11.1 px;
  - the bar rows ("Without AI", "84.5%", …) are at 11.95 px;
  - the italic notes ("No hidden facts: …", "Rated higher in quality, right or wrong") are at 12.81 px.

  Worth a decision if the casts are meant to be projected.

**4. Leaks.**
- **Question 1:** in PME and classroom, at 1280×720 and 390×844 on all three paths, nothing either call reveals appeared before call 1. I checked Playwright's `ariaSnapshot()` of `<body>`, `innerText`, the SVG's `textContent` and the live region (the word list from the October verification).
- **Question 2:** none of the second call's answers appeared before call 2. The scan's only hit in classroom was "the gap between the two AI groups is uncertain". That is screen-reader summary part 1 ("After the first question: …"), which is first-call material, correctly shown by then.

**5. The intro** (real clock, no input). "The skill" is fully opaque from the moment the shot is in view until the card moves:

| Version | 1440×900 | 390×844 |
|---|---|---|
| PME | 2.26 s | 2.26 s |
| Workplace | 2.25 s | 2.25 s |

The card is in its corner about 3.0 s after the shot comes into view. The question underneath stays live: state `gate`, 0:29.

The console showed 0 errors and 0 warnings on every load.
