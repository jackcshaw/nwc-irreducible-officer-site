# Figure cold read, round 1: premature-synthesis

Tester: cold reader, first viewing. I had not seen the essay, storyboard, plan or other tests before writing sections 1 to 6. I checked sources only after writing them (section 7).

Method: I served the motion-figures folder on 127.0.0.1:5317 and used Playwright from the site-motion `node_modules`.
- Desktop, 1280×900: I scrolled the figure into view and let it autoplay. I captured the stage every 0.5 s of wall clock, 185 frames from 0:00 to the end, and viewed them in order on contact sheets, with full-size frames at doubtful moments.
- 390×844: autoplay did not start (see mechanical checks), so I pressed Play and captured the same way, 183 frames.
- Holds with `?t=` at 12.9, 23.9, 34.9, 41.6, 44, 51, 56.5, 63.6 and 90 on desktop, and at 12.9, 34.9, 48.5, 60, 72.5 and 90 at 390 px.
- `?reduced` at both widths, plus a keyboard pass.

Times below are figure time.

## 1. Beat by beat

**Beat 1, 0:00–0:07. "A student must connect six readings in a seminar paper."**
An "Example task" card fades in at top right: "Using the six readings, explain when a blockade works." A red dot labelled "Student" appears on the left. Six numbered cards pop in about 0.5 s apart: 1 Northern blockade, 2 Island blockade, 3 Trade routes, 4 Allies split, 5 Long blockade, 6 Coercion theory. Clear, and seven seconds is generous for an 11-word caption. I read it as the setup: one task and six sources, nothing connected yet.

**Beat 2, 0:07–0:16. "The student reads all six closely, then asks an AI to connect them."**
The "Student" label fades as the dot starts to move. The dot hops to every card in about 3 s, roughly half a second each, and each card grows two short underline strokes, which I read as notes. The dot rests. Five grey dashed lines draw in about one second (1–4, 4–6, 3–4, 3–5, 2–5), then a small grey "AI'S MAP" label appears.
I followed it, with three doubts:
- The dot's pace says "skimmed", not "closely". The caption carries "closely" alone.
- Nothing on screen stands for the AI except the dashes and a faint label that arrives after them.
- From here on the student is an unlabelled red dot.

**Beat 3, 0:16–0:25. "The map makes sense to the student, who writes the paper from it."**
The dot travels along each dashed line in turn, and each turns solid. A card labelled "First student's paper" appears on the left. Its title types out: "Blockades work once supplies run out." Three paragraph blocks follow, with markers 2 · 5, 3 · 4 · 5 and 1 · 4 · 6, and a grey footer: "AI HELPED CONNECT THE READINGS."
I read this as: the student checked each of the AI's links, found them sensible, and wrote from them. That is fair to the student, who looks diligent, not lazy.
I guessed the markers were citations. At speed I missed that the 2–5 line turns heavier while the title types; I only saw it when holding `?t=23.9`. So I did not register 2–5 as the "main" connection, which beat 8 relies on.

**Beat 4, 0:25–0:37. "A second student reads them just as closely, then tries connections first. One doesn't hold."**
The AI lines and the first student's notes fade, and the first paper stays at left. A new red dot appears with a small pink "Second student" label, which fades within about 2 s. It reads every card in about 3 s.
- It draws four red lines quickly, about 0.6 s each: 2–5, 3–5, 1–4, 4–6.
- It draws a fifth line, 1–2, goes back to card 1, and a red ✕ lands on the line. A red italic note types out: "In Reading 1, the country found another supplier."
- The line pulls back. The ✕ and the note stay.

I could follow all of it, and the note was readable well before the caption changed. It took me a second to work out why the note kills the 1–2 link: two blockades looked alike, but in the first one another supplier stepped in, so they are not the same kind of case. A teacher could fairly ask what the 1–2 connection was supposed to claim.
Both students are identical red dots. If you miss the fading label, this could look like the first student revising.

