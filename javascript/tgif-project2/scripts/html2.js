export const parties = {
  D: 'Democrat',
  R: 'Republican',
  ID: 'Independent'
};

export async function fetchJson(url) {
  const response = await fetch(url);
  return response.json();
}

export function makeMemberRows(data, filterField, filterValue) {
  const members = data.results[0].members;

  const filtered = filterValue === 'ALL'
    ? members
    : members.filter((m) => String(m[filterField]) === String(filterValue));

  if (filtered.length === 0) {
    return `<tr><td colspan="5" class="text-center text-muted">No results found</td></tr>`;
  }

  return filtered.map((member) => {
    const name = `${member.first_name} ${member.last_name}`;
    return `
      <tr>
        <td><a href="${member.url}">${name}</a></td>
        <td>${member.party}</td>
        <td>${member.state}</td>
        <td>${member.seniority}</td>
        <td>${member.votes_with_party_pct}</td>
      </tr>
    `;
  }).join('');
}