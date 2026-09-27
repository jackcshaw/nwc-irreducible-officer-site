import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { extractAtAGlance, collapseFacilitation } from "../../scripts/at-a-glance.mjs";

const good = "# T\n\nIntro.\n\n## At a glance\n\n- **You bring:** A.\n- **You do:** B.\n- **You get:** C.\n\n## Audience and readiness\n\nX\n";
const { glance, body } = extractAtAGlance(good, "t.md");
assert.deepEqual(glance, [{ label: "You bring", text: "A." }, { label: "You do", text: "B." }, { label: "You get", text: "C." }]);
assert(!body.includes("At a glance") && body.includes("## Audience and readiness"), "body drops only the section");
assert.throws(() => extractAtAGlance("# T\n\n## Audience and readiness\n", "t.md"), /t\.md: missing "## At a glance"/);
assert.throws(() => extractAtAGlance(good.replace("You do", "You make"), "t.md"), /line 2 must start "- \*\*You do:\*\*"/);
assert.throws(() => extractAtAGlance(good.replace("- **You get:** C.\n", ""), "t.md"), /exactly three bullets/);
assert.throws(() => extractAtAGlance(good.replace("A.", "A **bold** claim."), "t.md"), /plain text/);
assert.throws(() => extractAtAGlance(good.replace("## Audience and readiness", "## Other\n\n## Audience and readiness"), "t.md"), /directly before "## Audience and readiness"/);

const html = '<p>Intro</p>\n<h2 id="ai-facilitation-block">AI Facilitation Block</h2>\n<p>Say hi.</p>\n<h2 id="next">Next</h2>\n<p>After</p>';
const wrapped = collapseFacilitation(html, "t.md");
assert(wrapped.includes('<details class="assistant-script"><summary>What your assistant will do</summary>\n<p>Say hi.</p>\n</details>'), wrapped);
assert(wrapped.includes('<h2 id="next">Next</h2>') && !wrapped.includes('<details class="assistant-script" open'));
assert.throws(() => collapseFacilitation("<p>none</p>", "t.md"), /t\.md: no AI Facilitation Block/);

const workbench = process.env.WORKBENCH_REPO_PATH || join(process.cwd(), "../workbench");
const files = readdirSync(join(workbench, "templates")).filter(f => f.endsWith(".md"));
assert.equal(files.length, 10, "expected ten templates");
for (const f of files) extractAtAGlance(readFileSync(join(workbench, "templates", f), "utf8"), `templates/${f}`);
console.log(`at a glance passed: module and ${files.length} templates`);
