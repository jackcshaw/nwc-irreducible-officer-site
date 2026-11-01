# Cross-figure consistency: figures 1–3

October 28, 2026. This review covers frame capture (FC), fluency substitution (FS) and premature synthesis (PS) as one family. I read each page, its JS, storyboard and stills, and CONVENTIONS.md. I ran each figure in Playwright at 1440×900 and 390×844, plus 1280×720 (the short laptop window CONVENTIONS uses for figure 4). At each size I swept the whole run in 0.5 s steps to see what the stage hides and whether the controls move. Each figure's own point is out of scope; it passed its cold reads.

## Shared conventions as built

"≠ CONV" marks a row where CONVENTIONS.md disagrees with the builds or is silent.

| Convention | FC | FS | PS | Note |
| --- | --- | --- | --- | --- |
| Grey = AI-supplied | Frame, title, headings; band | Drafts, cut line; band | Lines, "AI'S MAP", AI steps; no band (labels, not AI text) | Consistent |
| Red = a person | Change bars, CHOSEN, touch marks, draft label | Strike, note, own answers, key "A STUDENT'S OWN WORK" | Own lines, ✕, learned note, TRIES | ≠ CONV: says "what a person decided". All three also use red for a person's own work (FS note and answers, PS learned note). Reword to "decided or did themselves". |
| Navy = ink | Yes | Yes | Yes, but PS dims sketch lines to 40%, which reads light grey | Fix PS 3 |
| Person labels | Red Sans 600 13 "Student", "Another student" | Red Sans 600 13 "Student", then "First student", "Second student" | Red Sans 600 13 "Student", "Second student"; final rows ink mono "FIRST STUDENT" | ≠ CONV: says Sans labels are 15 units. Person labels are 13 everywhere. CONV doesn't say how to name the two students. FS, UR and ID say first/second; FC says "another". |
| Students named in the final frame | No red names; ink mono "FROM THIS STUDENT", "FROM ANOTHER STUDENT" | Red dot and red name heading each column | Ink mono row names; PS's own phone stage uses red "● First student" | CONV says a red mark is "named by a red label in the final frame". Only FS does that. |
| Dots | r 5, red | r 5, red | r 5, red | Consistent |
| Task card | Top right, Serif 16, label full ink | Top left (heads the table's label column), Serif 15 | Top right, Serif 16, label at 65% | ≠ CONV: silent on position. Across all seven built so far: top left in FS, UR, ID, RL; top right in FC, PS, IM. |
| Caption band | Runtime: "n / N" counter, 136 px on desktop | Same | Same; 160 px fixed on phones | Desktop consistent. Phones: only PS fixes the band height. |
| Caption lead-in | 1.0 s every beat | 1.0 s | 1.0 s | Consistent |
| Holds after last movement | ≥ 1.5 s | ≥ 1.5 s | ≥ 1.5 s except beat 4: the dot returns home at 35.0–35.6, 0.8 s before beat 5 (storyboard had 1.5 s) | Minor; not on the fix list |
| Final check | Verbatim; follow-up at equal size 3.6 s later; 3.1 s rest | Same; 3.5 s; 3.7 s | Same; 3.3 s; 3.4 s | Consistent on desktop. At 390 px: FC 22 px, FS and PS 20 px. |
| Key | "AI-SUPPLIED" swatch during the wipe, then gone | Persistent "WRITTEN BY AI" and red "A STUDENT'S OWN WORK" | None (every grey and red item has a word beside it) | ≠ CONV: names only "AI-SUPPLIED". Swatch geometry matches (18×12, band fill, grey stroke). Different words fit different jobs; no fix. |
| Disclosure | None (invisibility is the point) | "· DRAFTED WITH AI" | "AI HELPED CONNECT THE READINGS", "BOTH SAY AI HELPED" | Consistent with "drain only when invisibility is the point" |
| Faculty question in picture | Mono over Serif italic 24 | Mono over Serif italic 16 | Mono over Serif italic 17 | Acceptable; FC has one question, the others two |
| Smallest picture text | 11.2 units (paper headings at 80%), mono 12 | 12.4 (paper), mono 12 | Mono 12 | ≠ CONV: "12 units, never smaller"; FC breaks it. UR moved to 13 so the stage survives 1280×720. At 1280×720 (scale 0.911) legibility() hides 27 FC, 13 FS and 40 PS labels. |
| Narrow stage trigger | None: phone shows the SVG with all 51 labels hidden | Stacked below 480 px | Stacked below 480 px | ≠ CONV: UR, ID and RL switch to stacked whenever a label would vanish (`syncStacked`). FS and PS still use the 480 px media query. |
| Controls on phones (390×844) | Move 89 px (band 77–166 px) | Move 289 px (stage 300–528, band 77–157) | Fixed (stage 476, band 160) | CONV (PS) says fix both heights. Only PS does. |
| Poster | None: blank stage until play | None: blank stage until play | Beat 1 settled | ≠ CONV: calls the poster optional. Every figure since PS uses one (UR, ID, IM, RL). |
| Autoplay | On scroll-in | On scroll-in | On scroll-in | Consistent |
| Kicker, title, links | "Failure mode 1 of 7"; book, Practice, essay | Same pattern | Same, plus a Section VI quote and link | Consistent; book spread numbers check out (2, 5, 4) |
| Setup paragraph | 5 sentences, 73 words, says "pause it" | 7 sentences, 99 words, says "pause it" | 4 sentences, 57 words | ≠ CONV (PS rule): about four sentences, no "pause it". FC and FS predate the rule. |
| Page "Faculty check" section | Check, follow-up, then "Both students… The second line separates them." | Check, follow-up, then essay citations only | Same as FC | FS is missing the separating sentence |
| Duration and beats | 85.6 s, 11 beats | 88.6 s, 10 beats | 90.0 s, 10 beats | ≠ CONV: says FS has 9 beats |
| Voice | Plain; one "another student" | Plain; setup hedge "it isn't what happens to every student…" | Plain | No "X, not Y" openings in any caption |

## Fix list

Ranked within each figure. Each item is a mismatch a reader would see when moving between figures. New copy should go through `writing-as-jack`. After any change, rerun `scripts/figure-shots.mjs` and update the storyboard's cast table and page-copy section.

### Frame capture (7)

1. **Add a poster.** In `frame-capture.js`, change the `mount` call to include `poster: BEATS[2].at - 0.02`. That shows the task, the student and the six dashed considerations, the setup before anything goes wrong. Today the stage is empty until it plays; every later figure shows a settled frame.
2. **Use the family's names for the students.** In `frame-capture.js`, change `dotBLabel` from 'Another student' to 'Second student'. Change beat 8's caption to "A second student, also working with AI, weighs all six and chooses this frame." Update the "On screen" text for beats 7–9 ("labelled Second student"; "From the first student" / "From the second student").
3. **Name both students in red in the final frame.** Replace the ink mono `deskLabels` line "FROM THIS STUDENT" (DX+40, 52) and `labelB` "FROM ANOTHER STUDENT" (DX+356, 52) with red Sans 600 13 "First student" and "Second student". Show "First student" from `T.dotB`, fading out the old label first as FS's `swapTag` does, and "Second student" at `T.labelB`. Keep "WHAT FACULTY RECEIVE" above. Use no extra dot, because each student's dot already sits in its strip.
4. **Keep labels at short laptop windows.** At 1280×720 the stage scales to 0.911, and 27 labels vanish: every chip name, "EXAMPLE TASK", "AI'S FRAME", "CHOSEN" and "SET ASIDE". Raise all picture text to at least 13 units, as UR does:
   - `mono()` from 12 to 13;
   - `STRIP_S` from 0.8 to 0.87, so strip chips render at 13;
   - `PH_FS` from 14 to 16.3, so paper headings at 80% render at 13 (today they're 11.2, under the stated floor).

   Recheck the chip widths in strip B.
5. **Shorten the setup.** In `index.html` `.fig-setup` (and storyboard §6), delete "The figure runs under a minute and a half; pause it or step through the beats below."
6. **Keep the phone controls still.** In `index.html`, add `@media (max-width: 480px) { #frame-capture .mf-caption { min-height: 166px; } #frame-capture .mf-check-q, #frame-capture .mf-follow.is-equal { font-size: 20px; } }`. The 166 px is the check's measured height, so the band stops growing at beat 11. The second rule matches the check size on FS and PS phones. Better still, move the 20 px rule into `figures.css` and delete it from FS and PS.
7. **Decision for Jack (lowest; desktop-first).** On a phone, FC is the only figure whose stage has no words: all 51 labels are hidden and the beat list carries them. Either build a stacked stage like FS and PS, toggled by `syncStacked` (this would also cover item 4 at very short windows), or record FC as the exception in CONVENTIONS.

### Fluency substitution (7)

1. **Add a poster.** In `fluency-substitution.js`, change `mount` to include `poster: BEATS[1].at - 0.02` (the task and the student). Today the stage is blank before play.
2. **Add the separating sentence to the page's check section.** In `index.html` `.fig-follow`, start with "Both students in the figure explain the call clearly without the paper. The second line separates them." Then keep the Section VIII and IX sentences. FC and PS both say this.
3. **Shorten the setup** (99 words, the longest of the three):
   - Delete "It runs about a minute and a half; pause it or step through the beats below."
   - Replace "The figure shows that risk; it isn't what happens to every student who agrees with an AI." with "Not every student who agrees with an AI fails this way." This keeps the storyboard's guard against misread 12, without the "X; not Y" turn.
4. **Show the stacked stage instead of losing labels at short windows.** At 1280×720, 13 labels vanish: row labels, both tags, the key and "EXAMPLE TASK". Adopt UR, ID and RL's `syncStacked`: a ResizeObserver toggles `.is-stacked` when `12 × letterboxed scale < 11`, and `syncNarrow` and the `@media (max-width: 480px)` selectors move onto `#fluency-substitution.is-stacked`. Check the stacked stage at 1040 px wide; UR adds wide-stacked sizes. The smaller alternative is to raise mono to 13 and `SMALL` to 0.65. That keeps the SVG at 1280×720 but not in shorter windows.
5. **Keep the phone controls still.** During play the narrow stage grows from 300 to 528 px and the caption band from 77 to 157 px, so the controls travel 289 px. At ≤ 480 px, set `.fs-narrow { min-height: 528px }` and `.mf-caption { min-height: 160px }`, as PS does. The final player then measures about 807 px, which fits 844.
6. **Match the narrow-stage label sizes.** `.fs-n-label`, `.fs-n-act`, `.fs-n-who` and `.fs-n-key` are 12 px (letter-spacing 0.08em on labels). Change them to 13 px and 0.04em, as in PS's narrow stage and CONVENTIONS' 13–16 px rule.
7. **Task card type.** Set the three task lines at Serif 16 on a 20-unit step (56, 76, 96), as in FC, PS and ID. The card stays top left; see the conventions below.

### Premature synthesis (4)

1. **Name the students in red in the final frame.** In `premature-synthesis.js` `rowLab`, change 'FIRST STUDENT' (24, 280) and 'SECOND STUDENT' (24, 446) from ink mono 12 to red Sans 600 13 "First student" and "Second student". This matches FS, PS's own phone stage and PS's storyboard colour rule ("the dots and their name labels" are red). The sequence lines under them stay mono.
2. **Show the stacked stage instead of losing labels at short windows.** At 1280×720, 40 labels vanish: card and sketch numbers, row names, both sequences, "THEN THEY ASK" and "WHAT THEY LEARNED". The fix is the same as FS 4: `syncStacked` toggling `.is-stacked`, with the 480 px rules moved onto it. If you raise mono to 13 instead, check that "READ → TRIES → AI CHECKS → WRITES" still clears the dot at x 310.
3. **Keep the sketches navy while faculty point.** The four lines that aren't pointed at dim to 40% ink, which renders as light grey (about #989ea6), the family's colour for AI. Dim them to 60%, or keep full ink and thin them to 1.2, so only 2–5's weight and ring change.
4. **Task card label at full ink.** Drop `'fill-opacity': 0.65` from the "EXAMPLE TASK" mono (line 126). It's the only figure that fades it.

Not on the list: PS beat 4's 0.8 s hold after the dot returns home, a small slip a reader is unlikely to feel.

## Conventions for the remaining five

For `uncalibrated-reliance`, `invisible-delegation`, `institutional-monoculture`, `responsibility-laundering` and `appropriate-reliance`. Most of these are already true of the four in progress. They should go into CONVENTIONS.md.

- **Name people the same way.**
  - Red Sans 600 13, beside the dot: "Student" while there's one, then "First student" and "Second student". Never "another student".
  - In the final frame, name each person once in red, as a column or row head.
  - Ink mono is for things ("FIRST STUDENT'S BRIEF"), not people.
- **Colour.** Grey on the `#ded5c4` band marks words the AI supplied. Red marks a person's decisions and own work, plus their names. Everything faculty see or hear is navy unless the words came from the AI. Don't dim navy below about 60%, or it reads as grey.
- **Picture text at least 13 units** (UR). Toggle a stacked stage with `syncStacked` whenever the smallest text would render under 11 px at the letterboxed scale (UR, ID, RL already do).
- **Phones.** Give the stacked stage a fixed height (its tallest moment) and fix the caption band height (160 px; 166 px if the check needs it). Set the check at 20 px. The whole final player should fit 844 px, with narrow text at 13–16 px.
- **Poster.** Use the settled setup beat (task and people, before the AI acts): `poster: BEATS[n].at - 0.02`.
- **Task card.** Paper-bright card with a 15% hairline. Full-ink mono "EXAMPLE TASK", then Serif 16 task lines on a 20-unit step. Place it top left by default, top right only when the student's work fills the left column from beat 1. It never moves.
- **Key.** Show a key in the final frame when a colour carries meaning with no word beside it. Grey: 18×12 band swatch with grey mono words naming what the AI did. Red: r 5 dot with red mono words.
- **Final check.**
  - Use `check.follow` without `followLabel`, appearing 3.3–3.6 s after the check, with at least a 3 s rest.
  - On the page, two `.fig-check` lines, then a `.fig-follow` that says why the second line separates the two students.
- **Page.**
  - Kicker "Failure mode N of 7". Figure 8 needs its own kicker, such as "The competency"; Jack's call.
  - Setup in about four sentences, ending on the constructed-example sentence, with no "pause it".
  - Links in this order: book chapter; Practice ("test … with your AI assistant"); essay section or sections.
- **Timing.** The caption changes, then nothing moves for 1.0 s, and at least 1.5 s of stillness follows the last movement, small returns included.
- **Speech panels.** Rounded 8, 25% ink border, Serif 15–16, words in quotation marks. Both people speak at the same pace (about 3 words a second).
