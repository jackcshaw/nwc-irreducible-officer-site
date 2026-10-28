# Fluency substitution: storyboard

Motion figure 2 of 8 · slug `fluency-substitution` · storyboard round 7, with the nameplate · October 28, 2026

*Cold-read copy. The Intent section is removed.*

## 2. Scenario

A war-college student must recommend whether to send forces to reassure a threatened ally. The student asks an AI for a draft. It writes a polished paragraph that weighs escalation against the ally's trust and concludes, on balance, that the forces should go, with clear limits. The student reads it closely, cuts one weak sentence and agrees with the rest. A second student first writes their own call in a plain note, "Send them. The ally's trust matters most, and troops show we mean it.", then has an AI draft from the note and reads that draft just as closely. Suppose the draft matches the first student's paper word for word; both papers are tagged as drafted with AI. With the papers set aside, faculty ask each student why, and both explain the call clearly. Then faculty change one fact: what if the ally doesn't want our troops on its soil? The first student tries, and stays with the paper's call in its language: on balance, losing that trust is still the greater risk. The second reworks it from their reason: troops would now cost the ally's trust, so send arms and aid instead.

*Sources.* The task, the paragraph, the note and every answer are constructed for this figure, and the task card says "Example task". *The Irreducible Officer*, Section II, describes the AI's "balanced paragraphs, caveats in the right places, the measured voice of a considered judgment". Section VIII names the student who "revises under challenge rather than retreating to the artifact's language". Section I says disclosure doesn't show whose judgment the work holds. The changed fact is a concrete version of the Section IX oral-defense question, "what evidence would change the recommendation". The figure shows no numbers.

## 3. Cast and grammar

**The colour rule.** Grey is what the AI wrote: both drafts, which stay grey on the papers, the sentence the first student cut, and the AI's sentence when a student repeats it. Red is a student's own work (the first student's strike, the second student's note and answers) plus the name labels beside the dots. Navy ink is the page: the task, the labels, the questions and the key. A small key says grey is "written by AI" and red is "a student's own work".

**Palette.** Paper `#f6f1e8`, paper-bright `#fffdfa`, ink `#0a2242`, machine grey `#5b564f` with a `#ded5c4` band behind AI-written text, red `#b81b2b`. Type: Source Serif 4 for drafts, the note, answers, questions and captions; Source Sans 3 for name labels; IBM Plex Mono for small labels (12 units, never smaller).

**Stage.** An SVG with a 960 × 540 viewBox. One view, no camera moves. The picture builds toward a table.
- **Label column** (x 16–236): the task card at top, then each row's label as its row fills.
- **Two student columns:** the first student at x 252–590, the second at x 606–944. Each dot heads its column from beat 4, at y 88, just above the first row.
- **Rows:**
  - their own work, not handed in (y 112–190);
  - what faculty receive (y 200–332);
  - the first question (y 346–414);
  - the changed fact (y 424–504).
- **The key** sits under the student columns (baseline 524).

Before a draft or the note settles into its cell, it appears large: drafts at 85% of the base sheet, centred in the free space, and the note at full size.

Positions are viewBox units. Widths of text-sized elements come from measured text at build time. The paper's line breaks are fixed (below) so the two papers match line for line.

**The paper's lines** (base sheet 460 wide, Serif 20, line height 34; the first student's draft has a sixth line until the cut):

