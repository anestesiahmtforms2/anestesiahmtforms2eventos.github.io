const SHEET_NAME = "Registros";
const LISTS_SHEET_NAME = "Listas";
const NOTES_SHEET_NAME = "ANOTACOES";

function doPost(e) {
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    if (normalizeText_(payload.kind) === "annotation") {
      saveAnnotation_(payload);
      return jsonResponse({ ok: true, message: "Anotacao salva." });
    }

    if (normalizeText_(payload.kind) === "updaterecord") {
      updateRecord_(payload);
      return jsonResponse({ ok: true, message: "Registro atualizado." });
    }

    const sheet = findSheetByNormalizedName_(SHEET_NAME);

    if (!sheet) {
      return jsonResponse({ ok: false, message: "Aba Registros nao encontrada." });
    }

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getDisplayValues()[0];
    const row = headers.map((header) => getCellValueForHeader_(header, payload, ""));
    sheet.appendRow(row);

    return jsonResponse({ ok: true, message: "Registro salvo." });
  } catch (error) {
    return jsonResponse({ ok: false, message: String(error) });
  }
}

function doGet(e) {
  const action = e && e.parameter ? e.parameter.action : "";

  if (action === "summary") {
    return jsonResponse({
      ok: true,
      despesas: "",
      recebimentos: "",
      fetchedAt: new Date().toISOString(),
    });
  }

  if (action === "bootstrap") {
    return getBootstrapResponse_();
  }

  return jsonResponse({ ok: true, message: "Web app ativo." });
}

function getBootstrapResponse_() {
  const peopleOptions = getPeopleOptions_();

  return jsonResponse({
    ok: true,
    eventOptions: getEventOptions_(),
    ausenteOptions: peopleOptions.ausenteOptions,
    presenteOptions: peopleOptions.presenteOptions,
    latestAnnotation: getLatestAnnotation_(),
    monthlyNotes: getMonthlyNotes_(),
    latestRecord: getLatestRecord_(),
    monthlyRecords: getMonthlyRecords_(),
    monthlySummary: getMonthlySummary_(),
    fetchedAt: new Date().toISOString(),
  });
}

function getEventOptions_() {
  const listSheet = findSheetByNormalizedName_(LISTS_SHEET_NAME);
  if (!listSheet || listSheet.getLastRow() < 2) {
    return [];
  }

  return listSheet
    .getRange(2, 1, listSheet.getLastRow() - 1, 1)
    .getDisplayValues()
    .flat()
    .map(cleanValue_)
    .filter(Boolean);
}

function getPeopleOptions_() {
  const listSheet = findSheetByNormalizedName_(LISTS_SHEET_NAME);
  if (!listSheet || listSheet.getLastRow() < 2) {
    return { ausenteOptions: [], presenteOptions: [] };
  }

  const values = listSheet.getRange(2, 2, listSheet.getLastRow() - 1, 2).getDisplayValues();
  const ausenteOptions = [];
  const presenteOptions = [];

  values.forEach((row) => {
    const ausente = cleanValue_(row[0]);
    const presente = cleanValue_(row[1]);

    if (ausente) {
      ausenteOptions.push(ausente);
    }

    if (presente) {
      presenteOptions.push(presente);
    }
  });

  return {
    ausenteOptions: uniqueValues_(ausenteOptions),
    presenteOptions: uniqueValues_(presenteOptions),
  };
}

function getLatestRecord_() {
  const sheet = findSheetByNormalizedName_(SHEET_NAME);
  if (!sheet || sheet.getLastRow() < 2) {
    return null;
  }

  const width = sheet.getLastColumn();
  const rowNumber = findLatestDataRow_(sheet);
  if (rowNumber < 2) {
    return null;
  }

  const headers = sheet.getRange(1, 1, 1, width).getDisplayValues()[0];
  const values = sheet.getRange(rowNumber, 1, 1, width).getDisplayValues()[0];
  const rowMap = {};

  headers.forEach((header, index) => {
    rowMap[normalizeText_(header)] = values[index] || "";
  });

  return {
    data: rowMap["data do evento"] || "",
    evento: rowMap["tipo de evento"] || rowMap["tipo do evento"] || "",
    eventoDescricao: rowMap["descricao do evento"] || "",
    atrasoTempo: rowMap["multiplo do atraso"] || "",
    ausente: rowMap["membro (ausente/atrasado)"] || rowMap["membro ausente/atrasado"] || "",
    presente: rowMap["substituto"] || rowMap["membro substituto"] || "",
    turno: rowMap["turno"] || "",
    devedor: rowMap["pagador"] || rowMap["responsavel pelo onus"] || "",
    credor: rowMap["credor"] || "",
    valorPagar: rowMap["valor a pagar"] || "",
    sourceRow: rowNumber,
    historicoAlteracoes:
      rowMap["historico de alteracoes"] ||
      rowMap["historico"] ||
      rowMap["alteracoes"] ||
      rowMap["edicoes"] ||
      "",
  };
}

