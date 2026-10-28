# Fluency substitution: figure cold read, round 2

Reader: first-time viewer, an educator who hasn't read the essay. Material: `figures/fluency-substitution/index.html` only, served locally on port 5243.

Method: Playwright (Chromium). I watched the full run at real speed at 1280×900, capturing the figure every 0.5 s (187 frames, 0–92 s of wall time, which covers the 88.6 s run plus the end hold). I looked at the frames in order, then held key moments with `?t=` (0.3, 12.5, 20.6, 25.2, 34.5, 41.0, 46.2, 57.5, 72.5, 76.3, 88.6). I did the same at 390×844: 185 real-speed frames plus `?t=` holds. I also checked `?reduced`, `prefers-reduced-motion: reduce`, keyboard access and horizontal overflow. Times below are figure time, read from the scrubber.

## 1. Beat by beat (desktop, 1280 wide)

Before play, the stage is an empty beige box above Play / Restart and a 0:00 / 1:28 timer. On desktop it starts by itself once you scroll it into view. At 390 it doesn't (see Problems).

**Beat 1 (0–6 s): "A student gets a task that needs a decision."** A card fades in at top left: *Example task: Recommend whether to send forces to reassure a threatened ally.* A red dot labelled "Student" appears below it, at about 2 s. Clear. After that, about 4 s of still picture, which is plenty.

**Beat 2 (6–14 s): "The student asks an AI for a draft. It writes a polished recommendation."** An empty sheet labelled "AI's draft" appears next to the dot (~7.4 s). From 8.0 to 10.3 s a paragraph types itself on a beige band: *Any course must weigh escalation against the ally's trust. On balance, losing that trust is the greater risk: the forces should go, with clear limits to contain escalation. Either choice carries real consequences.* A key reading "Written by AI" sits under the stage. Nothing shows the student actually asking; the draft just appears. That's fine. The paragraph is about 33 words and types in about 2.3 s, but it stays on screen through beat 3, so I had time to read it. It does read like a polished, balanced recommendation.

**Beat 3 (14–24 s): "The student reads closely, cuts a weak line, and agrees with the rest."** The dot leaves its label and moves along each line of the draft (15.3–20 s). It strikes *Either choice carries real consequences.* in red (~20.3 s), and the key adds "● A student's own work" in red. The struck sentence lifts out and parks above the paper (~21 s). The sheet's header changes to "Student's paper · drafted with AI" (~21.8 s). This beat is well paced, and I agree the cut line is the weak one: it's a hedge. One small wobble: the "Student" label vanishes when the dot starts moving, and for a moment I read the dot as a cursor rather than the person.

**Beat 4 (24–32 s): "A second student writes their own call first, in plain words."** The caption arrives while the picture is still tidying the first student. The paper shrinks, and the dot hops onto the struck sentence and then up to a new "● First student" header (24–25.7 s). The second student, a dot labelled "Second student", only appears at ~26.2 s, about 2 s after the caption. A sheet labelled "Second student's note" then writes in red: *Send them. The ally's trust matters most, and troops show we mean it.* (27–29.7 s). The mismatch is small, but for two seconds the caption talks about someone who isn't on screen.

**Beat 5 (32–44 s): "An AI drafts from the note. It matches the first student's paper word for word."** The note shrinks up into a top row, and a row label appears on the left at ~34 s: **"Their own work, not handed in"**. At that point nothing has been handed in yet, so for a few seconds I didn't know what "not handed in" referred to. The label anticipates beat 6. A new "AI's draft" sheet types the same paragraph *without* the cut sentence (34.5–36.8 s), and the second dot reads it. Thin navy underlines then pair each line of the two papers. They last about one second (≈40.8–41.8 s), and I only saw them clearly in the 0.5 s frames. At real speed they flicker. The header then changes to "Student's paper · drafted with AI". The texts are visibly the same, but the first paper is shrunk to a smaller type size, so comparing them by eye takes effort. I also wondered why the second AI draft would leave out the "Either choice" line on its own. It produces exactly the first student's *edited* version. That's a convenient coincidence.

**Beat 6 (44–50 s): "Faculty receive two identical papers, both drafted with AI."** The second paper slides into a column beside the first, and a row label appears: "What faculty receive" (~46 s). This is the moment the picture becomes a table: one column per student, one row per stage. Clear.

**Beat 7 (50–64 s): "Without the papers, both explain the call clearly."** Both papers dim. A row appears: "Faculty ask · *Papers aside: what do you recommend, and why?*" (~51.3 s). In plain navy ink the first student says *"On balance, losing that trust is the greater risk: the forces should go."* (types 54.7–55.7 s). The second says *"Send them. The ally's trust matters most, and troops show we mean it."* (56.2–57 s). Then about 7 s of still picture. I noticed on my own that the first student's answer is a sentence lifted from the paper, and the figure lets you catch that before it says so. "Clearly" is fair: both answers are clear.

