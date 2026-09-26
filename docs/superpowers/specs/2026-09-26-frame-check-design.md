# Frame Check: assignment builder for every workbench

Date: 2026-09-26. Status: design approved in conversation; awaiting spec review.

## Purpose

Frame Check helps educators create and repair assignments that make students own a frame while directing AI. It turns the method used on 2026-09-25 to replace the survey and temperature cases (name the skill, run the stock-phrase test, rate against five tests, compare candidates, pressure-test, repair) into a workbench tool any educator can run. It also teaches that method: every rating is explained through the test it applies, so educators learn to make good examples, not just receive one.

Frame Check is the workbench's tenth tool, adapted for PME, higher education, and high school like the other nine.

## Decisions

| Question | Decision |
| --- | --- |
| How educators run it | In their own AI assistant (ChatGPT, Claude, Gemini) from a template, like the other nine tools. No backend. |
| Where the criteria live | Inline in the template, so the assistant always has them; kept identical to the companion design doc by CI |
| Modes | Build a case; Check and repair a case the educator already has; both preceded by an optional calibration primer |
| Per-audience content | The template holds all three primer pairs; the site keeps only the selected audience's pair |

Rejected: linking to the companion criteria instead of carrying them (assistants often do not fetch linked files); a standalone page outside the workbench (not available in every workbench, duplicates audience adaptation); an in-page builder with an AI backend (out of scope by the user's choice).

## Session design

The assistant asks one question at a time. The educator owns every decision. Every rating names the test it applies and answers that test's Ask question.

### Calibration primer (offered first, short)

The assistant shows the weak and strong example for the educator's setting and asks the educator to rate the weak one against the five tests before revealing the ratings. Pairs:

- **PME.** Weak: a fictional brief records 12 outages, 8 after equipment updates; the AI attributes all 12 to updates and recommends a fleet-wide rollback (a flaw "correlation isn't causation" catches). Strong: diagnostic evidence now confirms a software defect in 10 outages, and the AI's analysis of the defect is accurate; it recommends an immediate fleet-wide rollback because that fixes the defect fastest, while the decision the unit faces is keeping operations running through a scheduled exercise window, where a rollback carries its own operational risk. The facts are right; the success criterion is wrong. Fictional; needs PME faculty review.
- **Higher education.** Weak: the campus survey (100 of 1,000 invited students respond, 80 favor a later shuttle; the AI reports 80% of students). Strong: the return-to-office research memo, whose accurate synthesis treats productivity as short-run output averaged across workers.
- **High school.** Weak: the surface-temperature readings (sunlit asphalt 36°C vs. shaded grass 28°C; the AI says trees lower temperatures everywhere by 8°C). Strong: "Was the New Deal a success?", where an accurate essay judges success by recovery and never asks for whom.

### Mode 1: Build a case

1. Collect the subject, level, learning objective, and the educator's real materials. Nothing is generated from memory.
2. Name the target skill: the frame the student must own.
3. Propose two or three candidate cases. Rate each against the five tests (strong, weak, fails), answering each Ask question and naming any failure pattern.
4. Recommend one and say what it gives up. The educator chooses.
5. Pressure-test the choice: stock-phrase test; the contribution worth accepting and its check; a changed case that makes different evidence decisive; the factual claims to verify.
6. Build the full assignment: question, at least two defensible frames, a misframed AI answer that is factually sound, one contribution worth accepting with its check, a level-appropriate directing-AI task, the changed case, and a defended-frame rubric.

### Mode 2: Check and repair

1. The educator pastes an existing case or assignment.
2. Rate it against the five tests, quoting the draft for each rating.
3. Name the failure pattern (for example, one right answer a textbook rule reaches).
4. Propose the smallest repair that keeps the educator's material, as the survey became correct statistics with the wrong decision rule. Offer a fresh build only if repair cannot reach a passing case.

### Guardrails

- Never invent facts, sources, or student responses.
- List every factual claim in a generated case as needing a check against the educator's materials before use.
- A misframed answer with a factual error fails test 1; keep it accurate.
- Label generated content as constructed.

### Output: the Frame Check record

Markdown containing the final case or assignment, the five-test rating table, candidates considered and why they were rejected, claims awaiting verification, and decisions the educator deferred.

## Components

### Workbench (`nwc-faculty-workbench`)

- `templates/frame-check.md`, structured like the other templates:
  - `## Audience and readiness` (replaced per audience by the site)
  - `## AI Facilitation Block` (role, primer, both modes, guardrails, finish instruction)
  - `## The five tests` with `### 1.` … `### 5.` headings, each followed by `- **Ask:**` and `- **Fails when:**` lines
  - `## Directing AI well, by level`
  - `## Grading a defended frame` (the rubric bullets)
  - `## Frame Check workflow` (the six build steps, numbered)
  - `## Calibration primer`, with one block per audience delimited by `<!-- frame-check:primer <id> -->` and `<!-- /frame-check:primer <id> -->` where `<id>` is `pme`, `he`, or `k12`
  - `## Frame Check record` (output format)
- `audiences/profiles.json`: each profile's `tools` gains `"frame-check": {"title", "guidance"}`.

### Site (`nwc-irreducible-officer-site`)

- `getWorkbenchTools()` gains `{ id: "frame-check", title: "Frame Check", cardTitle: "Frame Check", cardDesc: "Build or check a case that makes students own the frame.", cardAction: "Open Frame Check", filename: "frame-check.md" }` with a use note in the same style as the others.
- `adaptTool` gains a Frame Check branch: for the selected audience, remove the other two primer blocks and the markers with `replaceOrThrow` (a missing marker stops the build).
- The phase-placement diagnostic's list of tools gains Frame Check.
- Contract tests and README counts move from 9 to 10 tools, 27 to 30 adapted templates, and each bundle's section count up by one.

### Companion (`nwc-irreducible-officer-companion`)

- `artifacts/frame-first-assignment-design.md` gains a `## Frame Check workflow` section with the six build steps and two calibration-table rows (the PME outage attribution, rated weak; the PME exercise-window rollback, rated strong), and remains the source of truth for the tests, rubric, workflow, and calibration verdicts.
- `alignment/retired-phrases.json`: the old-case rules (`shuttle`, `campus survey`, `asphalt`, `shaded grass`, `matched[- ]tiles?`, `surface-temperature readings`) add `templates/frame-check.md` to `allowed_in`.

## Checks

| Check | Fails when |
| --- | --- |
| Frame Check sync | The five test names, their Ask lines, the rubric bullets, the six workflow steps, or the calibration verdicts for the primer pairs differ between `templates/frame-check.md` and the companion design doc; the message names the differing item |
| Primer per audience | An audience's adapted Frame Check contains another audience's primer pair or any primer marker |
| Retired phrases | Old-case phrases appear anywhere other than the allowed history files and `templates/frame-check.md` (existing check, narrowly extended) |
| Browser | The Frame Check card is missing from any audience's workbench, does not open, or its download link fails |
| Contracts | Tool, template, and bundle counts do not match the new totals |

## Live assistant test (before release)

Scripted sessions in a real assistant, saved as test records and labeled as scripted, not educator evidence:

1. Build mode, higher education: an introductory public health policy course with a supplied reading list. Pass when the assistant proposes two or three rated candidates, recommends one, and cites only supplied sources.
2. Check and repair, high school: the old temperature case pasted as the draft. Pass when the assistant names the template-solvable flaw and proposes a repair before any rebuild.
3. Primer, PME: pass when the assistant asks the educator to rate the weak example before revealing the ratings.

Failures are fixed in the facilitation block before release.

## Rollout

1. Companion PR (workflow section, retired-phrase allowance), then workbench PR (template, profile entries), then site PR (tool registry, adaptation, checks, counts), each through the alignment gate. Shared branch name `frame-check`.
2. Live assistant test.
3. Bump the site version to `2026.9.27`; deploy to production; verify every file byte for byte and the footer version.
4. Update the draft to Andy Rotherham: the third bullet says the update includes Frame Check.

## Out of scope

An in-page builder or AI backend; storing records on a server; grading student work.

## Risks

- Assistants may skip the primer or collapse candidates into one answer; the live test checks both, and the facilitation block states them as required steps.
- Generated cases may contain plausible but wrong facts; the guardrail lists every claim for verification, but the educator must do the check.
- The PME strong example is fictional and outside Jack's domain; it needs PME faculty review before it is shared as an exemplar.
