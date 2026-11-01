# Figure read 1: uncalibrated-reliance

Cold read, first viewing. I'd seen nothing of this figure except the page itself. I watched it at 1280×900 and at 390×844 (DPR 2), capturing frames every 0.5 s across the whole 1:34 run after scrolling the figure fully into view, which starts autoplay. I logged the caption from the DOM on every frame. I held key moments with `?t=27`, `?t=45.5`, `?t=57`, `?t=68` and `?t=94`, and checked `?reduced`, `prefers-reduced-motion`, the keyboard path and horizontal overflow.

Caption timing is identical at both widths:

| Beat | On at | Shown for | Caption |
|---|---|---|---|
| 1 | 0:00 | 8.0 s | A student gets a two-part task. |
| 2 | 0:08 | 5.0 s | The student gives an AI four reports. |
| 3 | 0:13 | 10.0 s | It answers both with equal confidence. |
| 4 | 0:23 | 9.0 s | The student checks Part 1, and it's right, so they use both. |
| 5 | 0:32 | 8.5 s | Another student, with the same AI answers, checks each part at its source. |
| 6 | 0:40.5 | 9.0 s | That student checks Part 2 against the port reports, and corrects it. |
| 7 | 0:49.5 | 10.5 s | On the page, both parts look the same. Checking shows Part 2 depends on what's open today. |
| 8 | 1:00 | 12.5 s | In a field experiment, consultants with AI were right less often outside the frontier. |
| 9 | 1:12.5 | 16.0 s | Faculty point to each part in turn and ask what justified relying on it. |
| 10 | 1:28.5 | holds | Faculty check: What evidence justified relying on the system here? (second line "Point to each part. Was the evidence about that part?" at 1:31) |

No caption changed before I could read it. Every caption is short and gets at least 5 s. The pressure comes from the picture: in some beats a lot moves while I'm still reading.

## 1. Beat by beat (desktop, 1280×900)

**1 (0:00–0:08).** An "Example task" card writes itself in at top left: "Part 1 · Ships needed a day / Part 2 · Ships the port takes a day". A small red dot labelled "Student" appears far down at bottom left. I read it as a student with a two-part logistics task. That's clear. The dot is small and a long way from everything else, and I didn't yet know what it was for. Then about 4 s with nothing moving, which is fine.

**2 (0:08–0:13).** Four labels appear across the top: AID REPORT, AID REPORT, PORT SURVEY, HARBOR LOG. The student dot pulses once, and a grey card slides from each label into a small stack beneath them. I guessed the stack meant "the reports going into the AI", but nothing is labelled AI and nothing travels from the student. The dot just pulses in its far corner. The caption says the student *gives* an AI the reports; the picture shows reports dropping into an unnamed pile. I only understood it because of the caption. One thing here matters later and is easy to miss: the harbor log went into the pile too, so the AI had it. The figure never points back to that.

**3 (0:13–0:23).** "AI'S ANSWERS" appears beside the stack, and two cards type out. Part 1: "24 ships a day: 480 tons at 20 each". Part 2: "20 ships a day: 4 docks at 5 each". Both are in the same grey highlight, and each gets the same dark READY pill. This matches "equal confidence" well, and there's time to read both answers.

**4 (0:23–0:32).** The dot travels up to the first aid report, where an underline draws (I read that as "reading it"), then to the second. A "FIRST STUDENT'S BRIEF" panel opens on the left. Part 1 flies in and gets a red "✓ CHECKED", Part 2 flies in and gets a red "USED AS IS", and the dot goes back to its corner. This is the busiest stretch in the figure: about seven separate events between 0:23.5 and 0:30.5, while I was still reading a 12-word caption. I caught the stamps because they stay on screen. On the first pass I missed the dot's visit to the aid reports. Only the frames showed me the student checked Part 1 against both of them, and that is the evidence the whole figure turns on. We never see what the aid reports say, so "it's right" is asserted rather than shown. I can accept that. The "Student" label vanishes when the dot moves and never comes back.

