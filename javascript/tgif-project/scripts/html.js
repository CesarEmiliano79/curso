export const parties = {
  D: 'Democrat',
  R: 'Republican',
  ID: 'Independent'
};

export async function fetchJson(url) {
  const response = await fetch(url);
  return response.json();
}

// Busca dentro de results[] el bloque que corresponde a la cámara pedida
export function getChamberData(data, chamber) {
  // chamber viene como "senate" o "house" desde la URL; el JSON usa "Senate"/"House"
  const target = chamber.toLowerCase();
  return data.results.find((r) => r.chamber.toLowerCase() === target);
}

export function makeMemberRows(chamberData, selectedParties, selectedState = 'ALL') {
  const members = chamberData.members;

  const filtered = members.filter((m) => {
    const partyMatch = selectedParties.includes(m.party);
    const stateMatch = selectedState === 'ALL' || m.state === selectedState;
    return partyMatch && stateMatch;
  });

  if (filtered.length === 0) {
    return `<tr><td colspan="5" class="text-center text-muted">No results match the selected filters.</td></tr>`;
  }

  return filtered.map((member) => {
    const name = `${member.first_name} ${member.last_name}`;
    // Senate usa "seniority" (años), House usa "district" (distrito)
    const lastColumn = member.seniority ?? member.district ?? '—';
    // Si no tiene datos de votación (delegados sin voto), mostrar "N/A"
    const votesPct = (member.votes_with_party_pct == null)
      ? 'N/A'
      : member.votes_with_party_pct;

    return `
      <tr>
        <td><a href="${member.url || '#'}">${name}</a></td>
        <td>${member.party}</td>
        <td>${member.state}</td>
        <td>${lastColumn}</td>
        <td>${member.votes_with_party_pct}</td>
      </tr>
    `;
  }).join('');
}

export function populateStateOptions(chamberData, selectElement) {
  const members = chamberData.members;
  const states = [...new Set(members.map((m) => m.state))].sort();

  selectElement.innerHTML = '<option value="ALL">All States</option>';
  states.forEach((state) => {
    selectElement.innerHTML += `<option value="${state}">${state}</option>`;
  });
}

// Config visual según la cámara (título, icono, etiqueta de la última columna)
export function getChamberConfig(chamber) {
  const config = {
    senate: { title: 'Senate', text: "First convened in 1789, the composition and powers of the Senate are established in Article One of the U.S. Constitution. Each state is represented by two senators, regardless of population, who serve staggered six-year terms. The Senate has several exclusive powers not granted to the House, including consenting to treaties as a precondition to their ratification and consenting to or confirming appointments of Cabinet secretaries, federal judges, other federal executive officials, military officers, regulatory officials, ambassadors, and other federal uniformed officers, as well as trial of federal officials impeached by the House."
      ,icon: 'bi-envelope', lastColumnLabel: 'Years in Office' },
    house: { title: 'Representatives', text: "The major power of the House is to pass federal legislation that affects the entire country, although its bills must also be passed by the Senate and further agreed to by the U.S. President before becoming law (unless both the House and Senate re-pass the legislation with a two-thirds majority in each chamber). The House has some exclusive powers: the power to initiate revenue bills, to impeach officials (impeached officials are subsequently tried in the Senate), and to elect the U.S. President in case there is no majority in the Electoral College. Each U.S. state is represented in the House in proportion to its population as measured in the census, but every state is entitled to at least one representative."
      ,icon: 'bi-people', lastColumnLabel: 'District' }
  };
  return config[chamber] || config.senate;
}

// ─── ESTADÍSTICAS ───────────────────────────────────────────

// Cuenta miembros por partido en una cámara: { D: 49, R: 51, ID: 2 }
function countByParty(members) {
  return members.reduce((acc, m) => {
    acc[m.party] = (acc[m.party] || 0) + 1;
    return acc;
  }, {});
}

// Promedio de un campo numérico agrupado por partido
// Ignora miembros con valor null/undefined
function avgByParty(members, field) {
  const totals = {};
  const counts = {};

  members.forEach((m) => {
    if (m[field] == null) return;
    totals[m.party] = (totals[m.party] || 0) + m[field];
    counts[m.party] = (counts[m.party] || 0) + 1;
  });

  const result = {};
  for (const party in totals) {
    result[party] = counts[party] ? totals[party] / counts[party] : NaN;
  }
  return result;
}

// Devuelve el top N% de members ordenados por field (asc o desc)
// Ignora miembros sin ese campo
function topPercent(members, field, order = 'desc', pct = 0.1) {
  const valid = members.filter((m) => m[field] != null);
  const sorted = [...valid].sort((a, b) =>
    order === 'desc' ? b[field] - a[field] : a[field] - b[field]
  );
  const n = Math.max(1, Math.ceil(sorted.length * pct));
  return sorted.slice(0, n);
}

// Calcula todas las estadísticas para una cámara y las agrega al objeto data
export function calculateStatistics(data) {
    data.results.forEach((chamber) => {
        // Normalizar: si un miembro no tiene missed_votes_pct (House), calcularlo
        const members = chamber.members.map((m) => ({
          ...m,
          missed_votes_pct: m.missed_votes_pct ??
            (m.total_votes > 0
              ? parseFloat(((m.missed_votes / m.total_votes) * 100).toFixed(2))
              : 0)
    }));
    chamber.statistics = {
      counts:      countByParty(members),
      missed:      avgByParty(members, 'missed_votes_pct'),
      loyalty:     avgByParty(members, 'votes_with_party_pct'),
      leastEngaged: topPercent(members, 'missed_votes_pct', 'desc'),
      mostEngaged:  topPercent(members, 'missed_votes_pct', 'asc'),
      leastLoyal:   topPercent(members, 'votes_with_party_pct', 'asc'),
      mostLoyal:    topPercent(members, 'votes_with_party_pct', 'desc'),
    };
  });
  return data;
}

// ─── GENERADORES DE HTML PARA TABLAS ────────────────────────

const partyNames = { D: 'Democrat', R: 'Republican', ID: 'Independent' };

function fmt(val, decimals = 1) {
  if (val == null || isNaN(val)) return 'N/A';
  return Number(val).toFixed(decimals);
}

// Tabla "at a glance": conteo y promedio de una métrica por partido
export function makePartyStatsRows(stats, metricKey, metricLabel) {
  return Object.keys(partyNames).map((p) => {
    const count  = stats.counts[p]     ?? 0;
    const metric = stats[metricKey]?.[p];
    return `
      <tr>
        <td>${partyNames[p]}</td>
        <td>${count}</td>
        <td>${fmt(metric)}%</td>
      </tr>
    `;
  }).join('');
}

// Tabla de miembros (least/most engaged o loyal)
export function makeMemberStatRows(members, nameField = null, pctField, label) {
  if (!members || members.length === 0) {
    return `<tr><td colspan="3" class="text-muted text-center">No data</td></tr>`;
  }
  return members.map((m) => {
    const name = `${m.first_name} ${m.last_name}`;
    const votes = m.missed_votes ?? m.total_votes ?? '—';
    const pct   = fmt(m[pctField]);
    return `
      <tr>
        <td><a href="${m.url || '#'}">${name}</a></td>
        <td>${votes}</td>
        <td>${pct}%</td>
      </tr>
    `;
  }).join('');
}
