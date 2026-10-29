# Cold read: frame-capture figure, business edition, round 2

**Reader:** a manager/analyst at a company or nonprofit, first time on the page, no knowledge of the essay.
**Material:** `figures/frame-capture/index.html?edition=business`, served locally on port 5233.
**Method:** Playwright, real-time autoplay (figure scrolled fully into view), one frame every 0.5 s for the whole 1:34 run at 1280×900, 1280×720 and 390×844 (191 frames each, the clock kept pace with wall time). Caption text logged with each frame. Key moments held with `?t=` (17.5, 47.5, 78.5, 84). Checked `?reduced` and emulated `prefers-reduced-motion` at both widths, plus a keyboard pass. Times below are the figure's own clock.

Autoplay starts only once the stage and controls are fully in view (scrolling to 300 px didn't start it; 400 px did). Before that the stage shows a ghosted poster with the title over it.

---

## 1. Beat by beat (1280×900)

**0 · Nameplate (0–3 s).** "Failure mode 1 of 7 / Frame capture" large in the middle. At 2.5 s it shrinks into the top-left corner. The caption band stays empty until about 3 s. Calm start.

**1 · "An analyst gets an open care-program task." (3–7.5 s).** Task card at 4 s: "Example task: Which patients need the most help from the program?" Red dot labelled Analyst at 5 s, then a 2.5 s hold. Clear. As a manager I recognise the request straight away.

**2 · "Many things could matter. Framing means picking which ones define the problem." (7.5–13.5 s).** Six dashed chips arrive one at a time between 8.5 and 11 s: chronic illness, next year's costs, avoidable visits, program budget, access to care, who it can help. 2.5 s hold. Clear. They read like the candidate variables or criteria I'd list at kickoff. "Who it can help" is the vaguest of the six (I took it to mean who the program can actually help).

**3 · "The analyst asks an AI. It proposes a reasonable, narrower frame." (13.5–22.5 s).** Grey corner brackets labelled "AI's frame" appear at 15–16 s. At 17.5 s a grey copy of the task question flies across. For about half a second it lies on top of "Avoidable visits" and the task card, a jumble of overlapping text. Then "need" and "help from the program" fade, "cost" fades in, and it reads "Which patients cost the most?" (19 s). The chips "Next year's costs" and "Program budget" slide in at 20.5–21 s. This beat follows well: the word swap is the clearest moment in the piece. I did agree the cost frame looks reasonable, which seems to be the point. The AI itself is never drawn; the brackets just appear. I couldn't see the dot pulse in 0.5 s frames.

**4 · "The analyst takes up the frame. Up close, it's all they see." (22.5–30.5 s).** The dot steps inside at 24 s and its "Analyst" label disappears. The view zooms in at 25–26 s, and the dot draws two columns of grey lines labelled "Analyst's draft 1" (26.5–29 s). The zoom matches "all they see". The draft is abstract lines and nothing yet calls it a ranking, so here I read it as a generic draft.

**5 · "The analyst revises twice, adding evidence and a firmer cut-off." (30.5–37.5 s).** Draft 2 at 31 s: rows straightened, red change bars. Draft 3 at 34 s: a small bar chart, then a thick rule across both columns (34.5–35.5 s). Easy to follow. I knew the thick rule was a cut-off only because the caption said so.

**6 · "Step back with us: every revision stayed inside the AI's frame." (37.5–43 s).** The view pulls back at 39–40 s, then holds 3 s. Four dashed chips sit outside and every red mark is inside the brackets. Picture and caption match. Small snag: the analyst's dot now sits unlabelled at the right end of the cut-off line, and I read it as the line's endpoint, not the analyst.

**7 · "The manager receives the final ranking." (43–50.5 s).** A clean copy lifts off at 44 s. At 45 s the whole scene slides left in under a second, the only abrupt camera move in the piece. The ranking lands centre stage under "What the manager receives: the final ranking". An "AI-supplied" key appears at 46.5–47 s. At 48–49 s a wipe crosses the ranking and the tinted title and headings turn plain ink; brackets and key fade by 50.5 s. I got it, but only just: the key is readable for about 1–1.5 s before the wipe starts draining what it labels. The manager is never drawn; "the manager's side" is just a label.

**8 · "Nothing in it shows the frame came from the AI." (50.5–55 s).** The ranking moves top-left, now labelled "What the manager receives / From this analyst". It's the shortest beat (4.5 s), but the caption is short and the move takes about 1 s. Fine. The picture shows what the caption says: no tint, nothing marks the AI.

**9 · "A second analyst, also using AI, weighs all six and keeps cost, for now." (55–68.5 s).** The label becomes "First analyst". A second red dot, "Second analyst", appears low and centre at 56 s, with smaller chips. Grey "AI's frame" brackets close around the two cost chips at 57.5 s. Between 58 and 61 s the dot touches each of the six, about half a second each, and each goes from dashed to solid. That change is subtle at this size and speed; the caption does the work. At 61.5 s the brackets turn red with the tag "Chosen". "Set aside" follows at 62 s, and at 62.5 s a red note: "Would change it: If some patients cost less because they get less care". Then a 6 s hold, plenty of time. The "Second analyst" label fades at 58 s, so during the hold the dot is unlabelled.

**10 · "That analyst writes the same ranking; the weighing doesn't show." (68.5–73.5 s).** The second dot writes its ranking at 69.5–71 s, labelled "Second analyst" at 71.5 s. At 72–72.5 s the weighing slides up behind it and disappears. Two identical rankings sit side by side for about a second before the caption changes. The idea lands ("you can't tell them apart"), but the moment is short.

**11 · "Ask each analyst why this frame. One knows what would change it." (73.5–80 s).** "The manager asks each analyst / Why this frame?" fades in at 74.5–75 s. **Then nothing moves for about 3 s.** At 78–78.5 s, what each ranking rests on slides into view: under the first, only the grey AI's frame around two chips; under the second, the red "Chosen" frame with the four set aside and the would-change-it note. The caption changes at 80.0 s, which leaves about 1.5 s to compare the two reveals. That comparison is the payoff of "One knows what would change it", and it arrives at the tail of the beat.

**12 · "The second analyst checks it: at the same predicted cost, some patients are sicker. The frame changes." (80–88.5 s).** Too much happens in about 4.5 s, in four different parts of the stage:
- 80.5 s: "What would change it?" appears under "Why this frame?" (right column).
- 81–82 s: a red panel, "The check / Patients at the same predicted cost:", with a short bar "fewer illnesses" and a long bar "more illnesses" (right column).
- 82.5 s: "Some are sicker. The condition holds." (right column).
- 83.5 s: "Nothing to check" under the first analyst's frame (left).
- 83.5–84 s: in the second frame, chronic illness swaps places with next year's costs (middle).
- 84.5–85 s: the second ranking is rewritten with red change bars under a new title, "Which patients are sickest?" (top).

Then a 3.5 s hold. I couldn't take this in at real speed. I scrubbed back twice to see what changed where. "The condition holds" stopped me: which condition? It points back to the red note from 20 seconds earlier. The bars also puzzled me. They show illness, but "the same predicted cost" is never drawn, so the one comparison the caption names exists only in words.

**13 · Ending (88.5 s to end).** The caption band switches to "Frame capture: The first plausible frame becomes the working frame, unexamined. / Reviewer's check: What problem did the analyst choose to solve?" and, at 92 s, "Why this frame? What would change it?". "Illustration based on Obermeyer et al., Science (2019)." appears at the stage's bottom left at 89.5 s, small and italic. The button becomes "Replay". The ending text stays up, so reading time isn't an issue here.

### Caption pacing (same at all three sizes)

| Beat | On screen | Words | Comment |
|---|---|---|---|
| 1 | 4.5 s visible | 7 | fine |
| 2 | 6.0 s | 12 | fine |
| 3 | 9.0 s | 11 | fine |
| 4 | 8.0 s | 12 | fine |
| 5 | 7.0 s | 10 | fine |
| 6 | 5.5 s | 11 | fine; the zoom-out lands 1.5 s in |
| 7 | 7.5 s | 6 | the caption is easy; the picture is tight (key to wipe in about 1 s) |
| 8 | 4.5 s | 10 | short but fine |
| 9 | 13.5 s | 14 | generous |
| 10 | 5.0 s | 10 | readable; the "identical" view lasts about 1 s |
| 11 | 6.5 s | 12 | readable; the reveal comes 1.5 s before the end |
| 12 | 8.5 s | 17 | caption readable, picture overloaded |
| 13 | holds | 25 | ends on it |

No caption changed before I could read it. The problems are in the picture: movements in beats 11 and 12, and briefly in beat 7, compete with or outrun the caption.

### 1280×720

The stage letterboxes to 461 px tall and the whole picture shrinks: the smallest picture text measures 11.1 px, against 14.1 px at 900. Stage, caption and controls fit (696 px). Nothing is clipped and the timing is identical. The chips, "fewer illnesses / more illnesses" and the source line are readable, but only just, especially in the dense beats 9–12.

### 390×844

The picture switches to a stacked text view on the same clock: labelled lists that build as the beats play. Text is 13–16 px and readable. Stacked view, caption and controls take 829 px, so they just fit. It's a different experience: lists appearing, not things moving. In places it's clearer than the picture, because it adds lines the picture leaves out: "Draft 1: a ranking under the AI's two headings", "The four dashed ones were never weighed.", "The weighing doesn't show in either ranking.", "Their check: at the same predicted cost, some patients are sicker." Differences from desktop: no check bars and no "The condition holds". The beat 7 header reads "the ranking", not "the final ranking". "From this analyst" appears in beat 7, a beat early. The source line sits under the controls, just below the bottom of an 844 px screen.

---

## 2. The point, in my words

Two analysts can hand a manager the same AI-framed ranking. Only asking "why this frame, and what would change it?" shows which one actually chose the frame, and could catch it when it turned out to be wrong.

## 3. The question a manager should ask afterwards

"Before I act on this ranking: what are you treating as the stand-in for what we actually care about, why that one, what would make you change it, and have you looked?"

## 4. The final frame alone

Mostly yes. It reads as a side-by-side under "What the manager receives". On the left, "Which patients cost the most?" rests on the grey AI's frame, with "Nothing to check" below. On the right, "Which patients are sickest?" rests on a red chosen frame, with four considerations set aside, a would-change-it note and the check. The task card ("need the most help") sits above both, with the reviewer's three questions under the picture. It tells me: one analyst inherited the AI's measure, the other chose one, said what would change it, tested it and switched.

Two things it can't say without the animation:
- **The rankings looked identical until someone asked.** That is the figure's point ("can't show who chose it"). In the final frame the two rankings already differ, so a reader skipping to the end could conclude that the first analyst simply turned in a visibly worse product.
- **What the cost ranking gets wrong.** "Some are sicker. The condition holds." is the only signal. Nothing on the picture says the cost ranking pushes sicker patients down the list.

---

## 5. Problems, ranked

1. **Beat 12 is overloaded (too fast).** Six changes in about 4.5 s across four regions: the second question, the check panel with bars, the verdict, "Nothing to check", the frame swap and the ranking rewrite. This is the payoff of the whole figure, and I had to scrub to see it. It needs staging (one region at a time) or more time.
2. **Beat 11's reveal comes late (too fast at the end, dead air before).** "Why this frame?" lands at 74.5 s. Nothing moves until 78 s, then both foundations slide in and the caption changes at 80 s. Move the reveal earlier or hold longer.
3. **"The condition holds" is cryptic (caption/picture mismatch).** It points to a note shown 20 s earlier. The check also shows only that some patients are sicker at the same predicted cost; it doesn't show that they cost less *because they get less care*, so "holds" claims a little more than the panel shows. "Some are sicker at the same predicted cost, so cost undercounts need" would say it plainly.
4. **The check panel doesn't draw "the same predicted cost" (ambiguous visual).** Two illness bars of different length, with no equal cost shown beside them, and no indication of what bar length measures.
5. **The final frame understates what checking revealed (fairness/clarity).** The first ranking stays under "What the manager receives" with no mark on the ranking itself. The figure doesn't endorse it, but a viewer could leave thinking the first analyst's fault was not asking a question, rather than that the cost ranking systematically ranks sicker patients lower.
6. **The picture drops who the sicker patients were (judgment call).** The figure says "some patients"; the study's finding is that Black patients were sicker at the same score. The evidence section says so plainly, but a reader who only watches gets a softened version of the stakes. That may be deliberate. I'd want it to be a stated choice.
7. **Beat 7 is tight (too fast).** The "AI-supplied" key is up about 1–1.5 s before the wipe drains it, and the pan at 45 s is the one abrupt move.
8. **Lost dots (ambiguous visual).** Both dots lose their labels once inside a frame. In beat 6 the first dot reads as the end of the cut-off line; in the beat 9 hold the second dot is unlabelled.
9. **Beat 9's weighing is hard to see.** Six half-second touches on small chips, each changing only from dashed to solid outline. The caption carries it.
10. **Brief text collision at 17.5 s.** The flying task question lies on top of "Avoidable visits" and the task card for about half a second.
11. **Small text at 1280×720.** Picture text down to 11.1 px.
12. **Accessibility label count.** The screen-reader title says "an animated figure in twelve beats", but the captions count "/ 13" and the beat list runs 0–13 (14 entries).
13. **Sourcing.** The 17.7% → 46.5% figure isn't in `source-spine.md` or the essay (Obermeyer appears nowhere in the companion repo). See section 7.

Fairness to AI: fair. The AI's frame is called reasonable, the second analyst also uses AI and starts from the same frame, and the problem is shown as the unexamined handoff, not the tool. Fairness to the first analyst: "Nothing to check" is accurate to the setup (no condition was written), though it may read as harsh after three diligent revisions. That harshness may be the intent.

---

## 6. Mechanical checks

- **Reduced motion.** Both `?reduced` and emulated `prefers-reduced-motion`, at 1280 and 390, open on the final frame at 1:34 with the full ending text: definition plus all three reviewer questions. The source line is present too. At 390 it sits under the controls and is cut off at the bottom of the screen.
- **Horizontal scroll at 390 px.** None. `scrollWidth` stayed at 390 at all 11 sampled times, 0–94 s.
- **Keyboard.** Tab order: brand → Essay → Practice → Workplace → PME → Play/Pause → Restart → scrub. Enter and Space both toggle play. Restart works with Enter. The scrub moves 1 s per arrow press and pauses playback; Home and End work. The focus ring is visible on the button. Caveat: tabbing to Play scrolls the controls to mid-screen with the top of the stage cut off, and that scroll starts autoplay, so a keyboard user's first Enter *pauses* the figure.
- **Numbers.**
  - "Failure mode 1 of 7": matches the essay's seven failure modes, frame capture first.
  - "Section VIII" and its three questions: match the essay (Section VIII, "why this problem, why this frame, what would change it?").
  - "Section II" link: matches the essay heading "II. What the Problem Looks Like".
  - **17.7% and 46.5%: not found** in `source-spine.md` or the essay. The page attributes them to the abstract; checked in section 7.
  - "Science 366 (2019): 447–453": a citation, not in the spine.
  - No other numbers appear in the picture.

---

## Additional questions

**Would a business or nonprofit reader see their own work in this example?**
Yes, if they work in a health system, care management, insurance or a nonprofit that allocates a program among clients. Deciding who gets a scarce program, with a cost or budget lens offered as the obvious frame, is everyday work there. The handoff pattern also rings true: an analyst works with an AI chat, revises diligently, and a manager receives a clean ranking without seeing how it was framed. For a general corporate reader the move transfers easily (ranking customers by spend as a stand-in for value, leads by deal size, grantees by past funding), but the page never builds that bridge: the setup and "Go further" say only "a health system's analytics team". One sentence naming the general pattern, "a convenient proxy for the thing you care about", would widen it.

**Does the figure endorse any frame the research found flawed, or make clear what checking revealed?**
It doesn't endorse the flawed frame. Cost appears as the AI's proposal: "reasonable", which fits the study's point that cost looked like an effective proxy. The second analyst keeps it only "for now", with a written condition, and switches to chronic illness after the check. What checking revealed is stated only as "Some are sicker. The condition holds." That's clear enough to tell cost undercounts sickness, but thin. In the final frame the first ranking, "Which patients cost the most?", still stands under "What the manager receives" with nothing on it saying it ranks sicker patients lower. The picture also never says who was undercounted (see problem 6).

**Is the research source line clear, without overclaiming?**
Yes, mostly. In the picture it reads "Illustration based on Obermeyer et al., Science (2019).": modest, and correctly an illustration, not a depiction. The setup paragraph says the analysts, their AI and the task are constructed. The evidence section says "It was a prediction model. No generative AI was involved." and "The figure shows none of the study's data." That's careful. Weak spots: the in-picture line arrives only in the last 5 s, is small italic at the stage's bottom left, and at 390 px sits just below the bottom of the screen. Possible wording overreach is checked in section 7.

**Does anything on the page still use military or classroom wording?**
The figure itself doesn't: analyst, manager, ranking, reviewer's check. The page around it does:
- Directly under the edition switcher, visible above the figure: "PME (professional military education): the example from *The Irreducible Officer*, the National War College essay." It's hard-coded in the HTML, so it shows in the business edition.
- The "Reviewer's check" paragraph: "It comes from Section VIII of *The Irreducible Officer*, a National War College essay…"
- "Go further": "an essay about judgment in military education" and the link "The original essay, written for military education: The Irreducible Officer, Section II".
- The meta description (link previews, search): "A teaching figure: an analyst builds on an AI's reasonable first frame…". "Teaching figure" is classroom framing.
- The edition switcher's "PME" label is military shorthand, though it's needed to switch editions.

The attributions are honest and arguably needed. But a business reader meets "professional military education" before the figure even starts, which tells them the page wasn't written for them.

---

## 7. After the read: the page's Obermeyer et al. (2019) claims vs. the abstract

Source: the PubMed abstract (PMID 31649194), *Science* 2019 Oct 25;366(6464):447–453, fetched with NCBI efetch. I compared the page's quotes to it programmatically after normalising whitespace.

**Verbatim and correct.** All five quoted passages in "The study behind this example" match the abstract word for word:
- "to identify and help patients with complex health needs"
- "At a given risk score, Black patients are considerably sicker … from 17.7 to 46.5%."
- "The bias arises because the algorithm predicts health care costs rather than illness, but unequal access to care …"
- "despite health care cost appearing to be an effective proxy for health by some measures of predictive accuracy, large racial biases arise."
- "We suggest that the choice of convenient, seemingly effective proxies for ground truth …"

The 17.7 → 46.5% figure is therefore accurate, though it's still missing from `source-spine.md`. The citation (authors, title, *Science* 366, 447–453, 2019) is correct.

**Supported paraphrases.**
- "a commercial prediction algorithm of the kind health systems use": the abstract says "Health systems rely on commercial prediction algorithms" and "a widely used algorithm, typical of this industry-wide approach".
- "how sick patients were at the same risk score, where the score was the algorithm's prediction of cost": combines "At a given risk score" with "the algorithm predicts health care costs". Fair.
- In the figure, "If some patients cost less because they get less care" and "at the same predicted cost, some patients are sicker": fair, de-racialised paraphrases of the abstract's mechanism and finding.
- "Their conclusion is about choosing the measure": fair reading of "the choice of convenient, seemingly effective proxies".

**Not supported by the abstract (flag).**
1. **"Cost passed the usual accuracy tests, and the bias was there anyway."** The abstract says cost *appeared* to be an effective proxy "by some measures of predictive accuracy". "Passed the usual accuracy tests" is stronger: "usual" and "passed" aren't in the abstract. Suggest: "Cost looked like a good proxy by some accuracy measures, and the bias was there anyway."
2. **"It was a prediction model. No generative AI was involved."** "Prediction" is in the abstract. "No generative AI" isn't stated there. It's a safe inference for a 2019 commercial risk algorithm, but the abstract doesn't say it, and the page says "All quotes are from the abstract". Since this sentence isn't a quote, it's acceptable as the page's own clarification.
3. **The corrected frame, "chronic illness" / "Which patients are sickest?".** The abstract says the algorithm predicts cost "rather than illness" and measures sickness by "signs of uncontrolled illnesses". It doesn't name chronic illness as the replacement measure, and it doesn't say that switching the label is the remedy ("Remedying this disparity" isn't specified in the abstract). The page does list the check and considerations as constructed, so this is covered, but a reader may take "chronic illness" as the study's fix.
4. **"Some are sicker. The condition holds."** The analyst's condition includes a cause ("because they get less care"). The abstract supports that cause, but the figure's check panel only shows the sickness gap at equal predicted cost. That's a picture-logic issue more than a sourcing one (problem 3 above).
5. **What the picture leaves out.** The abstract's finding is specifically racial (Black vs. White patients). The figure says "some patients". That isn't a misstatement, and the evidence section quotes the racial finding in full, but the animation alone doesn't carry it (problem 6).

No claim on the page contradicts the abstract.
