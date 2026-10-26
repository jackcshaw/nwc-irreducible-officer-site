// The open call's public roster: only people who agreed separately to be
// listed (content/collaborators.json). Absent while the list is empty.
const escape = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function renderRoster(people) {
  if (!people.length) return "";
  const items = people.map((person) => {
    const details = [person.role, person.setting].filter(Boolean).map((detail) => `<span>${escape(detail)}</span>`).join("");
    return `<li><strong>${escape(person.name)}</strong>${details}</li>`;
  });
  return `<section class="collaborate-roster" data-collaborators aria-labelledby="collaborators-heading"><h2 id="collaborators-heading">Collaborators</h2><ul>${items.join("")}</ul></section>`;
}
