# Classroom cold read, round 1: uncalibrated reliance (business scenario as a class case)

Reader: an educator who hasn't read the essay. I read it first as a business instructor in higher education (`?edition=business&cast=classroom`), then as a high-school teacher (`&cast=high-school`).

Method: I served the folder on port 5417. Each page was watched at 1280×900, 1280×720 and 390×844, with one browser per run. I scrolled the figure into view so it autoplayed, and captured a frame every 0.5 s from the poster to `ended` (about 190 frames a run). At 1280×900 memory pressure caused some capture gaps of 1–3 s, but the two casts' runs between them cover the whole timeline. The 720 and 390 runs had no gaps. I also checked `prefers-reduced-motion`, keyboard control and the edition switch.

Apart from instructor→teacher, the two casts have identical text, picture and timing. So the beat-by-beat read below covers both, and cast differences are noted where they matter.

## 1. Beat by beat (1280×900; 720 and 390 notes inline)

| Beat | On screen | What I took from it | Snags |
|---|---|---|---|
| 0, 0–3 s | Name card "Uncalibrated reliance", which moves to the corner. | Title. | None. |
| 1, 3–11.6 | Task card (Part 1: keep printing in blackouts; Part 2: win back customers). A red "Student" dot sits bottom left. Four document chips appear: Battery quote ×2, Rival's flyer, Sales records. At about 8.8 s three faint beige copies slide into a stack labelled "Given to the AI". | A student hands the AI three of the four documents. | The caption ("sharing everything but the sales records") arrives at about 4 s, roughly 5 s before the sharing happens. The copies are small, low-contrast rectangles, and nothing marks the sales records as left out (until beat 6), so the omission is shown only by absence. I had to look back to confirm the records hadn't moved. Most of the stage is empty for the first 20 s. |
| 2, 11.6–18.6 | "AI's answers": Part 1 "Buy battery A: runs 6 hours, costs less", Part 2 "Win them back: loyalty discount". Both type in on a beige band, then both get a "READY" pill. | Two answers that look equally sure. | Clear. Nine words in 7 s. |
| 3, 18.6–26.1 | The dot jumps up to the quotes and leaves its "Student" label behind at the bottom. The quotes open (lines appear). "First student's plan" appears, and Part 1 slides in and is marked "✓ CHECKED". | The student verifies Part 1. | "It's right" isn't shown as a match between the quote and the answer; the quotes just open. The dot travels about 300 px from its label, so you track a bare red dot. |
| 4, 26.1–33.3 | Part 2's READY pill swells. The dot moves to the Part 2 row, Part 2 slides into the plan, and it's marked "USED AS IS". | The student trusts Part 2 without checking. | Clear. |
| 5, 33.3–40.6 | The label becomes "First student". A "Second student" dot and an empty plan appear on the right. Both READY pills blink. The dot opens the quotes, and Part 1 goes in, "✓ CHECKED". | A second student with the same AI output checks Part 1 too. | "with the same answers": where did a second student get identical answers? It reads either as a hypothetical rerun or as a shared AI output. |
| 6, 40.6–51.6 | Flyer opens: "THEIR OFFER, Cheaper prints". Records open: "SHOP'S SALES, Lost: rush jobs (not given to AI)". After a pause, "loyalty discount" is struck through and red "same-day service" is written in, ✓ CHECKED. | The second student finds why customers left and fixes Part 2. | The best beat. 11 s is enough. The labels are small but legible. |
| 7, 51.6–61.4 | "Lost: rush jobs" is underlined. The AI's "loyalty discount" is underlined and tagged "THEIR FLYER". A jagged line is drawn between the AI cards, labelled "INSIDE THE FRONTIER" and "OUTSIDE THE FRONTIER", and both cards pulse. | The AI's Part 2 came from the flyer, while the real cause is in the records. Part 2 sits outside what the AI handles well. | "THEIR FLYER" is cryptic. I read it first as "the rival already offers this", then as "this answer is based on their flyer". The "frontier" also confused me as a concept; see Problem 1. |
| 8, 61.4–70.9 | The picture dims, and a panel says "A real study of shop owners / Revenue and profit". Weaker businesses get a solid bar, "nearly 10% worse". Stronger businesses get a dashed bar, "may have gained over 15%, less certain". Source line: Otis et al. (2026), Kenyan entrepreneurs, Management Science. | A real study suggests the AI's effect depended on which advice owners acted on. | The bars finish at about 66 s, leaving about 5 s for caption plus panel (about 40 words). That's a little tight. The panel never says "with an AI assistant, compared with owners without one", so "10% worse" has no visible comparison. At 720 there's a brief muddle at about 62.8 s, where the panel cross-fades over the picture's text. |
| 9, 70.9–86.9 | Marks lift off, the AI column and documents fade, and "THE INSTRUCTOR SEES ONLY THE PLANS" appears with a legend: beige "WRITTEN BY AI", red "A STUDENT'S OWN WORK". Part 1 is outlined in both plans, and both students say "The battery quotes." Then Part 2 is outlined. First student: "Part 1 checked out, so I trusted the rest." Second: "The shop's records. Rush customers left." | The instructor's question separates the students by the evidence they give for Part 2. | The second student's last answer finishes typing about 1 s before the caption changes, but it stays on screen, so that's fine. The legend sits under "the instructor sees only the plans", which suggests the instructor can see which lines the AI wrote. |
| 10, 86.9–93.6 (end) | Name, definition, then "Instructor's check: What evidence justified relying on the AI here? Ask part by part: was the evidence about that part?" Source line under the picture. | The takeaway question. | Holds as the end frame. |

