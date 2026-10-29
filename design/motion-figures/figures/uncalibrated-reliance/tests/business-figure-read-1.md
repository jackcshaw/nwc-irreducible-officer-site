# Cold read: uncalibrated reliance, business edition, figure, round 1

Reader stance: a manager, small-business owner or nonprofit lead who has never read the essay. Material: `figures/uncalibrated-reliance/index.html?edition=business` only, served locally on port 5741.

How I watched it: Playwright (Chromium). I scrolled the shot and controls fully into view, and autoplay started from 0:00. I captured frames every 0.5 s across the full 1:33 run (210 frames at each viewport) at 1280×900, 1280×720 and 390×844, logged the caption text with every frame, and viewed the frames in order. I then held key moments with `?t=` (10, 30, 46, 47, 50, 56, 60, 62, 67 and 999), checked `?reduced` and `prefers-reduced-motion`, tested the keyboard and checked for horizontal scroll at 390 px. Caption timings were the same at all three viewports, within 0.5 s.

---

## 1. Beat by beat (desktop, 1280×900; caption on-screen times from the frame log)

| Time | Caption (words, time on screen) | What I saw | What I took it to mean |
|---|---|---|---|
| 0:00–0:03 | Nameplate: "Failure mode 4 of 7 / Uncalibrated reliance" | Large title, which slides to the top-left corner at 0:03. | A named mistake, one of a set. |
| 0:03–0:12 | 1/10 "A shop owner gives an AI two questions and four documents." (14 words, 9 s) | Task card types in (Part 1: keep printing in blackouts; Part 2: win back customers). A red dot labelled "Owner" appears, then four tabs: Battery quote ×2, Rival's flyer, Sales book. At 0:09 grey copies slide into a small stack labelled "Given to the AI". The slide takes about half a second, but the stack stays. | Clear. The AI has everything the owner has. |
| 0:12–0:19 | 2/10 "It answers both with equal confidence." (9 words, 7 s) | Two cards, "AI's answers", Part 1 and Part 2, type in together on a beige band. "Buy battery A: runs 6 hours, costs less" and "Cut prices 10%: match the new shop". Identical grey READY tags pop at 0:16. | Clear. Same tag, same look: no signal about which answer to trust. |
| 0:19–0:26.5 | 3/10 "The owner checks Part 1 against the two battery quotes. It's right." (15 words, 7.5 s) | The dot visits each battery quote, and grey lines appear under each tab as "opened". A "First owner's plan" sheet appears, Part 1 slides in, and the red mark "✓ Checked" follows. | Clear. The opened quotes show only grey lines, so "It's right" is something I'm told, not shown. That's fine. |
| 0:26.5–0:33.5 | 4/10 "Part 2 looks just as sure, so they use it." (13 words, 7 s) | Part 2's READY tag swells (0:27.5), Part 2 slides into the plan (0:29.5), and the mark "Used as is" appears. The quotes close. | Clear. The trust carried over from Part 1. |
| 0:33.5–0:41 | 5/10 "Another owner, with the same answers, checks each at its source." (14 words, 7.5 s) | A second dot and an empty "Second owner's plan" appear (0:34.5–0:35), both READY tags blink, the dot visits both quotes, and Part 1 goes in "✓ Checked" (0:38.5). | Clear, though six events in about 5 s is busy. From here the second dot loses its "Second owner" label; the first dot keeps "First owner". |
| 0:41–0:52 | 6/10 "That owner checks Part 2 against the flyer and the sales book, and changes it." (18 words, 11 s) | The flyer opens (0:42.5): "THEIR PRICES / 10% below ours / (the new shop)". A note appears in the plan: "Flyer: new shop 10% cheaper." The sales book opens (0:44): "OUR SALES / Mostly same-day / Margin: under 10%", with the note "Book: same-day jobs, thin margin." After about 2 s, Part 2 slides in (0:46.5) and is struck through and rewritten to "Keep prices: outpace the new shop" (0:47–0:48.5), then marked ✓ Checked (0:49). | The densest beat: two documents, two notes and a two-step rewrite in about 8 s, with the small document text competing with the strikeouts. I kept up, but only just. A slower reader will read the documents while the rewrite is already happening. |
| 0:52–1:01.5 | 7/10 "Part 2 depends on why customers come here. A jagged frontier marks where an AI stops being reliable." (21 words, 9.5 s) | "Mostly same-day" is underlined (0:53). The AI's "match the new shop" is underlined and tagged "THEIR PRICES" (0:54). A jagged line draws between the two AI cards (0:57–0:58.5), labelled "Inside the frontier" above and "Outside the frontier" below (0:59), and both cards outline. | The picture fits the caption. "Jagged frontier" is new jargon for this reader, but the caption defines it. The "THEIR PRICES vs OUR SALES" contrast works if you notice the document headers. The frontier is fully drawn about 2.5 s before the next caption, which is enough. |
| 1:01.5–1:11 | 8/10 "In a field experiment in Kenya, the same AI assistant split owners' results." (16 words, 9.5 s) | The scene dims and a panel rises: "Effect on revenue and profit". A zero axis; bars grow at 1:04: "On average: no clear change" (a stub at zero), "Started weaker: nearly 10% worse" (bar left of zero), "Started stronger: may have gained over 15%" (bar right). A bracket appears at 1:05, and its text at 1:05.5: "The gap seems to come from which advice they acted on". Source line: "OTIS ET AL. (2026) · KENYAN ENTREPRENEURS · MANAGEMENT SCIENCE". | **Too fast.** The caption plus panel is about 50 words, and the bracket text, which is the point, is on screen for only 5.5 s before the panel leaves at 1:11. I also immediately read the left bar as the first owner and the right bar as the second owner (see Problems). |
| 1:11–1:27 | 9/10 "The mentor points to each part in turn and asks what justified relying on it." (18 words, 16 s) | The panel goes. Red marks and the second owner's notes lift off. "The mentor sees only the plans" appears. Part 1 is outlined in both plans and each owner says "The battery quotes." Part 2 is outlined: the first owner says "Part 1 checked out, so I trusted the rest." and the second says "Our sales book. They come for speed." | Well paced. But **who is "the mentor"?** This is the first mention. There is no mentor on screen, and the check card later calls the same role "Reviewer". |
| 1:27–1:33 + hold | "UNCALIBRATED RELIANCE: Confident output is accepted without knowing whether the task fits the tool. REVIEWER'S CHECK: What evidence justified relying on the AI here? / Ask part by part: was the evidence about that part?" (second line at 1:30) | End frame: both plans, both owners' answers, the AI cards with the frontier, the legend "Written by AI" (beige) and "An owner's own work" (red), and the line "Illustration based on Otis et al., Management Science (2026)." | Clear and strong. |

