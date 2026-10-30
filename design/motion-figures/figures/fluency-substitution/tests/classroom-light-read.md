# Fluency substitution: classroom light read (business scenario, classroom casts)

Cold read by an educator who has not read the essay. First read as a higher-education instructor (`?edition=business&cast=classroom`), then as a high-school teacher (`?edition=business&cast=high-school`). Date: 2026-10-30.

**Method.** Served on port 5231. Each page was watched at real speed at 1280×900 and 390×844, with frames captured every 0.5 s after scrolling the figure into view (autoplay started both times, 1:38 runtime). I logged the caption and clock on every frame, and held the end with `?t=97`. Also checked: 1280×720, `?reduced`, keyboard, the edition switch, and horizontal scroll at 390. One browser at a time. Scripts and frames are in the session scratchpad (`fs-classroom-read/`).

**What differs between the two casts.** Only the labels change: "instructor" becomes "teacher" and "course" becomes "class". The task, claims, answers, timing and the whole study section are word for word the same. I compared the frames pixel by pixel, and the only differences are those labels and a sub-second timing offset.

---

## 1. Beat by beat (same for both casts)

| Beat | Caption up for | What I saw / understood | Notes |
|---|---|---|---|
| 0 | ~3.5 s | Name card "Fluency substitution, failure mode 2 of 7", then it docks top left. | Fine. |
| 1 | ~6 s | Task card "Draft the patent claims: what does the inventor's wearable protect?" and a red dot labelled Student. | About 5 s of a still dot. Slow, but not a problem. |
| 2 | 8.5 s | A sheet "AI's draft" types out grey-on-beige text: claim reading through clothing broadly; narrower claim the sensor's fabric adjustment; fallback the battery design. A "Written by AI" key appears. | Clear. Beige band = AI words is easy to learn. |
| 3 | 9 s | The dot runs along the four lines, and the label becomes "Their claims · drafted with AI". | The dot crosses all four lines in about 1.5 s while the caption says "reads it closely". The motion reads as skimming, not close reading. Minor mismatch. |
| 4 | 8.5 s | The first draft shrinks into a "First student" column. A second student writes a red note: "What's new: it reads heart rate through clothing, by adjusting its sensor to each fabric." The key adds "Student's own work". | Clear. Once the first draft shrinks, its text is small. |
| 5 | 11.5 s | The note moves up and an AI draft types out the same grey paragraph, and the second dot reads it. The caption says "Suppose it matches… word for word." | The "suppose" works. I read it as a thought experiment, not a claim that AI is deterministic. |
| 6 | 6 s | The table forms. Row "Their own work, not handed in": empty for the first student, the note for the second. Row "The instructor/teacher receives": two identical drafts. | This is the strongest frame. The empty cell says a lot. |
| 7 | 14.5 s | Drafts dim. Row "The instructor asks: Drafts aside: what do you claim, and why?" Both answers type in plain ink: "Reading through clothing. No earlier device does it." / "…No one has done that before." | Long hold. Both answers are up by about 61 s, and then nothing happens for about 6 s. That's fine for reading. |
| 8 | 6.5 s | "Then one fact changes: What if an older patent covers reading through clothing?" | Clear. |
| 9 | 6.5 s | "Then lead with the battery design." / "Then lead with the sensor that adjusts to each fabric." | **The hinge, and the weakest spot.** The sensor claim sits in the first student's own draft as the "narrower claim", yet the first student skips it for the "fallback". Nothing on screen says why. As an instructor my first thought was "why would anyone skip the line that's right there?" The intended reading (they follow the draft's order because they never understood what's new) is something I have to supply myself. |
| 10 | 5.5–6 s | A small italic line appears under the changed fact in the left label column: "It covers the battery too." | **Easy to miss.** It's the smallest text on the stage, it sits in the label column, and nothing marks the first student's battery answer as failed (no strike, dimming or cross). The caption does the work. |
| 11 | 5.5 s | Colours come on. All of the first student's first answer and "the battery design" turn AI-grey, while "Then lead with" and both of the second student's answers turn red. The matching words in the first draft are underlined. | Clear and satisfying. The underlines in the draft last only about 3 s. |
| 12 | end | The definition "Polished analysis stands in for owned reasoning." comes up, then the check: "Can the student explain the call plainly, without the draft? Then change one fact. What would you recommend now?" The source line appears and the whole table stays up. | The end frame carries the idea on its own (see 4). |

**At 390×844** the phone layout is a different picture. The first student's draft disappears when the second student starts (beat 4). The drafts merge into one block, "Both handed in these claims". The reading-dot motion is gone, and the task line is cut off ("what do…"). The answers then appear in two small side-by-side cards. Everything is readable, and the end frame works (it shows the colours, the battery line and the check). But the "two students, two columns" comparison is weaker until beat 7, because the first student is missing from the picture for beats 4–6.

