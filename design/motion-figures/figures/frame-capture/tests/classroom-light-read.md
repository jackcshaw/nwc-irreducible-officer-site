# Frame capture, classroom casts: light read

Date: 2026-10-29. I read it as an educator who hasn't read the essay. I haven't opened the storyboards, CLASSROOM-PLAN, EDITIONS-PLAN or other test reports.

Pages:
- `figures/frame-capture/index.html?edition=business&cast=classroom` (higher ed)
- `figures/frame-capture/index.html?edition=business&cast=high-school` (high school)

Served on port 5233 and stopped afterwards. I recorded each cast at 1280×900 and 390×844, capturing a frame every 0.5 s from autoplay through to 1:43, and logged the caption and clock on every frame. I checked 1280×720 at held moments with `?t=` (60, 90 and 103 s) and held beat 3 at 14.5 to 17.5 s. Scripts and frames are in the session scratchpad (`classroom-light-read/`).

The animation, timing and layout are the same in both casts. Only the role words and the teacher note change. Higher ed has "faculty" and "seminar". High school has "the teacher", "class" and "Teacher's check", plus a two-sentence teacher note.

## Higher-education read

**1. The failure.** A student asks an AI how to frame an open case. The AI turns "which patients *need* the most help" into "which patients *cost* the most". The student then works hard and revises twice, but every revision stays inside that frame. The ranking faculty receive looks finished and shows nothing of where the frame came from.

**2. What separates the students.** It isn't the AI and it isn't the product. Both students use AI, get the same proposed frame and hand in identical rankings. The second student weighed all six considerations, chose cost knowingly and wrote down what would change it ("if some patients cost less because they get less care"). Asked why this frame and what would change it, that student can run a check (two patients, same predicted cost, more chronic conditions) and revise. The first student has nothing to check.

**3. Cheating or "don't use AI"?** Mostly no. "A second student, also using AI" puts AI use on both sides, and the AI's frame is called "reasonable". One mild risk: in beats 7–8, the "AI-supplied" key gets wiped off the ranking, then "Nothing in it shows the frame came from the AI." A faculty member could read that as hidden AI use, an integrity or disclosure problem, and decide the fix is "make them cite the AI". Beat 10 ("the weighing doesn't show") corrects this, but only if the viewer connects the two beats.

**4. Workplace words.** No analyst, manager or company team anywhere: not in the figure, not in the captions, not in the page text. One business example is left in the intro: "or sales for customer value". "Commercial prediction algorithm" belongs to the study and is fine.

**5. As a class assignment.** Yes. A health policy seminar working a health system's case and handing in a ranking with a chart and a cut-off is a believable case-method deliverable, and "Faculty ask each student: Why this frame? What would change it?" works as an oral defence or written memo question.

**7. Pacing.** Every caption is readable. Captions stay up 4.5–13.5 s, at no more than 2.2 words per second. The movements are mostly followable, but four beats are crowded:
- **Beat 3 (0:12–0:21):** the task question detaches and briefly overlaps the task card as doubled text (around 16.5 s, which looks like a glitch). It's then rewritten from "need … help from the program" to "cost" in about 2 s. The caption never says the question changed, and that change is the heart of the figure. It's easy to miss on first viewing. The tan "Which patients cost the most?" stays on screen afterwards, which helps.
- **Beat 7 (6.5 s):** the ranking travels, the label and "AI-supplied" key appear, a wipe crosses it and the brackets fade. The wipe is subtle. I only saw what it did because the tint was gone afterwards.
- **Beat 11 (5.5 s):** "Why this frame?" plus two reveals sliding down. Just enough time.
- **Beat 13 (8.5 s):** the frame swap, the ranking rewrite, "Sicker patients ranked lower" and "Nothing to check" arrive in sequence. The caption's second sentence ("The cost ranking put sicker patients lower") is up about 5 s before the note that shows it.
- **Small text:** at 1280 the "Would change it" note, the cost/condition legend and the source line are about 11–12 px. They're readable on a laptop but small when projected.

**One-sentence point (HE):** Two students can hand in the same AI-framed ranking, and only asking "why this frame, and what would change it?" shows which one chose the frame and which one just took it.

