# Figure read 1: institutional-monoculture

Cold read by a first-time viewer, an educator who hasn't read the essay. I only looked at `figures/institutional-monoculture/index.html`, served on 127.0.0.1:5417. I watched it at 1280×900, 1280×720 and 390×844 with Playwright, scrolling the figure fully into view so it autoplayed, and captured a frame every 0.5 s for the whole run (186 frames per viewport, 0:00 to 1:30, plus rest). I held key moments with `?t=` (42.0–45.5, 50.25–52, 56.9–58.5, 59–76) and checked `?reduced`, emulated `prefers-reduced-motion`, the keyboard and the 390px layout. I didn't open the storyboard, the other files in `tests/`, the shots folder or any other figure before writing this. The source check at the end was done afterwards.

Important viewport note: **1280×720 doesn't show the picture.** Below about 770px of viewport height the figure switches to a stacked text view with 14px paper icons. That happened at 1280×760, 1280×740, 1366×657 and 1536×730, which are ordinary laptop windows once browser chrome is subtracted. I saw the full picture at 1280×800, 1280×900, 1440×789 and 1920×960. So the 1280×720 and 390×844 runs below are both the stacked view.

## 1. Beat by beat

Times are figure time. The caption band changes on the beat; each caption fades in over about 0.5 s.

**Beat 1, 0:00–0:11.5. "Ten students in a seminar get the same task."** An "Example task" card types in at the top right: "Recommend a strategy for our partnership with Country A." At 2–3 s, ten blank papers appear in two rows, each with a red dot, labelled "The seminar". From 3.5 s to 7 s a context line types in: "Our trade, its ports, its election, its minerals, a rival's loans." Then nothing moves for about 4.5 s. Clear. I read the dots as students and the papers as their papers. The last 4.5 s felt long for a nine-word caption, but nothing was hard to follow.

**Beat 2, 0:11.5–0:19.5. "Each asks an AI for an outline. The outlines come back alike."** A beige box marked "AI" fades in at the top left (12.5–13). Thin grey lines shoot one by one from each red dot up to the box (13–14.5). They are faint and cut diagonally across the paper rows, so for a second it looks like a tangle rather than "ten students asking". Nothing moves from 14.5 to 16. Then, in about one second (16–17), two things happen together: the AI box gains the line "EVERY OUTLINE OPENS WITH / Counter the rival's influence", and ten identical grey outlines fly down into the papers. One outline passes over that label at 16.0. I caught the label only once the motion stopped, with about 2.5 s left before the caption changed. It's the most important sentence in the figure, and it arrives during the busiest second.

**Beat 3, 0:19.5–0:28.5. "Each writes their own paper. Faculty read each one, and each holds up."** Each red dot runs down the left edge of its paper (21–23), and each grey outline turns into navy ink in a different layout: headings, bullets, a bar chart, a table, dense text, two columns, a pull-quote, a timeline, a map. "ALL DRAFTED WITH AI" appears under the rows (23.5). A navy ring steps across the papers and leaves a tick on each (24.5–27, about a quarter second per paper). The ring moves quickly, but the ticks stay, so the result reads fine. I understood this as "on the surface, ten different papers, all approved". No faculty member is drawn; the ring stands in for the reader. That worked for me.

**Beat 4, 0:28.5–0:42. "Then faculty line up the problem each paper defines."** Each paper's first line gets a box (29.5–30). From 31.5 to 38.5, one first line at a time lifts off its paper, grows into readable text and settles into a list at the right, roughly one every 0.7 s: Outbid rival lenders, Block rival ports, Counter rival media, Undersell rival arms, Undercut rival traders, Outbuild rival roads, Track rival fleets, Outspend rival grants, Contest rival mines, Replace rival cables. While in flight, a line overlaps the ones already landed (at 33.0, "Counter rival media" sits on top of "Block rival ports"), and I couldn't track which paper each line came from. I didn't need to. The full list then holds for about 3.5 s. I could read every line as it landed. This beat works.

