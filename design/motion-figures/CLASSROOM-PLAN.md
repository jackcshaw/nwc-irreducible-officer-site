# Classroom cast for the business scenarios: plan

October 29, 2026. A plan for Jack's review. Nothing here is built.

## Recommendation

Give the eight business editions a classroom cast through data, keeping the scenarios. Students work the same study-grounded case as a class assignment, and faculty or a teacher review it.

- **Seven figures need only role words and a few framing sentences.** The picture, timeline, materials, answers and changed fact stay as built and cold-read.
- **Uncalibrated reliance needs a real scenario change.** Its decisive evidence is the owner's own sales records. In class, those records become an exhibit in the case packet that every student gets.
- **No figure needs skipping for higher education.** For high school, fluency substitution (patent law) is the weakest fit. If its high-school read fails, high-school links send that figure to the workplace edition.
- **Mechanism:** three additive fields in each `business.json` (`casts`, `castOverrides`, `byCast`) and one new cast, `high-school`. No separate `business-classroom.json` files.

Business is done and verified (MORNING.md), so Jack's "build classroom after business" condition is met.

## What the classroom version is

- **Scenario:** the business edition's, unchanged: the task, materials, AI output, answers, changed fact, timeline and source line.
- **Framing:** the people are students doing the company's case for a class. Each setup names the subject (health policy, programming, business writing, strategy) and says the study followed lawyers, engineers or owners, not students.
- **Casts:**
  - `classroom` (exists; PME uses it): student, faculty, seminar, "Faculty check". For higher ed.
  - `high-school` (new): student, the teacher, class, "Teacher's check". For high school.
- **Check:** the business check's questions under the classroom heading (decision 3). The follow-ups were tuned and cold-read against these scenarios.

## Per figure

Literal counts are role words written into `business.json` instead of `{key}` (analyst, manager, associate, partner, engineer, tech lead, owner, reviewer).

### 1. Frame capture: swap plus framing (the pilot)

- **Today:** keys throughout except 11 literals: the turn caption ("The second analyst checks it"), `narrow.askNote`, the setup, the description, the links note and two evidence lines.
- **Framing:** a student works a health system's case for a class; faculty receive the ranking. For educators, the setup's bridge can read "like test scores for learning, or sales for customer value".
- **Logic:** unchanged. Both students get the same task, considerations and AI frame. "What would change it?" is the first difference. The check uses the case's patient data.
- **Study:** the analysts were constructed; the students are too. The race finding stays in the paper's words.
- **High school:** suitable. The source line names a racial disparity. Keep it on screen, as the K–12 guide handles race in its Social Security example, and add a teacher note on the page (decision 5).

### 2. Fluency substitution: role conversion, then swap

- **Today:** every role word is literal (59): "Associate", "the partner", "Partner's check".
- **Conversion:** move them to keys, with workplace overrides (person "associate", reviewer "the partner", check "Partner's check"). The business edition must frame-diff to 0.
- **Framing:** two students in a patent or invention class draft claims for an inventor's wearable from the same notes. Faculty set the drafts aside and ask, which is the oral defense the PME edition models.
- **Logic:** unchanged: the same notes, AI and draft; both explain the claims; the changed fact separates them.
- **Study:** practicing lawyers, with the split among juniors. The page must say students weren't the sample. Educators may read "AI harms learners" into it, so keep "seniors gained; juniors split" near the top of the evidence.
- **High school:** the weakest fit. Patent claims are remote for most teens, though engineering-design classes cover prior art. Run a high-school read; if it fails, use the workplace edition for high school.

### 3. Premature synthesis: role conversion, then swap

- **Today:** 55 literals ("engineer", "the tech lead", "In review").
- **Framing:** two students in a programming class build the feature with a library new to them. "In class, code closed." Faculty point to 2–5.
- **Logic:** unchanged.
- **Study:** a closer fit than the workplace version, since the study measured learning a new library with a quiz. Its participants were mostly experienced developers (29 of 52 had seven or more years), so the page must not call them students. Keep the authors' incentive limit.
- **High school:** fine for a CS class, abstract for others. No sensitivity issue.

### 4. Uncalibrated reliance: scenario change

