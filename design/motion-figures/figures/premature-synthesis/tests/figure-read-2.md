# Cold read: premature synthesis, figure, round 2

Tester: cold-read agent, first-time viewer. I had not read the essay, the storyboard or the earlier tests.
Material: `figures/premature-synthesis/index.html`, served locally on port 5243.
Method: Playwright (Chromium) at 1280×900 and 390×844. I scrolled the figure to the top of the viewport, pressed Restart, and captured a frame every 0.5 s for 93 s (187 frames per size). I logged the caption, clock and panel height on every frame and looked at the frames in order on contact sheets. I also held key moments with `?t=` (13, 23.5, 35, 41, 44, 63.5, 82.5) and checked `?reduced`, `prefers-reduced-motion`, keyboard access, and overflow at 390 px.

Caption timings were the same at both sizes:

| Beat | Starts | Shown for | Caption |
|---|---|---|---|
| 1 | 0:00 | 7.0 s | A student must connect six readings in a seminar paper. |
| 2 | 0:07 | 8.5 s | The student reads all six closely, then asks an AI to connect them. |
| 3 | 0:15.5 | 9.5 s | The map makes sense to the student, who writes the paper from it. |
| 4 | 0:25 | 11.5 s | A second student reads them just as closely, then tries connections first. One doesn't hold. |
| 5 | 0:36.5 | 9.5 s | That student then asks an AI too and checks its map against their own. |
| 6 | 0:46 | 7.0 s | That student writes their own paper. Both make the same argument. |
| 7 | 0:53 | 8.0 s | Without the papers, both students sketch the same connections. |
| 8 | 1:01 | 12.0 s | Faculty ask about the main connection. The first student recalls Reading 1 but can't apply it. |
| 9 | 1:13 | 10.5 s | The second student applies it, from the connection that didn't hold. |
| 10 | 1:23.5 | to the end | Faculty check: Can the student explain why these connections matter? (second line added at 1:27) Point to one connection. What evidence would change it? |

Every caption runs 9 to 17 words and stays up for at least 7 s, so I could read each one comfortably at both sizes. No caption changed before I'd finished it. The timing problems are in the order of caption and picture, and at the start of the run. Captions themselves are not too fast.

## Autoplay

- **1280×900:** it autoplays on load, as soon as the figure scrolls into view. On this viewport that happens immediately, because the top 500 px of the 720 px stage are already showing. But the caption band (y ≈ 980–1116) and the controls sit below the fold. Eight seconds after load, a viewer who hasn't scrolled sees cards appearing and a dot moving, with no caption and no Pause button.
- **390×844:** it also autoplays on load. The "1 / 10" label and the first caption line peek in at the bottom edge, the second line is cut off, and the controls are below the fold.
- Autoplay waits for the figure to be visible. At 1280×300 and 390×400, where the figure starts off-screen, it stayed on Play at 0:00 until I scrolled to it, which is good. The trouble is that at the two target sizes it already counts as visible while its caption doesn't.

## 1. Beat by beat (1280 unless noted)

**Beat 1 (0:00–0:07).** A task card fades in at the top right: "Example task: Using the six readings, explain when a blockade works." A red dot labelled "Student" appears, then six numbered cards arrive one by one: 1 Northern blockade, 2 Island blockade, 3 Trade routes, 4 Allies split, 5 Long blockade, 6 Coercion theory. It was clear: here's an assignment and its readings, and nothing is connected yet.

**Beat 2 (0:07–0:15.5).** The "Student" label drops and the dot visits each card in turn, leaving a double underline under each one. I read the underline as "read it." Each card gets about half a second, so "closely" is asserted more than shown, but the same speed is used for the second student, which keeps it fair. Then five grey dashed lines appear almost at once (1–4, 4–6, 3–4, 3–5, 2–5), and a small "AI'S MAP" label follows a second later. No AI figure is ever drawn: the lines just appear. The dashes and the label were enough for me to read the lines as machine-made.

**Beat 3 (0:15.5–0:25).** The dot traces each dashed line, which turns solid as it passes. I read that as "the student follows each connection and accepts it," which matches "makes sense to the student." Then a paper slides in on the left: "First student's paper. Blockades work once supplies run out." It has three cited paths ("2 · 5", "3 · 4 · 5", "1 · 4 · 6") and a footer, "AI HELPED CONNECT THE READINGS." That reads as honest use, not cheating. **At 1280 nothing marks 2–5 as the main claim.** It's just the first item in the list. (The 390 view says "Cites 2·5 (main claim)" and "The paper's main claim rests on 2–5.")

