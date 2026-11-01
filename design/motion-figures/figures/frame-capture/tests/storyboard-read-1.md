# Frame capture: storyboard cold read, round 1

Read from `tests/storyboard-for-read.md` only (Intent section removed). I read it as an educator who hasn't read the essay. I haven't seen the built figure, so this is a read of the storyboard: what the beats and the page copy would put in front of me.

## 1. Beat by beat

**Beat 1 · The task (0.0–6.7).** A task card and a red dot labelled "Student". Clear: a student has an assignment. The caption says "an adversary's buildup" and the card says "military buildup". That's fine. I wouldn't notice from this beat that the task is open-ended ("a response", of no stated kind). That detail matters in beat 3 and nothing here points at it.

**Beat 2 · Many things could matter (6.7–16.2).** Six dashed chips appear one at a time, alternating left, centre and right. I'd read dashed as "possible" or "optional". I would not read it as "unexamined", which is what the colour rule says it means. "Framing means picking which ones define the problem" is a clear, useful definition. Three things I noticed:
- Two of the chips (Adversary behavior, Historical precedent) arrive in the centre. The other four sit at the very edges of the stage. Before the AI does anything, the layout has already ranked them as central and peripheral.
- "Whose interests count" and "Which constraints are fixed" are questions about framing. The other four are topics. They share one chip style, so I'd treat them as six items of the same kind.
- I have about 27 words to read in 9.5 s (caption plus chips) while my eye jumps around the stage. I'd get through it once. This is the tightest beat for reading.

**Beat 3 · The AI proposes a frame (16.2–24.2).** The dot pulses and grey brackets snap around the two centre chips, which turn grey. A grey "AI'S FRAME" tag and the title "Deter the adversary" appear. I understand that the AI's frame captured two of the six. The pulse reads as "something happened" more than "the student asks", but the caption covers that. The small "AI'S FRAME" tag is the only thing on screen that tells me grey means AI. I would not notice that "Deter the adversary" is narrower than "Recommend a response". To me, deterrence sounds like the obvious reading of "respond to a buildup". The storyboard's Notice line depends on my catching that difference, and nothing draws my attention to it.

**Beat 4 · Up close (24.2–32.2).** The "Student" label goes, the dot walks inside the brackets, the camera pushes in, and the dot writes a ragged two-column draft. "The dot enters the frame" reads well as a metaphor. The caption ("Up close… Only the frame is in view") arrives about 2 s before the push-in starts (24.2 against 26.15), so for a moment it describes something that hasn't happened yet. On first viewing I'd take the zoom as the camera getting close enough to see the writing. I wouldn't take it as the student's view narrowing. That meaning only lands in beat 6.

**Beat 5 · Revisions (32.2–39.6).** This is busy. Within 3.7 s at close range, both columns rewrite, red margin bars draw, the label changes twice, a chart grows and a conclusion bar sweeps across. I get "the student worked hard and the paper changed". I'd read the red margin bars as revision marks only because the dot draws them; a Word user might recognise change bars. The improvement is shown as straighter, justified rows, a chart and a thick bar. That reads to me as more polish and more content. It doesn't read as stronger thinking. I take "Each draft is stronger" on the caption's word. Once the "Student" label is gone, I'm relying on memory that red means the student.

**Beat 6 · From a distance (39.6–46.4).** The pull-back works. The four dashed chips are where they were, and everything red is inside the grey corners. This is the clearest beat and the one where I understood the figure. Two things I'd miss:
- "Nothing red touches the brackets" is an absence. I was never shown that brackets *can* be touched or moved, so I wouldn't register that they weren't.
- The boundary is drawn only at the corners. "Inside" relies on my eye closing the shape. It will, but the left change bars at x 253 sit close to a side that has no line.

