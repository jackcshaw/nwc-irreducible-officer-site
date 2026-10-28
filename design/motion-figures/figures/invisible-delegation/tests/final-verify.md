# Invisible delegation: final-fix verification

October 28, 2026 · report only (no figure files edited) · build: `index.html` 08:28, `invisible-delegation.js` 08:27, stills 08:29

**Method.** I served `design/motion-figures/` on 127.0.0.1:8731 (stopped afterwards) and ran Playwright 1.63 (Chromium) at 1440×900, 1280×720 and 390×844. I held 14 moments with `?t=` (9.48, 20.78, 32.88, 41.58, 48.88, 54.2, 58.6, 60.28, 63.5, 65.3, 66.4, 70.48, 83.58, 90.5) and read the DOM and SVG attributes at each one. For layout I swept `seek()` from 0 to 90.5 s in 0.1 s steps, then sampled the controls' position on every animation frame during live play (81.5→end, 7.5→11.5, 0→1.5). To test the poster I stubbed `IntersectionObserver` so autoplay couldn't start, then read the waiting state. I also checked the stills in `shots/` (beat-01, final, page-390-reduced) against the live build: they match.

## Results

| # | Item | Result |
| --- | --- | --- |
| 1 | The second student's decision cards have real content, and each request points to its card | **PASS** |
| 2 | Caption matches the picture | **PASS** |
| 3 | Outright rejection | **PASS** |
| 4 | About 90 s, and every caption holds at least words ÷ 3 + 1.5 s | **PASS** (one note) |
| 5 | Consistency (six sub-checks) | **PASS** |
| 6 | Final frame: verbatim check, and the follow-up at the same size | **PASS** |

## Evidence

**1. Decision cards.** In the drawn stage (1440×900, final frame), each red card keeps its name and adds two red italic lines, fully revealed (each clip is wider than its text):
- "The criteria / Evidence must back / the call";
- "How the argument runs / Lead with the call, / then its evidence";
- "What “strategic” means / Serves the ally’s / long-term interest".

All three red pointer paths are drawn (opacity 1, dashoffset 0) with arrowheads, running from each request's red clause to its card's middle. In the stacked view (1280×720, 390×844), each written chip reads "STUDENT DECIDES" followed by the decision. The bare label is hidden. *Caveat:* the stacked view draws no pointer. Each request sits directly above its card in the same cell, so the pairing is by position, not by an arrow.

**2. Caption.** Beat 7 (60.3 s) reads, verbatim, "Both get the same AI notes. The second student judges them against their decisions." At 65.3 s the picture shows the same notes, two ticks and the strike in progress. The criteria card's border thickens (pulses) in both views. The sr-only summary, the "On screen" details and the page copy all say the same thing.

**3. Rejection.** In the final frame, "Be more decisive" carries a full red strike (x 44→167, opacity 1; the text is dimmed to 0.7), and "evidence too thin" is fully revealed beneath it in red. In the stacked view the note gets `line-through`, it has no tick, and the reason shows in red. No caption, detail or page text says "keep" or anything conditional. The old "if the evidence is" survives only in the storyboard's change log.

**4. Timing.** `T.end` is 90.5 s, and the readout says "1:30". Hold times below come from the `BEATS` timings in the JS.

| Beat | Shown (s) | Hold (s) | Words | Needed (s) |
| --- | --- | --- | --- | --- |
| 1 | 0.0–9.5 | 9.5 | 14 | 6.17 |
| 2 | 9.5–20.8 | 11.3 | 13 | 5.83 |
| 3 | 20.8–32.9 | 12.1 | 10 | 4.83 |
| 4 | 32.9–41.6 | 8.7 | 13 | 5.83 |
| 5 | 41.6–48.9 | 7.3 | 11 | 5.17 |
| 6 | 48.9–60.3 | 11.4 | 10 | 4.83 |
| 7 | 60.3–70.5 | 10.2 | 14 | 6.17 |
| 8 | 70.5–83.6 | 13.1 | 12 | 5.50 |
| 9, check | from 83.6 | 6.9 + rest | 10 | 4.83 |

Every hold clears its minimum. *Note:* the check's second line ("To find out, ask each student: better by whose standard?", 10 words, needs 4.83 s) appears at 87.0 s. That leaves 3.5 s before 90.5. On the page it stays up indefinitely, because the figure rests on its final frame. A capped export that ends at 90.5 s would show the line for less than the minimum.

**5. Consistency.**
- *Poster:* before play, all three viewports show the settled setup beat (scrub 9.48, "0:09 / 1:30", caption 1/9, the label reads "Play"). Pressing Play starts from 0, and a fresh page load at the top doesn't autoplay. **PASS**
- *Red names:* in the final frame, "First student" and "Second student" are red (#b81b2b, opacity 1) beside the dots and in the speech panels. In the stacked view they are rgb(184, 27, 43). **PASS**
- *11 px at 1280×720:* the drawn scale is 0.911, so 12-unit labels would render at 10.93 px. The stacked view therefore takes over (stage height 0). The smallest visible text in the figure is 12 px at all 14 moments; nothing is under 11 px. At 1440×900 the stage stays drawn, and its smallest label is 12.98 px. **PASS**
- *Controls at 390×844:* the controls sit 725 px from the figure top at every 0.1 s step, through every live-play sample, and in the poster state. The caption band holds at 132 px, and the player is 841 px tall in an 844 px viewport. (The controls are also fixed at 1440 and 1280.) **PASS**
- *Setup copy:* `index.html` contains no "pause" anywhere. **PASS**
- *UNSAID:* in the final frame, each of the three lines reads "UNSAID" followed by the words in a dashed box ("3 3"). It sits on its own baseline, 20 units below the closed quote (“Give me feedback” and so on). In the stacked view it is a separate `.id-n-uns` line outside `.id-n-q`, with a dashed ghost box. The "LEFT UNSAID" key is visible too. **PASS**

**6. Final frame.** The check reads "What did the AI decide for the student?", which matches the site table in `scripts/build-site.mjs:973`. The follow-up, "To find out, ask each student: better by whose standard?" (`mf-follow is-equal`), sits at full opacity. Both lines are italic and the same size: 30 px at 1440 and 1280, 20 px at 390.
