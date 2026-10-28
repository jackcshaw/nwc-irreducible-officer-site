# Figure read, round 2: Invisible delegation

Cold read on 2026-10-28. I watched `figures/invisible-delegation/index.html`, served locally on 127.0.0.1:5241. I captured a frame every 0.5 s through the whole run (225 frames per size) at 1280×900 and at 390×844, with the figure scrolled fully into view so it autoplayed. I also logged the caption text and clock with every frame, held key moments with `?t=`, and checked `?reduced`, `prefers-reduced-motion`, keyboard access and overflow at 390 px. Timings below are from the 1280 run; the 390 run matched within 0.5 s.

Before the figure scrolls into view, it shows a poster frame: beat 2 at 0:16, with the empty ledger. Once it is in view it resets to 0:00 and plays. It runs 1:41.

## 1. Beat by beat

The motion map counts frames where the stage pixels changed. "Idle" means the picture is complete and the caption has already been read.

| Beat | Caption (on screen) | What I see | Caption time | Picture busy | Idle |
|---|---|---|---|---|---|
| 1 | A student wants to improve a draft strategy paper. | An "Example task" card ("Recommend whether to keep a forward base."), then a red dot labelled "First student" and a paper thumbnail. At 0:03.5 a rubric line is added: "Evidence must back the call." | 0:00.5–0:09 (8.5 s) | 0:01–0:03.5 | **0:04–0:09.5, about 5.5 s** |
| 2 | Improving it takes many decisions. We'll track three. | A three-lane ledger draws in: THE STUDENT DECIDES / REQUESTS / THE AI DECIDES. Three dashed cards drop into the student lane: "The criteria", "How the argument runs", "What 'strategic' means". The AI lane gets three empty slots. | 0:09–0:17 (8 s) | 0:10–0:12.5 | **0:13–0:18, about 5 s** |
| 3 | The student asks an AI for feedback. The request carries the criteria across. | A bubble saying "Give me feedback" appears beside the criteria card (0:18.5) and waits about 2.5 s. Then it drags the card across the Requests lane into the AI lane (0:21.5–0:23.5), where the card turns grey. The request stays behind as a quotation. An "AI's notes" box arrives ("Tighter opening / Add the costs / Be more decisive"), the dot ticks all three in about 1.5 s, and the paper becomes "Draft 2, revised with AI". | 0:17–0:29.5 (12.5 s) | 0:18.5–0:27.5 | 0:28–0:30 |
| 4 | Then for a better structure, and a more strategic version. | The same move twice: "Suggest a better structure" carries "How the argument runs" across (0:32.5–0:34.5), then Draft 3. "Make it more strategic" carries "What 'strategic' means" across (0:36–0:38), then Draft 4. The student lane is left with three empty slots, and the paper thumbnail now has grey (AI-coloured) lines mixed into its navy ones. | 0:29.5–0:41.5 (12 s) | 0:30–0:40 | 0:40.5–0:41.5 |
| 5 | Each request left out whose standard to use. The AI used its own. | **For 4 s nothing changes** (0:41.5–0:45.5). Then a key appears, "⬚ LEFT UNSAID", and one dashed line slots under each request: "UNSAID against your criteria / for your argument / as you define it". | 0:41.5–0:51 (9.5 s) | 0:45.5–0:48.5 | 0:41.5–0:45.5 and 0:49–0:52 |
| 6 | A second student, with the same task, starts from the rubric. | The first student's ledger slides up and a second ledger fades in below it (0:52–0:53.5). The second student has the same three dashed cards and an empty AI lane. The red dot moves up to the rubric, which enlarges, is highlighted and stays underlined. | 0:51–0:58.5 (7.5 s) | 0:52–0:55.5 | 0:56–0:59 |
| 7 | Before each request, the second student writes the decision down. | The rubric shrinks back. After a 2 s gap, each card in turn becomes solid with a red outline, and then the request goes out with a red qualifier and a small red arrow back to the card: "Give me feedback *against my criteria*", "Suggest a better structure *for my argument*", "Make it more strategic, *as I define it*". **No card moves.** The AI lane stays empty. | 0:58.5–1:09.5 (11 s) | 1:01.5–1:08 | 0:59.5–1:01.5 and 1:08–1:10.5 |
| 8 | Both get the same AI notes. The second student turns one down. | The second student gets the identical notes box. Two ticks, then "Be more decisive" is struck through in red and "*if the evidence is*" is written under it. Then Draft 2, 3 and 4 tick by in about 2.5 s, and the thumbnail gets the same grey lines. | 1:09.5–1:19.5 (10 s) | 1:10.5–1:18 | 1:18–1:20.5 |
| 9 | Faculty have only the papers. They ask each student about the standard. | Everything except the two paper thumbnails fades to a ghost (1:20.5). Both read "Draft 4, revised with AI". After a 2 s pause, "FACULTY ASK: Better by whose standard?" appears top right (1:23.5). Then answers type out in speech boxes. First student: "The AI's notes, I suppose. I worked through what it flagged." (1:24–1:28.) Second student: "Mine, set first from the rubric: does the evidence back my call?" (1:28.5–1:33.) | 1:19.5–1:34.5 (15 s) | 1:20.5–1:33 | 1:21.5–1:23.5 and 1:33–1:34.5 |
| 10 | FACULTY CHECK: What did the AI decide for the student? / To find out, ask each student: better by whose standard? | The first line appears at 1:34.5 over the ghosted ledger. At 1:38 the ledger returns to full strength, and the second line appears at 1:39. It ends at 1:41 and holds. | 1:34.5–end | 1:38–1:39 | 1:35–1:38 (a deliberate pause to think) |

