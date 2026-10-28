# Nameplate verification

Checked 2026-10-28 on commit `22eb547`, report-only. Nothing in the figures was edited.

**Result: 53 of 56 checks pass.** There are three failures:

- institutional monoculture, item 1 (the card is clipped on phones);
- responsibility laundering, item 3 (an apostrophe differs from the canonical definition);
- appropriate reliance, item 1 (the card sits over the options at laptop sizes).

Three passes are judgement calls. They are marked † in the table and explained under the item notes.

## Method

I served `motion-figures/` on 127.0.0.1:5347 and drove Chromium through Playwright, from the site repo's `node_modules`. Every check ran at 1440×900, 1280×720 and 390×844.

- **Card.** I sought to player times 0, 1.0, 1.95, 2.5, 2.98, 3.0 and 3.3 with `window.__motionFigures[id].seek`. I also watched a real autoplay: the 3000 px spacer was inserted at test time, then I scrolled the player into view and sampled every 40 ms for 4 s.
- **Plate.** I put the shot's top at the window's top and sought to each beat's settled moment and the final frame. At each one I checked:
  - the rendered text, opacity, whether it is on screen and whether it is clipped;
  - every text node, painted box and SVG shape in the shot that intersects the plate;
  - an `elementsFromPoint` grid over the plate.
- **Final frame.** I compared the last caption's DOM text and geometry with `NAMEPLATE-DEFINITIONS.md`, string for string.
- **Reduced motion.** Tested with `?reduced` and with the context's `reducedMotion: 'reduce'`, at desktop and phone sizes.
- **Print.** I emulated print media and fired `beforeprint` from beat 2. Then I made a real `page.pdf()` from beat 2 and ran `pdftotext` on it. `beforeprint` fired, and the plate text and definition were found.
- **Fit.** Sampled every 0.25 s of player time across the whole run.
- **Regressions:**
  - Autoplay was tested at three scroll positions: controls cut by 12 px, caption cut by 10 px, and the whole player in view.
  - Pausing: I scrolled away, then back.
  - Console and page errors and failed requests were collected on every load.
  - Appropriate reliance's locks were tested with:
    - `?t=60`, `?t=1:40` and `?t=24`;
    - dragging the scrubber to its end, the End key and Shift+→;
    - a click on a locked beat;
    - Play at the question;
    - the scrubber's end again after question 1.

## Results

| Figure | 1 Card | 2 Plate | 3 Final frame | 4 Reduced / print | 5 Fit | 6 No regressions | 7 Consistency |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Frame capture | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| Fluency substitution | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| Premature synthesis | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| Uncalibrated reliance | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| Invisible delegation | Pass | Pass | Pass | Pass | Pass | Pass | Pass |
| Institutional monoculture | **Fail** | Pass | Pass | Pass | Pass | Pass | Pass |
| Responsibility laundering | Pass | Pass | **Fail** | Pass | Pass | Pass | Pass † |
| Appropriate reliance | **Fail** | Pass | Pass | Pass † | Pass † | Pass | Pass |

## Failures

### Institutional monoculture, item 1: the card's name is clipped at 390×844

On phones the opening card's name, "Institutional monoculture" (`.mf-namecard-n`, 34 px, nowrap), is 380.4 px wide, but the shot is 356 px wide. The name runs from x 5 to x 385 and the shot from x 17 to x 373. The shot's `overflow: hidden` cuts both ends, so the card reads "nstitutional monocultur".

- **When it shows:** player time 0 to 3 s, and in the waiting view before play. The waiting view is the first thing a phone reader sees.
- **Cause:** RL has a phone clamp for this case (`responsibility-laundering/index.html:33`). `institutional-monoculture/index.html` has none.
- **Other names at 34 px all fit in 356 px.** The widest is uncalibrated reliance at 316 px.

### Responsibility laundering, item 3: the definition's apostrophe differs from the canonical text

