function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[c]));
}

function formatValue(item, value) {
  if (item.kelompok === 'Pendapatan & Riset') {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);
  }
  return String(Math.round(Number(value)));
}

function formatPercent(value) {
  const pct = Math.round(Number(value) * 100);
  return `${pct > 0 ? '+' : ''}${pct}%`;
}

function renderTable() {
  const tbody = document.getElementById('tbody');
  tbody.innerHTML = DATA.map(item => {
    const rowClass = item.sub ? 'sub-row' : 'main-row';
    return `
      <tr class="${rowClass}">
        <td class="indicator-cell">
          <span class="indicator-label">${escapeHtml(item.indikator)}</span>
        </td>
        <td class="value-cell">${formatValue(item, item.tahun2024)}</td>
        <td class="value-cell">${formatValue(item, item.tahun2023)}</td>
        <td class="change-cell">${formatPercent(item.yoy)}</td>
      </tr>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', renderTable);
