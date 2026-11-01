# Classroom light read: appropriate-reliance, business edition

Cold read, 2026-10-30. I read it twice as an educator: first as a higher-education instructor (`?edition=business&cast=classroom`), then as a high-school teacher (`…&cast=high-school`). Pages were served on port 5243 and driven with Playwright, one browser at a time. I played at 1280×900 and 390×844, checked the picture at 1280×720, and looked at frames 0.5–1 s apart. The text did not change during the test: a fresh capture at the end matched the first.

Paths played, in order:
- **My honest calls:** first call, check Task B. Second call, "Rely on it, after a careful read". The figure said: first draft matches, launch plan matches.
- **"Always check":** B, then "Ask for a week to check both". Result: matches, then defensible. Played again at 390 as A, then the week: differs, then defensible.
- **"Never check":** skip, then rely. Result: no call, then matches. Also skip, skip: no call twice.
- **Wrong check:** A, then "Keep my check here" (the label changes when your check is already on A). Result: differs twice.

## What I saw (both casts; the stage is identical)

The figure opens at 0:28 on beat 3, already asking: two task cards from the BCG study. Task A asks you to segment the footwear market. Task B asks you to pick the brand to back from a spreadsheet and insider interviews. Each card has an AI answer marked "Ready", the line "If it's your team's first draft", a "Check this one" button, and "Time for one check · a check: work it yourself, then compare". After I chose B:
- **Beat 4:** a jagged frontier is drawn between the cards, and Task A gets the inside-frontier stats.
- **Beat 5:** the stage dims and the Task B chart rises (84.5 / 70.6 / 60, "Rated higher in quality, right or wrong"), then settles onto B's card.
- **Beat 6:** "insider interviews" is underlined, with "the deciding details were in the interviews". Task A gets "Reasoning: reading is enough".
- **Beat 7:** the suggested calls appear in navy, one after another over about 3 s.
- **Beat 8:** the second question: "Now your segmentation goes straight into the launch plan."
- **Beat 9:** the suggested call, with consequences next to the other options: "Task B: read-through only", "Defensible · a week late".
- **Beat 10:** the skill line plus the instructor's (or teacher's) check. Bottom left: "Your calls · first draft: … · launch plan: …".

Beats 4–9 each hold 12–13 s, and captions run one or two lines. Beat 0 (title) is 2.7 s, but you only see it after Start over.

## Higher-education instructor

1. **What it teaches:** you have limited time to check, so put the check where the AI is likely wrong in ways a read-through won't show (deciding details buried in source material). Rely on work where a weak answer would show when you read it carefully. Be able to say why.
2. **Calibrated, or "always check" / "AI bad"?** Calibrated. The inside-frontier gains are shown. The suggested second call is "rely on it, read it first". Checking both is marked "defensible · a week late", which shows a cost without calling it wrong. Moving the check is shown leaving Task B to a read-through. One tilt: beat 5's dimmed, full-stage chart is the most dramatic moment, so the "AI was worse" result lands harder than the gains.
3. **Cheating or "don't use AI"?** Neither, for me. "A class where AI use is allowed" settles it, but it appears only in the "How this figure works" paragraph below the figure. One risk to watch: in a class, "Graders still rated their work higher" can be heard as "AI-written work fools the grader."
4. **Workplace words left:** no manager, client or "consultant's team". Left over: "launch plan" (stage and beat 8), "slips the launch a week" and "a week late" (beat 9 and text), and "a clothing firm should back" (task paraphrase). "Your team's first draft" reads fine as a group project. "CEO" appears only in About the tasks, describing the study.
5. **As a class activity:** it works for a business or management course, where segmentation and a brand pick are plausible team-project tasks. The second condition doesn't translate. What is a "launch plan" in a course: the graded final submission? Who would grant "a week to check both", the instructor? I'd have to say that out loud. The class frame is never on the stage itself, so the stage still reads as a workplace story.
6. **Can you learn the answer first?** No, through any route a viewer would use:
   - `?t=60` and `?t=115` load at 0:28 on the question.
   - Dragging the scrubber, the End key and arrow keys all stay on beat 3. After call 1, scrubbing stops at beat 8.
   - Beats 4–10 read "Make your call to see this." Clicking beat 9 does nothing.
   - The visible page text promises the rest after you answer.
   - `?reduced` and prefers-reduced-motion have the same gate.
   - "After you make your call" is locked until both calls are made or skipped.

   The answers are in the DOM, hidden with display:none, so only view-source or devtools shows them. Skipping reveals them by design, and Start over then lets you re-answer. That's inherent and acceptable. The "How this figure works" paragraph names "the launch plan" ahead of time, which previews the condition but not the answer.
