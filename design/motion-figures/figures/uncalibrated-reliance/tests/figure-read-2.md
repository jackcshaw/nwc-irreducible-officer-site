# Cold read: uncalibrated-reliance, figure, round 2

Material: `figures/uncalibrated-reliance/index.html`, served locally on port 5311 and opened in Playwright Chromium. I watched the full run at 1280×900 and at 390×844 with the figure scrolled fully into view, so it autoplayed. I captured a frame every 0.5 s for 120 s (241 frames per viewport) and read them in order. I also held key moments with `?t=`, checked `?reduced` and emulated `prefers-reduced-motion`, and tested the controls by keyboard. I didn't open the storyboard, the other test files, the shots folder or any other figure before writing this. I checked the numbers against the source spine only after the read was written (section 7).

Measured run: 1:53 (113.2 s). Beats start at about 0, 7.7, 14, 24, 32, 40, 49, 57.5, 65.5, 76.5, 90.5 and 106.5 s.

## 1. Beat by beat (desktop first, mobile differences noted)

**1. "A student gets a two-part task." (0–7.7 s, 6 words)**
A task card writes in at the top left: "Part 1 · Ships needed a day / Part 2 · Ships the port takes a day". A red dot labelled "Student" appears at the bottom left. The card and dot are done by 4 s, and the last 3.5 s are a static, mostly empty stage. The meaning is clear: one task in two parts. The opening is slow.
*Mobile:* no student dot at all. The caption names a student and the screen shows only the task card above about 480 px of empty stage, for 8 s.

**2. "The student gives an AI four reports." (7.7–14 s, 7 words)**
Four tabs appear across the top: Aid report, Aid report, Port survey, Harbor log. The dot pulses, grey copies fly into a small stack, and the label "GIVEN TO THE AI" appears. Then 2 s static. I followed it, but the AI is never drawn as anything. "Given to the AI" labels a stack of cards, and the student doesn't visibly hand anything over (the dot pulses at the bottom left while the cards move at the top).
*Mobile:* the tags appear, then "GIVEN ALL FOUR REPORTS" floats on the right with nothing next to it for 3 s. No giving movement.

**3. "It answers both with equal confidence." (14–24 s, 7 words)**
The "AI'S ANSWERS" cards type in together: Part 1 "24 ships a day: 480 tons at 20 each", Part 2 "20 ships a day: 4 docks at 5 each". Both get an identical grey READY badge at the same moment. The two cards being identical in form and badge reads well as "equal confidence". All the motion is done by 19.8 s, and the last 4–5 s are static. This is one of the stretches that drags.

**4. "The student checks Part 1 against the two aid reports. It's right." (24–32 s, 12 words)**
The dot travels up to the first aid report, grey lines appear under it, the dot moves to the second, and the "FIRST STUDENT'S BRIEF" sheet appears with Part 1 in it and a red "✓ CHECKED". I followed it. The aid reports' contents are never shown, so "It's right" is something I take on trust. The "Student" label vanishes when the dot moves and doesn't come back.

**5. "Part 2 looks just as sure, so they use it as is." (32–40 s, 11 words)**
For about 3 s the only change is a slight swell of the READY badge on the AI's Part 2. I nearly missed it, and it's the only picture of "looks just as sure". Then Part 2 slides into the first brief, with a half-second where the moving copy overprints the original ("20 ships a day:ips a day:"). It's stamped "USED AS IS", and the dot returns to the bottom left. The point lands: the student checked one part and carried the other.
*Mobile:* nothing changes at all for the first 3.5 s.

**6. "Another student, with the same AI answers, checks each part at its source." (40–49 s, 14 words)**
A second dot labelled "Second student" and an empty "SECOND STUDENT'S BRIEF" appear on the right. The label fades within about 1.5 s, and from then on the two students are identical red dots told apart only by position. The dot visits both aid reports and Part 1 slides in, marked CHECKED. That repeats beat 4 almost move for move. The caption says "checks each part", but this beat shows only Part 1. Part 2 is the next beat.

**7. "That student checks Part 2 against the port reports, and corrects it." (49–57.5 s, 12 words)**
This is the crux, and it's the densest beat. Between about 50.5 and 54.6 s the dot opens the port survey ("4 docks, 5 ships each"), then the harbor log ("Dock 2: closed for repairs."). Part 2 slides into the second brief, "20" is struck to "15" and "4" to "3 open" in red, and it's marked CHECKED. That's five events in about 4 s. My eye had to jump from the top-right report boxes (11–12 px text) down to the brief. I could follow it on a second look at the frames. At real speed a first-time viewer could easily see the red correction without having read why. A 3 s hold follows. The arithmetic is consistent (3 × 5 = 15). "Port reports" is not a label on screen. The tabs say "Port survey" and "Harbor log".

