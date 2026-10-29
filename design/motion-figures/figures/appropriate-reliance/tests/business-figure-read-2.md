# Cold read: appropriate-reliance, business edition, figure test, round 2

Reader: a manager or consultant at a company or nonprofit who has never seen the essay. Material: `figures/appropriate-reliance/index.html?edition=business`, served locally on port 5241. Played at 1280×900, 1280×720 and 390×844 in Playwright, capturing a frame every 0.5 s through every animated stretch. The timeline ran at real speed: 87 s of timeline took about 85 s of wall time.

## How I played, and what each path taught

| Path | Viewport | First draft call | Launch plan call | End line |
|---|---|---|---|---|
| Honest | 1280×900, 390×844 | Check Task B | Rely on it, after a careful read | First draft: matches · Launch plan: matches |
| Always check | 1280×720, 390×844 | Check Task A | Ask for a week to check both | First draft: differs · Launch plan: defensible |
| Always check, variant | 1280×900 | Check Task B | Move my check here | matches · differs |
| Always check, variant | 1280×900 | Check Task A | Keep my check here | differs · differs |
| Never check | 1280×720 | Skip | Rely on it, after a careful read | First draft: no call · Launch plan: matches |
| Never check | 390×844 | Skip | Skip | no call · no call |
| Mixed | 1280×900 | Check Task A | Rely on it, after a careful read | differs · matches |

**My honest calls.** I made the first call from the gate screenshot, before I looked at any page markup. I'd check Task B: it hinges on reading interviews and a spreadsheet together, and it ends in one consequential pick. A segmentation draft is the sort of thing a manager can judge by reading it. For the second call I'd rely on Task A after a careful read, and sanity-check it against our own customer data. One caveat: I wrote my script's second choice after a DOM dump that contained the hidden phone-layout text, including the suggested launch-plan call. So treat my second call as possibly contaminated. I believe I'd have made it anyway.

**What each path teaches.**
- **Honest path.** Everything says "matches". It confirms, and the lesson is in the reasons the stage adds: no hidden facts on Task A, and the deciding details were in the interviews on Task B.
- **Always check.** Putting the check on Task A gets "differs", and the note "A check here leaves Task B unchecked" lands well. It shows that checking the easy, readable task leaves the risky one with no check. "Ask for a week to check both" gets "defensible · a week late", not a mark-down. That's the right message: buying time is legitimate and it has a price.
- **Move-check variant.** Task B's mark becomes a ring, "Check moved to Task A", and the end note reads "Task B: read-through only". It makes the trade-off concrete.
- **Never check.** This path teaches the least. The figure has no way to record "I'd rely on both", so a reader who over-trusts AI can only skip ("No call made") and still collects "Launch plan: matches". Their reliance on Task B is never put in front of them. The nearest "never check the risky one" path is checking Task A: that's where "You rely on it" sits under Task B and the "differs" lands.

## 1. Beat by beat (honest path, 1280×900, timeline times)

