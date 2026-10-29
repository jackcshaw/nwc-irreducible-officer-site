# Cold read: appropriate-reliance, business edition, round 1

**Reader:** I read this as a manager at a mid-size company, with an eye to how it would land in a nonprofit program office. I hadn't read the essay. I know the BCG "jagged frontier" study only from headlines.
**Material:** `figures/appropriate-reliance/index.html?edition=business`, served locally on port 5583. Played in Playwright Chromium at 1280×900, 1280×720 and 390×844, with frames captured every 0.5 s while the animation ran. I also checked `?t=`, `?reduced`, prefers-reduced-motion, print media, JS off, keyboard only, and the accessibility tree.
**Paths played:**

| Path | Gate 1 ("check one") | Gate 2 ("goes into the launch plan") | Viewport |
|---|---|---|---|
| Honest | Check Task B | Rely on it, after a careful read | 1280×900 (and 390 end state) |
| Always check (a) | Check Task A | Ask for a week to check both | 1280×720 |
| Always check (b) | Check Task B | Move my check here | 1280×900 |
| Never check (a) | Skip | Rely on it, after a careful read | 390×844 |
| Never check (b) | Skip | Skip | 1280×720 |

The report below was written before I opened any source. The fact check against the study comes after it.

---

## 1. Beat by beat

**On load (0:28, beat 3 of 10).** The page doesn't start at zero. It opens straight on the question. For about 1.5 s a big "The skill / Appropriate reliance" title sits over a ghosted stage, then fades. Two cards appear underneath. Task A: "Segment the footwear industry market based on users." Task B: "Use a spreadsheet and insider interviews to pick the brand a clothing firm should back." Each card shows "AI's answer", two grey lines and a dark "Ready" tag, then "If it's your team's first draft · Your call · ( ) Check this one". Along the bottom runs "Time for one check · A check: work it yourself, then compare", and at the top "Dell'Acqua et al. · Field experiment, 2023 · 758 BCG consultants · some with GPT-4". The caption reads "You have time to check one. Which one?" Continue stays disabled until you pick; Skip is available.
*What I took from it:* a realistic triage. I have two AI drafts, they look the same, and I can only check one properly. That's my week.

*My honest call:* Task B. A single pick that rests on reconciling a spreadsheet with interview notes is the kind of answer that can be confidently wrong, and nobody downstream will redo it. A segmentation is a first cut that the team will argue with anyway. (I'll admit that half-remembering the study's headline probably pushed me there.) When I picked, a red dot appeared in Task B's button, and "You rely on it" appeared in red on Task A. That felt clear and fair: the figure makes you own the other half of the decision too.

*What I missed:* beats 0–2 ("Two tasks from one study", "An AI answers both. The two answers look equally finished.") never play on first load. I only saw them after pressing Start over, where beat 1 holds for about 17 s while the cards type in. "The two answers look equally finished" is a good line. A first-time reader only gets it implicitly, from the matching Ready tags.

**On Continue: the page jumps.** At 1280×900 the stage re-lays out: the cards get wider and taller, and the page scrolls down about 170 px so the controls stay on screen, all within about half a second. At 1280×720 the change is bigger: compact, short cards switch to tall cards. At 390 the page scrolls down about 210 px. I lost my place for a moment each time. It isn't serious, but it happens at the exact moment I'm expecting the verdict.

**Beat 4 (about 0:34–0:47): "A jagged frontier marks where an AI stops being reliable. Inside it, AI helped."** A zigzag line draws down between the cards, labelled "Inside the frontier" over A and "Outside the frontier" over B. At the bottom of Task A, three numbers count in one at a time: "With AI, across tasks inside the frontier: 12.2% more tasks · 25.1% faster · 40%+ higher quality." About 13 s is plenty to read. I understood this as: the study sorted these tasks into ones the AI handles well and ones it doesn't. The phrase "across tasks inside the frontier" tells me the numbers cover a set of tasks, not segmentation alone. Good.

