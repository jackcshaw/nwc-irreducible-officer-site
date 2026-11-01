# BCG Jagged Frontier: claim check

Checked 2026-10-28 against Dell'Acqua et al., "Navigating the Jagged Technological Frontier," HBS Working Paper 24-013 (September 2023). I used the Wayback capture at `web.archive.org/web/20260306120415/https://www.hbs.edu/ris/Publication%20Files/24-013_d9b45b68-...pdf` (58 pages). It downloaded and its text extracted cleanly. I read Figure 7 from a render of the page. I did not open the Organization Science version.

Page references give the printed page number first and the PDF page in brackets. The printed number is the PDF page minus 4.

---

## Claim 1. The outside-the-frontier task: **partly**

**What holds.** The task gave consultants a spreadsheet of financial data and a file of interviews with company insiders. They had to tell the CEO which brand to focus on. The right answer depended on details in the interview notes. The authors built the task so that GPT-4 would get it wrong.

**What the paper does not say.** It never says the spreadsheet on its own pointed to a different brand. It says the spreadsheet was "designed to seem to be comprehensive." It sets the correct conclusion against what *the AI* would produce from all the materials, not against what the spreadsheet suggested. The paper also never says which brand was correct. Appendix E quotes one participant's prompt naming "Kleding man," but it does not mark that answer as right.

Quotes:

> "After several iterations, we settled on a task based on an existing business case that used data on a spreadsheet, as well as a file presenting interviews with company insiders, which were adjusted and adapted to the goals of this experiment. To be able to solve the task correctly, participants would have to look at the quantitative data using subtle but clear insights from the interviews. While the spreadsheet data alone was designed to seem to be comprehensive, a careful review of the interview notes revealed crucial details. When considered in totality, this information led to a contrasting conclusion to what would have been provided by AI when prompted with the exercise instructions, the given data, and the accompanying interviews." (p. 13 [17], section 3.2)

> "The second experiment was designed so that GPT-4 would make an error when conducting the analysis, ensuring the work fell just outside the frontier." (p. 8 [12])

> "The CEO, Harold Van Muylders, would like to understand Kleding's performance by the company's three brands (Kleding Man, Kleding Woman, and Kleding Kids) to uncover deeper issues. Please find attached interviews from company insiders on this issue. In addition, the attached excel sheet provides financial data broken down by brands. ... If the CEO must pick one brand to focus on and invest to drive revenue growth in the company, what brand should that be?" (p. 40 [44], Appendix A)

**Drafted line:**

> On the task built to fall outside the frontier, consultants told a fictional clothing company's CEO which of its three brands to invest in, working from a spreadsheet of financial data and interviews with company insiders. The spreadsheet was designed to look complete, but the deciding details were in the interviews, and the authors designed the task so that GPT-4 would get it wrong.

If the line has to say the interviews "cut against" the data, write "against what the AI concluded from the same materials." The paper supports that. It does not support "against the spreadsheet."

---

## Claim 2. The inside-the-frontier tasks: **verified**

There were 18 product-development tasks for a footwear company (fictional, per footnote 5). They covered ideas, market segmentation, launch steps, and persuasive writing. "Segmentation" is the paper's own word: the task asks participants to "segment the footwear industry market by users," and the authors list "market segmentation" as a stage. "Launch plan" is a slight paraphrase. The task wording is "a list of steps needed to launch the product," and the authors describe the sequence as running "to entering the market." The assessment task that came first used a beverage company.

Quotes:

> "The inside-the-frontier experiment focused on creative product innovation and development. ... In this experimental task, participants were tasked with conceptualizing a footwear idea for niche markets and delineating every step involved, from prototype description to market segmentation to entering the market." (p. 8 [12])

> "Participants responded to a total of 18 tasks (or as many as they could within the given time frame). ... they can be categorized into four types: creativity (e.g., "Propose at least 10 ideas for a new shoe targeting an underserved market or sport."), analytical thinking (e.g., "Segment the footwear industry market based on users."), writing proficiency (e.g., "Draft a press release marketing copy for your product."), and persuasiveness (e.g., "Pen an inspirational memo to employees detailing why your product would outshine competitors.")." (p. 9 [13])

> "You are working for a footwear company in the unit developing new products. ... 4. Come up with a list of steps needed to launch the product. ... 6. Use your best knowledge to segment the footwear industry market by users." (p. 41 [45], Appendix A)

**Drafted line:**

> The tasks inside the frontier were 18 product-development questions for a fictional footwear company. Consultants generated ideas for a new shoe, segmented the market by users, listed the steps to launch it, and wrote a press release and a persuasive memo to employees.

---

## Claim 3. The two AI groups: **verified**

