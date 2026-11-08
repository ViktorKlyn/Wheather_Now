const API_URL = "http://localhost:3001/alertas";
const alertList = document.getElementById("alerts");
const totalEl = document.getElementById("total");
const pendentesEl = document.getElementById("pendentes");
const ultimoEl = document.getElementById("ultimo");
const errorEl = document.getElementById("error");
const refreshBtn = document.getElementById("refresh");

function statusClass(status = "PENDENTE") {
  return String(status).toLowerCase();
}

function formatDate(value) {
  if (!value) return "—";
  const dt = new Date(value);
  return Number.isNaN(dt.getTime()) ? value : dt.toLocaleString("pt-BR");
}

function renderAlert(alert) {
  const item = document.createElement("article");
  item.className = `card ${alert.status === "PENDENTE" ? "new" : ""}`;
  item.innerHTML = `
    <div class="card-header">
      <span class="id">#${alert.id}</span>
      <span class="status ${statusClass(alert.status)}">${alert.status}</span>
    </div>
    <div class="meta">
      <div><strong>Usuário</strong><br />${alert.usuario_id}</div>
      <div><strong>Data/Hora</strong><br />${formatDate(alert.data_hora || alert.criado_em)}</div>
      <div><strong>Tipo</strong><br />${alert.tipo_alerta || "SOS"}</div>
      <div><strong>Local</strong><br />${alert.latitude}, ${alert.longitude}</div>
      <div><strong>Simulada</strong><br />${alert.localizacao_simulada ? "Sim" : "Não"}</div>
    </div>
  `;
  return item;
}

async function fetchAlerts() {
  try {
    errorEl.innerHTML = "";
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Não foi possível carregar os alertas");
    }

    const alerts = await response.json();
    alertList.innerHTML = "";

    if (!alerts.length) {
      alertList.innerHTML = '<div class="empty">Nenhum alerta registrado.</div>';
      totalEl.textContent = "0";
      pendentesEl.textContent = "0";
      ultimoEl.textContent = "—";
      return;
    }

    alerts.forEach((alert) => alertList.appendChild(renderAlert(alert)));

    const pendentes = alerts.filter((alert) => String(alert.status).toUpperCase() === "PENDENTE").length;
    totalEl.textContent = String(alerts.length);
    pendentesEl.textContent = String(pendentes);
    ultimoEl.textContent = formatDate(alerts[0].data_hora || alerts[0].criado_em);
  } catch (err) {
    errorEl.innerHTML = `<div class="error">${err.message}</div>`;
    alertList.innerHTML = '<div class="empty">Falha ao consultar o painel. Verifique a API.</div>';
  }
}

refreshBtn.addEventListener("click", fetchAlerts);
fetchAlerts();
setInterval(fetchAlerts, 8000);