function getMonthlyRecords_() {
  const sheet = findSheetByNormalizedName_(SHEET_NAME);
  if (!sheet || sheet.getLastRow() < 2) {
    return [];
  }

  const width = Math.min(sheet.getLastColumn(), 13);
  const headers = sheet.getRange(1, 1, 1, width).getDisplayValues()[0];
  const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, width).getDisplayValues();

  return rows
    .filter((row) => row.some((cell) => cleanValue_(cell)))
    .map((row) => mapRecordFromHeaders_(headers, row))
    .filter((record) => record.data || record.evento);
}

function getMonthlySummary_() {
  const records = getMonthlyRecords_();
  const grouped = {};

  records.forEach((record) => {
    const monthKey = cleanValue_(record.monthKey);
    const devedor = cleanValue_(record.devedor);
    const credor = cleanValue_(record.credor);

    if (!monthKey || !devedor || !credor) {
      return;
    }

    const key = [monthKey, devedor, credor].join("||");
    if (!grouped[key]) {
      grouped[key] = {
        monthKey: monthKey,
        devedor: devedor,
        credor: credor,
        datas: [],
        totalNumero: 0,
      };
    }

    if (cleanValue_(record.data)) {
      grouped[key].datas.push(cleanValue_(record.data));
    }

    grouped[key].totalNumero += parseCurrencyLikeValue_(record.valorPagar);
  });

  return Object.keys(grouped)
    .map(function (key) {
      var item = grouped[key];
      return {
        monthKey: item.monthKey,
        devedor: item.devedor,
        credor: item.credor,
        datas: item.datas.join(", "),
        total: formatCurrencyBr_(item.totalNumero),
        totalNumero: item.totalNumero,
      };
    })
    .sort(function (left, right) {
      if (left.monthKey !== right.monthKey) {
        return left.monthKey < right.monthKey ? 1 : -1;
      }
      if (left.devedor !== right.devedor) {
        return left.devedor < right.devedor ? -1 : 1;
      }
      if (left.credor !== right.credor) {
        return left.credor < right.credor ? -1 : 1;
      }
      return 0;
    });
}

function getLatestAnnotation_() {
  var sheet = findSheetByNormalizedName_(NOTES_SHEET_NAME);
  if (!sheet) {
    return null;
  }

  return {
    data: cleanValue_(sheet.getRange("B2").getDisplayValue()) || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd"),
    texto: cleanValue_(sheet.getRange("A4").getDisplayValue()) || "",
  };
}

function getMonthlyNotes_() {
  var sheet = findSheetByNormalizedName_(NOTES_SHEET_NAME);
  if (!sheet || sheet.getLastRow() < 23) {
    return [];
  }

  var lastRow = sheet.getLastRow();
  var values = sheet.getRange(23, 1, lastRow - 22, 4).getDisplayValues();

  return values
    .filter(function (row) {
      return row.some(function (cell) {
        return cleanValue_(cell);
      });
    })
    .map(function (row) {
      var data = cleanValue_(row[0]);
      var monthKey = cleanValue_(row[1]) || buildMonthKey_(data);
      var texto = cleanValue_(row[2]);
      var criadoEm = cleanValue_(row[3]);

      return {
        data: data,
        monthKey: monthKey,
        texto: texto,
        criadoEm: criadoEm,
      };
    })
    .filter(function (item) {
      return item.data || item.texto;
    })
    .sort(function (left, right) {
      if (left.monthKey !== right.monthKey) {
        return left.monthKey < right.monthKey ? 1 : -1;
      }
      return left.data < right.data ? 1 : -1;
    });
}