Timing overall: captions 1–9 each hold 6.5–16 s at 77–129 wpm, so every caption can be read before the next. The movements mostly sit inside their beats. The rushed spots are the beat 1 hand-off (caption ahead of the picture, and the motion faint) and the beat 8 panel (about 5 s fully built).

At 1280×720 the stage letterboxes. The smallest labels measure 11.1 px (the faded document and AI labels at 60% opacity). They're legible but small, and nothing is clipped.

At 390×844 the figure switches to a stacked text view with different wording ("2 QUOTES", "Battery A: 6 hours, cheaper", "GIVEN THE QUOTES AND FLYER", "INSIDE THE FRONTIER ↑ OUTSIDE THE FRONTIER ↓"). It follows well. Issues there: a stale "● Student" stays in the task card after "First student" and "Second student" appear (three red-dot labels). The "✓ CHECKED" and "USED AS IS" tabs crowd the "First student" label and the first text line. The beat list's "On screen" text describes the wide picture, not the stacked wording.

## 2. The point (one sentence each)

- **Higher ed (business instructor):** A student checked one AI answer, found it right, and let that vouch for a second answer that depended on case data the AI never saw. Only checking each part against its own evidence (here, the sales records) exposes that.
- **High school:** One AI answer being right doesn't make the next one right. You have to check each answer against the evidence for that answer, especially when the AI didn't have all the facts.

## 3. The question a teacher should ask afterwards

"For each part of your plan, what did you check it against, and was that evidence about that part?" Then, for this case: "Why did the shop lose customers, and where in the packet does it say so?" The follow-up matters; see Problem 2.

## 4. The final frame alone