- **Load (0–3.5 s wall).** The page is blank for about 0.5 s. Then the name "Appropriate reliance" with "The skill" above it sits large over a faded stage, and shrinks into the corner. The figure opens straight onto beat 3 at 0:28. Beats 1 and 2 ("Two tasks from one study" and "The two answers look equally finished") never play as captions. You only see them if you scrub back to 0:00. My first caption reads "3 / 10", and I wondered what I'd missed.
- **3 / 10, "You have time to check one. Which one?" (gate at 0:28).** Two white cards. Task A: "Segment the footwear industry market based on users." Task B: "Use a spreadsheet and insider interviews to pick the brand a clothing firm should back." Each has "AI's answer" with grey lines and an identical "Ready" tag, then "If it's your team's first draft · Your call" and a "Check this one" pill. Along the bottom: "Time for one check · A check: work it yourself, then compare." The set-up is clear and fair: both answers look equally finished. "If it's your team's first draft" is a little cryptic as a stakes line until the second question gives it a contrast. Choosing one puts a red dot on it and "You rely on it" in red on the other card. That's good: choosing to check one makes you explicitly rely on the other.
- **After Continue (0:33–0:35).** About 2.5 s with nothing new on screen while the old caption stays up. A small dead spot.
- **4 / 10, "A jagged frontier marks where an AI stops being reliable. Inside it, AI helped." (0:35–0:46, 11 s).** A zigzag is drawn down between the cards, with "Inside the frontier" over A and "Outside the frontier" over B. Along the bottom of Task A: "With AI, across tasks inside the frontier: 12.2% more tasks · 25.1% faster · 40%+ higher quality." Easy to read in time. The zigzag works as a divider, but it doesn't show "jagged" in the study's sense, that tasks which look alike fall on different sides. The skipped beat 2 caption was carrying that idea.
- **5 / 10, "On Task B, consultants with AI were right less often. Graders still rated their work higher." (0:46–1:00, 14 s).** The stage dims and a panel rises: "Right answers on Task B. Without AI 84.5% · GPT-4 alone 70.6% · GPT-4 + overview 60%". The bars grow in turn between 0:48 and 0:51. At 0:52 a bracket under the two GPT-4 bars reads "Rated higher in quality, right or wrong". The panel then settles onto Task B's card (0:57–0:58). For a moment mid-move its heading overlaps the frontier line. Readable and well paced; the caption runs about 6 s ahead of the bracket. Two snags. "GPT-4 alone" reads as the AI working without a person. And "overview" isn't explained anywhere on the stage.
- **6 / 10, "Task B's deciding details were in the interviews. Task A, the figure reasons, has none." (1:00–1:13, 13 s).** "Insider interviews" gets underlined. Task B: "The deciding details were in the interviews / The spreadsheet only looked complete." Then Task A: "Why reading is enough / No hidden facts: a weak answer shows when read" (italic). The caption honestly flags Task A's line as the figure's reasoning. But "has none" is ambiguous: none of what? It reads as "Task A has no deciding details".
- **7 / 10, "The evidence suggests relying on Task A and working Task B yourself from the interviews." (1:13–1:27, 14 s).** A key appears: "● Your calls" in red and "▬ Suggested call · reasoned from the results" in navy. The options you didn't pick fade. Task A gets a navy "Rely on it" tag and the note "A check here leaves Task B unchecked". Task B gets "Work it from the interviews, then compare". The key says "reasoned"; the caption says "the evidence suggests". See problem 1.
- **8 / 10, "Now your segmentation goes straight into the launch plan. What about Task A?" (1:27, gate at 1:31).** A new line on Task A, "If it goes straight into the launch plan · Your call", with three pills: "Rely on it, after a careful read", "Move my check here" ("Keep my check here" if you checked A first; "Put my check here" if you skipped) and "Ask for a week to check both". I immediately wanted to know what happens to Task B's brand pick. Nothing tells you. See problem 4.
- **9 / 10, "Inside the frontier: rely on it, read it first. Facts the AI couldn't see would move the check." (1:39–1:51, 12 s).** The options you didn't pick fade. Beside "Move my check here": "Task B: read-through only". Beside "Ask for a week…": "Defensible · a week late". Task A's second line gets the navy tag "Rely on it · read it first", about 6 s after the caption has already said it.
- **End (1:51–2:00).** The caption area becomes two rows. "Appropriate reliance: Accept AI support where it's warranted, check or refuse it where it isn't, and be able to say why." "Reviewer's check: What evidence justified relying on the AI here, and what would have changed the call? Change one condition, like facts the AI couldn't see, and ask again." Bottom left: "Your calls · First draft: matches · Launch plan: matches". Below the figure, a section unlocks: "What a good answer says", "Evidence" and "About the tasks".

No caption changed before I'd read it. Every caption stays up at least 11 s and none is longer than about 17 words. Every movement finished before the next caption arrived.

## 2. The point

Spend your scarce checking time where an AI answer can look finished and still be wrong, because the deciding facts aren't visible in the answer. Rely on it where a careful read would expose a weak answer. Be able to say what fact would move the check.

## 3. The question a manager should ask afterwards

"Take one AI output your team relied on this week. What told you a read-through was enough? And what one fact, if it had been true, would have made you redo the work yourself rather than read it?"

## 4. The final frame alone

It mostly carries the idea. Both tasks, the frontier, the inside-frontier gains, the Task B bars, your calls in red against the suggested calls in navy, the definition and the reviewer's check are all in view. It works as a reference card more than as a picture. It has about 45 separate text items, and a cold reader would need a minute or more. Read on its own, it tells me: rely on A, check B starting from the interviews, and the bars are why.

