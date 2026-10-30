// Check every edition's words in every cast it lists (CONVENTIONS.md, Editions).
//
//   node scripts/edition-check.mjs [slug…] [--todo=classroom] [--counts]
//
// Each figures/<slug>/editions/<id>.json is resolved, for each cast in its `casts` (an
// edition without the list: its own cast), by the runtime's own resolveEdition, run from
// runtime/motion.js, so the check can't drift from the loader. It fails on:
//   - a cast in casts.json without a key another cast has;
//   - a loader warning: an override key casts.json lacks, or a byCast patch that doesn't
//     replace a string;
//   - an unfilled {key};
//   - another cast's role words (only for an edition that lists two or more casts), less
//     the figure's allowlist (ALLOW, below): "Faculty" in a classroom patch, "instructor" in
//     a high-school one;
//   - a verb after a reviewer key that doesn't agree with the cast. Only seminar (PME's
//     "Faculty") is plural: "{reviewer_has} only the emails, and asks" breaks there. The
//     classroom ("the instructor"), high-school and workplace reviewers are singular, so
//     "{reviewer_puts} them aside and ask" breaks in those. The number comes from the cast's
//     reviewer_has ("Faculty have" is plural).
// To-do: an edition without a `casts` list whose own cast isn't --todo (default classroom)
// is also resolved in that cast. What that would flag is listed as a to-do for the figure
// work and doesn't fail the check. --counts prints the counts without the items.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import vm from "node:vm";

const ROOT = new URL("../", import.meta.url).pathname;
const args = process.argv.slice(2);
const flag = (name, def) => (args.find((a) => a.startsWith(`--${name}=`)) || `--${name}=${def}`).split("=")[1];
const todoCast = flag("todo", "classroom");
const countsOnly = args.includes("--counts");
const only = args.filter((a) => !a.startsWith("--"));

// Role nouns by cast, besides the person, people and reviewer words casts.json gives each
// cast. The workplace list holds the literal role words the business editions write
// (CLASSROOM-PLAN.md); each figure's own come from its castOverrides once it has them.
const ROLE_NOUNS = {
  seminar: ["seminar"],
  classroom: [],
  "high-school": [],
  workplace: ["analyst", "manager", "associate", "partner", "engineer", "tech lead", "owner", "reviewer"],
};
// Per figure: phrases where another cast's role word is right in every cast. A flagged word
// inside one of these phrases (case-insensitive) passes. An entry is a phrase, or
// {text, path} to pass it only in strings whose path starts with `path`.
const ALLOW = {
  // The essay's quote on the PME page: "subordinates, partners, or commanders".
  "responsibility-laundering": [{ text: "subordinates, partners, or commanders", path: "page.quotes" }],
  // The study's shop owners, not the figure's (the panel and the evidence).
  "uncalibrated-reliance": ["advice owners acted on", "weaker owners", "study of shop owners"],
  // A strategy option and its question, not a role.
  "institutional-monoculture": ["partner or license", "should we partner"],
};
// Words that may sit between a reviewer and its verb.
const ADVERBS = new Set(["only", "also", "then", "just", "still", "never", "now", "first", "again", "always", "often"]);
// Verbs a reviewer does in these figures; the check reads "asks", "relies", "reaches" from them.
const VERBS = new Set("ask see read send receive check point put line give hold keep return set mark sign compare choose pick want need look say tell know notice approve reject accept grade review question press push follow call flag miss judge rank turn move open close find get take start stop wait write rewrite draft trust rely catch finish reach match test sort spot probe hear decide assume expect agree believe think prefer use place hand pass raise note count weigh lay show leave let make".split(" "));
const SINGULAR = new Set(["is", "was", "has", "does", "doesn’t", "doesn't", "isn’t", "isn't", "hasn’t", "hasn't", "wasn’t", "wasn't"]);
const PLURAL = new Set(["are", "were", "have", "do", "don’t", "don't", "aren’t", "aren't", "haven’t", "haven't", "weren’t", "weren't"]);
const isSingularVerb = (w) => SINGULAR.has(w) || (w.endsWith("ies") && VERBS.has(`${w.slice(0, -3)}y`)) || (w.endsWith("es") && VERBS.has(w.slice(0, -2))) || (w.endsWith("s") && VERBS.has(w.slice(0, -1)));
const isPluralVerb = (w) => PLURAL.has(w) || VERBS.has(w);

