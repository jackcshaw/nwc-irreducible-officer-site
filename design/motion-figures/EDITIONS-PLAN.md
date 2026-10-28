# Editions plan: keep PME, add business, make the failure modes universal

October 28, 2026. A proposal for Jack's review; nothing below is built yet except the nameplate, which is in progress.

## The strategy: one mechanism, swappable examples

Each figure has three layers. Only the outer two change between editions.

| Layer | What it is | Changes by edition? |
| --- | --- | --- |
| **Core** | The failure mode's name, the beat structure and motion, the colour grammar, the turn that makes the mechanism visible, and the logic of the separating question | No. This is what the cold reads tested and what makes the figure teach |
| **Scenario** | The task, the materials, the AI's output, the students' or analysts' answers, and the changed fact | Yes: PME, business, and later others |
| **Cast** | Who the people are: "students and faculty" or "analysts and a manager"; the check's heading ("Faculty check" or "Reviewer's check") and wording | Yes: classroom or workplace, independent of the scenario |

The failure modes become universal through the core and the names. The nameplate (in progress) makes every figure open on its name, keep the name in the corner and close on the name with a one-line definition. The name is the same in every edition, so a reader who meets frame capture as a war-college paper, a grocery strategy or a business-course case learns one idea under one name.

**Proposal: role-neutral definitions.** Today's one-line definitions say "student" (e.g. "The first plausible frame becomes the student's frame."). For the nameplate's final frame, use role-neutral wording that works with either cast, e.g. "The first plausible frame becomes the working frame, unexamined." The site's verbatim faculty checks stay as they are for the classroom cast.

## Editions

| Edition | Scenario | Cast | Where it shows |
| --- | --- | --- | --- |
| **PME** (exists) | Today's figures, labelled "Example from *The Irreducible Officer*, the National War College essay" | Classroom | The essay, the PME setting |
| **Business** (to build) | A business decision per figure (below) | Workplace | The business setting, standalone pages, Jack's articles, aicowboy |
| **Business, classroom cast** (nearly free later) | The same business scenarios | Classroom: students analysing a company case | Higher-ed and high-school settings, and the general educator default |

Adding a scenario costs real work: it has to pass the cold reads. Adding a cast costs little, mostly role words and the check wording, so one business scenario serves both workplace and classroom readers.

## Business scenarios, one per figure (draft, for Jack's reaction)

Each must pass the same frame-first tests as the PME versions:
- the flaw is in the frame, not the facts;
- two defensible frames exist;
- directing AI helps;
- something deserves acceptance;
- the changed case makes different evidence decisive.

1. **Frame capture:** a regional grocery chain responds to a discount grocer opening nearby. The AI's frame, "differentiate on fresh, local and service" (the default answer, per the trendslop finding), covers two of six considerations. This shares the case with *Judgment at Work*.
2. **Fluency substitution:** a polished memo recommends dropping a product line. Both analysts' memos are identical. The changed fact: the key distributor stops carrying the replacement.
3. **Premature synthesis:** six customer-interview summaries. The analyst who tried a connection that failed can say what would break the main one.
4. **Uncalibrated reliance:** two look-alike forecasts, weekly demand at two stores. One depends on a road closure that only the city notice shows.
5. **Invisible delegation:** "make the pitch more strategic", "give me feedback", "a better structure". The second analyst sets each decision first, from the client's brief.
6. **Institutional monoculture:** ten product teams ask the same AI for competitive strategy and get one frame. This is Jack's convergence point, and arguably stronger than the PME seminar.
7. **Responsibility laundering:** two managers sign the same AI-drafted supplier switch, which rests on an AI cost estimate that assumes stable shipping. "Suppose the supplier misses delivery. Who made the call?"
8. **Appropriate reliance:** already the BCG consulting tasks, so the business edition is mostly a cast change.

## Workplace checks (draft)

| Figure | Workplace check, with the separating follow-up |
| --- | --- |
| Frame capture | What problem did the analyst choose to solve? Why this frame? What would change it? |
| Fluency substitution | Can they explain the call in plain words, without the deck? Then change one fact. |
| Premature synthesis | Can they say why these connections matter? Point to one: what evidence would change it? |
| Uncalibrated reliance | What evidence justified relying on the AI here? Ask part by part. |
| Invisible delegation | What did the AI decide for them? Better by whose standard? |
| Institutional monoculture | What frames are missing across the team's analyses? What else could the problem be? |
| Responsibility laundering | Who owns the recommendation if it proves wrong? Ask why they relied on it. |
| Appropriate reliance | What evidence justified relying on the AI here, and what would have changed the call? |

## How it gets built

1. **Nameplate** (in progress): name card, corner plate and final-frame name plus definition, in the shared player.
2. **Pilot on frame capture.**
   - Move every word into data files: `editions/pme.json` and `editions/business.json` for the scenario, plus a shared `casts.json` for roles and check wording.
   - Prove the PME version renders frame for frame the same as before, with an automated frame comparison at every beat.
   - Build the grocery scenario with the workplace cast, and run one figure cold read.
3. **Refactor the other seven** in parallel, with no visible change, each verified by the frame comparison.
4. **Business scenarios for the other seven,** in parallel: a short storyboard pass, the build, and one or two figure cold reads each, with final fixes verified.
5. **Classroom cast for the business scenarios:** the role words and checks, plus a light read per figure.
6. **Edition switch:** on standalone pages ("See this with: Workplace · Classroom · PME"), tied to the site's setting selector, and in the book.
7. **Site integration** per [INTEGRATION-PLAN.md](INTEGRATION-PLAN.md).

**Effort:** roughly 1.5 to 2 days of agent time, mostly the seven new scenarios and their cold reads. The weekly usage limit is the main schedule risk; it paused the loop once.

## Decisions for Jack

1. Approve the role-neutral one-line definitions (wording to come with the pilot).
2. The workplace check wording (draft above).
3. The default edition for standalone pages and articles: business with the workplace cast is recommended.
4. React to the eight business scenarios before they're built.
5. Build the classroom cast for business now, or after the business edition proves out.