What the final frame loses:
- The caption "the figure reasons" is gone. "Why reading is enough / No hidden facts" on Task A now sits in the same small-caps register as the study-derived "The deciding details were in the interviews" on Task B. Only italics separate the figure's inference from the study's design.
- "GPT-4 alone" still invites the wrong reading.

## 5. Problems, ranked

1. **The figure's reasoning is presented as evidence (moderate–high).** Caption 7 says "The evidence suggests relying on Task A and working Task B yourself." The page's own text below says "the study itself didn't test checking, a time budget, or what the work was for." The key does say "Suggested call · reasoned from the results", but it's small and sits bottom right, and on the phone it's out of view during beats 7–9. In the final frame, Task A's "Why reading is enough" looks like a finding. Suggested fix: change the caption to "Reasoning from these results: rely on Task A, work Task B yourself from the interviews", and label Task A's note "The figure's reasoning" on the stage.
2. **The "GPT-4 alone" bar label (moderate).** It reads as GPT-4 answering with no human. I can hear a manager repeating "GPT-4 alone got it right 70.6% of the time." The study's group is consultants who had GPT-4. "Overview" is also unexplained on the stage. The ordering 84.5 > 70.6 > 60 invites the takeaway "prompt training made people worse", with no on-stage hint that the gap between the two AI groups is weak. Suggested labels: "With GPT-4" and "With GPT-4 + prompt training".
3. **The take-home rule slips between two ideas (moderate).** The stage says a check is needed when correctness depends on details a reader can't see in the answer: Task B's interviews. The rule it ends on is "Facts the AI couldn't see would move the check", which is about what the AI had access to. In the study, the Task B consultants had the material and could give it to GPT-4, and the AI groups still did worse (see the fact check below). A manager could leave thinking "give the AI all the data and you can rely on it", which is the opposite of what Task B shows. The end text's example ("if the segmentation rested on customer data it never had") is sound for Task A, but the same principle doesn't explain Task B.
4. **The launch-plan change only applies to Task A (moderate).** Only the segmentation goes "straight into the launch plan". Nothing says what happens to Task B's brand pick: does it stay a first draft with more review downstream? A reader who reasons "A is now unreviewed and high-stakes, B still gets reviewed later, so move my check to A" gets "differs". The figure's answer, that a read-through by anyone won't catch B's miss, is in the text below the figure, not on the stage at decision time. Nothing is marked "wrong", but this "differs" can feel like a mark-down for a reasonable call.
5. **The never-check reader is never confronted (moderate–low).** There's no "rely on both" option, so a reader who over-trusts AI skips, sees "No call made", and still gets "Launch plan: matches". The one reader the figure most needs to reach never sees their own reliance on B marked.
6. **The failure gets more space than the benefit (low–moderate).** Task B's failure gets the whole stage, dimmed, with a big panel for about 10 s. Task A's gains are one small line at the foot of the card. A skimmer could leave with "AI is wrong and you can't tell" rather than "rely where it's warranted". Caption 7 and the end text pull it back.
7. **Nonprofit fit (low–moderate).** Business readers will see their own work right away: market segmentation, a brand investment, a team's first draft, a launch plan, "a week late". Nonprofit readers have to translate all of it. One line of analog would help, for example segmenting donors, or choosing which program to fund from budget data and staff interviews.
8. **The opening skips beats 1–2 (low).** The first caption is "3 / 10". "The two answers look equally finished" carries the "jagged" idea and never appears as a caption unless you scrub back.
9. **Wording: "Task A, the figure reasons, has none." (low).** Try "…has no hidden facts."
10. **Layout jump at 1280×720 (low).** The question is asked in a compact layout. After Continue the stage swaps to the taller layout and the page scrolls about 165 px by itself.
11. **Phone, 390×844 (low; desktop-first).** The stage scrolls itself inside a fixed window. The Task A and Task B headers and the "Suggested call · reasoned from the results" key are out of view during beats 6–9. At the end, the end card covers the "Your calls · … matches" line and the final navy tag until you scroll the page. "Rated higher in quality, right or wrong" runs under all three bars with no bracket, so it can be read as including "Without AI".
12. **Copy drift (low).** "Defensible · a week late" on desktop, "Defensible · launch slips a week" on the phone.
13. **The "keep" and A-first paths (low).** After "Keep my check here", the end text explains "Moving the check leaves Task B…", which describes a move the reader didn't make. A reader who checked A first and then picks "Rely on it, after a careful read" gets "matches", but the figure never says whether their one check now goes to B.