**Beat 7 · What faculty receive (46.4–53.2).** A copy slides right onto a sheet labelled "What faculty receive". On the copy, grey turns to ink and the red bars fade. The caption says the paper "can't show who chose the frame". What I'd actually notice is the red bars disappearing. That's the strongest change, and it says "faculty can't see the student's revisions". The change that matches the caption is grey turning to navy, and I'd probably miss it:
- Dark warm grey (`#5b564f`) and navy (`#0a2242`) both read as dark text.
- On a copy at 58% scale, the title is about 10 units tall, so roughly 8 px if the figure renders around 720 px wide.
- It happens at 48.9–49.8, while I'm still reading the 10-word caption that appeared at 46.4.

The brackets also never travel with the copy, so losing the frame isn't something I watch happen. It's just missing. I'd also notice that the copy sits between "Whose interests count" and "Which constraints are fixed" on the right edge. That right-hand column could read as one group.

**Beat 8 · Faculty check (53.2–59.9).** The question replaces the caption. It's clear and well paced (5.9 s of hold). One thing I wasn't sure of: is the question for me, about the picture ("the student" didn't choose; the AI did), or a question faculty should ask a student? The red "FACULTY CHECK" label suggests the second, but the third-person wording suggests the first.

## 2. The point

When a student lets an AI set the frame, they can revise their way to a strong paper that never asks which problem it is solving, and the finished paper hides that, so faculty have to ask instead of reading for it.

## 3. The question a teacher should ask afterwards

"What did you decide the problem was, what other ways of defining it did you consider, and why did you set them aside?"

## 4. The final frame alone

It mostly carries the idea. The grey bracketed area labelled "AI'S FRAME" holds the student's polished draft. Dashed items sit outside it. A plain copy labelled "What faculty receive" sits to the right, with the question underneath. Without the animation, it tells me: the AI drew the boundary, the work happened inside it, the handed-in paper looks clean, so ask.

What the still loses:
- **Red means student.** The "Student" label left in beat 3, so the final frame shows an unlabelled red dot and unexplained red margin bars.
- **Time.** I can't tell there were three drafts or that the red bars are revisions.
- **Narrowing.** The zoom, the essay's "distance" mechanism, is gone.
- **The copy comparison.** Side by side, the comparison works better than in the animation. But it depends on reading grey against navy in small type on the copy.

As a social-card poster with no beat list, the red marks are unexplained, and at card size the "AI'S FRAME" tag and the copy would be unreadable.

## 5. Problems, ranked

1. **Beat 7's key change is the hardest one to see, and the most visible change makes a different point.** The caption is about who chose the frame. What I'd see is the student's red revision marks vanishing. That points a teacher toward "require tracked changes or version history". Yet the figure itself shows that the revision history (every red bar inside the brackets) wouldn't reveal the frame either. The change that fits the caption is grey turning to navy, and it's weak for three reasons:
   - the two colours are low-contrast;
   - it happens on a 58% copy;
   - it's timed while I'm still reading the caption.

   The brackets simply don't come along, so the frame's disappearance isn't animated. Possible fixes:
   - Make the frame's loss the visible event: brackets and tag lift with the copy, then dissolve as a separate step after the caption has been read.
   - Or keep the red bars on the copy, which would make the point that even the revision history shows nothing about the frame.

2. **There's no picture of what owning the frame looks like, so the lesson can be misread two ways.** Nothing red ever touches a consideration or a bracket. Put beat 2's "framing means picking" next to beat 6's four leftover dashed chips, and a teacher can take away either of two wrong lessons:
   - (a) the AI's frame was too narrow, so students should cover all six (a checklist);
   - (b) using an AI-proposed frame is itself the failure.

   The essay's point (as quoted on the page) sits between them: a reasonable frame accepted without the distance to revise it. One line would close this gap, for example: "A student who weighed the other four and still chose this frame would hand in the same paper." That also explains why faculty have to ask.

3. **The narrowing from "respond" to "deter" is invisible to a non-specialist.** The faculty check depends on noticing that the AI's title redefined the task. Many educators, PME faculty included, would hear deterrence as the natural reading of "respond to a buildup". Then the answer to "What problem did the student choose to solve?" looks fine to them. Something needs to point at the gap. The task card's "response" could echo against the title, or a beat could name it.

4. **The colour key sits in small labels, and some of them disappear.**
   - Grey means AI only through a 10.5-unit mono tag: about 8 px at 720 px wide, about 4 px at 390 px.
   - Red means student only through a label that leaves after beat 3.
   - Dashed means "unexamined" is never stated, and "optional" or "peripheral" is the more natural reading.
   - Grey and navy text are hard to tell apart at small sizes, and beats 5–7 depend on that difference.

5. **The faculty check may not separate a captured student from an owning one.** A captured student can answer "What problem did you choose to solve?" confidently: "Deterring the adversary." The question that exposes capture is the follow-up: what else could the problem have been, and why was it ruled out? The page should give teachers that follow-up, or the question should include it. Also make it clear whether the question is addressed to the viewer or to a student.

6. **The beat 4 zoom reads as camera convenience.** On first viewing, the push-in looks like getting close enough to watch the writing. The narrowing only becomes legible after beat 6. The caption arriving 2 s before the move weakens it further.

7. **Beat 5 is dense, and "stronger" is asserted, not shown.** There are five events in 3.7 s, plus two label changes. The table counts 0 label words, but "DRAFT 2" and "DRAFT 3" are new text. Justified rows read as formatting polish.

8. **Fairness to AI.** An AI asked about a military buildup that organizes everything around only two of six considerations may look like a strawman to AI-literate faculty: current assistants usually list alliances and domestic politics without being asked. The "reasonable" caption helps. Showing the AI mention the other four in passing while its title and headings still set the frame would be fairer, and closer to how capture happens in practice.

9. **The layout ranks the considerations before the AI does.** The AI's two picks start in the centre and the other four sit at the edges, so they look marginal before anyone chooses. The two meta-questions are styled the same as the four topics. Smaller: the beat 7 copy sits between the two right-hand chips.

10. **Reading load in beats 1–2.** Counting in-picture text, beat 1 has 20 words in 6.7 s and beat 2 has 27 words in 9.5 s. That's one read, not the two the pacing rule aims for.

11. **The setup copy gives away the turn.** "Each revision improves the answer inside a boundary the student never chose" comes before playback, so beat 6 can't land as a recognition. That's probably acceptable for teachers, but it conflicts with beat 4's stated purpose.

12. **Housekeeping and build checks.**
    - The Links section contains an author note ("still waiting for Jack") and a provisional book target.
    - "The first of the four moves" introduces "four moves", which the page doesn't explain.
    - "Historical precedent" at Sans 600 15 plus padding, starting at x 432, could reach or cross the right bracket at x 616.
    - The ~205-unit copy on a 214-unit sheet leaves about 4–5 units of side margin.

**Factual claims I'd want sourced:**
- The essay passage quoted under "From the essay" is accurate and from Section II.
- Section I's second officer really assigns her agents those four roles.
- The essay's "frame capture is invisible inside the final product."

The figure shows no numbers. The task and "Deter the adversary" are labelled as constructed, which is fair.

## Post-read source check

(Added after the read above was written. I checked only the essay, `nwc-irreducible-officer-companion/the-irreducible-officer.md`. I did not open the storyboard's Intent or the plan files.)

- **The quoted passage is verbatim** from Section II (essay line 33), including "The frame capture is invisible inside the final product."
- **The four roles match Section I** (line 11): "adversary behavior, alliance dynamics, historical precedent, domestic politics, and other pressures on the decision."
  - One nuance: in the essay, these are roles the second officer gives her agents *after she has defined the problem*. That makes her the essay's example of frame ownership at scale (line 197).
  - The figure turns them into considerations the captured student leaves out. That's a fair use, but it reverses their role in the essay. A teacher who later reads Section I might find it odd to see them used this way.
- **"Whose interests count" and "Which constraints are fixed"** paraphrase Section II's "privilege one set of interests over others" and "treat a structural constraint as fixed when it should be contested." Accurate.
- **"Failure mode 1 of 7" checks out.** Section II names seven, with frame capture first.