**Beat 4 (0:25–0:36.5).** The caption changes about a second before the picture does: the AI lines stay up until 0:26, then clear. A "Second student" dot appears and reads all six cards at the same pace. This time red solid lines are drawn one by one (2–5, 3–5, 1–4, 4–6), and I read red as "the student's own." At 0:32 a fifth red line goes from 1 to 2, card 2 gets a highlight box (checking it), an ✕ lands on the line, and an italic red note types in: "In Reading 1, the country found another supplier." The line then disappears, leaving the ✕ and the note. I followed it: the student tried a link, checked the readings, and dropped it. The first paper stays on the left throughout, which helps with comparing the two students later.
- Slight hesitation: why does "another supplier" break the link between the northern and island blockades? I worked out that Reading 1's blockade didn't cut off supply, so it isn't the same kind of case as Reading 2. A teacher with no blockade background has to stop and think, and the ✕, the note and the removal all happen within about three seconds. The note stays on screen, so it can be reread.

**Beat 5 (0:36.5–0:46).** Grey dashes appear over the four red lines, plus one new grey dashed line from 3 to 4. The "AI'S MAP" label returns. At 0:41.5 the four matching red lines flash thicker. The dot then visits cards 3 and 4 (each highlighted), and the 3–4 line turns red.
- **Ambiguity:** at normal size, the AI's four matching lines read as a faint striped texture on the red lines, not as "the AI drew these too." On first watch I thought the AI had added just one line (3–4). Only by holding `?t=41` and zooming in could I see that all five are there. The phone version spells it out: "AI's map: the same five lines. … Four match their own. Nothing at 1–2. They check 3–4, then keep it." The desktop picture has no such text.
- The second student's final map includes a connection the AI found (3–4). I liked that. It keeps the figure from treating AI as the villain.

**Beat 6 (0:46–0:53).** A "Second student's paper" is written under the first. It's identical: same title, same three cited paths, same "AI HELPED CONNECT THE READINGS" footer. At 0:51 everything except the two papers clears, and a label appears: "WHAT FACULTY RECEIVE · SAME ARGUMENT, OWN WORDS." Very clear: on paper you cannot tell these two students apart.

**Beat 7 (0:53–1:01).** The papers shrink into thumbnails at the top left. The label grows a third line, "BOTH SAY AI HELPED," and new text arrives: "FACULTY ASK, PAPERS ASIDE: Sketch how the readings connect." Two rows are labelled "FIRST STUDENT: READ → AI CONNECTS → WRITES" and "SECOND STUDENT: READ → TRIES → AI CHECKS → WRITES," with "TRIES" in red. Each student then draws a small node sketch from memory, and the two come out identical. The idea landed: the oral sketch doesn't separate them either.
- This is the densest moment. Between 0:54.5 and 0:56.5, roughly 30 words of small mono labels appear while the papers are moving and the sketches start drawing. Meanwhile the caption says "Without the papers," yet the papers are still on screen as thumbnails. I understood "papers set aside," but the picture literally keeps them.

**Beat 8 (1:01–1:13).** "THEN THEY ASK: What evidence would change this connection?" appears at 1:02, and at 1:03 a ring marks the 2–5 line in both sketches. The caption has already told me "The first student recalls Reading 1 but can't apply it," 5.5 s before the first student's speech bubble starts typing at 1:06.5. The bubble finishes at about 1:11.5: "In Reading 1, they found another supplier. I don't see how that bears on this." That leaves about 1.5 s with the full quote showing before the caption moves on. The quote stays on screen, so nothing is lost, but the caption spoils the answer before the picture gets there.
- "The main connection": on desktop this is the first time 2–5 is called "main," and only the caption says so. The ring tells me which connection is meant, but nothing on the desktop screen had told me 2–5 carried the paper.