**8. "The AI worked from capacity. Part 2 depends on what's open today." (57.5–65.5 s, 12 words)**
The AI's "4 docks at 5 each" is underlined and tagged "CAPACITY". Then the harbor log's "Dock 2: closed" is underlined and tagged "OPEN TODAY". I understood the contrast (standard figure against today's state). But the tag sits directly under "Dock 2: closed for repairs.", so the box literally reads "Dock 2: closed for repairs. OPEN TODAY". My first read was "the dock reopens today". On mobile it's worse because it runs inline in one sentence: "Harbor log: Dock 2: closed for repairs. OPEN TODAY". The beat ends with 2.8 s static.

**9. "A jagged frontier marks where an AI stops being reliable. It doesn't follow how tasks look." (65.5–76.5 s, 16 words)**
A zigzag line draws between the AI's Part 1 and Part 2 cards, labelled "INSIDE THE FRONTIER" above and "OUTSIDE THE FRONTIER" below, and the two cards' outlines darken. The picture matches the caption, and the two identical-looking cards on either side of the line show "doesn't follow how tasks look" well. The term arrives cold. Nothing earlier sets it up, and the figure never says why Part 2 is outside (it needs a second, time-sensitive source reconciled against the first). The drawing is done by about 68.5 s, and there are about 6 s static after that. *Mobile:* a wavy rule with "INSIDE THE FRONTIER ↑ / OUTSIDE THE FRONTIER ↓", then 8 s static.

**10. "In a field experiment, consultants with AI were right less often outside the frontier." (76.5–90.5 s, 14 words)**
The scene dims and a panel rises: "Right answers on a task outside the jagged frontier". For about 3 s it shows only the row labels (Without AI / With AI, TWO GROUPS) with no bars. Then the bars grow: Without AI "about 84.5%", With AI "60%" and "70%". A bracket note follows ("Graders still rated these higher in quality, regardless of correctness") and the source line "DELL'ACQUA ET AL. (2023) · BCG CONSULTANTS · HBS WORKING PAPER 24-013". Then a 7 s hold. The panel is clear and the hold is long enough to read it. The empty 3 s at the start is waste. "Two groups" is never explained. "Higher" than what is implied (than without AI) but not stated. The caption says "outside the frontier" as if that were a general result, while the panel title correctly says "a task".
*Mobile:* text rows instead of bars. The graders note runs straight into the source line with no space.

**11. "Faculty point to each part in turn and ask what justified relying on it." (90.5–106.5 s, 13 words)**
The panel goes. The CHECKED and USED AS IS stamps lift off both briefs in under half a second, the AI column and reports dim, and "FACULTY SEE ONLY THE BRIEFS" appears. Part 1 is outlined in both briefs and each student's speech box types "1 'The aid reports.'" Then Part 2 is outlined. The first student types "2 'Part 1 checked out, so I trusted the rest.'" and the second "2 'The harbor log. One dock is closed.'" This is the strongest beat: the contrast between the two answers makes the point without help. The stamps lifting off matters, because the first brief now looks as finished as the second. The caption doesn't mention it, though, and it happens fast enough to miss. Faculty are never drawn. "Point" is shown by the outline boxes.
*Mobile:* no outline boxes. Nothing on screen points, and the answers just fade in under "FACULTY SEE ONLY THE BRIEFS".

**12. Faculty check (106.5 s to end)**
The caption area becomes "FACULTY CHECK / What evidence justified relying on the system here?" with "Point to each part. Was the evidence about that part?" fading in about 3 s later. It holds about 3 s more and then stops, with the toggle reading "Replay". "The system" appears here for the first time. Everywhere else it's "the AI".

**Pacing and legibility verdict.** Every caption was on screen at least 6.3 s and none exceeds 16 words, so no caption changed before I could read it. Captions also change about 0.5 s before the related motion starts, which helps. The one place where movement outruns a first-time viewer is beat 7. Everywhere else the motion is easy to follow, and the problem is the opposite: holds.

**Stretches that drag** (static runs measured from frame differences, desktop):
- 0–7.7 s: an empty stage while one card and one dot appear (static 4.0–7.4 s).
- 19.8–23.8 s: the AI answers sit finished for 4 s.
- 40–49 s: the second student's Part 1 check repeats beat 4.
- 65.5–90.5 s: the longest low-motion stretch. The frontier hold is about 6 s, the panel is empty for about 3 s, and the panel hold is 7 s, so about 16 of these 25 s are static. On mobile, beat 9 alone is static for 8 s.

**To bring it to about 90 s** (about 23 s out):
1. **Merge beats 1 and 2** into one opening beat ("A student gives an AI a two-part task and four reports"), about 8 s instead of 14: **−6 s**.
2. **Trim beat 3's tail** from about 4 s static to about 1.5 s: **−2.5 s**.
3. **Compress beat 6.** Let the second student's Part 1 check happen in one move, or fold beat 6 into 7 ("Another student checks each part at its source: Part 1 holds, Part 2 doesn't"): **−4 s**.
4. **Merge beats 8 and 9**, or trim both. The capacity/open-today tags and the frontier line could share one beat with a single hold: **−5 s**.
5. **Beat 10:** start the bars as the panel lands (drop the empty 3 s) and cut the hold from 7 s to about 5 s: **−5 s**.
6. **Beat 5:** shorten the 3 s READY-pulse lead-in to about 1.5 s: **−1.5 s**.
7. **Give back about 1.5 s to beat 7** so the harbor-log line can be read before the correction lands: **+1.5 s**.

Net: about −22.5 s, giving roughly 91 s. I wouldn't cut beat 11 or beat 10's content. Beat 11 is the payoff, and beat 10 is the only evidence.

## 2. The point, in one sentence

Checking one part of an AI's answer and finding it right says nothing about another part that looks just as confident, because the AI can be reliable on one piece and wrong on a similar-looking piece. So the only fair check is to ask, for each part, what evidence the student actually relied on.

## 3. The question a teacher should ask afterwards

"Take each part of your answer separately. What did you check it against, and was that check about this part or a different one?"

## 4. The final frame alone

Mostly yes. Without the animation I see two briefs that look equally finished, except that the second has a red correction on Part 2. Between them is the AI's column split by a zigzag into "inside" and "outside the frontier", and under each brief is the student's justification. The first student's "Part 1 checked out, so I trusted the rest" next to the second's "The harbor log. One dock is closed" carries the idea on its own, and the faculty check question frames it. What it says to me: a finished artifact doesn't show which parts were verified; you have to ask, part by part.

The frame loses two things on its own. (a) The research evidence is gone. (b) "Dock 2: closed for repairs. OPEN TODAY" still reads as a contradiction. Also, "FACULTY SEE ONLY THE BRIEFS" sits directly under the dimmed AI column, so at a glance it can look like a caption for that column.

## 5. Problems, ranked

1. **Ambiguous label: "closed for repairs. OPEN TODAY".** (Confusion. Desktop and mobile; worst on mobile, where it's inline prose.) The tag means "this line is about what's open today", but it reads as "Dock 2 opens today", which inverts the fact the whole story turns on. A different wording ("WHAT'S OPEN TODAY", or placing the tag beside the box rather than under the sentence) would remove it.
2. **Beat 7 is the fastest beat and carries the crux.** (Too fast.) Two report reveals, a copy, two corrections and a stamp all happen in about 4 s, in small type in the top-right corner. A viewer can catch the red "15" without having read "Dock 2: closed for repairs." It needs 1–2 s more, or a short pause on the harbor-log line before the correction.
3. **Mobile picture often doesn't match the caption.** (Caption doesn't match picture.) Beat 1 names a student and no student appears. Beat 2's "gives" has no motion. Beat 5 shows nothing changing for 3.5 s. Beat 11's "faculty point to each part" has nothing pointing. Desktop shows all of these.
4. **Long static stretches** (drag): 0–7.7 s, 19.8–23.8 s, and especially 65.5–90.5 s, as listed above. A teacher watching passively may disengage just before the payoff.
5. **The stamps lifting off in beat 11 is easy to miss and unexplained.** (Ambiguous visual.) That change is what makes the first brief look as finished as the second, but it happens in under 0.5 s while the eye is on the fading panel, and the caption is about pointing.
6. **Fairness to the AI and the example's plausibility.** The AI was handed the harbor log and still answered from capacity. AI-savvy teachers may say a current model would catch "Dock 2: closed" and conclude the example is rigged. The beat 8 caption hints at why (it took the standard figure), but the figure never says why Part 2 sits outside the frontier. A line on what makes Part 2 harder (a second, dated source that overrides the first) would answer that objection. The evidence is from a 2023 study, and the figure applies it in the present tense.
7. **The research claim reads as more general in the caption than in the panel.** The caption says "consultants with AI were right less often outside the frontier"; the panel and the evidence note correctly say "a task". "Two groups" is unexplained. "Graders still rated these higher in quality" doesn't say higher than what.
8. **Two identical red dots.** After the labels fade (beat 4 for the first student, beat 6 for the second), the students are told apart only by position. That didn't trip me up, but it's an unnecessary load.
9. **Small inconsistencies.** The intro says "The figure runs about a minute and a half" but the timer reads 1:53. "Port reports" (caption 7) isn't a label on screen. "The system" (faculty check) appears for the first time at the end. Before autoplay the timer shows "0:07 / 1:53" with the thumb part-way along, then snaps to 0:00 when play starts. There's a brief text overprint when cards slide (beats 5 and 6). On mobile, the second student's Part 2 shows gapped placeholder text ("20 [gap] ships a day: 4") for about 1 s before the corrections fill in.
10. **The stakes are left implicit.** The figure never connects Part 1 and Part 2 (24 ships needed against 20, or really 15, the port can take). That's fine for the point about reliance, but a teacher may ask "so what did the error cost?" and the figure doesn't say.

Nothing seemed unfair to students. The first student's behaviour is shown as a reasonable shortcut, and their own words carry the lesson.

## 6. Mechanical checks

- **Reduced motion shows the final frame with the full text: yes.** `?reduced` at 1280 and at 390, and emulated `prefers-reduced-motion: reduce`, all open at 1:53 on the final frame with both faculty-check lines, both briefs, both students' answers, the AI column, frontier and harbor log. The beat list expands with "On screen:" descriptions. (The toggle reads "Play" there rather than "Replay"; harmless.)
- **Horizontal scroll at 390 px: none.** `scrollWidth` = 390 at t = 0, 20, 55, 70, 85, 100 and 113, and on `?reduced`. No element extends past the viewport.
- **Keyboard: yes.** Tab order is Judgment Lab, Essay, Practice, then Play/Pause, Restart, scrubber, beat 1–12 buttons. Space and Enter toggle play/pause (focusing the toggle scrolls the figure in and starts autoplay). Restart works with Enter. On the scrubber, the arrow keys step about 1 s, PageUp jumps about 10 s, and Home/End go to start and end. The focus ring is a 2 px navy outline. Enter on a beat button jumps to that beat.
- **Every number found in the source spine or the essay:** see section 7.

## 7. Number check (done after sections 1–6 were written)

Checked against `nwc-irreducible-officer-companion/sources/source-spine.md` ("Jagged Frontier And Uneven AI Capability", line 62; line 13; "Appropriate Reliance", line 57).

| Number or claim on the page | In the spine? |
|---|---|
| Without AI "about 84.5%" | Yes: "consultants without AI were right about 84.5% of the time" |
| With AI, two groups, "60%" and "70%" | Yes: "the two AI groups 60% and 70%" |
| "a task outside the jagged frontier" (panel title) | Yes: "On a task chosen to fall outside it" |
| "BCG consultants" | Yes: "758 BCG consultants using GPT-4" |
| "Dell'Acqua et al. (2023)", "HBS working paper 24-013" | Yes: "The working paper (HBS 24-013, 2023) is the source for these figures" |
| "Graders still rated these higher in quality, regardless of correctness" | Yes: "Graders still rated the AI users' recommendations higher in quality 'regardless of the correctness of their answer'" (also line 13: "AI users' wrong answers were rated higher in quality") |
| Evidence note below the figure: "19 percentage points less likely to produce correct solutions" | Yes, verbatim. The spine notes that the 2026 published version says "19% less likely", and the page correctly quotes the working paper. |
| "Raees & Papangelis, 2026" (essay quote below the figure) | Yes: Raees and Papangelis, *From Trust to Appropriate Reliance* (arXiv 2604.23896) |
| Task numbers: 24 ships a day, 480 tons, 20 each, 20 ships a day, 4 docks, 5 ships each, Dock 2, 15 ships, 3 open docks | Not in the spine, and they don't need to be. The intro labels the task, reports and students "a constructed example". They're internally consistent: 480 ÷ 20 = 24, 4 × 5 = 20, 3 × 5 = 15. |
| "Failure mode 4 of 7", "twelve beats", "Section II", "Section V" | Structural references, not evidence claims. Not checked against the essay, which I was told not to open. |

**Result:** every research number on the page is in the source spine, and the wording matches. Two notes. (a) The figure states the result in the present tense with no date or model on screen. The spine says GPT-4 in 2023. The source line carries "(2023)", but a viewer can still read it as a claim about today's tools (see problem 6). (b) "About 84.5%" pairs "about" with a one-decimal figure. The spine phrases it the same way, so the figure is faithful, but the hedge looks odd next to a precise number.
