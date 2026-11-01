# Classroom cold read, round 2: uncalibrated reliance, business scenario recast as a class case

Reader: an educator who hasn't read the essay. I read it first as a business-school instructor (`?edition=business&cast=classroom`) and then as a high-school teacher (`…&cast=high-school`).

How I watched: I served the folder on 127.0.0.1:5291 and used Playwright, one browser at a time. I watched each cast at 1280×900, 1280×720 and 390×844. Each time I scrolled the figure into view so it autoplayed, took a frame every 0.5 s through the whole 1:33 run, and logged the caption text and the clock for every frame. I also checked `?reduced`, keyboard control, the edition switch and the page width at 390px. My scripts and frames are in the session scratchpad under `ur-classroom-read2/`. I didn't open the storyboards, the plans or the other test reports.

The two casts have the same pictures, timing and wording. The only change is "instructor" to "teacher": in the setup paragraph, in beat 9, in the label "The ___ sees only the plans" and in the end-card heading. Everything below applies to both casts unless I say otherwise.

## 1. Beat by beat (1280×900; clock times)

| Beat | Clock | What I saw and understood | Pace |
|---|---|---|---|
| 0 | 0:00–0:03 | A name card: "Uncalibrated reliance, Failure mode 4 of 7". It moves into the top-left corner. | Fine |
| 1 | 0:03–0:11 | A task card appears ("Part 1 · Keep printing in blackouts / Part 2 · Win back customers"), then a red dot labelled Student and four packet tabs: Battery quote ×2, Rival's flyer, Sales records. Grey copies of three tabs slide into a stack, "Given to the AI". The sales records stay where they are. Caption: "…sharing everything but the sales records." | Comfortable (12 s, 20 words). The picture shows the omission only because the records card *doesn't* move. Nothing on screen says why. |
| 2 | 0:11–0:18 | Two answer cards type in on a beige band: "Buy battery A: runs 6 hours, costs less" and "Win them back: loyalty discount". Both get a dark "Ready" pill at the same moment. "Equal confidence" reads clearly. | Fine |
| 3 | 0:18–0:26 | The dot moves to the two battery quotes, which get underlined. A sheet titled "First student's plan" appears, Part 1 slides in, and a red "✓ Checked" is added. | Fine. The "Student" label stays behind at the bottom left when the dot leaves, so the dot travels unlabelled until beat 5. |
| 4 | 0:26–0:33 | The Part 2 "Ready" pill swells. Part 2 slides into the plan and is marked "Used as is". The quote underlines go away. | Fine |
| 5 | 0:33–0:40 | Labels "First student" and "Second student" appear, along with an empty "Second student's plan". The second dot opens both quotes, and Part 1 goes in marked "✓ Checked". There's no second "Given to the AI" stack, so I took it that the second student gave the AI the same inputs. The caption ("the same AI the same questions") supports that. | Fine (7 s, 19 words, about 2.7 words/s: brisk but readable) |
| 6 | 0:40–0:52 | The dot opens the flyer ("Their offer: Cheaper prints") and then the records ("Shop's sales: Lost: rush jobs (not given to AI)"). Part 2 slides in. The dot strikes out "loyalty discount", writes "same-day service" in red and marks it "✓ Checked". | The busiest beat: six actions in about 11 s. I could follow it, but the two document cards are small (about 13px at 1280 and about 11px at 720). |
| 7 | 0:52–1:01 | "Lost: rush jobs" and the AI's "loyalty discount" get underlined, and "Flyer only" appears beside the AI's Part 2. A jagged line is drawn between the two AI cards, with "Covered by its input" above and "Needs facts it wasn't given" below. | Readable (9 s, 21 words). The caption's second sentence, "Even with them, its answer would still need checking", has nothing on screen to match it. Every visual in this beat is about input. |
| 8 | 1:01–1:10 | The scene dims and a panel rises: "A real study of shop owners · Revenue and profit". Weaker businesses: a solid bar, "nearly 10% worse". Stronger businesses: a dashed bar, "may have gained over 15%, Less certain". Source line: Otis et al. (2026), Kenyan entrepreneurs, Management Science. | Fine (9.5 s). The panel reads as a different population from the students. |
| 9 | 1:10–1:26 | The panel goes and the "Checked" and "Used as is" marks lift off. "The instructor/teacher sees only the plans" appears with a key: "AI-drafted, disclosed" (beige) and "A student's own work" (red). Part 1 is outlined in both plans, and both students answer "The battery quotes." Then Part 2: the first student says "The flyer. They left because the rival is cheaper." The second says "The shop's records. Rush customers left." | Generous (16 s). The answers type out at a readable speed. |
| End | 1:26– | End card: "Uncalibrated reliance: Confident output is accepted without knowing whether the task fits the tool." Then the check, in italics: "What evidence justified relying on the AI here?" and, a beat later, "Ask part by part. Part 2: why did customers leave?" Below the picture: "Illustration based on Otis et al. (2026) and its working paper." | Holds, then the button changes to Replay. |