// The runtime, with just enough of a browser for its top level to run.
const runtime = (() => {
  const ctx = { URLSearchParams, console, location: { search: "" }, matchMedia: () => ({ matches: false, addEventListener() {} }), document: { documentElement: { hasAttribute: () => true }, querySelector: () => null } };
  ctx.window = ctx;
  vm.runInNewContext(readFileSync(`${ROOT}runtime/motion.js`, "utf8"), ctx);
  return ctx.MotionFigures;
})();
const all = JSON.parse(readFileSync(`${ROOT}casts.json`, "utf8"));
delete all._doc;
const castIds = Object.keys(all);

// Every string an edition shows, with its path. Not shown: notes, ids, links and the cast fields.
const SKIP = new Set(["_doc", "id", "cast", "casts", "castOverrides", "byCast", "href", "castId", "castWords"]);
const strings = (v, path = "") =>
  typeof v === "string" ? [[path, v]]
  : Array.isArray(v) ? v.flatMap((x, i) => strings(x, path ? `${path}.${i}` : `${i}`))
  : v && typeof v === "object" ? Object.entries(v).flatMap(([k, x]) => (SKIP.has(k) ? [] : strings(x, path ? `${path}.${k}` : k)))
  : [];
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const nounOf = (s) => (s || "").replace(/^(the|a|an)\s+/i, "").trim();
// A cast's role nouns: its person, people and reviewer words, its list above, and the role
// words the edition's castOverrides give it.
const nounsFor = (castId, raw) => {
  const w = { ...all[castId], ...((raw.castOverrides || {})[castId] || {}) };
  return new Set([w.person, w.people, nounOf(w.reviewer), ...(ROLE_NOUNS[castId] || [])].filter(Boolean).map((s) => s.toLowerCase()));
};
const snippet = (s, i, len) => `${i > 30 ? "…" : ""}${s.slice(Math.max(0, i - 30), i + len + 30)}${i + len + 30 < s.length ? "…" : ""}`.replace(/\s+/g, " ");

