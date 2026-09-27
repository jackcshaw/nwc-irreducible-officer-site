# Teacher summaries for workbench tools

Date: 2026-09-27. Status: design approved in conversation; summaries revised with Jack's edits (2026-09-27).

## Purpose

When a teacher opens a workbench tool, the first thing on the page is text written for the AI assistant. Nothing says, in plain terms, what the teacher needs to bring, what they will do, and what they will leave with. This change puts that answer first, in a styled card that draws the eye, and moves the assistant's script out of the teacher's way.

## Decisions

| Question | Decision |
| --- | --- |
| Where summaries live | One `## At a glance` section per template in `nwc-faculty-workbench`, the same for every audience. The per-audience "How to use it" note stays in the side panel. |
| What a summary says | Exactly three bullets: **You bring**, **You do**, **You get**. No time estimate: there is no timing evidence yet; add one after pilots. |
| Who sees it | The teacher, as a card at the top of the tool view. The assistant also sees it, because downloads and copied links keep the full template. |
| The assistant's script | The AI Facilitation Block renders collapsed on the site under "What your assistant will do". Downloads and copied files are unchanged. |
| Supervised delegation | Moves from "Make it repeatable" to "Design an assignment". |
| Device priority | Desktop first. At phone width the card and collapsed section must stay readable with no horizontal scroll; no phone-only polish. |

Rejected: one summary per tool per audience (30 summaries that overlap the existing per-audience note); a time line (unsupported claim); leaving the facilitation block inline (the teacher reads a script meant for the AI).

## Components

### Workbench (`nwc-faculty-workbench`)

Each of the ten templates in `templates/` gains, immediately before `## Audience and readiness`:

```markdown
## At a glance

- **You bring:** …
- **You do:** …
- **You get:** …
```

Each bullet is one or two plain sentences addressed to the educator ("you"). No other content goes in the section.

### Site (`nwc-irreducible-officer-site`)

- **Extraction.** The build reads `## At a glance` from every template (shared and each adapted audience version) and fails with a named error if the section is missing, has other than the three labelled bullets, or sits anywhere but directly before `## Audience and readiness`.
- **Card.** The tool view shows the three bullets as a card headed "What you'll do", directly under the title bar and above the document. It uses the site's existing palette and type (cream, navy, red; Source Serif 4 / Source Sans 3) with a heavier border and heading than the document text, so it reads first. The rendered document below it omits the `## At a glance` section so the text appears once.
- **Collapsed script.** In the rendered document, the `## AI Facilitation Block` section (heading through the line before the next `## ` heading) is wrapped in `<details class="assistant-script"><summary>What your assistant will do</summary>…</details>`, closed by default.
- **Unchanged outputs.** Downloaded templates, context bundles, and the text "Start in your assistant" points to keep `## At a glance` and the full facilitation block.
- **Job group.** `supervised-delegation` moves to `job: "design"`; "Design an assignment" lists Frame Check, Assignment design worksheet, Source kit, Supervised delegation exercise.

## Summaries

**Frame Check**
- **You bring:** Your learning objective and the materials students will actually use (readings, documents, data).
- **You do:** Rate a weak and a strong example to calibrate, then choose among two or three rated candidate cases, or paste a case you already have for a check and repair.
- **You get:** A finished case or assignment, the five-test ratings behind it, and a list of factual claims to verify before class.

**Assignment design worksheet**
- **You bring:** An assignment you plan to run or revise, and what students should be able to do when it's done.
- **You do:** Work through where AI helps, where it gets in the way of learning, and which reliance decisions students must make themselves.
- **You get:** A revised assignment plan that shows the AI-free and AI-assisted steps and the evidence you will look at.

**Source kit**
- **You bring:** The readings and data students will use, and the standards you grade against.
- **You do:** Decide what counts as a source, what is off limits, what role AI plays, and what you will review.
- **You get:** A curated packet students and their assistant can work from, with its boundaries written down.

**Supervised delegation exercise**
- **You bring:** A multi-step task your students already handle well with structured AI requests.
- **You do:** Set the task brief, the checkpoints where students inspect AI work, and the rules for stopping or escalating.
- **You get:** An exercise and assessment that show whether students' judgment survives handing work to AI.

**Assessment rubric**
- **You bring:** The assignment, what it was meant to teach, and anonymized student work.
- **You do:** Choose the criteria that match what the assignment teaches, then use the questions to have students explain and defend their choices.
- **You get:** Notes on how each student reasoned and what help they used. You decide the grade.

**Flawed output library**
- **You bring:** A topic you teach and its key sources.
- **You do:** Shape plausible AI-style answers that each hide one flaw that changes the conclusion, plus the questions that expose it.
- **You get:** Reusable library entries: the student-facing text, an instructor key, and notes on when to retire each one.

**Faculty calibration protocol**
- **You bring:** Two or more colleagues and the same piece of anonymized AI-assisted student work.
- **You do:** Each judge it separately, then compare what you saw and where you disagree.
- **You get:** A calibration note that records shared standards and open disagreements, without forcing agreement.

**After-action note**
- **You bring:** An AI-enabled exercise you just ran and what you noticed while running it.
- **You do:** Record what worked, what confused students, and what to change, while it's fresh.
- **You get:** A note you or a colleague can use next time, including what to keep, revise, or retire.

**Method card**
- **You bring:** A task you have done well with AI at least twice.
- **You do:** Write down the brief, the steps, how to review the output, and when to stop.
- **You get:** A reusable method card: the steps and checks your assistant follows each time, much like a saved skill or custom GPT. You stop re-explaining the task.

**Placement diagnostic**
- **You bring:** An assignment, exercise, or course you want to match to the right workbench tool.
- **You do:** Answer a few questions about what students do with AI and what they must do themselves.
- **You get:** Which of six stages of AI use it asks of students, from asking AI questions to supervising multi-step AI work, and which tool to open next.

## Checks

| Check | Fails when |
| --- | --- |
| Template summary | A template (shared or any adapted audience version) lacks `## At a glance`, has other than exactly the three labelled bullets, or places it anywhere but directly before `## Audience and readiness`; the message names the file |
| Card | Any tool's view lacks the "What you'll do" card above the document, or the card's text differs from the template's bullets |
| Single appearance | The rendered document also contains the At a glance bullets |
| Collapsed script | The facilitation block is not inside a closed `details.assistant-script`, or opening it does not reveal the full block |
| Unchanged outputs | A downloaded template or context bundle is missing `## At a glance` or any line of the facilitation block |
| Job groups | "Design an assignment" does not list the four tools in the order above, or "Make it repeatable" still lists Supervised delegation |
| Existing suites | Any current node or browser check fails |

After the build passes, run one Impeccable critique of the tool view at desktop width; the card must read as the first element and the collapsed script must look intentional.

## Rollout

1. Workbench PR (ten summaries), then site PR (extraction, card, collapse, job move, checks), shared branch name `teacher-summaries`, each through the alignment gate.
2. Bump the site version to `2026.9.28`; deploy to production; verify every file byte for byte and the footer version.

## Out of scope

Per-audience summaries; time estimates; changes to template bodies beyond adding the section; phone-specific layout work.

## Risks

- A wrong or vague summary misleads more than no summary, because it is the first thing teachers read. The summaries above carry Jack's edits; any wording change during build goes back to him.
- Collapsing the facilitation block hides it from teachers who want to read it; the summary line "What your assistant will do" keeps it one click away.