No caption changed before I had read it, at any viewport. Each caption was on screen for 6.5 to 16 s, at no more than about 2.9 words per second, apart from the end card, which holds. The 1280×720 and 390×844 runs keep the same clock.

## 2. The point, in my words

- **Instructor (HE business):** A student checks the part of an AI answer that their own evidence can confirm, then trusts the other part because it sounds just as sure. That part rested on facts the AI never had, and only asking what each part rests on brings it out.
- **High-school teacher:** Checking one AI answer doesn't vouch for the next one. Each part needs its own evidence, and here the evidence for Part 2 was the shop's sales records, which the AI never saw.

## 3. The question I'd ask afterwards

- **HE:** "Take your plan one part at a time. What did you check each part against, and for Part 2, what tells you *why* customers left?" A follow-up I'd want: "How did you know the sales records mattered for Part 2?"
- **High school:** "For each part, show me where your answer came from. For Part 2, how do you know why the customers left?"

## 4. The final frame alone

It mostly carries the idea. The two plans, the students' answers to each part, and the AI's cards split by the jagged line together say: same AI answers, same evidence for Part 1, different evidence for Part 2. Two things weaken it:

- **The visible difference between the plans is the edit, not the checking.** The "Checked" marks are gone, so the first plan is all beige (AI-drafted) and the second has a red strike-through and red handwriting. With the key reading "AI-drafted, disclosed" against "A student's own work", the frame alone can read as "the good student rewrote the AI" instead of "the good student checked Part 2 against its own evidence". The matching "The battery quotes." answers for Part 1 do push back on that, which helps.
- **The instructor can already see who changed Part 2.** The struck-through "loyalty discount" is visible in the plan. So "sees only the plans" still shows the instructor the difference before anyone asks. The page text admits this ("the first plan's discount may already look off; the question shows how it got in"). The picture should either agree with that or hide the strike-through in the instructor's view.

## 5. The eight questions, by cast

**Q1. What failure is shown, and what should be asked?** For both casts: one part of the AI's output was checked and found right, and the other part was accepted on the strength of that and its matching confidence, even though it rested on facts the AI didn't have. The questions are in section 3. The figure's own end card ("What evidence justified relying on the AI here? Ask part by part.") is a good one to put in front of a class.

**Q2. What separates the students, is either a straw man, and is there a second difference?** Neither is a straw man. The first student isn't careless: they check Part 1 properly, and their Part 2 reason ("the rival is cheaper") is a real inference from the flyer. Both students give the AI the same inputs and get the same answers, so the input is not a difference. **There is a second difference, though.** The second student both checks Part 2 *and* knows to open the sales records, which the first student had decided were beside the point. "Checks each answer at its source" assumes you know which source matters. So the gap could be diligence, or it could be better case judgment, and the figure doesn't separate the two. I'd call it a good discussion point, not a flaw, but an instructor will notice.

**Q3. Does it make sense to leave the sales records out?** Partly. The setup paragraph's reasons are that the records are "a separate exhibit at the back" and that the student judged them "beside the point for a pricing question". The first is believable: students skip back exhibits all the time. The second is weak to a business instructor, because sales records are exactly what you'd use on a pricing question. And the animation itself never gives a reason. Beat 1 only says "sharing everything but the sales records", so a viewer who skips the setup sees an unexplained omission. A more natural reason, which the setup half-gives already, would be: the student read Part 2 as "beat the rival's price", so the flyer seemed like all it needed. That reason belongs on screen.

**Q4. Does the lesson read as "check each part against its own evidence"?** Mostly yes. The per-part answers in beat 9 and the end card ("Ask part by part") make the lesson clear, and the matching Part 1 answers show that relying on AI is fine when it's checked, which works against "don't use AI". Two things pull in other directions:
- **Toward "give the AI everything":** the only explanation on screen is about input ("Covered by its input / Needs facts it wasn't given", "Flyer only", "not given to AI"). Its counterweight, "Even with them, its answer would still need checking", is the second sentence of a busy caption and has no picture.
- **Toward "don't use AI / write your own":** in the final frame the beige/red key ("AI-drafted" against "a student's own work") makes the better plan the one with red handwriting.