function saveAnnotation_(payload) {
  var sheet = findSheetByNormalizedName_(NOTES_SHEET_NAME);
  if (!sheet) {
    throw new Error("Aba ANOTACOES nao encontrada.");
  }

  var dateValue = cleanValue_(payload.data) || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
  var noteText = cleanValue_(payload.noteText);

  sheet.getRange("A1").setValue("ANOTACOES DO DIA");
  sheet.getRange("A2").setValue("Data");
  sheet.getRange("B2").setValue(dateValue);
  sheet.getRange("A4").setValue(noteText);

  sheet.getRange("A22").setValue("Data");
  sheet.getRange("B22").setValue("Mes");
  sheet.getRange("C22").setValue("Anotacao");
  sheet.getRange("D22").setValue("Criado em");
  sheet.appendRow([
    dateValue,
    buildMonthKey_(dateValue),
    noteText,
    cleanValue_(payload.criadoEm) || new Date().toISOString(),
  ]);
}

function updateRecord_(payload) {
  const sheet = findSheetByNormalizedName_(SHEET_NAME);
  if (!sheet) {
    throw new Error("Aba Registros nao encontrada.");
  }

  const sourceRow = Number(payload.sourceRow || 0);
  if (!sourceRow || sourceRow < 2 || sourceRow > sheet.getLastRow()) {
    throw new Error("Linha de origem invalida para edicao.");
  }

  ensureHistoryColumn_(sheet);

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getDisplayValues()[0];
  const currentValues = sheet.getRange(sourceRow, 1, 1, sheet.getLastColumn()).getDisplayValues()[0];
  const updatedValues = headers.map(function (header, index) {
    return getCellValueForHeader_(header, payload, currentValues[index] || "");
  });

  const historyIndex = findHeaderIndex_(
    headers,
    ["Historico de Alteracoes", "Historico", "Alteracoes", "Edicoes"],
  );

  if (historyIndex !== -1) {
    updatedValues[historyIndex] = buildEditHistory_(currentValues[historyIndex], payload);
  }

  sheet.getRange(sourceRow, 1, 1, updatedValues.length).setValues([updatedValues]);
}

function buildEditHistory_(existingHistory, payload) {
  const stamp = Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    "dd/MM/yyyy HH:mm:ss",
  );
  const eventLabel = cleanValue_(payload.evento || payload.tipoDeEvento || "");
  const dateLabel = cleanValue_(payload.data || payload.dataDoEvento || "");
  const line = ["Alterado em " + stamp, dateLabel ? "Data: " + dateLabel : "", eventLabel ? "Evento: " + eventLabel : ""]
    .filter(Boolean)
    .join(" | ");

  const previous = cleanValue_(existingHistory);
  return previous ? previous + "\n" + line : line;
}

function getCellValueForHeader_(header, payload, existingValue) {
  const normalizedHeader = normalizeText_(header);
  const headerMap = getHeaderValueMap_(payload, existingValue);

  return Object.prototype.hasOwnProperty.call(headerMap, normalizedHeader)
    ? headerMap[normalizedHeader]
    : existingValue || "";
}

function getHeaderValueMap_(payload, existingValue) {
  return {
    timestamp: payload.timestamp || existingValue || new Date(),
    "data do evento": payload.data || payload.dataDoEvento || existingValue || "",
    "tipo do evento": payload.evento || payload.tipoDeEvento || existingValue || "",
    "tipo de evento": payload.evento || payload.tipoDeEvento || existingValue || "",
    "descricao do evento":
      payload.eventoDescricao || payload.descricaoDoEvento || payload.descricao || existingValue || "",
    "multiplo do atraso": payload.atrasoTempo || payload.multiploDoAtraso || existingValue || "",
    "membro (ausente/atrasado)":
      payload.ausente || payload.membroAusenteAtrasado || payload.ausenteAtrasado || existingValue || "",
    "membro ausente/atrasado":
      payload.ausente || payload.membroAusenteAtrasado || payload.ausenteAtrasado || existingValue || "",
    substituto: payload.presente || payload.membroSubstituto || existingValue || "",
    "membro substituto": payload.presente || payload.membroSubstituto || existingValue || "",
    turno: payload.turno || existingValue || "",
    pagador:
      payload.pagador || payload.devedor || payload.responsavelPeloOnus || payload.onus || existingValue || "",
    "responsavel pelo onus":
      payload.pagador || payload.devedor || payload.responsavelPeloOnus || payload.onus || existingValue || "",
    credor: payload.credor || payload.resultadoCredor || existingValue || "",
    "valor a pagar": payload.valorAPagar || payload.valorPagar || existingValue || "",
    origem: payload.origem || existingValue || "",
    "criado em iso": payload.criadoEm || payload.criadoEmIso || existingValue || "",
    "historico de alteracoes": payload.historicoAlteracoes || existingValue || "",
  };
}