## 6. Mechanical checks

- **Reduced motion (`?reduced` and `prefers-reduced-motion`).** Both gates still hold. After each call the figure jumps straight to the next gate, then to the final frame, with full text, and the section below unlocks. In reduced mode the captions for beats 4–7 never show as captions; their content is on the stage and in the beat list.
- **Horizontal scroll at 390px.** None: `scrollWidth` is 390 at the gate and at the end.
- **Keyboard.** Tab reaches the radio group (arrow keys pick A or B), Continue (Enter works), Skip, Play/Pause, Start over, the scrubber (arrows, Home, End; End stops at the next unanswered gate) and the beat-list buttons. The focus ring on the in-stage pill is clearly visible.
- **Numbers.** On the stage: 758, 12.2%, 25.1%, 40%+, 84.5%, 70.6% and 60%. All appear in `sources/source-spine.md` (Dell'Acqua entry), and so does "19 percentage points" from the text below. The text below also gives 385/373, "about 7%", the p. 12 variability quote, the p. 15 "regardless of the correctness" quote and the 10%-significance caveat. The spine has the p. 15 quote but not the rest; they're checked against the paper below.

## Could I learn the answer before committing?

No, not through any normal reader route. What I tried:

- **`?t=` jumps.** `?t=50`, `?t=110` and `?t=120.9` all land on the first gate at 0:28.
- **The scrubber.** Arrow keys, End, a mouse drag and setting the value from script all leave it pinned at 0:28.
- **Play.** At a gate it just shows "Make your call first, or skip this question."
- **The beat list.** Items 4–10 are disabled and read "Make your call to see this."
- **Reduced motion.** Both `?reduced` and the media query stay at the gate.
- **Screen reader.** The text says "The rest of this description … appear[s] after you answer or skip each question." The later summaries carry the `hidden` attribute, and the phone layout is `aria-hidden`.
- **Find in page.** `body.innerText` has no "84.5" before the call.

The only leaks are for someone who opens devtools. At the gate, the live DOM already holds the phone-layout markup with every result and suggested call, hidden by CSS, and the fetched `editions/business.json` has them too. The static `index.html` doesn't. I'd call that acceptable.

## The specific questions

- **Would a business or nonprofit reader see their own work?** Business: yes, clearly. Consulting tasks, a team draft, a launch plan and a time budget are recognizable, and "a check: work it yourself, then compare" is what a manager actually assigns. Nonprofit: only after translating; nothing on the page points to their kind of work.
- **Calibrated reliance, or "always check" / "AI bad"?** Calibrated. It recommends relying on A twice, shows the gains inside the frontier, and calls "check both" defensible but costly rather than ideal. The end text names a blind spot (less variety) without turning it into "always check". The risk is salience (problem 6) and the never-check gap (problem 5), not the message.
- **Is the figure's own reasoning labelled as evidence?** Yes, in caption 7 ("The evidence suggests…"), and in the final frame, where "Why reading is enough / No hidden facts" looks like a finding. "The deciding details were in the interviews / The spreadsheet only looked complete" is presented as fact; the fact check below covers it. "Rated higher in quality, right or wrong" is stated flatly on the stage; the weak-significance caveat is only in the text below.
- **Does it model the "what would have changed the call?" answer?** On the stage, thinly: one sentence, "Facts the AI couldn't see would move the check." The condition the figure actually changes (the launch plan) is a stakes change that doesn't move the check, so the stage never shows a change that does. "What a good answer says" below the figure models it well: where the check went, why, the blind spot, and the concrete condition (customer data the AI never had). That example should be on the stage.
- **Is any defensible choice marked simply wrong?** No. The verdicts are only matches, differs, defensible and no call. "Ask for a week" is defensible. "Move my check here" → "differs" is the closest to unfair (problem 4).
- **Does it contradict or overstate the BCG study?** No outright contradiction. The overstatement risks are the "GPT-4 alone" label, the flat "rated higher, right or wrong", the unqualified ordered 70.6 > 60 bars, "The evidence suggests" for the figure's own recommendation, and the "facts the AI couldn't see" framing set against how Task B actually failed.
- **Is the source line clear, without overclaiming?** Yes. "Dell'Acqua et al. · Field experiment, 2023 · 758 BCG consultants · some with GPT-4" is modest and clear. "How this figure works" cleanly separates the study's tasks and results from the figure's time budget, first draft and launch plan. One nit: the stage implies all 758 did both tasks, when they were split 385/373; the text below says so.
- **Military or classroom wording.** Beyond the edition switch and its note, the "Go further" section says "an essay about judgment in military education" and "The original essay, written for military education: The Irreducible Officer, Section V". The header "Essay" link also leads to the military essay without saying so. As provenance it's defensible, but it is military wording in the business edition. "Graders" is the study's own word and is fine. No other classroom wording.

## Fact check against Dell'Acqua et al. (2023), HBS working paper 24-013 (done after writing the read above)

**Access.** hbs.edu returned 403 for both the working-paper PDF and the item page the figure links to. Following the brief, I didn't try other copies of the PDF. The checks below rely on search-result text quoting the paper or the published Organization Science version, plus `sources/source-spine.md`. Anything I couldn't confirm that way is marked.

| Claim on the page | Status |
|---|---|
| 758 BCG consultants, about 7% of individual-contributor consultants | Supported |
| Split 385 (inside the frontier) / 373 (outside) | Supported (secondary summaries of the paper) |
| Three conditions: no AI, GPT-4, GPT-4 plus a prompt-engineering overview | Supported |
| Inside the frontier: 18 product-development tasks for a fictional footwear company, including segmenting the market by users | Supported |
| 12.2% more tasks, 25.1% faster, more than 40% higher quality | Supported (abstract) |
| Outside the frontier: right 84.5% without AI, 70.6% with GPT-4, 60% with GPT-4 plus the overview | Supported, including which number belongs to which group. The drops are 13.9 and 24.5 points, and one summary of the paper gives exactly those. One summary prints the control as 84.4%; the spine and most sources say 84.5%. |
| "19 percentage points less likely to produce correct solutions", pooled | Supported (abstract) |
| The gap between the two AI groups is significant only at the 10% level | Supported (a summary of the published version: "significant at the ten per cent level in every specification") |
| Graders rated the AI users' recommendations higher in quality "regardless of the correctness of their answer" | The finding is supported: quality was higher with AI in both the correct and the incorrect subgroups. I couldn't confirm the exact quote or its page (p. 15) myself. |
| The higher rating among wrong answers alone is significant only at the 10% level | Not verified by me. Plausible; it should be checked against the PDF. |
| Variability quote ("a marked reduction in the variability of these ideas…", p. 12) | Not verified by me: search found no copy of that wording. The finding matches the paper as I remember it, but the quote and page need checking against the PDF. |
| Task B: three-brand clothing company; spreadsheet of financials plus insider interviews; the spreadsheet looked complete but the interviews held the deciding details; designed so GPT-4 would get it wrong | Supported in substance. Summaries describe a task "deliberately" built so AI would fail, needing the spreadsheet and the interviews read together, with interview details that "overturned what the numbers suggested". |
| "GPT-4 alone" (bar label) | The study calls the group "GPT Only": consultants who had GPT-4 without the overview. The number is correct; the label invites the reading "the AI by itself" (problem 2). |

**What the fact check changes in my read.**
- None of the on-stage numbers is wrong or unsupported. Every number on the stage is in the source spine and matches the paper as reported.
- Problem 3 holds. Summaries describe Task B as an analysis task built to defeat the AI: consultants could give GPT-4 the spreadsheet and the interviews, and the AI groups still did worse. The study's failure wasn't a matter of facts the AI couldn't see. So the closing rule, "Facts the AI couldn't see would move the check", is the figure's own extension. It fits Task A (customer data the AI never had), but it shouldn't read as the lesson of Task B.
- The page already cites the two 10%-level caveats in its Evidence text. The stage shows neither: the bars and "Rated higher in quality, right or wrong" carry no qualifier.
- Before publishing, check two items against the PDF: the p. 12 variability quote and the 10% significance of the wrong-answers-only quality result.