## High-school read

**1. The failure.** Same as higher ed, told with "the teacher" instead of faculty.

**2. What separates the students.** Same as higher ed.

**3. Cheating or "don't use AI"?** Same answer and the same mild disclosure-reading risk in beats 7–8. With teens this risk is higher, because AI-use policies in schools are usually about disclosure.

**4. Workplace words.** None, apart from the same "sales for customer value" in the intro. No "faculty" or "seminar" is left in the high-school cast.

**5. As a class assignment.** It works, but it's a stretch. Few high schools have a "health policy class". A teacher would have to place it in AP Statistics, civics/AP Gov or a health-science pathway. Ranking patients for a health system's care program, with "program budget" and "next year's costs", is adult policy work. It's teachable, but nothing on the page helps a teacher scale it down.

**6. The race finding.** This is the weakest part for teens.
- The finding appears only in the last frame, as a small italic source line under the picture, from about 1:39: "In the study, at a given risk score, Black patients were considerably sicker than White patients."
- On screen it comes with no cause. "Risk score" is never introduced: the figure says "predicted cost" throughout.
- A teen could read it as "Black people are sicker" rather than "the algorithm under-ranked Black patients because less was spent on their care". The mechanism is on screen ("Access to care", and "cost less because they get less care"), but nothing ties it to race.
- The teacher note is accurate, useful and brief (two sentences: unequal access to care, less money spent at the same level of need). But it sits below the figure, so a teacher who shows the figure first meets the race line before the note.
- It's also styled as the first paragraph of "The study behind this example" with no gap before the next paragraph, so it reads as part of the study summary and is easy to skip.
- Suggestion: put the cause in the high-school source line ("…because less was spent on their care"), or move the note above the figure as a short "Before you show this" line.

**7. Pacing.** Same as higher ed.

**One-sentence point (HS):** A student who takes the AI's first frame and a student who chooses it can hand the teacher the same ranking, so the teacher has to ask why that frame and what would change it.

## Edition switch ("See this with: Workplace · Classroom · Military education")

- **Destinations:** all three links go where they say from both casts. Workplace goes to `?edition=business` (analyst version), Classroom to `?edition=business&cast=classroom` and Military education to `?edition=pme`.
- **Higher ed:** "Classroom" has `aria-current="page"`, weight 600 and a 2 px solid underline. Next to the other links' thin underlines it's a subtle difference, but it does read as selected.
- **High school:** **no item is selected**, and there's no high-school option. "Classroom" takes a high-school teacher to the *higher-ed* seminar/faculty version, and they can't get back to the high-school cast from the switch.
- At 390, "Military education" wraps across two lines.
- The links use root-absolute paths (`/figures/...`). That's fine when served from the motion-figures root but will break if the page is deployed under a subpath.

## Mechanical checks

- **1280×720:** the whole picture fits, including the controls (stage is 628 px; controls end at 693 of 720), mid-run and on the final frame.
- **390×844:** a re-laid-out, mostly text version. It's readable and the final frame carries the idea. There's no horizontal scroll (`scrollWidth` stayed at 390 on every frame in both casts). The "Same predicted cost" mini-chart is dropped from the phone end frame and replaced by the text "Checked: some patients are sicker".
- **Console:** no errors.
- **Typography:** apostrophes are mixed. The high-school cast has curly ’ in "teacher’s" and "Teacher’s check", but straight ' elsewhere ("AI's frame", "health system's").

## Top problems, ranked

1. **High school: the race finding has no cause next to it.** It's a bare line at the end, the teacher note sits below the figure and is styled into the study text, and "risk score" is never introduced.
2. **High school: the switch has no current item, and "Classroom" leads to the higher-ed version.** A high-school teacher can't get back to their own version.
3. **Beat 3 hides the key move.** The need-to-cost rewrite happens in about 2 s, isn't named in a caption, and briefly overlaps the task card as doubled text. A smaller related risk: beats 7–8 can read as a disclosure problem.

Minor: "sales for customer value" is left in the intro; "health policy class" is an unusual setting for high school; beat 13's caption arrives before the note that shows it; small type when projected; mixed apostrophes; root-absolute switch links.
