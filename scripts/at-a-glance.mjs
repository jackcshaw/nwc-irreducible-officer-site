// Teacher-facing summary: one "## At a glance" section per template, shown as a card on the site.
const LABELS = ["You bring", "You do", "You get"];

export function extractAtAGlance(md, where) {
  const m = md.match(/^## At a glance\n\n([\s\S]*?)\n(?=## )/m);
  if (!m) throw new Error(`${where}: missing "## At a glance" section`);
  const after = md.slice(m.index + m[0].length);
  if (!after.startsWith("## Audience and readiness")) throw new Error(`${where}: "## At a glance" must sit directly before "## Audience and readiness"`);
  const lines = m[1].trim().split("\n");
  if (lines.length !== 3) throw new Error(`${where}: "## At a glance" needs exactly three bullets`);
  const glance = lines.map((line, i) => {
    const b = line.match(/^- \*\*([^*]+):\*\* (.+)$/);
    if (!b || b[1] !== LABELS[i]) throw new Error(`${where}: At a glance line ${i + 1} must start "- **${LABELS[i]}:**"`);
    if (/[*`[\]]/.test(b[2])) throw new Error(`${where}: At a glance "${LABELS[i]}" must be plain text (no markdown)`);
    return { label: LABELS[i], text: b[2].trim() };
  });
  return { glance, body: md.slice(0, m.index) + after };
}

export function collapseFacilitation(html, where) {
  const open = '<h2 id="ai-facilitation-block">';
  const start = html.indexOf(open);
  if (start < 0) throw new Error(`${where}: no AI Facilitation Block heading to collapse`);
  const headEnd = html.indexOf("</h2>", start) + "</h2>".length;
  const next = html.indexOf("<h2", headEnd);
  const end = next < 0 ? html.length : next;
  // The assistant's part leads the document, right under the teacher's card.
  return '<details class="assistant-script"><summary>What your assistant will do</summary>'
    + html.slice(headEnd, end)
    + "</details>\n"
    + html.slice(0, start)
    + html.slice(end);
}
