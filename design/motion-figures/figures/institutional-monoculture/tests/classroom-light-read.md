# Institutional monoculture, classroom casts: light read

Read on 2026-10-30. I read as an educator who hasn't seen the essay: first as a higher-education strategy instructor (`?edition=business&cast=classroom`), then as a high-school teacher (`?edition=business&cast=high-school`). Before writing this I opened no storyboards, plans or earlier test reports.

**Method.** I served the pages on 127.0.0.1:5241 and used Playwright with one browser at a time. Each page was scrolled into view so it autoplayed, then captured every 0.5 s to the end (1:34) at 1280×900 and at 390×844. That's four runs of about 195 frames each, which I watched in order on contact sheets. I also held the final frame (`?t=94`) at 1280×720, checked reduced motion, swept the page text and attributes at 11 moments for workplace words, and clicked each option in the edition switch. The page text was the same at the start and end of the test, so the shared cast update didn't land mid-test.

---

## Higher-education instructor (cast=classroom)

**1. The failure, in my words.** Ten students each get a sound plan out of the same AI, and every plan quietly answers the same question, "how do we differentiate?" Read one at a time, nothing is wrong. The class as a whole has considered one frame, and the frame came from the AI's outline, not from the students.

**2. What's missing, and how the reviewer finds it.** Missing are cost-matching and partnering or licensing, along with any other way of defining the problem. The instructor finds the shared frame by lining up each plan's first line (its problem statement) and reading them together, which ends in a bracket: "One frame: differentiate." Lining up can't show what's absent, so the instructor then asks "What frames are missing?" and, in the imagined rerun, sends the plans back. The figure is careful to say the instructor never sees the AI outlines ("Not seen by the instructor"). The lineup alone shows the frame is shared, but not where it came from.

**3. Cheating, "don't use AI", differentiate wrong?**
- **Cheating:** no. The intro says "The class allows AI, and each student says they used it," and both runs are labelled "All drafted with AI."
- **"Don't use AI":** no. In the rerun the AI is used differently: students define the problem first, then the AI challenges it ("What did you assume? What other frames fit?"). The labels "AI outline → write" and "Define problem → AI challenges → write" make that contrast clearly.
- **Differentiate wrong:** mostly no. Differentiate stays as one of the three rerun groups, and the closing text says "a different frame isn't better by itself. A class can compare several frames and still agree on one." Visually, though, the "fixed" state is a spread of 3/4/3, and the first-run bracket turns grey under an "AI's frame" tag. A fast viewer could still take away "spread is good, convergence is bad." A strategy instructor will also notice that differentiating is the textbook answer for a patent-holding incumbent facing a low-cost entrant (Porter, Christensen). The class might converge on it without any AI, because the course taught it. The page's "agreement can also come from shared purpose or strong evidence" points toward this but doesn't name the course itself as a possible source.

**4. Workplace words.** No analyst, manager, CEO or team appears anywhere in the figure, captions, beat list, description or aria text. What remains:
- "knowledge workers", "industrial company/corporation" and "one company": these describe the Bottesch study, so they're fine.
- "a strategy class working a company's case" (closing line): natural for a case course.
- "the imagined board is one possible answer" (body): a leftover. Nothing else calls the rerun a "board", and on a business page "board" can read as a board of directors. Suggest "the imagined rerun" or "the imagined lineup".
- The task card's first person ("How should **we** respond… **our** patents") is ordinary case-method voice, so it's fine.

**5. Does it work as a class assignment?** Yes. A strategy class working one case question with the school's AI, ten write-ups and an instructor reading them reads as a real seminar assignment. Ten is a small section, but it's believable.

**6. Reviewer wording.** "Not seen by the instructor", "The instructor lines up each plan's problem" and "Instructor's check" all read naturally. The question label "INSTRUCTOR ASKS" drops the article, so it reads a little clipped next to the high-school "THE TEACHER ASKS". The beat list and description also call it "The instructor asks". I'd make it "THE INSTRUCTOR ASKS" if it fits (see the spacing note under the high-school answer to question 6).

**7. Reading and following.** All the step captions are 7 to 13 words and stay up for 4.5 to 13.5 s, never faster than 2 words a second. The final check (33 words) stays on screen. Every caption could be read comfortably. Every movement can be followed except one:
- **Beat 8 (desktop, about 58.4 to 60.4 s):** the whole first run shrinks, moves up and dims in about 2 s while the "One frame" label moves to the top of the list and the question box shifts. It lands clearly, but for a moment I lost track of what had gone where.
- **Beat 4 and beat 10 lift-outs:** each line flying to the list briefly overlaps a plan or the next column (for example "Should we partner?" crossing "Who is switching?"). These overlaps are momentary and harmless.

## High-school teacher (cast=high-school)

**1. The failure, in my words.** It's the same failure as above, with "the teacher" doing the reviewing.

**2. What's missing, and how the reviewer finds it.** The same as above: line up the first lines, see one frame, ask "What frames are missing?", send the plans back.

