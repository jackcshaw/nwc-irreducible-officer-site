# Cold read: invisible-delegation, business edition, figure, round 1

**Reader:** a manager/analyst at a company or nonprofit, first viewing, no essay.
**Material:** `figures/invisible-delegation/index.html?edition=business`, served locally on port 5417.
**Method:** Playwright autoplay after scrolling the figure into view, a frame every 0.5 s across the whole 1:33 run (196 frames per viewport) at 1280×900, 1280×720 and 390×844, viewed in order. I held key moments with `?t=18/40/58/70/80`, checked `?reduced` and emulated `prefers-reduced-motion`, and ran a keyboard pass. Caption text and the clock were logged at every frame.

Caption timings (the same at all three viewports; wall clock, figure time within about 0.5 s):

| Beat | On screen from | Length | Caption |
|---|---|---|---|
| 0 | 0.0 s | ~2.5 s | Name card |
| 1 | ~3 s (visible) | ~9.5 s | An analyst is improving a bad-news email to a client. We'll track three decisions. |
| 2 | 13.0 s | 11 s | The analyst asks an AI for feedback. The request carries the criteria across. |
| 3 | 24.0 s | 12 s | Then for a better structure, and a more professional version. |
| 4 | 36.0 s | 9 s | Each request left out whose standard to use. The AI used its own. |
| 5 | 45.0 s | 7 s | A second analyst starts from the firm's standard. |
| 6 | 52.0 s | 11.5 s | Before each request, the second analyst writes the decision down. |
| 7 | 63.5 s | 10.5 s | Both get the same AI notes. The second analyst judges them against their decisions. |
| 8 | 74.0 s | 13 s | The manager has only the emails, and asks each analyst about the standard. |
| 9 | 87.0 s, holds after 93 s | — | Reviewer's check (two lines, the second at ~90.5 s) |

No caption changed before I could read it. Every caption sits on screen for at least 7 s and is one or two short lines.

## 1. Beat by beat (1280×900, the full SVG picture)

**0 · Name card (0 to 2.5 s).** "Failure mode 5 of 7 / Invisible delegation" appears large, then shrinks to a plate in the top-left corner. It's clear. Before playback starts, the poster frame's clock reads "0:12 / 1:33" and then jumps to 0:00 when autoplay begins. That's an odd but small detail.

**1 · Setup (3 to 12.5 s).** A task card ("Example task: Tell the client the project slips three weeks.") appears, then a "Standard · Bad news first, with the new date." line fades in. A red dot labelled "First analyst" appears with a thumbnail email. Three lane headers follow: "The analyst decides | Requests | The AI decides". Then three dashed cards drop into the analyst's lane one by one ("The criteria", "How the email runs", "'Professional' means"), with three empty slots in the AI's lane. It holds about 3 s at the end. I read the dashed cards as "not yet decided", but the desktop picture has no key that says so. The stacked layout has one. The bottom ~40% of the stage stays empty until beat 5.

**2 · First request (13 to 24 s).** A bubble saying "Give me feedback" clips onto the criteria card, and the two slide across the middle lane into the AI's lane over about 4 s. The card turns tan there. The request settles as an italic quote in the middle lane. A tan "AI's notes" box appears under the email ("Cut the jargon", "Formal phrasing", "Reassure first"), and the analyst ticks all three: "Draft 2, revised with AI". The movement is easy to follow and the caption matches. I noticed on my own that "Reassure first" contradicts the standard ("Bad news first"), and the analyst ticked it anyway. Nothing on screen points that out yet, so a viewer who skimmed the standard won't catch it.

**3 · Two more requests (24 to 36 s).** "Suggest a better structure" carries "How the email runs" across, and "Make it more professional" carries "'Professional' means". Each crossing takes about 2.5 s, and the email goes from Draft 3 to Draft 4. It's easy to follow but repetitive; 12 s is long for "same thing twice more". The email thumbnail changes (some lines turn grey/tan), but at roughly 70 px it's too small to read those lines as "the AI's headings and paragraph". I only saw that something had changed.