Moments where I wasn't sure what I was looking at:
- 0:41–0:50: reading the flyer and sales-book text while the rewrite happens.
- 1:04–1:11: the panel is gone before I had finished reading it and thinking about it.
- 1:11: "the mentor" appears without introduction.
- From about 0:35 to the end, the second owner's dot has no label on desktop. I could still tell it apart by position.

No caption changed before I could read the caption itself. The panel's own text is the only place where text left too early.

## 2. The point, in my words

When an AI gives you several answers that all look equally sure, checking one of them tells you nothing about the others. Each answer has to be checked against the evidence for that answer, especially the parts that depend on knowing your own business.

## 3. The question a manager or mentor should ask afterwards

"For each piece of this plan that came from the AI, what did you check it against, and was that check about this piece?"

## 4. The final frame alone

It mostly carries the idea without the animation. Side by side, I see two plans with the same AI text in Part 1. In Part 2, one plan still says "Cut prices 10%: match the new shop" and the other has a red rewrite. Each owner's spoken reason sits under their plan, and the AI's two answers are split by a jagged "inside / outside the frontier" line. The first owner's reason for Part 2, "Part 1 checked out, so I trusted the rest", is the punchline and reads on its own. The check question underneath tells me what to do.

What it says to me: one checked answer is not a licence for the next.

What it loses without the animation: the "equal confidence" moment, where the two READY tags pop together. The static READY tags carry some of that.

One tension: the check text says "Nothing on either plan shows where the AI stopped being reliable", yet the second plan has a visible red rewrite at exactly the Part 2 spot.

## 5. Problems, ranked