**Can each caption be read, and each movement followed, before the next arrives?** Yes, at both sizes. No caption is on screen for less than 7.5 s, and none is longer than 13 words. Each card's crossing takes 1.5–2 s, and the bubble's text travels with the card, so you can still read the request while it moves. The typed answers run at about 14 characters a second, which is close to reading speed. Each answer stays on screen, so nothing is lost when the caption changes. The fastest moments are:
- the three ticks in beat 3 (about 1.5 s), which read as "ticked them all", and that is the point;
- in beat 4, the third bubble appears 1.5 s after the second card lands, while my eye was still on the AI lane;
- the draft counter running 2→3→4 in beat 8.

None of these made me lose the thread.

**Does the picture show what each caption says?** Mostly, and literally. Beat 3 is the best match in the figure: the request visibly *carries* the card across. Beat 5 matches once the "unsaid" lines arrive, but the caption sits for 4 s over a picture that hasn't changed yet. Beat 7 matches the words ("writes the decision down"), but what gets written down is never shown (see Problem 1). Beat 8's "turns one down" is shown as a strike-through followed by a conditional ("if the evidence is"), which reads more like a qualification than a refusal (Problem 2).

**Moments where I wasn't sure what I was looking at:**
- Beat 2, desktop: what the dashed outline on the cards means. The phone view labels them "UNDECIDED"; the desktop view doesn't.
- Beat 5: the header line reads "REQUESTS ⬚ LEFT UNSAID". On first glance I read it as one column title, "Requests left unsaid".
- The red dot hops from notes to paper to rubric to cards. I worked out that it is the student's attention, but nothing says so. In beats 3 and 4 it sits on the edge of the AI's notes box.

**Phone (390×844).** This is a separate stacked text layout, not the drawing shrunk down. The cards don't travel. They relabel in place: UNDECIDED → AI DECIDES, or UNDECIDED → STUDENT DECIDES. The two students sit side by side in columns. It reads clearly and is arguably *more* explicit than the desktop version. The final frame, caption and controls fit within 844 px. Small issues:
- a layout jump of about 9 px when the rubric enlarges (0:55–0:56);
- the paper thumbnails are gone, so "Faculty have only the papers" is carried by the "DRAFT 4 / REVISED WITH AI" labels alone;
- the two answer bubbles sit at slightly different heights;
- the phone shows "DRAFT 1" from the start, while the desktop never labels draft 1.

