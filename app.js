const DEFAULT_EVENTO_OPTIONS = [
  "Pessoal",
  "Ferias",
  "ATRASO",
  "Suporte",
  "Gestao",
  "Congresso",
  "Saude",
  "Ausencia",
  "Outros",
];

const AUSENTE_OPTIONS = [
  "Adelson Jose de Macedo",
  "Adriano Neves de Almeida",
  "Alexandre de Castro Morais",
  "Barbara Ribeiro Coutinho Leduc",
  "Carlos Humberto Barbosa Ganem",
  "Crelio Viana",
  "Deiler Celio Jeunon",
  "Dener Augusto Diniz",
  "Flavio Maciel Fonseca",
  "Francisco Tadeu da Mota Albuquerque",
  "Guilherme Vieira Cunha",
  "Gustavo Prosperi Bicalho",
  "Igor Fagundes Vieira",
  "Jayme Bueno Castilho",
  "Leonardo Alves Araujo",
  "Leonardo Carvalho Figueiredo",
  "Leonardo Diniz Correa Pinto",
  "Lucas Cardoso de Andrade",
  "Lucia Helena Jacomett",
  "Luciano Costa Ferreira",
  "Luiz Antonio Carneiro Silva",
  "Luiz Otavio Fernandes Andrade",
  "Marcelo Giovannoni Assis",
  "Marcio Henrique Mendes",
  "Paulo Renato Andrade Silva",
  "Rafael Augusto Carneiro Rezende",
  "Ricardo Lucas da Mota Albuquerque",
  "Rodrigo Capuano de Rezende Carneiro",
  "Rodrigo de Lima e Souza",
  "Rubens Claudio Pinheiro",
  "Wendell Valadares Campos Pereira",
];

const PRESENTE_OPTIONS = [
  "Fernando Astrogildo",
  "Bernardo Guimaraes",
  "Lucas Marques",
  "Ana Carolina",
  "Jessica Karine",
  "Bruna Candida",
  "Adelson Jose de Macedo",
  "Adriano Neves de Almeida",
  "Alexandre de Castro Morais",
  "Barbara Ribeiro Coutinho Leduc",
  "Carlos Humberto Barbosa Ganem",
  "Crelio Viana",
  "Deiler Celio Jeunon",
  "Dener Augusto Diniz",
  "Flavio Maciel Fonseca",
  "Francisco Tadeu da Mota Albuquerque",
  "Guilherme Vieira Cunha",
  "Gustavo Prosperi Bicalho",
  "Igor Fagundes Vieira",
  "Jayme Bueno Castilho",
  "Leonardo Alves Araujo",
  "Leonardo Carvalho Figueiredo",
  "Leonardo Diniz Correa Pinto",
  "Lucas Cardoso de Andrade",
  "Lucia Helena Jacomett",
  "Luciano Costa Ferreira",
  "Luiz Antonio Carneiro Silva",
  "Luiz Otavio Fernandes Andrade",
  "Marcelo Giovannoni Assis",
  "Marcio Henrique Mendes",
  "Paulo Renato Andrade Silva",
  "Rafael Augusto Carneiro Rezende",
  "Ricardo Lucas da Mota Albuquerque",
  "Rodrigo Capuano de Rezende Carneiro",
  "Rodrigo de Lima e Souza",
  "Rubens Claudio Pinheiro",
  "Wendell Valadares Campos Pereira",
];

const TURNO_OPTIONS = ["Manha", "Tarde", "Integral"];
const TEMPO_ATRASO_OPTIONS = ["1", "2", "3", "4", "5", "6"];
const APP_PASSWORD = "8145";
const AUTH_STORAGE_KEY = "eventos-escala-auth-state";
const AUTH_DURATION_MS = 90 * 24 * 60 * 60 * 1000;
const QUEUE_KEY = "eventos-escala-queue";
const HISTORY_KEY = "eventos-escala-history";
const LATEST_SYNCED_KEY = "eventos-escala-latest-synced";
const TEAM_BOX = "CAIXA DA EQUIPE";
const ATRASO_RATE = 200;
const SCHEDULE_SPREADSHEET_ID = "11ayJbQFmFPzLegFZHL8kPKCvudpPo60O4NyR3i7aofA";
const SCHEDULE_VACATION_SHEET_TITLE = "FERIAS 2026";
const SCHEDULE_SHEET_SOURCES = [
  ["SEGUNDA 2026", "Segunda-feira"],
  ["TERCA 2026", "Terca-feira"],
  ["QUARTA 2026", "Quarta-feira"],
  ["QUINTA 2026", "Quinta-feira"],
  ["SEXTA 2026", "Sexta-feira"],
  ["SABADO 2026", "Sabado"],
  ["DOMINGO 2026", "Domingo"],
];
const DEFAULT_CONFIG = {
  endpointUrl: "",
  requestTimeoutMs: 15000,
  historyLimit: 10,
};

const PRESENTE_HIGHLIGHTS = {
  "Fernando Astrogildo": "#15803d",
  "Bernardo Guimaraes": "#1d4ed8",
  "Lucas Marques": "#7c3aed",
  "Ana Carolina": "#c2410c",
  "Jessica Karine": "#be185d",
  "Bruna Candida": "#0f766e",
};

const APP_CONFIG = {
  ...DEFAULT_CONFIG,
  ...(window.APP_CONFIG || {}),
};

const BRL_FORMATTER = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const form = document.getElementById("eventForm");
const authCard = document.getElementById("authCard");
const appContent = document.getElementById("appContent");
const authForm = document.getElementById("authForm");
const passwordInput = document.getElementById("passwordInput");
const scheduleDateInput = document.getElementById("scheduleDateInput");
const prevScheduleButton = document.getElementById("prevScheduleButton");
const todayScheduleButton = document.getElementById("todayScheduleButton");
const nextScheduleButton = document.getElementById("nextScheduleButton");
const rangeLabel = document.getElementById("rangeLabel");
const outOfRangeNotice = document.getElementById("outOfRangeNotice");
const scheduleHeading = document.getElementById("scheduleHeading");
const formattedScheduleDate = document.getElementById("formattedScheduleDate");
const todayBadge = document.getElementById("todayBadge");
const weekdayBadge = document.getElementById("weekdayBadge");
const scheduleEmptyState = document.getElementById("scheduleEmptyState");
const scheduleSiglasGrid = document.getElementById("scheduleSiglasGrid");
const dataInput = document.getElementById("data");
const eventoSelect = document.getElementById("evento");
const eventoOutroField = document.getElementById("eventoOutroField");
const eventoOutroInput = document.getElementById("eventoOutro");
const atrasoTempoField = document.getElementById("atrasoTempoField");
const atrasoTempoSelect = document.getElementById("atrasoTempo");
const ausenteField = document.getElementById("ausenteField");
const ausenteSelect = document.getElementById("ausente");
const presenteField = document.getElementById("presenteField");
const presenteSelect = document.getElementById("presente");
const turnoField = document.getElementById("turnoField");
const turnoSelect = document.getElementById("turno");
const devedorField = document.getElementById("devedorField");
const devedorSelect = document.getElementById("devedor");
const credorField = document.getElementById("credorField");
const credorResultado = document.getElementById("credorResultado");
const queueCount = document.getElementById("queueCount");
const latestSyncedCard = document.getElementById("latestSyncedCard");
const registeredDateFilter = document.getElementById("registeredDateFilter");
const eventEntryCard = document.getElementById("eventEntryCard");
const annotationsButton = document.getElementById("annotationsButton");
const annotationsSection = document.getElementById("annotationsSection");
const annotationsForm = document.getElementById("annotationsForm");
const annotationTextInput = document.getElementById("annotationText");
const saveAnnotationButton = document.getElementById("saveAnnotationButton");
const closeAnnotationsButton = document.getElementById("closeAnnotationsButton");
const notesRemindersButton = document.getElementById("notesRemindersButton");
const notesRemindersSection = document.getElementById("notesRemindersSection");
const notesMonthSelect = document.getElementById("notesMonthSelect");
const notesDateFilter = document.getElementById("notesDateFilter");
const notesMonthInfo = document.getElementById("notesMonthInfo");
const notesRemindersList = document.getElementById("notesRemindersList");
const closeNotesRemindersButton = document.getElementById("closeNotesRemindersButton");
const summaryToggleButton = document.getElementById("summaryToggleButton");
const summarySection = document.getElementById("summarySection");
const summaryMonthSelect = document.getElementById("summaryMonthSelect");
const summaryMonthInfo = document.getElementById("summaryMonthInfo");
const monthlySummaryList = document.getElementById("monthlySummaryList");
const summaryShareButton = document.getElementById("summaryShareButton");
const editRecordModal = document.getElementById("editRecordModal");
const editRecordBackdrop = document.getElementById("editRecordBackdrop");
const closeEditRecordButton = document.getElementById("closeEditRecordButton");
const editRecordForm = document.getElementById("editRecordForm");
const editSourceRow = document.getElementById("editSourceRow");
const editDataInput = document.getElementById("editData");
const editEventoSelect = document.getElementById("editEvento");
const editEventoDescricaoInput = document.getElementById("editEventoDescricao");
const editAtrasoTempoSelect = document.getElementById("editAtrasoTempo");
const editAusenteSelect = document.getElementById("editAusente");
const editPresenteSelect = document.getElementById("editPresente");
const editTurnoSelect = document.getElementById("editTurno");
const editDevedorInput = document.getElementById("editDevedor");
const editCredorInput = document.getElementById("editCredor");
const editObservacoesInput = document.getElementById("editObservacoes");
const saveEditRecordButton = document.getElementById("saveEditRecordButton");
const installCard = document.getElementById("installCard");
const installButton = document.getElementById("installButton");
const installHelpText = document.getElementById("installHelpText");
const syncButton = document.getElementById("syncButton");
const submitButton = document.getElementById("submitButton");
const connectionText = document.getElementById("connectionText");
const connectionDot = document.getElementById("connectionDot");
const toast = document.getElementById("toast");