**Beat 5, 0:42–0:50. "Different details, one frame: every paper sets out to counter the rival."** The "different details" half is shown by a faint grey highlight that cascades over the last word of each line (lenders, ports, media…) from about 42.6 to 43.2 s. It lasts under a second, and I only found it with `?t=`. Nothing then moves until 46, when an underline runs under "rival" in every line (46–47). A bracket closes around the list, labelled "ONE FRAME: COUNTER THE RIVAL" (47.5). That leaves about 2.5 s to read the label before the caption changes, which was just enough. The "one frame" half lands; the "different details" half doesn't, unless you were already looking at the list.

**Beat 6, 0:50–0:57. "Every AI outline opened with that frame."** The AI box's "Counter the rival's influence" brightens for about half a second (50.7–51.3, confirmed with `?t=`). The bracket turns grey and its label changes to "AI'S FRAME: COUNTER THE RIVAL" (52.5–53). Then nothing moves for 4 s. No line or motion connects the AI box at the top left to the bracket at the right, so the viewer has to make the link. And it isn't news: the AI box has displayed "Every outline opens with: Counter the rival's influence" since 0:16. The caption reads like a reveal, but I'd been told this in beat 2. Was the point that faculty couldn't see the outlines while I could? If so, the figure doesn't say it.

**Beat 7, 0:57–1:04.5. "Imagine the essay's proposal: each student defines the problem first."** The whole first scene shrinks into the upper half and fades to grey (58–59.5). The AI box's text disappears, leaving an empty "AI" box. The first seminar gains the label "AI OUTLINE → WRITE". Below a rule, "The same seminar, imagined" appears with ten blank papers (59.5–60). A red first line is drawn on each, labelled "DEFINE PROBLEM" (61–62.5). Clear: red means the student's own problem statement, written before any AI. During the shrink, the frame label turns into two lines: "ONE FRAME" above, and "COUNTER THE RIVAL   AI'S FRAME" below. That's how it stays to the end (see Problems). "The essay's proposal" means nothing to someone who hasn't read the essay, but the second half of the caption explains it.

**Beat 8, 1:04.5–1:13.5. "Then each asks the AI to challenge it and suggest others, and writes."** Tiny red dashes, copies of the red lines, fly up to the AI box across the dimmed first seminar (65.5–66.6). Nothing moves for 3 s. Then tiny beige chips fly back and land under each red line (69.5–70.5). The label extends to "DEFINE PROBLEM → AI CHALLENGES → WRITE", and the papers fill with ink layouts (71–72), again marked "ALL DRAFTED WITH AI". At this size each paper is about 36 px wide, and the chip is a beige bar with two grey lines and no words. I could see that something came back from the AI, but not that it was a challenge or that it suggested other frames. The caption carries all of that meaning.

**Beat 9, 1:13.5–1:23.5. "These papers hold up too. Faculty line up their problems by frame."** The first seminar returns to full strength (75–76). I didn't know why; it looked as if it was coming back for comparison. A ring ticks each imagined paper (74.5–76). Then, group by group, sets of navy bars appear to the right of the imagined seminar: "COUNTER THE RIVAL" with three bars (78), "BACK THE PARTNER'S GOALS" with four (79), "SECURE WHAT WE NEED" with three (80). Brackets close around each, and "ONE POSSIBLE RESULT" appears above (80.5–81). This reads well as "three frames instead of one, and one of them is still the AI's". Two things I didn't get:
- The bars carry no text. In the first seminar I could read every problem statement and judge for myself that they were one frame. Here I have to take the group labels on trust.
- I couldn't see which paper went to which group.

**Beat 10, 1:23.5–1:30. Faculty check.** "FACULTY CHECK / *What frames are missing across the seminar?*" appears in the caption band at 84. At 86.5–87 the second line, "*Line up each paper's problem, then ask what other frames the task could take.*", fades in, together with a dashed, empty box with a "?" in the open space to the right of the first seminar's bracket. Then the figure rests on this frame. No rush, because the frame stays.