## 2. The point, in one sentence

- **HE instructor:** Two students hand in identical AI-drafted work and both explain it fluently. Only changing a fact shows which one owns the reasoning: the one who first wrote down what's new can re-route, while the other reaches for the draft's next line.
- **High-school teacher:** A polished AI-assisted assignment and even a fluent explanation don't show understanding; a "what if this fact changed?" question does.

## 3. The question a teacher should ask afterwards

"Put the paper away. What's actually new or true here, and if [one fact] changed, what would you say now?" Then listen for whether the answer comes from the student's own model or from the next line of the draft.

## 4. The final frame alone

Yes, it carries the idea. Two identical grey drafts, one empty "own work" cell next to a red note, a grey answer next to a red one, then the check in large type. Without the animation I still read "same product, different ownership, and the change-one-fact question exposes it." What the frame doesn't carry is that the battery answer *fails*. "It covers the battery too" is a small italic aside, and without the caption a viewer may not connect it to the first student's answer.

## 5. Answers to the brief, per cast

### A. Higher-education instructor (`cast=classroom`)

1. **Failure shown:** a student who agrees with an AI draft can hand it in and explain it in the draft's own words. That fluency hides the fact that they don't know *why* the claims are shaped as they are, so a changed fact sends them to the draft's next line, which is also dead.
2. **What separates them:** only the second student's note written before drafting (what's new, and how it works). Same task, same AI, same disclosed use, same output.
3. **Cheating / "don't use AI" / "AI harms learners":** none of these. "The course allows AI, and both say they used it" and the "drafted with AI" tags on both drafts rule out cheating. The stronger student also uses AI, so the page doesn't say "don't use AI". The study box is balanced ("springboard for some juniors and a cushion for others"; seniors gained), so it doesn't say AI harms learners. The colour reveal does cast the first student as a parrot, but that's the intended point. They're also drawn sympathetically (they read closely and agree).
4. **Workplace words:** no "associate", "partner" or "firm team" in the figure or page copy. "Law firms" appears only when describing the study, which is fine. Leftover workplace phrasing: **"explain the call"** and **"What would you recommend now?"** In a claims assignment the natural question is "what would you claim now?" "Recommend" sounds like an advisor briefing a client. Unexplained study jargon: "redlines" and "redlining submissions".
5. **Sense as a class assignment:** plausible. Claim drafting for an inventor's notes is real work in an IP law course, a law clinic, or an engineering-entrepreneurship course. "Invention course" is vague but believable. The oral check ("drafts aside", then change a fact) is a move I'd actually use. The one plausibility gap is beat 9 (why skip the narrower claim?).
6. **Study described accurately:** yes. It says plainly that the participants were practising patent lawyers and that no students took part. It reports that senior lawyers gained, and that juniors split, with more poor and more good scores. It separates AI-assisted quality (juniors gained more) from unassisted skill (only seniors gained). It also states the limits and the Google funding, and lists what is constructed. One readability risk: the abstract quote "with larger gains among junior lawyers" sits right before the unassisted junior split, so a skimmer could blur the two. The text does keep them apart.
7. **Pacing:** every caption can be read before the next one arrives. The shortest stays up about 5.5 s for 6–10 words, and most stay 6–14 s. Movements can be followed on desktop. Exceptions: the beat-3 reading sweep is quick for "reads closely", the beat-10 line is small, and the beat-11 underlines in the draft last about 3 s.

### B. High-school teacher (`cast=high-school`)

