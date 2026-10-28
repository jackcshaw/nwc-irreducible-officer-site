# Business examples for the eight figures

October 28, 2026. A research-mapping pass for Jack's pick, following "Jack's decisions" in [EDITIONS-PLAN.md](EDITIONS-PLAN.md). Nothing is built. For each figure there's a study-grounded scenario, a fictional fallback and a recommendation.

"Verified" means I read the passage today in the paper, its published abstract or the primary record, unless the note says it rests on [BCG-VERIFY.md](BCG-VERIFY.md) or the October 27 checks in `nwc-irreducible-officer-companion-business/sources/business-edition-research.md`. Page numbers are the printed ones unless marked "PDF p."

## The eight at a glance

| # | Figure | Recommended | Setting | Rests on | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Frame capture | Study-grounded | A health system's care-management program | Obermeyer et al. (2019), *Science* | Verified in the paper |
| 2 | Fluency substitution | Study-grounded | An IP law firm: two junior associates, one partner | Autor et al. (2026), NBER | Verified in the paper |
| 3 | Premature synthesis | Study-grounded | A product engineering team: two junior engineers, one tech lead | Shen & Tamkin (2026), Anthropic | Verified in the paper |
| 4 | Uncalibrated reliance | Study-grounded | A print-and-internet shop in Nairobi, with a business mentor | Otis et al. (2026), *Management Science* | Abstract verified; advice detail from the 2026 working paper |
| 5 | Invisible delegation | Study-grounded (task type) | An account manager's bad-news email to a client | Lee et al. (2025), CHI | Verified in the paper |
| 6 | Institutional monoculture | Study-grounded | Ten managers at an industrial company, one CEO question | Romasanta, Thomas & Levina (2026); Bottesch (2025) | Core finding verified on the author's page; details secondary |
| 7 | Responsibility laundering | Record-grounded | Customer support: letting an AI assistant answer refund questions | *Moffatt v. Air Canada*, 2024 BCCRT 149 | Verified in the decision |
| 8 | Appropriate reliance | Study-grounded (as built) | A consulting team | Dell'Acqua et al. (2023), HBS | Verified in BCG-VERIFY.md |

Each study is the primary source for one figure. BCG appears once, or twice if figure 4 keeps its current panel. The eight recommended settings don't repeat. Operations shows up only in two fallbacks (figures 4 and 7).

## What applies to all eight

- **Label.** Keep "EXAMPLE TASK" on the task card (the convention). Put "Illustration based on [authors] ([year]). The two people are constructed." in the setup paragraph and on the evidence panel's source line. Figures 5 and 7 need adjusted wording (see their sections).
- **An evidence beat is new for six figures.** Today only uncalibrated reliance and appropriate reliance show a study. Proposal: one evidence panel per business figure, using the uncalibrated-reliance panel convention (scene dims, panel rises, mono source line), placed after the turn and before the check. Each adds about 8–12 s and has to fit the 3-words-a-second reading budget. It changes beat counts, which the editions plan treats as core, so Jack should approve it. The other place for the evidence is the standalone page, under the figure.
- **Figure reasoning stays labelled.** Every study below measures outcomes. The two-person contrast and its mechanism belong to the figure. Wherever a panel line goes beyond the study, it sits under "WHAT THE EVIDENCE SUGGESTS" (the appropriate-reliance convention).
- **Cast.** Each section names the reviewer who asks the check: a program director, a partner, a tech lead, a mentor, an account director, a head of strategy, a head of support, an engagement manager. The workplace checks in EDITIONS-PLAN.md apply as drafted.
- **Captions** go through the writing-as-jack pass at build, per the site-copy rule.

---

## 1. Frame capture

### Study-grounded: Obermeyer, Powers, Vogeli & Mullainathan (2019), *Science* 366: 447–453

**What it rests on** (verified in the published paper):

- A commercial algorithm, "typical of this industry-wide approach" (p. 447), ranked patients for "high-risk care management" programs. "Patients above the 97th percentile are automatically identified for enrollment in the program" (p. 448). By industry estimates, tools of this class are "applied to roughly 200 million people in the United States each year" (p. 447).
- The facts were right and the frame was the flaw. "At every level of algorithm-predicted risk, Blacks and Whites have (roughly) the same costs the following year. In other words, the algorithm's predictions are well calibrated across races" (p. 449). But "the algorithm predicts health care costs rather than illness, but unequal access to care means that we spend less money caring for Black patients than for White patients" (abstract, p. 447).
- The paper calls the cost frame reasonable: "the algorithm manufacturer's choice to predict future costs is reasonable: The program's goal, at least in part, is to reduce costs" (pp. 450–451). It also names others: "future cost is by no means the only reasonable choice" (p. 451), including avoidable costs and "the number of active chronic health conditions" (p. 451). And: "any could be justified as a measure of patients' likely benefit from the program" (p. 452).
- The fix was a new frame. The manufacturer replicated the result on 3,695,943 patients. A label combining health and cost cut the excess chronic conditions among Black patients "to 7758, an 84% reduction in bias" (p. 453).

