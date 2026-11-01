# Figure cold read: frame-capture, round 1

**Material:** `figures/frame-capture/index.html`, served on 127.0.0.1:5231. I watched it in headless Chromium (Playwright 1.63), 1280px wide. I captured 161 frames, one every 0.5 s of wall clock from Restart to 80 s, and the figure clock kept up (v = 0.15 at frame 0, v = 74.8 at the end). I looked at the frames in order, ran a pixel diff between frames to find every movement, and held key moments with `?t=`.

**Peeking disclosure:** during setup, Playwright's accessibility snapshot printed the figure's text description and the first beats' "On screen" notes before I'd watched it. I've judged the picture by what it shows. Where only the text alternative explains something, I say so.

Timings below are figure time. Each caption runs 6.5 to 8 s and is 6 to 15 words long, so I could read every caption with time to spare. Where pace is a problem, it's the movement: a few key moves are short or arrive late in their beat.

## 1. Beat by beat

**1 (0–6 s). "A student gets an open strategy task."**
The stage is empty at 0 s. An "EXAMPLE TASK" card fades in at the top right (about 1 s): "Recommend a response to an adversary's military buildup." At about 1.5–2 s, a small red dot labelled "Student" appears at the far left. Nothing moves for about 4 s after that.
Meaning: here's a student, and here's an open-ended assignment. Clear. The dot is small and a long way from the card, and nothing connects the two, but the caption covers it.

**2 (6–14 s). "Many things could matter. Framing means picking which ones define the problem."**
Six dashed chips appear one every 0.5 s (7.0–9.5 s), three along the top and three along the bottom of the open space: Past buildups, Adversary's intent, Room to negotiate, Allies' interests, Domestic politics, Economic pressure. Then about 4.5 s of stillness.
Meaning: these are the things a strategist could weigh, and the dashed outline says none has been picked yet. Clear and well paced. The student dot doesn't react to them.

**3 (14–22 s). "The student asks an AI. It proposes a reasonable, narrower frame."**
- At 15.0 s the dot pulses. I only found this in the frame diff; at real speed I didn't register any "asking".
- 15.0–16.5 s: grey corner brackets snap around the open space, and the label "AI'S FRAME" appears.
- 16.5–18 s: the frame sits empty.
- 18.0–19.5 s: a grey copy of the task sentence appears inside the frame. Every word except "adversary" fades, and "Deter the" fades in in front of it. Around 19.3 s the two copies of "adversary" overlap and blur for a moment.
- 19.5–20.5 s: "Adversary's intent" and "Allies' interests" slide in from outside and turn into solid tan headings under "Deter the adversary".
- About 1.5 s of stillness follows before the caption changes.

Meaning: the AI turned an open task into "deter the adversary" and picked two of the six considerations. The visual metaphor works well: the long sentence shrinks to three words, and two chips cross the line while four stay outside. The original task card stays visible at the top right, so you can compare the two wordings.

Concern: this is the most important change in the figure, and it all happens in the last 4 s of the beat. The sentence turns into the new frame in about 1.5 s, the overlap blurs it, and "Deter the adversary" never holds alone before the chips start moving. No AI is shown, only the label on the brackets. That's acceptable, because the caption says who did it.

**4 (22–30 s). "The student takes up the frame. Up close, it's all they see."**
- 23.0 s: the "Student" label fades.
- 23.5 s: the dot hops inside the frame.
- 24–25.5 s: the view zooms until the frame fills the stage, and the considerations and task card leave the picture.
- 26–28 s: "STUDENT'S DRAFT 1" appears, and the dot writes rows of text under the two headings.
- 28.5–30 s: stillness.

Meaning: once inside, the student works only with what the frame gave them. The zoom acts out "it's all they see", which is the strongest moment in the figure. A side effect: the student's identity label goes here and never comes back. From now on the student is just the pen tip.

**5 (30–37 s). "The student revises twice, adding evidence and a firmer conclusion."**
- 31–32.5 s, Draft 2: red change bars appear beside the rows, and the rows straighten and extend.
- 33–35 s, Draft 3: a small bar chart appears under the right column, and a heavy line runs across both columns.
- The corner label flips Draft 1 → 2 → 3.
- 35.5–37 s: stillness.

Meaning: real work, with evidence (the chart) and a stronger conclusion (the heavy line). You need the caption to read the chart as evidence and the line as a conclusion, and it's there. This is fair to the student: the figure shows effort, not laziness.

**6 (37–44.5 s). "Step back with us: every revision stayed inside the AI's frame."**
From 38 to 40.5 s the view pulls back to the whole picture. The four dashed considerations are exactly where they were, untouched, and the task card is back. Then about 4 s of stillness.
Meaning: all that work happened inside the boundary, and four things were never considered. Clear and strong. Every red mark sits inside the brackets.