- **Today:** 58 literals ("owner", "a reviewer"), and the figure turns on the owner's own sales records.
- **Who holds the records: the case packet.**
  - Faculty give every student the same packet: two battery quotes, the rival's flyer and the shop's sales records.
  - Each student gives the AI the quotes and the flyer, and leaves out the records, as the owner does now.
  - Faculty see only the plans.
- **What changes:**
  - the setup;
  - beat 1: "A student asks an AI two questions about the shop's case, sharing everything but the sales records." (17 words; it needs 7.2 s and the beat is 8.6 s);
  - owner labels become keys;
  - the second answer: "Our records." becomes "The shop's records.";
  - the panel heading: "A REAL STUDY, NOT THESE OWNERS" becomes "A REAL STUDY OF SHOP OWNERS", or similar, fitted to the panel;
  - the key: "AN OWNER'S OWN WORK" becomes `{A_person|upper}'S OWN WORK`.
- **Logic:**
  - same access: the same packet;
  - no straw man: the first student checks Part 1 carefully;
  - first difference: Part 2.
  - One shift: faculty know the case, so they can see that plan 1's discount is off. The question then diagnoses rather than detects. It shows Part 1 was checked and Part 2 trusted by association. That is a fair classroom use; the read should confirm it doesn't feel like a trick.
- **Study:** the study's owners acted on advice for their own businesses; students advise one. The panel stays the study's owners, with a heading that says so.
- **Main risk:** leaving the records out may look contrived for a student, where an owner keeping their own records is natural. The first cold read targets this.
- **Rejected:** a student-run business, such as a school store. It's closer to the study's owners, but it drops the Nairobi shop and needs a new scenario with two reads from scratch.
- **High school:** suitable. Blackouts, a rival's flyer and same-day service are concrete. Keep the business sensitivity rules: no weak or strong labels on people, and Nairobi stays matter-of-fact.

### 5. Invisible delegation: swap plus framing

- **Today:** keys throughout except 6 page literals.
- **One caption breaks with plural "Faculty".** Beat 8, "{reviewer_has} only the emails, and asks each {person} two questions", becomes "Faculty have only the emails, and asks…". Reword it.
- **Framing:** a business-writing assignment, which is a staple of that course: tell the client the project slips three weeks, to the firm's standard. The standard belongs to the case, so the answers stay "The firm's standard."
- **Logic:** unchanged.
- **Study:** knowledge workers. P275's "make a passage professional" is what students ask an AI too. The page notes the sample.
- **High school:** strong fit; professional email is taught.

### 6. Institutional monoculture: swap plus framing

- **Today:** about 14 literals, ten of them "manager". Examples: beat 8's "Imagine the manager sends them back" and "Not seen by the manager" in the beat list. It needs a new key, `reviewer_sends`.
- **Framing:** ten students in a strategy class answer the same case question with the school's AI. "The CEO's question" becomes "a case question"; "the company's AI" becomes "the school's AI". `{group}` gives "seminar" or "class".
- **Logic:** unchanged. It may be stronger in class, where a whole class drafting with one AI is the plainest monoculture.
- **Study:** trendslop is a property of the models. Bottesch's workers weren't students; the page says so.
- **High school:** strong fit. "The school's AI" also matches the K–12 guide, which doesn't assume students have their own accounts.

### 7. Responsibility laundering: swap plus framing

- **Today:** keys throughout. One literal ("to the manager and the company"), plus framing: "on a retailer's support team" and "inside the company".
- **Framing:** two students working a retailer's case recommend whether its chatbot goes live, and sign it. The PME edition already has students signing a recommendation.
- **Logic:** unchanged.
- **Risk:** a class reader may take "who made this call?" as an academic-integrity question. The "Drafted with AI" tag shows AI use was allowed; the setup should say so too.
- **Study:** *Moffatt* stays a related case. The page says "answer for it" means to faculty, for the work they submit.
- **High school:** fine. The bereavement fare appears only on the page.

### 8. Appropriate reliance: pure swap

- The PME edition already shows the study's BCG tasks with the classroom cast, so the scenario is proven with students.
- One literal: "the reviewer's question" in the links note. "Your team's first draft" and "the launch plan" read as a class team project too.
- **Fit check:** the switch sits on the kicker row, and a third link must still fit there.