It mostly carries the idea. The two plans sit side by side, identical except for Part 2. The speech bubbles give the two justifications, the records chip still says "Lost: rush jobs (not given to AI)", and the check question is underneath. Without the animation you lose the checked and used-as-is marks (they're lifted), so the frame never shows that the first student checked Part 1; only the bubble says so. "THEIR FLYER" and the frontier line need the animation (or prior knowledge) to make sense. As a still it says: same AI output, different evidence, different plan.

## 5. Problems, ranked

1. **The frontier is credited to the AI's capability when the cause is missing data (confusion, fairness to the AI).** Beat 7 says "A jagged frontier marks where an AI stops being reliable" and labels Part 2 "Outside the frontier". But the picture has just shown that Part 2 failed because the student never gave the AI the sales records. A business instructor will ask: "If the student had attached the sales exhibit, would the AI have said same-day service?" If so, the lesson becomes "give the AI the whole packet", a prompting or case-prep lesson, not a calibration lesson. The figure would need to say that Part 2 turns on local facts the tool didn't have (so "fit" includes what the tool knows), or drop the capability framing.
2. **The diagnostic depends on a confession (fairness).** The first student answers "Part 1 checked out, so I trusted the rest." Real students rarely say the quiet part. The obvious answer is "the flyer: they're cheaper, so we discount", and the figure itself tags the AI's discount "THEIR FLYER". That *is* evidence about Part 2 (incomplete, not off-topic), so "was the evidence about that part?" would pass it. The question is fair, but it only diagnoses with a follow-up about why customers left, which the figure doesn't model.
3. **Cheating whiff (classroom fit).** Inside the figure nothing says AI is allowed; that lives only in the long setup paragraph. The legend "WRITTEN BY AI / A STUDENT'S OWN WORK" sits under "The instructor sees only the plans". That suggests the instructor can tell which lines the AI wrote, and it shows the first plan as entirely AI text, which reads like submitted AI output. "Another student, with the same answers" invites the question of whether they shared output. It doesn't read as "don't use AI": the second student keeps the AI's Part 1 and checks it.
4. **The beat 1 omission is shown only by absence (ambiguous visual, caption ahead of picture).** The caption says the records were withheld about 5 s before faint copies slide; the records chip never gets a "kept back" mark until beat 6.
5. **The study panel has no comparison (sourced claim, clarity).** "Weaker businesses nearly 10% worse" never says "with the AI assistant, compared with without". The caption ("which AI advice owners acted on") carries it. The header "A real study of shop owners" and the Kenyan source line do separate the panel from the students, and it doesn't overstate ("may have gained", dashed bar, "less certain"). But following two students straight away, viewers may map first student = weaker business. About 5 s with the panel complete is short.
6. **"THEIR FLYER" tag is cryptic (ambiguous visual).** Unclear whether it means "derived from the flyer" or "copies the rival".
7. **Leftover workplace wording.** The beat list and screen-reader summary say the records are headed "Our sales"; on screen it's "SHOP'S SALES". "Our" is the owner's voice from the workplace cast. No owner, reviewer or manager wording appears in the figure except the study's "owners", which is correct.
8. **High-school cast is a word swap only.** It still opens "In a business class", with the case-packet-with-exhibits genre. The page's study section is graduate-level (standard deviations, PDF dates, page cites). That's fine for teachers but nothing is tuned for teens. "Rush jobs", "loyalty discount" and "jagged frontier" may need a gloss for younger students.
9. **390 polish.** There's a stale "● Student" chip, the mark tabs crowd the labels, and the beat list doesn't match the stacked wording.

## 6. Mechanical checks

- **Reduced motion:** with `prefers-reduced-motion: reduce`, both casts at 1280 and 390 open on the final frame (t = 93.6) with the full name, definition and check text.
- **Horizontal scroll at 390:** none. `scrollWidth` stayed 390 in every frame, both casts.
- **Keyboard:** Tab reaches Play after the header and edition links (7 tabs). Enter plays, and Enter again pauses. Two more Tabs reach the scrubber, ArrowRight moves 1 s per press, and End jumps to 1:33 (label becomes Replay). The same holds on both casts.
- **Numbers:** the figure shows only 10% and 15% (plus constructed values: 6 hours). Both are in `sources/source-spine.md` (Otis et al.). In the page prose, 640 entrepreneurs, 0.20 SD, and the July 2024 and February 2024 versions are in the spine. The median age of 26, a year in business, a college degree, the training-guides control and the page numbers are not in the spine; they cite the working paper directly.
- **Edition switch:** the "Workplace · Classroom · PME" switch works on both pages. Classroom is the selected option on both (`aria-current="page"`, bold, not underlined), and on the high-school page its link keeps `cast=high-school`. Workplace loads the owner version (Reviewer's check), PME loads the original (Faculty check), and Classroom reloads the same cast. The hrefs are root-relative (`/figures/...`). They work from the motion-figures root but would break if the pages are served from a subpath.

## 7. Answers to the brief, per cast

**Business instructor (HE)**

1. The failure: trust carried over from a verified part to an unverified part that depends on different evidence (here, data the AI never had). Ask: "For each part, what did you check it against, and was that evidence about that part? Why did the shop lose customers?"
2. What separates them: only whether Part 2 was checked at its own source (flyer plus sales records). Same packet, same AI answers. The figure never shows what the second student gave the AI; "same answers" implies the same input. The implicit second difference is that the first student apparently never opened the sales records at all, which is the same act as not checking.
3. Leaving out the sales records is plausible. The question is about customers lost to the new shop, the flyer looks like the explanation, and the records are "a separate exhibit at the back". But case-method students are drilled that exhibits matter, and the setup's "which seem to be all the questions need" telegraphs the trap a little. It's mildly contrived for an MBA room and plausible for an undergrad intro class. It also shifts some blame to case prep.
4. It's a fair diagnostic, not a trick: both students get the same question about evidence, not answers, and the page admits the instructor already suspects the discount. But it works only because the first student confesses; a student who cites the flyer survives it without a follow-up.
5. The AI isn't careless. It answered from what it got: "(not given to AI)" and "THEIR FLYER" make that clear. The "outside the frontier" label undercuts this by implying a capability limit rather than missing information.
6. The panel reads as the study's owners, separate from the students. It doesn't overstate, but it lacks "with an AI assistant, compared with without", and it invites mapping the students onto weaker and stronger businesses.
7. There's some cheating whiff (the AI-written legend under the instructor's view; identical answers for two students); see Problem 3. Nothing says "don't use AI". The only workplace leftover is "Our sales" in the beat list and screen-reader text.

**High-school teacher**

1. The same failure, in teen terms: "it got the first one right, so I trusted the second." Ask: "What did you check each answer against? Where in the packet does it say why customers left?"
2. As above.
3. It's very plausible for teens: skipping the exhibit at the back is normal. If anything it's more natural here than in HE.
4. It's fair, but teens are even less likely to volunteer "I trusted the rest", so the follow-up question matters more.
5. As above. "Jagged frontier" is jargon for high school; the caption defines it, but the capability framing will confuse.
6. As above. "Revenue and profit", "less certain" and the weaker and stronger bars are readable for a teacher; for students, the comparison gap matters more.
7. As above; "teacher" replaces "instructor" throughout.
8. The case suits teens: a print and internet shop, a blackout battery, a rival's flyer and a same-day service fix are concrete. Nairobi is handled matter-of-factly. Blackouts are a realistic local constraint (and match the study's own example), not exoticized, and the shop's winning move is a smart, dignified one. Gaps: nothing is adapted beyond the word swap. The case-packet genre and the dense study section are pitched at HE, and "rush jobs" and "loyalty discount" may need a gloss.
