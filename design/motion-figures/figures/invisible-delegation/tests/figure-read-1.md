# Figure read, round 1: Invisible delegation

Cold read of `figures/invisible-delegation/index.html`. I served it locally and watched it in Playwright at 1280×900 and 390×844, scrolled into view so it autoplayed. I captured a frame every 0.5 s across the whole 1:36 run (196 frames on desktop, 195 on phone) and looked at them in order. I also logged the caption text at every frame and held key moments with `?t=` (18.5, 22, 47, 55.2, 60.5, 76.5). Then I checked `?reduced` at both widths and tried the controls by keyboard. Timings below are figure time in seconds.

I didn't open the storyboard, the other test files, the shots folder or any other figure before writing this. I hadn't read the essay. I saw the page's own setup paragraph above the figure, as any visitor would.

## 1. Beat by beat (desktop, with phone differences noted)

**Beat 1 (0–8.9) "A student wants to improve a draft strategy paper."**
The example task card fades in (1–1.5), then "First student" with a small red dot to its right (2), a draft-paper thumbnail (2.5) and the rubric line "Evidence must back the call." (3–3.5). Then nothing moves for about 5 s. The caption is easy to read. I wasn't sure what the red dot was: it looks like a bullet or a status light. Only once it starts moving in beat 3 does it become "the student's hand".

**Beat 2 (8.9–16.9) "Improving it takes many decisions. We'll track three."**
Three lane headers appear: THE STUDENT DECIDES (red), REQUESTS, THE AI DECIDES (9.9–10.4). Then three dashed cards appear in the student's lane, one at a time: "The criteria", "How the argument runs", "What 'strategic' means" (10.9–11.9). Empty slots appear in the AI lane (12.4), followed by a 4.5 s hold. This is clear, and the empty slots set up the idea of "where these could go". The REQUESTS lane stays empty here, which is fine.

**Beat 3 (16.9–28.1) "The student asks an AI for feedback. The request carries the criteria across."**
A "Give me feedback" bubble pops out of the dot and clips onto the criteria card (18.3). After a 3 s pause, the bubble and card glide across REQUESTS into the AI lane together (21.3–23.3), and the card turns grey. The bubble drops away and leaves the quoted request in the middle lane (23.8). The AI's notes then appear under the paper (24.3): "Tighten the opening / Add a cost estimate / Sound more decisive". The dot ticks each one (24.8–25.8), and "DRAFT 2 / REVISED WITH AI" appears (25.8–26.3).

The picture does exactly what the caption says, and this is the best moment in the figure. One catch: the notes and ticks are about 11 px and happen on the far left in 1.5 s, right after my eye has followed the card to the far right. I only noticed the ticks on frame review.

**Beat 4 (28.1–40.5) "Then for a better structure, and a more strategic version."**
Two more carries follow the same pattern. "Suggest a better structure" takes "How the argument runs" across (bubble 29.6, travel 32–33, draft 3 at 35). "Make it more strategic" takes "What 'strategic' means" across (bubble 35, travel 36–37, draft 4 at 38). Each carry here takes about 1 s against about 2 s in beat 3. It's still easy to follow because I already know the pattern.

The paper thumbnail's lines gradually turn tan. I didn't know what that meant until I read the beat list ("the AI's grey headings and paragraph appear in the paper"). In real time it doesn't register.

**Beat 5 (40.5–49.75) "Each request left out whose standard to use. The AI used its own."**
The three request quotes flash (42). A "[ ] LEFT UNSAID" key appears beside the REQUESTS header (44.9). Dashed "UNSAID" tags then appear under each request, one every 0.5 s: *against your criteria*, *for your argument*, *as you define it* (45.4–46.4). The grey AI cards' borders darken (46.9–47.4). This is the clearest statement of the idea. The UNSAID phrases are the most important words in the figure, though, and they render as roughly 11 px italic inside dashed boxes. They're readable when held, small in motion. "The AI used its own" is shown only by a border pulse, which is weak but acceptable.

**Beat 6 (49.75–62.75) "A second student writes down each decision first, then asks for the same help."**
The first ledger compresses upward (50.75–51.8), and a second student row fades in with the same three dashed cards (52.25). The dot travels up to the rubric (54.75), and the rubric line becomes underlined (55.25). The dot comes back to "The criteria", which turns red (56.25). A "Give me feedback *against my criteria*" bubble appears (56.75) and settles in REQUESTS with a red pointer back to the card (57.75). The same three notes come back (58.25): the first two are ticked, and "Sound more decisive" is struck through with "only if the evidence is" in red (60.15). DRAFT 2 follows (60.75).

I paused here twice:
- The caption says the student writes down *each* decision *first*. I expected all three cards to go red before any request. Instead only the criteria is written before the first request, and the other two are written later, one before each of their requests (beat 7).
- The rubric check is a 1 s move that the caption doesn't mention. The underline is its only trace. I nearly missed it, and the second student's final answer ("set first from the rubric") depends on it.

