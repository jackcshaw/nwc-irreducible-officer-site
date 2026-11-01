# Premature synthesis, business edition: figure cold read, round 2

Reader stance: an engineering manager at a mid-size company (and, for a second pass, a program manager at a nonprofit who doesn't code). I hadn't seen the essay, the storyboards or earlier tests.

Material: `figures/premature-synthesis/index.html?edition=business`, served locally on port 5243. Autoplay was triggered by scrolling the shot into view. I captured a frame every 0.5 s across the whole 1:33 run at 1280×900 (192 frames), 1280×720 (191) and 390×844 (192), read the contact sheets in order, and held key moments with `?t=`. The headless clock drifted by under 1 s over the run, so the timings below are close to real speed.

## 1. Beat by beat

| Beat | Caption (on screen) | What I saw | What I took it to mean |
|---|---|---|---|
| 0 (0–2.5 s) | (none) | "Failure mode 3 of 7 / Premature synthesis" large, then it moves to the top-left corner. | Title card. No definition here; the paragraph above the figure carries it. |
| 1 (3–10 s) | "An engineer must build a feature with a new library." | Example-task card at top right, a red dot labelled Engineer, then six numbered doc-section cards appear one by one (Retry on error, Task groups, Timeouts, Error handling, Fetching records, Channels). | Clear. Seven seconds for a nine-word caption: no rush. The first 2 s are an almost empty stage. |
| 2 (10–19 s) | "The engineer reads the docs closely, then has an AI write the code." | The dot visits each card and note lines appear under each title. Then five dashed grey lines labelled "AI CODE" appear at once (1–4, 4–6, 3–4, 3–5, 2–5). | Clear and fair. The engineer really does read, and the AI's connections arrive all at once, which shows "the model connects the material" well. |
| 3 (19–28 s) | "The code runs, and the engineer ships it." | The dot runs along each dashed line and each one turns solid. A write-up appears on the left: "First engineer's code", titled "Fetch all three records in one task group.", with rows tagged "MAIN · 2 · 5", "3 · 4 · 5", "1 · 4 · 6" and "AI HELPED WITH THE CODE". Line 2–5 thickens as the title appears. | Mostly clear. **Ambiguous visual:** the dot tracing every line could just as easily read as the engineer *reviewing* the AI's code line by line, the opposite of "takes it as written". The text summary says "asks no questions about it", but the picture doesn't show that. "MAIN" wasn't clear to me until beat 8 named "the main connection". The "code" looks like a prose document with citations, which reads more like a PR description than code, though I followed it. |
| 4 (28–40 s) | "A second engineer, with the same docs and time, asks the AI only how it works, then writes the code." | The first engineer's lines leave and a second dot visits every card the same way. A red question appears, "How does cancellation work?", with a grey AI answer: "AI: in a task group, one error cancels all the other tasks." The dot draws three red lines (2–5, 3–5, 4–6). | Clear. Twelve seconds for a nineteen-word caption is enough. The second engineer reads the docs exactly as the first did, which matters for fairness. |
| 5 (40–49 s) | "One part breaks. That engineer finds the bug and fixes it alone." | A fourth red line, 1–2, gets a red ✕ and the note "Bug: when one fetch failed, the group canceled the rest." The line pulls back, then the fixes 1–4 and 3–4 are drawn. The final red map has the same five connections as the AI's. | Clear in outline. Nothing on the desktop picture says *why* 1–4 and 3–4 are the fix (the phone view adds "Each fetch handles its own errors (1–4), and a timeout counts as an error (3–4)"). An engineer can infer it; a non-engineer can't. |
| 6 (49–56 s) | "That engineer ships the same code, in the same time." | A second write-up slides in under the first, with the same title, tags and "AI HELPED WITH THE CODE". The cards leave and "What the tech lead reviews · The same code" appears. | Clear, and the strongest beat for a manager: from the outside, the two PRs look identical, disclosure line included. Small nit: the second card's lines differ slightly in length beside a label saying "the same code". I read that as "equivalent code", but a literal reader might notice it. |
| 7 (56–65 s) | "With the code closed, both engineers sketch the same connections." | The write-ups shrink into a strip at the top ("Both say AI helped"). "In review, code closed: Sketch how the pieces connect." Row labels: "First engineer: READ → AI WRITES → SHIPS" and "Second engineer: READ → ASKS AI → TRIES → FIXES". Each dot draws the same six-node, five-line sketch in the same ink. | Clear. The sketch nodes are numbers only: the section names are gone from here to the end. A "code closed" whiteboard sketch is a little staged for real code review, but believable as a design-review habit. |
| 8 (65–76 s) | "The tech lead asks what would make the main connection fail." | "Then the tech lead asks: The task group and the fetches, 2–5: what would make that fail?" Line 2–5 is ringed on both sketches. The first engineer's bubble types out: "The docs say one failure cancels the group. I'm not sure that applies here." | Clear, and the question rescues the number-only sketch by naming 2–5. The answer finishes typing about 2 s before the caption changes, but it stays on screen, so nothing is lost. |
| 9 (76–86.6 s) | "The second engineer applies the rule, from the bug they fixed." | Nothing new for about 3.5 s. Then "WHAT THEY LEARNED: ✕ When one fetch failed, the group canceled the rest." appears in red, and the second bubble types: "An error one fetch doesn't catch. The group then cancels the other two." | Clear, but **the caption runs ahead of the picture**: for 3.5 s I was looking for the second engineer's answer and found nothing. "An error one fetch doesn't catch." is a fragment, and I stumbled over it once ("an error that one fetch doesn't catch" reads cleanly). |
| 10 (86.6 s to end) | "PREMATURE SYNTHESIS: The model connects the material before anyone has built the map. / REVIEWER'S CHECK: Can they say why these connections matter? Point to one: what would make it fail?" | The source appears bottom-left: "Illustration based on Shen & Tamkin, Anthropic (2026)." Everything else stays. | Clear. The final caption arrives about 1.5 s after the second answer finishes typing, so my eye had to leave the answer early, but the frame then holds. |

No caption changed before I could read it, at any size. The tightest moments are the two answer handoffs (beats 8→9 and 9→10). They're fine because the answers persist.

## 2. The point (my words)

Two engineers can ship the same AI-assisted code and even redraw the same design, but only the one who worked out the connections themselves (and broke one) can tell you what would make a given connection fail. Reviewing the artifact, or the "AI helped" label, won't tell you which engineer you have.

## 3. The question a manager should ask afterwards

"Pick one connection in what you shipped: what would make it fail, and what breaks downstream if it does?" Ask it before you approve the PR, not after the incident.

## 4. The final frame alone

At 1280 wide it mostly carries the idea without the animation. The two process rows (READ → AI WRITES → SHIPS versus READ → ASKS AI → TRIES → FIXES), the identical sketches, the ringed 2–5, the two answers and the red "What they learned" note tell the story in one glance, and the tech lead's question decodes "2–5" in words. What's lost: the six section names (the nodes are bare numbers), the bug itself, and, at 1280×720, the titles on the two code thumbnails (they render at about 9 px and in practice vanish). One snag for a careful reader: the definition says the model connects the material "before anyone has built the map", yet the frame shows both engineers holding the same map. I understood "built" versus "redrew" after a moment, but I had to stop on it.

At 390 the stacked text frame keeps the process rows, the question, both answers and the note, but drops the sketches, so "they drew the same thing" is gone from the end state. The source line sits under the controls, below the fold.

## 5. Problems, ranked

1. **"Built the map" versus two identical maps (possible confusion, final frame).** The closing definition talks about building the map while the picture shows both engineers redrawing it identically. A reader can take "both have the map" as undercutting the definition. Wording such as "before anyone has built the connections themselves", or tying "built" to the bug, would close the gap.
2. **Beat 3's dot tracing the AI's lines reads as reviewing the code (ambiguous visual).** If the first engineer visibly walks every line, a skeptical engineer will ask why they can't answer the question, or will read the figure as "even reviewing AI code doesn't help", which is a stronger claim than the caption makes. The text view's "takes the code as written and asks no questions" isn't on the picture.
3. **Caption 9 arrives about 3.5 s before anything in the picture changes (caption ahead of picture).** It's minor, but it's the payoff beat.
4. **Is "same time" a second difference? Not an unfair one, but the screen time says otherwise.** The second engineer's route takes about 28 s of screen time to the first's 18 s, and visibly involves more steps (ask, try, break, fix). The caption asserts "in the same time". The picture makes the second engineer look like they spent longer or worked harder. Effort *is* the mechanism, so that's honest, but a skeptic will ask where the first engineer's spare time went. See also the study check below on who was faster.
5. **The figure is generous to the first engineer compared with the study (fairness, in the AI-user's favour).** In the figure, the delegator reads the docs closely, ships correct code, sketches the full design and recalls the rule from the docs. The study section on the page says delegators averaged under 40%. That generosity avoids a straw man, but it also implies the gap is only in the failure question, where the study reports gaps across the quiz (largest on debugging).
6. **The desktop picture never explains the fix (non-engineers).** 1–4 and 3–4 appear without the phone view's one-line reason.
7. **Wording nits.** "MAIN" is unexplained until beat 8. "An error one fetch doesn't catch." is a fragment. The code is drawn as a titled prose document with citations, an odd fit for engineers but fine.
8. **Factual claims I'd want sourced or checked** (checked afterwards, below): the sample description ("most of them professional or freelance programmers: 29 had seven or more years…") conflicts with the companion's source spine, which calls the participants "mostly junior engineers". Also to check: the 35-minute limit, the "missing-record errors" task, the group sizes and averages, and the omission of the paper's other high-scoring patterns.

## 6. Mechanical checks

- **Reduced motion:** `?reduced` shows the final frame with the full check text at 1280×900 and at 390×844, at 1:33/1:33, with the source line present. Pass.
- **Horizontal scroll at 390 px:** none. `scrollWidth` was 390 at t = 0, 20, 40, 52, 62, 75 and 93, and throughout the full run. Pass.
- **Keyboard:** Tab order is brand → Essay → Practice → Workplace → PME → Play → Restart → scrub. Enter on Play started playback and a second Enter paused it. The scrub takes arrow keys (1 s) and Shift+arrow (5 s), and moved 1.2 → 8.2 s as expected. Focus ring: 2 px solid navy. Pass.
- **At 1280×720 the animated picture shows, not a text view** (`is-stacked` is false for the whole run). The stage is letterboxed to 1038×461. Smallest live labels are 11.1 px (section numbers, uppercase labels), section names 12.8 px, answers 13.7 px. The only text under 11 px is the shrunken code-thumbnail titles (9.1 px) from beat 7 on, which are decorative by then. Picture, caption band and controls all fit in 720. Autoplay fired at all three sizes once the shot was scrolled into view.
- **Contrast spot check:** the grey AI text (#5b564f on #f6f1e8) is about 6.5:1. Fine.
- **Numbers against `sources/source-spine.md`** (the essay was checked afterwards, below):
  - Found: 52 participants; 50% versus 67%; no significant speed gain; Brynjolfsson et al. as counter-evidence ("more than 5,000" agents; page says 5,172).
  - Not in the spine: 29/19/4 experience split, 35 minutes, two tasks, 27-point quiz, 17%, 2 grade points, d = 0.738, p = 0.01, group sizes 7/4/4, "65% or higher", "under 40%", "about an hour", "groups of two to seven", 5,172.
  - **Conflict:** spine says "52 mostly junior engineers"; page says most had seven or more years' experience.

## Also asked

- **Would a business or nonprofit reader see their own work?** An engineering manager or tech lead: yes, immediately. Two identical PRs, both with "AI helped" on them, and a review question that separates them is a scene I've lived. A nonprofit program manager or analyst: they'll follow the *shape* from the captions alone (one delegated, one asked and struggled, the reviewer probes a failure point), but every concrete detail is software. They'd have to do the transfer to "the grant report the AI drafted" themselves. Given the study is about coding, keeping it in software is the honest choice; a one-line non-engineering parallel on the page would help that second reader.
- **Would a non-engineer follow it?** The narrative, yes. The content of the two answers, only partly. "WHAT THEY LEARNED: When one fetch failed, the group canceled the rest." is the plain-language bridge, and it works. "Task group", "fetch" and "channels" stay opaque, and the fix lines are unexplained on desktop.
- **Is either engineer a straw man, or is there a second difference?** Neither is a straw man. Same docs, same close reading (both dots visit all six cards and get the same notes), same disclosure, same final code, same sketch, and the first engineer's answer is intelligent (they recall the rule). The only other difference is effort and struggle, which is the mechanism rather than a confound. The tension is "same time": the picture shows the second engineer doing visibly more, and the caption asserts equal time (see problem 4). The AI isn't strawmanned either: its code runs, its connections are correct, and its explanation is right.
- **Does it match the research on which uses went with good and poor learning?** Going by the page's own study section: first engineer = AI Delegation (low), second = Conceptual Inquiry (high, many errors, resolved independently). The figure matches those two descriptions. My concern before checking the paper: the page names only three patterns, so a reader could conclude that "AI writes the code" is the problem in itself. If the paper also found high scores for people who had the AI generate code *and then* asked questions to understand it, the figure should say the first engineer's problem is not engaging, not that the AI wrote code. (Checked below.)
- **Is the source line clear, without overclaiming?** Mostly. "Illustration based on Shen & Tamkin, Anthropic (2026)" sits on the frame, and the setup says "the engineers and the task are constructed". The study section says "the figure's review question is constructed; the study measured a quiz", which is good, but that disclaimer is far below the figure. "Anthropic (2026)" reads as if Anthropic is the publisher; it's an arXiv preprint by Anthropic researchers. That's minor.
- **Military or classroom wording?** None in the figure. On the page: the edition switch shows "PME" with no expansion in the business edition (the note only says "the example from the original essay"). The last link reads "The original essay, written for military education: The Irreducible Officer, Section II", which is clearly labelled, so fine. "Quiz" and "grade points" appear only inside the study description, quoting the paper. The meta description is business-specific ("A workplace example: two engineers ship the same code…").

## Fact check against the paper (done after writing the read above)

Sources read: Shen & Tamkin, "How AI Impacts Skill Formation", arXiv 2601.20245v2 (downloaded PDF); Anthropic's summary page, "How AI assistance impacts the formation of coding skills"; the essay, `the-irreducible-officer.md`; `sources/source-spine.md`. The QJE page for Brynjolfsson, Li & Raymond returned 403, and I didn't work around it.

### Supported by the paper

- **"52 developers recruited online, most of them professional or freelance programmers."** Supported: §5.2.1 ("recruited through a third party crowd-worker platform"; "work either as freelance or professional software developers"), and §7.1 ("participants in our study were professional or freelance programmers").
- **"29 had seven or more years of coding experience, 19 had four to six, and 4 had one to three."** Supported by Table 1 (treatment plus control: 14+15, 10+9, 2+2).
- **"a new asynchronous programming library", Trio.** Supported: the abstract's exact phrase, and §4.1.
- **"up to 35 minutes for two short tasks, one of them a function that handles missing-record errors, then took a quiz."** Supported: §4.3 ("a maximum of 35 minutes to complete two coding tasks") and §4.1 ("a record retrieval function that can handle missing record errors"). The quiz had 14 questions for 27 points.
- **"For a 27-point quiz, this translates into a 17% score difference or 2 grade points" (d = 0.738, p = 0.01).** Verbatim from §5.2.2.
- **"50% with AI and about 67% by hand", from Anthropic's summary.** Matches the summary, which gives 67% without "about".
- **"The AI did not make them significantly faster."** Supported (§5.2.2; the summary says about two minutes faster, not significant).
- **Debugging gap**, with "exploratory data analysis (not pre-registered)" and "encountered more errors during the task and became more capable at debugging". Verbatim, §5.2.2. The largest gap was on debugging and the smallest on code reading.
- **Conceptual Inquiry, n = 7, quote verbatim.** The group's average was 65% (Figure 11). The page says "65% or higher", which is really the paper's threshold for all high-scoring clusters. Loose, but not wrong.
- **AI Delegation, n = 4, quote verbatim, "under 40%".** The average was 39%.
- **Iterative AI Debugging, n = 4, quote verbatim, "scored poorly".** The average was 24%, the lowest of the six.
- **Limits.** "About an hour" matches (average 58.5 minutes, maximum 1 h 15; §7.1 says "a one-hour period"). "Groups of two to seven" is correct, but the n = 2 and n = 3 groups are never named on the page. The incentive quote is verbatim (§7.1).

### Unsupported, at odds with the paper, or missing

1. **The page leaves out the highest-scoring pattern, and that changes what the figure seems to say about AI writing code.** The paper names six patterns. The top scorer was **Generation-Then-Comprehension (n = 2, 86%)**: these participants had the AI generate the code, then asked follow-up questions to understand it. The paper says this approach "looks nearly the same as the AI delegation group, but additionally uses AI to check their own understanding." **Hybrid Code-Explanation (n = 3, 68%)** also had the AI write code, with explanations. The discussion section draws the line at cognitive engagement: high scorers "only asked AI conceptual questions instead of code generation *or asked for explanations to accompany generated code*." The page's setup ("One has an AI write the code; the other asks the AI only how things work … The first route is premature synthesis") and caption 2 ("then has an AI write the code") invite the reading that AI-written code is the problem in itself. The first engineer matches AI Delegation only because they *also ask nothing about the code*, and that appears only in the text summary, not on the picture (see problem 2 above). Suggested fix: put "and asks nothing about it" in caption 2 or 3 and in the setup, and name Generation-Then-Comprehension in the study section.
2. **"That engineer ships the same code, in the same time" (caption 6) isn't what the study found.** AI Delegation "completed the task the fastest" (19.5 min on average). Conceptual Inquiry took 22 min, "second fastest overall", and the control group 23 min. The *same time limit* (35 min) is supported, and so is the setup's "the same time to build". Equal completion time is not. "Within the same time limit" would be accurate.
3. **"Both sketch the same connections" is construction, and it's generous to the delegator.** The paper reports lower AI-group scores on conceptual, code-reading and debugging questions (debugging largest, code reading smallest), and delegators averaged 39%. The page says "the figure's review question is constructed", but that disclaimer doesn't cover the equal-sketch outcome, which implies no gap in structural understanding.
4. **Sample description: the page is right, and the companion's own sources are wrong.** Anthropic's summary says "52 (mostly junior) software engineers", and `sources/source-spine.md` repeats "52 mostly junior engineers". The paper's Table 1 shows 29 of 52 with seven or more years of coding experience, described as professional or freelance programmers. The page follows the paper. The spine should be corrected, and if the summary is cited for anything, the page shouldn't inherit "mostly junior".
5. **Not on the page, and worth knowing:** the study's assistant was GPT-4o (§4.1), not Claude. "Anthropic's study" is accurate (Anthropic researchers ran it). Nothing on the page claims otherwise.
6. **Brynjolfsson, Li & Raymond, 5,172 agents and "evidence that AI assistance facilitates worker learning": not verified this session (QJE returned 403).** The spine has the quote and "more than 5,000 customer-support agents" but not 5,172.

### Numbers against the spine and the essay

The essay contains none of the study's numbers. It confirms that premature synthesis is the third of its seven failure modes ("3 of 7"). Beyond 52, 50%/67% and "no significant speed gain", every study number on the page is missing from the spine, but each one checks out against the paper. The one conflict is the spine's "mostly junior".

### Revised ranking after checking

Top three:

1. The page leaves out Generation-Then-Comprehension, so "has an AI write the code" reads as the cause, where the paper points to not engaging with the code.
2. "Built the map" versus the two identical maps in the final frame.
3. Beat 3's line-tracing reads as the first engineer reviewing the code.

Then:

- Caption 6's "in the same time" (the study found delegators fastest).
- The source spine's "mostly junior".