1. Any course must weigh escalation against
2. the ally's trust. On balance, losing that
3. trust is the greater risk: the forces
4. should go, with clear limits to contain
5. escalation. *(the AI's draft continues: "Either choice carries real")*
6. *(the AI's draft only: "consequences.")*

| Element | Stands for | How it looks | Where |
| --- | --- | --- | --- |
| Task card | The assignment | Paper-bright card, hairline ink border (15%). Mono 12 "EXAMPLE TASK", then Serif 16 ink over three lines on a 20-unit step (56, 76, 96): "Recommend whether to / send forces to reassure / a threatened ally." It stays in place throughout | x 16–236, y 14–110 |
| First red dot | The first student | Solid red circle, radius 5. Labelled "Student" (Sans 600 13, red) in beats 1–3; from beat 4 it heads its column, labelled "First student" | Starts at (120, 300); from beat 4 at (260, 88) |
| The AI's draft for the first student | The paragraph the AI writes | Paper-bright sheet, hairline border, soft shadow, with a grey mono tag "AI'S DRAFT" above it. Grey Serif text on a grey band per line: "Any course must weigh escalation against the ally's trust. On balance, losing that trust is the greater risk: the forces should go, with clear limits to contain escalation. Either choice carries real consequences." | At 85%: x 300–691, y 212–406 (six lines); after the cut, y 212–377 |
| The cut | The first student's edit | A red strike through "Either choice carries real consequences." The struck words then lift out of the paper and settle, still struck, as a one-line card in the first column's top row, under a red Sans 600 13 label: "Cut one sentence from the AI's draft:". The card is half see-through mid-flight, so the lines it crosses stay readable | Label baseline (258, 132); card from x 252, y 140–176 (Serif 15 grey on a band, red strike) |
| Paper A | The paper the first student hands in | The same sheet, still grey on its bands, five lines. From beat 3 its tag reads navy "STUDENT'S PAPER" plus grey "· DRAFTED WITH AI", to the end. Label swaps fade the old label out before the new one fades in | From beat 4: 62% at x 252–537, y 212–332; tag baseline 204 |
| Second red dot | The second student | Solid red circle, radius 5, labelled "Second student" (Sans 600 13, red), at the head of its column | (614, 88) from beat 4 |
| The note | The second student's own call | Paper-bright card, hairline border. Written at full size under a red mono label "SECOND STUDENT'S NOTE": Serif 20 red over three lines, "Send them. The ally's trust / matters most, and troops / show we mean it." Then it shrinks to 62% into the second column's top row (the label fades) and stays to the end | Large: x 606–944, y 212–330. Settled: x 606–816, y 112–185 |
| The AI's draft for the second student | The paragraph the AI writes from the note | A sheet the same size, grey tag "AI'S DRAFT", the same five grey lines on bands as paper A | At 85%: x 552–943, y 212–377 |
| Match sweep | Word for word | A navy hairline runs under each line of the new draft and the same line of paper A at once, 0.16 s a line, then fades | Beat 5 |
| Paper B | The paper the second student hands in | Identical to paper A, with the same tag, "STUDENT'S PAPER · DRAFTED WITH AI" | From beat 6: 62% at x 606–891, y 212–332 |
| Row labels | What each row is | Mono 12 ink. Row 1: "THEIR OWN WORK" over "NOT HANDED IN" (weight 500). Row 2: "WHAT FACULTY RECEIVE" | (16, 140) and (16, 156); (16, 236) |
| Set aside | Faculty ask without the paper | Both papers dim: each sheet fades into the page and its grey bands lighten to 55%. The words and tags stay at full strength, so the text stays readable (5.6:1) | Beats 7–9 |
| Question 1 | What faculty ask first | Row label: mono 12 "FACULTY ASK" over Serif italic 16 in two lines, "Papers aside: what do you / recommend, and why?" | Mono baseline (16, 362); lines 383, 403 |
| Question 2 | The changed fact | Row label: mono 12 "THEN ONE FACT CHANGES" over Serif italic 16 in two lines, "What if the ally doesn't want / our troops on its soil?" | Mono baseline (16, 440); lines 461, 481 |
| Speech panels | What each student says | Paper-bright box, rounded 8, hairline ink border (25%). Serif 15, two lines, inside quotation marks. Both students' words arrive in plain ink, as faculty hear them, left to right at the same speaking pace. At the turn (beat 9) they take their origin colours: the first student's turn grey on a beige band, the second student's turn red | Row 3: y 350–408. Row 4: y 428–486. First column x 252–590, second x 606–944 |
| Source highlight | Where the repeated words come from | At the turn (beat 9) only: on paper A, the band behind "On balance, losing that trust is the greater risk: the forces should go" returns to full strength and a navy underline runs under those words. Both fade after about 2.5 s | Paper A, lines 2–4 |
| Colour key | How to read the colours | Mono 12: a grey band swatch with grey "WRITTEN BY AI" (from beat 2, with the first AI text), then a red dot with red "A STUDENT'S OWN WORK" (from beat 3, with the first strike) | Baseline 524, from x 252 |
| Caption band | The words for each beat | Real text under the picture: a mono counter ("3 / 10") and the caption in Serif 22 ink. In beat 10: mono 13 ink "FACULTY CHECK" over the check in Serif italic 30, then directly under it, the same size and style, "Then change one fact. What would you recommend now?" Fixed height on desktop, sized for both lines | Under the stage |
| Beat list | Text equivalent and navigation | Ten numbered captions with "On screen" lines (visible in reduced-motion, print and narrow views; always available to screen readers). The current beat has a navy rule | Under the controls |

**The answers.**

| | "Papers aside: what do you recommend, and why?" | "What if the ally doesn't want our troops on its soil?" |
| --- | --- | --- |
| First student (ink, then grey on the band from the turn) | "On balance, losing that trust is the greater risk: the forces should go." | "On balance, losing that trust is still the greater risk. The forces should go." (the paper's call in the paper's words; only "still" is the student's own) |
| Second student (ink, then red from the turn) | "Send them. The ally's trust matters most, and troops show we mean it." | "Then troops would cost the ally's trust. I'd send arms and aid instead." |

**Short windows and phones.**
- *Trigger.* Whenever the stage's smallest text (12-unit mono) would render under 11 px at the runtime's letterboxed scale, the SVG collapses and a stacked text stage takes its place, driven by the same clock (`.is-stacked`, set by `syncStacked`). That covers a 1280×720 laptop window as well as phones. At 1440×900 the full picture shows.
- *What the stacked stage shows, at 13–16 px:*
  - beat 1: the task;
  - beats 2–3: the AI's draft, then struck and relabelled;
  - beat 4: the two students' own work, side by side: "Cut one sentence from the AI's draft" over the struck sentence, and the note;
  - beat 5: that row plus the AI's draft from the note, with "Suppose it matches the first student's paper word for word";
  - beat 6: that row plus a compact tile, "Both handed in this paper", which stays to the end;
  - beats 7–9: the paper tile, shortened to two lines at beat 7 and one line from beat 8, and the two question rows, each with both students' answers side by side, in ink, then in their colours at the turn;
  - beat 10: the one-line paper tile and both question rows.
- *Fixed heights, so the controls never move.*
  - The stacked stage takes the height of its tallest beat layout at the current width.
  - The caption band is held at the last caption's height: 174 px on desktop (stacked or drawn), 212 px below 720 px and 220 px below 480 px. The check is set at 20 px below 480 px.
  - At 390 × 844 the whole player, including the nameplate strip, measures 825 px, which fits the screen.
- *Throughout:* the colour key sits at the bottom of the stacked stage. Its labels, the names and the section labels are 13 px.

## 4. Beats

Times are absolute seconds. In every beat the caption changes first (0.3 s fade) and nothing in the picture moves for the first second. A change the caption is about starts only after the caption can be read once.

### Beat 1 · 0.0–6.0 s · The task

- **On screen at the start:** an empty paper stage.
- **What moves:**
  1. 1.0–1.6: the task card fades in and rises 6 units at top left.
  2. 1.6–2.0: the red dot grows in at (120, 300), with its "Student" label.
  3. 2.0–6.0: hold.
- **Caption:** "A student gets a task that needs a decision."
- **Notice:** the red dot is the student. The task asks *whether* to send forces, so the answer has to come down on one side.
- **Why:** the setup names the situation before anything goes wrong.

### Beat 2 · 6.0–14.7 s · The AI drafts

- **What moves:**
  1. 7.0–7.4: the red dot pulses once. The student asks.
  2. 7.4–7.9: a blank sheet fades in at centre (x 300–691, y 212–406), with the grey tag "AI'S DRAFT" above it.
  3. 8.0–10.4: the paragraph composes line by line, 0.4 s a line, each line's words arriving in grey on their band. With the first line (8.0–8.4), the key's grey half fades in under the stage: a beige swatch and "WRITTEN BY AI".
  4. 10.4–14.7: hold.
- **Caption:** "The student asks an AI for a draft. It writes a polished recommendation."
- **Notice:** the paragraph weighs escalation against the ally's trust, says "On balance", makes a call (the forces should go) and adds a caveat (clear limits). It ends on a general line, "Either choice carries real consequences."
- **Why:** this is the essay's "tone of analytic maturity", large enough to read, and good enough to agree with.

### Beat 3 · 14.7–23.5 s · The student agrees

- **What moves:**
  1. 15.7–16.1: the dot moves onto the sheet, to the start of line 1. Its label fades.
  2. 16.1–19.7: the dot reads along each line, 0.6 s a line, just under the words. Nothing on the page changes.
  3. 19.8–20.6: the dot draws a red strike through "Either choice carries real consequences." As it starts (20.0–20.4), the key's red half fades in: a red dot and "A STUDENT'S OWN WORK".
  4. 20.6–20.8: pause.
  5. 20.8–21.5: the struck words lift out of the paper and settle, still struck, as a one-line card above it, in what becomes the first column's top row. The card is half see-through mid-flight. The sheet's lower edge rises to fit the five lines left. Then (21.5–21.9) a red label appears over the card: "Cut one sentence from the AI's draft:".
  6. 21.6–22.0: the tag "AI'S DRAFT" fades out, then navy "STUDENT'S PAPER" with grey "· DRAFTED WITH AI" fades in. It stays to the end.
  7. 22.0–23.5: hold.
- **Caption:** "The student reads closely, cuts a weak line, and agrees with the rest."
- **Notice:** the student reads every line, then cuts the one sentence that says nothing. The cut stays on screen. The rest stays exactly as the AI wrote it, still grey, and the paper is now the student's, tagged as drafted with AI.
- **Why:** this is "the student mistakes well-ordered language for well-owned reasoning", shown as a careful, sincere student. The edit is a real judgment about the text.

### Beat 4 · 23.5–32.0 s · A second student writes their own call

- **What moves:**
  1. 24.5–25.7: paper A shrinks to 62% into the first column (x 252–537, y 212–332), its tag travelling with it. In the same move, the first student's dot rises to the head of the column (260, 88), and its label becomes "First student".
  2. 25.8–26.2: a second red dot grows in at the head of the second column (614, 88), labelled "Second student".
  3. 26.3–26.7: a blank note card fades in, large, in the second column (x 606–944, y 212–336), under the red mono label "SECOND STUDENT'S NOTE".
  4. 26.8–27.2: the dot moves down to the card's first line.
  5. 27.3–29.3: the dot writes, word by word in red Serif 20: "Send them. The ally's trust matters most, and troops show we mean it."
  6. 29.4–29.8: the dot returns to the head of its column.
  7. 29.8–32.0: hold.
- **Caption:** "A second student writes their own call first, in plain words."
- **Notice:** the note holds a call, the reason for it, and why troops serve that reason. No AI is involved yet.
- **Why:** this is the start of what doing it well looks like, shown large.

### Beat 5 · 32.0–43.4 s · An AI drafts from the note

- **What moves:**
  1. 33.0–33.8: the note shrinks to 62% and moves up into the second column's top row (x 606–816, y 112–185). Its label fades.
  2. 34.1–34.4: the second dot pulses once. The student asks.
  3. 34.4–34.8: a sheet with the grey tag "AI'S DRAFT" fades in below the note, at 85% (x 552–943, y 212–377).
  4. 34.9–36.9: the AI's paragraph composes line by line in grey, 0.4 s a line. The figure supposes it comes out the same five lines as paper A.
  5. 37.0–37.4: the dot moves down to the start of line 1.
  6. 37.4–40.4: the dot reads along each line at the first student's pace, 0.6 s a line.
  7. 40.5–41.3: a navy hairline runs under each line of the new draft and the same line of paper A at once, line by line. The hairlines stay until the paper moves (44.4–44.8).
  8. 41.4–41.8: the tag "AI'S DRAFT" fades out, then navy "STUDENT'S PAPER" with grey "· DRAFTED WITH AI" fades in.
  9. 41.8–43.4: hold.
- **Caption:** "An AI drafts from the note. Suppose it matches the first paper word for word."
- **Notice:**
  - The note stays in view above the draft, and the draft says the same thing in polished form.
  - The hairline pairs each line with the same line of the first paper.
  - This student's AI use looks like the first student's: a grey draft, a close read, a kept paper with the same tag.
- **Why:** both students use an AI the same way on screen. The note stays as this student's own work, outside what faculty will receive.

### Beat 6 · 43.4–49.4 s · What faculty receive

- **What moves:**
  1. 44.4–45.6: the new paper shrinks to 62% into the second column (x 606–891, y 212–332), its tag travelling with it. In the same move, the second dot returns to the head of its column.
  2. 45.7–46.2: the row labels fade in: "WHAT FACULTY RECEIVE" beside the papers, and "THEIR OWN WORK / NOT HANDED IN" beside the row above.
  3. 46.2–49.4: hold.
- **Caption:** "Faculty receive two identical papers, both drafted with AI."
- **Notice:** the papers match line for line, both grey, both tagged. The note and the cut sit in the row above, outside what faculty receive.
- **Why:** this is the essay's "easier to miss". Nothing on the page can separate the two students.

### Beat 7 · 49.4–63.9 s · Papers aside: both explain

- **On screen at the start:** the table's top two rows, the task card, the key; the bottom two rows empty.
- **What moves:**
  1. 50.4–51.0: both papers dim: the sheets fade into the page and the grey bands lighten. The words stay readable.
  2. 51.2–51.8: the third row's label fades in and rises 6 units: "FACULTY ASK" over "Papers aside: what do you recommend, and why?"
  3. 54.3–55.6: a speech panel opens in the first column, and words appear at speaking pace, in plain ink: "On balance, losing that trust is the greater risk: the forces should go."
  4. 55.8–57.1: a speech panel opens in the second column, and words appear at the same pace, in plain ink: "Send them. The ally's trust matters most, and troops show we mean it."
  5. 57.1–63.9: hold.
- **Caption:** "Without the papers, both explain the call clearly."
- **Notice:** the same call and the same reason, both fluent, both in the same ink. This is what faculty hear. Nothing in the picture marks either answer.
- **Why:** the first question doesn't separate them. A fluent, sincere answer can pass it, which is why fluency is easy to miss.

### Beat 8 · 63.9–70.4 s · Change one fact

- **What moves:**
  1. 64.9–65.5: as the caption is read, the fourth row's label fades in and rises 6 units: "THEN ONE FACT CHANGES" over "What if the ally doesn't want our troops on its soil?"
  2. 65.5–70.4: hold while the question is read.
- **Caption:** "Change one fact."
- **Notice:** the new fact turns the second student's reason against troops: the ally's trust now argues for keeping them home.
- **Why:** the separating question is on screen, with the caption, before either student answers.

### Beat 9 · 70.4–81.4 s · The two answers (the turn)

- **What moves:**
  1. 71.4–72.7: as the caption is read, a speech panel opens in the first column, and plain ink words appear: "On balance, losing that trust is still the greater risk. The forces should go." The student tries, and stays with the paper's call.
  2. 72.9–74.2: a speech panel opens in the second column, and plain ink words appear: "Then troops would cost the ally's trust. I'd send arms and aid instead."
  3. 75.4–76.2: all four answers take their origin colours. The first student's words turn grey on the beige band, the key's mark for words the AI wrote, except "still", their one own word, which turns red. The second student's two answers turn red. At the same moment, on paper A, the band behind the repeated words returns to full strength and a navy underline runs under them (75.4–76.0).
  4. 78.0–78.5: the highlight and underline on paper A fade.
  5. 78.5–81.4: hold.
- **Caption:** "One student stays with the paper's call. The other reworks it from their reason."
- **Notice:**
  - The difference faculty can hear comes first. The first student engages ("still") but keeps the paper's call, which sends troops the ally no longer wants. The second keeps the reason and changes the call.
  - Then the colours show why. Apart from "still", the first student's answers are the AI's sentence; the second student's are their own words.
- **Why:** this is the turn, and the first place the two students differ. Under challenge, one student retreats to the paper's language and the other revises (Section VIII).

### Beat 10 · 81.4–88.6 s · The faculty check

- **What moves:**
  1. 81.4–81.6: caption 9 fades out.
  2. 81.6–82.2: the faculty check rises into the caption band: "FACULTY CHECK" in navy mono, then the check in large italic.
  3. 84.9–85.4: directly under it, at the same size: "Then change one fact. What would you recommend now?"
  4. 85.4–88.6: hold. At 88.6 the player shows Replay and the figure rests on this frame.
- **Caption:** "Faculty check: Can the student independently explain the judgment in plain speech?" Then, at the same size: "Then change one fact. What would you recommend now?"
- **Notice:** the picture above shows both moves: the first question, which both students pass, and the changed fact, which separates them.
- **Why:** the figure ends on the questions an educator can ask.

## 5. Final frame

The still at 88.6 s figure time (91.6 s player time). It is also the reduced-motion view and the print view. Before play, the waiting view shows the name card over the poster: beat 1 settled (5.98 s figure time), the task card and the student. The corner plate, "FLUENCY SUBSTITUTION · 2 OF 7", sits in its strip above the stage throughout.

**Stage:** a table.
- **Label column:**
  - the task card, "EXAMPLE TASK" over "Recommend whether to send forces to reassure a threatened ally.";
  - then each row's label: "THEIR OWN WORK / NOT HANDED IN"; "WHAT FACULTY RECEIVE"; "FACULTY ASK" with "Papers aside: what do you recommend, and why?"; "THEN ONE FACT CHANGES" with "What if the ally doesn't want our troops on its soil?".
- **Column heads:** a red dot and "First student"; a red dot and "Second student".
- **Their own work:**
  - First student: the red label "Cut one sentence from the AI's draft:" over the cut sentence, grey on a band with a red strike: "Either choice carries real consequences."
  - Second student: the red note, "Send them. The ally's trust matters most, and troops show we mean it."
- **What faculty receive:** two identical papers, set aside (sheets faded, bands lightened), grey on bands, each tagged "STUDENT'S PAPER · DRAFTED WITH AI": "Any course must weigh escalation against the ally's trust. On balance, losing that trust is the greater risk: the forces should go, with clear limits to contain escalation."
- **Faculty ask** (the answers in their origin colours, revealed at the turn):
  - First student, grey on the band: "On balance, losing that trust is the greater risk: the forces should go."
  - Second student, red: "Send them. The ally's trust matters most, and troops show we mean it."
- **One fact changes:**
  - First student, grey on the band except a red "still": "On balance, losing that trust is still the greater risk. The forces should go."
  - Second student, red: "Then troops would cost the ally's trust. I'd send arms and aid instead."
- **Under the columns:** the key, grey "WRITTEN BY AI" and red "A STUDENT'S OWN WORK".

**Caption band** (labels in a left column, words on the right; stacked below 560 px):

> FLUENCY SUBSTITUTION *(navy mono)* · Polished analysis stands in for owned reasoning. *(Serif)*
> FACULTY CHECK *(navy mono)* · *Can the student independently explain the judgment in plain speech?* *(Serif italic, about 30 px)*
> *Then change one fact. What would you recommend now?* *(the same size and style)*

**In the reduced-motion and print views,** the name and definition sit above the check, and the beat list (beat 0, the name card, then all ten captions with their "On screen" lines) is readable below the controls. Clicking a beat shows its settled still.

**In the stacked stage** (a 1280×720 window or a phone), the final frame is the "Both handed in this paper" tile, both question rows with the two students' answers side by side in their colours, and the key. At 390×844, with the check and the controls, it measures 815 px.

**What the still says alone:** two students handed in the same paper, drafted with AI. One cut a line from the AI's draft; the other wrote their own call first. Asked why, both answered well. When one fact changed, the first stayed with the paper's call in its words, and the second changed course for the same reason. The check below says what to ask.

## 6. Standalone page copy

**Title:** Fluency substitution

**Kicker:** Failure mode 2 of 7

**Setup:**

A student asks an AI to draft a strategy recommendation, reads it closely and agrees with it. The paper reads like a considered judgment. Suppose a second student, who made the call first, hands in the very same paper. *The Irreducible Officer* calls the risk fluency substitution: polished analysis stands in for owned reasoning. Not every student who agrees with an AI fails this way. The task, the paper and all the answers are a constructed example.

**Figure summary** (visually hidden, for screen readers): An animated figure that builds a table. A red dot stands for a student with an example task: recommend whether to send forces to reassure a threatened ally. An AI drafts a polished paragraph, shown in grey on a beige band, the figure's mark for words the AI wrote: weigh escalation against the ally's trust; on balance, losing that trust is the greater risk, so the forces should go, with clear limits. The student reads it closely, strikes out one weak sentence and keeps the rest. A second student first writes their own call in a red note, "Send them. The ally's trust matters most, and troops show we mean it.", then has an AI draft from it. Suppose that draft matches the first paper word for word. Faculty receive two identical papers, both tagged as drafted with AI. With the papers set aside, they ask each student why, and both explain the call clearly; their answers appear in plain ink, as faculty hear them. Then faculty change one fact: what if the ally doesn't want our troops on its soil? The first student tries, and stays with the paper's call in its own words: on balance, losing that trust is still the greater risk, so the forces should go. The second says troops would now cost the ally's trust and proposes arms and aid instead. Only then do the answers take their colours: the first student's in the AI's grey, the second student's in red. The figure ends on the faculty check and the follow-up: change one fact and ask what they would recommend now. Each beat is listed below with what is on screen.

**Beat list (text equivalent):**

0. **Fluency substitution · Failure mode 2 of 7.** *On screen:* the name, "Fluency substitution", appears large over the stage with "Failure mode 2 of 7" above it, then moves into the top-left corner, where it stays. *(Added by the runtime.)*
1. **A student gets a task that needs a decision.** *On screen:* a task card appears at the top left: "Example task: Recommend whether to send forces to reassure a threatened ally." A red dot labelled Student appears below it.
2. **The student asks an AI for a draft. It writes a polished recommendation.** *On screen:* the dot pulses. A sheet labelled "AI's draft" appears, and a paragraph writes itself line by line in grey on a beige band, and a key below names that band "Written by AI": "Any course must weigh escalation against the ally's trust. On balance, losing that trust is the greater risk: the forces should go, with clear limits to contain escalation. Either choice carries real consequences."
3. **The student reads closely, cuts a weak line, and agrees with the rest.** *On screen:* the dot reads along each line, then strikes out "Either choice carries real consequences." in red, and the key adds "A student's own work" in red. The struck sentence moves above the paper, under a red label: "Cut one sentence from the AI's draft". The rest stays grey, and the label changes to "Student's paper, drafted with AI".
4. **A second student writes their own call first, in plain words.** *On screen:* the first paper moves into a column headed First student. A second red dot heads a column labelled Second student and writes on a large note card in red: "Send them. The ally's trust matters most, and troops show we mean it."
5. **An AI drafts from the note. Suppose it matches the first paper word for word.** *On screen:* the note moves into the top row, beside the first student's cut sentence. The dot pulses, and a sheet labelled "AI's draft" fills with a grey paragraph. Suppose it is the same as the first paper, word for word. The dot reads each line at the same pace, and a thin line pairs each line with the same line of the first paper.
6. **Faculty receive two identical papers, both drafted with AI.** *On screen:* the second paper moves into its column beside the first, in a row labelled "What faculty receive"; the top row is labelled "Their own work, not handed in". Both papers are tagged "Student's paper, drafted with AI".
7. **Without the papers, both explain the call clearly.** *On screen:* both papers dim. A row labelled "Faculty ask: Papers aside: what do you recommend, and why?" fills. In plain ink, the first student says, "On balance, losing that trust is the greater risk: the forces should go." The second student says, "Send them. The ally's trust matters most, and troops show we mean it."
8. **Change one fact.** *On screen:* a new row appears: "Then one fact changes: What if the ally doesn't want our troops on its soil?"
9. **One student stays with the paper's call. The other reworks it from their reason.** *On screen:* in plain ink, the first student says, "On balance, losing that trust is still the greater risk. The forces should go." The second student says, "Then troops would cost the ally's trust. I'd send arms and aid instead." Then the answers take their colours: the first student's words turn grey on a beige band, the mark for words the AI wrote, except "still", which turns red; the paper's matching words are underlined. The second student's answers turn red, their own words.
10. **Faculty check: Can the student independently explain the judgment in plain speech? Then change one fact. What would you recommend now?** *On screen:* both lines appear under the picture at the same size. The whole table stays in view.

**Faculty check:** Can the student independently explain the judgment in plain speech?

Then change one fact. What would you recommend now?

Both students in the figure explain the call clearly without the paper. The second line separates them. Section VIII of the essay looks for the student who "revises under challenge rather than retreating to the artifact's language". In the oral defense in Section IX, faculty ask what evidence would change the recommendation.

**From the essay** (*The Irreducible Officer*, Section II, What the Problem Looks Like), with its link to Chow et al. (2026):

> Fluency substitution is easier to miss. AI produces the tone of analytic maturity (balanced paragraphs, caveats in the right places, the measured voice of a considered judgment) and the student mistakes well-ordered language for well-owned reasoning. Researchers studying AI's effects on student cognition have introduced the concept of epistemic confinement to describe this condition: an illusion of competence while operating entirely within AI-constructed analytical boundaries, where the student believes they are thinking independently while the frame doing the work was never theirs ([Chow et al., 2026](https://ojs.aut.ac.nz/pjtel/article/view/246)). In strategy, fluency substitutes for deciding. A paragraph that balances every consideration may never identify which risk actually matters most.

**Links:**
- Book chapter: Own the decision → `../../book-v0/four-moves-book.html?spread=5`
- Practice: test fluency substitution with your AI assistant → `https://judgmentlab.net/#companion`
- Essay: Section II, What the Problem Looks Like → `https://judgmentlab.net/#ii-what-the-problem-looks-like`

## 7. Pacing table

Reading time is caption words ÷ 3. The beat total is lead + motion + hold, and every total is at least twice the caption's reading time. Label words are new words inside the picture; motion includes any wait for the caption to be read once.

Times are figure time; the player adds the 3 s name card in front (beat 0), so player time is figure time plus 3 s.

| Beat | Time (s) | Caption words | Reading (s) | 2× (s) | Label words | Lead (s) | Motion (s) | Hold (s) | Total (s) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 · Name card | player 0.0–3.0 | 0 (band quiet) | — | — | 6 | 0.0 | 1.0 (move) | 2.0 (hold first) | 3.0 |
| 1 · The task | 0.0–6.0 | 9 | 3.0 | 6.0 | 13 | 1.0 | 1.0 | 4.0 | 6.0 |
| 2 · The AI drafts | 6.0–14.7 | 13 | 4.3 | 8.7 | 38 | 1.0 | 3.4 | 4.3 | 8.7 |
| 3 · The student agrees | 14.7–23.5 | 13 | 4.3 | 8.7 | 16 | 1.0 | 6.3 | 1.5 | 8.8 |
| 4 · A second student writes first | 23.5–32.0 | 11 | 3.7 | 7.3 | 20 | 1.0 | 5.3 | 2.2 | 8.5 |
| 5 · An AI drafts from the note | 32.0–43.4 | 15 | 5.0 | 10.0 | 35 | 1.0 | 8.8 | 1.6 | 11.4 |
| 6 · What faculty receive | 43.4–49.4 | 9 | 3.0 | 6.0 | 9 | 1.0 | 1.8 | 3.2 | 6.0 |
| 7 · Papers aside: both explain | 49.4–63.9 | 8 | 2.7 | 5.3 | 36 | 1.0 | 6.7 | 6.8 | 14.5 |
| 8 · Change one fact | 63.9–70.4 | 3 | 1.0 | 2.0 | 15 | 1.0 | 0.6 | 4.9 | 6.5 |
| 9 · The two answers | 70.4–81.4 | 14 | 4.7 | 9.3 | 27 | 1.0 | 7.1 | 2.9 | 11.0 |
| 10 · Faculty check | 81.4–88.6 | 10 + 9 under it | 3.3 + 3.0 | 6.7 (check) | 0 | 0.0 | 4.0 | 3.2 | 7.2, then rests |
| **Total** | | **114** | **38.0** | | **215** | | **46.0** | | **88.6 figure, 91.6 player** |

Checks:
- One idea per beat; movements run one after another.
- No caption describes something the picture hasn't shown yet:
  - beat 8's question appears 1.0 s in, with its three-word caption;
  - beat 9's answers start landing 1.0 s in, with their caption;
  - beat 9's colour reveal waits until that caption can be read once (5.0 s in; reading takes 4.7 s).
- Other changes a caption names also wait until it can be read once: the cut (beat 3, 5.1 s in), the note (beat 4, 3.8 s), the match sweep (beat 5, 8.5 s), the first answers (beat 7, 4.9 s), and the line under the check (beat 10, 3.3 s after the check).
- Every hold is at least 1.5 s.
- **In-picture reading.**
  - The first draft (33 words) is on screen at full size from 8.0 s to 24.5 s, alongside two 13-word captions: 59 words in 16.5 s, about 3.6 words a second. It doesn't need a full read here. It returns in beat 5 and stays readable at 62% to the end.
  - Beat 5's draft is the same 28 words, so viewers recognise it more than read it.
  - Beat 7 carries 44 words (caption, question, two answers) in 14.5 s, 3.0 words a second.
  - Beat 8 carries 18 words in 6.5 s.
  - Beat 9 carries 14 caption words and 27 answer words in 11.0 s, 3.7 words a second. The first student's answer mostly repeats beat 7's wording, so most of it is recognised, not reread.
- Both students read their drafts at the same pace (0.6 s a line), both AI drafts compose at the same speed (0.4 s a line), and both students' answers appear at the same speaking pace.
- No camera moves. The paper and note moves (beats 4, 5 and 6) are 0.8–1.2 s each and eased; reduced motion removes them.
- Total 88.6 s.
