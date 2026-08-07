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
    return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

function writeStoredAuth(payload) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload));
}

function clearStoredAuth() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
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
  const link = document.createElemen…8201 tokens truncated…   sourceRow: Number(editSourceRow.value || 0),
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
    closeEditModal();
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

  renderLatestSynced(data.latestRecord || readLatestSyncedCache());
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
  openEditModal();
});
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

initializeApp();