**7 (44.5–52.5 s). "The paper faculty receive doesn't show where the frame came from."**
- 45.5–46.5 s: a small copy of the paper appears under the task card, inside its own brackets.
- 47–48 s: stillness.
- 48–49.5 s: a vertical line sweeps across the copy. The tan highlight on "Deter the adversary" goes, the tan heading chips become empty white boxes, and the red change bars disappear.
- 49.5–50 s: the brackets around the copy fade.
- 50.5–51 s: the label "WHAT FACULTY RECEIVE FROM THIS STUDENT" appears.
- About 1.5 s later the caption changes.

Meaning: by the time the paper is handed in, the marks of where its framing came from have been cleaned off.

Where I wasn't sure what I was looking at:
- For the first 5 s of this beat the small card has no label. I first read it as "the AI's version", then wondered whether it was a second student. The label that settles it arrives 6 s into an 8 s beat.
- The sweep's change (tan to white on a card about 250 px wide) is subtle. On a projector from the back of a room it would be lost.
- The headings become blank boxes with no words. I read that as "the considerations were deleted from the paper" rather than "the headings now look like the student's own".
- The title "Deter the adversary" is still on the paper. So the frame is in the paper; what's missing is where it came from. The caption says exactly that, but on a quick read ("doesn't show ... the frame") you look over, see the frame printed on the paper, and need a second to reconcile the two.

**8 (52.5–60 s). "Another student weighed all six and chose this frame: same paper."**
From 53.5 to 54.5 s, an identical paper appears below the first, labelled "FROM A STUDENT WHO CHOSE THIS FRAME". Then 5.5 s of stillness.
Meaning: a student who chose deliberately hands in the same paper, so the paper can't tell the two apart. The two identical cards make that point well.

Problem: "weighed all six" is never shown. There's no second dot and no moment of considering the four outside chips. The picture's label says only "chose this frame". The difference between the two students is the whole point, and it's stated in the caption, not shown.

Layout: the label's right edge sits about 8 px inside the stage's right border at 1280, 1100 and 1024 px wide. It isn't clipped, but it's tight.

**9 (60–68 s). "Ask why this frame, or change the case, and they come apart."**
Nothing on the stage moves for the full 8 s. The pixel diff shows no change from 54.5 s to the end of the figure.
I expected the two papers to split, with one standing up to the question and one cracking. In a motion figure, "they come apart" reads as a promise of motion, and none comes. The conditional ("Ask ... and they come apart") may mean "if you asked, they would". Only the narrow-screen "On screen" note ("nothing moves. The two papers stay identical") shows the stillness is deliberate. That note is hidden at desktop width, and nothing in the picture signals it.
"They" is ambiguous: the papers, or the two students? "Change the case" is jargon: a different scenario, or a different case study? A high school teacher could stumble on it. This is the biggest confusion of the run.

**10 (68–74.8 s, final). Faculty check.**
At 68 s, "FACULTY CHECK / What problem did the student choose to solve?" replaces the caption. At 71.5 s, "THEN ASK Why this frame? What would change it?" appears beneath it. The stage stays still. The caption block grows at 68 s and pushes the Play/Restart bar down about 40 px. The figure ends and holds on this frame.
Meaning: the question to put to the student. Clear, and the final frame holds as long as you like.

## 2. The point

A student who takes the AI's first reasonable framing can work hard and hand in a polished paper identical to one from a student who chose that framing on purpose. The paper alone can't tell faculty which happened, so they have to ask the student about the frame.

## 3. The question a teacher should ask afterwards

To the student: "Before we talk about the evidence: what else could this problem have been about, and why did you set those things aside?"

To a room of teachers: "Looking at a finished paper, what would tell you whether the student chose the problem or accepted one handed to them? If nothing would, what will you ask them?"

## 4. The final frame alone

It mostly carries the idea without the animation. In one picture it shows:
- the original open task (top right);
- the narrower "Deter the adversary" inside brackets labelled "AI'S FRAME", with two headings;
- the four dashed considerations left outside;
- the student's Draft 3 entirely inside the brackets;
- two identical papers, labelled "What faculty receive from this student" and "From a student who chose this frame";
- the faculty check question.

It says to me: the work happened inside a boundary someone else drew, and the paper you'd grade looks the same as one from a student who drew that boundary themselves.

What it doesn't carry:
- The second student's weighing of all six considerations is invisible here too.
- The student as a person is gone. There's no dot label, only "Student's draft 3".
- Someone seeing only this frame may count three papers. It isn't obvious that the bracketed draft and the top-right card are the same paper.
- The faculty check question has a literal answer printed on the paper ("Deter the adversary"). A teacher could answer it literally and miss that the real question is whether the student chose it. As a prompt for discussion that tension is useful, but it's worth knowing about.

## 5. Problems, ranked