let deferredInstallPrompt = null;
let currentEventoOptions = [...DEFAULT_EVENTO_OPTIONS];
let currentAusenteOptions = [...AUSENTE_OPTIONS];
let currentPresenteOptions = [...PRESENTE_OPTIONS];
let monthlyNotesRecords = [];
let monthlySummaryRecords = [];
let syncedRecords = [];
let appBootstrapped = false;
let annotationsOpen = false;
let notesRemindersOpen = false;
let summaryOpen = false;
let lastReviewNoticeKey = "";
let latestSyncedRecord = readLatestSyncedCache();
let orderedScheduleDates = [];
let scheduleDaysByDate = new Map();
let scheduleHighlightsByDate = new Map();
let scheduleVacationsByDate = new Map();
let memoryAuthState = null;

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function normalizeToken(value) {
  return normalizeText(value).toUpperCase();
}

function readStoredAuth() {
  try {
    const rawValue = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!rawValue) {
      return memoryAuthState;
    }

    const parsedValue = JSON.parse(rawValue);
    memoryAuthState = parsedValue;
    return parsedValue;
  } catch {
    return memoryAuthState;
  }
}

function writeStoredAuth(payload) {
  memoryAuthState = payload;

  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Some mobile browsers or installed PWAs can temporarily block storage writes.
  }
}

function clearStoredAuth() {
  memoryAuthState = null;

  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    // Ignore storage cleanup failures and continue with the in-memory state.
  }
}

function getManagedFields() {
  return Array.from(document.querySelectorAll(".field"));
}

function fillSelect(select, options, placeholder) {
  select.innerHTML = "";
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = placeholder;
  defaultOption.disabled = true;
  defaultOption.selected = true;
  select.appendChild(defaultOption);

  options.forEach((option) => {
    const element = document.createElement("option");
    element.value = option;
    element.textContent = option;
    if (select === presenteSelect && PRESENTE_HIGHLIGHTS[option]) {
      element.dataset.highlight = PRESENTE_HIGHLIGHTS[option];
      element.style.color = PRESENTE_HIGHLIGHTS[option];
      element.style.fontWeight = "700";
    }
    select.appendChild(element);
  });
}

function setSingleSelectValue(select, value, placeholder) {
  select.innerHTML = "";
  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = placeholder;
  placeholderOption.disabled = true;
  select.appendChild(placeholderOption);

  if (value) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    option.selected = true;
    select.appendChild(option);
  } else {
    placeholderOption.selected = true;
  }
}

function syncHighlightedSelect(select) {
  const selectedOption = select.selectedOptions[0];
  const highlight = selectedOption?.dataset.highlight || "";
  if (highlight) {
    select.classList.add("is-highlighted");
    select.style.setProperty("--select-highlight", highlight);
  } else {
    select.classList.remove("is-highlighted");
    select.style.removeProperty("--select-highlight");
  }
}

function readQueue() {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeQueue(items) {
  localStorage.setItem(QUEUE_KEY, JSON.stringify(items));
  queueCount.textContent = `${items.length} pendente(s)`;
}

function readHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeHistory(items) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(0, APP_CONFIG.historyLimit || 10)));
}

function readLatestSyncedCache() {
  try {
    return JSON.parse(localStorage.getItem(LATEST_SYNCED_KEY) || "null");
  } catch {
    return null;
  }
}

function writeLatestSyncedCache(record) {
  localStorage.setItem(LATEST_SYNCED_KEY, JSON.stringify(record));
}

function isAtrasoEvent(value) {
  return normalizeText(value) === "atraso";
}

function isOutrosEvent(value) {
  return normalizeText(value) === "outros";
}

function isSuporteEvent(value) {
  return normalizeText(value) === "suporte";
}

function getValorPorTurno(turno) {
  if (turno === "Integral") {
    return 2000;
  }

  if (turno === "Manha" || turno === "Tarde") {
    return 1000;
  }

  return "";
}

function getRuleForEvent(evento) {
  const normalized = normalizeText(evento);

  if (normalized === "atraso") {
    return {
      pagadorMode: "absent",
      credorMode: "team",
      disableSubstituto: true,
      disableTurno: true,
      disableAusente: false,
      amountMode: "atraso",
    };
  }

  if (normalized === "pessoal" || normalized === "ferias" || normalized === "saude") {
    return {
      pagadorMode: "absent",
      credorMode: "substitute",
      disableSubstituto: false,
      disableTurno: false,
      disableAusente: false,
      amountMode: "turno",
    };
  }

  if (normalized === "suporte" || normalized === "gestao" || normalized === "congresso") {
    return {
      pagadorMode: "team",
      credorMode: "substitute",
      disableSubstituto: false,
      disableTurno: false,
      disableAusente: normalized === "suporte",
      amountMode: "turno",
    };
  }

  if (normalized === "ausencia") {
    return {
      pagadorMode: "absent",
      credorMode: "team",
      disableSubstituto: false,
      disableTurno: false,
      disableAusente: false,
      amountMode: "turno",
    };
  }

  return {
    pagadorMode: "manual",
    credorMode: "substitute",
    disableSubstituto: false,
    disableTurno: false,
    disableAusente: false,
    amountMode: "turno",
  };
}

function getSettlementState() {
  return computeSettlementFromValues({
    evento: eventoSelect.value,
    ausente: ausenteSelect.value,
    presente: presenteSelect.value,
    turno: turnoSelect.value,
    atrasoTempo: atrasoTempoSelect.value,
    manualPagador: devedorSelect.value,
  });
}

function formatLatestSyncedText(record) {
  if (!record) {
    return "Nenhum registro sincronizado encontrado na planilha ainda.";
  }

  return `MEMBRO (AUSENTE/ATRASADO): ${record.ausente || "-"} | SUBSTITUTO: ${
    record.presente || "-"
  } | TURNO: ${record.turno || "-"} | PAGADOR: ${record.devedor || "-"} | CREDOR: ${
    record.credor || "-"
  } | VALOR A PAGAR: ${record.valorPagar || "-"}`;
}

function renderLatestSynced(record = readLatestSyncedCache()) {
  latestSyncedRecord = record || null;
  latestSyncedCard.innerHTML = "";

  const card = document.createElement("article");
  card.className = "history-item";

  if (!record) {
    card.innerHTML = '<p class="queue-copy">Nenhum registro sincronizado encontrado na planilha ainda.</p>';
    latestSyncedCard.appendChild(card);
    return;
  }

  if (record.sourceRow) {
    card.dataset.sourceRow = String(record.sourceRow);
    card.classList.add("history-item--editable");
  }

  const historyLine = record.historicoAlteracoes
    ? `<p class="history-edit-line">${record.historicoAlteracoes}</p>`
    : "";

  card.innerHTML = `
    <strong>Data do Evento: ${record.data || "-"} | Tipo de Evento: ${record.evento || "-"}</strong>
    <p>${formatLatestSyncedText(record)}</p>
    ${historyLine}
  `;
  latestSyncedCard.appendChild(card);
}

function renderRegisteredRecords(dateKey = registeredDateFilter?.value || getLocalDateString()) {
  if (!latestSyncedCard) return;
  const records = syncedRecords.filter((record) => String(record.data || "") === dateKey);
  latestSyncedCard.innerHTML = "";
  if (!records.length) {
    latestSyncedCard.innerHTML = '<article class="history-item"><p class="queue-copy">Nenhum registro encontrado para este dia.</p></article>';
    return;
  }
  records.forEach((record) => {
    const card = document.createElement("article");
    card.className = "history-item history-item--editable";
    if (record.sourceRow) card.dataset.sourceRow = String(record.sourceRow);
    const historyLine = record.historicoAlteracoes ? `<p class="history-edit-line">${record.historicoAlteracoes}</p>` : "";
    card.innerHTML = `<strong>Data do Evento:</strong><span class="history-value">${record.data || "-"}</span><strong>Tipo de Evento:</strong><span class="history-value">${record.evento || "-"}</span><strong>Membro Ausente/Atrasado:</strong><span class="history-value">${record.ausente || "-"}</span><strong>Substituto:</strong><span class="history-value">${record.presente || "-"}</span><strong>Turno:</strong><span class="history-value">${record.turno || "-"}</span><strong>Pagador:</strong><span class="history-value">${record.devedor || "-"}</span><strong>Credor:</strong><span class="history-value">${record.credor || "-"}</span>${record.valorPagar ? `<strong>Valor:</strong><span class="history-value">${record.valorPagar}</span>` : ""}${historyLine}`;
    card.addEventListener("dblclick", () => openEditModal(record));
    latestSyncedCard.appendChild(card);
  });
}

function formatMonthLabel(monthKey) {
  if (!monthKey || !/^\d{4}-\d{2}$/.test(monthKey)) {
    return monthKey || "Sem mes";
  }

  const [year, month] = monthKey.split("-");
  return new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(new Date(Number(year), Number(month) - 1, 1));
}

function getSummaryMonthKey(record) {
  return String(record.monthKey || "").trim();
}

function getNotesMonthKey(record) {
  return String(record.monthKey || "").trim();
}

function getDebtorColor(name) {
  const seed = String(name || "");
  let hash = 0;

  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) % 360;
  }

  return `hsl(${hash} 68% 40%)`;
}

function populateSummaryMonthOptions(records) {
  if (!summaryMonthSelect) {
    return;
  }

  const months = Array.from(new Set(records.map((record) => getSummaryMonthKey(record)).filter(Boolean))).sort(
    (left, right) => right.localeCompare(left),
  );

  summaryMonthSelect.innerHTML = "";

  if (!months.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Nenhum mes disponivel";
    summaryMonthSelect.appendChild(option);
    summaryMonthSelect.disabled = true;
    return;
  }

  summaryMonthSelect.disabled = false;
  months.forEach((monthKey) => {
    const option = document.createElement("option");
    option.value = monthKey;
    option.textContent = formatMonthLabel(monthKey);
    summaryMonthSelect.appendChild(option);
  });

  const currentMonthKey = getLocalDateString().slice(0, 7);
  summaryMonthSelect.value = months.includes(currentMonthKey) ? currentMonthKey : months[0];
}