**Beat 9 (1:13–1:23.5).** Again the caption leads. "The second student applies it, from the connection that didn't hold" arrives 3.5 s before the picture adds "WHAT THEY LEARNED ✕ In Reading 1, the country found another supplier" under the second row at 1:16.5. The second bubble types from 1:17.5 to about 1:22: "Another supplier, as in Reading 1. My main claim rests on there being none." The ✕ ties back to beat 4, and I got it: the dead end taught them the fact that matters. Both students know the fact. Only one can say what it does to the claim.

**Beat 10 (1:23.5–1:30).** The caption becomes "FACULTY CHECK: Can the student explain why these connections matter?" and the second line follows at 1:27: "Point to one connection. What evidence would change it?" The picture holds.

**390 px differences.** Below 480 px the picture is replaced by a stacked text panel driven by the same clock. It has a task card, reading chips, connection chips (dashed grey for AI, solid red for own, a struck "1–2 ✕"), paper cards, then text lines such as "Read → AI connects → writes / Sketch: 1–4 · 4–6 · 3–4 · 3–5 · 2–5," and labelled speech boxes. It is legible (13–16 px) and in places clearer than desktop: it says "main claim" and "Four match their own." Three things go wrong at this size:
- **The reading names leave the screen from beat 3 (0:15.5) onward.** From then on, connections are bare number pairs ("2–5," "pointing to 2–5"). I had to remember that 2 is the island blockade and 5 the long blockade.
- **The panel changes height, so the caption and controls jump.** Its height goes 396 → 445 px at beats 4 and 8, and it grows again while the first student's quote types (+40 px at 1:06.5, +15 px at 1:09). At 1:23.5 it reaches 702 px, pushing the controls about 300 px down. The caption I was reading moved under my eye three times in beat 8.
- **For about 3 s at the start of beat 7 (0:53–0:55.5) the panel is nearly empty,** just one line: "Papers set aside: same argument, own words. Both say AI helped."
- Also: the beats list under the figure says "On screen: a task card appears at the top right … A red dot labelled Student appears on the left." Neither is true at 390 px.

## 2. The point

Two students can hand in the same AI-assisted paper and even redraw the same map from memory, but only the one who tried and broke connections before asking the AI can say what evidence would knock out the connection the argument rests on.

## 3. The question a teacher should ask afterwards

"Which connection does your argument lean on most? What would you have to find in the readings to give it up, and did you try any link along the way that turned out not to hold?"

## 4. The final frame alone

**1280.** It carries most of the idea without the animation:
- two identical sketches, labelled with two different processes ("AI connects" against "tries → AI checks");
- the same ring on 2–5 in both;
- two answers side by side;
- a red ✕ note under the second student, tying their answer to something they ruled out;
- the two faculty-check lines.

To me it says: same map, different ownership, and the question "what would change it?" is what reveals the difference.

What it doesn't carry on its own:
- the names of readings 2 and 5 (only numbers);
- that 2–5 is the paper's main claim (only the second student's quote says so);
- that the ✕ note records a failed connection attempt. Someone who missed beat 4 sees a red cross and a sentence.

It is also dense: about 80 words of labels plus two quotes plus the check.

**390.** The final state is a text transcript with no picture. It carries the argument in words, and the "what they learned" line is stated outright. But it has no reading names, and "WHAT THEY LEARNED" sits below both answers, so "they" could mean either student.

## 5. Problems, ranked