**Stacked view (1280×720 and 390×844).** Same clock, same captions, same hold times. The picture is replaced by labelled text rows:
- the task and context on one card;
- an "AI" bar reading "Every outline opens with: *Counter the rival's influence*";
- two rows of five 14px paper icons for each seminar;
- the problem list in a box labelled "ONE FRAME: COUNTER THE RIVAL", which becomes "AI'S FRAME: COUNTER THE RIVAL";
- the second seminar's three groups as rows ("Counter the rival ▬▬▬", "Back the partner's goals ▬▬▬▬", "Secure what we need ▬▬▬").

It reads cleanly, and the frame label is less ambiguous than on the desktop picture. But the ten different layouts, the visual evidence for "papers look nothing alike", are invisible at 14px. Beat 3 is then carried by the caption alone. At 1280×720 the stacked view sits in a 1040px-wide stage with large empty areas, which looks like a fallback rather than a figure. The "?" is a small dashed square under the first seminar's icons, easy to miss.

## 2. The point

When every student starts from the same AI outline, a seminar can hand in ten papers that each pass and look different but all define the problem the same way. You only see this by setting the problem statements side by side, and asking students to frame the problem before they use AI can widen the range.

## 3. The question a teacher should ask afterwards

"If I lined up the first sentence of every paper in my class, how many genuinely different definitions of the problem would I find, and which reasonable ones would nobody have chosen?"

## 4. The final frame alone

At 1280×900, mostly yes. Side by side I can see:
- the top seminar, labelled "AI OUTLINE → WRITE", ten ticked papers whose ten problem lines are bracketed as one frame;
- the bottom seminar, labelled "DEFINE PROBLEM → AI CHALLENGES → WRITE", ten ticked papers split into three bracketed groups;
- a "?" box beside the single frame;
- the two questions underneath.

It says: same class, same AI, same approval. The order of human framing and AI help changes how many problem definitions the class ends up with, and faculty should look for the ones that are missing.

What the final frame loses or muddles:
- The AI box is empty. "Every outline opens with: Counter the rival's influence" is gone, so the causal link rests on the small tag "AI'S FRAME" and the "AI OUTLINE → WRITE" label. On its own, the empty beige "AI" box at the top left is a stray element.
- The label reads "ONE FRAME" then "COUNTER THE RIVAL   AI'S FRAME", all in the same mono caps. I first parsed it as "counter the rival AI's frame".
- The bottom groups are bars, so the final frame doesn't show that the imagined papers' problem statements actually differ.
- The context card ("its election, its minerals, a rival's loans") quietly makes a strong point: the AI's frame picked one of five context items. Nothing in the figure draws attention to it.

## 5. Problems, ranked

