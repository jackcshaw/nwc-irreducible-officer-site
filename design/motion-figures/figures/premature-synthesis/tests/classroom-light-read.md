# Premature synthesis, classroom casts: light read

**Pages:** `index.html?edition=business&cast=classroom` (higher ed) and `index.html?edition=business&cast=high-school` (high school).
**Reader:** an educator who hasn't read the essay. I read it first as a higher-ed instructor (a non-CS humanities instructor, then a CS instructor), then as a high-school teacher.
**Method:** served on port 5233. Real-speed frames every 0.5 s at 1280×900 (shot centred) and 390×844 (controls aligned to the bottom of the viewport; see problem 3). Spot checks at 1280×720, under reduced motion and by keyboard. Low memory caused a few capture stalls of up to 3.6 s, so I timed beats from the figure's own schedule (beats start at 3, 9.8, 18.5, 27.7, 39.4, 48.7, 56, 63.9, 75.7 and 86.3 s, and the figure ends at 93 s) and from a log of caption changes, not from frame spacing.

## Beat by beat (same motion in both casts)

1. **Task (0:03–0:10).** An example-task card, a red dot labelled Student, and six numbered doc cards appear one at a time. It was clear to me.
2. **AI code (0:10–0:18).** The dot visits each card and notes open on them. Then five dashed grey lines appear at once, labelled "AI code" in small grey type. The dot loses its "Student" label as soon as it moves. Nothing on screen stands for the AI apart from that label.
3. **Hand-in (0:18–0:28).** The lines turn solid. A write-up, "First student's code", gets typed, with the 2–5 line marked "Main link" and "AI helped with the code" at the foot. The dashed-to-solid change only means "took it as written" because of the caption.
4. **Second student (0:28–0:39).** The first dot and its lines leave. The second dot visits the cards, asks "How does cancellation work?", and gets the AI's grey answer. It then draws three red lines. Its label stays parked where it started while the dot moves.
5. **Bug and fix (0:39–0:49).** This is the busiest beat. Line 1–2 is drawn, a cross and the note "Bug: when one fetch failed, the group canceled the rest" appear, and the line pulls back. Then two fix lines arrive with small italic red labels, all in about 6 s. I could follow it, because everything stays on screen into the next beat.
6. **Same code (0:49–0:56).** The second write-up looks identical to the first. "What faculty receive · The same code" (high school: "What the teacher receives") sits alone for about 2 s.
7. **Code closed (0:56–1:04).** The write-ups shrink into a strip ("Both say AI helped"), and the two route labels and two identical sketches appear. That's a lot arriving at once, but it builds in order.
8. **The question (1:04–1:16).** The 2–5 link is ringed on both sketches. The question appears, and the first student's answer types out over about 4.5 s, then holds.
9. **What they learned (1:16–1:26).** "What they learned" appears with the bug note, then the second student's answer.
10. **Check (1:26–1:33).** The point and the check questions fill the caption band, and everything above stays in view.

The **phone layout (390)** is a text-and-pill version: the doc list, connection pills such as 1–4 and 2–5, and cards for the answers. It's slower to parse but complete. For most beats there's a large empty band between the content and the caption. The final card works well on its own.

## Higher-ed cast

1. **The failure, in my words:** a student hands in AI-written code that works, and in a course that allows AI the code looks exactly like the work of a student who built the understanding. Only a code-closed question about what would make a connection fail shows the difference.
2. **What separates them:** the second student asked the AI how cancellation works, wrote the code, hit the bug and fixed it. In class, that student can apply the rule to the specific link. The first can recite the rule but isn't sure it applies.
3. **Cheating, "don't use AI", "AI harms learning"?** It doesn't read as cheating. The setup says the course allows AI and both students say they used it, both write-ups carry "AI helped with the code", and the strip says "Both say AI helped". It isn't "don't use AI" either, because the second student's route is labelled "asks AI". It does lean towards "write it yourself", though: "fixes it alone", "Built, broken once, fixed", and the follow-up line "The student who wrote the code, broke it and fixed it can say…". The study section opens with "Developers given an AI assistant scored lower", which primes "AI harms learning". The paragraph on usage patterns and the Brynjolfsson counter-evidence offset that, but they come further down.
4. **Workplace words:** none outside the study description. I searched for engineer, tech lead, manager, company, team, job, staff, deadline, review and client. The only hits are in the study section: "developers", "professional or freelance programmers", "actual job", "customer support agents" and "worker learning". "Build a feature" and "docs" are industry phrasing, but they're normal in a CS course.
5. **Does it work as an assignment, and could a non-CS instructor follow it?** Yes as an assignment: a timed lab with AI allowed, followed by a code-closed sketch and a viva-style "what would make it fail?", is a pattern I'd recognise and could reuse. The "same time limit" detail keeps it fair. As a humanities instructor I could follow the structure (same product, different process, an oral check exposes the difference), but not the content. Task groups, fetches, cancellation, timeouts and channels are opaque to me, and the two final answers sound like the same rule to me. The first even sounds appropriately careful. I had to trust the caption "applies the rule" and the "What they learned" note.
6. **Study participants described accurately?** Yes. The setup says "a study of developers learning a new library; the students, the course and the task are constructed". The study section says "52 developers recruited online, most of them professional or freelance programmers". It never calls them students. One small overstatement: the closing "The study's participants were working developers" drops the "most".
7. **Can each caption be read and each movement followed in time?** Yes. Captions run 20 words at most and stay on screen 6.7–11.8 s. On-stage notes and answers stay up until the end. Beat 5 and the handoff from beat 6 to 7 are the tightest moments, and still followable.