7. **Pace:** yes, at 1280. Each caption is readable well before the next, and beat 7's marks build one at a time. What hurts is size, not speed: the small mono all-caps annotations (about 11 px) are hard to read on a classroom projector, and the final frame is dense.

**My point (HE):** spend your one check where the AI's mistakes wouldn't show on a read-through, rely on the rest after a careful read, and be able to say why.

## High-school teacher

The high-school page matches the classroom page word for word, except "Instructor's check" becomes "Teacher's check".

1. **What it teaches:** the same idea. With older students I'd put it as "don't check everything AI does; check the part where it could be wrong without it showing."
2. **Calibrated?** Yes, for the same reasons. A student who picks "ask for a week" isn't told they're wrong.
3. **Cheating or "don't use AI"?** Not on screen, but the reason it's allowed sits in small print below the figure. Teenagers will not read that paragraph, so the teacher has to say "AI use is allowed on this project" first. The "graders still rated their work higher" line is a bigger risk here: some students will hear "the teacher can't tell."
4. **Workplace words:** the same as the HE list ("launch plan", "slips the launch", "back" a brand). No manager or client.
5. **As a class activity:** the core move (choose where your one check goes) transfers well. The content doesn't. Footwear market segmentation, picking a brand from financials and insider interviews, a "launch plan", "jagged frontier" and the significance-level caveats are pitched at business-school readers. This fits a high-school business or economics elective. Elsewhere I'd need my own analogous pair of tasks. Nothing in the high-school cast is adapted beyond the label.
6. **Learn the answer first?** No, same results as above.
7. **Pace:** the timing is fine. On a projector, the small all-caps labels in beats 6–9 and the final frame are the weak point.

**My point (HS):** AI can be right on one task and quietly wrong on another, so put your limited checking on the task where the important details are hidden.

## Viewports

- **1280×900:** the full picture, caption and controls fit, and the question is in view on open.
- **1280×720:** the picture shows. Before the call a compact layout keeps the question and buttons in view. On Continue it switches to the full stage, and the page scrolls about 170 px so the stage, caption and controls fit. You see a visible jump, but nothing is cut off, including the beat 5 chart and the final frame.
- **390×844:** no horizontal scroll (scrollWidth 390). The cards stack side by side as narrow columns. The sticky caption and controls take about 45% of the screen. At the end, the verdict ("Your calls · first draft: matches…") and "Rely on it · read it first" sit low in a stage about 1,440 px tall, behind the sticky panel, so you have to scroll to see whether your calls matched. The figure pauses when scrolled offscreen. It's usable but cramped. Phone is secondary.
- **Keyboard:** Tab reaches the edition links, then the radio group. Arrows select. Continue works with Enter.

## Edition switch

"See this with: Workplace · Classroom · PME" works on both casts:
- Classroom is underlined and has aria-current=page on the classroom page and on the high-school page.
- On the high-school page, the Classroom link keeps `cast=high-school`.
- All three links load (200). Workplace shows "Reviewer's check", PME shows "Faculty check".

At 390 the "See this with:" label drops, and "Workplace · Classroom · PME" fits on one line beside "The skill", with PME ending inside the 16 px gutter.

Two notes:
- All three editions show the same BCG stage; only the check's name changes. A teacher who clicks PME expecting "the original example from The Irreducible Officer" sees the same footwear and clothing tasks.
- The links are root-relative (`/figures/…`), so they would break if the site were served under a subpath.

## Problems, ranked

1. **The classroom frame is off-stage.** The stage still tells a workplace story ("your team's first draft", "goes straight into the launch plan", "a week late"). "A class where AI use is allowed" appears only below the figure. The second condition has no clear class equivalent.
2. **The high-school cast is the classroom cast with one label changed.** The tasks, "frontier" and the evidence wording are pitched at business-school readers, so a high-school teacher has to translate the whole scenario.
3. **Size and density for classroom use.** The about 11 px mono all-caps annotations and the dense final frame are hard to project. At 390 the end verdict is below the sticky panel.
4. **Minor:**
   - In a class, "Graders still rated their work higher" can read as "AI fools the teacher."
   - The edition switch doesn't change the stage.
   - On the wrong-check path, Task A shows your red "Check this one" next to a navy "Rely on it" tag, and only the small key explains the colors.

## Numbers

Every number on screen and in the text is found in `sources/source-spine.md`: 84.5, 70.6, 60%, 12.2, 25.1, 40%, 758, 385, 373, about 7%, "19 percentage points" and 24-013.