1. **The evidence panel adds a second difference between the two owners.** Inside the story the owners differ only in how they check, which is a clean contrast. Then the panel's bars land with "started weaker" pointing left, toward the first owner's side of the screen, and "started stronger" pointing right, toward the second owner. I read the first owner as the weaker businessperson and the gap in the study as caused by not checking each part. The study did not measure checking; it measured which advice owners implemented. The page text below says "Neither owner stands for a group in the study" and "Treat it as a lead … not a measured result", but the figure itself never says so. Fixes: put a line in the panel such as "The owners above are invented; the study didn't measure checking", or break the left/right alignment.
2. **The panel is too fast.** Caption 8 plus the panel is about 50 words in 9.5 s, and the bracket text, which carries the inference, gets 5.5 s. It needs 4 to 6 more seconds, or the bracket should arrive with the bars.
3. **"The mentor" is never introduced, and the role has two names.** Captions say "mentor" and the check card says "Reviewer's check". A business reader doesn't know whether this is an adviser, a lender or a boss. There is also a clash with the source: in the February 2024 version of Otis et al. the AI itself was the "AI business mentor". Pick one word ("adviser" or "reviewer") and introduce the role at beat 9, for example "An adviser who sees only the plans asks…".
4. **The AI was given the sales book, so the AI looks careless rather than at its limit.** The "Given to the AI" stack shows the AI had all four documents, including "Mostly same-day, Margin: under 10%". It still said "Cut prices 10%", which with a margin under 10% means selling at or near a loss. That makes Part 2 look like the AI ignoring its own inputs, not a task beyond its reliable range. It also muddies "Part 2 depends on why customers come here": the evidence for why was in the AI's input. A manager's likely takeaway is "prompt it better", not "calibrate reliance". Either show that the "why" (they come for speed) is the owner's knowledge, only hinted at by the book, or don't put the sales book in the AI's stack.
5. **Beat 6 is dense.** Two documents, two notes, a pause, two strikeouts, two insertions and a check mark arrive in about 8 s, and the document text is small (about 14 px on desktop; about 11 px at 1280×720). Add 1 to 2 s before the rewrite.
6. **The strongest business argument is left unsaid.** "Margin: under 10%" next to "Cut prices 10%" is the line a shop owner would react to, but no caption or spoken reason uses it. The second owner's spoken reason mentions only speed. Use it or drop it; as it stands it is a set-apart clue that is never cashed in.
7. **The bars show certainty they shouldn't.** Both bars are drawn the same solid colour, but the hedge ("may have gained") applies only to the stronger group. In the working paper the stronger group's estimate is the noisy one (p = 0.07, versus p = 0.007 for the weaker group). There are no axis labels, and the "nearly 10% worse" label sits on the right of zero while its bar points left. It still reads correctly because the label says "worse", but a lighter or hatched bar for "may have" would match the words.
8. **The second owner is unlabelled from about 0:35 to the end on desktop.** The first owner keeps a label; the second doesn't. The phone view labels both columns throughout.
9. **The same 10% appears in the scenario and in the result.** "Cut prices 10%", "10% below ours", "Margin: under 10%" and "nearly 10% worse" all sit near each other. The page says "the 10%" is constructed, but a reader could link the price cut to the 10% loss.
10. **Small things:**
    - The screen-reader title says "an animated figure in twelve beats", but the figure has 11 (beats 0 to 10) and the counter runs to "/10".
    - The page's meta description begins "A teaching figure", which is classroom wording in link previews.
    - On a phone, the answers are shortened, so "THEIR PRICES" tags "Cut prices 10%" instead of the phrase "match the new shop". The contrast is weaker there.

## 6. Mechanical checks

- **Reduced motion:** `?reduced` and `prefers-reduced-motion: reduce` both open on the final frame (1:33) with the full caption: name, definition and both check lines. The same is true at 390 px. Pass.
- **Horizontal scroll at 390 px:** none (scrollWidth 390 = clientWidth 390; no element goes past the right edge). Pass. One note: at 390×844, with the shot scrolled to the top, the source line "Illustration based on Otis et al., Management Science (2026)" sits just below the controls and is cut off at the bottom of the screen.
- **Keyboard:** Tab order is brand → Essay → Practice → Workplace → PME → Play → Restart → Scrub. Enter and Space both toggle play/pause. Arrow keys move the scrubber in 1 s steps (the caption follows), and End jumps to 1:33. Restart resets to 0:00 and plays. The focus ring is a 2 px solid navy outline. Pass.
- **Layout fit:** the shot plus controls fit in the viewport at 1280×900 (816 px) and 1280×720 (693 px). The smallest picture labels are 14.1 px at 900 and 11.1 px at 720 (document tabs, READY, frontier labels). Readable at both. The 390 px view switches to a stacked text layout driven by the same clock, with the same timings.
- **Numbers against `sources/source-spine.md` or the essay:** "no clear change", "nearly 10% worse" and "may have gained over 15%" match the Otis et al. entry in source-spine.md (line 25). The essay does not cite Otis. The panel's "Effect on revenue and profit" matches the spine's "revenue or profit". The page text adds 640 entrepreneurs and "over 0.20 standard deviations": the first is in neither the spine nor the essay, and the second is not in the spine (it is in the published abstract; see below). The battery, the 6 hours, the 10% price cut, the 10% flyer and the margin under 10% are constructed, as the page says.

