const DEFAULT_DATA_URL = "../veri/veri.csv";
const DATA_FETCH_TIMEOUT_MS = 4000;
const PLACEHOLDER_DATA_URLS = new Set([
  "GOOGLE_SHEET_CSV_LINKI",
  "GOOGLE_SHEET_CSV_LINK",
  "SHEET_CSV_LINKI",
  "SHEET_CSV_LINK",
]);
const ENERGY_COLORS = {
  Elektrik: "#176fb8",
  Dogalgaz: "#c56a18",
  "Basincli Hava": "#6f5cc4",
};
const ENERGY_SOFT_COLORS = {
  Elektrik: "#e7f1fa",
  Dogalgaz: "#fff0df",
  "Basincli Hava": "#f0edff",
};
const STATUS_LABELS = {
  good: "Hedef içinde",
  warn: "Uyarı",
  bad: "Kritik",
};

function cleanDataUrl(value) {
  const trimmed = (value || "").trim();
  if (PLACEHOLDER_DATA_URLS.has(trimmed)) return "";
  return googleSheetCsvUrl(trimmed);
}

function googleSheetCsvUrl(value) {
  try {
    const url = new URL(value);
    const match = url.pathname.match(/\/spreadsheets\/d\/([^/]+)/);
    if (!match || url.searchParams.get("output") === "csv" || url.searchParams.get("format") === "csv") {
      return value;
    }
    const gid = url.searchParams.get("gid") || "0";
    return `https://docs.google.com/spreadsheets/d/${match[1]}/export?format=csv&gid=${gid}`;
  } catch {
    return value;
  }
}

function dataUrl() {
  const params = new URLSearchParams(window.location.search);
  return cleanDataUrl(params.get("data")) || cleanDataUrl(window.DASHBOARD_DATA_URL) || DEFAULT_DATA_URL;
}

async function fetchCsv(url) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), DATA_FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { cache: "no-store", signal: controller.signal });
  } finally {
    window.clearTimeout(timeoutId);
  }
}

const els = {
  lastUpdated: document.querySelector("#lastUpdated"),
  state: document.querySelector("#stateMessage"),
  lineFilter: document.querySelector("#lineFilter"),
  energyFilter: document.querySelector("#energyFilter"),
  periodFilter: document.querySelector("#periodFilter"),
  dataSummary: document.querySelector("#dataSummary"),
  kpiGrid: document.querySelector("#kpiGrid"),
  actionRows: document.querySelector("#actionRows"),
  gauge: document.querySelector("#gaugeCanvas"),
  mix: document.querySelector("#mixCanvas"),
  trend: document.querySelector("#trendCanvas"),
  pareto: document.querySelector("#paretoCanvas"),
};

let allRows = [];

function parseCsv(text) {
  const rows = [];
  let cell = "";
  let row = [];
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === "\"" && quoted && next === "\"") {
      cell += "\"";
      i += 1;
    } else if (char === "\"") {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell);
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }

  const headers = rows.shift() || [];
  return rows.map((items) => Object.fromEntries(headers.map((header, index) => [header, items[index] ?? ""])));
}

function normalize(rows) {
  return rows.map((row) => {
    const consumption = Number(row["Tuketim (kWh)"]);
    const production = Number(row["Uretim Adedi"]);
    const target = Number(row["Hedef kWh/birim"]);
    const unitEnergy = production > 0 ? consumption / production : 0;
    return {
      date: new Date(row.Tarih),
      line: row.Hat,
      energy: row["Enerji Tipi"],
      consumption,
      production,
      target,
      co2Factor: Number(row["CO2 Faktoru"]),
      action: row["Planlanan Iyilestirme"] || "Standart izleme",
      status: row.Durum || "Izlemede",
      unitEnergy,
      deviation: target > 0 ? (unitEnergy - target) / target : 0,
    };
  }).filter((row) => row.date.toString() !== "Invalid Date" && row.consumption >= 0 && row.production > 0);
}