**Beat 5 (about 0:47–0:59): "On Task B, consultants with AI were right less often. Graders still rated their work higher."** The picture dims and a panel rises: "Right answers on Task B". The bars grow one at a time: Without AI 84.5%, GPT-4 alone 70.6%, GPT-4 + overview 60%. They're drawn to scale from zero (I measured them), so the drop is honest. A bracket under the two GPT-4 bars says "Rated higher in quality, right or wrong." Then the panel shrinks and settles onto Task B's card in under a second. I could follow it because it's obviously the same panel. This is the beat that lands for a manager: polished, persuasive and wrong is exactly the failure that gets past my review. The one gap is that "+ overview" means nothing on screen. Overview of what? Only the beat list says "prompt-engineering overview".

**Beat 6 (about 0:59–1:13): "Task B's deciding details were in the interviews. For Task A, the evidence suggests none."** "insider interviews" gets underlined in Task B. Under it: "The deciding details were in the interviews / The spreadsheet only looked complete." Then Task A gets "What the evidence suggests: No hidden facts: a weak answer shows when read." This is the transferable cue, the thing I'd take back to my own team: check where the answer hinges on detail the model can skim past and a read-through won't expose. The Task A line, though, is labelled as evidence. It reads to me like the figure's own reasoning (see Problems).

**Beat 7 (about 1:13–1:27): "The evidence suggests relying on Task A and working Task B yourself from the interviews."** A key appears ("● Your calls" in red, "■ Suggested call · reasoned from the results" in navy). The options I didn't choose fade. A navy "Rely on it" tag goes on Task A with "A check here leaves Task B unchecked". Task B gets a navy "Work it from the interviews, then compare". On my honest path, red and navy agree. On the always-check path (check A), my red "Check this one" on A sits right above the navy "Rely on it", and my red "You rely on it" on B sits next to "Work it from the interviews". The mismatch shows, but quietly. Nothing says in words that my call differed. The screen-reader text does ("You chose…").

**Beat 8 (gate 2, 1:31): "Now your segmentation goes straight into the launch plan. What about Task A?"** A new line on Task A: "If it goes straight into the launch plan", with three options. The middle option's label adapts to what I did at gate 1: "Move my check here" if I'd checked B, "Keep my check here" if I'd checked A, "Put my check here" if I'd skipped. The third is "Ask for a week to check both". I liked this question. It's the one a manager actually faces when a draft gets promoted to a deliverable. The Task A card is now dense (about nine rows of text), but still readable at 1280.
*My honest call:* "Rely on it, after a careful read." The study says this task is AI-strong, and my one check is worth more on B.

**Beat 9 (about 1:39–1:51): "Still inside the frontier: rely on it, and read it before it's built. Task B needs the check."** The options I didn't choose fade. "Task B: read-through only" appears next to Move/Keep/Put, and "Launch slips a week" next to Ask for a week. Then a navy tag: "Rely on it · Read it before it's built." On the move path, Task B's dot turns into a ring labelled "Check moved to Task A". The consequences read clearly and neutrally. "Read it before it's built" puzzled me for a second: built into what? The plan? The product? "Before it goes into the plan" would be plainer.

**Beat 10 (1:51 to end): Reviewer's check.** The caption area becomes two lines: "Appropriate reliance: Accept AI support where it's warranted, check or refuse it where it isn't, and be able to say why." Then, in italics: "Reviewer's check: What evidence justified relying on the AI here, and what would have changed the call? Change one condition and ask for the call again." The full picture stays up. The "After you make your call" panel below the figure unlocks, with what a good answer says, the evidence (with page cites and limits) and the tasks.

