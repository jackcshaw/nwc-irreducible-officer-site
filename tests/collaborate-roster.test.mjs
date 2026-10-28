import assert from "node:assert/strict";
import { renderRoster } from "../scripts/collaborate-roster.mjs";

// The public roster: absent while empty, escaped, and without empty details.
assert.equal(renderRoster([]), "", "an empty roster renders nothing");
const html = renderRoster([
  { name: "Ada <b>Lovelace</b>", role: "", setting: "PME" },
  { name: "Grace Hopper", role: "Instructor, Example College", setting: "" },
]);
assert.match(html, /^<section class="collaborate-roster" data-collaborators aria-labelledby="collaborators-heading">/);
assert.match(html, /<strong>Ada &lt;b&gt;Lovelace&lt;\/b&gt;<\/strong><span>PME<\/span><\/li>/, "names are escaped and empty roles leave no span");
assert.match(html, /<strong>Grace Hopper<\/strong><span>Instructor, Example College<\/span><\/li>/, "empty settings leave no span");
assert.doesNotMatch(html, /<span><\/span>/);
console.log("collaborate roster passed: empty, escaped, no empty details");
