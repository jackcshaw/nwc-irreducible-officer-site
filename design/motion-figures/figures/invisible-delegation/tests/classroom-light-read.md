# Invisible delegation, classroom casts: light read

Cold read by an educator, done once as a higher-education business-writing instructor (`?edition=business&cast=classroom`) and once as a high-school teacher (`?edition=business&cast=high-school`). I read only `COLD_READ.md` and the pages. I did not open the storyboards, the plans or earlier reports.

**Setup.** I served the folder on port 5231 and used Playwright. I captured frames every 0.5 s at 1280×900 and 390×844, with the figure scrolled into view so it autoplays. I held key moments with `?t=` (7.2, 22.6, 70.5), checked 1280×720 and `prefers-reduced-motion`, and clicked every edition-switch link from both pages. Some gaps between frames came from my capture stalling while it took screenshots, not from the page.

**The files changed while I was testing.** `casts.json` changed at 10:47 and `runtime/motion.js` at 10:53, partway through my first round of captures. My first 1280 classroom capture shows the earlier wording ("Faculty ask…", "business-writing seminar", "Faculty check"). Every later capture shows "The instructor asks…", "business-writing class" and "Instructor's check". I captured all four runs again from 10:59 to 11:06, when the files had stopped changing. Everything below describes those runs unless I say otherwise. The current pages agree with themselves at both widths.

---

## 1. Higher-education read (business-writing instructor)

**Beat by beat**

1. The title card (about 3 s) moves into the corner. A task card reads "Tell the client the project slips three weeks", with "Standard · Bad news first, with the new date" below it. A red dot labelled "First student" appears with a draft. The dot goes up to the standard, which is underlined, and then comes back. Three lanes appear, "The student decides", "Requests" and "The AI decides", with three dashed cards in the student's lane. Clear. "We'll track three decisions" sets up the cards well.
2. "Give me feedback" clips onto "The criteria" and carries it across, slowly (about 4 s), into the AI's lane, where it turns grey. The AI's notes appear and all three get ticked. The email becomes "Draft 2, revised with AI". Easy to follow. I could not tell that the brownish line in the email thumbnail is "the AI's recap" without the text description.
3. "Suggest a better structure" and "Make it more professional" each carry a card across (about 2 s each), and the email reaches draft 4. Followable.
4. A "Left unsaid" key appears, and under each request "unsaid: whose criteria? / whose outline? / whose meaning?" The grey cards pulse. This is the idea of the figure, and it lands. But the caption says "Each request left out whose standard to use", while a standard sits on the task card above. I had to stop and work out that the firm's standard covers only "bad news first, with the new date" and leaves everything else open.
5. The first ledger moves up and a second student appears. Their dot reads the same standard, highlighted the same way. The caption ("…then decides before asking") gets a beat ahead of the picture, which shows only reading.
6. The second student writes on each card in red ("New date, and why", "Date, reason, plan", "Clear and courteous") and then asks in the same words. The cards stay put and the AI's lane stays empty. Each write-then-ask cycle takes about 3 s: brisk but followable, and the strongest visual in the piece.
7. The same three notes appear. Two get ticked. "Add a recap" is struck in red with "not in my outline", while the outline card pulses. The email reaches draft 4. Clear.
8. The ledgers fade to a ghost. "The instructor asks: Better by whose standard?" Both answer "The firm's standard." Then "What did you turn down, and why?" brings "None. They all made it clearer." against "'Add a recap.' It wasn't in my outline." This lands well, and the identical first answers are a good touch.
9. The final frame: the ledgers come back, and the check reads "Instructor's check: What did the AI decide for them? / Ask: whose standard? What did you turn down, and why?", with the source line.

**The point, in one sentence.** Asking an AI for "feedback", "structure" or "more professional" quietly hands it the criteria. Two students can turn in equally good emails, and only asking what each turned down, and why, shows which one decided.

**The question I'd ask afterwards.** "Before you asked the AI anything, what had you decided it should judge your draft against? Show me one suggestion you checked against that."

**The final frame alone.** It carries the idea. Grey cards in the AI's lane sit beside red cards in the student's lane, the two answers are side by side, and the check is under the picture. Someone arriving at the end gets it.

## 2. High-school read (teacher)

The motion and timing are identical to the HE page. The only differences are the role word ("The teacher asks…", "Teacher's check", "can't tell the teacher who decided") and the lede, which now matches the HE lede word for word ("business-writing class… The class allows AI").

**The point, in one sentence.** The same as above, put for my students: if you don't decide what "good" means before you ask the AI, it decides for you, and you won't notice, even if your email still meets the assignment.

**The question I'd ask afterwards.** "Write down your three decisions before you open the AI. Afterwards, tell me one thing it suggested that you said no to, and why, or tell me why every suggestion fit your plan."

As a high-school teacher I can use this. The case is a role-play: my students don't have clients or a "firm". "Work a case" is business-school language; I'd say "scenario" or "assignment". It still makes sense as a CTE/business-class task, and "bad news first, with the new date" is a rule a 16-year-old can apply.

---

## 3. Answers, for each cast