**3. Cheating, "don't use AI", differentiate wrong?** The answers match the instructor read. Neither cheating nor "don't use AI" is implied, and both runs use AI openly. Differentiate isn't presented as wrong. The cheating question matters more in high school, and the "class allows AI" sentence answers it.

**4. Workplace words.** The figure itself is clean. The leftovers are the same as above ("imagined board", "a company's case"). The study descriptions are fine.

**5. Does it work as a class assignment?** This is the weakest point. Only the reviewer's title changed. The intro still says "a strategy class", which isn't a course in a typical high school, and the case runs on dealers, patents, price-led buyers, service revenue, unit costs and licensing. A business, economics or entrepreneurship elective teacher could run it. A general high-school teacher would read it as a college or business-school case borrowed for the page. I'd name a high-school course (for example "a business elective" or "an economics class") and consider a simpler case. "Ten students" is also small for a high-school class, though it works as an illustration.

**6. Reviewer wording.** "THE TEACHER ASKS", "Not seen by the teacher" and "Teacher's check" are all natural. At 1280 px the "THE TEACHER ASKS" label sits about 2 px from the right edge of the bracket and overhangs its dashed box on the left. It's legible but cramped.

**7. Reading and following.** Timing matches the instructor cast to within half a second per beat, so the same verdict applies: every caption is readable, and beat 8 on desktop is the one hard movement.

---

## Viewports

- **1280×900:** autoplays when the picture and caption are in view. My first attempt, scrolled about 0.3 s after load, didn't start. The likely cause is the edition text filling in and pushing the figure down, since the duration read 1:39 before the fill and 1:34 after. It may be a test artifact, but a reader who scrolls very quickly could hit it. Once centred after the page settled, it autoplayed every time.
- **1280×720:** the whole picture and caption band fit (stage 64–587 px, caption 587–679 px). The controls start at 679 px, so only their top 41 px are visible. Autoplay started.
- **390×844:** a separate text-first layout. The final frame is clear and well ordered (task, AI card, first run, question, rerun groups, check), and there's no horizontal scroll. Two problems:
  - The ten plans are drawn as roughly 15 px icons in one row, so "ten different layouts" and the ticks are close to invisible.
  - At about 76 s, in beat 10, both rows of plan icons vanish and the lists jump up within about 1 s. It's the phone's one hard-to-follow moment.
  - The phone drops the case context line (prices, patents…) after beat 3. That's fine.
- **Reduced motion:** shows the final frame with the full check text ("1:34 / 1:34").
- **Keyboard:** once the page has filled, Tab reaches the switch, Play, Restart, the scrub bar and the beat buttons. Enter plays, and the arrow keys scrub. During the first second after load the controls are still hidden while the edition fills in.

## Edition switch

- **Classroom page:** "Workplace · Classroom · PME", with Classroom marked (`aria-current="page"`, bold, 2 px underline). Workplace goes to `?edition=business` (the analyst/manager/CEO version, Workplace marked). PME goes to `?edition=pme` (PME marked). Classroom reloads itself.
- **High-school page:** Classroom is marked and points to `cast=high-school`. Workplace and PME work.
- **Problem:** the Workplace and PME pages link "Classroom" to `cast=classroom` (the higher-education version). A high-school teacher who looks at Workplace and clicks back to Classroom lands on the "instructor" version, not their own. The switch has no way to choose between higher education and high school.

## Problems, ranked

1. **The high-school version is only a word swap.** It keeps "strategy class" and a business-to-business industrial case (dealers, patents, service revenue, licensing). It doesn't yet read as a high-school assignment.
2. **The edition switch round trip loses high school.** From Workplace or PME, "Classroom" always opens the higher-education cast.
3. **Two re-layouts are hard to follow.** On desktop, beat 8 shrinks, dims and moves the first run in about 2 s. On the phone, beat 10's plans vanish and the lists jump. The phone plan icons are also too small to show the layouts or the ticks.
4. **"Spread = fixed" can still be the takeaway.** The grey "AI's frame" bracket plus the 3/4/3 rerun leans that way, and strategy instructors will say differentiating is the course's own default for this case. A line naming the curriculum as another possible source of convergence would pre-empt that objection.
5. **"The imagined board"** is a leftover word that reads as a board of directors on a business page.
6. **Label nits.** "INSTRUCTOR ASKS" lacks the article that its own description uses. "THE TEACHER ASKS" is cramped against the bracket at 1280 px.

## One-sentence points

- **Higher education:** ten sound AI-assisted case plans can all answer the same question, and only lining up their problem statements, then asking what else the problem could be, shows the class considered one frame.
- **High school:** the same point, with the teacher doing the lineup. It would land better with a course and a case a high-school class would actually have.

## Numbers

The figure shows "99 knowledge workers" (Bottesch) and the Romasanta, Thomas & Levina and Terwiesch findings, all of which match `sources/source-spine.md` (lines 34, 37 and 39). There are no other numbers.