function formatDate(date) {
  return new Intl.DateTimeFormat("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
}

function formatNumber(value, digits = 0) {
  return new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(value);
}

function formatPercent(value) {
  return new Intl.NumberFormat("tr-TR", { style: "percent", maximumFractionDigits: 1 }).format(value);
}

function energyColor(energy) {
  return ENERGY_COLORS[energy] || "#176fb8";
}

function energyKey(energy) {
  const keys = {
    Elektrik: "elektrik",
    Dogalgaz: "dogalgaz",
    "Basincli Hava": "basincli-hava",
  };
  return keys[energy] || "karma";
}

function statusLabel(status) {
  return STATUS_LABELS[status] || STATUS_LABELS.good;
}

function activeEnergy(rows) {
  const energyTypes = [...new Set(rows.map((row) => row.energy))];
  return energyTypes.length === 1 ? energyTypes[0] : null;
}

function setEnergyTheme(rows) {
  const selectedEnergy = activeEnergy(rows);
  document.documentElement.dataset.energyTheme = selectedEnergy ? energyKey(selectedEnergy) : "karma";
}

function setState(message, tone = "warn") {
  els.state.textContent = message;
  els.state.className = `state is-visible ${tone}`;
}

function clearState() {
  els.state.textContent = "";
  els.state.className = "state";
}

function populateFilters(rows) {
  const lines = [...new Set(rows.map((row) => row.line))].sort();
  const energyTypes = [...new Set(rows.map((row) => row.energy))].sort();

  for (const line of lines) {
    els.lineFilter.add(new Option(line, line));
  }
  for (const energy of energyTypes) {
    els.energyFilter.add(new Option(energy, energy));
  }
  els.lineFilter.options[0].textContent = `Tüm hatlar (${lines.length})`;
  els.energyFilter.options[0].textContent = `Tüm enerji tipleri (${energyTypes.length})`;
  els.dataSummary.textContent = `Veri kaynağı okundu: ${rows.length} satır, ${lines.length} hat, ${energyTypes.length} enerji tipi.`;
}

function updateDataSummary(rows) {
  const period = selectedPeriodDays();
  const periodText = period ? `Son ${period} gün` : "Tüm veri";
  const baseRows = filteredBaseRows().length;
  const minDate = rows.length ? new Date(Math.min(...rows.map((row) => row.date.getTime()))) : null;
  const maxDate = rows.length ? new Date(Math.max(...rows.map((row) => row.date.getTime()))) : null;
  const dateText = minDate && maxDate ? `${formatDate(minDate)} - ${formatDate(maxDate)}` : "tarih yok";
  els.dataSummary.textContent = `Seçili dönem: ${periodText}. Kullanılan veri: ${rows.length}/${baseRows} satır. Tarih aralığı: ${dateText}.`;
}

function filteredRows() {
  let rows = filteredBaseRows();
  const maxDate = maxDataDate();
  const period = selectedPeriodDays();

  if (period) {
    const minDate = new Date(maxDate);
    minDate.setDate(maxDate.getDate() - period);
    rows = rows.filter((row) => row.date > minDate && row.date <= maxDate);
  }
  return rows;
}

function filteredBaseRows() {
  let rows = [...allRows];
  if (els.lineFilter.value !== "all") rows = rows.filter((row) => row.line === els.lineFilter.value);
  if (els.energyFilter.value !== "all") rows = rows.filter((row) => row.energy === els.energyFilter.value);
  return rows;
}

function maxDataDate() {
  return new Date(Math.max(...allRows.map((row) => row.date.getTime())));
}

function selectedPeriodDays() {
  return els.periodFilter.value === "all" ? null : Number(els.periodFilter.value);
}

function previousPeriodRows() {
  let rows = filteredBaseRows();
  const period = selectedPeriodDays();
  if (period !== "all") {
    if (!period) return [];
    const maxDate = maxDataDate();
    const previousEnd = new Date(maxDate);
    previousEnd.setDate(maxDate.getDate() - period);
    const previousStart = new Date(maxDate);
    previousStart.setDate(maxDate.getDate() - period * 2);
    rows = rows.filter((row) => row.date > previousStart && row.date <= previousEnd);
  }
  return rows;
}

function aggregate(rows) {
  const consumption = rows.reduce((sum, row) => sum + row.consumption, 0);
  const production = rows.reduce((sum, row) => sum + row.production, 0);
  const weightedTarget = rows.reduce((sum, row) => sum + row.target * row.production, 0) / Math.max(production, 1);
  const unitEnergy = consumption / Math.max(production, 1);
  const co2 = rows.reduce((sum, row) => sum + row.consumption * row.co2Factor, 0);
  return {
    consumption,
    production,
    unitEnergy,
    weightedTarget,
    deviation: weightedTarget > 0 ? (unitEnergy - weightedTarget) / weightedTarget : 0,
    co2,
  };
}

function renderKpis(rows) {
  const data = aggregate(rows);
  const selectedEnergy = activeEnergy(rows);
  const energyClass = `energy-${energyKey(selectedEnergy)}`;
  const tone = data.deviation <= 0 ? "good" : data.deviation < 0.08 ? "warn" : "bad";
  const kpis = [
    ["Toplam tüketim", `${formatNumber(data.consumption)} kWh`, `${formatNumber(data.production)} üretim adedi`, tone],
    ["Birim enerji", `${formatNumber(data.unitEnergy, 2)} kWh/birim`, `Hedef: ${formatNumber(data.weightedTarget, 2)}`, tone],
    ["Hedef sapması", formatPercent(data.deviation), data.deviation <= 0 ? "Hedef içinde" : "İyileştirme gerekli", tone],
    ["CO2 etkisi", `${formatNumber(data.co2 / 1000, 2)} ton`, "Faktör bazlı hesap", data.co2 < 200 ? "good" : "warn"],
  ];

  els.kpiGrid.innerHTML = kpis.map(([label, value, note, cls]) => `
    <article class="kpi ${cls} ${energyClass}">
      <span>${label}</span>
      <small>${statusLabel(cls)}</small>
      <strong>${value}</strong>
      <em>${note}</em>
    </article>
  `).join("");
}

function prepareCanvas(canvas) {
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = rect.width * ratio;
  canvas.height = rect.height * ratio;
  ctx.scale(ratio, ratio);
  ctx.clearRect(0, 0, rect.width, rect.height);
  ctx.font = "12px Segoe UI, Arial, sans-serif";
  ctx.fillStyle = "#172026";
  return { ctx, width: rect.width, height: rect.height };
}

function drawBar(canvas, items, options = {}) {
  const { ctx, width, height } = prepareCanvas(canvas);
  const pad = { left: 56, right: 20, top: 18, bottom: 54 };
  const values = items.map((item) => item.value);
  const max = options.signed ? Math.max(...values, 0) : Math.max(...values, 1);
  const min = options.signed ? Math.min(...values, 0) : 0;
  const range = Math.max(max - min, 0.01);
  const plotHeight = height - pad.top - pad.bottom - 24;
  const yScale = (value) => height - pad.bottom - ((value - min) / range) * plotHeight;
  const zeroY = options.signed ? yScale(0) : height - pad.bottom;
  const gap = 12;
  const barW = (width - pad.left - pad.right - gap * (items.length - 1)) / Math.max(items.length, 1);

  ctx.strokeStyle = "#d9ded8";
  ctx.beginPath();
  ctx.moveTo(pad.left, pad.top);
  ctx.lineTo(pad.left, height - pad.bottom);
  ctx.lineTo(width - pad.right, height - pad.bottom);
  ctx.stroke();

  if (options.signed) {
    ctx.strokeStyle = "#8d98a3";
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(pad.left, zeroY);
    ctx.lineTo(width - pad.right, zeroY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#5c6670";
    ctx.textAlign = "left";
    ctx.fillText("0%", 12, zeroY + 4);
  }

  items.forEach((item, index) => {
    const x = pad.left + index * (barW + gap);
    const y = options.signed ? yScale(item.value) : height - pad.bottom - (item.value / max) * plotHeight;
    const barH = options.signed ? Math.max(Math.abs(zeroY - y), 3) : (item.value / max) * plotHeight;
    const barY = options.signed ? Math.min(y, zeroY) : y;
    ctx.fillStyle = item.color || "#1e6fba";
    ctx.fillRect(x, barY, barW, barH);
    ctx.fillStyle = "#172026";
    ctx.textAlign = "center";
    ctx.fillText(item.label, x + barW / 2, height - 28);
    const labelY = options.signed && item.value < 0 ? zeroY + 24 : barY - 7;
    if (options.signed && item.value < 0) {
      ctx.fillStyle = "#ffffff";
      ctx.font = "700 12px Segoe UI, Arial, sans-serif";
    }
    ctx.fillText(options.percent ? formatPercent(item.value) : formatNumber(item.value, 1), x + barW / 2, labelY);
    ctx.font = "12px Segoe UI, Arial, sans-serif";
  });
}

function drawLine(canvas, currentSeries, previousSeries, options = {}) {
  const { ctx, width, height } = prepareCanvas(canvas);
  const currentColor = options.currentColor || "#176fb8";
  const pad = { left: 58, right: 28, top: 24, bottom: 58 };
  const values = [...currentSeries.map((item) => item.value), ...previousSeries.map((item) => item.value)];
  const max = Math.max(...values) * 1.12;
  const min = Math.min(...values) * 0.88;
  const pointCount = Math.max(currentSeries.length, previousSeries.length, 1);
  const xStep = (width - pad.left - pad.right) / Math.max(pointCount - 1, 1);
  const y = (value) => height - pad.bottom - ((value - min) / Math.max(max - min, 1)) * (height - pad.top - pad.bottom);

  ctx.strokeStyle = "#d9ded8";
  ctx.beginPath();
  ctx.moveTo(pad.left, pad.top);
  ctx.lineTo(pad.left, height - pad.bottom);
  ctx.lineTo(width - pad.right, height - pad.bottom);
  ctx.stroke();

  function line(data, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    data.forEach((item, index) => {
      const x = pad.left + index * xStep;
      if (index === 0) ctx.moveTo(x, y(item.value));
      else ctx.lineTo(x, y(item.value));
    });
    ctx.stroke();
  }

  line(previousSeries, "#89939e");
  line(currentSeries, currentColor);

  currentSeries.forEach((item, index) => {
    const x = pad.left + index * xStep;
    ctx.fillStyle = currentColor;
    ctx.beginPath();
    ctx.arc(x, y(item.value), 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#172026";
    ctx.textAlign = "center";
    if (currentSeries.length <= 10 || index % 2 === 0) {
      ctx.fillText(item.label, x, height - 30);
    }
  });

  ctx.textAlign = "left";
  ctx.fillStyle = currentColor;
  ctx.fillText("Mevcut dönem", pad.left, 18);
  ctx.fillStyle = "#89939e";
  ctx.fillText("Önceki dönem", pad.left + 112, 18);
}

function groupBy(rows, keyFn) {
  const map = new Map();
  for (const row of rows) {
    const key = keyFn(row);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(row);
  }
  return [...map.entries()];
}

function dailySeries(rows) {
  return groupBy(rows, (row) => row.date.toISOString().slice(0, 10))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, group]) => {
      const item = aggregate(group);
      const date = new Date(`${key}T00:00:00`);
      return {
        label: new Intl.DateTimeFormat("tr-TR", { day: "2-digit", month: "2-digit" }).format(date),
        value: item.unitEnergy,
      };
    });
}