## 2. The point

Ordinary requests like "give me feedback" or "make it more strategic" quietly let the AI decide the criteria, the argument and what "strategic" means. The finished papers can't show whether that happened, so faculty have to ask the student whose standard the revisions followed.

## 3. The question a teacher should ask afterwards

"Before you used the AI's suggestions, what were you judging them against, and where did that standard come from?"

## 4. The final frame alone

It works as a static slide. Without the animation, it shows two matched rows:
- In the first row, the student lane is empty, the AI lane holds all three decisions, and three dashed "UNSAID" phrases sit under the requests.
- In the second row, the student lane holds three red decisions, the AI lane is empty, and the requests carry red qualifiers.

The two answers sit beside the rows, and the caption asks the question. What it says to me is that **the same help, accepted the same way, can leave the decisions with different people, and only the student's answer tells you which.** A first-time viewer would need about 20 seconds with it, because it is dense: about 40 text items. The one thing the still frame loses is the motion of the cards crossing. Without it, "the AI decides" reads like a classification, not a transfer.

## 5. Problems, ranked

1. **Logical tension: the second student's decisions have no content, and the AI's notes come out identical anyway (confusion).** In beat 7 the second student "writes the decision down", but the red cards still say only "The criteria", "How the argument runs" and "What 'strategic' means". The requests then add "against my criteria" and "for my argument", which an AI can't act on unless the criteria are actually supplied. A teacher could take away the wrong fix: add "against my criteria" to the prompt. Beat 8 then says "Both get the same AI notes". If the request really carried the student's criteria, why didn't the notes change? As drawn, the only visible difference is what the student did *after* the notes arrived (striking one). That is closer to "evaluate before you accept" than to "the request carries the criteria across". The rubric line ("Evidence must back the call") and the final answer imply what the criteria were, but the figure never shows them written in the card or sent with the request. **Fix options:**
   - Write the content into the red cards, for example "Evidence backs the call", "Base stays / goes, then why" and "Strategic = long-term cost vs. access" (or whatever is right).
   - Show that content going out with the request.
   - Or say in caption 8 *why* the notes are the same. For example: "The AI gives both the same notes. Only the second student has a standard to check them against."
2. **Beat 8's "turns one down" doesn't match the picture (caption vs. picture).** "Be more decisive" is struck through, but "if the evidence is" is written under it. That reads as conditional acceptance ("be more decisive if the evidence is decisive"), and the phrase itself is elliptical. Either show a clean rejection with a reason, or change the caption to "pushes back on one" or "qualifies one", and complete the note, for example "only as far as the evidence goes".
3. **Drag: about 25 s of the 101 s has a complete, already-read picture on screen.** The worst stretches are 5.5 s at the end of beat 1, 5 s at the end of beat 2, and 4 s at the start of beat 5 where the caption appears before the picture changes. Cuts to reach about 90 s are in the next section.
4. **The figure alone is slightly unfair to the first student and to AI feedback (fairness).** The AI's notes are reasonable, and "Add the costs" arguably serves the rubric. The figure doesn't distinguish accepting a good note from giving up judgment. The essay's "may delegate" hedge and the "an assistant can legitimately propose criteria" objection appear only in the text below, not in the figure. Someone who watches the figure alone could leave thinking "asking an AI for feedback means handing over your judgment". To be fair, the first student's answer is honest, not a caricature, and both papers end identical, so the figure doesn't claim the first paper is worse.
5. **Desktop legend gaps (ambiguous visual).** The dashed cards in beat 2 are unexplained on desktop (the phone says UNDECIDED). The "REQUESTS ⬚ LEFT UNSAID" header can read as one title. The red dot's role is never named. All three are small, and all three are already solved in the phone layout's labels.
6. **Minor polish.**
   - Phone: the 9 px layout jump at 0:55, and answer bubbles at uneven heights.
   - Desktop: the red dot rests on the edge of the AI's notes box in beats 3 and 4, and in one frame (0:38) the request text ghosts on top of itself as the bubble settles.
   - At the end, "Replay" and "Restart" sit side by side and do the same thing.