**What each path taught:**
- *Honest (B, then rely):* confirmation, plus a reason I can say out loud. The reason is the interviews, not "AI is bad at strategy".
- *Always check (A, then a week):* the figure doesn't scold. It shows that my check sat on the safe task, and that asking for a week has a price ("Launch slips a week"). Only the after-panel calls the week "defensible". On screen the navy suggestion simply disagrees with me, so a cautious reader may feel marked wrong for being careful.
- *Always check (B, then move):* clear lesson. Moving the check strands the risky task on a read-through, and the beat 5 bracket has already told me a read-through won't catch the miss.
- *Never check (skip, skip):* both cards say "No call made". The figure then plays the same evidence and the same suggested calls, so a skipper learns the same thing passively. Note that the figure gives you no way to say "rely on both" at gate 1. The budget assumes you'll check something, so "never check" can only be expressed as Skip.
- *Across all paths:* the captions and suggested calls are identical whatever you choose. Your choices change only the red marks, the option labels and the screen-reader summary. It's interactive in the asking, not in the answering. That's fine for a single lesson, but the "your calls versus suggested" comparison is easy to miss.

**Timing.** Every caption is one or two short lines held for 12–14 s. None changed before I'd read it. Nothing felt rushed. Beat 1 (17 s, only seen via Start over) feels slow. The only things I'd call fast are the layout jump on Continue and the under-a-second settle of the beat 5 panel.

## 2. The point, in one sentence

When you can only afford to check one AI answer, put the check where the answer turns on details the model can miss and a polished wrong answer would pass review (the interview-dependent brand pick), and rely on it where the study found it strong and a weak answer shows on reading, and be able to say why.

## 3. The question a manager should ask afterwards

"On the AI-assisted work my team is shipping this month, which outputs hinge on facts the model can't see or might skim past, and where would a confident wrong answer sail through our review? That's where our one real check goes. What would make us move it?"

## 4. The final frame alone

It mostly carries the idea without the animation. A, inside the frontier, is marked "Rely on it" for the first draft and "Rely on it · Read it before it's built" for the launch plan, with the reason ("No hidden facts…") and the inside-frontier gains. B, outside the frontier, is marked "Work it from the interviews, then compare", with the reason ("The deciding details were in the interviews / The spreadsheet only looked complete") and the 84.5 / 70.6 / 60 bars. My red calls sit next to the navy suggestions, with the key at the foot. The definition and the reviewer's question sit underneath.
What it says to me: *uneven tool, so spend scrutiny unevenly, and know why.*
Weaknesses as a still: it's dense. Task A's card has nine stacked rows in three typefaces, and the final navy tag crowds the "With AI, across tasks…" stats at 1280×900. At 390 the frame is about 1,450 px tall under a sticky caption panel that takes about 45% of the screen. On a phone you never see the final frame whole. You scroll through it.

## 5. Problems, ranked

1. **"What the evidence suggests: No hidden facts: a weak answer shows when read" is labelled as evidence but reads as the figure's inference.** It's the hinge of the "rely on A" call. A skeptical manager will push back straight away: beat 5 just showed that graders couldn't tell good from bad on B, so why would my careful read catch a weak segmentation? The after-panel is honest ("the figure reads it as having no hidden facts"), but the on-screen label claims more than that. Suggest relabelling it "How the figure reads it" or "Our reasoning", matching the "Suggested call · reasoned from the results" key, which gets this right.
2. **Raising the stakes doesn't change the call, and the figure doesn't address the obvious objection.** When the segmentation goes straight into the launch plan, the call stays "rely, read carefully". That's defensible from the study's averages: inside the frontier, AI work scored higher. But a manager's worry about a launch plan is the rare bad miss, not the average. The figure never says that average gains inside the frontier don't rule out individual errors. Since the reviewer's question is literally "what would have changed the call?", it's odd that the one condition change on the page doesn't change it. Name a condition that *would* flip it (for example, "if the segmentation used customer data the AI never saw").
3. **The cautious path feels marked wrong.** "Ask for a week to check both" gets a navy disagreement and "Launch slips a week". The word "defensible" appears only in the locked after-panel. For a page meant to teach calibration, not speed, I'd put a short "defensible, at a cost" on screen, or the figure risks reading as "checking is waste".
4. **Your call against the suggested call is shown only by colour.** Nothing on screen says "you put the check on A; the evidence points to B". The red/navy key is small and sits at the foot of the stage. Sighted readers who chose differently may not notice they diverged. A short line in beat 7 or 9 would fix this, and the screen-reader text already does it ("You chose…").
5. **The layout jumps on Continue** (zoom plus a 170–210 px scroll) at the very moment the verdict starts. At 1280×720 the cards change shape completely. It's disorienting, though brief.
6. **Beats 0–2 are skipped on load.** "The two answers look equally finished" is a strong premise line, and first-time readers never see it as a caption. Consider putting it on the gate screen, perhaps in the subtitle.
7. **Unexplained on-screen terms:** "GPT-4 + overview" (overview of what?); "read it before it's built" (built into what?); "frontier" is introduced in beat 4 without saying it's the study's own term, though the after-panel covers it.
8. **Nonprofit fit is implicit.** Everything is consulting: footwear segmentation and a brand investment for a clothing firm. A business reader sees their own work right away. A nonprofit program manager can map it (segment beneficiaries; pick which program to fund from a budget sheet plus site-visit interviews), but nothing on the page invites that translation.
9. **Small mechanics:** pressing Play at a gate does nothing and gives no feedback. The counter shows "3 / 10" while the beats are numbered 0–10 ("ten beats" but eleven entries). At the end, the reduced-motion view labels the button "Play", while the normal view says "Replay".