1. **The beat 9 caption doesn't match the picture (confusion).** "Ask why this frame, or change the case, and they come apart" plays over 8 s of total stillness. The figure's payoff, that questioning separates the two students, is promised and never shown. "They" is ambiguous and "change the case" is jargon. Either show the split (for example, the deliberate student's paper can account for the four outside considerations and the captured one can't), or rephrase so the conditional is explicit and the stillness reads as intended ("The papers can't tell you. Asking 'why this frame?' can.").
2. **The contrast case is told, not shown (ambiguous visual).** "Another student weighed all six" has no picture: no second student, and no moment of weighing the outside chips. The label says only "chose this frame". That distinction carries the argument, and a skeptical teacher has nothing on screen to point to.
3. **Beat 7 is late and subtle (too fast, ambiguous visual).** The card goes unlabelled for 5 s, and its label lands 2 s before the caption changes. The tan-to-white sweep is hard to see at the card's size. The blank heading boxes suggest the considerations were deleted rather than absorbed.
4. **Beat 3's key narrowing is quick (too fast).** The sentence turns into "Deter the adversary" in about 1.5 s, with a blurred overlap at about 19.3 s and only about 1.5 s of hold before the caption changes. The "asks an AI" pulse is barely visible. The most important change in the figure could hold 1–2 s longer on "Deter the adversary" before the chips move.
5. **The student disappears after beat 4 (minor confusion).** The "Student" label fades at 23 s and never returns, and the final frame has no student in it, only a draft.
6. **Layout shift at 68 s (mechanical).** The control bar jumps about 40 px down when the faculty check appears. A teacher reaching for Pause at that moment could miss.
7. **The beat list gives away the sequence (low).** At desktop width all ten captions, punchline included, are listed under the stage before you press play. That helps a teacher stepping through beats, but it invites reading instead of watching.
8. **Empty stage before play (low).** At t = 0 the stage is a blank box. The figure only starts when most of it is in view, so on load at 1280×800 or 1440×900 the visible part of the stage is empty.
9. **390 px loses all stage labels (low, desktop-first).** The task card, chip names, "AI's frame", "Deter the adversary" and the paper labels are all hidden, so the picture becomes unlabelled shapes. The "On screen" notes in the beat list make up for it.
10. **Fine-grained arrow-key scrub (low).** The slider moves 0.05 s per arrow press, so twenty presses move one second. PageUp/PageDown, Home/End and the beat buttons make up for it.
11. **Small mismatch in the follow-up questions (low).** Inside the figure the follow-up is "Why this frame? What would change it?". Below the figure: "Section VIII of the essay asks: why this problem, why this frame, what would change it?"
12. **Fairness.** I didn't find anything unfair. The AI's frame is called "reasonable" and its paper is as good as the deliberate student's, so the figure isn't anti-AI. The captured student is shown working hard and revising, so they aren't cast as lazy. The page says the task and the six considerations are constructed. One soft point: "What problem did the student *choose* to solve?" assumes there was a choice. A captured student may honestly believe they chose deterrence. That's probably the point, but a facilitator should expect it.
13. **Factual claims I'd want sourced.** "Failure mode 1 of 7". "Section VIII of the essay asks: why this problem, why this frame, what would change it?". The block quote attributed to Section II. The phrase "the first plausible frame becomes the student's frame" in the intro. Checked in section 6.

## 6. Mechanical checks

- **Does the reduced-motion view show the final frame with the full text?** Yes. `?reduced` and `prefers-reduced-motion: reduce` both open at 74.8 s, the final frame, showing "FACULTY CHECK / What problem did the student choose to solve? / THEN ASK Why this frame? What would change it?". The button reads Play and the clock doesn't advance (still 74.8 s after 3 s). At 390 px with `?reduced`, the final text is present and the beat list carries the "On screen" description for every beat.
- **Any horizontal scroll at 390 px?** No. `scrollWidth` was 390 at the default view, `?t=24`, `?t=50.5`, `?t=56`, `?t=74.8` and `?reduced`, and no element extends past the viewport.
- **Can you reach play, pause and scrub by keyboard?** Yes.
  - Tab order: three nav links, then Play/Pause, Restart, the scrub slider ("Scrub through the figure"), and the ten beat buttons.
  - Enter starts playback and Space pauses it, and the figure clock stops while paused.
  - On the slider: arrows move 0.05 s, PageUp jumps about 7.5 s, End goes to 74.8 s (the button becomes "Replay"), and Home goes to 0.
  - Enter on a beat button jumps to that beat and plays.
  - The focus outline (2 px solid navy) is visible on each control.
- **Is every number shown found in `sources/source-spine.md` or the essay?** Yes. I checked these against `the-irreducible-officer.md` after writing the sections above.
  - "Failure mode 1 of 7": Section II names seven failure modes, and frame capture is the first: frame capture, fluency substitution, premature synthesis, uncalibrated reliance, invisible delegation, institutional monoculture, responsibility laundering.
  - "Section VIII ... why this problem, why this frame, what would change it?": verbatim from Section VIII, "Assessment That Makes Ownership Visible" (the frame evidence paragraph).
  - The block quote attributed to Section II: matches the essay word for word.
  - "Change the case" echoes Section II's "whether the discipline transfers when the case changes". It's grounded in the essay, but it's still jargon to a reader who hasn't read it.
  - Every other number is either part of the constructed example, which the page labels as constructed (six considerations, Drafts 1–3, "revises twice", ten beats), or the runtime (1:14, which is 74.8 s, matching "a little over a minute").
  - The figure makes no statistical claim, so `source-spine.md` isn't needed. It doesn't mention frame capture or failure modes, and nothing on the page depends on it.
