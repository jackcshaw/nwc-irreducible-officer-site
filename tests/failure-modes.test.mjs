import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseFailureModes } from "../scripts/failure-modes.mjs";

const companion = process.env.COMPANION_REPO_PATH || join(process.cwd(), "../companion");
const source = readFileSync(join(companion, "audiences/failure-modes.json"), "utf8");
const rows = parseFailureModes(source, "audiences/failure-modes.json");
assert.equal(rows.length, 7);
assert.equal(rows[0].slug, "frame-capture");
assert.equal(rows[6].slug, "responsibility-laundering");
const reject = (change, message) => {
  const copy = JSON.parse(source);
  change(copy);
  assert.throws(() => parseFailureModes(JSON.stringify(copy), "broken.json"), message);
};
assert.throws(() => parseFailureModes("{", "broken.json"), /broken\.json: invalid JSON/);
assert.throws(() => parseFailureModes("null", "broken.json"), /exactly seven/);
reject(r => r.pop(), /exactly seven/);
reject(r => r.push(r[0]), /exactly seven/);
reject(r => delete r[2].check, /row 3.*check/);
reject(r => r[2].check = " ", /row 3.*check/);
reject(r => r[2].check = 5, /row 3.*check/);
reject(r => r[2].check = "<em>Check</em>", /row 3.*plain text/);
reject(r => r[2].check = "**Check**", /row 3.*plain text/);
reject(r => r[2].extra = "unrecognized", /row 3.*fields/);
reject(r => r[1] = r[0], /row 2.*fluency-substitution/);
reject(r => [r[0], r[1]] = [r[1], r[0]], /row 1.*frame-capture/);
reject(r => r[2].name = "Different name", /row 3.*name/);

const html = readFileSync("dist/index.html", "utf8");
const actual = html.match(/<aside class="argument-insert argument-table" aria-label="Core Failure Modes">[\s\S]*?<\/aside>/)?.[0];
const original = readFileSync("tests/fixtures/failure-modes-table.html", "utf8").trimEnd();
assert.equal(actual, original, "shared rows must preserve the original rendered PME table byte for byte");
console.log("failure modes passed: strict source validation and unchanged rendered table");