**4 · What was left unsaid (36 to 45 s).** The three requests flash. A key reading "Left unsaid" appears next to "Requests", and under each request a line types out: "UNSAID: against your criteria / for your outline / as you define it". The three tan cards pulse. It's readable and holds about 5 s. **I tripped on the pronouns:** each request is addressed to the AI, so "as *you* define it" reads naturally as "as the AI defines it", which is the opposite of the intended meaning and is what actually happened. I only resolved it in beat 6, when the second analyst says "as *I* define it". "The AI used its own" is shown only by the cards sitting in the AI's lane. The one concrete piece of evidence, "Reassure first" against "Bad news first", isn't highlighted here, where it would prove the caption.

**5 · Second analyst (45 to 52 s).** The first analyst's ledger slides up and a second ledger fades in below it, with a fresh draft and the same three dashed cards. The red dot travels up to the task card, and the standard grows larger and is highlighted. It's simple and clear, and 7 s is enough.

**6 · Writing decisions down (52 to 63.5 s).** The dot "handwrites" in red on each card, turning it red-bordered, then asks a qualified request, with a small red arrow pointing back to the card:
- "Client leaves knowing the new date and why", then "Give me feedback *against my criteria*";
- "Date first, then the reason, then the plan", then "Suggest a better structure *for my outline*";
- "Plain, as our standard says", then "Make it more professional, *as I define it*".

The cards stay in the analyst's lane and the AI's lane stays empty. **This is the densest beat:** six new lines of small red italic (about 12 to 13 px) arrive in about 10 s, roughly 3 s per write-and-ask cycle. The caption doesn't change, so I wasn't rushed by it, but I couldn't read each card as it was written. I caught up in the ~1.5 s hold and later in the final frame.

**7 · Same notes, judged (63.5 to 74 s).** The same AI notes appear under the second email. The analyst ticks "Cut the jargon" and "Formal phrasing", the criteria card pulses, and "Reassure first" is struck through in red with "bad news first" written underneath. The same grey help then appears in this email up to Draft 4. It's clear, with a hold of about 3 s. **But:** this analyst defined "professional" as "Plain" and still ticked "Formal phrasing". A manager will notice that plain and formal pull in different directions. And "Plain, as our standard says" points to a standard that, on screen, says only "Bad news first, with the new date". Nothing about plain.

**8 · The manager asks (74 to 87 s).** The ledgers and notes fade to ghosts, and the two emails stay: both "Draft 4, revised with AI". "The manager asks: Better by whose standard?" appears top right. The first analyst's reply types word by word, "The AI's notes, I suppose. I worked through what it flagged.", then the second's, "Ours, set first from our standard: bad news first." Both are readable, with a hold of about 2 s. **The two email thumbnails are, for practical purposes, identical** (I zoomed them), even though one accepted "Reassure first" and the other struck it. See problem 2.

**9 · Reviewer's check (87 to 93 s, then holds).** The caption area becomes "INVISIBLE DELEGATION: A request for help hands over criteria, structure, or meaning." and "REVIEWER'S CHECK: What did the AI decide for them? / To find out, ask each analyst: better by whose standard?". The ledgers come back at full strength. "Illustration based on Lee et al., CHI (2025)." appears at the bottom right of the picture. The figure stops and holds, so nothing is rushed.

### 1280×720: a different figure

At this height the page drops the SVG for a **stacked text ledger** for the whole run. There are no lanes, no cards travel, and there are no email thumbnails. Colour plus a key (Undecided / AI decides / Analyst decides / Left unsaid) replace the lanes. Consequences:
- Beat 2 says "The request carries the criteria across", but nothing goes across. The card nudges right and turns tan. The caption doesn't match the picture.
- Beat 8 says "The manager has only the emails", but no emails are shown, only "Revised with AI / Draft 4" labels.
- For the first 45 s, the right half of the stage is empty.
- The request quote sits above its card, and the AI's notes box sits above the request, so the reading order is upside-down from cause to effect.
- The source line falls below the controls and is cut off at the bottom edge of the viewport.
- The final frame works as a table and is legible.