**Beat 7 (62.75–73.7) "Each request points to a decision already made. The AI helps just as much."**
"How the argument runs" turns red (64.25), and "Suggest a better structure *for my argument*" settles with a pointer back (64.75–65.75), followed by DRAFT 3 (68.25). "What 'strategic' means" turns red (69.25), and "Make it more strategic, *as I define it*" settles (69.75–70.8), followed by DRAFT 4 (72). The AI lane stays empty. The first sentence of the caption matches the picture well.

"The AI helps just as much" is shown only by the draft count and the unexplained tan lines. And this student has just turned down one of the three notes. What I see is "the AI offered the same help", not "helped just as much".

**Beat 8 (73.7–88.55) "Faculty have only the papers. They ask each student about the standard."**
Everything except the two papers, their "DRAFT 4 / REVISED WITH AI" labels, the task card and the dots fades to a ghost (74.6–76.6). This is very effective: you see at once that the papers look alike and the process is hidden. "FACULTY ASK EACH STUDENT / Better by whose standard?" appears top right (77.6). The answers type in word by word. The first student says "The AI's notes, I suppose. I worked through what it flagged." (78.6–82.5). The second says "Mine, set first from the rubric: does the evidence back my call?" (83.5–87.5). The typing pace is comfortable.

On desktop the answer bubbles sit in a column to the right of THE AI DECIDES, with tails pointing left into the AI lane. For a moment the first answer looked as if it came from the grey AI cards rather than from the student far left.

**Beat 9 (89.6–96.1) Faculty check.**
The caption band is blank for about 1 s (88.6–89.5). Then "FACULTY CHECK / *What did the AI decide for the student?*" appears, the ledgers fade back to full strength (92.5–93.5), and the second line follows: "*To find out, ask each student: better by whose standard?*" (93.6). The figure rests there with Replay.

**Caption pacing overall.** Every caption is 16 words or fewer and held 8–15 s. No caption changed before I'd read it. The risk runs the other way: holds of 4–5 s with nothing moving (3.5–8.9, 12.4–16.9) make a 1:36 figure feel long for a teacher skimming a page.

**Phone, 390×844.** The picture is swapped for a stacked text view on the same clock, with no lanes. Differences:
- For the first ~20 s about 60% of the stage is blank. The three cards appear mid-stage at 10.5–11.5, and nothing sits above them.
- The carry becomes a relabel. The "STUDENT'S TO DECIDE" card nudges right, turns grey as "AI DECIDES" (22–23) and slides back. Only then does the "Give me feedback" request appear above it (23.5), so cause appears after effect.
- The label "STUDENT'S TO DECIDE" reads awkwardly.
- The second student's column fades in on the right (52.2), and its cards turn into red "STUDENT DECIDES" boxes.
- The answers appear whole rather than typed, under each student's column, which places them more clearly than on desktop.
- Text is 12–14 px and readable. The final frame and controls fit in 844 px.

## 2. The point, in my words

When a student asks an AI for "feedback", "a better structure" or "a more strategic version" without first saying what standard they mean, the AI quietly supplies the criteria, the argument and the meaning. The finished papers look the same, so the only way faculty can tell is to ask each student whose standard the improvements followed.

## 3. The question a teacher should ask afterwards

"Before you asked the AI for help, what had you already decided 'better' would mean for this paper, and which of its suggestions did you turn down, and why?"

## 4. The final frame alone

Yes, it carries the idea. Two papers marked "Draft 4, revised with AI" look alike. In the first row, all three decisions sit in THE AI DECIDES, and the bare requests carry "UNSAID" tags. In the second row, the three decisions are red cards in the student's own lane, and each request says "against my criteria / for my argument / as I define it". Each row has its student's answer beside it. What it says to me: same tool, same help on offer, different owner of the judgment, and you only find out by asking.

Caveats for a still:
- It's dense: about 60 labels, many at about 11 px mono or italic, with no obvious reading order. A teacher needs 30–60 s with it.
- The faculty question sits top right, detached from the answers it prompts.
- The red dots and the tan lines in the paper thumbnails are unexplained.
- The single best piece of evidence that the second student used judgment, "~~Sound more decisive~~ *only if the evidence is*", is among the smallest text on screen.

## 5. Problems, ranked