7. **Factual claims to source.** "Failure mode 5 of 7" in the kicker, and the two essay quotations below the figure. These are checked in §6.

### What I would cut to reach about 90 s (saves about 12.5 s, to about 88–89 s)

| Where | Now | Cut | How |
|---|---|---|---|
| Beat 1 | Picture complete at 0:03.5, caption held to 0:09 | −3 s | End the beat about 2 s after the rubric line lands. |
| Beat 2 | Ledger complete at 0:12.5, held to 0:17 | −2.5 s | As above. Or merge beats 1 and 2 into one ("A student wants to improve a draft paper. That takes many decisions; we'll track three."), which saves about 5 s by itself. |
| Beat 3 | "Give me feedback" bubble waits 2.5 s before moving; 1.5 s tail | −1 s | Start the drag about 1 s sooner. |
| Beat 5 | 4 s of unchanged picture under the new caption; 3 s tail | −2 s | Start the "unsaid" lines about 1.5 s after the caption, not 4 s. |
| Beat 7 | 2 s gap after the rubric shrinks; 2 s tail | −1.5 s | Close the gap. |
| Beat 9 | 2 s of ghosted ledger before "Faculty ask" appears | −1.5 s | Bring "Faculty ask" in right after the fade. |
| Beat 10 | 3.5 s between the first and second lines | −1 s | Keep most of this pause. It is the one idle stretch that works. |

Don't cut beat 4 (already the tightest), the typed answers in beat 9, or beat 8's strike-through. Those are the moments a teacher needs to see.

## 6. Mechanical checks

- **Does the reduced-motion view show the final frame with the full text?** Yes. `?reduced` and `prefers-reduced-motion: reduce` both open at 1:41 / 1:41 on the final frame, with both caption lines ("What did the AI decide for the student? / To find out, ask each student: better by whose standard?"), both answers and the full ledger. The button reads "Play". The beat list under the figure is expanded with "On screen:" descriptions. The same holds at 390 px, where everything fits in 844 px.
- **Any horizontal scroll at 390 px?** No. `scrollWidth` is 390 = `innerWidth`, both in the stacked layout and at the end state. No element extends past the right edge.
- **Can you reach play, pause and scrub by keyboard?** Yes. The tab order is brand, Essay, Practice, then the Play/Pause toggle, Restart and the scrub slider. Enter and Space toggle play and pause. Arrow keys move the scrubber 1 s per press and update the clock and caption. End jumps to the final frame. The slider announces `aria-valuetext` ("0:06 of 1:41, beat 1 of 10"). The focus ring is visible: a double border on the buttons.
- **Is every number shown found in the source spine or the essay?** The numbers shown are the beat counters ("1 / 10" … "9 / 10"), "Draft 1" to "Draft 4", the clock, and the kicker "Failure mode 5 of 7". The draft numbers belong to the stated constructed example. No statistics appear anywhere in the figure. I checked "5 of 7" against the sources only after writing everything above. The result is in the note below.

**Source check, done after the read was written.** "Failure mode 5 of 7" is correct. Section II of `the-irreducible-officer.md` bolds seven failure modes in this order: frame capture, fluency substitution, premature synthesis, uncalibrated reliance, **invisible delegation** (5th), institutional monoculture, responsibility laundering. Both blockquotes below the figure match the essay word for word. The Section II quote is at line 41 and the Section V quote ("Minimal-context prompting…upstream.") is at line 93, and both section names in the citations are correct. The source spine has no numbers relevant to this figure, and none are needed.