### 390×844

The same stacked layout as at 720, and it fits the phone well. The final frame fits in one screen at 11 to 14 px and is legible. The Restart button shrinks to its icon, which looks like the letter "C" (its accessible name is still "Restart"). The same caption/picture mismatches as at 720 apply ("across", "only the emails").

## 2. The point, in my words

If you ask an AI for "feedback", a "better structure" or something "more professional" without saying by what standard, you've quietly let it pick the standard. Decide your criteria first, judge its suggestions against them, and as a reviewer, ask "better by whose standard?" to find out which happened.

## 3. The question a manager should ask afterwards

"Before you asked the AI, what had you already decided this needed to do, and which of its suggestions did you turn down, and why?" (The figure's shorter version, "Better by whose standard?", is one I'd actually use in a review.)

## 4. The final frame alone

At 1280×900 it mostly carries the idea without the animation. Two ledgers sit side by side: the first analyst's three decisions are tan in "The AI decides", with the "unsaid" qualifiers under each request; the second's three are red in "The analyst decides", in their own words. "Reassure first" is struck through and replaced with "bad news first". The two replies sit next to the manager's question. It tells me: same AI, same notes, same standard, and the difference is who decided the criteria. It's dense; I needed about 20 s to take it in, and the lane headers do the explaining. What it doesn't carry: why the two emails look the same, and the "your/my" mismatch, which sits right there in the final frame. In the stacked layout (720 and 390) the final frame reads as a clear two-column comparison table.

## 5. Problems, ranked