1. **Failure shown:** same as above. As a teacher I immediately mapped it to "two kids turn in the same AI-polished lab conclusion".
2. **What separates them:** the second student's own note first. That maps cleanly onto "show me your thinking before the draft".
3. **Cheating / "don't use AI" / "AI harms learners":** none. "The class allows AI, and both say they used it" matters a lot at high school, where the reflex reading is cheating, and the page heads that off in the first lines.
4. **Workplace words:** none in the figure. The same leftovers: "explain the call" and "What would you recommend now?" The study box is identical to HE, including "law firms" (study, fine), "redlines", SD, p-values, "bifurcated", "pre-registered" and "conventional significance". The page is written for adults, but nothing in it is adapted for high school.
5. **Sense as a class assignment:** niche. Most high schools don't have an "invention class". Some do, under engineering design capstones, invention programmes or entrepreneurship electives, where students do prior-art searches. Drafting formal patent claims is rarer still. A typical English, science or history teacher will see this as a law example dressed up as school. The page's line "The same goes for any polished work a student hands in" does the transfer for them, and the teacher's check carries over to any subject.
6. **Study described accurately:** yes, the same text as HE (see A6).
7. **Pacing:** identical to HE, and fine.
8. **High school specifically.**
   - *Would a high-school teacher use it?* For their own practice, a department meeting or PD: yes. The teacher's move (drafts aside, then change one fact) and the identical-drafts table are the best thing on the page, and they're shown in the teacher's own role. To show students: no, not as is.
   - *Can a teen follow patent claims and prior art as shown?* Partly. "An older patent already covers it" works as "someone already invented that", and a teen gets it. But the claim structure ("claim … broadly", "narrower claim", "fallback") is legal genre with no gloss, and it's the hinge of the failure: the first student "takes the draft's fallback". A teen who can't parse broad, narrower and fallback won't see why the battery answer is the parrot's move or why it fails. The beat-9 question (why skip the narrower claim?) is harder still for a teen.
   - **Verdict: ship for high school, as a teacher-facing figure. Don't fall back to the workplace version.** The workplace version has the same patent task plus associate/partner roles, so it fixes nothing for a high-school teacher and moves the check out of their role. The patent task is the weak link here, not the cast. Before showing it to teens you'd want either a one-line gloss of claim, prior art and fallback, or a teen-native task. Changing "recommend" to "claim" would help both casts.

## 6. Problems, ranked

1. **The hinge is under-explained (both casts).** The sensor claim is in the first student's own draft, yet they skip it for the fallback, and the screen never shows why. Then "It covers the battery too" arrives as the smallest text on stage, in the label column, and the battery answer is never marked as failing. The failure lands through the caption and the viewer's own inference.
2. **The patent genre for high school.** Broad, narrower and fallback claims plus prior art are legal concepts teens can't parse as shown, and few high-school teachers assign them. The high-school cast is a two-word label swap of HE, and the study box (SD, p-values, "redlines") is unchanged.
3. **Workplace phrasing left in the check:** "explain the call" and "What would you recommend now?" In a claims assignment, "What would you claim now?" fits.
4. **Phone layout (390):** the first student's draft disappears from beat 4 until the answers, and the drafts merge into one block. The reading motion is lost, the task line is cut off, and the stacked text is small. Readable, but the side-by-side comparison only arrives at beat 7.
5. **Beat 3 motion vs caption:** the dot sweeps four lines in about 1.5 s under "reads it closely".
6. **Short underline in beat 11:** the draft underlines that tie the grey answer back to the draft fade after about 3 s.

## 7. Mechanical checks

- **1280×720:** the stage, caption band and controls all fit (the shot is 638 px tall and the controls end at 703 px). Autoplay starts. The end frame is fully visible.
- **Reduced motion (`?reduced`):** shows the end frame at 1:38 with the full definition, the check text and the coloured table, in both casts.
- **Horizontal scroll at 390:** none (`scrollWidth` 390 on both casts, figure and full page). The task line is cut off with an ellipsis, not overflowing.
- **Keyboard:** tab order runs brand, Essay, Practice, Workplace, Classroom, PME, Play, Restart, Scrub, then the beat buttons. Enter on Play starts playback and Enter again pauses. Arrow keys on the scrubber move the time (0:01 to 0:06 after 5 presses). The scrubber has a visible 2 px focus outline.
- **Edition switch ("See this with: Workplace · Classroom · PME"):** works. On the HE page, Classroom has `aria-current="page"`, is bold and isn't underlined. On the high-school page **Classroom is also the selected option** and points to `cast=high-school`. Workplace goes to `?edition=business` (associate/partner content loads, with Workplace selected), and PME goes to `?edition=pme` (PME content, with PME selected). Small gap: from the Workplace or PME page, "Classroom" always goes to `cast=classroom` (HE), so a high-school teacher who clicks away loses the high-school cast.
- **Console:** no errors on any load.
- **Numbers vs `sources/source-spine.md`:** see the addendum below.

## Addendum: numbers vs sources (checked after writing the read above)

- **In `sources/source-spine.md`:** 133 lawyers, eleven firms, three months, 91 completers, the senior gain of 0.45 SD, juniors as under seven years' experience, fifteen of 91 with possible AI use, the senior gain holding at the 10 percent level, and Google conducting and funding the study.
- **Not in the spine or the essay:** the abstract figures 0.34 SD (p = 0.03) at 10 days and 0.38 SD (p = 0.01) at 90 days, the overall 0.32 SD (p = 0.04), the senior p = 0.02, the sentence "all eleven firms have patent-drafting relationships with Google", and the page cites (pp. 2, 3, 9 n. 8, 23, 29, 30). The page gives these as direct quotes from the NBER paper. I couldn't verify them from the repo, so check them against w35720 (revised October 2026), or add them to the spine entry.