**Limits.** It studied a predictive model, not generative AI. It covers one algorithm and one large academic hospital's primary-care patients from 2013 to 2015 (6,079 Black and 43,539 White patients, p. 448), plus the manufacturer's national replication. The 84% is one measure, in the manufacturer's data.

**Setting.** A population-health team deciding who gets a care-management program's extra support. Health payers, community health centers and social-service nonprofits that triage clients will recognize it.

**Scenario** (*Illustration based on Obermeyer et al., 2019*). A population-health analyst must choose which patients the care program should help. An AI proposes a reasonable, narrower frame, "Predict next year's costliest patients", built on two of six considerations (next year's costs, the program's budget). The analyst refines the ranking inside it. A second analyst, also working with AI, weighs all six (adding chronic illness, avoidable hospital visits, access to care, and who the program can help), keeps cost and hands in the same ranking. Asked why this frame and what would change it, only the second can answer: "If some patients cost less because they get less care, cost understates their need. I'd check cost against illness, group by group."

Beat 3 can make the narrowing visible with one word: "patients with the greatest *needs*" becomes "patients with the greatest *costs*".

**Frame-first tests.**

- *Flaw in the frame:* the paper's own finding. By the cost metric, "one could call the algorithm unbiased" (p. 449).
- *Two defensible frames:* total cost, avoidable cost and chronic conditions; "any could be justified" (p. 452).
- *Directing AI helps:* the second analyst has the AI build the ranking on each frame and compare who lands at the top. That is the authors' own experiment (Table 2, p. 452).
- *Something deserves acceptance:* the cost predictions themselves. They are accurate as cost predictions.
- *A changed case:* "Suppose some patients cost less because they get less care." Illness measures become decisive.

**Evidence beat** (after beat 10, before the check):