**Beat 8 (64–71 s): "Change one fact."** A row appears: "Then one fact changes · *What if the ally doesn't want our troops on its soil?*" (~65 s). Then about 5 s of quiet, which is a good place for a teacher to pause and ask the room.

**Beat 9 (71–82 s): "One student repeats the paper. The other reworks the call from their reason."** The caption arrives about 1 s before the answers, so it tells you the outcome before you see it. The first student types the same sentence again (71.6–72.6 s). The second types *"Then troops would cost the ally's trust. I'd send arms and aid instead."* (73–74.6 s). At ~75.6 s comes the real reveal. All four answers recolour: the first student's turn grey on the beige "Written by AI" band, and the second student's turn red. Meanwhile *On balance, losing that trust is the greater risk: the forces should go* is underlined on the first paper for about 3 s, ending around 78.6 s. I got it, but this is the key moment of the figure. It has no caption of its own and lands 5 s into a caption that already gave the answer away. Spoken words turning "written by AI" took me a second to decode: the student said them, but the AI wrote them.

**Beat 10 (82–88.6 s): "Faculty check: Can the student independently explain the judgment in plain speech?"** The caption bar becomes a larger italic "Faculty check" question. The second line, *Then change one fact. What would you recommend now?*, is added at ~85 s. The button turns to "Replay" at 88.6 s and the frame holds.

No caption on desktop changed before I could read it. Every caption is one short sentence and gets at least 6 s. What could be missed at real speed are movements, not captions: the 1 s underline pairing in beat 5 and the uncaptioned recolour in beat 9.

## 2. The point

Two students can hand in the same polished, AI-drafted paper while only one of them owns the reasoning behind it. You can't see the difference in the paper. It shows when you take the paper away, ask why, and change one fact.

## 3. The question a teacher should ask afterwards

"Put the paper away. What do you recommend, and why? Now suppose [one fact your recommendation depends on] is different. What do you recommend now, and which part of your reasoning made you change it, or not?"

## 4. The final frame alone

On desktop, mostly yes. The still reads as a two-column, four-row table:

- the student's own work, not handed in;
- what faculty receive: two identical beige papers, both tagged "drafted with AI";
- what each said when asked papers-aside;
- what each said when one fact changed.

The faculty check sits underneath. The colour key does the work. The first student's column is almost entirely beige (AI words), and the second student's column is red from top to bottom except the handed-in paper. It says: *same paper, different ownership, and the follow-up question is how you find out.*

Two weaknesses in the still. First, the first student's "own work" cell holds an AI-written sentence (beige band) struck through in red. Read cold, that looks like the student's own work *was* that sentence; the real meaning, that their only contribution was a deletion, needs the animation. Second, the underline that tied the first student's answer to their paper has faded by the final frame, so "repeats the paper" rests on the beige band alone.

At 390 wide the final frame doesn't carry the idea on its own. It drops the example task and the "What faculty receive" row, so the identical papers, half the argument, are missing. It's also taller than the phone screen (see Problems).

## 5. Problems, ranked

1. **Ambiguous visual: the first student's "Their own work, not handed in" cell.** It shows an AI-written sentence (beige "Written by AI" band) with a red strike. The key has no entry for "struck = cut by the student", so in the still, and for a viewer who joins late, the cell suggests the student wrote that sentence. The row label also appears at ~34 s, during beat 5, before anything has been handed in. One fix: label the cell as a cut (e.g. "cut one line"), or add the strike to the key.

2. **390 px: the phone layout drops what the argument rests on, and the end overflows the screen.**
   - At 390 the figure becomes a stacked list that swaps sections per beat. The first student's paper disappears at beat 4 and never comes back.
   - In beat 5, "word for word" is asserted by a small grey line ("Word for word the same as the first student's paper") with nothing on screen to compare against.
   - Beat 6 shows *one* paper under "Two identical papers, both drafted with AI:".
   - From beat 7 on, the task and the papers are gone. Beat 7 also opens with about 2 s of completely empty stage (49.5–51.5 s).
   - The final stage plus controls is 1051 px tall against 836 px visible. At ~81.5 s the "Their own work" row is re-inserted at the *top*, pushing the faculty check and the controls about 200 px down, below the fold.
   - Beat 3 at 390 has no reading dot (5 s of still draft), and the cut sentence just vanishes instead of moving.
   - At 390 the figure doesn't autoplay on scroll, unlike desktop, so the viewer sees an empty box until they press Play. That's acceptable, but worth knowing.

