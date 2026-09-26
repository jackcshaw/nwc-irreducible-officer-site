import assert from "node:assert/strict";
import { replaceOrThrow } from "../../scripts/replace-or-throw.mjs";

assert.equal(replaceOrThrow("a b a", "a", "x", "first"), "x b a");
assert.equal(replaceOrThrow("a b a", "a", "x", "all", { all: true }), "x b x");
assert.equal(replaceOrThrow("## A\nold\n## B", /## A[\s\S]*?(?=## B)/, "## A\nnew\n", "section"), "## A\nnew\n## B");
// Profile text may contain "$"; it must be inserted literally.
assert.equal(replaceOrThrow("cost 5", "5", "$&6", "dollar"), "cost $&6");
assert.throws(() => replaceOrThrow("abc", "zzz", "y", "k12/assessment: faculty member"),
  /Template rewrite matched nothing: k12\/assessment: faculty member/);
assert.throws(() => replaceOrThrow("abc", /zzz/g, "y", "regex", { all: true }), /matched nothing: regex/);
console.log("replaceOrThrow passed: literal replacement, all-matches, and loud misses");