1. **The run starts out of sight (too fast / rushed).** At 1280×900 the figure autoplays on load with its caption and controls below the fold. At 390×844 the caption is cut in half at the bottom edge and the controls are hidden. A teacher reading the 90-word setup paragraph first (about 25 s) misses beats 1–2 and part of 3. The paragraph's own instruction, "pause it or step through the beats below," points at a button they can't see.
2. **The decisive test may look rigged, which is unfair to the first student.** The evidence that "would change" the claim "Blockades work once supplies run out" is "another supplier." That is close to the claim's literal negation. A sceptical teacher will think any student who read closely would see it, so the first student comes across as careless rather than as someone who inherited a map they can't reason with. The figure's contrast depends on this moment, and it's the least convincing one.
3. **On desktop, "the main connection" is never set up (caption doesn't match the picture).** Beat 8's caption refers to "the main connection," but at 1280 neither paper marks 2–5 as the main claim. It's just the first of three cited paths. The 390 view does mark it ("Cites 2·5 (main claim)").
4. **On desktop, "four match" is nearly invisible (ambiguous visual).** In beat 5 the AI's four matching lines show up only as a striped texture on the red lines, so it reads as if the AI added one line (3–4). There's no on-picture text, unlike the phone version ("Four match their own. Nothing at 1–2.").
5. **In beats 8 and 9 the caption gives away the picture (order reversed).** The captions state the outcome 5.5 s and 3.5 s before each quote begins typing. Each quote takes about 5 s to type and is complete for only about 1.5 s before the next caption arrives. The quotes stay on screen, so nothing is lost, but I read the verdict before the evidence.
6. **Beat 7 is dense, and its caption contradicts the picture.** About 30 words of small labels arrive in about 2 s while papers move and sketches draw. The caption says "Without the papers" while both papers stay on screen as thumbnails.
7. **On phone, the caption and controls jump.** The panel grows at beats 4 and 8, during typing in beat 8, and to 702 px at the end. The caption shifts while being read, and the controls move about 300 px at the finish, out from under a thumb.
8. **On phone, the reading names disappear from beat 3 onward.** Connections become number pairs ("pointing to 2–5"), which makes the final answers harder to judge.
9. **Small items:**
   - Reading "closely" is drawn as about 0.5 s per card.
   - "WHAT THEY LEARNED" is ambiguous on phone.
   - The 390 beats list describes "top right" and a "red dot" that don't exist at that size.
   - At the end, "Replay" and "Restart" sit side by side and appear to do the same thing.
10. **Factual claims I'd want sourced (page text, not the figure):**
    - "Failure mode 3 of 7";
    - "In the essay's oral defense (Section IX), faculty ask what evidence would change the recommendation";
    - the two block quotes attributed to Sections II and VI.

    I checked these after writing, and all four are confirmed against the essay (details under the last mechanical check below). The figure's own counts (six readings, five connections, four matches) belong to the stated constructed example and need no source.

**Fairness to AI.** The figure is fair. The AI's map is correct, both students disclose AI help, and the stronger student keeps a connection the AI found. The figure faults when the AI is used, not the AI.

## 6. Mechanical checks

- **Does reduced motion show the final frame with the full text?** Yes. `?reduced` and `prefers-reduced-motion: reduce` both open on the final frame at 1:30 / 1:30, with both faculty-check lines, both quotes and the "what they learned" note, at 1280 and 390. The clock does not advance, and the button reads "Play." The beats list below expands with an "On screen:" description for each beat.
- **Any horizontal scroll at 390 px?** No. `scrollWidth` stayed at 390 across 20 scrub positions covering the whole run, and no element extends past the viewport.
- **Can you reach play, pause and scrub by keyboard?** Yes. Tab order is: brand link, Essay, Practice, Play/Pause toggle, Restart, scrub. Each control shows a solid 2 px navy focus ring.
  - Space paused and Enter resumed.
  - On the scrub, ArrowRight steps forward about 1 s, PageUp about 9 s, and End / Home jump to the end and start. Scrubbing pauses playback.
  - The scrub has an `aria-valuetext` like "0:00 of 1:30, beat 1 of 10."
  - Each beat in the list below contains a button for stepping to that beat.
- **Is every number shown found in source-spine.md or the essay?** Checked after writing the read above:
  - In the figure, the counts (6 readings, 5 connections, 4 matches, 10 beats, 1:30, the reading numbers) all belong to the stated constructed example, so they need no source.
  - The page text's numbers all match `the-irreducible-officer.md`:
    - **"Failure mode 3 of 7":** confirmed. Section II names seven failure modes (frame capture, fluency substitution, premature synthesis, uncalibrated reliance, invisible delegation, institutional monoculture, responsibility laundering), and premature synthesis is third.
    - **Section II block quote:** verbatim match, under the heading "II. What the Problem Looks Like."
    - **Section VI block quote:** verbatim match, under "VI. Friction as Developmental Design."
    - **"In the essay's oral defense (Section IX), faculty ask what evidence would change the recommendation":** confirmed. Section IX, step five, the oral defense, includes "what evidence would change the recommendation." The figure's "What evidence would change it?" applies that question to a single connection, and the page says so honestly; it does not attribute that wording to the essay.
  - I found no number that lacked a source. `sources/source-spine.md` didn't need consulting, because the figure makes no empirical or statistical claims.
