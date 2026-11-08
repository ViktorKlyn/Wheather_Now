const apiBaseUrl =
  new URLSearchParams(globalThis.location.search).get("api") ||
  `${globalThis.location.protocol}//${globalThis.location.hostname}:3001`;
const API_URL = new URL("/alertas", apiBaseUrl).toString();
const alertList = document.getElementById("alerts");
const totalEl = document.getElementById("total");
const pendentesEl = document.getElementById("pendentes");
const ultimoEl = document.getElementById("ultimo");
const errorEl = document.getElementById("error");
const refreshBtn = document.getElementById("refresh");
const statusOptions = ["PENDENTE", "ATENDIDO", "IGNORADO"];
const statusClasses = {
  PENDENTE: "pendente",
  ATENDIDO: "atendido",
  IGNORADO: "ignorado",
};
const knownAlertIds = new Set();
let hasLoadedAlerts = false;
let fetchingAlerts = null;
let lastRenderedAlerts = null;

function displayValue(value) {
  if (value === null || value === undefined || String(value).trim() === "") {
    return "—";
  }
  return String(value);
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? displayValue(value) : date.toLocaleString("pt-BR");
}

function addField(container, label, value) {
  const field = document.createElement("div");
  const title = document.createElement("strong");
  title.textContent = label;
  field.append(title, document.createElement("br"), document.createTextNode(displayValue(value)));
  container.appendChild(field);
}

function renderAlert(alert, isNew) {
  const item = document.createElement("article");
  item.className = `card${isNew ? " new" : ""}`;

  const header = document.createElement("div");
  header.className = "card-header";
  const id = document.createElement("span");
  id.className = "id";
  id.textContent = `#${displayValue(alert.id)}`;

  const statusText = displayValue(alert.status).toUpperCase();
  const status = document.createElement("span");
  status.className = `status ${statusClasses[statusText] || ""}`.trim();
  status.textContent = statusText;
  header.append(id, status);

  const metadata = document.createElement("div");
  metadata.className = "meta";
  addField(metadata, "Usuário", alert.usuario_id);
  addField(metadata, "Data/Hora", formatDate(alert.data_hora || alert.criado_em));
  addField(metadata, "Tipo", alert.tipo_alerta || "SOS");
  const coordinates =
    alert.latitude == null || alert.longitude == null
      ? "—"
      : `${displayValue(alert.latitude)}, ${displayValue(alert.longitude)}`;
  addField(metadata, "Local", coordinates);
  addField(metadata, "Simulada", alert.localizacao_simulada ? "Sim" : "Não");

  const controls = document.createElement("div");
  controls.className = "toolbar";
  controls.style.marginTop = "16px";

  const select = document.createElement("select");
  select.setAttribute("aria-label", `Status do alerta ${displayValue(alert.id)}`);
  for (const optionValue of statusOptions) {
    const option = document.createElement("option");
    option.value = optionValue;
    option.textContent = optionValue;
    option.selected = optionValue === statusText;
    select.appendChild(option);
  }

  const updateButton = document.createElement("button");
  updateButton.className = "primary";
  updateButton.textContent = "Atualizar status";
  updateButton.addEventListener("click", () =>
    updateAlertStatus(alert.id, select.value, updateButton)
  );
  controls.append(select, updateButton);

  item.append(header, metadata, controls);
  return item;
}

async function updateAlertStatus(id, status, button) {
  button.disabled = true;
  errorEl.textContent = "";
  try {
    const response = await fetch(`${API_URL}/${encodeURIComponent(String(id))}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      const result = await response.json().catch(() => null);
      throw new Error(result?.erro || "Não foi possível atualizar o status.");
    }
    await fetchAlerts(true);
  } catch (error) {
    errorEl.className = "error";
    errorEl.textContent = error.message || "Falha ao atualizar status.";
  } finally {
    button.disabled = false;
  }
}

async function fetchAlerts(forceRefresh = false) {
  if (fetchingAlerts) {
    if (!forceRefresh) return fetchingAlerts;
    await fetchingAlerts;
    return fetchAlerts(true);
  }

  const request = (async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Não foi possível carregar os alertas.");
      }

      const alerts = await response.json();
      if (!Array.isArray(alerts)) {
        throw new Error("A API retornou uma lista de alertas inválida.");
      }

      errorEl.textContent = "";
      errorEl.className = "";

      const currentAlerts = JSON.stringify(alerts);
      if (currentAlerts !== lastRenderedAlerts) {
        const newAlertIds = new Set();
        for (const alert of alerts) {
          const id = String(alert.id);
          if (hasLoadedAlerts && !knownAlertIds.has(id)) newAlertIds.add(id);
          knownAlertIds.add(id);
        }

        alertList.replaceChildren();
        if (alerts.length === 0) {
          const empty = document.createElement("div");
          empty.className = "empty";
          empty.textContent = "Nenhum alerta registrado.";
          alertList.appendChild(empty);
        } else {
          for (const alert of alerts) {
            alertList.appendChild(renderAlert(alert, newAlertIds.has(String(alert.id))));
          }
        }
        lastRenderedAlerts = currentAlerts;
      }

      const pendingCount = alerts.filter(
        (alert) => String(alert.status).toUpperCase() === "PENDENTE"
      ).length;
      totalEl.textContent = String(alerts.length);
      pendentesEl.textContent = String(pendingCount);
      ultimoEl.textContent = alerts.length
        ? formatDate(alerts[0].data_hora || alerts[0].criado_em)
        : "—";
      hasLoadedAlerts = true;
    } catch (error) {
      errorEl.className = "error";
      errorEl.textContent = error.message || "Falha ao consultar o painel.";
      if (!hasLoadedAlerts) {
        const empty = document.createElement("div");
        empty.className = "empty";
        empty.textContent = "Falha ao consultar o painel. Verifique a API.";
        alertList.replaceChildren(empty);
      }
    } finally {
      fetchingAlerts = null;
    }
  })();

  fetchingAlerts = request;
  return request;
}

refreshBtn.addEventListener("click", fetchAlerts);
fetchAlerts();
setInterval(fetchAlerts, 8000);
