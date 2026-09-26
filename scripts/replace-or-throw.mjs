// A template rewrite that stops matching must stop the build, not ship unchanged text.
export function replaceOrThrow(text, pattern, replacement, label, { all = false } = {}) {
  let count = 0;
  const replacer = (...args) => {
    count++;
    return typeof replacement === "function" ? replacement(...args) : replacement;
  };
  const out = all ? text.replaceAll(pattern, replacer) : text.replace(pattern, replacer);
  if (count === 0) throw new Error(`Template rewrite matched nothing: ${label}`);
  return out;
}