## Mechanism

Three additive fields in an edition, read by `loadEdition`:

- **`casts`**, e.g. `["workplace", "classroom", "high-school"]`: the casts this edition supports.
  - A `?cast=` outside the list falls back to the edition's own `cast`. Until a figure is built, `?cast=classroom` can't show "student" beside a literal "associate".
  - No list means any cast, as today.
- **`castOverrides`**, e.g. `{workplace: {person: "associate", Person: "Associate", reviewer: "the partner", check: "Partner’s check", …}}`: this edition's role words, merged over `casts.json`.
  - It lets FS, PS and UR move literal roles into keys while the business edition renders the same.
  - Overrides may only redefine keys that exist. New keys still go into `casts.json`, for every cast.
- **`byCast`**, e.g. `{classroom: {"page.setup": "…", "beats.0.text": "…"}, "high-school": "classroom"}`: whole-string replacements by path, applied before `{key}` filling.
  - One patch with keys in it serves both classroom casts. A string value inherits another cast's patches.
  - Where a verb follows a reviewer word, carry the verb in a key, or patch the two casts separately: "Faculty, who see…" against "The teacher, who sees…".
  - Patches change words only, never the timeline, layout or data that drives drawing. A patched string must fit where the original fit.

**Order:** the edition, then the `byCast` patches, then filling from `casts.json[cast]` merged with `castOverrides[cast]`. An edition without these fields loads exactly as now. After the runtime change, PME and business must frame-diff to 0 for all eight figures before any edition changes.

**Held in reserve:** a separate `business-classroom.json`, for a figure whose drawing or timing must change. None does in this plan.

**The `high-school` cast** copies classroom's person keys. Its reviewer is "the teacher", with singular verbs ("The teacher asks", "What the teacher receives"), the same forms as workplace's, so the business editions' grammar holds. The group is "class", and the check heading "Teacher's check".

**New key:** `reviewer_sends`, in every cast: "faculty send", "the teacher sends", "the manager sends".

**The edition switch has a bug to fix first.** `fillPage` keeps every query parameter, so from `?cast=classroom` the "Workplace" link would stay classroom. Add `data-cast-link`:
- each link sets `cast` or clears it;
- `aria-current` matches both edition and cast;
- the loader keeps the edition's default cast id. Today the cast object overwrites it.

### Files that change

- `runtime/motion.js`: `loadEdition` (the three fields; keep the default cast id), `fillPage` (a cast-aware switch), and `BUILTIN_CASTS` regenerated.
- `casts.json`: the `high-school` cast and `reviewer_sends`.
- `figures/*/editions/business.json`, all eight: keys for literal roles, plus `casts`, `castOverrides` and `byCast`.
- `figures/*/index.html`: the Classroom link (AR's goes on the kicker row).
- Scripts get `--cast=id`, with shots going to `shots/business-classroom/`:
  - `scripts/frame-diff.mjs`;
  - `figure-shots.mjs`;
  - `figure-export.mjs`;
  - `figure-branches.mjs`;
  - `figures/appropriate-reliance/regression/ar-regress.mjs`.
- New `scripts/edition-check.mjs`. It resolves every edition with each listed cast and fails on:
  - an unfilled `{key}`;
  - the other cast's role words, with a per-figure allowlist (the study's "owners"; "partner or license");
  - a reviewer key followed by a singular verb.
- Docs:
  - `CONVENTIONS.md` (Editions);
  - `EDITIONS-PLAN.md`;
  - `MORNING.md`;
  - `INTEGRATION-PLAN.md`: pre-render per cast, and map the site's settings (HE to `classroom`, K–12 to `high-school`);
  - a "Classroom cast" section in each `storyboard-business.md`;
  - the review page, `index.html`.

## High school against higher ed

- **One classroom version serves both.** The framing is level-neutral ("for a class"), and the cast supplies "faculty" and "seminar", or "the teacher" and "class".
- **What the HE guide expects:** disciplinary evidence. Naming each case's subject lets an instructor see where it fits.
- **What the K–12 guide expects:**
  - The teacher supplies the task and materials. Every case here is teacher-supplied, and UR's packet makes that literal.
  - Students may not have their own AI accounts. IM's "the school's AI" fits that.
  - Teachers read the page, and students see the figure, so page copy can stay at its current level.