| # | Question | HE (classroom) | High school |
|---|---|---|---|
| 1 | The failure, in my words | Open-ended help requests ("feedback", "better structure", "more professional") hand the AI the criteria, the outline and the meaning of "professional". The student accepts every note and can't name a choice they made. | Same. |
| 2 | What separates the students | Not the prompts, the AI's notes or the quality of the email. The second student writes their criteria, outline and meaning of "professional" down first, judges the notes against them, and turns one down with a reason. | Same. |
| 3 | Reads as cheating or "don't use AI"? | **No.** "The class allows AI, and both say they used it." Both emails are labelled "Revised with AI". The stronger student uses the same prompts and keeps two of the three notes. Nothing reads as misconduct. | **No.** Same signals. A teacher could read the first student as lazy rather than dishonest; that is fair. |
| 4 | Workplace words left? | **None** in the scenario, captions or check. "Client", "project" and "the firm's standard" belong to the case. "Knowledge workers", "at work" and "Microsoft Research" appear only where the page describes the study. "Then they ask in the same words" means the second student (singular they) and is fine. | **None.** Same. |
| 5 | Makes sense as a class assignment? | Yes. A bad-news client email is a standard business-writing case. (The common textbook advice for bad news is indirect, but the standard is the firm's and belongs to the case.) | Yes, as a role-play scenario. The register is a little above high school ("work a case"). |
| 6 | Grammar with the role noun | **The HE cast no longer uses plural "Faculty".** It changed during my test to singular "The instructor": "The instructor asks each student", "Then the instructor asks", "can't tell the instructor who decided", "Instructor's check". All correct. The earlier "Faculty" version I captured first was also correct as a plural ("Faculty ask each student", "Faculty ask: Better by whose standard?", "Then they ask", "can't tell faculty who decided"). In a one-instructor seminar, "Faculty" read oddly, so the change helps. | Correct throughout: "The teacher asks each student", "Then the teacher asks", "The teacher asks: Better by whose standard?", "can't tell the teacher who decided", "Teacher's check". |
| 7 | Captions readable, motion followable? | Yes at 1280. Each caption is 10–15 words and stays up about 7–15 s; the shortest is beat 5, at about 7 s for 10 words. Card crossings take 2–4 s, and each write-then-ask cycle about 3 s. The strike plus "not in my outline" takes about 1.5 s, with a 2 s pulse on the outline card. At 390 the captions are fine, but some movement is lost (see problems). | Same timings (within capture jitter). |

## 4. Edition switch

- On the classroom page, "Workplace · Classroom · PME" marks **Classroom** as selected (`aria-current="page"`, bold, not underlined).
- On the high-school page, **Classroom** is also selected, and its link keeps `cast=high-school`.
- Clicking each link from both pages works. Workplace goes to `edition=business` (analyst version, "Reviewer's check"). Classroom stays on the current cast. PME goes to `edition=pme` ("Faculty check"). Each landing page marks the right option.
- From the Workplace or PME page, "Classroom" always goes to the HE cast. The switch has no route to the high-school cast.

## 5. Mechanical checks

- **1280×720:** the whole picture shows (stage, caption and controls fill 638 px of the 720 px viewport), including the final check. The text is smaller but readable.
- **Reduced motion:** opens on the final frame (95.3 s), with the full check in the caption area, on both casts.
- **390 px:** no horizontal scroll (`scrollWidth` 390). The narrow layout holds the whole stage in 774 px.
- **Console:** no errors on any run.

## 6. Problems, ranked

1. **The separating question rewards turning something down.** "What did you turn down, and why?" separates these two students only because the AI happened to suggest something outside the second student's outline. A student who decided first and agreed with all three notes would also answer "None", just like the first student. As a teacher, I'd worry that students learn to strike one note for show. The real difference on screen is the red cards written *before* asking, but the spoken check never asks about them. A follow-up like "What did you check them against?" would cover that case.
2. **"Standard" means two things.** The task card gives the firm's standard and both students read it. Then caption 4 says "Each request left out whose standard to use", and both students answer "The firm's standard". On first viewing I wasn't sure whether the first student had ignored the firm's standard (no: both emails meet it) or had failed to set criteria beyond it. "Whose criteria" in caption 4 would avoid the clash. Also, the check's first line, "What did the AI decide for them?", is never asked on screen, yet the text under the figure calls it "the first question".
3. **At 390 px, the handover and the request-to-card pairing get lost.** The lanes are gone, so "hands the criteria to the AI" shows only as a card turning grey in place. Each request quote sits under the previous card: "Suggest a better structure" sits directly below "The criteria", so it reads as belonging to it. The two students' rows drift out of line, which makes them harder to compare. This is secondary, since the figure is desktop-first, but it is where I lost track of the movement.
4. The second student's email reportedly takes the AI's grey headings and paragraph too, per the text description. If the AI wrote the structure, that sits oddly with "How the email runs" staying in the student's lane. It is barely visible in the thumbnail, so few viewers will notice.
5. Beat 5's caption ("…then decides before asking") gets ahead of the picture, which shows only reading.
6. Typography: the final frame shows "“'Add a recap.' It…", a curly double quote around a straight single quote. The check headings use a curly ’ ("Instructor’s", "Teacher’s"), while the body text uses straight apostrophes.
7. The switch can't reach the high-school cast from Workplace or PME (see §4). The impact is small now that only the role word differs between the two classroom pages.
8. At 1280, the header "THE STUDENT DECIDES" runs into the divider and "REQUESTS". It is readable but cramped.