**5 (0:32–0:40.5).** A second red dot labelled "Second student" appears at bottom right, and a "SECOND STUDENT'S BRIEF" panel opens on the right. The dot visits both aid reports, copies Part 1 in and stamps "✓ CHECKED". There are now two identical red dots, and the first has lost its label. I could still tell them apart by position. The caption says the student "checks each part at its source", but this beat only shows Part 1; Part 2 waits for beat 6. That's fine.

**6 (0:40.5–0:49.5).** The second dot visits PORT SURVEY, and a note drops below it: "4 docks, 5 ships each". Then it visits HARBOR LOG: "Dock 2: closed for repairs." Part 2 drops into the second brief, 20 is struck through and becomes 15, 4 is struck through and becomes "3 open", and the line is stamped ✓ CHECKED. This is clear and satisfying, the clearest moment in the figure. The two corrections happen quickly (about 1.5 s, 0:44.5–0:46), but the result stays. The port-survey note is only visible for about 1.5 s before the harbor-log note replaces it. "Port reports" in the caption is a new collective name for the survey and the log, but it's easy to follow.

**7 (0:49.5–1:00).** The Part 1 answer card gets an outline, then the Part 2 card ("look, these look the same"). Then "4 docks at 5 each" is underlined and labelled CAPACITY, and "Dock 2: closed" is underlined and labelled OPEN TODAY. Then a jagged line draws itself between the two AI answers, with "INSIDE THE FRONTIER" above it and "OUTSIDE THE FRONTIER" below. **This is where I got lost.** I could match the caption's "what's open today" to the OPEN TODAY label, though that label sits far off at top right and nothing connects it to CAPACITY in the centre. The frontier, though, arrives with no caption and no explanation. As a first-time viewer I don't know what "the frontier" is. I guessed "the edge of what the AI is good at", but the figure never says so. The labels finish drawing at about 0:57.5, and the stats panel covers them at 1:00, so I had about 2.5 s with a new concept. Caption 7 doesn't mention the frontier, and caption 8 assumes I already know it.

**8 (1:00–1:12.5).** Everything dims and a panel opens: "Right answers on a task outside the jagged frontier". The bars read Without AI 84.5%, and With AI ("TWO GROUPS") 60% and 70%. A bracket on the AI bars says "Graders rated higher in quality". The source line reads DELL'ACQUA ET AL. (2023) · BCG CONSULTANTS · HBS WORKING PAPER 24-013. The bars draw between 1:04 and 1:06, then hold for 6 s, which is enough, and everything is legible. The bars are proportional: I measured the pixel lengths against 84.5, 60 and 70. Three questions stayed with me. Who are the "two groups"? Graders rated them higher than what? And why does that matter? The page's Evidence section below the figure says graders did this "regardless of the correctness of their answer", but the picture doesn't say so, and that twist is the point. The jump from a constructed student example to a consultant study is abrupt, though the caption does flag it as a field experiment.

**9 (1:12.5–1:28.5).** The panel lifts, the red stamps fade off both briefs, and "FACULTY SEE ONLY THE BRIEFS" appears under the centre column. Part 1 of each brief gets an outline, and each student answers in a speech box: "1 'The aid reports.'" Then Part 2 is outlined. The first student types "2 'Part 1 checked out, so I trusted the rest.'" and the second types "2 'The harbor log. One dock is closed.'" This is the payoff, and it lands. I had two snags:
- The label FACULTY SEE ONLY THE BRIEFS sits under the AI's answers column, so for a moment I read it as a heading for that column. The AI answers and the frontier also stay fully visible, so "only the briefs" contradicts what I'm looking at.
- The ✓ CHECKED and USED AS IS stamps come off, but the second student's red strike-throughs (20→15, 4→3 open) stay. Faculty who "see only the briefs" can still see that one student corrected something, while the first student's brief shows no sign of a problem.

The last answer finishes typing at about 1:26.5, 2 s before the caption changes. The box stays on screen, so nothing is lost.

**10 (1:28.5–1:34, then holds).** The caption area becomes "FACULTY CHECK: What evidence justified relying on the system here?", and at 1:31 "Point to each part. Was the evidence about that part?" is added. The toggle turns to Replay. Good.

### Phone (390×844)

The phone gets a different layout: stacked HTML cards, with no student dots, no stack and no flying copies. Captions and timing are the same. Here's what changes:

- **Context disappears.** The task card goes at 0:12.5, when the AI's answers appear, and never comes back. The harbor-log note goes at 0:59. The final phone frame has no task, no reports and no OPEN TODAY. It shows only the AI answers with the frontier, the two briefs, the two answer boxes and the faculty check. So "3 open" and "One dock is closed" have no visible source at the end.
- **Panels swap in and out.** The AI's answers vanish during beat 6 (0:40.5–0:48.5) while the second student checks, and the briefs vanish during beat 7. "On the page, both parts look the same" therefore plays over the AI cards alone, and I couldn't compare a brief with the answer it came from.
- **The caption and controls jump.** As panels come and go, the Pause button's distance from the top of the figure goes 411 → 504 (0:23) → 523 → 541 → 430 (0:41) → 439 → 459 → 454 → 489 → 454 → 439 → 430 → 654 (1:28) px. That's about 13 jumps, the largest 224 px. The caption I was reading moved out from under me at 0:23, 0:41 and 1:28, and Pause is a moving target for a thumb.
- Checking shows only as an outline on the report chips, about 1 s each. The first student checking Part 1 against the aid reports is very easy to miss.
- The strike-through line wraps awkwardly: "~~20~~ 15 ships a day: ~~4~~ 3 / open docks at 5 each".
- The stats appear as text rows, not bars. The phone wording, "Graders rated the AI users' work higher in quality", is clearer than the desktop's.
- During playback, the beat list under the figure shows "On screen:" descriptions written for the desktop picture: "task card at the top left… a red dot labelled Student… a grey copy of each report slides into a small stack above the centre". None of that appears on the phone.
- Text is a comfortable size throughout. Legibility isn't the problem.

## 2. The point

When a student checks one part of an AI's answer and finds it right, that check is evidence about that part only. Two answers that look equally confident can rest on different things, and only checking each part against its own source shows which one the AI got wrong.

## 3. The question a teacher should ask afterwards

"For each part of your answer, what did you check, and was that check actually about this part, or about a different part you happened to verify?"

## 4. The final frame alone

On desktop it mostly works. It lays out the task; the four reports, with "Dock 2: closed for repairs" tagged OPEN TODAY; the AI's two answers split by the jagged line, with Part 2 tagged CAPACITY; the two briefs side by side (20 against 15 from "3 open"); each student's two reasons under their brief; and the Faculty Check question underneath. Reading left to right I can rebuild the story: same AI answers, one student trusted Part 2 because Part 1 checked out, the other checked the log. What it says to me: *your reason for trusting Part 2 has to be about Part 2.*

There are gaps:
- "Inside/outside the frontier" is undefined.
- The research panel is gone, so the final frame carries no evidence beyond the constructed example.
- Only the 20-against-15 comparison shows that the first student's Part 2 is wrong. The CHECKED and USED AS IS stamps, which showed what each student did, have been removed.

On the phone the final frame is weaker: with no task and no harbor log, the second student's "One dock is closed" and "3 open" have nothing on screen to point back to.

## 5. Problems, ranked