**Beat 5, 0:37–0:46. "That student then asks an AI too and checks its map against their own."**
The dot sits at left and pulses. Grey dashes draw on all five AI links at once. Four of them land on the red lines that are already there, which just look textured or slightly darker. Only 3–4 shows as a new dashed line, labelled "AI'S MAP". The dot visits card 3, then card 4 (each gets a dark outline), and 3–4 turns red.
At speed I saw "the AI adds one line, and the student checks it before keeping it." I did not see "four match" as something that happens: the overlap reads as a texture change on lines already drawn. The beat list says the ✕ "brightens" to show the AI drew no 1–2 line. I did not notice that at all at speed, and only faintly in held frames. So the AI's agreement with the student's rejection, which is the reason this student can audit the AI, is nearly invisible.

**Beat 6, 0:46–0:53. "That student writes their own paper. Both make the same argument."**
A second paper appears under the first, labelled "Second student's paper". It has the same title, the same citation markers and the same "AI HELPED CONNECT THE READINGS" footer, plus one extra italic line: *"unless another supplier steps in."* The cards and lines fade, and "WHAT FACULTY RECEIVE · SAME ARGUMENT, OWN WORDS" appears above.
This is where I hesitated most. The caption says "same argument", but the picture shows the second paper stating an exception the first one lacks. A careful grader could tell these papers apart. The "Second student's paper" label is also jammed against the bottom edge of the first paper card.

**Beat 7, 0:53–1:01. "Without the papers, both students sketch the same connections."**
The papers shrink into a strip at top left, with "BOTH SAY AI HELPED" added. New text appears:
- "FACULTY ASK, PAPERS ASIDE: *Sketch how the readings connect.*"
- Row labels: "FIRST STUDENT: READ → AI CONNECTS → WRITES" and "SECOND STUDENT: READ → **TRIES** → AI CHECKS → WRITES", with "TRIES" in red.

Each dot then draws six numbered nodes and the same five lines, the first row and then the second. The identical maps land clearly.
It is dense: five new text blocks in about six seconds, on top of the caption and the drawing, and I had to pause to read the row labels. The sketches use numbers only, so from here on the viewer has to remember that 1 was Northern blockade and 2–5 was Island blockade and Long blockade.

**Beat 8, 1:01–1:13. "Faculty ask about the main connection. The first student recalls Reading 1 but can't apply it."**
"THEN THEY ASK: *What evidence would change this connection?*" appears. On both sketches the 2–5 line goes heavy and a ring is drawn on it, while the other lines grey out. About 5 s after the caption arrives, the first student's answer types into a bubble beside row 1: *"In Reading 1, they found another supplier. I don't see how that bears on this."* Typing pace is comfortable, and the quote is complete about 1.5 s before the caption changes and stays on screen.
Two doubts:
- The caption gives the verdict ("can't apply it") before I could judge the answer myself.
- I took the ring to mean "the one faculty point to". I could not have said why 2–5 is the main connection without going back to beat 3.

**Beat 9, 1:13–1:24. "The second student applies it, from the connection that didn't hold."**
In row 2, "WHAT THEY LEARNED ✕ *In Reading 1, the country found another supplier.*" appears in red. Then the second answer types: *"Another supplier, as in Reading 1. My main claim rests on there being none."* The contrast lands, and the red ✕ ties the answer back to the dropped link in beat 4. That is the best moment in the figure.
"There being none" is slightly elliptical (none meaning no other supplier) but readable. Both students know the same fact; what differs is whether they can attach it to the claim. That is clear and fair.

**Beat 10, 1:24–1:30. Faculty check.**
"Can the student explain why these connections matter?", then about 3 s later "Point to one connection. What evidence would change it?" Then it rests. Fine.

**Pacing overall.** Every caption stayed up for 7 to 12 s and none is longer than 17 words. No caption changed before I had read it. The motion I had to work to follow was the fast parts: both reading passes (about 0.5 s per card), the four red lines in beat 4, and the beat 7 text pile-up. In each case the end state holds long enough to catch up.

