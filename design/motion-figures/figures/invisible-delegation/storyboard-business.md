# Invisible delegation: business edition storyboard

Edition `business`, workplace cast. Built from `editions/business.json` on the unchanged core in `storyboard.md`: the timeline, layout, motion, colour grammar and nameplate. This file lists only what differs from the PME edition. If this file and the data disagree, the data is what ships.

Open it with `index.html?edition=business`, or with the page's "See this with: Workplace" link.

## 1. Source and evidence (option A)

*Illustration based on Lee, Sarkar, Tankelevitch, Drosos, Rintel, Banks & Wilson (2025), "The Impact of Generative AI on Critical Thinking: Self-Reported Reductions in Cognitive Effort and Confidence Effects From a Survey of Knowledge Workers," CHI '25. doi:10.1145/3706598.3713778.* The scenario is BUSINESS-EXAMPLES.md §5, the approved client email.

- **Setup:** "Illustration based on Lee et al. (2025). The analysts, their AI, the email and the firm's standard are constructed."
- **Under the final frame:** "Illustration based on / Lee et al., CHI (2025)." It sits in the SVG's right column under the second answer and fades in 1 s after the check (figure 84.6–85.1 s). On the stacked view it sits under the controls, outside the fixed-height player.
- **On the page:** "The study behind this example", after the check. It gives:
  - the headline finding in the paper's words;
  - P275 (the "make a passage professional" request);
  - P144 (the "changed up my main point" risk);
  - the paper's definition of stewardship, which is what the second analyst does;
  - the limits: self-reported, correlational, single-participant quotes, and the authors' affiliations.
  Every quote carries its PDF page.
- **No evidence beat.** The finding isn't the turn here; the turn is still what the requests left unsaid (beat 4).

## 2. Core changes (gated, for Jack to confirm)

Nothing in the story changes, and the study endorses the model analyst. The paper's stewardship is "translating intentions into queries, steering AI responses, and assessing if the AI response meets their quality standards for work". The first analyst's habit is P275's: a simple task, "so I just never thought about it". No contrast endorses what the study found wrong.

Two additive changes, both inert in PME (frame-diff 0):
- **The source line** is drawn only when the edition has `labels.source` / `narrow.source`.
- **The standard's text** starts after its label. "STANDARD ·" is longer than "RUBRIC ·", so the text moves from x 108 to x 124; PME's label keeps it at 108. While the second analyst consults it, the enlarged line is capped inside the task card. PME's cap is still 130%; business's is 118%.

## 3. The workplace check (wording for Jack)

> REVIEWER'S CHECK
> *What did the AI decide for them?*
> *To find out, ask each analyst: better by whose standard?* (same size)

The draft in EDITIONS-PLAN.md reads "What did the AI decide for them? Better by whose standard?". The figure keeps PME's bridge, "To find out, ask each …", for the reason PME needs it: an analyst who didn't notice can honestly answer "nothing" to the first question.

## 4. Words that differ, beat by beat

| Beat | PME | Business |
| --- | --- | --- |
| Task card | "Recommend whether to keep a forward base." · "RUBRIC · Evidence must back the call." | "Tell the client the project slips three weeks." · "STANDARD · Bad news first, with the new date." |
| People and reviewer | First / second student; "FACULTY ASK" | First / second analyst; "THE MANAGER ASKS" |
| Cards | The criteria · How the argument runs · What "strategic" means | The criteria · How the email runs · "Professional" means |
| Requests | … · "Make it more strategic" | … · "Make it more professional" |
| Unsaid | against your criteria · for your argument · as you define it | against your criteria · for your outline · as you define it |
| Second person's requests | … for my argument · … more strategic, as I define it | … for my outline · … more professional, as I define it |
| Second person's decisions | Evidence must back the call · Lead with the call, then its evidence · Serves the ally's long-term interest | Client leaves knowing the new date and why · Date first, then the reason, then the plan · Plain, as our standard says |
| AI's notes | Tighter opening · Add the costs · Be more decisive | Cut the jargon · Formal phrasing · Reassure first |
| Turned down | "Be more decisive": evidence too thin | "Reassure first": bad news first |
| Answers | "The AI's notes, I suppose. I worked through what it flagged." / "Mine, set first from the rubric: does the evidence back my call?" | the first unchanged / "Ours, set first from our standard: bad news first." |
| 1 | "A student wants to improve a draft paper. We'll track three decisions it needs." | "An analyst is improving a bad-news email to a client. We'll track three decisions." |
| 2 | "The student asks …" | "The analyst asks an AI for feedback. The request carries the criteria across." |
| 3 | "… a more strategic version." | "Then for a better structure, and a more professional version." |
| 4 | unchanged | unchanged |
| 5 | "A second student, with the same task, starts from the rubric." | "A second analyst starts from the firm's standard." |
| 6 | "… the second student writes the decision down." | "Before each request, the second analyst writes the decision down." |
| 7 | "… The second student judges them against their decisions." | "Both get the same AI notes. The second analyst judges them against their decisions." |
| 8 | "Faculty have only the papers. They ask each student about the standard." | "The manager has only the emails, and asks each analyst about the standard." |
| 9 | Faculty check | Reviewer's check (section 3) |

