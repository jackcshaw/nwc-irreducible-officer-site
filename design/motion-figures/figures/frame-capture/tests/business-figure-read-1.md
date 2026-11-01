# Cold read: frame capture, business edition, figure, round 1

**Reader:** a first-time viewer, read as a manager or analyst at a company or nonprofit (not an educator). I have not read the essay, the storyboards, the other tests, the shots, `BUSINESS-EXAMPLES.md` or `EDITIONS-PLAN.md`.
**Material:** `figures/frame-capture/index.html?edition=business`, served locally on port 5263.
**Method:** Playwright (Chromium) at 1280×900, 1280×720 and 390×844. I scrolled the shot and controls fully into view so the figure autoplayed from 0:00, then took a viewport screenshot every 0.5 s across the whole 1:29 run (182 frames per viewport). I also logged every caption change with its timestamp every 50 ms, and checked `?reduced`, `prefers-reduced-motion`, `?t=` holds, keyboard access, and horizontal overflow at 390 px.

Before playback, the figure sits paused on a poster frame at 0:16 (beat 2). Once the shot is fully in view it restarts from 0:00 and plays. Caption timing was the same at all three viewports (within 0.15 s).

| Beat | Caption on screen (s) | Words |
|---|---|---|
| 0 name card | 0:00–0:03 | — |
| 1 | 0:03–0:09 | 7 |
| 2 | 0:09–0:17 | 13 |
| 3 | 0:17–0:26 | 11 |
| 4 | 0:26–0:34 | 11 |
| 5 | 0:34–0:41 | 10 |
| 6 | 0:41–0:48 | 10 |
| 7 | 0:48–0:58 | 14 |
| 8 | 0:58–1:07 | 14 |
| 9 | 1:07–1:14 | 10 |
| 10 | 1:14–1:22 | 11 |
| Final | 1:22 → held | definition + 3 questions |

Every caption is short enough to read in 3–4 s, so none of the captions is rushed. The problems are with the movements packed under some captions (beats 3, 7 and 8).

## 1. Beat by beat (desktop, 1280×900; differences at the other sizes noted)

**0. Name card (0:00–0:03).** "Failure mode 1 of 7 / Frame capture" in large type, then it shrinks into the top-left corner. Clear. "Failure mode 1 of 7" tells me this belongs to a series.

**1. "An analyst gets an open care-program task." (0:03–0:09).** A task card appears top right: "Example task: Which patients need the most help from the program?" A red dot labelled Analyst appears on the left. Plenty of time. I read the red dot as "the person" straight away.