3. **Fairness to students: the contrast is stark enough to read as a straw man.**
   - The first student read closely and cut the weak line. Yet when told the ally doesn't want troops on its soil, they repeat "the forces should go" word for word, even though their own paper's reason (losing the ally's trust is the greater risk) points the other way. Sceptical teachers may dismiss it: "no student who read closely would say that." A subtler failure, such as restating the paper's language with small edits, or hedging, might persuade more.
   - The second student isn't probed on the part of the paper they *didn't* write. "With clear limits to contain escalation" came from the AI, not their note. If faculty asked about the escalation limits, the second student might stumble too. The figure doesn't acknowledge that both students handed in claims they never made.
   - Two separate AI drafts matching word for word, with the second leaving out exactly the line the first student cut, is a constructed coincidence. The intro says "it can be identical" and calls the example constructed, which helps, but "word for word" still strains belief.

4. **Too fast or easy to miss.**
   - The beat 5 underline pairing, the only *visual* proof of "word for word", lasts about 1 s.
   - The beat 9 recolour, the reveal, has no caption of its own and arrives about 5 s after a caption that has already announced the result. A viewer who looked away from the stage after reading "One student repeats the paper" could miss the colour change and its meaning.

5. **Caption out of step with the picture.**
   - Beat 4's caption names the second student about 2 s before they appear. The picture is still moving the first student into their column.
   - Beat 9's caption announces the outcome before the answers type out.

6. **Red dot does two jobs.** It marks each student (the "● First student" / "● Second student" headers, the moving dot), and the key also defines "● A student's own work". It's minor, but it blurs "this is a person" with "this is owned work".

7. **Scrubbing by keyboard is impractically fine.** Arrow keys move 0.05 s per press, so about 1,770 presses cover the run. PageUp/PageDown (~9 s) and Home/End work, and the beat buttons are the practical keyboard route.

8. **Factual claims.** The figure itself makes no empirical claim and shows no statistics. The page text around it cites the essay (Section II, Section VIII quote, Section IX oral defence), says the figure is failure mode 2 of 7, and cites Chow et al., 2026. These are checked below.

Nothing seemed unfair to AI. The second student also drafts with AI and is shown positively, so the figure locates the problem in owning the call, not in using the tool.

## 6. Mechanical checks

- **Reduced motion: yes.** Both `?reduced` and `prefers-reduced-motion: reduce` open on the final frame (scrubber at 1:28 / 1:28). They show the full table, the key, and both faculty-check lines in full. The button reads "Play".
- **Horizontal scroll at 390: none.** `scrollWidth` = `clientWidth` = 390, and no element extends past the viewport. (The vertical overflow of the final frame is covered in problem 2.)
- **Keyboard: yes.**
  - Tab order is brand → Essay → Practice → Play → Restart → scrubber → beat buttons 1–10.
  - Space and Enter both toggle play/pause on the Play button, and its accessible name updates ("Play / Pause / Replay the fluency substitution figure").
  - The scrubber takes arrows (0.05 s steps), PageUp/PageDown (~9 s) and Home/End, and its `aria-valuetext` reads e.g. "0:24 of 1:28, beat 4 of 10".
  - Each beat button jumps to its beat and plays.
  - Focus is visible: a 2 px navy outline with a 3 px offset.
  - The animated stage and caption bar are `aria-hidden`. The figcaption carries a full prose description plus a per-beat "On screen" list, so a screen-reader user gets the whole sequence.
- **Numbers: no statistics in the figure.** The only numbers inside the figure are the beat counters (1/10 to 10/10) and the timer (1:28). The page text uses "Failure mode 2 of 7", "about a minute and a half" (consistent with 1:28) and section numbers. See the fact check below.

### Fact check (done after writing the read above)

I checked these against `the-irreducible-officer.md` and `sources/source-spine.md` in the companion repo.

- **"Failure mode 2 of 7": found.** Section II names seven failure modes in this order: frame capture, fluency substitution, premature synthesis, uncalibrated reliance, invisible delegation, institutional monoculture, responsibility laundering. Fluency substitution is the second.
- **"From the essay" pull quote: verbatim match** with Section II, *What the Problem Looks Like*, including the Chow et al., 2026 citation. Chow et al. is also in the source spine, as the source of the "epistemic confinement" language.
- **Section VIII quote, "revises under challenge rather than retreating to the artifact's language": found verbatim** in Section VIII, *Assessment That Makes Ownership Visible*. In the essay it sits in the **frame evidence** paragraph, about owning the frame, not specifically about fluency. That's a fair use, just a slightly different context.
- **Section IX oral defence asking "what evidence would change the recommendation": found** in Section IX, *A Foundation Pilot*, step five.
- **The faculty-check wording is not essay text.** "Can the student independently explain the judgment in plain speech? Then change one fact." doesn't appear verbatim in the essay, claims map or source spine. It's the figure's own phrasing, supported in spirit by the Section VIII and IX lines above. It's presented as a faculty check, not a quote, so that's fine.
- **Numbers inside the figure:** only the beat counters and the 1:28 timer, so nothing needs a source.