function renderCharts(rows) {
  const selectedEnergy = activeEnergy(rows);
  const currentColor = selectedEnergy ? energyColor(selectedEnergy) : "#176fb8";
  const mix = groupBy(rows, (row) => row.energy)
    .map(([label, group]) => ({ label, value: group.reduce((sum, row) => sum + row.consumption, 0), color: energyColor(label) }));
  drawBar(els.mix, mix, {});

  const data = aggregate(rows);
  drawBar(els.gauge, [
    { label: selectedEnergy || "Mevcut", value: data.unitEnergy, color: currentColor },
    { label: "Hedef", value: data.weightedTarget, color: "#89939e" },
  ]);

  drawLine(els.trend, dailySeries(rows), dailySeries(previousPeriodRows()), { currentColor });

  const pareto = groupBy(rows, (row) => row.line)
    .map(([label, group]) => {
      const deviation = aggregate(group).deviation;
      return { label, value: deviation, color: deviation <= 0 ? "#188464" : "#bd7418" };
    })
    .sort((a, b) => Math.abs(b.value) - Math.abs(a.value));
  drawBar(els.pareto, pareto, { percent: true, signed: true });
}

function renderActions(rows) {
  const groupedRows = groupBy(rows, (row) => `${row.line}|${row.energy}`)
    .map(([key, group]) => {
      const [line, energy] = key.split("|");
      const data = aggregate(group);
      const latest = group.toSorted((a, b) => b.date - a.date)[0];
      return { line, energy, ...data, action: latest.action, status: latest.status };
    });
  const criticalRows = groupedRows
    .filter((row) => row.deviation > 0.03)
    .sort((a, b) => b.deviation - a.deviation)
    .slice(0, 10);
  const actionRows = criticalRows.length
    ? criticalRows
    : groupedRows.sort((a, b) => Math.abs(b.deviation) - Math.abs(a.deviation)).slice(0, 10);

  if (!actionRows.length) {
    els.actionRows.innerHTML = "<tr><td colspan=\"7\">Seçili filtrelerde veri yok.</td></tr>";
    return;
  }

  els.actionRows.innerHTML = actionRows.map((row) => {
    const cls = row.deviation > 0.1 ? "bad" : row.deviation > 0.03 ? "warn" : "good";
    const label = row.deviation > 0.1 ? "Kritik" : row.deviation > 0.03 ? "İzle" : "Hedef içinde";
    return `
      <tr>
        <td>${row.line}</td>
        <td><span class="energy-mark energy-${energyKey(row.energy)}"></span>${row.energy}</td>
        <td>${formatNumber(row.unitEnergy, 2)}</td>
        <td>${formatNumber(row.weightedTarget, 2)}</td>
        <td><span class="badge ${cls}">${label}: ${formatPercent(row.deviation)}</span></td>
        <td>${row.deviation > 0.03 ? row.action : "Standart izleme sürsün"}</td>
        <td>${row.status}</td>
      </tr>
    `;
  }).join("");
}