## 2. The point, in my words

Two students can hand in the same paper and redraw the same map of how the readings connect, but only the one who built and broke connections before asking the AI can say what evidence would change a connection, so that question, not the paper or the sketch, shows whose synthesis it is.

## 3. The question a teacher should ask afterwards

"Pick the connection your argument leans on most. What would you have to find in one of the readings to make you drop it, and what happens to your claim if you do?"

## 4. The final frame alone

**Desktop: yes, mostly.** It shows:
- the same two papers, set aside;
- the same "AI helped" disclosure;
- two identical sketches with the same link ringed;
- two answers to "What evidence would change this connection?": one student names the fact and can't connect it, the other names it as the condition the claim depends on;
- the process labels (read → AI connects → writes vs read → tries → AI checks → writes), which say why.

To me it says: what the student hands in can't tell you who did the synthesis; asking what would break a link can.

The weak spots in the still frame:
- Nodes are numbers only, so "Reading 1" and the ringed 2–5 link are abstract unless you watched.
- "What they learned ✕" means the most to someone who saw beat 4.
- Nothing in the frame says why 2–5 is the link that matters.

**At 390 px: no.** In narrow mode the picture has no words at all: no reading names or numbers, an empty white box where the task card was, no paper titles, no row labels, no answers, no "what they learned". The final phone frame is two identical unlabelled diagrams above the two questions. The idea survives only in the "On screen" beat list below the controls.

## 5. Problems, ranked

1. **Confusion (390 px): the picture loses every word, including the payoff.** On a phone, beats 8 and 9 show no visible change. The caption says the first student "recalls Reading 1 but can't apply it" while the picture shows two identical unlabelled diagrams. No answer bubbles, no row labels, no ✕ note text, and an empty task box remains. Earlier beats also lose the reading names, so "one doesn't hold" is a tiny ✕ between two blank cards. The final frame does not carry the idea on a phone.
2. **Mechanical: autoplay doesn't start on phones or short laptop screens.** The figure root, which includes the long beat list, is 2,787 px tall at 390 px and 1,228 px on desktop, and the runtime waits for 60% of it to be visible.
   - At 390×844 at most 30% can be visible, so it never plays. I confirmed this with the shot centred and after scrolling the whole page.
   - At 1280×720 the most is 59%, so it never plays there either.
   - It does play at 1280×900, 1366×768, 1440×900 and 1536×864.
   - When it doesn't play, the reader sees a still first frame and has to press Play.
3. **The caption doesn't match the picture (beat 6): "Both make the same argument."** The second paper visibly adds "unless another supplier steps in." A teacher can fairly conclude the papers are distinguishable: the second one is better qualified. That weakens the premise that the finished paper can't separate the students, and makes beat 9 look as if it reveals what the paper already showed. Either make the papers truly equivalent, or have the caption admit the one-line difference and say why it doesn't decide things.
4. **Ambiguous visual (beat 5): "checks its map against their own" isn't visible as a check.** The four matching AI lines merge into red lines and read as a texture change. The AI's agreement on 1–2 (the ✕ "brightening") doesn't register at speed. What a viewer sees is "the AI added one line", not "the AI's map matched mine, and I can see why it didn't include the one I rejected." A visible tick or flash on each match, and a clear beat at the empty 1–2 gap, would carry it.
5. **Confusion: "the main connection" is never really established.** The 2–5 line thickens in beat 3, but subtly. The "2 · 5" marker is small, and the sketches drop the reading names. The logic runs: Island and Long blockade support "blockades work once supplies run out", and the Northern blockade failed because another supplier stepped in. Following it means remembering card labels from about 50 s earlier. A label on the ringed link, or the reading names on nodes 1, 2 and 5, would help.
6. **Too fast or ambiguous: "reads all six closely".** Both students spend about half a second per card. The figure's fairness depends on both reading equally closely, and only the caption says so. The picture says "skimmed".
7. **Ambiguous visual: two identical red dots.** The "Student" and "Second student" labels fade within 1 to 2 s, and the second label is small and pale pink. Without the caption, beat 4 could read as the first student revising.
8. **Too fast: beat 7.** Five new text blocks in about 6 s (what faculty receive, both say AI helped, faculty ask with papers aside, two process rows), while the sketches draw.
9. **Caption runs ahead of the picture: beat 8 gives the verdict about 5 s before the answer appears.** It pre-empts the viewer's own judgment of the first answer. Holding the second sentence until the bubble finishes would let the teacher judge first.
10. **Fairness, minor: the footer on the second paper.** "AI helped connect the readings" slightly misdescribes a student who used AI to check, though the AI did contribute the 3–4 link. This may be deliberate ("disclosure looks identical"). Otherwise the figure is fair to both: the AI's map is sound both times and it never proposes the bad 1–2 link, and the first student is shown verifying each link and disclosing AI help.
11. **Layout, minor:** the "Second student's paper" label touches the bottom edge of the first paper card (0:46–0:53).
12. **Factual claims I wanted sourced:** "Failure mode 3 of 7"; the oral defense in Section IX where faculty ask "what evidence would change the recommendation"; and the two block quotes attributed to Sections II and VI. The figure shows no statistics. See section 7.