**Fairness to the AI:** fair. Beat 4 puts the AI's gains (12.2% / 25.1% / 40%+) on screen before beat 5 shows its failure, and the suggested call relies on the AI for half the work in both conditions. It doesn't read as "AI bad". If anything, problem 3 tilts it slightly toward "checking is costly".

**Factual claims I wanted sourced** (checked below): 758; "some with GPT-4"; 12.2% / 25.1% / 40%+; 84.5 / 70.6 / 60; "rated higher in quality, right or wrong"; "the spreadsheet only looked complete"; the task wordings; "field experiment"; whether segmentation was really one of the inside-frontier tasks.

## 6. Mechanical checks

- **Can I learn the answer before committing?** No, by any route a reader would try:
  - Scrubbing by mouse click, drag, keyboard (End, arrows, PageUp) or a programmatic value: the slider clamps at 0:28.
  - `?t=60`, `75`, `115`, `120`, `200`: all hold at the gate.
  - The beat list shows "Make your call to see this." for beats 4–10, and clicking does nothing.
  - The visible page text and the accessibility tree at 1280 and 390 contain no frontier labels, numbers or suggested calls. The screen-reader description says "The rest… appear after you answer or skip".
  - Print media, `?reduced` and prefers-reduced-motion all show the gate. Forcing or clicking the after-panel `<details>` reveals nothing, because the panel itself is `hidden`.
  - Once you've answered, the choice is locked. Scrubbing back to the gate doesn't reopen it, so you can't change your call after seeing the results. Start over resets both questions.
  - The only leaks are for someone opening the source or dev tools: the answers sit in the DOM (in `display:none`, `hidden` or `aria-hidden` nodes) and in the JS. That's acceptable.
  - Mild nudges visible before you answer: "How this figure works" mentions "the launch plan", and the "Reviewer's check" below the figure ("What evidence justified relying on the AI here…") implies reliance is right somewhere. Neither says where.
- **Reduced motion:** after both calls, `?reduced` shows the final frame with full text and an expanded beat list ("On screen:" descriptions). Before the first call it correctly shows the gate. Note that in reduced mode Continue jumps straight from gate 1 to gate 2, so the beat 4–7 captions never appear as captions. The picture and the beat list still carry them.
- **Horizontal scroll at 390:** none. scrollWidth equals clientWidth (390) at the gate and at the end.
- **Keyboard:** yes.
  - The tab order is nav links, the edition switch, the radio group (arrow keys move between A and B, Space selects), Skip (and Continue once enabled), Play/Pause, Start over, the scrub slider, then the beat list.
  - Enter on a chosen radio continues, and focus moves to Pause.
  - Enter toggles pause. On the slider, the arrows, PageUp/PageDown, Home and End all work. End stops at the next unanswered gate.
  - Focus rings are visible: solid 2 px on buttons and the slider, the browser default on radios.