**Point:** two students hand in the same AI-assisted code. Only the one who asked how it works, and then built and debugged it, can say what would make the main connection fail, so the code alone doesn't show who learned the library.
**Question a teacher should ask afterwards:** "Point to one connection in your work. What would make it fail, and what depends on it?"

## High-school cast

1. **The failure:** the same failure as above, in a "programming class" with a "teacher".
2. **What separates them:** the same as above.
3. **Cheating, "don't use AI", "AI harms learning"?** Mostly no, and for the same reasons. There's one extra risk at this level: the class policy ("The class allows AI") appears only in the setup paragraph, never on stage. A teacher who only watches sees "Read → AI writes → hands in", which many high-school teachers equate with cheating. The disclosure tag "AI helped with the code" and "Both say AI helped" mostly defuse it. The lean towards "write it yourself" is the same as in the higher-ed cast.
4. **Workplace words:** none outside the study description. No "faculty" or "course" anywhere either: not on stage, in the phone layout, in the beat list or in the page copy. It uses "What the teacher receives", "Then the teacher asks", "The teacher points to 2–5" and "Teacher's check".
5. **Does it work as an assignment, and could a non-CS teacher follow it?** The structure works. The task is a stretch for high school: fetching three records concurrently with task groups, cancellation and channels is advanced-elective material, not intro CS, and a high-school CS teacher may find it unrealistic. A non-CS high-school teacher follows the shape but probably not why the first answer is weaker.
6. **Study participants described accurately?** Yes. The study copy is identical to the higher-ed page, with the same small "were working developers" overstatement.
7. **Can each caption be read and each movement followed in time?** Yes. The timing is identical.

**Point:** same code, same disclosure. The teacher's code-closed question, "what would make this fail?", shows which student actually learned how the pieces fit.

## The final frame alone

At 1280 it carries the idea: two identical write-ups, two identical sketches with the same link ringed, two answers side by side, and the check. Without the animation, "Redrawn from the AI's code" against "Built, broken once, fixed" does the explaining. The phone final card carries it too. At phone width the question "What would make fetching in one group fail?" stands in for the ringed 2–5, because the doc-section names have left the screen by then.

## Problems, ranked

1. **It isn't clear what separates the students.** The setup says "Who wrote the code isn't the difference; asking how it works is." But the animation and the follow-up credit writing, breaking and fixing it alone: "The second student applies the rule, from the bug they fixed", and "The student who wrote the code, broke it and fixed it can say…". The study's top group (AI wrote the code, then they asked follow-up questions, 86%) appears only in the study section, and the figure never shows that route. A teacher could leave with the rule "make them write it by hand" instead of "make them ask how it works". This affects both casts.
2. **Too much domain knowledge for non-CS readers and for high school.** The decisive contrast is between "The docs say one failure cancels the group. I'm not sure that applies here." and "If one fetch hits an error it doesn't catch, the group cancels the other two." Without CS that's a hard distinction to hear. The page text under the figure says "The second line separates them", which is ambiguous: the second check question, or the second student's line? For high school, the concurrency task itself is unrealistic.
3. **Autoplay often doesn't start at phone size or at 1280×720.** Autoplay waits until the shot and the controls are fully visible. At 390×844 they take 830 of 844 px, which leaves a 14 px scroll window. At 1280×720 they take 693 of 720 px. With the shot centred, neither size started: both sat on the title poster at 0:09. Each started only once I aligned the controls with the bottom of the viewport. At 1280×900, centred, it autoplayed. Play is visible, so a reader can recover.
4. **Nothing marks the high-school version, and the switch loses it.** It shows the same "Classroom edition" note as higher ed. From the Workplace or PME page, the Classroom link goes to `cast=classroom` (the higher-ed wording with "course" and "faculty"), so a high-school teacher who looks at another edition and clicks back lands on the higher-ed cast.
5. **Red means two things.** It's both the student colour and the bug/error colour. The second student's "TRIES → FIXES" and "Built, broken once, fixed" are in red, and teachers read red ink as "wrong".
6. **Sourcing.** The page says "5,172 customer support agents". The source spine says "more than 5,000" (and recent commits deliberately kept that wording). The experience split (19 with four to six years, 4 with one to three) and the times (19.5 vs 22 minutes) aren't in the spine, so they need checking against the paper. Every other number matches the spine.
7. **Labels on the dots, at 1280.** The first dot drops its label once it moves. The second student's label stays where it started while the dot moves. At 1280×720 the small write-ups in the strip lose their titles.

## Edition switch

It works on both pages. Workplace goes to `?edition=business` (the "Two engineers…" workplace edition, with Workplace marked current). PME goes to `?edition=pme` (the seminar-paper example, with PME marked current). Classroom is marked current (`aria-current="page"`) and links back to the same page: `cast=classroom` on the higher-ed page and `cast=high-school` on the high-school page. The current option is shown by weight 600 against 500 and a slightly heavier underline. It's visible but subtle. (Unrelated, but I noticed the Workplace page note says "The other edition is…" when there are three.)

## Mechanical checks

- **Reduced motion:** shows the final frame (1:33) with the full check text, in both casts.
- **Horizontal scroll at 390:** none (scroll width 390).
- **Keyboard:** Tab reaches Play after the nav links. Enter plays and pauses, and the arrow keys move the scrubber.
- **1280×720:** the picture shows. The stage is 461 px, and the caption band and controls fit exactly once scrolled.
- **Numbers:** 52; 29 with seven or more years; 35 minutes; 17% / d = 0.738 / p = 0.01; 50% vs 67%; the group sizes; and 86%, 65%, 39% and 24% are all in `sources/source-spine.md`. The exceptions are listed under problem 6.