## 6. Mechanical checks

- **Reduced motion shows the final frame with full text?** Yes on desktop. `?reduced` loads at 1:30 / 1:30 with the full final picture (papers, sketches, both answers, "What they learned") and both faculty-check questions in the caption band. The beat list shows every beat with its "On screen" text. At 390 px `?reduced` also lands on the final frame, but the picture has no words (problem 1). The full text is only in the beat list.
- **Horizontal scroll at 390 px?** None. Document `scrollWidth` is 390, the same as `clientWidth`, and no element extends past the right edge, in default or reduced mode.
- **Play, pause and scrub by keyboard?** Yes.
  - Tab order: brand link, Essay, Practice, then Play/Pause, Restart, the scrubber, and the ten beat buttons. Focus shows a visible 2 px navy outline.
  - Space and Enter toggle play and pause. Enter on Restart restarts.
  - On the scrubber, PageUp/PageDown jump about 9 s, and Home/End go to start and end.
  - Caveat: Arrow keys move only 0.05 s per press, so arrow-key scrubbing is effectively useless. PageUp/PageDown and the beat buttons do the work.
  - Trivial: after End then Home, `data-state` stays "ended" at 0:00 (the label correctly reads "Play").
- **Every number shown found in the source spine or the essay?** The figure shows no statistics. The numbers on the page are reading numbers 1–6, "six readings", "ten beats", "1:30", "Failure mode 3 of 7" and the section numbers II, VI and IX. See section 7 for the check.

## 7. Fact check (done after sections 1 to 6 were written)

Checked against `nwc-irreducible-officer-companion/the-irreducible-officer.md`:

- **"Failure mode 3 of 7": correct.** Section II lists seven failure modes in this order: frame capture, fluency substitution, premature synthesis, uncalibrated reliance, invisible delegation, institutional monoculture, responsibility laundering.
- **Section II block quote: verbatim.** It matches the essay's premature-synthesis paragraph word for word, apart from the essay's bold on the term.
- **Section VI block quote: verbatim.** It matches the end of the "Friction worth protecting" paragraph.
- **"In the essay's oral defense (Section IX), faculty ask what evidence would change the recommendation": correct.** Section IX, "A Foundation Pilot", step five (oral defense) includes "what evidence would change the recommendation."
- **No statistics are shown,** so there was nothing to trace to `sources/source-spine.md`, which has no entry on premature synthesis. The task, the readings, the blockade content and both answers are labelled on the page as a constructed example, and nothing claims they are real cases.

Mechanical answer to "every number shown is sourced": yes. The only figures from the essay ("3 of 7", Sections II, VI and IX) check out, and the rest are reading numbers 1–6 and figure housekeeping.