Both AI groups used the same GPT-4 tool. One group also got a prompt-engineering overview made of videos and documents. On the outside task, the group with the overview did worse. Figure 7 labels the overview group "GenAI Use + Overview Session" at **60.0%** correct and the GPT-only group "GenAI use" at **70.6%**, against 84.5% for the control group. In Table 4, column 1, the coefficients are −0.245 for GPT + Overview and −0.139 for GPT Only, with a control mean of 0.844. The text rounds them to 24 and 13 points. The −0.139 coefficient would round to 14. The authors find the gap between the two AI groups significant only at the 10% level (p = 0.082 in column 1).

Quotes:

> "the second ("GPT Only") had the assistance of an AI tool based on GPT-4; and the third ("GPT + Overview") not only utilized the same AI tool but also benefited from supplementary prompt engineering overview, which increased their familiarity with AI. These materials included instructional videos and documents that outlined and illustrated effective usage strategies." (p. 7 [11])

> "Both AI treatments— GPT + Overview and GPT Only — show a significant negative impact, with the GPT + Overview group experiencing a more pronounced decrease (24 percentage points versus 13 percentage points). ... When directly comparing the two treatments, the difference in their impacts is statistically significant at the 10% threshold across specifications." (p. 14 [18])

> Figure 7 bars: Control Condition 84.5%; GenAI Use + Overview Session 60.0%; GenAI use 70.6%. (p. 33 [37])

> Table 4, column 1: GPT + Overview −0.245***; GPT Only −0.139***; Control Mean 0.844; N = 373. (p. 37 [41])

**Drafted line:**

> Both AI groups used GPT-4, and one also got a short prompt-engineering overview of videos and documents. On the outside task, the group with the overview did worse: 60% correct against 70.6% for GPT-4 alone and 84.5% without AI.

---

## Figures the site already states

| Site statement | Status | Source in paper |
|---|---|---|
| 758 consultants | Verified, but see the note below | Abstract, p. 2 [4]: "758 consultants comprising about 7% of the individual contributor-level consultants." Footnote 3, p. 5 [9]: "Out of the 852 consultants who responded to the survey, 758 - about 89% - completed the experiment." |
| Inside: 12.2% more tasks | Verified | Abstract, p. 2 [4]: "they completed 12.2% more tasks on average." Body, p. 11 [15]: "a 12.2% increase in completion rates." The paper's own summary on p. 12 [16] says "12.5%," so the paper is inconsistent with itself. Keep 12.2%. |
| Inside: 25.1% faster | Verified | Abstract, p. 2 [4]: "completed tasks 25.1% more quickly." This averages the two groups on p. 12 [16]: 22.5% faster (GPT + Overview) and 27.63% (GPT Only). Caveat: participants had to stay the full 90 minutes, so "faster" means time taken to reach the last of the 18 questions. |
| Inside: more than 40% higher quality | Verified | Abstract, p. 2 [4]: "more than 40% higher quality compared to a control group." On p. 10 [14], GPT + Overview is +42.5% and GPT Only +38%. The mean across 108 regressions is +46.6% by human graders. |
| Outside: 84.5% without AI against 60% and 70% with it | Verified | p. 14 [18]: "Subjects in the control group were correct about this exercise about 84.5% of the time, while the AI conditions scored at 60% and 70%." |
| "19 percentage points less likely" | Verified, exact wording | Abstract, p. 2 [4]: "consultants using AI were 19 percentage points less likely to produce correct solutions compared to those without AI." Also p. 14 [18]: "an average decrease of 19 percentage points when combining the AI treatment conditions." |
| AI users' recommendations rated higher regardless of correctness | Verified | p. 15 [19]: "subjects using AI (both GPT + Overview and GPT Only) consistently outperformed those not using AI in terms of recommendation quality, regardless of the correctness of their answer." Limit: among wrong answers (Table 6, column 3, n = 105), the effect is significant only at the 10% level. Figure 8 shows +18% for wrong answers and +21% for right ones. |

**Note on 758.** The current source-spine entry says "758 BCG consultants using GPT-4 finished 12.2% more tasks...". That is loose in two ways. First, the 758 were split between the two experiments: 385 on the inside tasks and 373 on the outside task (p. 6 [10]). Second, a control group in each experiment worked without AI. A replacement opening that holds:

> In the field experiment, 758 BCG consultants were split between two sets of tasks and randomly assigned to work without AI, with GPT-4, or with GPT-4 plus a prompt-engineering overview.

**Coincidence to avoid.** On the outside task, GPT + Overview also raised recommendation quality by 25.1% (p. 15 [19]). That is the same number as the inside-task speed gain, so keep the two apart.