At `responsibility-laundering.js:588` the definition uses a curly apostrophe, "The model’s recommendation…" (U+2019). `NAMEPLATE-DEFINITIONS.md` and the other figures use a straight one ('), so the final caption doesn't match the canonical text exactly at any of the three sizes. The words are identical and role-neutral. The same curly form is in the page's hidden summary (`index.html:110`).

### Appropriate reliance, item 1: the card covers the options at laptop sizes

`api.introCard()` (`appropriate-reliance.js:905`) puts the card over the live first question. If the reader does nothing, it stays large for the 1.2 s hold and the 0.8 s move (`settleCard(1.2, 0.8)`, line 912) once the figure is in view. During that time it covers the options at two sizes:

- **1280×720, and 1366×768 too (compact stacked first view).** The name "Appropriate reliance" (line box y 309–386) lies across Task A's "Check this one" option (y 348–382, 217 px of horizontal overlap). It also crosses the top of Task B's option (y 367–401). The screenshot shows the name over the right half of Task A's pill.
- **1440×900.** The kicker "THE SKILL" overlaps the left 7 px of Task B's pill.
- **390×844.** The card clears both options.
- **All sizes.** The 90% scrim washes out both options during the hold, as it does over every figure's opening frame.

The functional half of the item passes:

- The card and scrim take no pointer events, and a hit test at each option's centre lands on the option.
- A click, a Tab into the figure or a wheel puts the card in its corner on the same event.
- Tab reaches the first option on the fourth press, with the card already settled.
- Continue and Skip are hidden during the card and come back 0.3 s after it settles.
- Off screen the card waits. It holds until about 1.1 s after coming into view and is settled by 2.2 s.

## Notes by item

**1. Card (all eight).** In every figure but appropriate reliance:

- The card is centred to within 1 px of the shot horizontally and of the stage band vertically.
- It holds at scale 1 until 1.95 s, moves at 2.5 s and lands on the plate's position at 2.98 s, within 1 px.
- At 3.0 s it is gone and the plate is at full opacity.
- The caption band stays quiet until 3 s.
- Real playback showed the same sequence.
- The waiting view shows the card over the poster.
- Beat 0 ("Name · Kicker") is first in every beat list.

Appropriate reliance plays the card the same way under `?t=`.

**2. Plate.** The plate showed "NAME · N OF 7" ("APPROPRIATE RELIANCE · THE SKILL") at 10 to 12 moments per figure per size. It was fully opaque, on screen and inside its 23 px strip at every one. Nothing in the shot intersected it. Below 720 px wide, and at 1280×720 for FS, PS and ID, the stage is stacked; the stacked stage starts at the strip's bottom edge.

**3. Final frame.** In all eight, the name and definition come directly before "Faculty check", both in the DOM and on screen. The gap from the definition to the check is 3 px on desktop and 9 px on phones. The band never overflows. No definition contains a role noun. I searched for student, officer, learner, consultant, faculty, analyst, staff and similar words. Definition sizes:

| Size | Most figures | IM | AR | RL |
| --- | --- | --- | --- | --- |
| Desktop | 19 px | 15 px at 1280×720 | 16 px | 19 px |
| Phone | 16 px | 16 px | 16 px | 15 px |

At 390 px the definition takes two lines, and three for AR.

**4. Reduced motion and print.**

- **Figures 1–7.** Reduced motion opens on the final frame with the plate, name and definition, under both the query and the media setting.
- **Print.** Every figure draws the final frame with the plate. The PDF text contains the plate and the definition.
- **† Appropriate reliance.** Reduced motion opens on question 1, by the question-before-answer rule. The plate names the figure, but the definition appears only on the final frame, after the reader answers or skips both questions. I checked it by choosing and pressing Continue twice, under both triggers and at both sizes.

**5. Fit.**

Phone player heights at 390×844:

| Figure | Player height |
| --- | --- |
| Frame capture | 780 px |
| Fluency substitution | 825 px |
| Premature synthesis | 830 px |
| Uncalibrated reliance | 838.3 px |
| Invisible delegation | 840 px |
| Institutional monoculture | 838 px |
| Responsibility laundering | 836.8 px |

- **Controls on phones.** The controls didn't move by even 0.5 px across about 400 sampled moments or in real playback.
- **1280×720.** With the shot's top at the window's top, the caption and controls stay in view at every moment. Player heights are 629–703 px, and IM is the tallest.
- **† Appropriate reliance at 390×844.** After question 1 the stacked stage grows to 1004–1158 px, so the player is taller than 844 px. The caption band and controls are sticky at the bottom, which is the documented design.
  - **Starting from the normal load position:** the controls stayed at 725–844 px through question 1, Continue, play, question 2 and the end.
  - **The last caption** grows upward from 182 to 264 px.
  - **One jump.** A reader who scrolls the shot's top to the window's top before answering will see the controls drop about 91 px when Continue grows the stage. That happens at the click; nothing moves during play.
  - **Desktop.** Continue also lifts the first-view cap, and the controls move once there. This is documented too.

**6. No regressions.**

- No console errors, page errors or failed requests on any load.
- Figures 1–7 didn't autoplay with the controls or the caption cut off. They started within 40 ms once the whole player was in view, at all three sizes.
- All eight paused when scrolled away, and stayed paused at the same time on return.
- Appropriate reliance never plays by itself. It still played after Continue.
- **Appropriate reliance's locks, at player times 28.5 and 91:**
  - `?t=60` and `?t=1:40` hold at 28.5 with the gate open, and `?t=24` holds at 24.
  - The scrubber's end, the End key, Shift+→ and a click on a locked beat all stop at 28.5.
  - Beats 4–10 are disabled until question 1. Afterwards only beats 9–10 stay locked.
  - Play at the question shows "Make your call first…".
  - After question 1, the scrubber stops at 91.

**7. Consistency.** These match in all eight at every size:

| Property | Value |
| --- | --- |
| Card kicker | IBM Plex Mono 600, 13 px, uppercase, muted |
| Kicker-to-name gap | 10 px |
| Plate | IBM Plex Mono 600, 12 px, 0.14em, uppercase, ink |
| Strip | 23 px |
| Plate position | 18 px in and 5 px down on desktop; 12 px in and 5 px down on phones |
| Card centring | within 1 px |
| Card name on desktop | Source Serif 4 600, 56 px |
| Card name on phones | 34 px in seven figures |

**†** Responsibility laundering's phone card name is 28.3 px, from the clamp CONVENTIONS.md documents for overflow. I counted that as a documented exception. If institutional monoculture gets the same fix, two figures will differ from the other six on phones. One shared phone rule would keep all eight matched.
