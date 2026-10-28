/* The figures in the four-moves book.

   Switch a figure on by setting its status to "done": its spread then shows the
   poster with "Play here" and "Open the figure". Any other status shows an
   "In progress" plate, using the figure's poster if shots/final.png exists.

   A figure's chapter decides where its spread sits; the order of this list is
   the order inside each chapter. Chapters: frame, calibrate, garden, own. */
window.BOOK_FIGURES = [
	{slug: 'frame-capture',             title: 'Frame capture',             chapter: 'frame',     status: 'done'},
	{slug: 'invisible-delegation',      title: 'Invisible delegation',      chapter: 'frame',     status: 'done'},
	{slug: 'uncalibrated-reliance',     title: 'Uncalibrated reliance',     chapter: 'calibrate', status: 'done'},
	{slug: 'appropriate-reliance',      title: 'Appropriate reliance',      chapter: 'calibrate', status: 'in progress'},
	{slug: 'premature-synthesis',       title: 'Premature synthesis',       chapter: 'garden',    status: 'done'},
	{slug: 'institutional-monoculture', title: 'Institutional monoculture', chapter: 'garden',    status: 'in progress'},
	{slug: 'responsibility-laundering', title: 'Responsibility laundering', chapter: 'own',       status: 'in progress'},
	{slug: 'fluency-substitution',      title: 'Fluency substitution',      chapter: 'own',       status: 'done'},
];

/* Left-page text for each figure's spread.
   wrong:  "What goes wrong", verbatim from PLAN.md (the site's Core Failure Modes table).
           For the competency, `looks` replaces it.
   check:  the faculty check, verbatim from the same table.
   follow: the separating follow-up from the figure's final frame (its storyboard
           for figures not yet built).
   quote:  whole sentences from the essay passage the figure's page quotes.
   scripts/book-shots.mjs compares check and follow with each figure page. */
(() => {
	const II = {label: 'Section II, What the Problem Looks Like', href: 'https://judgmentlab.net/#ii-what-the-problem-looks-like'};
	const V = {label: 'Section V, Appropriate Reliance as a Teachable Competency', href: 'https://judgmentlab.net/#v-appropriate-reliance-as-a-teachable-competency'};
	window.BOOK_FIGURE_COPY = {
		'frame-capture': {
			wrong: 'The first plausible frame becomes the student’s frame.',
			check: 'What problem did the student choose to solve?',
			follow: 'Why this frame? What would change it?',
			quote: 'Once accepted, later revisions improve the answer inside the wrong boundary. The frame capture is invisible inside the final product.',
			section: II,
		},
		'invisible-delegation': {
			wrong: 'A request for help transfers criteria, structure, or meaning.',
			check: 'What did the AI decide for the student?',
			follow: 'To find out, ask each student: better by whose standard?',
			quote: 'The language of assistance hides the transfer of judgment. The student believes they are working; the model has already done the framing.',
			section: II,
		},
		'uncalibrated-reliance': {
			wrong: 'The student accepts confident output without knowing whether the task fits the tool.',
			check: 'What evidence justified relying on the system here?',
			follow: 'Point to each part. Was the evidence about that part?',
			quote: 'The problem is that AI performance is uneven in ways that are not always visible from the outside. Tasks that look similar may differ significantly in whether AI helps or hurts.',
			section: II,
		},
		'appropriate-reliance': {
			looks: 'Accept support when it’s warranted, refuse or verify it when it’s not, and give an account of the difference.',
			check: 'What evidence justified relying on the system here, and what would have changed the call?',
			follow: 'Change one condition and ask for the call again.',
			quote: 'A student who trusts AI generally has learned almost nothing transferable. One who has developed a disciplined account of when and why to rely, across task types, risk levels, and domains, has developed something real.',
			section: V,
		},
		'premature-synthesis': {
			wrong: 'The model connects material before the student has built the map.',
			check: 'Can the student explain why these connections matter?',
			follow: 'Point to one connection. What evidence would change it?',
			quote: 'The output links sources, themes, and concepts in ways that feel coherent. But if the student cannot reconstruct why those connections matter, the synthesis belongs to the model.',
			section: II,
		},
		'institutional-monoculture': {
			wrong: 'Shared systems and defaults narrow the range of frames available to the class.',
			check: 'What frames are missing across the seminar?',
			follow: 'Line up each paper’s problem, then ask what other frames the task could take.',
			quote: 'AI can create a surface appearance of diversity (different arguments, different structures, different evidence) while reproducing common assumptions at the level of problem definition.',
			section: II,
		},
		'responsibility-laundering': {
			wrong: 'The model’s recommendation makes agency feel distributed or easier to defend.',
			check: 'Who owns the recommendation if it proves wrong?',
			follow: 'Name one way it could prove wrong. Ask why they relied on it.',
			quote: 'The analysis lands with the apparent weight of objectivity. But AI does not become accountable for the recommendation. The human remains responsible for the final judgment.',
			section: II,
		},
		'fluency-substitution': {
			wrong: 'Polished analysis stands in for owned reasoning.',
			check: 'Can the student independently explain the judgment in plain speech?',
			follow: 'Then change one fact. What would you recommend now?',
			quote: 'In strategy, fluency substitutes for deciding. A paragraph that balances every consideration may never identify which risk actually matters most.',
			section: II,
		},
	};
})();