**2. "Many things could matter. Framing means picking which ones define the problem." (0:09–0:17).** Six dashed chips fade in one at a time between 0:09.5 and 0:12 (chronic illness, next year's costs, avoidable visits, program budget, access to care, who it can help), three above an empty middle and three below. Then a 5 s hold. Easy to follow. The empty middle space reads as "the problem, not yet defined".

**3. "The analyst asks an AI. It proposes a reasonable, narrower frame." (0:17–0:26).** Four movements in nine seconds:
- 0:18–0:19: grey corner brackets labelled "AI's frame" snap around the empty middle.
- 0:20–0:21: a grey copy of the task question flies out of the task card into the brackets. For about half a second it overprints the "Avoidable visits" chip and the task card's own text (frame at 0:21 is a jumble of two overlapping questions).
- 0:21–0:22: "need" and "help from the program" drop out and "cost" drops in, so it reads "Which patients cost the most?"
- 0:23–0:24: "Next year's costs" and "Program budget" slide from their places into the brackets as tinted headings.

This is the most important moment in the figure, and the word swap takes about a second. I caught it because I had already finished reading the caption by 0:21, but a viewer who looks away for a moment will miss how "need" became "cost". There is no AI character: the AI exists only as the grey brackets, which is enough. The red dot's "pulse" did not register at 0.5 s sampling.

**4. "The analyst takes up the frame. Up close, it's all they see." (0:26–0:34).** The dot moves into the brackets and its "Analyst" label disappears. At 0:28–0:29 the view zooms in until the bracketed frame fills the stage, and the other four chips go off-screen. From 0:30 the dot draws lines in two columns under the two tinted headings, and a red label reads "Analyst's draft 1". The picture matches "it's all they see" well: the zoom is the idea. From about 0:32 to 0:34 nothing moves.

One ambiguity: the "ranking" is two columns of lines headed "Next year's costs" and "Program budget". As an analyst I expect a ranking of patients to be one ordered list with a score and a cut-off. I couldn't tell what a "Program budget" column of patients would be. The phone view's text describes it as "a ranked list, a chart and a cut-off", which is clearer.

**5. "The analyst revises twice, adding evidence and a firmer cut-off." (0:34–0:41).** Draft 2 at 0:35 (rows straightened, red change bar in the left margin). Draft 3 by 0:37: a small bar chart with its own red bar, then a long cut-off line drawn across the bottom from 0:38 to 0:39. The label updates 1 → 2 → 3. Followable. The red change bars are a nice touch: I could see the work getting better.

**6. "Step back with us: every revision stayed inside the AI's frame." (0:41–0:48).** At 0:42–0:43 the view pulls back to the full scene. Four dashed chips sit where they were, outside the brackets; every red mark is inside. This is the clearest beat in the figure. I couldn't find the analyst, though: the dot is now the red endpoint of the cut-off line and has no label, so I read it as part of the chart rather than as the person. At 390 px this beat adds a line, "The four dashed ones were never weighed", which is clearer than the desktop picture alone.

**7. "The manager receives the final ranking. Nothing shows the frame came from the AI." (0:48–0:58).** The busiest beat:
- 0:49–0:50: a clean copy lifts off the draft (half a second of double image), and the view pans right.
- 0:50–0:51: the copy arrives centre stage, still in grey brackets, under "What the manager receives: the final ranking". Its red change bars have gone.
- 0:51: a small grey key appears, "AI-supplied", pointing at the tinted title and headings.
- 0:53–0:54: a vertical wipe crosses the ranking, and the title and headings turn the same dark ink as everything else.
- 0:54–0:55: the brackets and key fade.
- 0:55–0:56: the ranking moves to the top left under "What the manager receives / From this analyst".

The caption and picture disagree for the first five seconds. The caption says "Nothing shows the frame came from the AI" from 0:48, while the picture shows tinted headings and an "AI-supplied" key until 0:53. I read the caption, looked up, and saw a label saying the opposite. The wipe resolves this, and once I worked it out I liked the before-and-after. But the key is about 11 px of grey monospace (about 10 px at 1280×720) and is on screen for about 3 s. The change it explains is subtle too: tinted beige becoming dark ink. A viewer who misses the key won't know what the wipe removed. The caption arrives five seconds before the picture does what it says.

**8. "A second analyst, also using AI, weighs all six and keeps cost, for now." (0:58–1:07).**
- 0:59: the first ranking's label becomes "First analyst", and a second red dot labelled "Second analyst" appears lower centre.
- 1:00–1:01: the same grey "AI's frame" appears around the same two chips, with the other four in a 2×2 grid underneath (smaller than before).
- 1:01–1:03.5: the dot hops chip to chip, about 0.4 s each, and each turns solid with a tiny red corner dot. The "Second analyst" label vanishes as soon as the dot starts moving.
- 1:04: the brackets turn red and read "Chosen". The two chosen chips lose their AI tint.
- 1:05: "Set aside" appears under the four.
- 1:05.5: "Would change it: If some patients cost less because they get less care" appears in small red italics.

The weighing itself is readable as "looked at each one". The problem is timing. "Would change it" is the single most important line in the figure, and it lands 1.5 s before the caption changes. It then stays visible for about four more seconds, while a new caption arrives and a second ranking is drawn on top of the scene. I had to pause to read it the first time. It does come back in the final frame. The tint dropping off the chosen chips (AI's suggestion becoming the analyst's own) is a good idea, but too subtle to notice live.

**9. "That analyst writes the same ranking; the weighing doesn't show." (1:07–1:14).** From 1:08 to 1:10 a second ranking is drawn beside the first, identical, labelled "Second analyst". At 1:10.5–1:11 the weighing slides up behind it and disappears. For about half a second "Set aside / Would change it / If some patients cost less…" hangs alone under the second ranking after the chips have gone, which slightly undercuts "doesn't show". Otherwise clear: two identical deliverables.

**10. "Ask each analyst why this frame. One knows what would change it." (1:14–1:22).** At 1:15, "The manager asks each analyst: Why this frame?" appears at right, under the task card. Three seconds later (1:18–1:19) the backing slides down from under each ranking. Under the first: grey "AI's frame" with the red dot inside and the two tinted chips. Under the second: red "Chosen" with the two chips, the four set aside, and the would-change note. There are 3 s to compare the two before the final caption arrives, but the picture stays, so that's fine. This is the payoff, and for a manager it lands: this is exactly the question I'd ask in a review.

**Final (1:22 →).** The caption band becomes: "Frame capture — The first plausible frame becomes the working frame, unexamined. / Reviewer's check — What problem did the analyst choose to solve?" At 1:23 a source line appears under the picture: "Illustration based on Obermeyer et al., Science (2019)." At 1:26 the second check line arrives: "Why this frame? What would change it?" At 1:29 the button becomes Replay and the frame holds.

**At 1280×720** everything is identical but scaled down. Chip labels, "First/Second analyst", the "AI-supplied" key and the would-change note render at roughly 10–12 px. Readable on a laptop, but this is the small end.

**At 390×844** the picture is replaced by a stacked text view on the same clock (13–16 px text, no motion graphics). It reads well and in places is clearer than the desktop (it spells out "The four dashed ones were never weighed" and "The weighing doesn't show in either ranking"). Differences that matter:
- the "Analyst" marker disappears at beat 3, the moment the caption mentions the analyst;
- **the Example task card disappears at beat 8 (0:58) and isn't in the final view**, so on a phone the final frame loses the "need" vs "cost the most?" contrast;
- the would-change note is worded differently ("Would change it: if low cost reflects less care");
- the source line sits under the controls. With the shot and controls in view (804 px of an 844 px screen) it is just off the bottom.

## 2. The point, in one sentence

An AI can hand you a reasonable-sounding definition of the problem, and once you build on it the finished deliverable looks exactly the same whether you chose that definition or inherited it, so the only way a manager can tell is to ask "why this frame, and what would change it?"

## 3. The question to ask afterwards (as a manager)

"Before we look at the ranking: what else could 'most need' have meant, why did you settle on cost, what would tell you cost is the wrong measure, and have you checked?"

## 4. The final frame alone

Mostly yes, on desktop. Read top to bottom:
- two identical rankings titled "Which patients cost the most?";
- the task card next to them asking "Which patients need the most help?";
- "The manager asks each analyst: Why this frame?";
- under one ranking a grey "AI's frame" with the analyst inside it, under the other a red "Chosen" with four alternatives set aside and a written condition for changing course;
- the definition and the three check questions in large type.

It says: same output, different ownership; only the conversation reveals it. It works without the animation.

Two things it doesn't carry on its own:
- **The task/title mismatch.** It's in view, but nothing points to it. I only noticed "need" vs "cost" because I had watched the swap. A reader seeing only the still might not notice that both analysts answered a different question from the one asked.
- **What "AI's frame" grey vs "Chosen" red means.** Without the wipe in beat 7 and the colour change in beat 8, the still reads as "one analyst used the AI and the other didn't", even though the caption said both used AI.

On a phone, the final view lacks the task card entirely, so the first half of that contrast is gone.

## 5. Problems, ranked

1. **The figure can read as endorsing the second analyst's frame, and the real case says that frame was wrong (fairness/accuracy, high).** The "good" analyst keeps cost, ships a ranking identical to the first, and gets the red "Chosen" treatment. The figure ends there. Nobody checks the condition, and nothing shows what happens if it's true. The page text below the figure says the condition *is* what the study found. So in the real case both rankings would be equally wrong, and the second analyst's advantage is only that they are set up to catch it. The figure never says that. A manager could leave with "write down your assumption and you're fine" rather than "write it down, then test it before it ships". "For now" in the beat 8 caption is the only hedge, and it's easy to miss. Suggest one line or beat stating that the condition is checkable (for example, compare how sick patients are at the same cost score) and that in the real case it held.
2. **Beat 7: the caption contradicts the picture for 5 s (caption/picture mismatch, high).** "Nothing shows the frame came from the AI" appears at 0:48. The tint and the "AI-supplied" key stay visible until the wipe at 0:53–0:54. The key is tiny and grey and on screen for about 3 s. Either delay the second sentence of the caption until the wipe, or make the key larger and hold it longer.
3. **The would-change note is rushed live (too fast, medium-high).** It lands at 1:05.5, the caption changes at 1:07, and the second ranking is drawn over the scene from 1:08. It's the line that separates the two analysts, so it deserves its own hold before beat 9. (It does come back in beat 10 and the final frame.)
4. **The reframing in beat 3 is about one second, with a messy fly-out (too fast / ambiguous, medium).** The grey question overprints "Avoidable visits" and the task card at about 0:20–0:21. Then "need … help from the program" → "cost" happens in about 1 s, far from the task card. This is the moment a reader most needs to see, and it would land harder if it were slower, or if the task card's "need" lit up at the same time.
5. **On phones the task card vanishes at beat 8 and is missing from the final view (mobile, medium).** The stacked view loses the "need" vs "cost" contrast that the desktop final frame keeps. The phone version of the note ("if low cost reflects less care") also differs in wording from the desktop one.
6. **The ranking's two columns are confusing (ambiguous visual, medium-low).** A patient ranking with "Next year's costs" and "Program budget" as column heads doesn't look like any ranking I'd produce. One column with a cut-off at program capacity would read as "ranking" faster.
7. **The analyst gets lost in beats 6–7 (ambiguous visual, low).** After the zoom the dot has no label, and in the pull-back it sits at the end of the cut-off line like a chart marker. The same thing happens when the "Second analyst" label vanishes at 1:01.
8. **Edition leaks for a business reader (copy, low).**
   - The edition switcher reads "Workplace · PME", and a line above the figure says "PME: example from *The Irreducible Officer*…". I don't know what PME means.
   - The essay quote below talks about "the student" and "a theory of adversary behavior".
   - None of this breaks the figure, but it reminds me it wasn't written for me.
9. **Factual claims to source (page text, not the animation).** The source line under the figure is modest. The "study behind this example" section makes specific claims that I'd want sourced, and they aren't in the companion's source spine (see section 6):
   - the 97th-percentile enrolment cut-off;
   - 17.7% → 46.5%;
   - calibration across races;
   - the "reasonable" choice quote;
   - 7,758 / 84%.

   Also, the figure never mentions race, while the study is about racial bias. It says "some patients". The page text names Black and White patients, so this isn't hidden, but a reader who knows the study may feel the figure softens the stakes.

**Fair to AI?** Yes. The AI's frame is called "reasonable" and both analysts use AI; the failure is the analyst's, not the tool's. **Fair to analysts?** Mostly. The first analyst works hard and visibly improves the work, which is the right way to show the trap.

## 6. Mechanical checks

- **Reduced motion:** both `?reduced` and the `prefers-reduced-motion: reduce` media setting open on the final frame (1:29, Play button) with the full text: definition, all three check questions, and the source line. At 390 px the reduced view shows the stacked final view with full text, but without the task card (see problem 5). Pass.
- **Horizontal scroll at 390 px:** none. `scrollWidth` = 390 at t = 0, 10, 20, 30, 45, 52, 60, 66, 72, 80 and 89 s, and during live playback. No element extends past the right edge. Pass.
- **Keyboard:**
  - Tab order after the header links and edition links is Play/Pause, then Restart, then the scrub slider, then each beat in the list (beats are buttons).
  - Enter and Space both toggle play/pause. Enter on Restart restarts.
  - On the scrub slider, the arrow keys move in 1 s steps (5× Right went from 0:01 to 0:06 and updated the caption). End jumps to 1:29 and the final caption, Home to 0:00.
  - The slider has `aria-label` "Scrub through the figure" and an `aria-valuetext` like "0:00 of 1:29, name card".
  - The focus ring is a visible 2 px navy outline.
  - Note: tabbing into the figure scrolls it into view, which starts autoplay.
  - Pass.
- **Numbers vs `nwc-irreducible-officer-companion/sources/source-spine.md`:**
  - The animation's numbers are all structural and need no source: "1 of 7", "1 / 11"…"10 / 11", drafts 1–3, "six".
  - The page's research numbers are **not in the source spine**: 97th percentile (p. 448), 17.7 → 46.5% (p. 447), "7758, an 84% reduction in bias" (p. 453), and the page cites Science 366 (2019): 447–453. The spine doesn't mention Obermeyer at all.
  - The essay check and the abstract check are in the addendum below.

## Addendum (written after the read): source checks

**Essay and source spine.** None of the study's numbers (97th percentile, 17.7, 46.5, 7758, 84%) or the name Obermeyer appear in `the-irreducible-officer.md`, `essays/*.md` or `sources/source-spine.md` in the companion repo. The only repo source I found is `nwc-irreducible-officer-companion-business/sources/business-edition-research.md` §3.3. It verifies the citation and the Science editor's summary ("Bias occurs because the algorithm uses health costs as a proxy for health needs"), but it doesn't record any of the page's numbers or page-cited quotes. So the mechanical check "every number found in the source spine or essay" **fails for the evidence section**. The animation itself has no research numbers.

**Against the PubMed abstract** (PMID 31649194; *Science* 2019 Oct 25; 366(6464): 447–453; Obermeyer, Powers, Vogeli, Mullainathan; retrieved verbatim via NCBI E-utilities):

| Page claim | Abstract | Verdict |
|---|---|---|
| Citation: authors, title, *Science* 366 (2019): 447–453 | Same | Match |
| "At a given risk score, Black patients are considerably sicker than White patients, as evidenced by signs of uncontrolled illnesses. Remedying this disparity would increase the percentage of Black patients receiving additional help from 17.7 to 46.5%" (abstract, p. 447) | Verbatim in abstract | Match |
| "The bias arises because the algorithm predicts health care costs rather than illness, but unequal access to care means that we spend less money caring for Black patients than for White patients" (abstract, p. 447) | Verbatim in abstract | Match |
| "A widely used commercial algorithm ranked patients for 'high-risk care management' programs" | Abstract: "commercial prediction algorithms to identify and help patients with complex health needs… a widely used algorithm… affecting millions of patients" | Consistent; the quoted phrase "high-risk care management" isn't in the abstract |
| "It was a prediction model. No generative AI was involved." | "commercial prediction algorithms" | Consistent |
| Cost predictions "well calibrated across races" (p. 449) | "despite health care cost appearing to be an effective proxy for health by some measures of predictive accuracy, large racial biases arise" | Consistent in spirit; exact quote not checkable from abstract |
| 97th-percentile auto-enrolment (p. 448); "reasonable" / "by no means the only reasonable choice" (pp. 450–451); "7758, an 84% reduction in bias" (p. 453) | Not in abstract | **Not verifiable from the abstract.** Press coverage (PBS NOVA, PBS NewsHour) corroborates an "84% reduction in bias" and missed conditions dropping to "fewer than 8,000", but the page numbers and exact wording need a check against the full paper |
| Figure's condition, "If some patients cost less because they get less care" (phone: "if low cost reflects less care"), and the page's "That is the condition the study found, by checking illness against cost for Black and White patients at the same score" | "At a given risk score, Black patients are considerably sicker… unequal access to care means that we spend less money caring for Black patients" | Substantively consistent. Small wording issue: the study compared *illness at the same risk score*. "Checking illness against cost… at the same score" compresses two separate analyses (illness at the same score, and cost at the same score) and could be read as one. Suggest "by comparing how sick Black and White patients were at the same risk score". |

**No outright mismatches with the abstract.** Two framing notes:
1. The abstract's headline is *racial* bias. The figure says only "some patients", so a figure-only viewer won't learn who was underserved. The page text does name Black and White patients.
2. The abstract's conclusion ("the choice of convenient, seemingly effective proxies for ground truth can be an important source of algorithmic bias") is a good fit for the figure, but it describes a model-design choice, not a person accepting an AI assistant's suggestion. The page says so plainly ("No generative AI was involved"), and the setup says the analysts and AI are constructed. The figure's source line "Illustration based on…" is fine on this page. If the figure is ever shown without the page text, that line alone could suggest the study was about AI assistants.

Sources: PubMed abstract, https://pubmed.ncbi.nlm.nih.gov/31649194/ ; PBS NOVA, https://www.pbs.org/wgbh/nova/article/racial-bias-medical-algorithm-black-patients ; PBS NewsHour, https://www.pbs.org/newshour/health/widely-used-algorithm-for-follow-up-care-in-hospitals-is-racially-biased-study-finds