**Q5. Does anything suggest cheating or copying?** Not really. "The class allows AI, and the students say they used it" and the "AI-drafted, disclosed" key settle it. The only faint flag: both plans contain word-for-word identical Part 1 text, which a real instructor reading two submissions side by side might notice. It's disclosed, so it's low risk.

**Q6. Does the AI look careless, and is the evidence panel fair?** The AI doesn't look careless. Its answers are reasonable, its Part 2 is labelled "Flyer only" (it used what it was given), and the jagged line puts the gap in its input, not its effort. The evidence panel clearly reads as a separate population ("A real study of shop owners", "Weaker/Stronger businesses", "Kenyan entrepreneurs"), and the caption says "suggests". The dashed bar marked "Less certain" is honest. Two gaps: the desktop panel doesn't say what is being compared (having the AI assistant against not having it; the 390 view's "Change in revenue and profit" is a little better), and it leaves out the null average effect. That's in the text below the figure, but a viewer who only watches could take the bars as the whole result.

**Q7. Any workplace words left?** None in the figure apart from those describing the study's owners ("shop owners", "businesses", "revenue and profit", "entrepreneurs"). "Plan" works as a class deliverable. The page's lower sections use firm and entrepreneur language only about the study. The switch label "Workplace" is fine.

**Q8 (high school). Does it suit teens?** The story suits a high-school business or entrepreneurship class. It has no integrity trap, the stakes are concrete (blackouts, a rival's cheaper prints, lost rush customers), and "the class allows AI" matters, since many high schools don't. But the high-school cast is the HE cast with one word swapped. "Case packet", "a separate exhibit at the back" and "rush jobs" are MBA-case language that a teacher would need to translate. The lower sections (null hypothesis, "0.20-standard-deviations", working-paper dates) are written for researchers, not high-school teachers. They're readable, but nothing in them was adapted for this cast.

## 6. Problems, ranked

1. **The lesson on screen leans on input.** The only explanation drawn is "Covered by its input / Needs facts it wasn't given", together with the "not given to AI" tag. The line meant to stop the "give the AI everything" reading has no visual and is the second sentence of a busy caption. (Both casts, all viewports.)
2. **The final frame shows editing, not checking.** The marks lift off, the struck-through, red-handwritten Part 2 stays, and the key contrasts "AI-drafted" with "a student's own work". So the frame reads partly as "rewrite the AI" (an authorship lesson), and it also shows the instructor the difference before the question is asked, despite "sees only the plans".
3. **The reason for leaving out the records is off-screen and thin.** Beat 1 never says why. The setup's "beside the point for a pricing question" will strike a business instructor as backwards, because sales records are core evidence on pricing.
4. **The second difference between the students isn't acknowledged.** Diligence and case judgment (knowing the records matter) are bundled together in the second student.
5. **390px layout.** The "✓ Checked" tags overlap the "First student" and "Second student" labels and the first line of plan text (e.g. at 0:49). A leftover "● Student" stays on the task card to the end, so three student labels show. The narrow end frame has no "AI-drafted / own work" key, so the beige highlight is never explained on a phone. The play and scrub controls run about 4px past the fold when the figure is scrolled to the top.
6. **The study panel leaves out the comparison and the null average.** "Revenue and profit" doesn't say "with the AI assistant against without". Smaller: beat 6 packs six actions into about 11 s, and the document cards are small at 1280×720 (about 11px).
7. **High school:** the cast isn't adapted beyond "teacher" (section 5, Q8).
8. **Minor:** red means two things (temporary working marks, then a student's own work). The "Given to the AI" stack is cramped against the "AI's answers" label at 1280. From a high-school page there's no way to reach the HE cast, because Classroom keeps `cast=high-school`. That's by design, but worth knowing.

## 7. Mechanical checks

- **Edition switch:** works from both pages. Workplace goes to `?edition=business` and loads the shop-owner setup, with Workplace current. PME goes to `?edition=pme` and loads the PME setup and its edition note, with PME current. Classroom returns to the same cast. **Classroom is marked `aria-current="page"` on both the classroom and high-school pages**, and keeps `cast=high-school` on the high-school page.
- **Reduced motion (`?reduced`):** shows the final frame (1:33) with the full end-card text in both casts. Correct.
- **Horizontal scroll at 390px:** none. scrollWidth is 390 on both pages.
- **Keyboard:** the tab order is brand, Essay, Practice, Workplace, Classroom, PME, then Play. Enter plays and pauses. Tabbing on reaches Restart and the scrubber, and arrow keys scrub.
- **Console:** no errors on either page.
- **Numbers:** "nearly 10% worse" and "may have gained over 15%" match the Otis et al. (2026) entry in `sources/source-spine.md`. "6 hours", the battery and the discount are labelled constructed.