1. **Caption doesn't match picture (beat 6).** "Writes down each decision first, then asks" implies all three decisions are written before asking. The picture interleaves them: one decision, one request, three times, spread across beats 6 and 7. Either turn all three cards red before the first request, or caption it as "writes down each decision before asking about it".
2. **The rubric hinge is almost invisible.** The second student's answer ("set first from the rubric") rests on a 1 s uncaptioned move: the dot goes up and the rubric gets underlined. The figure also never says how a rubric and "the criteria" relate. A teacher may reasonably ask: if there's a rubric, how could the first student hand the criteria to the AI? The implied answer, that the rubric doesn't settle what "better" means for this paper until the student applies it, isn't stated or shown long enough.
3. **Key evidence is too small and too quick.** The tick-throughs of the AI's notes, the struck note with its reason, and the UNSAID tags are all about 11 px on a 1280-wide page. The first set of ticks happens on the far left while the eye is still on the far right where the card just landed.
4. **"The AI helps just as much" overstates what's shown.** The second student accepted two of three notes. The picture shows the same help offered, not the same help taken. The only visual for "helps" is the tan lines in the paper, which a viewer can't decode without the beat list. "The AI offers the same help" would match, or make the paper's change readable.
5. **Ambiguous answer bubbles on desktop.** Answers sit right of THE AI DECIDES with tails pointing into the AI lane, so the first one can briefly read as the AI speaking. The phone layout, with each answer under its student, avoids this.
6. **Unexplained red dot.** In beat 1 it reads as a bullet. It works once it moves, but a word ("the student") or having it pop the first request sooner would help.
7. **Phone version.** About 20 s of mostly empty stage at the start. The transfer is a relabel, and the request appears after the card has already changed, which reverses cause and effect. "STUDENT'S TO DECIDE" is awkward wording.
8. **Pace.** Nothing is too fast to read. Beat 4's carries move at twice beat 3's speed but stay followable. The long still holds (two of about 5 s each early on) cost more than they buy in a 1:36 figure.
9. **Fairness.**
   - *To the AI: fair.* Its notes are sensible, and the figure blames the request for leaving the standard unsaid, not the AI for being wrong.
   - *To students:* the first student's answer is plausible and not mocked. But the figure shows only the extremes: a wholly passive student and a model one. It doesn't show the case the page text itself raises, a student who reasonably adopts AI-proposed criteria after seeing how they fit the task. A teacher might take away "never accept the AI's criteria", which goes further than the essay quotation on the page.
10. **Factual claims.** The figure makes no statistical claims. The task, rubric, requests and students are labelled as a constructed example in the setup text and by "Example task" on screen. The kicker "Failure mode 5 of 7" is a structural claim about the essay; see section 6.

## 6. Mechanical checks

- **Reduced-motion view.** Yes. `?reduced` at 1280 and 390 shows the final frame: both ledgers at full strength, both answers, and both faculty-check lines in full ("What did the AI decide for the student?" / "To find out, ask each student: better by whose standard?"). The scrubber sits at 1:36. The beat list below gives each beat's caption and an "On screen" description.
- **Horizontal scroll at 390 px.** None. `scrollWidth` equals `clientWidth` (390) during playback and in the reduced view, and no element extends past the viewport. At this width the figure switches to its stacked text view (`is-narrow is-stacked`) rather than shrinking the SVG.
- **Keyboard.**
  - Tab order: brand link, Essay, Practice, then **Play** ("Play the invisible delegation figure"), **Restart**, the **scrub** slider, then the nine beat buttons. Every one shows a visible 2 px focus outline.
  - Enter and Space on the toggle switch between play and pause.
  - Enter on Restart replays from 0:00.
  - On the slider, arrow keys move 1 s, Shift+arrow moves 5 s, and End jumps to 1:36, with the toggle changing to Replay.
  - All three controls are reachable and work.
- **Numbers shown vs. sources.** I checked these after writing sections 1–5.
  - The figure carries no data or statistics. Its only numbers are structural: beat counters 1–9, "nine beats", draft numbers 1–4 and the 1:36 timer. None of them is a factual claim.
  - The page kicker **"Failure mode 5 of 7"** is supported. Section II of the essay names seven failure modes in this order: frame capture, fluency substitution, premature synthesis, uncalibrated reliance, **invisible delegation**, institutional monoculture, responsibility laundering. `the-irreducible-officer.md` lines 31–45.
  - `sources/source-spine.md` doesn't mention failure modes or this figure, which is fine because nothing here needs an external source.
  - Both blockquotes match the essay word for word, and their section attributions are correct: line 41 is in Section II, line 93 in Section V.
  - The "fair objection" credited to the failure-mode lab is real: `labs/failure-mode-lab/cases.md` line 63.

## Afterthought from checking the essay

The essay's list has four pairs, including "counterarguments may delegate the range of imaginable objections". The figure tracks three and drops that one, which is a fair simplification since beat 2 says "We'll track three". The essay frames the problem as the student *not noticing* what was handed over. The figure shows noticing as writing the decisions down before asking. That fits the essay's Section V line the page quotes ("structured prompting with explicit purpose and evaluation criteria moves the human contribution upstream"). The specific routine (check the rubric, write each decision, then ask) is the figure's constructed method, and the setup text rightly labels the example as constructed.