---

## Your extra questions (business edition)

**Would a business or nonprofit reader see their own work?** A small-business owner or retail or service manager: yes, strongly. Backup power, a new competitor undercutting you, and reading your own sales records are everyday decisions, and "it got the easy part right, so I trusted the rest" is a familiar mistake. A manager in a larger organisation will get the pattern but may find the shop setting small. A nonprofit reader has to translate "customers", "prices", "margin" and "rival's flyer" (to donors, fees, budget, another charity). The pattern carries over, but nothing in the figure helps with that translation. "Sales book" is UK and Kenyan usage; a US reader would say "sales records".

**Does anything make the AI or either person look unfairly bad, or confound the contrast?**
- The first owner is treated fairly: they do check Part 1, and their reason is sympathetic. No outcome is shown for either plan, so there is no hindsight bias inside the story.
- The AI looks worse than it needs to (problem 4): it had the sales book and still advised a price cut that a margin under 10% can't support.
- The contrast is confounded by the evidence panel (problem 1), which maps "started weaker / stronger" onto the two owners.
- Within the story there is a mild second difference: the second owner knows "they come for speed". That is owner knowledge as much as checking. It is arguably the point, but it is never named.

**Does the evidence panel read correctly, especially the bar below zero, and does it overstate the study?**
- The bar below zero reads correctly: left of the axis, labelled "nearly 10% worse".
- "On average: no clear change" is a fair plain-English version of "unable to reject the null".
- What overstates the study: the solid "started stronger" bar looks as certain as the "started weaker" one (problem 7); the left/right alignment invites mapping the bars onto the owners (problem 1); and the panel never says the study didn't measure checking.
- The bracket's "seems to come from which advice they acted on" is faithful to the abstract.

**Is the source line clear, without overclaiming?**
- The panel source "Otis et al. (2026) · Kenyan entrepreneurs · Management Science" is clear.
- The end line "Illustration based on Otis et al., Management Science (2026)" is clear but slightly overclaims. The scenario details it echoes (cybershops, blackout power, "generic" price-cutting advice) are documented in the working paper, not in the published abstract, which is all I could reach. "Constructed example; study: Otis et al. (2026)" would be safer. The page intro does say the owners, documents and numbers are constructed, but the figure's own line doesn't.

**Any military or classroom wording left?**
- None inside the figure: captions, labels and speech are all business wording. "Failure mode", "mentor" and "reviewer" are neutral.
- On the page, just above the figure: "PME (professional military education): the example from *The Irreducible Officer*, the National War College essay." It reads as an edition switcher, but it is the first thing under the setup.
- Lower down, the quotes are credited to "*The Irreducible Officer*, Section II/V", and the links include "The original essay, written for military education". The quoted text itself contains no military words. These are acceptable attributions.
- The meta description says "A teaching figure".

---

## Fact check: Otis et al. (2026) (done after the read above)

