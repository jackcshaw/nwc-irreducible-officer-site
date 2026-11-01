// Canonical order from the essay's seven failure modes. Copy lives in the companion.
const SLUGS = [
  "frame-capture", "fluency-substitution", "premature-synthesis", "uncalibrated-reliance",
  "invisible-delegation", "institutional-monoculture", "responsibility-laundering",
];
const FIELDS = ["slug", "name", "whatGoesWrong", "check"];

export function parseFailureModes(text, where = "audiences/failure-modes.json") {
  let rows;
  try { rows = JSON.parse(text); }
  catch (error) { throw new Error(`${where}: invalid JSON`, {cause: error}); }
  if (!Array.isArray(rows) || rows.length !== SLUGS.length) {
    throw new Error(`${where}: expected exactly seven failure-mode rows`);
  }
  for (const [i, row] of rows.entries()) {
    const at = `${where}: row ${i + 1}`;
    if (!row || Array.isArray(row) || typeof row !== "object" ||
        Object.keys(row).length !== FIELDS.length || FIELDS.some(key => !Object.hasOwn(row, key))) {
      throw new Error(`${at}: fields must be exactly ${FIELDS.join(", ")}`);
    }
    for (const key of FIELDS) {
      const value = row[key];
      if (typeof value !== "string" || !value.trim() || value !== value.trim() || /[<>\r\n*`\[\]]/.test(value)) {
        throw new Error(`${at}: ${key} must be nonempty, trimmed plain text`);
      }
    }
    if (row.slug !== SLUGS[i]) throw new Error(`${at}: expected slug ${SLUGS[i]} in essay order`);
    const name = row.slug.replaceAll("-", " ");
    if (row.name !== name[0].toUpperCase() + name.slice(1)) throw new Error(`${at}: name must match ${row.slug}`);
  }
  return rows;
}