1. **Pronoun trap in the "unsaid" lines (confusion).** "UNSAID: against *your* criteria / for *your* outline / as *you* define it" sits under requests addressed to the AI, so "your/you" reads as the AI's, which flips the meaning. The second analyst then says "against *my* criteria … as *I* define it". Make the unsaid lines match the second analyst's wording (my / my / I).
2. **The two emails come out identical, and the premise wobbles (ambiguous visual, business logic).** One analyst accepted "Reassure first" and the other struck it, so their emails should open differently. If they do differ, a manager could check the first email against the firm's standard ("bad news first") without asking anyone, which undercuts "the manager has only the emails". A business reader will say "I'd just read the opening line." Either show the emails differing in their opening (and make the question about something the email can't show), or pick a decision that doesn't show in the finished email.
3. **The qualified requests look like magic words (realism, confound).** "Give me feedback against my criteria" with the criteria card left behind in the analyst's lane means the AI never receives the criteria. Anyone who uses these tools knows that phrase does nothing on its own. And since "both get the same AI notes", the rewording visibly changed nothing. The only difference that mattered was the second analyst's own review afterwards. Either show the decision travelling with the request (and accept that the AI's notes would change), or present beat 6 as "writes the decision down to judge the help against", not as better prompting.
4. **"Plain, as our standard says" and "Formal phrasing" (internal inconsistency).** The visible standard is "Bad news first, with the new date" and says nothing about plain. And the analyst who defines professional as "Plain" ticks "Formal phrasing". Either add plain to the standard and have them strike "Formal phrasing", or change the card.
5. **At 1280×720 the motion story disappears (caption doesn't match picture).** A very common laptop size gets the stacked text layout: nothing "carries across", no emails for "only the emails", half the stage is empty for 45 s, and the source line is below the controls. The captions were written for the lane picture.
6. **Beat 6 is too fast to read as it happens (too fast).** Six new lines of small red italic in about 10 s. You can catch up in the final frame, but not while watching. Add about 1 s of hold after each written card, or let the first card play slowly and the next two quickly.
7. **A second difference between the analysts (fairness/confound).** Only the second analyst is shown consulting the standard; the first never looks at it. A viewer can read the first analyst's failure as "didn't know or didn't read the style guide" rather than "didn't decide before asking". The page text says both have the same standard, but the animation doesn't show the first analyst knowing it.
8. **The beat 4 caption is asserted, not shown.** "The AI used its own" would land harder if "Reassure first" pulsed against "Bad news first" here. That's the one place the AI's standard visibly conflicts with the firm's.
9. **Source line wording (overclaim risk, jargon).** "Illustration based on Lee et al., CHI (2025)" lets a manager assume the study observed this scenario. "CHI" means nothing to most business readers. Something like "Illustration informed by a 2025 survey of knowledge workers (Lee et al.)" is clearer. The body text below the figure is careful and honest.
10. **Military and classroom wording still on the page** (see section 7).
11. **Minor:**
    - The setup says "an analyst at an *agency*", the figure says "the *firm's* standard". In the US, "agency" can also mean a government agency.
    - The desktop picture has no key for dashed = undecided.
    - The 93 s runtime doesn't reach the contrast until 45 s, and beat 3 could be shorter.
    - Email thumbnail changes are too small to read as "headings and paragraph".
    - The poster clock shows 0:12 before playback.

**On fairness to the AI:** the AI's notes are reasonable. "Reassure first" is a real, widely taught approach to bad-news messages (the "buffer"), so the AI isn't made to look stupid; it just applied a different convention. "The AI used its own [standard]" personifies it slightly, but that's fine for a figure.

**On fairness to the people:** the first analyst's "I suppose" reads as honest, not lazy, and that's good. The bigger fairness issue is problem 7.

## 6. Mechanical checks

- **Reduced motion:** yes. With `?reduced`, and with `prefers-reduced-motion: reduce` emulated at 1280 and 390, the figure opens on the final frame at 1:33, with the full reviewer's check and the source line. The toggle reads "Play", and the beat list expands with "On screen:" descriptions.
- **Horizontal scroll at 390px:** none. scrollWidth equals clientWidth (390) at load and at t = 0, 20, 45, 65, 80 and 93 s, and no element's right edge goes past 390.
- **Keyboard:** yes.
  - Tab order: brand, Essay, Practice, Workplace, PME, **Play/Pause** ("Play the invisible delegation figure"), **Restart**, **scrub slider** ("Scrub through the figure"), then each beat button.
  - Space toggles play and pause.
  - Arrow keys step the scrubber 1 s at a time, with aria-valuetext like "0:06 of 1:33, beat 1 of 9"; End jumps to 1:33.
  - Enter on Restart restarts from 0:00, and Enter on a beat button jumps to that beat.
  - The focus ring is a visible 2px solid navy outline.
- **Numbers shown vs `sources/source-spine.md` and the essay:**
  - "Three weeks", "Draft 2/3/4" and "5 of 7" are constructed or structural.
  - **"319 knowledge workers" and "936 examples" are not in the source spine or the essay. Lee et al. (2025) isn't cited anywhere in the companion repo** (grepped for Lee, Sarkar, Tankelevitch, Microsoft, Carnegie, CHI, 319 and 936).
  - The page numbers (p. 1, 8, 11, 13) and participant IDs (P275, P144) also come only from the page; I checked them against the paper in the addendum below.

## 7. The extra questions

**Would a business or nonprofit reader see their own work here?** Yes, strongly. Telling a client a project has slipped is everyday work at agencies, consultancies and service firms, and "make this more professional" is one of the most common real prompts. A nonprofit reader translates easily (a funder or partner instead of a client, a style guide or comms policy instead of "the firm's standard"). The manager-reviews-the-draft moment is believable. The "Revised with AI" stamp on the emails is a figure device, not something real emails carry, but it reads fine.

**Does anything make the AI or either person look unfairly bad, or confound the contrast?**
- The AI is treated fairly (see above).
- The first analyst ticks a note that contradicts a standard printed right above them, and is never shown looking at it. That makes them look careless and adds a second difference (knowing or consulting the standard) on top of the intended one (deciding before asking). See problem 7.
- The qualified requests change nothing about the AI's output, so the visible cause of the better outcome is after-the-fact review, not delegation. See problem 3.
- The identical emails conflict with the different choices. See problem 2.

**Does the figure contradict its cited research?** Not as far as I could judge on a cold read. It doesn't claim the study showed this scenario. The study's headline finding (confidence in AI goes with less critical thinking, self-confidence with more) isn't depicted at all; the figure is about stewardship, and the P275 "make a passage professional" quote fits it closely. I checked this against the paper afterwards (see the addendum).

**Is the source line clear without overclaiming?**
- The setup paragraph and the study section are clear and careful: they call it constructed, say "self-reported", say "correlations", and say "each quote is one participant's".
- The in-figure line "Illustration based on Lee et al., CHI (2025)" is a little strong ("based on" implies the study documented this), and "CHI" is opaque to business readers.
- At 1280×720 the source line sits below the controls and falls off-screen.

**Military or classroom wording still on the page?** Yes, outside the figure itself:
- the edition switch "See this with: Workplace · PME";
- the note "PME (professional military education): the example from *The Irreducible Officer*, the National War College essay.";
- the reviewer's-check paragraph: "The questions come from *The Irreducible Officer*, an essay written for military education.";
- "Go further: The original essay, written for military education";
- the meta description starts "**A teaching figure:**" (classroom framing that shows up in link previews).

The figure's own text (SVG, stacked layout, captions, beat list) contains no military or classroom words; it uses "manager", "analyst", "client" and "firm" throughout. Whether to keep the provenance lines is an editorial call. They're accurate, but a business reader will notice a military essay behind a workplace example.

---

## Addendum: the page's claims checked against Lee et al. (2025)

*(Written after the cold read above.)*

**Status: incomplete. I could not re-read the paper in this session.** One download of the Microsoft Research PDF went through but was overwritten by mistake before I extracted it. The retry was then blocked by the session's permission system, so I stopped rather than fetch it another way. Everything below comes from my prior knowledge of the paper's abstract and framing, not a fresh read. Re-run this check with the PDF open before treating any quote or page number as verified.

| Page claim | Status |
|---|---|
| 319 knowledge workers, 936 first-hand examples of GenAI use at work | Matches the abstract as I know it. Not re-read here. |
| "higher confidence in GenAI is associated with less critical thinking, while higher self-confidence is associated with more critical thinking" (p. 1) | I recognise it as abstract wording, and the abstract is on p. 1. Not re-read here. |
| Stewardship: "translating intentions into queries, steering AI responses, and assessing if the AI response meets their quality standards for work, while retaining accountability for the work" (p. 13) | "Task stewardship" is one of the paper's three named shifts (with information verification and response integration). **Exact wording and page unverified.** |
| P275 quote, "[make a passage professional] … critical thinking didn't feel relevant" (p. 11) | **Unverified** (wording, participant ID, page). It fits the paper's "awareness" barrier as I recall it. |
| P144 quote, "whether the AI added irrelevant content and if it changed up my main point of the letter" (p. 8) | **Unverified** (wording, participant ID, page). |
| Self-reported survey; "critical thinking" means perceived enaction; links are correlational | Consistent with the study design as I know it (survey plus regression on self-reports). The page states the limits accurately. |
| Authors at Microsoft Research and Carnegie Mellon University | Consistent with my knowledge (lead author at CMU, the rest at Microsoft Research). |
| Full author list and title, CHI '25 | Consistent with my knowledge. Not re-read here. |

**Contradiction or overclaim (provisional):** nothing on the page contradicts the paper as I understand it. Two cautions:
- **The figure depicts a behaviour contrast, not a finding.** The study measured self-reported critical thinking and confidence. It did not observe anyone writing criteria before prompting, or compare outcomes between two such workers. The in-figure "Illustration based on Lee et al." can be read as "the study showed this"; the body text below correctly frames it as constructed.
- **The study's headline result (confidence in AI against self-confidence) isn't what the figure shows.** The figure's link to the paper runs through the stewardship framing and the P275 quote, so those two are the claims that most need the page-checked wording. Verify them first.

Also: Lee et al. (2025) and its numbers are **not in `sources/source-spine.md`** on the companion's `main` (commit 6eaafdd). If the figure cites it, the spine should carry it.