function mapRecordFromHeaders_(headers, values) {
  const rowMap = {};

  headers.forEach((header, index) => {
    rowMap[normalizeText_(header)] = values[index] || "";
  });

  const data = rowMap["data do evento"] || "";

  return {
    timestamp: rowMap["timestamp"] || "",
    data: data,
    monthKey: buildMonthKey_(data),
    evento: rowMap["tipo de evento"] || rowMap["tipo do evento"] || "",
    eventoDescricao: rowMap["descricao do evento"] || "",
    atrasoTempo: rowMap["multiplo do atraso"] || "",
    ausente: rowMap["membro (ausente/atrasado)"] || rowMap["membro ausente/atrasado"] || "",
    presente: rowMap["substituto"] || rowMap["membro substituto"] || "",
    turno: rowMap["turno"] || "",
    devedor: rowMap["pagador"] || rowMap["responsavel pelo onus"] || "",
    credor: rowMap["credor"] || "",
    valorPagar: rowMap["valor a pagar"] || "",
    origem: rowMap["origem"] || "",
    criadoEm: rowMap["criado em iso"] || "",
  };
}

function buildMonthKey_(dateValue) {
  const cleanDate = cleanValue_(dateValue);
  if (!cleanDate) {
    return "";
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(cleanDate)) {
    return cleanDate.slice(0, 7);
  }

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(cleanDate)) {
    return cleanDate.slice(6, 10) + "-" + cleanDate.slice(3, 5);
  }

  return "";
}

function ensureHistoryColumn_(sheet) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getDisplayValues()[0];
  if (findHeaderIndex_(headers, ["Historico de Alteracoes"]) !== -1) {
    return;
  }

  const column = sheet.getLastColumn() + 1;
  sheet.getRange(1, column).setValue("Historico de Alteracoes");
}

function findLatestDataRow_(sheet) {
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();

  for (var row = lastRow; row >= 2; row -= 1) {
    var values = sheet.getRange(row, 1, 1, lastColumn).getDisplayValues()[0];
    if (values.some(function (value) { return cleanValue_(value); })) {
      return row;
    }
  }

  return 1;
}

function findHeaderIndex_(headers, candidates) {
  var normalizedCandidates = candidates.map(normalizeText_);
  for (var index = 0; index < headers.length; index += 1) {
    if (normalizedCandidates.indexOf(normalizeText_(headers[index])) !== -1) {
      return index;
    }
  }

  return -1;
}

function findSheetByNormalizedName_(expectedName) {
  const normalizedExpectedName = normalizeText_(expectedName);
  const sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();

  for (var i = 0; i < sheets.length; i += 1) {
    if (normalizeText_(sheets[i].getName()) === normalizedExpectedName) {
      return sheets[i];
    }
  }

  return null;
}

function getSheetUrlByNormalizedName_(expectedName) {
  var sheet = findSheetByNormalizedName_(expectedName);
  if (!sheet) {
    return "";
  }

  return SpreadsheetApp.getActiveSpreadsheet().getUrl() + "#gid=" + sheet.getSheetId();
}

function cleanValue_(value) {
  return String(value || "").trim();
}

function parseCurrencyLikeValue_(value) {
  var clean = cleanValue_(value).replace(/\./g, "").replace(",", ".").replace(/[^\d.-]/g, "");
  var numberValue = Number(clean);
  return isNaN(numberValue) ? 0 : numberValue;
}

function formatCurrencyBr_(value) {
  return "R$ " + Number(value || 0).toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function uniqueValues_(values) {
  const seen = {};
  const output = [];

  values.forEach((value) => {
    const key = normalizeText_(value);
    if (!key || seen[key]) {
      return;
    }

    seen[key] = true;
    output.push(value);
  });

  return output;
}

function normalizeText_(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
