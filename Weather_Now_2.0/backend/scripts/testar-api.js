// Testes de fumaça auto-contidos com PGlite em memória (banco SQL real, sem servidor externo).
// Executar: cd backend && npm test
const { spawn } = require("node:child_process");
const net = require("node:net");
const path = require("node:path");

async function getFreePort() {
  const server = net.createServer();
  await new Promise((resolve, reject) => server.listen(0, "127.0.0.1", resolve).once("error", reject));
  const port = server.address().port;
  await new Promise((resolve) => server.close(resolve));
  return port;
}

async function main() {
  const port = await getFreePort();
  const url = `http://127.0.0.1:${port}`;
  const child = spawn(process.execPath, [path.join(__dirname, "../src/index.js")], {
    cwd: path.join(__dirname, ".."),
    env: { ...process.env, PORT: String(port), DB_DRIVER: "pglite", PGLITE_DATA_DIR: ":memory:" },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let log = "";
  child.stdout.on("data", (data) => { log += data; });
  child.stderr.on("data", (data) => { log += data; });
  let count = 0;
  async function request(route, method = "GET", body, expected = 200) {
    const response = await fetch(url + route, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const content = await response.text();
    let payload;
    try { payload = JSON.parse(content); } catch { payload = content; }
    if (response.status !== expected) {
      throw new Error(`${method} ${route}: esperado ${expected}; recebido ${response.status}: ${content}`);
    }
    count++;
    return payload;
  }
  try {
    let ready = false;
    for (let attempt = 0; attempt < 80; attempt++) {
      if (child.exitCode !== null) break;
      try {
        await request("/");
        ready = true;
        break;
      } catch { await new Promise((r) => setTimeout(r, 200)); }
    }
    if (!ready) throw new Error(`API não iniciou: ${log.slice(-800)}`);

    const indicadores = await request("/indicadores");
    if (!Array.isArray(indicadores.indicadores) || indicadores.indicadores.length !== 27) {
      throw new Error("O endpoint /indicadores não retornou 27 UFs");
    }
    const contatos = await request("/contatos-apoio");
    if (!contatos.length) throw new Error("Não houve seed do contato demonstrativo");
    await request("/ocorrencias");
    const occ = await request("/ocorrencias", "POST", { data: "2026-11-15", descricao: "Teste fictício automatizado" }, 201);
    await request(`/ocorrencias/${occ.id}`);
    await request(`/ocorrencias/${occ.id}`, "PUT", { data: "2026-11-14", descricao: "Atualização fictícia" });
    await request(`/ocorrencias/${occ.id}`, "DELETE");
    await request(`/ocorrencias/${occ.id}`, "GET", undefined, 404);
    await request("/ocorrencias", "POST", { data: "9999-99-99", descricao: "" }, 400);

    const contato = await request("/contatos-apoio", "POST", { nome: "Teste Contato", telefone: "(43) 99999-9999", grau_relacionamento: "Amiga" }, 201);
    await request(`/contatos-apoio/${contato.id}`);
    await request(`/contatos-apoio/${contato.id}`, "PUT", { nome: "Teste Atualizado", telefone: "(43) 99999-8888", grau_relacionamento: "Família" });
    await request(`/contatos-apoio/${contato.id}`, "DELETE");
    await request(`/contatos-apoio/${contato.id}`, "GET", undefined, 404);

    const sosBody = { latitude: -23.3103, longitude: -51.1628, data_hora: "2026-11-15T20:00:00Z", status: "PENDENTE", tipo_alerta: "SOS", localizacao_simulada: true };
    const alerta = await request("/alertas", "POST", sosBody, 201);
    const buscaAlerta = await request(`/alertas/${alerta.id}`);
    if (!buscaAlerta.usuario_nome) throw new Error("SOS não inclui nome da conta demonstrativa");
    await request(`/alertas/${alerta.id}/status`, "PATCH", { status: "ATENDIDO" });
    await request(`/alertas/${alerta.id}`, "PUT", { ...sosBody, status: "IGNORADO" });
    await request(`/alertas/${alerta.id}`, "DELETE");
    await request(`/alertas/${alerta.id}`, "GET", undefined, 404);
    console.log(`OK: ${count} verificações HTTP de API, CRUDs e indicadores usando banco real em memória.`);
  } catch (error) {
    console.error("ERRO:", error.message, "\nLOG API:\n", log.slice(-1400));
    process.exitCode = 1;
  } finally {
    child.kill("SIGTERM");
  }
}
main().catch((err) => { console.error(err); process.exitCode = 1; });