The page is fully business: no PME words, and no PME-only links. The links are the study's DOI and "The original essay, written for military education: The Irreducible Officer, Section II".

## 5. Pace table

The timeline is PME's. Each caption needs its words ÷ 3 plus a 1.5 s hold, and the PME rule needs twice the reading time; both have to fit the beat. Every business caption is at or under its PME length.

| Beat | Caption words | Read + 1.5 s hold | 2× reading | Beat (s) | New on-screen words |
| --- | --- | --- | --- | --- | --- |
| 0 · Name card | — | — | — | 3.0 | 6 (universal) |
| 1 | 14 | 6.2 | 9.3 | 9.5 | 35 (task card, standard, lanes, cards; on screen to the end) |
| 2 | 13 | 5.8 | 8.7 | 11.3 | 15 |
| 3 | 10 | 4.8 | 6.7 | 12.1 | 8 |
| 4 | 13 | 5.8 | 8.7 | 8.7 | 15 |
| 5 | 8 | 4.2 | 5.3 | 7.3 | 2 |
| 6 | 10 | 4.8 | 6.7 | 11.4 | 42 (three requests and three written decisions; on screen to the end) |
| 7 | 14 | 6.2 | 9.3 | 10.2 | 3 |
| 8 | 13 | 5.8 | 8.7 | 13.1 | 30 (answers at 3 words a second) |
| 9 | 8 + 9 | — | 5.7 | 6.9, then rests | 6 (source line) |

Beats 1 and 6 carry more picture words than the beat holds at 3 words a second, as in PME. Those words stay on screen to the end and are read again in later beats. The second answer is shorter than PME's: 9 words over the same 4.0 s.

## 6. Verified figures and quotes (for the source spine)

All checked against the full paper PDF (advait.org; DOI above). Page numbers are the PDF's.
- 319 knowledge workers surveyed; 936 first-hand examples (p. 1; also pp. 2, 4, 6).
- "higher confidence in GenAI is associated with less critical thinking, while higher self-confidence is associated with more critical thinking" (abstract, p. 1).
- P275: "It's a simple task [make a passage professional] and I knew ChatGPT could do it without difficulty, so I just never thought about it, as critical thinking didn't feel relevant." (p. 11)
- P144: "whether the AI added irrelevant content and if it changed up my main point of the letter" (p. 8).
- Stewardship: "translating intentions into queries, steering AI responses, and assessing if the AI response meets their quality standards for work, while retaining accountability for the work" (p. 13).
- Authors and affiliations: Lee (Carnegie Mellon University); Sarkar, Tankelevitch, Drosos, Rintel, Banks and Wilson (Microsoft Research) (p. 1).

Not used:
- The optional Jakesch et al. (2023) line. It needs its own verification and labelling.
- The evidence beat suggested in BUSINESS-EXAMPLES.md, which the brief keeps for figures whose finding is the turn.

## 7. Checks

Both editions were checked at 1440 × 900, 1280 × 720 (stacked) and 390 × 844, plus reduced motion and print.

| Check | PME | Business |
| --- | --- | --- |
| Phone player | 840 px | 823 px |
| Desktop player at 1280 × 720 | 677 px | 677 px |

- **Controls:** never move.
- **Overflow:** no horizontal scroll at 390 or 768.
- **Text size:** the smallest is 13 px at 1440.
- **Errors:** no console errors.
- **Nameplate:** unchanged.
- **Regression:** PME frame-diffs to 0 of 203 against `regression/baseline`, which was recaptured with the edition switch. Before that, it diffed to 0 against `regression/baseline-pre-editions` with the switch hidden.
- **Voice:** the visitor copy passes the writing-as-jack mechanical check.