1. **Common laptop windows get the text fallback, not the picture.** Any viewport under about 770px tall switches to the stacked view, including 1280×720, 1366×657 and 1536×730. Most desktop readers on a laptop will see 14px icons and lose beat 3's evidence (ten visibly different layouts). It's the biggest risk to the figure's main idea, "surface variety hides one frame".
2. **The key fact arrives during the busiest second (beat 2, 0:16–0:17).** "Every outline opens with: Counter the rival's influence" appears at the same moment ten outlines fly down, and one flies across the label. About 2.5 s are left to read it. Bring the label in after the outlines land, or hold the beat longer.
3. **Beat 6 is a reveal that has already been revealed, and its picture barely changes.** The viewer has been told since 0:16 that every outline opens with that frame. The beat's visual is a half-second brightening and one word changing on the bracket label, with no link drawn between the AI box and the bracket. Either hold back the AI box's text until beat 6, or animate the connection (for example, the AI line travelling to the bracket).
4. **Ambiguous final label: "COUNTER THE RIVAL AI'S FRAME".** On the desktop picture, after the shrink at 0:58 the label becomes "ONE FRAME" over "COUNTER THE RIVAL   AI'S FRAME". It can be read as "counter the rival AI's frame". The beat list and the stacked view both say "AI's frame: counter the rival", so the desktop picture disagrees with its own description.
5. **"Different details" is shown for under a second (beat 5, about 42.6–43.2).** The faint highlight on lenders/ports/media is easy to miss, so the first half of the caption has no visible counterpart for most viewers.
6. **Beat 8 can't show "challenge it and suggest others".** The AI's reply is a wordless beige chip on a 36px paper. The viewer can't tell a challenge from a rubber stamp. One readable example, even a single enlarged chip ("What about the election?"), would let the picture carry the claim.
7. **The second seminar's problems are bars, not words (beat 9 and the final frame).** The figure asks me to read the first seminar's problems and see the sameness myself, but asks me to take the second seminar's variety on trust. Showing even one readable line per group would make the comparison fair.
8. **The sameness is made trivially easy to spot.** All ten problem lines follow "verb + rival + noun", and the figure underlines "rival". A teacher could come away thinking a shared frame shows up as a shared keyword, and that lining up first lines is a quick scan. The page text below the figure says "telling real frames apart takes reading", but the picture teaches the opposite. That risks being unfair to students, whose real papers wouldn't be this obvious, and it oversells the check.
9. **Ten out of ten is an extreme constructed case.** One AI, ten identical openings, ten students who all keep it. The setup paragraph labels the seminar as constructed, and beat 9's "One possible result" hedges the remedy well. But nothing in the picture hedges the problem side: no "for example", no "could". A sceptical teacher may read it as a caricature of students or of AI. A word like "can" in beat 2 or 5 would help.
10. **Smaller visual ambiguities:**
    - the faint query lines in beat 2 cross the paper rows and briefly look like a tangle;
    - nothing explains why the first seminar returns to full strength at 1:15;
    - "frame" is never defined. It is used as "problem" in beat 4, "one frame" in beat 5 and "problems by frame" in beat 9, so a newcomer has to infer that frame means problem definition;
    - in the stacked view the "?" is a small square that's easy to overlook.
11. **Static stretches.** There's no motion for about 4.5 s at the end of beat 1, 3 s mid-beat 8 and 4 s at the end of beat 6. Not a reading problem, but beat 6 especially feels like waiting.

Nothing was too fast to read as a caption: every caption held 7–13.5 s for 7–16 words. The speed problems are all in the picture.

## 6. Mechanical checks

- **Reduced motion:** passes. `?reduced` at 1280×900, 1280×720 and 390×844, and emulated `prefers-reduced-motion: reduce` at 1280×900, all render the final frame (readout 1:30 / 1:30) with the full Faculty check: "What frames are missing across the seminar? Line up each paper's problem, then ask what other frames the task could take." Beat-list buttons in reduced mode jump to still frames (from the runtime; not separately exercised).
- **Horizontal scroll at 390px:** none. `scrollWidth` = `clientWidth` = 390 at load, at seeks to 0/20/40/60/80/90 s, in reduced mode and at the end of the real-time run. No element extends past the viewport.
- **Keyboard:**
  - Tab order after the header links is Play/Pause, then Restart, then the scrubber, then the ten beat-list buttons. All have a visible 2px solid focus outline.
  - Enter or Space on the toggle pauses and plays.
  - On the scrubber, ArrowRight moves 1 s, Shift+ArrowRight 5 s, End jumps to 1:30 (label becomes "Replay") and Home returns to 0:00.
  - Enter on Restart replays from 0:00.
- **Numbers in the figure:**
  - The only numbers in the animation are 10 students, the 3 / 4 / 3 split of the imagined groups, the step count ("1 / 10") and the runtime. They are constructed and labelled as such ("a constructed example"; "One possible result"), so no source is needed.
  - The page around the figure has "Failure mode 6 of 7", section numbers (II, VIII, IX), publication years, and "across thousands of simulations" in the Evidence list. The essay and source-spine check for these is in the next section.