function renderMonthlySummary() {
  if (!monthlySummaryList || !summaryMonthInfo || !summaryMonthSelect) {
    return;
  }

  monthlySummaryList.innerHTML = "";
  const selectedMonth = summaryMonthSelect.value;

  if (!selectedMonth) {
    summaryMonthInfo.textContent = "Nenhum mes disponivel.";
    return;
  }

  const records = monthlySummaryRecords
    .filter((record) => getSummaryMonthKey(record) === selectedMonth)
    .sort((left, right) => {
      const byDebtor = String(left.devedor || "").localeCompare(String(right.devedor || ""));
      if (byDebtor !== 0) {
        return byDebtor;
      }
      return String(left.credor || "").localeCompare(String(right.credor || ""));
    });

  summaryMonthInfo.textContent = `${formatMonthLabel(selectedMonth)} - ${records.length} relacao(oes) de pagamento.`;

  if (!records.length) {
    monthlySummaryList.innerHTML =
      '<article class="monthly-record-item"><p>Nenhum resumo encontrado neste mes.</p></article>';
    return;
  }

  records.forEach((record) => {
    const article = document.createElement("article");
    const debtorColor = getDebtorColor(record.devedor || "");
    article.className = "monthly-record-item monthly-summary-item";
    article.innerHTML = `
      <div class="monthly-summary-head">
        <span class="debtor-chip" style="--debtor-color: ${debtorColor}">${record.devedor || "-"}</span>
        <strong>${record.credor || "-"}</strong>
      </div>
      <div class="monthly-record-grid">
        <span><b>Devedor:</b> ${record.devedor || "-"}</span>
        <span><b>Credor:</b> ${record.credor || "-"}</span>
        <span><b>Data(s) do(s) evento(s):</b> ${record.datas || "-"}</span>
        <span><b>Total devido:</b> ${record.total || "-"}</span>
      </div>
    `;
    monthlySummaryList.appendChild(article);
  });
}

function getSelectedSummaryRecords() {
  const selectedMonth = summaryMonthSelect?.value || "";
  if (!selectedMonth) {
    return [];
  }

  return monthlySummaryRecords
    .filter((record) => getSummaryMonthKey(record) === selectedMonth)
    .sort((left, right) => {
      const byDebtor = String(left.devedor || "").localeCompare(String(right.devedor || ""));
      if (byDebtor !== 0) {
        return byDebtor;
      }
      return String(left.credor || "").localeCompare(String(right.credor || ""));
    });
}

function downloadFile(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function normalizePdfText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7E]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapePdfText(value) {
  return normalizePdfText(value)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/\r?\n/g, " ");
}

function wrapPdfText(value, maxLength) {
  const text = normalizePdfText(value || "-");
  if (!text) {
    return ["-"];
  }

  if (text.length <= maxLength) {
    return [text];
  }

  const words = text.split(" ");
  const lines = [];
  let current = "";

  words.forEach((word) => {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxLength && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  });

  if (current) {
    lines.push(current);
  }

  return lines;
}