- Mono heading: "A WIDELY USED ALGORITHM RANKED PATIENTS BY PREDICTED COST"
- "Its cost predictions were accurate for Black and White patients alike."
- "At the same score, Black patients were considerably sicker. Less had been spent on their care."
- "Correcting it: Black patients picked for extra help, 17.7% → 46.5%" (simulated at the automatic-enrollment cut-off, p. 449).
- "Predicting health along with cost cut the bias 84%" (manufacturer's data, p. 453).
- Source line: "Obermeyer, Powers, Vogeli & Mullainathan, *Science* (2019). A prediction algorithm, not an AI assistant."

**Sensitivity.**

- The finding is about race. State it in the paper's words. Writing "some groups" for "Black patients" would misstate it.
- Put the mechanism on screen (less spending at the same level of illness, from unequal access), so the finding can't read as a claim about patients.
- Keep race off the consideration chips. "Access to care" is the accurate chip.
- Neither analyst is biased; the frame carries the effect.
- Two cold-read risks:
  - Viewers may take away "AI is biased" rather than frame ownership, so the beat 10 question and the check must stay the last word.
  - Beat 8 has the second analyst keep cost, which the panel then shows failing. The figure has to make plain that the second analyst's "what would change it" is the very check that found the problem. Owning a frame includes knowing how it fails.

### Fictional fallback: the grocery chain

A regional grocery chain responds to a discount grocer opening nearby (EDITIONS-PLAN.md, scenario 1). The AI's frame is "Differentiate on fresh, local and service", built on two of six considerations: fresh quality and service, against price-driven loyalty households, store brand, distance to the new sites and margin. The second analyst weighs all six, keeps differentiation and writes the same plan. Asked what would change it: "If our best customers shop on price and live near the new stores."

**Conflict to fix first.** In *Judgment at Work* (`essays/business.md`) this case resolves the other way: the loyalty data shows the frame fails in eight of the eleven stores, and the analyst who catches it changes the plan. Beat 8 needs the second analyst to keep the frame. If the figure shares the essay's case, it has to stop before the loyalty data, or be set in a market where the data supports differentiation. Otherwise a reader of both will see the figure endorse the plan the essay rejects.

### Recommendation

**Obermeyer.** It is the best-documented case of the exact mechanism: every number right, a frame chosen because it was convenient, and a fix that was a new frame. The paper itself calls the frame reasonable and names the alternatives, so "two defensible frames" comes from the source. It also brings in health and nonprofit readers. Take it only with the sensitivity handling above, and with a cold read aimed at the "AI is biased" misreading. If Jack wants this figure to share the essay's case, use the grocery fallback and fix the conflict first.

---

## 2. Fluency substitution

### Study-grounded: Autor, Rodchenko, Martin, Iscenko, Strand, Pearl & Ferere (2026), NBER w35720

**What it rests on** (verified in the October 7, 2026 version):

- A pre-registered three-month randomized trial with "133 practicing patent lawyers at eleven U.S. intellectual property law firms" (abstract), "91 of whom completed the full protocol" (p. 1). Blinded expert scoring on "enforceability, accuracy, strategic ambiguity ..., completeness, and clarity" (p. 1).
- The task: working from a patent document's main claim, figures and inventor notes, draft "five to seven dependent claims ... along with a detailed description" (p. 9).
- "AI access raised the quality of work delivered on benchmark patent drafting tasks at 10 days (0.34 SD, p = 0.03) and 90 days (0.38 SD, p = 0.01), with larger gains among junior lawyers." In the unassisted redline task after three months, the treatment group's advantage "was concentrated entirely among senior lawyers (0.45 SD, p = 0.02). Junior lawyers showed no average gain. Their scores instead bifurcated ... suggesting that AI assistance served as a springboard for some juniors and a cushion for others" (abstract).
- "Modern AI systems are easy to operate but hard to evaluate" (p. 1).

**Limits.** "Our experiment does not answer why the effects appear positive for some lawyers and negative for others" (p. 2). It covers one profession, and the junior subgroup (under seven years' experience) is small. All the firms work with Google, which ran and funded the study, and the tool was custom.

**Setting.** An IP law firm where juniors draft and partners sign. Accounting, consulting and any other firm that runs on junior drafting will recognize it.

**Scenario** (*Illustration based on Autor et al., 2026*). Two junior associates draft the claims for a client's patent application (the sentences that set what the invention protects) with the firm's AI drafting assistant. The first has the AI draft from the inventor's notes, reads it closely, fixes one claim and agrees. The second first writes in plain words what's new ("it reads heart rate through clothing") and has the AI draft from that note, and the two drafts match. With the drafts put away, both explain the claims well. Then the partner changes one fact: an older patent already covers reading through clothing. The first defends the draft's claims in the draft's words. The second reworks them: "Then what's new is the battery design. Lead with that." (The wearable and the older patent are constructed.)

**Frame-first tests.**

- *Flaw in the frame:* what the claims treat as the invention's advance. The draft's facts are right.
- *Two defensible frames:* claim broadly on the feature, or narrowly on how it works. The study's rubric scores both enforceability and strategic ambiguity.
- *Directing AI helps:* the AI drafts well from the second associate's note, and the study found AI raised delivered quality.
- *Something deserves acceptance:* the detailed description the AI drew from the figures, accepted after a read.
- *A changed case:* the older patent makes "what's new" decisive.

**Evidence beat** (after the turn, before the check):

- Mono heading: "PATENT LAWYERS, THREE MONTHS, RANDOMLY GIVEN AN AI DRAFTING TOOL"
- "Work delivered with AI: better, most for juniors."
- "Judgment tested without AI: seniors better. Juniors no better on average."
- Bracket: "Juniors split: 'a springboard for some juniors and a cushion for others.'"
- Source line: "Autor et al., NBER (2026)". The SD figures go in the source line if the panel needs numbers.
- Under "WHAT THE EVIDENCE SUGGESTS": "The study can't say why. Owning the reason first is the figure's answer."

**Supporting evidence for the page.** Camuffo, Gambardella, Kazemi & Pandey (2026), *Strategy Science* 11(1): 137–156, abstract verified on Crossref: among 976 managers, "highly educated managers exhibit confidence gains without corresponding quality improvements." This study compared three conditions: a custom agentic system, GPT-4o and no AI.

**Sensitivity.** Disclose the Google funding on the page. The evidence must not read as "AI harms juniors": treated juniors also had more good scores. Keep the legal jargon to two terms, "claims" and "an older patent".

### Fictional fallback: the product-line memo

A consumer-goods company (EDITIONS-PLAN.md, scenario 2). A polished AI memo recommends dropping a product line, because its margin is the lowest and the replacement covers its customers. One analyst reads the AI's draft and agrees. The other writes their reason first ("the replacement reaches the same stores") and has the AI draft from it. The memos match. Change one fact: the key distributor stops carrying the replacement. The first says, "On balance, the margin case still holds." The second says, "Then the replacement doesn't reach those stores. Keep the line there."

### Recommendation

**Autor.** Its junior split is the figure's two-person contrast in the authors' own words, and it is evidence the essay already uses. The risk is that patent work is unfamiliar. If the cold read stumbles on "claims", switch to the memo and keep Autor as the panel, with the label changed to "Constructed example. Evidence: Autor et al. (2026)."

---

## 3. Premature synthesis

### Study-grounded: Shen & Tamkin (2026), "How AI Impacts Skill Formation," arXiv 2601.20245 (Anthropic)

**What it rests on** (verified in the paper, v2, and Anthropic's research post of January 29, 2026):

- 52 "(mostly junior) software engineers" learned Trio, a new Python library for asynchronous programming. They built two features in up to 35 minutes, then took a quiz (p. 7; post).
- AI assistance "resulted in a reduction in the evaluation score by 17% or two grade points (Cohen's d = 0.738, p = 0.010)", with no significant speed gain (p. 2). The post gives the means: 50% with AI, 67% by hand.
- "The largest score gap occurs in the debugging questions ... the control group with no access to AI assistance encountered more errors during the task and became more capable at debugging" (p. 11).
- Among the AI users (pp. 13–14):
  - Conceptual Inquiry (n = 7) "only asked conceptual questions ... Although this group encountered many errors, they also independently resolved these errors." Average quiz score 65%.
  - AI Delegation (n = 4) "wholly relied on AI to write code" and "encountered few or no errors". Average 39%.
- **A counter-pattern.** Generation-Then-Comprehension (n = 2) averaged 86%. This group had the AI generate code and then asked follow-up questions; it "looks nearly the same as the AI delegation group, but additionally uses AI to check their own understanding" (p. 13).

**Limits.** A one-hour task, with the quiz straight after. The sample is small, and the interaction groups are 2 to 7 people, from exploratory analysis. Participants had no job incentive to learn the library (p. 19).

**Setting.** A product engineering team, with a tech lead reviewing the code.

**Scenario** (*Illustration based on Shen & Tamkin, 2026*). Two junior engineers must add a feature with a library new to both, one that runs tasks at the same time. Both read the docs closely. The first has an AI write the feature; the code makes sense, and they ship it. The second asks the AI only about concepts and writes the code. One connection doesn't hold (one failing task cancels the others); they fix it, then have the AI review the code and keep one change. Same code, and both can walk through it. In review, the tech lead points to the error handling and asks what would make it fail. The first recalls the docs' line on cancellation but can't apply it. The second applies it, from the bug they fixed.

The cancellation behaviour is constructed. It matches how Trio handles a failing task, but have an engineer confirm the wording.

**Frame-first tests.**

- *Flaw in the frame:* the AI's code is right. What's missing is the first engineer's map of why it works.
- *Two defensible frames:* which connection is the main one, such as running the tasks as a group or separately.
- *Directing AI helps:* the second engineer asks conceptual questions and keeps a suggestion from the AI's review.
- *Something deserves acceptance:* that review suggestion (the PME version's "keeps a line it adds").
- *A changed case:* "What would make it fail?" This is the study's debugging gap.

**Evidence beat** (after the turn, before the check):

- Mono heading: "52 ENGINEERS LEARNING A NEW LIBRARY, RANDOMLY GIVEN AN AI ASSISTANT OR NOT"
- Bars, quiz afterward: "With AI 50% · By hand 67%"
- "Biggest gap: debugging. Without AI, engineers hit more errors and fixed them."
- Optional second row, labelled "SMALL GROUPS": "AI users who asked only about concepts and fixed their own errors: 65%. Who had AI write the code: 39%."
- Source line: "Shen & Tamkin, Anthropic (2026)."

**Cautions.**

- Don't show the first engineer asking the AI to explain its code. The two people who did that scored 86%, so that version would contradict the panel. "Reads it, it makes sense, ships it" matches the delegation pattern.
- Counter-evidence for the page: Brynjolfsson, Li & Raymond (*QJE*, 2025; arXiv v2 checked) found support agents' gains held during AI outages, more for agents who had followed its suggestions closely (PDF p. 4). AI can teach, and this study measured one hour.
- Put no code on screen. Use cards with plain labels.

### Fictional fallback: customer interviews

A product team synthesizes six customer-interview summaries (EDITIONS-PLAN.md, scenario 3). The AI's theme map says onboarding friction drives churn. The second product manager tries the connections first. One fails: two complaints looked alike but came from customers on different plans. Asked what evidence would change the main theme, only that product manager can apply it.

### Recommendation

**Shen & Tamkin.** It is randomized, both of its contrasted groups used AI, and it measures the mechanism the figure shows: fixing the error is how you learn what the code rests on. The risk is readers who don't code. If the cold read finds the cards opaque, the interview fallback is the most universal product-team version. In that case the panel becomes related evidence, labelled "Constructed example."

---

## 4. Uncalibrated reliance

### Study-grounded: Otis, Clarke, Delecourt, Holtz & Koning (2026), *Management Science* (online July 10, 2026)

**What it rests on.**

- From the published abstract (Crossref, verified): there was "no average treatment effect on firm revenues and profits" (the authors are "unable to reject" it). "Low performers did nearly 10% worse because of the AI assistant, whereas high performers may have benefited by over 15%." And: "This differential impact does not appear to result from differences in the questions posed to the AI or the advice that it provided but rather, from the advice that entrepreneurs chose to implement."
- From HBS Working Paper 24-042 (2026 revision, verified):
  - 640 Kenyan entrepreneurs; half got a GPT-4 assistant on WhatsApp (p. 3).
  - Businesses "ranged from fast food vendors to poultry farmers to cybershop owners (who provide services such as internet access, printing, scanning ...)" (p. 9).
  - "Treated low performers were especially likely to implement 'generic' advice focused on lowering prices and investing in advertising ... treated high performers worked with the AI to discover tailored and specific changes ... from finding alternative ways to get power during blackouts to introducing a new in-demand car wash detergent" (p. 4). The authors call this analysis "exploratory and abductive" (p. 29).

**Limits.**

- The subgroup effects are imprecise ("may have benefited").
- "Low" and "high" mean baseline performance.
- The generic-advice detail is exploratory and comes from the working paper. I didn't check it in the published text.
- The working-paper abstract says "nearly 0.25 standard deviations" where the published abstract says "over 0.20". Use the published figures.
- The tool was GPT-4.

**Setting.** A print-and-internet shop in Nairobi, with a business mentor (or a lender's small-business officer) as the reviewer.

**Scenario** (*Illustration based on Otis et al., 2026*). A shop owner asks an AI business mentor two questions: how to keep printing through power blackouts, and how to win back customers from a new shop nearby. It answers both with equal confidence: a backup battery that pays for itself in eight weeks, and a 10% price cut with some advertising. The owner checks the battery against supplier quotes, finds it right, and acts on both. A second owner with the same answers checks each at its source. The battery checks out. Their own sales book shows customers come for fast turnaround and the margin can't take a 10% cut, so they advertise same-day printing instead. The mentor, seeing only the plans, points to each part and asks what justified relying on it. (The battery, the 10% and the eight weeks are constructed.)

**Frame-first tests.**

- *Flaw in the frame:* the price answer treats the problem as a price war, the generic frame. Its arithmetic may be fine.
- *Two defensible frames:* compete on price, or on speed and service.
- *Directing AI helps:* ask it for options that fit this shop's margins and customers. The study's high performers "worked with the AI".
- *Something deserves acceptance:* the blackout advice, which is the study's own example of a tailored change.
- *A changed case:* if the sales book showed price-driven customers, the price cut could be right. Either way, the book decides.

**Evidence beat** (replaces the BCG panel at beat 8):

- Mono heading: "640 KENYAN SMALL BUSINESSES, HALF GIVEN AN AI MENTOR AT RANDOM"
- "On average: no change in revenue or profit."
- Bars: "Owners who started weaker: nearly 10% worse. Stronger: may have gained over 15%."
- Bracket: "The gap came from which advice they chose to act on."
- Under "WHAT THE EVIDENCE SUGGESTS" (the working paper's exploratory reading): "Weaker performers more often acted on generic advice, like cutting prices. Stronger ones made changes that fit their business."
- Beat 7's frontier line becomes the figure's reasoning: "Part 2 depends on this shop's customers and margins, which the AI can't see." To keep the frontier's numbers, retain the BCG panel as well; that would be BCG's second use.

**Sensitivity.**

- No "low performer" label on either owner, and both are competent. The figure's difference is one check.
- Keep Nairobi and the blackouts matter-of-fact. The study's median owner was 26, and most had some college education (p. 9).
- Keep "may have benefited" hedged.

### Fictional fallback: two stores' forecasts

Retail operations (EDITIONS-PLAN.md, scenario 4). Two look-alike weekly demand forecasts for two stores; one depends on a road closure that only the city notice shows. The BCG panel stays as it is.

### Recommendation

**Otis.** It is a real small business with a real split, and its finding is about choosing which advice to act on, which is what the figure's check asks. It also leaves BCG to appear once. The fallback stays strong because it keeps the frontier numbers the figure was built on.

---

## 5. Invisible delegation

### Study-grounded (task type): Lee, Sarkar, Tankelevitch, Drosos, Rintel, Banks & Wilson (2025), CHI '25

**What it rests on** (verified in the paper, PDF from co-author Sarkar's site):

- A survey of 319 knowledge workers with 936 first-hand examples. "Higher confidence in GenAI is associated with less critical thinking, while higher self-confidence is associated with more critical thinking." "GenAI shifts the nature of critical thinking toward information verification, response integration, and task stewardship" (abstract, PDF p. 1).
- P275: "It's a simple task [make a passage professional] and I knew ChatGPT could do it without difficulty, so I just never thought about it, as critical thinking didn't feel relevant" (PDF p. 11).
- P144 checks "whether the AI added irrelevant content and if it changed up my main point of the letter" (PDF p. 8).
- The paper defines stewardship as "translating intentions into queries, steering AI responses, and assessing if the AI response meets their quality standards for work, while retaining accountability for the work" (PDF p. 13).

**Limits.** Self-reported, cross-sectional and correlational. "Critical thinking" means what participants perceived they did. The authors are at Microsoft Research and CMU. The quotes are single participants.

**Setting.** An account manager at an agency, consultancy or software vendor writing a bad-news update to a client.

**Scenario** (*Illustration based on examples from Lee et al., 2025*). An account manager must tell a client the project will slip three weeks; the firm's client standard says bad news first, with the new date. They ask an AI for feedback, then a better structure, then "make it more professional", and work through every note. Each request leaves the standard to the AI, which uses its own: soften the opening, lead with the relationship, formal phrasing, and the date moves to paragraph three. A second account manager writes each decision down first ("The client must leave knowing the new date and why", "Date first, then the reason, then the plan", "Professional means plain, as our standard says"). They get the same notes and turn one down: "Open with reassurance" is struck, with "date first" written under it. Asked "Better by whose standard?", the first says "The AI's notes, I suppose." The second says "Ours: bad news first."

**Frame-first tests.**

- *Flaw in the frame:* each request hands over what "better" means. Every sentence in the email is accurate.
- *Two defensible frames:* lead with the relationship or lead with the news. Firms use both.
- *Directing AI helps:* requests that point to the decisions get notes the manager can judge, and the AI's tightening is good.
- *Something deserves acceptance:* the AI's clarity and structure notes, inside the manager's order.
- *A changed case:* a client who has asked for a call before any written bad news. The standard then changes what "better" means.

**Evidence beat** (after beat 7, before the reviewer asks):

- Mono heading: "319 KNOWLEDGE WORKERS, 936 EXAMPLES OF AI AT WORK"
- "The more they trusted the AI on a task, the less critical thinking they reported."
- Quote: "It's a simple task [make a passage professional] ... so I just never thought about it."
- Source line: "Lee et al., CHI (2025). Self-reported."
- Optional second line: Jakesch, Bhat, Buschek, Zalmanson & Naaman, CHI 2023 (abstract verified on arXiv). With 1,506 participants, a writing assistant set to argue one side shifted what people wrote and their later survey answers. Label it: the model was configured to take a side, and the topic was social media.

**Sensitivity.** The quote is one person's, so don't present it as typical. The first manager's requests are ordinary; nothing on screen should make them look careless.

### Fictional fallback: the grant proposal

A nonprofit development officer revises a grant proposal against the funder's scoring sheet ("Measurable outcomes: 40 points"). The AI's notes push to open with a client story and trim the outcomes table. The second officer sets each decision first from the scoring sheet and turns down "Trim the outcomes table". Asked "Better by whose standard?": "The funder's." The scoring sheet is the closest analogue to the PME rubric, and it brings in nonprofit readers. Label: "Constructed example. Evidence: Lee et al. (2025)."

### Recommendation

**The client email.** Its request ("make it more professional") and its risk ("changed up my main point") come from the study's own participants. If Jack wants a nonprofit figure beyond frame capture, the grant proposal is a cheap swap with the same panel.

---

## 6. Institutional monoculture

### Study-grounded: Romasanta, Thomas & Levina (2026), *HBR*; Bottesch (2025), ACIS

**What it rests on.**

- **Romasanta, Thomas & Levina.** Verified on Levina's NYU Stern research-highlight page, the authors' own summary: across "thousands of simulations", LLMs "consistently recommend strategies that align with modern managerial buzzwords and trends rather than context-specific strategic logic". The October 27 check of the same page recorded "almost uniformly select the same trendy strategies, regardless of context."
- **Bottesch** (ACIS 2025 abstract, verified on the AIS eLibrary): a field experiment with "99 knowledge workers from a multinational industrial corporation" found "significant homogenisation effects ... in terms of style and content when knowledge workers are supported by GenAI", effects that "might be mitigated through advanced prompting and (more) critical handling of GenAI output."
- **Doshi & Hauser** (*Science Advances*, 2024; verified on PMC): "With generative AI, writers are individually better off, but collectively a narrower scope of novel content is produced."
- **Kim, Garg, Peng & Garg** (ICML 2025; from the October 27 arXiv check): models "agree 60% of the time when both models err," and larger, more accurate models have more correlated errors.
- **Counter-evidence:** Terwiesch et al. (*POM*, 2026; from the October 27 Crossref check). Pooling vendors, chain-of-thought prompting and assigned personas raise idea diversity "almost to the level of human idea generation."

**Limits.**

- The HBR article is a practitioner piece with no peer-reviewed paper behind it, and it is paywalled; I didn't read it.
- The details are secondary only: seven models, seven strategic tensions, and "differentiation and augmentation" as the named defaults.
- Bottesch is a single-author conference paper from one firm; the abstract gives no effect sizes.
- A Zenodo working paper on "strategy trendslop" (Lerer, 2026) is an independent follow-up by another author. Don't cite it as the authors' paper.

**Setting.** Corporate strategy at an industrial-equipment maker, which matches Bottesch's sample.

**Scenario** (*Illustration based on Romasanta, Thomas & Levina, 2026, and Bottesch, 2025*). Ten managers at an industrial-equipment maker each get the CEO's question for the planning offsite: how should we respond to a low-cost competitor entering our core market? Each asks the company's AI for an outline, and every outline opens the same way. Each writes their own plan with different evidence, and each holds up. Lined up, the problem lines differ ("Lead on premium service", "Own the high-spec segment", "Bundle maintenance in") but all set one goal: differentiate. The head of strategy asks what other frames the question could take. Imagined the essay's way (each frames the problem first, then asks the AI to challenge it), the plans spread across three goals: differentiate, match on cost for price-driven customers, and partner or license.

**Frame-first tests.**

- *Flaw in the frame:* each plan holds up. The narrowing shows only across plans.
- *Two defensible frames:* differentiate, match on cost, or partner. Each is defensible.
- *Directing AI helps:* asked to challenge a frame, AI generates alternatives well (Terwiesch; Bottesch's mitigation finding).
- *Something deserves acceptance:* each plan's market facts.
- *A changed case:* the imagined run, which stays labelled untested.

**Evidence beat** (after beat 6, "Every AI outline opened with that frame"):

- "Across thousands of simulations, leading AI models recommended the same trendy strategies, whatever the context." Source: Romasanta, Thomas & Levina, *HBR* (2026), authors' summary.
- "At one multinational industrial company, AI support made 99 workers' output more alike in style and content." Source: Bottesch (2025).
- Optional: "When two AI models are both wrong, they usually give the same wrong answer." Source: Kim et al. (2025). This backs the point that asking a second model isn't an independent check.

**Sensitivity.** Mind the irony: "differentiate" is the models' default and also the essay's conclusion. Because the named default is secondary, the panel should say "the same trendy strategies"; the plans can still all say "differentiate". Don't name a real company.

### Fictional fallback: ten product teams

Ten product teams ask the same AI for competitive strategy and get one frame (EDITIONS-PLAN.md, scenario 6). A nonprofit variant: ten coalition members respond to the same funding cut, and every outline opens with "diversify revenue". That default is constructed, and I haven't verified it.

### Recommendation

**Study-grounded.** It is the essay's convergence argument, the trendslop finding fits beat 6 directly, and Bottesch puts the effect inside one real company.

---

## 7. Responsibility laundering

### Record-grounded: *Moffatt v. Air Canada*, 2024 BCCRT 149 (February 14, 2024)

**What it rests on** (verified in the decision on the BC Civil Resolution Tribunal's site):

- Para. 2: "The chatbot suggested Mr. Moffatt could apply for bereavement fares retroactively. Mr. Moffatt later learned from Air Canada employees that Air Canada did not permit retroactive applications."
- Para. 27: "Air Canada argues it cannot be held liable for information provided by one of its agents, servants, or representatives – including a chatbot. ... In effect, Air Canada suggests the chatbot is a separate legal entity that is responsible for its own actions. This is a remarkable submission. ... It should be obvious to Air Canada that it is responsible for all the information on its website. It makes no difference whether the information comes from a static page or a chatbot."
- Para. 28: "I find Air Canada did not take reasonable care to ensure its chatbot was accurate."
- Para. 44: Air Canada was ordered to pay $812.02, of which $650.88 was damages.

**Limits.** This is a record, not a study: a small-claims tribunal decision in one province, binding on no one else. It concerns a company's liability for its chatbot, not two staff signing a recommendation.

**The research on felt responsibility is mixed.** It belongs on the page, not in the figure:

- Köbis et al. (*Nature*, 2025; abstract verified on Crossref): "Requests for cheating increased when principals could induce machine dishonesty without telling the machine precisely what to do."
- Gaczek et al. (*J. Business Ethics*, 2025; abstract verified), with 587 marketing managers:
  - working solely with AI recommendations "may increase perceived personal responsibility";
  - human-and-AI teams "diffuse responsibility";
  - benefit-focused AI lowered felt responsibility, "most potent among managers who heavily rely on AI".
- Kirchkamp & Strobel (2019): "no treatment effect on perceived responsibility or guilt." Crossref has no abstract, so this rests on the October 27 RePEc check.

The figure shouldn't claim that AI generally makes people feel less responsible. It shows one way it can happen, and asks the question that tests for it.

**Setting.** Customer support at a mid-size online retailer (constructed): two support leads, and the head of support asking the questions.

**Scenario** (*Illustration based on Moffatt v. Air Canada, 2024*). Two support leads must recommend whether the company's AI assistant should answer refund questions without an agent checking. Suppose the same prompt gives both the same AI draft: "The analysis estimates the assistant gives the right refund rule on 97% of questions. It is recommended that it answer customers directly." Both agree. The first signs; the second first notes that the 97% comes from last quarter's questions, which looked typical, then signs. The head of support asks, "Suppose it tells a customer the wrong rule. Who made this call?", then "Why did you rely on it?" The first answers "I signed it. The analysis said 97%," then "It was the AI's analysis. It seemed solid." The second answers "I did. I chose to rely on the estimate," then "It was tested on last quarter's questions. Those looked typical, so I accepted it. I should have checked the rare cases, like exceptions to the policy." (The 97% and the retailer are constructed.)

**Frame-first tests.**

- *Flaw in the frame:* the estimate is right about what it measured. It assumes future questions look like the test set.
- *Two defensible frames:* answer directly, for speed and round-the-clock cover, or keep an agent on policy exceptions.
- *Directing AI helps:* ask it to break the accuracy down by question type and to list what the estimate assumes.
- *Something deserves acceptance:* the 97% on routine questions.
- *A changed case:* an exception question (the real case was a bereavement fare) makes the test set's coverage decisive.

**Evidence beat** (at beat 8, "Suppose it proves wrong. The AI can't answer for it."):

- Mono heading: "2024: AN AIRLINE'S CHATBOT GAVE A CUSTOMER THE WRONG REFUND RULE"
- "The airline argued the chatbot was 'a separate legal entity that is responsible for its own actions.'"
- "The tribunal called it 'a remarkable submission' and held the airline responsible."
- Source line: "*Moffatt v. Air Canada*, 2024 BCCRT 149, paras. 27–28. A tribunal decision."

**Sensitivity.**

- Name the airline only in the panel's quote and source. The scenario's company must be fictional and not an airline.
- The figure has two AI systems, so give them distinct labels: "AI DRAFT" and "SUPPORT ASSISTANT".
- Don't present a small-claims ruling as precedent.

### Fictional fallback: the supplier switch

Operations (EDITIONS-PLAN.md, scenario 7). Two procurement managers sign the same AI-drafted supplier switch, which rests on an AI cost estimate that assumes stable shipping. "Suppose the supplier misses delivery. Who made the call?" Like the PME version, it shows no study; the ruling can go on the page as a general line on accountability.

### Recommendation

**The support version.** The ruling is the clearest public record of the exact move the figure warns about, blaming the AI, and of what happened next. It also adds customer support. The risk is the two AI systems: test that in the cold read. If it confuses, use the supplier switch and move the ruling to the page.

---

## 8. Appropriate reliance

### Study-grounded (as built): Dell'Acqua et al. (2023), HBS Working Paper 24-013

**What it rests on.** Verified in [BCG-VERIFY.md](BCG-VERIFY.md):

- 758 consultants, split between two experiments.
- Inside the frontier: 18 product-development tasks for a fictional footwear company, with 12.2% more tasks done, 25.1% faster and at more than 40% higher quality.
- Outside the frontier: 84.5% correct without AI, against 70.6% with GPT-4 alone and 60% with the overview. Graders still rated AI users higher "regardless of the correctness of their answer."

The real setting is consultants doing business tasks.

**Business edition: a cast change only.**

- "Faculty check" becomes "Reviewer's check".
- "What I'd ask a student" becomes "what I'd ask an analyst".
- The reviewer is an engagement manager.
- "Your team's first draft" and "the launch plan" already read as business.

**Frame-first tests.** Passed in the PME version, unchanged.

### Fictional fallback

An operations pair: summarize renewal dates from 40 supplier contracts (inside), and pick which supplier to drop from a cost sheet and call notes (outside). It loses the study's measured split, so the frontier becomes an assertion.

### Recommendation

**Keep BCG.** It is the only study here that measures both sides of the frontier on business tasks.

---

## What didn't verify, and other cautions

- **Trendslop details.** Seven models, seven tensions, and "differentiation and augmentation" as the named defaults are secondary only. The HBR article is paywalled and I didn't read it; only the authors' summary is verified.
- **Otis.** The generic-versus-tailored detail is the working paper's exploratory reading, not checked in the published text. Its abstract ("nearly 0.25 SD") differs from the published one ("over 0.20 SD"), so use the published numbers.
- **Shen & Tamkin.** The 50% and 67% means come from Anthropic's post; the paper reports "a 17% score difference or 2 grade points". The interaction groups have 2 to 7 people. One of them (n = 2, 86%) cuts against showing a careful reader of AI code failing.
- **Brynjolfsson, Li & Raymond.** I expected the AI to help less on rare problems, which would map to uncalibrated reliance in customer support. The paper finds the opposite: "the gains from AI adoption are largest for relatively rare problems" (abstract, arXiv v2). Customer support is covered through the Air Canada decision instead.
- **Autor.** The authors can't say why some juniors gained and others didn't, so the figure's mechanism is its own.
- **Obermeyer.** The 84% is one measure, in the manufacturer's data, using a combined health-and-cost label. The study is of a predictive algorithm.
- **Doshi & Hauser.** I didn't verify the effect sizes for story similarity, so use the quoted sentence only.
- **From the October 27 checks, not re-read today:** Kirchkamp & Strobel (no Crossref abstract), Köbis's 95% and "about 15%" honesty rates, Kim et al.'s 60%, and Terwiesch et al.
- **Grocery fallback.** It conflicts with *Judgment at Work* (see figure 1).

## Considered and set aside

- **Brynjolfsson, Li & Raymond** as a scenario: its findings point toward AI teaching, so it serves as counter-evidence for figure 3.
- **Camuffo et al.** as figure 2's primary: it fits as support, but its three-arm design (a custom agent, GPT-4o, no AI) and one-shot task are a weaker fit for the two-person contrast than Autor's junior split.
- **Köbis et al.** for figure 7: it would pull the figure toward dishonesty. The PME version's people are sincere.
- **Kanis, Mann & Stumpf-Wollersheim (2026):** in a startup-evaluation task (N = 348), LLM use "reduces psychological ownership" (Crossref abstract). It supports figures 5 and 7 weakly and offers no clean scenario.
- **Dell'Acqua (2022), the recruiters study:** only the institute's summary is available, and the paper itself wasn't opened.

## Where each source was checked today

| Source | Checked in |
| --- | --- |
| Obermeyer et al. 2019 | Full published paper (FTC-hosted copy of the *Science* article), pp. 447–453; abstract on PubMed |
| Autor et al. 2026 | Full NBER PDF, October 7, 2026 version |
| Shen & Tamkin 2026 | arXiv 2601.20245 v2 full text; Anthropic research post |
| Otis et al. 2026 | *Management Science* abstract (Crossref); HBS WP 24-042 full text, 2026 revision |
| Lee et al. 2025 | Full CHI PDF |
| Jakesch et al. 2023 | arXiv abstract |
| Romasanta, Thomas & Levina 2026 | NYU Stern research highlight (authors' summary) |
| Bottesch 2025 | AIS eLibrary abstract |
| Doshi & Hauser 2024 | PMC full text (abstract and introduction) |
| Camuffo et al. 2026; Köbis et al. 2025; Gaczek et al. 2025; Kanis et al. 2026 | Crossref abstracts |
| *Moffatt v. Air Canada* 2024 | Decision text, BC Civil Resolution Tribunal decisions site |
| Brynjolfsson, Li & Raymond 2025 | arXiv 2304.11771 v2 full text |
| Dell'Acqua et al. 2023 | BCG-VERIFY.md (not re-read) |