Sources reached:
- **Published paper, metadata and abstract only**, via the Crossref record for DOI 10.1287/mnsc.2024.06909: *The Uneven Impact of Generative Artificial Intelligence on Entrepreneurial Performance: Evidence from a Field Experiment in Kenya*, Otis, Clarke, Delecourt, Holtz and Koning, *Management Science*, published online 10 July 2026. The full text at pubsonline.informs.org returned HTTP 403, so I could not check the published body.
- **eScholarship PDF** (the page's "working paper" link, escholarship.org/uc/item/40s41244, 137 pp.). eScholarship's listing dates it 2024-02-27, but the PDF was created and modified in July 2024. Its abstract gives "0.27 s.d.", "just over 15%", "about 8% worse", and an implementation mechanism.
- **The February 2024 version** (dated "February 2024" on its title page; NBER conference copy, conference.nber.org/conf_papers/f194654.pdf, 106 pp.). Its abstract gives "about 8% worse", calls the AI a "mentor", and gives a different mechanism: "low performers did worse because they sought help on more challenging business tasks."

| Claim on the page | Status |
|---|---|
| "randomizing access to a GPT-4-powered AI business assistant" (Management Science, 2026, abstract) | Verbatim in the published abstract. ✓ |
| "unable to reject the null hypothesis of no average treatment effect on firm revenues and profits" / panel "On average: no clear change" | Verbatim in the published abstract; the panel paraphrase is fair. ✓ |
| "low performers did nearly 10% worse because of the AI assistant, whereas high performers may have benefited by over 15%" / panel bars | Verbatim in the published abstract, where it is labelled "subsample analyses". ✓ The working-paper versions say "about 8% worse". The page correctly uses the published figure. |
| "over 0.20-standard-deviations lower than for initial high performers" | Verbatim in the published abstract. ✓ (The working paper said 0.27 s.d.) |
| "does not appear to result from differences in the questions posed to the AI or the advice that it provided but rather, from the advice that entrepreneurs chose to implement" / bracket "The gap seems to come from which advice they acted on" | Verbatim in the published abstract; the bracket is faithful. ✓ |
| "Low" and "high" mean how each business was doing before the study | Supported ("low performing at baseline"; in the working paper, below or above the median pre-treatment performance index). ✓ |
| "The group results are less certain than the average, which is why the paper says high performers 'may have benefited.'" | **Imprecise.** The average is a null. The hedge applies to the high-performer estimate, which is the noisy one (eScholarship working paper p. 9: low performers β = −0.09 s.d., p = 0.007; high performers β = 0.19 s.d., p = 0.07, "noisier"). The low-performer result is stated without a hedge in the published abstract. Suggested wording: "The gain for stronger owners is less certain than the loss for weaker ones, which is why the paper says 'may have benefited.'" |
| "The assistant was built on GPT-4." | Published abstract. ✓ |
| Sample of 640, randomly assigned to the WhatsApp assistant or standard business guides (pp. 3, 8) | **Working paper only.** The published abstract gives no sample size. eScholarship PDF: 640 and the WhatsApp assistant on p. 3; guides as a "placebo intervention" on p. 7, with the control given the guide on p. 8. The page numbers are close enough (the guides start on p. 7). |
| Businesses "from fast-food joints to poultry farms to cybershops", and cybershops offer internet access and printing (p. 8) | **Working paper only.** eScholarship PDF p. 8, plus footnote 2 ("computer access, internet browsing, printing, scanning…"). ✓ |
| Exploratory analysis: "treated low performers were especially likely to implement 'generic' advice focused on lowering prices and investing in advertising"; high performers found "tailored and specific changes", from "finding alternative ways to get power during blackouts" to a new car wash detergent (pp. 3–4) | **Working paper only**, eScholarship PDF p. 4 ("exploratory" on p. 3). ✓ as quoted. **Version flag:** the page calls this the "February 2024 version". The version actually dated February 2024 does *not* contain these passages; its stated mechanism is task difficulty, not generic advice. The quotes come from the later revision hosted on eScholarship. A reader who finds the February 2024 PDF will not find them, and will find a different mechanism. Relabel it as "the revised working paper on eScholarship (2024)", and consider noting that an earlier version proposed a different mechanism. That supports the page's own caution: "Treat it as a lead … not a measured result." |
| "The published abstract doesn't mention it." | True. ✓ I could not check whether the published full text keeps the generic-advice and blackout material. |
| End line "Illustration based on Otis et al., Management Science (2026)" | The illustration's details (print and internet shop, blackout power, price cutting) map to the working paper, not to anything verifiable in the published abstract. **Mild overclaim**; see above. |
| Panel label "Effect on revenue and profit" | Fair. The outcome is an index of standardised weekly and monthly revenue and profits (working paper p. 8), and the percentages are conversions of that index (working paper p. 9, Table A12). ✓ |
| "Nairobi" (setup) | Not from the study ("across Kenya"); it is part of the constructed scenario, which the page labels as constructed. OK. |

Unsupported or needs a fix: the "less certain than the average" sentence (rewrite it), the "February 2024 version" label (wrong version for those quotes), and the end-of-figure source line (it attributes working-paper details to the published paper). Everything else checks out, and every number in the panel matches the published abstract.