function render() {
  const rows = filteredRows();
  if (!rows.length) {
    setEnergyTheme(rows);
    updateDataSummary(rows);
    setState("Seçili filtrelerde veri yok. Filtreleri genişletin veya veri dosyasını kontrol edin.");
    els.kpiGrid.innerHTML = "";
    els.actionRows.innerHTML = "<tr><td colspan=\"7\">Veri yok.</td></tr>";
    [els.gauge, els.mix, els.trend, els.pareto].forEach((canvas) => prepareCanvas(canvas));
    return;
  }
  setEnergyTheme(rows);
  clearState();
  updateDataSummary(rows);
  renderKpis(rows);
  renderCharts(rows);
  renderActions(rows);
}

function activatePanel(panelName) {
  const button = document.querySelector(`.tab[data-panel="${panelName}"]`);
  const panel = document.querySelector(`#${panelName}`);
  if (!button || !panel) return;
  document.querySelectorAll(".tab, .panel").forEach((node) => node.classList.remove("is-active"));
  button.classList.add("is-active");
  panel.classList.add("is-active");
  render();
}

async function loadData() {
  setState("Veri dosyası okunuyor.");
  try {
    const source = dataUrl();
    let fallbackMessage = "";
    let response;

    try {
      response = await fetchCsv(source);
    } catch (sourceError) {
      if (source === DEFAULT_DATA_URL) throw sourceError;
      response = await fetchCsv(DEFAULT_DATA_URL);
      fallbackMessage = "Google Sheet linki okunamadı; pano yerel veri.csv ile açıldı. Canlı Sheet için yayınlanmış CSV export linki kullanın.";
    }

    if (!response.ok && source !== DEFAULT_DATA_URL) {
      response = await fetchCsv(DEFAULT_DATA_URL);
      if (response.ok) {
        fallbackMessage = "Google Sheet linki okunamadı; pano yerel veri.csv ile açıldı. Canlı Sheet için yayınlanmış CSV export linki kullanın.";
      }
    }
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    let text = await response.text();
    allRows = normalize(parseCsv(text));
    if (!allRows.length && source !== DEFAULT_DATA_URL) {
      const fallbackResponse = await fetchCsv(DEFAULT_DATA_URL);
      if (fallbackResponse.ok) {
        text = await fallbackResponse.text();
        allRows = normalize(parseCsv(text));
        fallbackMessage = "Google Sheet verisi CSV formatında okunamadı; pano yerel veri.csv ile açıldı. Canlı Sheet için yayınlanmış CSV export linki kullanın.";
      }
    }
    if (!allRows.length) {
      els.lastUpdated.textContent = "Veri yok";
      throw new Error("Geçerli satır bulunamadı.");
    }
    populateFilters(allRows);
    const urlParams = new URLSearchParams(window.location.search);
    const lineParam = urlParams.get("line");
    const energyParam = urlParams.get("energy");
    const periodParam = urlParams.get("period");
    if (lineParam && [...els.lineFilter.options].some((option) => option.value === lineParam)) {
      els.lineFilter.value = lineParam;
    }
    if (energyParam && [...els.energyFilter.options].some((option) => option.value === energyParam)) {
      els.energyFilter.value = energyParam;
    }
    if (periodParam && [...els.periodFilter.options].some((option) => option.value === periodParam)) {
      els.periodFilter.value = periodParam;
    }
    els.lastUpdated.textContent = formatDate(new Date(Math.max(...allRows.map((row) => row.date.getTime()))));
    activatePanel(urlParams.get("tab") || "summary");
    if (fallbackMessage) setState(fallbackMessage, "warn");
  } catch (error) {
    els.dataSummary.textContent = "Veri kaynağı okunamadı.";
    setState(`Veri dosyası okunamadı veya geçerli satır yok: ${error.message}. Kaynak dosyayı kontrol edin ya da http://localhost:8000/dashboard/ adresinden tekrar açın.`);
  }
}

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => {
    activatePanel(button.dataset.panel);
  });
});

[els.lineFilter, els.energyFilter, els.periodFilter].forEach((control) => {
  control.addEventListener("change", render);
});

window.addEventListener("resize", () => {
  if (allRows.length) render();
});

loadData();