- **Auto-scroll:** on narrow screens the page follows the action, but it respects the reader. When I scrolled up mid-beat it didn't pull me back.
- **JS off:** the fallback shows the definition plus **"Faculty check: What evidence justified relying on the system here…"**. That's the classroom wording, on the business URL. It also shows Play/Start over buttons that can't work.
- **Military or classroom wording on the business page:**
  - With JS on, the figure and the after-panel are clean. They say "Reviewer's check", "your team's first draft", "launch plan", "analyst", "graders" (the study's word).
  - Provenance lines name military education on purpose and are clearly labelled: the "See this with: Workplace · PME" switch, the footnote "PME (professional military education): the example from The Irreducible Officer, the National War College essay", and Go further ("an essay about judgment in military education", "written for military education").
  - "PME" in the switch is jargon to a business reader until they reach the footnote.
  - The nav link "Essay" goes to the essay's Section V anchor without warning that it's the military essay.
  - Leftover: the noscript "Faculty check".
- **Numbers on screen against source-spine.md and the essay:** see the fact check below.

---

## Fact check (done after writing the read above)

**Sources and access.** I couldn't read the working paper directly. Both the HBS item page (`hbs.edu/faculty/Pages/item.aspx?num=64700`, which is also the page's own link) and SSRN 4573321 returned HTTP 403 to my fetcher. I didn't try to get around that, and I didn't pull third-party mirrors of the PDF. Instead I checked against:
- the companion's `sources/source-spine.md` (the "Jagged Frontier" entry);
- `BCG-VERIFY.md` in this folder, which quotes the paper with page numbers. I opened it only after writing the read above, and it's the project's own notes, so it isn't independent;
- independent secondary summaries found by web search: businessdatasolutions.github.io/ai-wiki (Dell'Acqua source note), the-decoder.com, and Fortune (2023-10-06).

Where those agree, I count the claim as supported. Where only BCG-VERIFY covers it, I say so.

| Claim on the page | Where it appears | Verdict |
|---|---|---|
| 758 BCG consultants | Stage header; after-panel | **Supported.** Spine, BCG-VERIFY (abstract p. 2), secondary. The stage line is fine as a study label, but the Task B bars come from the 373 who did that task. The after-panel says so; the stage doesn't. |
| About 7% of individual-contributor consultants; 385 inside, 373 outside | After-panel | **Supported** (BCG-VERIFY: abstract and p. 6; secondary agrees on 385/373). **Not in source-spine.md**, a spine gap. |
| "Field experiment, 2023" | Stage header | **Supported.** The paper's subtitle is "Field Experimental Evidence…"; secondary sources call it a preregistered field experiment. |
| "Some with GPT-4"; three conditions (none / GPT-4 / GPT-4 + prompt-engineering overview) | Stage header; after-panel | **Supported.** |
| 12.2% more tasks, 25.1% faster, 40%+ higher quality, "across tasks inside the frontier" | Task A card (beat 4) | **Supported** (abstract). The label correctly scopes it to the set of 18 tasks, not segmentation alone. Unstated caveats (BCG-VERIFY): "faster" is time to reach the last question within a fixed 90 minutes; "40%+" is pooled (GPT-only alone was +38%). Neither is misleading at figure level. |
| Task B correct: 84.5% without AI, 70.6% GPT-4 alone, 60% GPT-4 + overview | Beat 5 panel | **Supported, and in the right order** (BCG-VERIFY: Figure 7, Table 4; the businessdatasolutions summary agrees). Watch out: one search-engine summary I saw swapped 70.6 and 60. The page has them right. |
| "19 percentage points less likely to produce correct solutions" | After-panel | **Supported** (abstract, working-paper wording). The spine notes that the published version (Organization Science, 2026) says "19% less likely". The page quotes the working paper and cites it, so that's consistent. |
| Gap between the two AI groups significant only at the 10% level | After-panel | **Supported** per BCG-VERIFY (p. 14; p = 0.082). Not in the spine. |
| "Rated higher in quality, right or wrong" / "Graders still rated their work higher" | Beat 5 bracket and caption; after-panel quotes "regardless of the correctness of their answer" (p. 15) | **Supported, with a caveat shown only in the after-panel.** Among wrong answers alone, the effect is significant only at the 10% level (n = 105; BCG-VERIFY: Table 6). On screen the bracket is unqualified. I'd call that acceptable compression, not an overstatement, since the paper's own sentence is unqualified. |
| "The deciding details were in the interviews / The spreadsheet only looked complete" | Beat 6, Task B | **Supported.** The paper (p. 13, via BCG-VERIFY): "While the spreadsheet data alone was designed to seem to be comprehensive, a careful review of the interview notes revealed crucial details." BCG-VERIFY also warns the paper never says the spreadsheet *pointed to a different brand*. The page doesn't claim that; "only looked complete" stays inside what the paper says. |
| "The authors designed the task so that GPT-4 would get it wrong" | After-panel | **Supported** (p. 8). |
| Task A wording, "Segment the footwear industry market based on users." | Card | **Supported verbatim** (p. 9 example; Appendix A reads "by users"). |
| Task B wording, "Use a spreadsheet and insider interviews to pick the brand a clothing firm should back." | Card | **Fair paraphrase** of "tell the CEO which of its three brands to invest in / focus on". The after-panel discloses the paraphrase. |
| "A jagged frontier marks where an AI stops being reliable. Inside it, AI helped." | Beat 4 caption | **Fair simplification.** The paper's frontier is about which tasks fall within GPT-4's capability. "Stops being reliable" is a reasonable gloss. |
| "What the evidence suggests: No hidden facts: a weak answer shows when read." | Beat 6, Task A | **Not supported as evidence.** The study didn't test whether weak inside-frontier answers are detectable on reading. The after-panel admits it's the figure's reading. One inside-frontier finding cuts against it: secondary sources (the-decoder, the businessdatasolutions note) report that AI users' ideas were markedly *less diverse* (homogenized). That's a weakness a single careful read of one segmentation won't reveal. I couldn't confirm the exact size against the PDF. This is the one place where the page goes beyond its source, and where it could be read as contradicting part of the study's own nuance. **Recommend relabelling it as the figure's reasoning.** |
| Suggested calls ("reasoned from the results"); the time budget, first draft and launch plan as the figure's own | Key; How this figure works; after-panel | **Honest framing.** The after-panel says outright that "the study itself didn't test checking, a time budget, or what the work was for." Good. |
| "The study examined GPT-4 as it was in 2023" / "the frontier moves as models change" | After-panel | Appropriate hedge. |

**Is the source line clear without overclaiming?** Mostly yes.
- The stage header names the study, the year, the sample and the tool.
- "How this figure works" draws the right line: "the tasks and results are the study's, and the time budget, the first draft and the launch plan are this figure's".
- The after-panel gives the citation, page cites and limits.
- Three small gaps: the 385/373 split isn't on the stage; the only overclaim is the "What the evidence suggests" label on Task A; and the source link goes to an HBS page that returned 403 to an automated fetch. A human browser will probably load it, but there's no fallback such as SSRN or a DOI.

**Does it contradict or overstate the study?** It doesn't contradict any headline number or design fact I could check. It overstates in one place, the Task A "evidence" label. And by leaving out the homogenization finding, its case for relying on Task A without checking reads a little cleaner than the study supports.

**Numbers against source-spine.md:** every number on screen (758; 2023; 12.2%; 25.1%; 40%+; 84.5%; 70.6%; 60%) is in the spine. Some after-panel figures are not: about 7%, 385/373, the 10% significance level, and the p. 15 cite. They're supported by the paper as quoted in BCG-VERIFY, but the spine should carry them if it's meant to be the canonical record.