function check(slug, raw, castId) {
  const items = [];
  const warnings = [];
  const { ed, words, patched } = runtime.resolveEdition(raw, all, castId, (m) => warnings.push(m));
  for (const m of warnings) items.push({ kind: "loader", path: "", text: m });
  // Unfilled keys.
  for (const [path, s] of strings(ed)) for (const m of s.matchAll(/\{(\w+)(\|upper)?\}/g)) items.push({ kind: "unfilled", path, text: `${m[0]} — ${snippet(s, m.index, m[0].length)}` });
  // Other casts' role words (to-do mode, and editions that list two or more casts).
  if (castId !== (raw.cast || "seminar") || (Array.isArray(raw.casts) && raw.casts.length > 1)) {
    const own = nounsFor(castId, raw);
    const other = new Set(castIds.filter((c) => c !== castId).flatMap((c) => [...nounsFor(c, raw)]).filter((n) => !own.has(n)));
    const rules = (ALLOW[slug] || []).map((a) => (typeof a === "string" ? { text: a, path: "" } : a));
    for (const [path, str] of strings(ed)) {
      const allow = rules.filter((r) => path.startsWith(r.path)).map((r) => r.text.toLowerCase());
      // Link targets aren't words: "hbs.edu/faculty/…" is no role.
      const s = str.replace(/\]\([^)]*\)|https?:\/\/\S+/g, (u) => " ".repeat(u.length));
      const lower = s.toLowerCase();
      const found = new Map(); // by position: "analysts" matches both "analyst" and "analysts"
      for (const noun of other) {
        for (const m of s.matchAll(new RegExp(`(?<!\\p{L})${esc(noun)}(?:s|es)?(?!\\p{L})`, "giu"))) {
          const allowed = allow.some((a) => { for (let i = lower.indexOf(a); i >= 0; i = lower.indexOf(a, i + 1)) if (i <= m.index && m.index + m[0].length <= i + a.length) return true; return false; });
          if (!allowed && !(found.get(m.index)?.length >= m[0].length)) found.set(m.index, m[0]);
        }
      }
      for (const [i, w] of [...found].sort((a, b) => a[0] - b[0])) items.push({ kind: "role", path, text: `"${w}" — ${snippet(str, i, w.length)}` });
    }
  }
  // Verbs after reviewer keys, against the cast's number (the patched words, before filling).
  const plural = /\bhave$/i.test(words.reviewer_has || "");
  const wrong = plural ? isSingularVerb : isPluralVerb;
  const bare = new Set(Object.keys(words).filter((k) => /^reviewer$/i.test(k)));
  for (const [path, s] of strings(patched)) {
    for (const m of s.matchAll(/\{([Rr]eviewer\w*)(\|upper)?\}/g)) {
      if (!(m[1] in words)) continue;
      const rest = s.slice(m.index + m[0].length);
      const clause = rest.split(/[.?!;:](?:\s|$)|\n/)[0];
      const verbs = [];
      if (bare.has(m[1])) {
        // "{Reviewer} asks", "{Reviewer} only asks", "{Reviewer}, who sees".
        const next = clause.toLowerCase().match(/[\p{L}’']+/gu) || [];
        let i = next.findIndex((x) => !ADVERBS.has(x));
        if (next[i] === "who") for (i++; ADVERBS.has(next[i]); i++);
        if (next[i]) verbs.push(next[i]);
      }
      // "…, and asks": the next word after "and", past one adverb.
      for (const a of clause.matchAll(/\band\s+/gi)) {
        const next = clause.slice(a.index + a[0].length).toLowerCase().match(/[\p{L}’']+/gu) || [];
        const w = ADVERBS.has(next[0]) ? next[1] : next[0];
        if (w) verbs.push(w);
      }
      for (const v of verbs.filter(wrong)) items.push({ kind: "verb", path, text: `${m[0]} … "${v}" (${plural ? "plural" : "singular"} ${words.Reviewer || words.reviewer}) — ${snippet(s, m.index, m[0].length + clause.length)}` });
    }
  }
  return items;
}

// Every cast has every key: a key one cast lacks would show as a raw {key} in that cast.
const failures = [];
const keys = new Set(castIds.flatMap((c) => Object.keys(all[c])));
for (const c of castIds) for (const k of keys) if (!(k in all[c])) failures.push({ name: "casts.json", castId: c, kind: "loader", path: k, text: `no "${k}" (every cast needs every key)` });

const slugs = readdirSync(`${ROOT}figures`).filter((s) => existsSync(`${ROOT}figures/${s}/editions`) && (!only.length || only.includes(s))).sort();
const todo = {};
let editions = 0;
for (const slug of slugs) {
  for (const file of readdirSync(`${ROOT}figures/${slug}/editions`).filter((f) => f.endsWith(".json")).sort()) {
    const raw = JSON.parse(readFileSync(`${ROOT}figures/${slug}/editions/${file}`, "utf8"));
    const name = `${slug}/${file.replace(/\.json$/, "")}`;
    editions++;
    const listed = Array.isArray(raw.casts) ? raw.casts : [raw.cast || "seminar"];
    for (const c of listed) {
      if (!all[c]) { failures.push({ name, castId: c, kind: "loader", path: "casts", text: `"${c}" isn't a cast in casts.json` }); continue; }
      for (const it of check(slug, raw, c)) failures.push({ name, castId: c, ...it });
    }
    if (!Array.isArray(raw.casts) && (raw.cast || "seminar") !== todoCast && all[todoCast]) todo[name] = check(slug, raw, todoCast);
  }
}

const KINDS = ["role", "verb", "unfilled", "loader"];
const tally = (items) => Object.fromEntries(KINDS.map((k) => [k, items.filter((i) => i.kind === k).length]));
console.log(`edition-check: ${slugs.length} figures, ${editions} editions, casts ${castIds.join(", ")}`);
if (failures.length) {
  console.log(`\nFAIL: ${failures.length}`);
  for (const f of failures) console.log(`  ${f.name} [${f.castId}] ${f.kind} ${f.path}: ${f.text}`);
} else console.log("\nListed casts: no failures.");
const names = Object.keys(todo);
if (names.length) {
  console.log(`\nTo-do for the ${todoCast} cast (editions without a casts list; not failures):`);
  for (const n of names) {
    const t = tally(todo[n]);
    console.log(`\n  ${n}: ${todo[n].length} (role words ${t.role}, reviewer verbs ${t.verb}, unfilled ${t.unfilled}, loader ${t.loader})`);
    if (!countsOnly) for (const it of todo[n]) console.log(`    ${it.kind} ${it.path}: ${it.text}`);
  }
  console.log(`\n  Total: ${names.reduce((a, n) => a + todo[n].length, 0)} across ${names.filter((n) => todo[n].length).length} editions.`);
}
process.exitCode = failures.length ? 1 : 0;