function createStyledSummaryPdfBlob(monthKey, records) {
  const pageWidth = 595;
  const pageHeight = 842;
  const marginX = 32;
  const topY = 810;
  const bottomY = 46;
  const rowPaddingY = 9;
  const lineHeight = 12;
  const usableWidth = pageWidth - marginX * 2;
  const tableTopGap = 18;
  const columns = [
    { label: "DEVEDOR", key: "devedor", width: 138, maxLength: 22 },
    { label: "CREDOR", key: "credor", width: 138, maxLength: 22 },
    { label: "DATA(S) DO EVENTO", key: "datas", width: 180, maxLength: 34 },
    { label: "TOTAL DEVIDO", key: "total", width: usableWidth - 138 - 138 - 180, maxLength: 13 },
  ];

  function addRect(commands, x, y, width, height, fillColor, strokeColor, lineWidth = 1) {
    if (fillColor) {
      commands.push(`${fillColor.join(" ")} rg`);
    }
    if (strokeColor) {
      commands.push(`${strokeColor.join(" ")} RG`);
      commands.push(`${lineWidth} w`);
    }
    commands.push(`${x} ${y} ${width} ${height} re ${fillColor && strokeColor ? "B" : fillColor ? "f" : "S"}`);
  }

  function addText(commands, text, x, y, size, color, fontAlias) {
    commands.push("BT");
    commands.push(`/${fontAlias} ${size} Tf`);
    commands.push(`${color.join(" ")} rg`);
    commands.push(`1 0 0 1 ${x} ${y} Tm (${escapePdfText(text)}) Tj`);
    commands.push("ET");
  }

  function drawPageFrame(commands, pageNumber) {
    addRect(commands, marginX, 756, usableWidth, 54, [0.05, 0.48, 0.42], null);
    addText(commands, "EVENTOS DE ESCALA", marginX + 18, 787, 20, [1, 1, 1], "F2");
    addText(commands, `Resumo mensal de ${normalizePdfText(formatMonthLabel(monthKey))}`, marginX + 18, 768, 11, [0.92, 0.98, 0.97], "F1");

    addRect(commands, marginX, 724, usableWidth, 22, [0.95, 0.97, 0.95], [0.82, 0.86, 0.84], 0.8);
    addText(commands, `${records.length} relacao(oes) de pagamento`, marginX + 14, 731, 10, [0.08, 0.25, 0.22], "F2");
    addText(commands, `Pagina ${pageNumber}`, pageWidth - marginX - 52, 731, 10, [0.36, 0.42, 0.48], "F1");

    let cursorX = marginX;
    addRect(commands, marginX, 690, usableWidth, 24, [0.84, 0.91, 0.88], [0.72, 0.8, 0.77], 0.8);
    columns.forEach((column, index) => {
      if (index > 0) {
        commands.push(`0.72 0.8 0.77 RG`);
        commands.push(`0.8 w`);
        commands.push(`${cursorX} 690 m ${cursorX} 714 l S`);
      }
      addText(commands, column.label, cursorX + 8, 698, 9, [0.08, 0.25, 0.22], "F2");
      cursorX += column.width;
    });
  }

  const pages = [];
  let pageRows = [];
  let currentY = 684;

  records.forEach((record, index) => {
    const rowCells = columns.map((column) => wrapPdfText(record[column.key], column.maxLength));
    const maxLines = Math.max(...rowCells.map((lines) => lines.length));
    const rowHeight = rowPaddingY * 2 + maxLines * lineHeight;

    if (currentY - rowHeight < bottomY) {
      pages.push(pageRows);
      pageRows = [];
      currentY = 684;
    }

    pageRows.push({
      index,
      y: currentY,
      height: rowHeight,
      cells: rowCells,
    });
    currentY -= rowHeight;
  });

  if (pageRows.length || !pages.length) {
    pages.push(pageRows);
  }

  const objects = [];
  const catalogId = 1;
  const pagesId = 2;
  const fontRegularId = 3;
  const fontBoldId = 4;

  objects[catalogId] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
  objects[fontRegularId] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
  objects[fontBoldId] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>";

  const pageObjectIds = [];

  pages.forEach((rows, pageIndex) => {
    const commands = [];
    drawPageFrame(commands, pageIndex + 1);

    rows.forEach((row) => {
      const rowBottom = row.y - row.height;
      const fillColor = row.index % 2 === 0 ? [0.985, 0.985, 0.98] : [0.955, 0.965, 0.972];
      addRect(commands, marginX, rowBottom, usableWidth, row.height, fillColor, [0.86, 0.88, 0.9], 0.8);

      let cellX = marginX;
      columns.forEach((column, columnIndex) => {
        if (columnIndex > 0) {
          commands.push(`0.86 0.88 0.9 RG`);
          commands.push("0.8 w");
          commands.push(`${cellX} ${rowBottom} m ${cellX} ${row.y} l S`);
        }

        row.cells[columnIndex].forEach((line, lineIndex) => {
          addText(
            commands,
            line,
            cellX + 8,
            row.y - rowPaddingY - 10 - lineIndex * lineHeight,
            9.4,
            [0.12, 0.16, 0.22],
            column.key === "total" ? "F2" : "F1",
          );
        });

        cellX += column.width;
      });
    });

    const stream = commands.join("\n");
    const contentId = objects.length;
    objects[contentId] = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`;
    const pageId = objects.length + 1;
    objects[pageId] =
      `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] ` +
      `/Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${contentId} 0 R >>`;
    pageObjectIds.push(pageId);
  });

  objects[pagesId] = `<< /Type /Pages /Count ${pageObjectIds.length} /Kids [${pageObjectIds
    .map((id) => `${id} 0 R`)
    .join(" ")}] >>`;

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  for (let index = 1; index < objects.length; index += 1) {
    offsets[index] = pdf.length;
    pdf += `${index} 0 obj\n${objects[index]}\nendobj\n`;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length}\n`;
  pdf += "0000000000 65535 f \n";

  for (let index = 1; index < objects.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return new Blob([pdf], { type: "application/pdf" });
}

async function buildSummaryPdfFile(monthKey) {
  const records = getSelectedSummaryRecords();
  if (!records.length) {
    throw new Error("EMPTY_SUMMARY");
  }

  const blob = createStyledSummaryPdfBlob(monthKey, records);
  const fileName = `resumo-mensal-${monthKey}.pdf`;
  return new File([blob], fileName, { type: "application/pdf" });
}

async function shareMonthlySummaryFile() {
  const selectedMonth = summaryMonthSelect?.value || "";
  const records = getSelectedSummaryRecords();

  if (!selectedMonth || !records.length) {
    showToast("Nao ha resumo mensal para enviar neste mes.");
    return;
  }

  const file = await buildSummaryPdfFile(selectedMonth);

  if (navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
    try {
      await navigator.share({
        title: `Resumo mensal ${formatMonthLabel(selectedMonth)}`,
        text: `Segue o PDF do resumo mensal de ${formatMonthLabel(selectedMonth)} para envio no WhatsApp.`,
        files: [file],
      });
      showToast("PDF pronto para envio no WhatsApp.");
      return;
    } catch {
      showToast("Envio cancelado. O PDF sera baixado no aparelho.");
    }
  }

  downloadFile(file, file.name);
  window.open("https://wa.me/?text=Segue%20o%20resumo%20mensal%20em%20PDF.", "_blank", "noopener");
  showToast("PDF gerado. Selecione o arquivo baixado no WhatsApp.");
}

function updateSummaryToggleState() {
  if (!summaryToggleButton || !summarySection) {
    return;
  }

  summarySection.classList.toggle("hidden", !summaryOpen);
  summaryToggleButton.textContent = summaryOpen ? "Ocultar resumo mensal" : "Abrir resumo mensal";
}

function toggleSummarySection() {
  summaryOpen = !summaryOpen;
  updateSummaryToggleState();

  if (summaryOpen) {
    summarySection?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function updateAnnotationsToggleState() {
  if (!annotationsButton || !annotationsSection) {
    return;
  }

  annotationsSection.classList.toggle("hidden", !annotationsOpen);
  annotationsButton.textContent = "Abrir anotacoes do dia";
  annotationsButton.classList.toggle("hidden", annotationsOpen);
}

function toggleAnnotationsSection() {
  annotationsOpen = !annotationsOpen;
  updateAnnotationsToggleState();

  if (annotationsOpen) {
    annotationsSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function populateNotesMonthOptions(records) {
  if (!notesMonthSelect) {
    return;
  }

  const months = Array.from(new Set(records.map((record) => getNotesMonthKey(record)).filter(Boolean))).sort(
    (left, right) => right.localeCompare(left),
  );

  notesMonthSelect.innerHTML = "";

  if (!months.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Nenhum mes disponivel";
    notesMonthSelect.appendChild(option);
    notesMonthSelect.disabled = true;
    return;
  }

  notesMonthSelect.disabled = false;
  months.forEach((monthKey) => {
    const option = document.createElement("option");
    option.value = monthKey;
    option.textContent = formatMonthLabel(monthKey);
    notesMonthSelect.appendChild(option);
  });

  const currentMonthKey = getLocalDateString().slice(0, 7);
  notesMonthSelect.value = months.includes(currentMonthKey) ? currentMonthKey : months[0];
}

function renderNotesReminders() {
  if (!notesRemindersList || !notesMonthInfo || !notesMonthSelect) {
    return;
  }

  notesRemindersList.innerHTML = "";
  const selectedMonth = notesMonthSelect.value;
  const selectedDate = notesDateFilter?.value || "";

  if (!selectedMonth) {
    notesMonthInfo.textContent = "Nenhum mes disponivel.";
    return;
  }

  const records = monthlyNotesRecords
    .filter((record) => getNotesMonthKey(record) === selectedMonth)
    .filter((record) => !selectedDate || String(record.data || "") === selectedDate)
    .sort((left, right) => String(right.data || "").localeCompare(String(left.data || "")));

  notesMonthInfo.textContent = `${formatMonthLabel(selectedMonth)} - ${records.length} anotacao(oes).`;

  if (!records.length) {
    notesRemindersList.innerHTML =
      '<article class="monthly-record-item"><p>Nenhuma anotacao encontrada neste mes.</p></article>';
    return;
  }

  records.forEach((record) => {
    const article = document.createElement("article");
    article.className = "monthly-record-item";
    article.innerHTML = `
      <strong>Data: ${record.data || "-"}</strong>
      <p>${record.texto || "-"}</p>
    `;
    notesRemindersList.appendChild(article);
  });
}

function updateNotesRemindersToggleState() {
  if (!notesRemindersButton || !notesRemindersSection) {
    return;
  }

  notesRemindersSection.classList.toggle("hidden", !notesRemindersOpen);
  notesRemindersButton.textContent = "Lembretes das anotacoes";
  notesRemindersButton.classList.toggle("hidden", notesRemindersOpen);
}

function toggleNotesRemindersSection() {
  notesRemindersOpen = !notesRemindersOpen;
  updateNotesRemindersToggleState();

  if (notesRemindersOpen) {
    notesRemindersSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function applyRemoteEventoOptions(options) {
  if (!Array.isArray(options) || !options.length) {
    return;
  }

  currentEventoOptions = options.filter(Boolean);
  fillSelect(eventoSelect, currentEventoOptions, "Selecione");
}

function applyRemotePersonOptions(ausenteOptions, presenteOptions) {
  if (Array.isArray(ausenteOptions) && ausenteOptions.length) {
    currentAusenteOptions = ausenteOptions.filter(Boolean);
    fillSelect(ausenteSelect, currentAusenteOptions, "Selecione");
  }

  if (Array.isArray(presenteOptions) && presenteOptions.length) {
    currentPresenteOptions = presenteOptions.filter(Boolean);
    fillSelect(presenteSelect, currentPresenteOptions, "Selecione");
    syncHighlightedSelect(presenteSelect);
  }
}

function updateReviewAlert() {
  submitButton?.classList.toggle("is-reviewing", Boolean(devedorSelect.value));
}

function maybeNotifyReviewAlert() {
  if (!devedorSelect.value) {
    lastReviewNoticeKey = "";
    submitButton?.classList.remove("is-reviewing");
    return;
  }

  const noticeKey = `${eventoSelect.value}|${ausenteSelect.value}|${presenteSelect.value}|${devedorSelect.value}`;
  if (noticeKey === lastReviewNoticeKey) {
    return;
  }

  lastReviewNoticeKey = noticeKey;
  showToast("Confira os dados antes do envio!");
}

function fieldCountsAsComplete(field) {
  const control = field.querySelector("input, select, textarea");
  if (!control) {
    return true;
  }

  if (field.classList.contains("hidden") || control.disabled) {
    return true;
  }

  if (control.required) {
    return typeof control.checkValidity === "function" ? control.checkValidity() : Boolean(control.value);
  }

  return Boolean(control.value);
}

function updateFieldHaloState() {
  getManagedFields().forEach((field) => {
    const isComplete = fieldCountsAsComplete(field);
    field.classList.toggle("is-pending", !isComplete);
    field.classList.toggle("is-complete", isComplete);
  });
}

function updateSettlementPreview() {
  const { pagador, credor } = getSettlementState();
  credorResultado.value = credor || "-";
  credorField?.classList.toggle("is-complete", Boolean(credor));
  credorField?.classList.toggle("is-pending", !credor);

  if (pagador) {
    setSingleSelectValue(devedorSelect, pagador, "Calculando");
  } else if (devedorSelect.disabled) {
    setSingleSelectValue(devedorSelect, "", "Selecione");
  }

  updateFieldHaloState();
}

function configurePagadorField(rule) {
  if (rule.pagadorMode === "manual") {
    fillSelect(devedorSelect, [TEAM_BOX, ...currentAusenteOptions], "Selecione");
    devedorSelect.disabled = false;
    devedorField.classList.remove("is-disabled");
    return;
  }

  devedorSelect.disabled = true;
  devedorField.classList.add("is-disabled");
}

function updateEventoState() {
  const evento = eventoSelect.value;
  const rule = getRuleForEvent(evento);
  const isOutro = isOutrosEvent(evento);
  const isAtraso = isAtrasoEvent(evento);

  eventoOutroField.classList.toggle("hidden", !isOutro);
  eventoOutroInput.required = isOutro;
  if (!isOutro) {
    eventoOutroInput.value = "";
  }

  atrasoTempoField.classList.toggle("hidden", !isAtraso);
  atrasoTempoSelect.required = isAtraso;
  if (!isAtraso) {
    atrasoTempoSelect.value = "";
  }

  ausenteSelect.disabled = rule.disableAusente;
  ausenteSelect.required = !rule.disableAusente;
  ausenteField.classList.toggle("is-disabled", rule.disableAusente);
  if (rule.disableAusente) {
    ausenteSelect.value = "";
  }

  presenteSelect.disabled = rule.disableSubstituto;
  presenteSelect.required = !rule.disableSubstituto;
  presenteField.classList.toggle("is-disabled", rule.disableSubstituto);
  if (rule.disableSubstituto) {
    presenteSelect.value = "";
  }

  turnoSelect.disabled = rule.disableTurno;
  turnoSelect.required = !rule.disableTurno;
  turnoField.classList.toggle("is-disabled", rule.disableTurno);
  if (rule.disableTurno) {
    turnoSelect.value = "";
  }

  configurePagadorField(rule);
  updateSettlementPreview();
  updateReviewAlert();
  maybeNotifyReviewAlert();
  syncHighlightedSelect(presenteSelect);
  updateFieldHaloState();
}

function getLocalDateString(date = new Date()) {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
}

function formatShortDate(dateKey) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(`${dateKey}T12:00:00`));
}

function formatLongDate(dateKey) {
  const value = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${dateKey}T12:00:00`));

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function normalizeSheetDate(value) {
  const match = String(value || "").trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) {
    return null;
  }

  const [, day, month, year] = match;
  return `${year}-${month}-${day}`;
}

function parseCsvRows(csvText) {
  const rows = [];
  let row = [];
  let cell = "";
  let insideQuotes = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const char = csvText[index];
    const nextChar = csvText[index + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        cell += '"';
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
      continue;
    }

    if (char === "," && !insideQuotes) {
      row.push(cell.trim());
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && nextChar === "\n") {
        index += 1;
      }

      row.push(cell.trim());
      if (row.some((value) => value !== "")) {
        rows.push(row);
      }
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  if (cell.length || row.length) {
    row.push(cell.trim());
    if (row.some((value) => value !== "")) {
      rows.push(row);
    }
  }

  return rows;
}

async function fetchScheduleSheetRows(sheetTitle) {
  const url = new URL(`https://docs.google.com/spreadsheets/d/${SCHEDULE_SPREADSHEET_ID}/gviz/tq`);
  url.searchParams.set("tqx", "out:csv");
  url.searchParams.set("sheet", sheetTitle);
  url.searchParams.set("range", "A3:R400");

  const response = await fetch(url.toString(), {
    method: "GET",
    mode: "cors",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Falha ao carregar a aba ${sheetTitle}.`);
  }

  const csvText = await response.text();
  return parseCsvRows(csvText).filter((row) => row.some((cell) => String(cell || "").trim()));
}

async function fetchScheduleHighlights() {
  const url = new URL(`https://docs.google.com/spreadsheets/d/${SCHEDULE_SPREADSHEET_ID}/gviz/tq`);
  url.searchParams.set("tqx", "out:csv");
  url.searchParams.set("sheet", "DESTAQUES APP");
  url.searchParams.set("range", "A2:F800");

  const response = await fetch(url.toString(), {
    method: "GET",
    mode: "cors",
    cache: "no-store",
  });

  if (!response.ok) {
    return new Map();
  }

  const rows = parseCsvRows(await response.text());
  const highlights = new Map();

  rows.forEach((row) => {
    const dateKey = String(row[0] || "").trim();
    const sigla = normalizeToken(row[1] || "");
    const isMarked = normalizeText(row[2]) !== "false";

    if (!dateKey || !sigla || !isMarked) {
      return;
    }

    if (!highlights.has(dateKey)) {
      highlights.set(dateKey, new Set());
    }

    highlights.get(dateKey).add(sigla);
  });

  return highlights;
}

async function fetchVacationSheetRows() {
  const url = new URL(`https://docs.google.com/spreadsheets/d/${SCHEDULE_SPREADSHEET_ID}/gviz/tq`);
  url.searchParams.set("tqx", "out:csv");
  url.searchParams.set("sheet", SCHEDULE_VACATION_SHEET_TITLE);
  url.searchParams.set("range", "A3:F80");

  const response = await fetch(url.toString(), {
    method: "GET",
    mode: "cors",
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  const csvText = await response.text();
  return parseCsvRows(csvText).filter((row) => {
    const month = String(row[0] || "").trim();
    const start = String(row[2] || "").trim();
    const end = String(row[3] || "").trim();
    const label = String(row[4] || "").trim();
    return Boolean(month && start && end && label);
  });
}

function buildVacationLookup(rows) {
  const lookup = new Map();

  rows.forEach((row) => {
    const start = normalizeSheetDate(row[2]);
    const end = normalizeSheetDate(row[3]);
    const label = String(row[4] || "").trim();

    if (!start || !end || !label) {
      return;
    }

    const startDate = new Date(`${start}T12:00:00`);
    const endDate = new Date(`${end}T12:00:00`);

    for (let cursor = new Date(startDate); cursor <= endDate; cursor.setDate(cursor.getDate() + 1)) {
      const dateKey = getLocalDateString(cursor);
      if (!lookup.has(dateKey)) {
        lookup.set(dateKey, []);
      }

      lookup.get(dateKey).push(label);
    }
  });

  return lookup;
}

function extractVacationSiglas(label) {
  return String(label || "")
    .split("(")[0]
    .match(/\b(?:[A-Z]{2}|L2)\b/g)?.map((value) => value.trim().toUpperCase()) || [];
}

function getVacationOrderForDate(dateKey) {
  const labels = scheduleDaysByDate.get(dateKey)?.vacationLabel || scheduleVacationsByDate.get(dateKey) || [];
  const labelList = Array.isArray(labels) ? labels : [labels];
  const orderedSiglas = extractVacationSiglas(labelList.join(" "));
  const uniqueSiglas = [];

  orderedSiglas.forEach((sigla) => {
    if (!uniqueSiglas.includes(sigla)) {
      uniqueSiglas.push(sigla);
    }
  });

  return uniqueSiglas;
}

function getVacationPosition(sigla, vacationOrder, showVacationPositions) {
  if (!showVacationPositions || !Array.isArray(vacationOrder) || vacationOrder.length < 2) {
    return 0;
  }

  const index = vacationOrder.indexOf(normalizeToken(sigla));
  return index === -1 ? 0 : index + 1;
}

function appendVacationTokenDisplay(token, sigla, vacationOrder, showVacationPositions) {
  const parts = String(sigla || "").toUpperCase().split(/([/-])/);
  const isCombinedSigla = parts.some((part) => part === "/" || part === "-");

  parts.forEach((part) => {
    if (!/^(?:[A-Z]{2}|L2)$/.test(part)) {
      token.appendChild(document.createTextNode(part));
      return;
    }

    const partWrap = document.createElement("span");
    partWrap.className = "sigla-token__part";

    const vacationPart = document.createElement("span");
    vacationPart.className = isCombinedSigla ? "sigla-token__vacation-part" : "sigla-token__vacation-label";
    vacationPart.textContent = part;

    const position = getVacationPosition(part, vacationOrder, showVacationPositions);
    if (position) {
      const wrap = document.createElement("span");
      wrap.className = "sigla-token__vacation-wrap";
      wrap.appendChild(vacationPart);

      const marker = document.createElement("span");
      marker.className = "sigla-token__position";
      marker.textContent = String(position);
      marker.setAttribute("aria-hidden", "true");
      wrap.appendChild(marker);
      partWrap.appendChild(wrap);
    } else {
      partWrap.appendChild(vacationPart);
    }

    token.appendChild(partWrap);
  });
}

async function loadScheduleData() {
  const days = [];
  const [vacationRows, rowsBySheet] = await Promise.all([
    fetchVacationSheetRows(),
    Promise.all(
      SCHEDULE_SHEET_SOURCES.map(async ([sheetTitle, weekdayLabel]) => ({
        weekdayLabel,
        rows: await fetchScheduleSheetRows(sheetTitle),
      })),
    ),
  ]);
  const vacationsByDate = buildVacationLookup(vacationRows);

  rowsBySheet.forEach(({ weekdayLabel, rows }) => {
    rows.forEach((row) => {
      const dateKey = normalizeSheetDate(row[0]);
      if (!dateKey) {
        return;
      }

      const siglas = row
        .slice(1)
        .map((value) => String(value || "").trim())
        .filter(Boolean);

      if (!siglas.length) {
        return;
      }

      days.push({
        date: dateKey,
        weekdayLabel,
        siglas,
        vacationLabel: vacationsByDate.get(dateKey) || null,
      });
    });
  });

  days.sort((left, right) => left.date.localeCompare(right.date));
  orderedScheduleDates = days.map((item) => item.date);
  scheduleDaysByDate = new Map(days.map((item) => [item.date, item]));
  scheduleHighlightsByDate = await fetchScheduleHighlights();
  scheduleVacationsByDate = vacationsByDate;

  if (rangeLabel && orderedScheduleDates.length) {
    rangeLabel.textContent = `${formatShortDate(orderedScheduleDates[0])} - ${formatShortDate(
      orderedScheduleDates[orderedScheduleDates.length - 1],
    )}`;
  }

  if (scheduleDateInput && !scheduleDateInput.value) {
    scheduleDateInput.value = getLocalDateString();
  if (registeredDateFilter) registeredDateFilter.value = getLocalDateString();
  }

  renderScheduleByDate(scheduleDateInput?.value || getLocalDateString());
}

function isHighlightedToken(token, highlights) {
  const normalizedToken = normalizeToken(token);
  if (highlights.has(normalizedToken)) {
    return true;
  }

  return normalizedToken.split("/").some((part) => highlights.has(part));
}

function isVacationToken(token, vacationSiglas) {
  if (!vacationSiglas || vacationSiglas.size === 0) {
    return false;
  }

  return normalizeToken(token)
    .split(/[/-]/)
    .some((part) => vacationSiglas.has(part));
}

function renderScheduleByDate(dateKey) {
  if (!scheduleSiglasGrid || !formattedScheduleDate || !scheduleHeading || !weekdayBadge || !todayBadge) {
    return;
  }

  const day = scheduleDaysByDate.get(dateKey);
  const isToday = dateKey === getLocalDateString();

  scheduleDateInput.value = dateKey;
  scheduleSiglasGrid.innerHTML = "";
  todayBadge.classList.toggle("hidden", !isToday);

  if (!day) {
    scheduleHeading.textContent = isToday ? "Data atual" : "Dia selecionado";
    formattedScheduleDate.textContent = dateKey ? formatLongDate(dateKey) : "-";
    weekdayBadge.textContent = "";
    scheduleEmptyState?.classList.remove("hidden");
    scheduleSiglasGrid.innerHTML = "";
    outOfRangeNotice?.classList.toggle("hidden", !orderedScheduleDates.length || orderedScheduleDates.includes(dateKey));
    return;
  }

  scheduleHeading.textContent = isToday ? "Data atual" : "Dia selecionado";
  formattedScheduleDate.textContent = formatLongDate(day.date);
  weekdayBadge.textContent = day.weekdayLabel;
  scheduleEmptyState?.classList.add("hidden");
  outOfRangeNotice?.classList.add("hidden");

  const highlights = scheduleHighlightsByDate.get(day.date) || new Set();
  const vacationOrder = getVacationOrderForDate(day.date);
  const vacationSiglas = new Set(vacationOrder);
  const showVacationPositions = vacationSiglas.size > 1;

  day.siglas.forEach((token, index) => {
    const item = document.createElement("div");
    item.className = "sigla-item";
    const highlighted = isHighlightedToken(token, highlights);
    const isVacation = isVacationToken(token, vacationSiglas);
    const tokenClass = isVacation
      ? "sigla-token sigla-button sigla-token--vacation"
      : highlighted
        ? "sigla-token sigla-button sigla-token--checked sigla-token--highlight"
        : "sigla-token sigla-button";

    const tokenNode = document.createElement("button");
    tokenNode.type = "button";
    tokenNode.className = tokenClass;
    tokenNode.addEventListener("click", () => openEventForSigla(token, day.date, isVacation));

    if (isVacation) {
      appendVacationTokenDisplay(tokenNode, token, vacationOrder, showVacationPositions);
    } else {
      tokenNode.textContent = token;
    }

    const counter = document.createElement("span");
    counter.className = "sigla-index";
    counter.textContent = String(index + 1);

    item.appendChild(tokenNode);
    item.appendChild(counter);
    scheduleSiglasGrid.appendChild(item);
  });
}

function repairVisibleText_() {
  const replacements = {
    "Ã§": "ç", "Ã£": "ã", "Ã¡": "á", "Ã©": "é", "Ãª": "ê",
    "Ã­": "í", "Ã³": "ó", "Ã´": "ô", "Ãµ": "õ", "Ãº": "ú",
    "Ã§Ã£": "ção", "Ãšltimo": "Último", "LanÃ§amento": "Lançamento",
    "DescriÃ§Ã£o": "Descrição", "MÃºltiplo": "Múltiplo",
    "anotaÃ§Ãµes": "anotações", "registros sincronizado": "registros sincronizados"
  };
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    let value = node.nodeValue;
    Object.entries(replacements).forEach(([from, to]) => { value = value.split(from).join(to); });
    node.nodeValue = value;
  });
}

function resolveMemberOption(sigla) {
  const key = normalizeToken(sigla);
  return currentAusenteOptions.find((option) => {
    const optionKey = normalizeToken(option);
    return optionKey === key || optionKey.startsWith(key + " -") || optionKey.startsWith(key + " ");
  }) || sigla;
}

function getClickedMemberChoices(token, isVacation) {
  const rawParts = String(token || "").split(/[\\/|-]/).map((value) => value.trim()).filter(Boolean);
  const hasDcGroup = rawParts.some((value) => normalizeToken(value) === "dc");
  const choices = hasDcGroup ? ["AD", "CR", "LH", "LA"] : rawParts;
  return isVacation || choices.length > 1 ? choices : [choices[0] || token];
}

function showMemberChoiceDialog(choices, onChoose) {
  const old = document.getElementById("memberChoiceDialog");
  old?.remove();
  const overlay = document.createElement("div");
  overlay.id = "memberChoiceDialog";
  overlay.className = "member-choice-dialog";
  overlay.innerHTML = '<div class="member-choice-panel"><h2>Escolha o membro</h2><p>Selecione diretamente a sigla que será registrada.</p><div class="member-choice-list"></div><button type="button" class="secondary-button member-choice-cancel">Cancelar</button></div>';
  const list = overlay.querySelector(".member-choice-list");
  choices.forEach((sigla) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "member-choice-button";
    button.textContent = sigla + " — " + resolveMemberOption(sigla).replace(new RegExp("^" + sigla + "\\s*-\\s*", "i"), "");
    button.addEventListener("click", () => { overlay.remove(); onChoose(resolveMemberOption(sigla)); });
    list.appendChild(button);
  });
  overlay.querySelector(".member-choice-cancel").addEventListener("click", () => overlay.remove());
  document.body.appendChild(overlay);
}

function openEventForSigla(token, dateKey, isVacation) {
  const choices = getClickedMemberChoices(token, isVacation);
  const openForm = (selected) => {
    eventEntryCard?.classList.remove("hidden");
    dataInput.value = dateKey;
    ausenteSelect.value = selected || "";
    eventEntryCard?.scrollIntoView({ behavior: "smooth", block: "start" });
    updateEventoState();
    updateFieldHaloState();
  };
  if (choices.length > 1) {
    showMemberChoiceDialog(choices, openForm);
    return;
  }
  openForm(resolveMemberOption(choices[0]));
}

function clampScheduleDate(dateKey) {
  if (!orderedScheduleDates.length) {
    return dateKey;
  }

  if (dateKey < orderedScheduleDates[0]) {
    return orderedScheduleDates[0];
  }

  if (dateKey > orderedScheduleDates[orderedScheduleDates.length - 1]) {
    return orderedScheduleDates[orderedScheduleDates.length - 1];
  }

  return dateKey;
}

function shiftScheduleDate(delta) {
  const current = scheduleDateInput?.value || getLocalDateString();
  const date = new Date(`${current}T12:00:00`);
  date.setDate(date.getDate() + delta);
  renderScheduleByDate(clampScheduleDate(getLocalDateString(date)));
}

function computeSettlementFromValues({ evento, ausente, presente, turno, atrasoTempo, manualPagador }) {
  const rule = getRuleForEvent(evento);
  const pagador =
    rule.pagadorMode === "absent" ? ausente || "" : rule.pagadorMode === "team" ? TEAM_BOX : manualPagador || "";
  const credor = rule.credorMode === "team" ? TEAM_BOX : rule.credorMode === "substitute" ? presente || "" : "";
  const valorPagar = rule.amountMode === "atraso" ? Number(atrasoTempo || 0) * ATRASO_RATE || "" : getValorPorTurno(turno);

  return { rule, pagador, credor, valorPagar };
}

function getEditSettlementState() {
  return computeSettlementFromValues({
    evento: editEventoSelect.value,
    ausente: editAusenteSelect.value,
    presente: editPresenteSelect.value,
    turno: editTurnoSelect.value,
    atrasoTempo: editAtrasoTempoSelect.value,
    manualPagador: editDevedorInput.value,
  });
}

function updateEditEventoState() {
  if (!editRecordForm) {
    return;
  }

  const rule = getRuleForEvent(editEventoSelect.value);
  const isOutro = isOutrosEvent(editEventoSelect.value);
  const isAtraso = isAtrasoEvent(editEventoSelect.value);
  const editEventoDescricaoField = editEventoDescricaoInput.closest(".field");
  const editAtrasoTempoField = editAtrasoTempoSelect.closest(".field");
  const editPresenteField = editPresenteSelect.closest(".field");
  const editTurnoField = editTurnoSelect.closest(".field");
  const editAusenteField = editAusenteSelect.closest(".field");

  editEventoDescricaoField?.classList.toggle("hidden", !isOutro);
  editEventoDescricaoInput.required = isOutro;
  if (!isOutro) {
    editEventoDescricaoInput.value = "";
  }

  editAtrasoTempoField?.classList.toggle("hidden", !isAtraso);
  editAtrasoTempoSelect.required = isAtraso;
  if (!isAtraso) {
    editAtrasoTempoSelect.value = "";
  }

  editAusenteSelect.disabled = rule.disableAusente;
  editAusenteSelect.required = !rule.disableAusente;
  editAusenteField?.classList.toggle("is-disabled", rule.disableAusente);
  if (rule.disableAusente) {
    editAusenteSelect.value = "";
  }

  editPresenteSelect.disabled = rule.disableSubstituto;
  editPresenteField?.classList.toggle("is-disabled", rule.disableSubstituto);
  if (rule.disableSubstituto) {
    editPresenteSelect.value = "";
  }

  editTurnoSelect.disabled = rule.disableTurno;
  editTurnoField?.classList.toggle("is-disabled", rule.disableTurno);
  if (rule.disableTurno) {
    editTurnoSelect.value = "";
  }

  editDevedorInput.readOnly = rule.pagadorMode !== "manual";
  editCredorInput.readOnly = true;

  const { pagador, credor } = getEditSettlementState();
  editDevedorInput.value = pagador || "";
  editCredorInput.value = credor || "";
}

function openEditModal(record = latestSyncedRecord) {
  latestSyncedRecord = record || latestSyncedRecord;
  if (!latestSyncedRecord?.sourceRow || !editRecordModal) {
    showToast("Nao ha registro sincronizado pronto para edicao.");
    return;
  }

  fillSelect(editEventoSelect, currentEventoOptions, "Selecione");
  fillSelect(editAtrasoTempoSelect, TEMPO_ATRASO_OPTIONS, "Selecione");
  fillSelect(editAusenteSelect, currentAusenteOptions, "Selecione");
  fillSelect(editPresenteSelect, currentPresenteOptions, "Selecione");
  fillSelect(editTurnoSelect, TURNO_OPTIONS, "Selecione");

  editSourceRow.value = String(latestSyncedRecord.sourceRow || "");
  editDataInput.value = latestSyncedRecord.data || "";
  editEventoSelect.value = latestSyncedRecord.evento || "";
  editEventoDescricaoInput.value = latestSyncedRecord.eventoDescricao || "";
  if (latestSyncedRecord.atrasoTempo) {
    editAtrasoTempoSelect.value = String(latestSyncedRecord.atrasoTempo);
  }
  editAusenteSelect.value = latestSyncedRecord.ausente || "";
  editPresenteSelect.value = latestSyncedRecord.presente || "";
  editTurnoSelect.value = latestSyncedRecord.turno || "";
  editDevedorInput.value = latestSyncedRecord.devedor || "";
  editCredorInput.value = latestSyncedRecord.credor || "";
  if (editObservacoesInput) editObservacoesInput.value = latestSyncedRecord.observacoes || "";

  updateEditEventoState();
  editRecordModal.classList.remove("hidden");
  editRecordModal.setAttribute("aria-hidden", "false");
}

function closeEditModal() {
  if (!editRecordModal) {
    return;
  }

  editRecordModal.classList.add("hidden");
  editRecordModal.setAttribute("aria-hidden", "true");
}

function buildEditPayload() {
  const { pagador, credor, valorPagar } = getEditSettlementState();
  const evento = editEventoSelect.value;

  return {
    kind: "updateRecord",
    sourceRow: Number(editSourceRow.value || 0),
    data: editDataInput.value,
    dataDoEvento: editDataInput.value,
    evento,
    tipoDeEvento: evento,
    eventoDescricao: isOutrosEvent(evento) ? editEventoDescricaoInput.value.trim() : "",
    descricaoDoEvento: isOutrosEvent(evento) ? editEventoDescricaoInput.value.trim() : "",
    atrasoTempo: isAtrasoEvent(evento) ? Number(editAtrasoTempoSelect.value || 0) : "",
    multiploDoAtraso: isAtrasoEvent(evento) ? Number(editAtrasoTempoSelect.value || 0) : "",
    ausente: editAusenteSelect.value,
    membroAusenteAtrasado: editAusenteSelect.value,
    presente: ruleRequiresSubstituto(evento) ? editPresenteSelect.value : "",
    membroSubstituto: ruleRequiresSubstituto(evento) ? editPresenteSelect.value : "",
    turno: ruleRequiresTurno(evento) ? editTurnoSelect.value : "",
    devedor: pagador,
    pagador,
    credor,
    resultadoCredor: credor,
    valorPagar,
    valorAPagar: valorPagar ? BRL_FORMATTER.format(valorPagar) : "",
    observacoes: editObservacoesInput?.value.trim() || "",
    atualizadoEm: new Date().toISOString(),
    origem: "PWA Eventos de escala",
  };
}

function ruleRequiresSubstituto(evento) {
  return !getRuleForEvent(evento).disableSubstituto;
}

function ruleRequiresTurno(evento) {
  return !getRuleForEvent(evento).disableTurno;
}

function setDefaultDate() {
  dataInput.value = getLocalDateString();
}

function updateConnectionState() {
  const hasEndpoint = Boolean(APP_CONFIG.endpointUrl);
  const isOnline = navigator.onLine;

  connectionDot.className = "status-dot";

  if (!hasEndpoint) {
    connectionDot.classList.add("warning");
    connectionText.textContent = "Configure o endpoint do Apps Script para envio em tempo real.";
    return;
  }

  if (isOnline) {
    connectionDot.classList.add("online");
    connectionText.textContent = "Pronto para envio em tempo real.";
  } else {
    connectionDot.classList.add("offline");
    connectionText.textContent = "Sem internet. Os registros ficam em fila local.";
  }
}

function openAnnotationsSheet() {
  toggleAnnotationsSection();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove("visible");
  }, 2800);
}

function isAuthenticated() {
  const authState = readStoredAuth();
  if (!authState?.expiresAt) {
    return false;
  }

  if (Number(authState.expiresAt) <= Date.now()) {
    clearStoredAuth();
    return false;
  }

  return true;
}

function showAppContent() {
  authCard?.classList.add("hidden");
  appContent?.classList.remove("hidden");
}

function hideAppContent() {
  authCard?.classList.remove("hidden");
  appContent?.classList.add("hidden");
}

function sanitizePasswordInput() {
  if (!passwordInput) {
    return;
  }
  passwordInput.value = passwordInput.value.replace(/\D/g, "").slice(0, 4);
  updateFieldHaloState();
}

function unlockApp() {
  writeStoredAuth({
    unlockedAt: Date.now(),
    expiresAt: Date.now() + AUTH_DURATION_MS,
  });
  showAppContent();
  if (!appBootstrapped) {
    bootstrapApp();
  }
}

function handleAuthSubmit(event) {
  event.preventDefault();
  sanitizePasswordInput();

  if (passwordInput.value !== APP_PASSWORD) {
    showToast("Senha incorreta.");
    passwordInput.focus();
    passwordInput.select();
    return;
  }

  unlockApp();
  passwordInput.value = "";
  showToast("Acesso liberado.");
}

function isStandaloneMode() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
}

function getInstallInstructions() {
  const userAgent = window.navigator.userAgent || "";
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
  const isAndroid = /Android/i.test(userAgent);

  if (isIOS) {
    return "No iPhone, toque em Compartilhar e depois em Adicionar a Tela de Inicio.";
  }

  if (isAndroid) {
    return "No Android, toque em Instalar aplicativo ou use o menu do navegador e escolha Instalar app.";
  }

  return "Use a opcao de instalar do navegador para adicionar este app a tela inicial.";
}

function updateInstallUI() {
  if (!installCard || !installButton || !installHelpText) {
    return;
  }
  installCard.classList.add("hidden");
  return;

  if (isStandaloneMode()) {
    installCard.classList.add("is-hidden");
    return;
  }

  installCard.classList.remove("is-hidden");

  if (deferredInstallPrompt) {
    installButton.disabled = false;
    installButton.textContent = "Instalar aplicativo";
    installHelpText.textContent =
      "Adicione este app a tela inicial para usar como aplicativo no celular.";
    return;
  }

  installButton.disabled = /iPhone|iPad|iPod/i.test(window.navigator.userAgent || "");
  installButton.textContent = installButton.disabled ? "Abrir instrucoes" : "Como instalar";
  installHelpText.textContent = getInstallInstructions();
}

async function handleInstallClick() {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    const { outcome } = await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    updateInstallUI();
    showToast(outcome === "accepted" ? "Instalacao iniciada no smartphone." : "Instalacao cancelada pelo usuario.");
    return;
  }

  showToast(getInstallInstructions());
}

function buildPayload() {
  const evento = eventoSelect.value;
  const { pagador, credor, valorPagar } = getSettlementState();
  const atrasoTempo = isAtrasoEvent(evento) ? Number(atrasoTempoSelect.value || 0) : "";
  const turno = isAtrasoEvent(evento) ? "" : turnoSelect.value;

  return {
    data: dataInput.value,
    dataDoEvento: dataInput.value,
    evento,
    tipoDeEvento: evento,
    eventoDescricao: isOutrosEvent(evento) ? eventoOutroInput.value.trim() : "",
    descricaoDoEvento: isOutrosEvent(evento) ? eventoOutroInput.value.trim() : "",
    atrasoTempo,
    multiploDoAtraso: atrasoTempo,
    ausente: ausenteSelect.value,
    membroAusenteAtrasado: ausenteSelect.value,
    presente: isAtrasoEvent(evento) ? "" : presenteSelect.value,
    membroSubstituto: isAtrasoEvent(evento) ? "" : presenteSelect.value,
    turno,
    devedor: pagador,
    pagador,
    responsavelPeloOnus: pagador,
    credor,
    resultadoCredor: credor,
    valorPagar,
    valorAPagar: valorPagar ? BRL_FORMATTER.format(valorPagar) : "",
    criadoEm: new Date().toISOString(),
    criadoEmIso: new Date().toISOString(),
    origem: "PWA Eventos de escala",
  };
}

function buildAnnotationPayload() {
  return {
    kind: "annotation",
    data: getLocalDateString(),
    noteText: annotationTextInput.value.trim(),
    origem: "PWA Eventos de escala",
    criadoEm: new Date().toISOString(),
  };
}

async function postPayload(payload) {
  if (!APP_CONFIG.endpointUrl) {
    throw new Error("ENDPOINT_MISSING");
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), APP_CONFIG.requestTimeoutMs || 15000);

  try {
    const response = await fetch(APP_CONFIG.endpointUrl, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const rawText = await response.text().catch(() => "");
    const data = rawText ? JSON.parse(rawText) : {};
    if (!response.ok || data.ok === false) {
      throw new Error(data.message || "REQUEST_FAILED");
    }
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function renderAnnotation(annotation) {
  annotationTextInput.value = "";
  updateFieldHaloState();
}

function handleNotesMonthChange() {
  if (notesDateFilter?.value && !notesDateFilter.value.startsWith(`${notesMonthSelect.value}-`)) {
    notesDateFilter.value = "";
  }
  renderNotesReminders();
}

function handleNotesDateChange() {
  if (!notesDateFilter?.value) {
    renderNotesReminders();
    return;
  }

  const monthKey = notesDateFilter.value.slice(0, 7);
  if (Array.from(notesMonthSelect?.options || []).some((option) => option.value === monthKey)) {
    notesMonthSelect.value = monthKey;
  }
  renderNotesReminders();
}

async function onAnnotationSubmit(event) {
  event.preventDefault();

  if (!annotationsForm.reportValidity()) {
    return;
  }

  const payload = buildAnnotationPayload();
  saveAnnotationButton.disabled = true;

  try {
    if (!navigator.onLine || !APP_CONFIG.endpointUrl) {
      addToQueue(payload);
      renderAnnotation(null);
      showToast("Anotacao salva localmente para envio posterior.");
      return;
    }

    await postPayload(payload);
    renderAnnotation(null);
    showToast("Anotacoes salvas com sucesso.");
    await fetchBootstrapData().catch(() => {});
  } catch {
    addToQueue(payload);
    renderAnnotation(null);
    showToast("Falha no envio. Anotacao guardada na fila.");
  } finally {
    saveAnnotationButton.disabled = false;
    writeQueue(readQueue());
    updateConnectionState();
  }
}

async function onEditRecordSubmit(event) {
  event.preventDefault();

  if (!editRecordForm?.reportValidity()) {
    return;
  }

  const payload = buildEditPayload();
  if (!payload.sourceRow) {
    showToast("Nao foi possivel identificar a linha do registro.");
    return;
  }

  saveEditRecordButton.disabled = true;

  try {
    await postPayload(payload);
    await fetchBootstrapData();
    syncedRecords = [payload];
    registeredDateFilter && (registeredDateFilter.value = payload.data || registeredDateFilter.value);
    renderRegisteredRecords(payload.data || registeredDateFilter?.value);
    closeEditModal();
    eventEntryCard?.classList.add("hidden");
    showToast("Registro atualizado com sucesso.");
  } catch {
    showToast("Nao foi possivel salvar a edicao agora.");
  } finally {
    saveEditRecordButton.disabled = false;
  }
}

function addToQueue(payload) {
  const queue = readQueue();
  queue.push(payload);
  writeQueue(queue);
}

function prependHistory(payload) {
  const history = readHistory();
  history.unshift(payload);
  writeHistory(history);
}

async function fetchBootstrapData() {
  if (!APP_CONFIG.endpointUrl || !navigator.onLine) {
    renderLatestSynced();
    return;
  }

  const response = await fetch(`${APP_CONFIG.endpointUrl}?action=bootstrap&t=${Date.now()}`, {
    method: "GET",
    mode: "cors",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("BOOTSTRAP_FETCH_FAILED");
  }

  const data = await response.json();
  if (data.ok === false) {
    throw new Error(data.message || "BOOTSTRAP_FETCH_FAILED");
  }

  if (Array.isArray(data.eventOptions) && data.eventOptions.length) {
    const currentValue = eventoSelect.value;
    applyRemoteEventoOptions(data.eventOptions);
    if (currentValue && data.eventOptions.includes(currentValue)) {
      eventoSelect.value = currentValue;
    }
  }

  const currentAusenteValue = ausenteSelect.value;
  const currentPresenteValue = presenteSelect.value;
  applyRemotePersonOptions(data.ausenteOptions, data.presenteOptions);

  if (currentAusenteValue && currentAusenteOptions.includes(currentAusenteValue)) {
    ausenteSelect.value = currentAusenteValue;
  }

  if (currentPresenteValue && currentPresenteOptions.includes(currentPresenteValue)) {
    presenteSelect.value = currentPresenteValue;
  }

  if (data.latestRecord) {
    writeLatestSyncedCache(data.latestRecord);
    latestSyncedRecord = data.latestRecord;
  }

  syncedRecords = Array.isArray(data.monthlyRecords) ? data.monthlyRecords : [];
  renderLatestSynced(data.latestRecord || readLatestSyncedCache());
  if (registeredDateFilter) {
    registeredDateFilter.value = registeredDateFilter.value || getLocalDateString();
    renderRegisteredRecords();
  }
  renderAnnotation(null);
  monthlyNotesRecords = Array.isArray(data.monthlyNotes) ? data.monthlyNotes : [];
  monthlySummaryRecords = Array.isArray(data.monthlySummary) ? data.monthlySummary : [];
  populateNotesMonthOptions(monthlyNotesRecords);
  renderNotesReminders();
  populateSummaryMonthOptions(monthlySummaryRecords);
  renderMonthlySummary();

  updateEventoState();
  syncHighlightedSelect(presenteSelect);
}

async function flushQueue() {
  const queue = readQueue();
  if (!queue.length) {
    showToast("Nao ha registros pendentes.");
    return;
  }

  if (!navigator.onLine) {
    showToast("Sem internet para reenviar agora.");
    return;
  }

  if (!APP_CONFIG.endpointUrl) {
    showToast("Falta configurar o endpoint do Apps Script.");
    return;
  }

  syncButton.disabled = true;
  const remaining = [];

  for (const item of queue) {
    try {
      await postPayload(item);
    } catch {
      remaining.push(item);
    }
  }

  writeQueue(remaining);
  syncButton.disabled = false;
  updateConnectionState();
  await fetchBootstrapData().catch(() => {
    renderLatestSynced();
  });
  showToast(remaining.length ? "Parte da fila ainda ficou pendente." : "Fila reenviada com sucesso.");
}

function resetForm() {
  eventEntryCard?.classList.add("hidden");
  form.reset();
  setDefaultDate();
  fillSelect(eventoSelect, currentEventoOptions, "Selecione");
  fillSelect(atrasoTempoSelect, TEMPO_ATRASO_OPTIONS, "Selecione");
  fillSelect(ausenteSelect, currentAusenteOptions, "Selecione");
  fillSelect(presenteSelect, currentPresenteOptions, "Selecione");
  fillSelect(turnoSelect, TURNO_OPTIONS, "Selecione");
  fillSelect(devedorSelect, [TEAM_BOX, ...currentAusenteOptions], "Selecione");
  devedorSelect.disabled = false;
  devedorField.classList.remove("is-disabled");
  eventoOutroField.classList.add("hidden");
  atrasoTempoField.classList.add("hidden");
  presenteField.classList.remove("is-disabled");
  turnoField.classList.remove("is-disabled");
  ausenteField.classList.remove("is-disabled");
  presenteSelect.disabled = false;
  turnoSelect.disabled = false;
  ausenteSelect.disabled = false;
  ausenteSelect.required = true;
  presenteSelect.required = true;
  turnoSelect.required = true;
  atrasoTempoSelect.required = false;
  credorResultado.value = "Caixinha";
  lastReviewNoticeKey = "";
  syncHighlightedSelect(presenteSelect);
  submitButton?.classList.remove("is-reviewing");
  updateFieldHaloState();
}

async function onSubmit(event) {
  event.preventDefault();

  if (!form.reportValidity()) {
    return;
  }

  const payload = buildPayload();
  submitButton.disabled = true;

  try {
    if (!navigator.onLine || !APP_CONFIG.endpointUrl) {
      addToQueue(payload);
      prependHistory(payload);
      resetForm();
      updateConnectionState();
      showToast("Registro salvo localmente para envio posterior.");
      return;
    }

    await postPayload(payload);
    prependHistory(payload);
    resetForm();
    await fetchBootstrapData().catch(() => {
      renderLatestSynced();
    });
    showToast("Evento registrado com sucesso.");
  } catch {
    addToQueue(payload);
    prependHistory(payload);
    showToast("Falha no envio. Registro guardado na fila.");
  } finally {
    submitButton.disabled = false;
    writeQueue(readQueue());
    updateConnectionState();
  }
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
}

function bootstrapApp() {
  appBootstrapped = true;
  fillSelect(eventoSelect, currentEventoOptions, "Selecione");
  fillSelect(atrasoTempoSelect, TEMPO_ATRASO_OPTIONS, "Selecione");
  fillSelect(ausenteSelect, currentAusenteOptions, "Selecione");
  fillSelect(presenteSelect, currentPresenteOptions, "Selecione");
  fillSelect(turnoSelect, TURNO_OPTIONS, "Selecione");
  fillSelect(devedorSelect, [TEAM_BOX, ...currentAusenteOptions], "Selecione");
  setDefaultDate();
  renderAnnotation(null);
  writeQueue(readQueue());
  updateConnectionState();
  registerServiceWorker();
  syncHighlightedSelect(presenteSelect);
  updateFieldHaloState();
  renderLatestSynced();
  populateNotesMonthOptions(monthlyNotesRecords);
  renderNotesReminders();
  populateSummaryMonthOptions(monthlySummaryRecords);
  renderMonthlySummary();
  updateAnnotationsToggleState();
  updateNotesRemindersToggleState();
  updateSummaryToggleState();
  scheduleDateInput.value = getLocalDateString();
  fetchBootstrapData().catch(() => {
    renderLatestSynced();
    renderNotesReminders();
    renderMonthlySummary();
  });
  loadScheduleData().catch(() => {
    renderScheduleByDate(scheduleDateInput.value || getLocalDateString());
    showToast("Nao foi possivel atualizar a escala agora.");
  });
  updateInstallUI();
}

function initializeApp() {
  if (isAuthenticated()) {
    showAppContent();
    bootstrapApp();
    return;
  }

  hideAppContent();
  updateFieldHaloState();
  passwordInput?.focus();
}

eventoSelect.addEventListener("change", updateEventoState);
editEventoSelect?.addEventListener("change", updateEditEventoState);
editAtrasoTempoSelect?.addEventListener("change", updateEditEventoState);
editAusenteSelect?.addEventListener("change", updateEditEventoState);
editPresenteSelect?.addEventListener("change", updateEditEventoState);
editTurnoSelect?.addEventListener("change", updateEditEventoState);
atrasoTempoSelect.addEventListener("change", () => {
  updateSettlementPreview();
  maybeNotifyReviewAlert();
});
ausenteSelect.addEventListener("change", () => {
  updateSettlementPreview();
  maybeNotifyReviewAlert();
});
presenteSelect.addEventListener("change", () => {
  syncHighlightedSelect(presenteSelect);
  updateSettlementPreview();
  maybeNotifyReviewAlert();
});
turnoSelect.addEventListener("change", () => {
  updateSettlementPreview();
  maybeNotifyReviewAlert();
});
devedorSelect.addEventListener("change", () => {
  updateSettlementPreview();
  updateReviewAlert();
  maybeNotifyReviewAlert();
});
form?.addEventListener("input", updateFieldHaloState);
form?.addEventListener("change", updateFieldHaloState);
annotationsForm?.addEventListener("input", updateFieldHaloState);
annotationsForm?.addEventListener("change", updateFieldHaloState);
form.addEventListener("submit", onSubmit);
annotationsForm?.addEventListener("submit", onAnnotationSubmit);
editRecordForm?.addEventListener("submit", onEditRecordSubmit);
syncButton.addEventListener("click", () => {
  flushQueue().catch(() => showToast("Nao foi possivel reenviar agora."));
});
annotationsButton?.addEventListener("click", openAnnotationsSheet);
notesRemindersButton?.addEventListener("click", toggleNotesRemindersSection);
notesMonthSelect?.addEventListener("change", handleNotesMonthChange);
notesDateFilter?.addEventListener("change", handleNotesDateChange);
closeAnnotationsButton?.addEventListener("click", toggleAnnotationsSection);
closeNotesRemindersButton?.addEventListener("click", toggleNotesRemindersSection);
summaryToggleButton?.addEventListener("click", toggleSummarySection);
summaryMonthSelect?.addEventListener("change", renderMonthlySummary);
summaryShareButton?.addEventListener("click", () => {
  shareMonthlySummaryFile().catch((error) => {
    const message =
      error?.message === "EMPTY_SUMMARY"
        ? "Nao ha dados no resumo mensal para gerar o PDF."
        : "Nao foi possivel gerar o PDF agora.";
    showToast(message);
  });
});
installButton?.addEventListener("click", () => {
  handleInstallClick().catch(() => showToast("Nao foi possivel abrir a instalacao agora."));
});
scheduleDateInput?.addEventListener("change", () => {
  renderScheduleByDate(clampScheduleDate(scheduleDateInput.value || getLocalDateString()));
});
prevScheduleButton?.addEventListener("click", () => shiftScheduleDate(-1));
todayScheduleButton?.addEventListener("click", () => {
  renderScheduleByDate(clampScheduleDate(getLocalDateString()));
});
nextScheduleButton?.addEventListener("click", () => shiftScheduleDate(1));
latestSyncedCard?.addEventListener("dblclick", () => {
  openEditModal(latestSyncedRecord);
});
registeredDateFilter?.addEventListener("change", () => renderRegisteredRecords());
closeEditRecordButton?.addEventListener("click", closeEditModal);
editRecordBackdrop?.addEventListener("click", closeEditModal);
authForm?.addEventListener("submit", handleAuthSubmit);
passwordInput?.addEventListener("input", sanitizePasswordInput);
window.addEventListener("online", () => {
  updateConnectionState();
  flushQueue().catch(() => {});
  fetchBootstrapData().catch(() => {});
  loadScheduleData().catch(() => {});
});
window.addEventListener("offline", updateConnectionState);
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  updateInstallUI();
});
window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  updateInstallUI();
  showToast("Aplicativo instalado com sucesso.");
});

repairVisibleText_();
initializeApp();