- **Gentler setups:**
  - FC: the race finding stays, with a teacher note (decision 5).
  - RL: the bereavement fare is page-only, so leave it.
  - UR: keep the business sensitivity rules.
  - FS: the problem is complexity, not sensitivity. Use the workplace fallback if needed.
- **Fit for high school:**
  - strong: FC, ID, IM, UR, RL and AR;
  - fair: PS, in CS classes;
  - weakest: FS.

## Effort and order

**Sequence:**

0. Capture `regression/baseline-business` for ID and UR. Those two don't have one yet.
1. The runtime, casts, scripts and `edition-check.mjs`. **Gate:** all eight PME and business editions frame-diff to 0.
2. **Pilot: frame capture, end to end.**
   - keys and patches;
   - both classroom casts at 1440 × 900, 1280 × 720, 1366 × 657 and 390 × 844;
   - the switch;
   - one light read.

   **Gate:** Jack sees the pilot. FC goes first because the HE and K–12 guides both name it the first test, and because it tests the race note.
3. **Wave 1, in parallel:** UR (the riskiest logic), ID (the strongest high-school fit) and PS (the strongest HE fit).
4. **Wave 2, in parallel:** IM, RL, AR and FS (with a high-school read).
5. The switch on all pages, the review page, the docs and a final verifier.

**A light read** is one fresh reader with an educator persona per figure, covering both classroom casts on desktop and phone. They answer:
- What is the failure?
- What separates the two students?
- Does anything read as cheating, or as "don't use AI"?
- Are any workplace words left?
- Does the case make sense as a class assignment?

| Figure | Kind | Literals to convert | Reads | Estimate |
| --- | --- | --- | --- | --- |
| Appropriate reliance | Swap, light read | 1 | 1 | 1 h |
| Responsibility laundering | Swap, light read | 1, plus framing | 1 | 1.5 h |
| Invisible delegation | Swap, light read | 6, plus one grammar fix | 1 | 1.5 h |
| Institutional monoculture | Swap, light read | about 14, plus a new key | 1 | 2 h |
| Frame capture (pilot) | Swap, light read | 11 | 1 | 2.5 h |
| Premature synthesis | Swap, light read (heavy conversion) | 55 | 1 | 3 h |
| Fluency substitution | Swap, light read (heavy conversion) | 59 | 1, plus a high-school read | 3.5 h |
| Uncalibrated reliance | Scenario change, two reads | 58 | 2 | 5 h |

**Totals:**
- the figures above, plus about 3 h for the mechanism and 2 h for the switch and docs: roughly 22–26 agent-hours;
- about one day elapsed with three or four agents after the pilot;
- the weekly usage limit is still the main schedule risk.

## Risks

- **UR's held-back records** may read as contrived for a student. The fallback is to skip UR's classroom version and show the workplace edition.
- **FS and PS** may be read as "AI harms learning". Their pages already carry the counter-findings; keep them prominent.
- **RL** may be read as an academic-integrity story. The disclosure tag and the setup carry the fix.
- **Plural "Faculty"** breaks literal verbs that follow a reviewer key. `edition-check.mjs` flags them.

## Decisions for Jack

1. **Mechanism:** overrides and patches on the business edition (recommended), or a separate classroom file per figure.
2. **High school:** add a `high-school` cast ("the teacher", "Teacher's check", "class") beside `classroom` ("faculty", "seminar"). Recommended.
3. **Check wording:** the business checks under "Faculty check" (recommended), or the site's verbatim faculty checks.
4. **The switch:** "Workplace · Classroom · Military education", with high school reached through the site's K–12 setting or `?cast=high-school` (recommended). The alternative is a fourth "High school" link.
5. **The race line in FC for high school:** keep it on screen with a teacher note on the page (recommended), or move it to the page.
6. **UR:** students work the shop as a case, the packet holds the records and faculty see only the plans (recommended), or skip UR's classroom version.
7. **FS for high school:** ship the classroom version only if the high-school read passes, and otherwise use the workplace edition.
