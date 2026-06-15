export const parties = {
  D: 'Democrat',
  R: 'Republican',
  ID: 'Independent'
};

export async function fetchJson(url) {
  const response = await fetch(url);
  return response.json();
}

export function makeMemberRows(data, selectedParties, selectedState = 'ALL') {
  const members = data.results[0].members;

  const filtered = members.filter((m) => {
    const partyMatch = selectedParties.includes(m.party);
    const stateMatch = selectedState === 'ALL' || m.state === selectedState;
    return partyMatch && stateMatch;
  });

  if (filtered.length === 0) {
    return `<tr><td colspan="5" class="text-center text-muted">No senators match the selected filters.</td></tr>`;
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

export function populateStateOptions(data, selectElement) {
  const members = data.results[0].members;
  const states = [...new Set(members.map((m) => m.state))].sort();

  selectElement.innerHTML = '<option value="ALL">All States</option>';
  states.forEach((state) => {
    selectElement.innerHTML += `<option value="${state}">${state}</option>`;
  });
}