## 7. Source check (done after writing the read above)

Checked against `nwc-irreducible-officer-companion/sources/source-spine.md`, `the-irreducible-officer.md` and, for one sentence, `labs/failure-mode-lab/cases.md`.

**These match:**
- **Essay quote.** The "From the essay" blockquote matches Section II's institutional monoculture paragraph exactly once link markup is removed. I checked this programmatically.
- **"Failure mode 6 of 7".** Section II lists frame capture, fluency substitution, premature synthesis, uncalibrated reliance, invisible delegation, institutional monoculture, responsibility laundering. Monoculture is sixth of seven.
- **Section VIII.** The essay says frame evidence covers the problem frame, key assumptions, criteria for success, evidence standard and the role AI played, and calls it "a page, not a portfolio". The page reports this correctly.
- **Section IX, steps one and two.** Step one is an "unaided problem frame… without AI". In step two the AI is asked to "identify the assumptions I may have missed, generate alternative frames…". Beat 7 ("each student defines the problem first") and beat 8 ("asks the AI to challenge it and suggest others") are fair to these two steps.
- **Romasanta, Thomas & Levina (HBR 2026).** The page's summary ("thousands of simulations", differentiation, augmentation, collaboration, and the "practitioner article; methods visible only through the authors' summary" caveat) matches the spine.
- **Doshi & Hauser (2024), Kim, Garg, Peng & Garg (ICML 2025) and Jiang et al. (NeurIPS 2025).** All match the spine, including the "stories, not strategies" limit and "asking a second model is not an independent check".
- **Terwiesch et al. (POM 2026).** The finding and the line "sameness being the default, with deliberate design needed to escape it" match the spine.
- **Deng, Brucks & Toubia (2026) and Murthy, Ullman & Hu (2024).** The page's one-line summaries match the essay's wording. The spine is a little softer on Deng ("may occupy a narrower conceptual distribution").
- **The "fair objection" sentence.** It matches the failure-mode lab's review note in `labs/failure-mode-lab/cases.md` (line 75): convergence may reflect a justified shared purpose or strong evidence, and difference is not inherently better.

**Worth flagging:**
1. **Vendrell & Johnston and "epistemic narrowing".** Only the essay attributes the "epistemic narrowing" framing to this paper. The spine describes the paper as supporting design logic (productive struggle, AI-free and AI-mediated phases, assessment aligned to reasoning) and never mentions epistemic narrowing. The spine credits Chow et al. with a different term, "epistemic confinement". The page already hedges with "whose work the essay describes as…", but this is the one study claim I'd check against the paper itself.
2. **Terwiesch is filed as counter-evidence in the spine** ("Counter-evidence: Terwiesch et al."). The page lists it under studies that "point the same way, within limits". The sentence describing the study is accurate, but the heading over the list puts it on the wrong side.
3. **"Workplace studies" is loose.** The spine section is headed "Workplace Evidence", but Doshi & Hauser is a story-writing experiment and Kim et al. and Jiang et al. are model-benchmark studies, not workplace studies. "Studies the essay doesn't cite" would be accurate.
4. **The essay doesn't present the pilot as a remedy for monoculture.** Section IX says the pilot "tests whether students can own a problem frame before they scale judgment through AI". Nothing in the essay says steps one and two widen a seminar's range of frames. Beats 7–9 make that link. The page text below the figure is candid ("No source has tested whether that spreads a seminar's frames"), and beat 9 has "One possible result". But a viewer who watches without reading on will take the second half as the essay's answer to this failure mode.
5. **Numbers in the animation** (10 students, 10 identical outline openings, the 3 / 4 / 3 split) aren't in the spine or the essay. They're constructed, and the page says so. No issue beyond Problem 9 above.