1. **Confusion: "frontier" is never explained.** It arrives silently in beat 7, and its labels are visible for about 2.5 s before the overlay covers them. Caption 8 and the chart title ("jagged frontier") then use the word as if I knew it. The intro paragraph doesn't use it ("whether the task fits the tool" is the closest). A teacher who hasn't read the essay or the paper will guess or skip it. There's also a circular reading available: "outside the frontier" = "the part the AI got wrong". What the figure shows is the AI missing one line in a log it was given, not that this *kind* of task is beyond AI, so the frontier label is asserted, not shown.
2. **The phone layout is unstable and loses context.** The caption and controls jump about 13 times, by up to 224 px. The task and the harbor log vanish and don't return. The AI answers and the briefs swap in and out, so the comparison can't be held on screen. The phone's final frame lacks the source for "3 open".
3. **Too fast: beat 4 on desktop.** About seven events in 7 s while the caption is still being read. The first student's check against the aid reports is the easiest thing to miss, and the figure's closing question depends on exactly that check.
4. **Ambiguous visual: beat 2.** There's no visible AI and no act of giving, and the grey stack is never named. The figure also never reminds me that the AI had the harbor log. That bears on whether the AI's miss is fair (it had the information and didn't use it), and a teacher may wonder whether the AI was ever given the log.
5. **Caption doesn't match the picture: beat 9.** "FACULTY SEE ONLY THE BRIEFS" appears while the AI answers and the frontier stay on screen, and the label sits under the AI column. The second brief keeps its red strike-throughs after the other working marks are removed, so the briefs aren't clean.
6. **The research panel's wording.** "Graders rated higher in quality" leaves out *than what*, and the desktop picture leaves out the key "even when wrong". "Two groups" is unexplained. 84.5% appears without the source's "about".
7. **Two identical red dots.** Each label disappears after the dot's first move, so the first student's dot is unlabelled for most of the run.
8. **Fairness.** It's fair to the first student, who did check something, and broadly fair to the AI, which gets Part 1 right. But the AI's single miss is presented as a frontier fact. The research comes from BCG consultants, not students. The caption says so, but the figure goes straight from a classroom example to a professional study without comment. I'd want the frontier claim about Part 2 justified, or softened to "a part the system handles less reliably".
9. **Minor.** The port-survey note is visible for only about 1.5 s. There's no `aria-live` region, so a screen reader won't hear beat changes during playback, though the beat list and the long description cover the content.

## 6. Mechanical checks

- **Does the reduced-motion view show the final frame with the full text?** Yes. Both `?reduced` and an emulated `prefers-reduced-motion: reduce` open at 1:34 on the final frame, with both lines of the Faculty Check and the toggle reading Play, and the beat list expands with "On screen" descriptions. The same is true at 390 px.
- **Any horizontal scroll at 390 px?** No. `scrollWidth` was 390 at 13 times sampled across the run (`?t=0…94`) and in reduced mode, and no element extends past the right edge in the final state.
- **Can you reach play, pause and scrub by keyboard?** Yes. The tab order is header links → Play/Pause → Restart → scrubber → beat buttons 1–10. Enter and Space both toggle play and pause. Restart works with Enter. The scrubber responds to the arrow keys (about 1 s per press), Home and End, with `aria-valuetext` such as "0:06 of 1:34, beat 1 of 10". Enter on a beat button jumps to that beat. Every control shows a visible 2 px focus outline. There is no `aria-live` region.
- **Is every number shown found in the source spine or the essay?**
  - Research figures: 84.5%, 60%, 70%, Dell'Acqua et al. (2023), BCG consultants and HBS working paper 24-013 all appear in `sources/source-spine.md` line 62, under Jagged Frontier And Uneven AI Capability. "Graders rated higher in quality" matches the spine's "rated the AI users' recommendations higher in quality 'regardless of the correctness of their answer'". The "19 percentage points" in the page's Evidence section is also in the spine. The spine says "about 84.5%" and the figure drops "about"; that's minor.
  - Constructed numbers: 24 ships, 480 tons at 20 each, 4 docks × 5 = 20, 3 open × 5 = 15, and Dock 2 are not sourced, and the intro flags the task, reports and students as a constructed example. The arithmetic is consistent.
  - Essay check: see the addendum below, done after the read was written.

## Addendum: essay check (after the read was written)

- The essay (`the-irreducible-officer.md`) does not contain 84.5%, 60% or 70%. Those figures come only from the source spine, which is fine because the spine is the stated source.
- "Failure mode 4 of 7" checks out. The essay lists seven failure modes (frame capture, fluency substitution, premature synthesis, uncalibrated reliance, invisible delegation, institutional monoculture, responsibility laundering), and uncalibrated reliance is fourth.
- The two quotes on the page match the essay word for word: "Uncalibrated reliance begins with a reasonable impulse…" (line 39) and "The distinction between trust and reliance matters here…" (line 89).
- This supports problem 1. The essay defines the jagged frontier in one sentence (line 87): "AI improved performance on some tasks and degraded it on others, and the boundary was not obvious in advance." The figure never gives the viewer that sentence or anything like it. A short version on screen at beat 7, or in caption 7, would fix most of the confusion I had.
