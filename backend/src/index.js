// Ponto de entrada da API: sobe o servidor Express
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const database = require("./db");

const app = express();
const PORT = process.env.PORT || 3001;
let server;
let shuttingDown = false;

// cors: permite que o front-end (Expo) chame esta API
app.use(cors());

// express.json: lê o corpo das requisições POST/PUT em JSON
app.use(express.json());

// Liga as rotas definidas em src/routes/index.js
app.use(routes);

async function start() {
  await database.initialize();
  server = await new Promise((resolve, reject) => {
    const listener = app.listen(PORT);
    listener.once("error", reject);
    listener.once("listening", () => resolve(listener));
  });
  console.log(`API Weather Now rodando em http://localhost:${PORT}`);
}

async function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`Encerrando API (${signal})...`);

  if (server) {
    try {
      await new Promise((resolve, reject) => {
        server.close((erro) => (erro ? reject(erro) : resolve()));
      });
    } catch (erro) {
      console.error("Não foi possível encerrar o servidor HTTP:", erro);
      process.exitCode = 1;
    }
  }

  try {
    await database.close();
  } catch (erro) {
    console.error("Não foi possível fechar o banco de dados:", erro);
    process.exitCode = 1;
  }
}

process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));

start().catch(async (erro) => {
  console.error("Não foi possível iniciar a API:", erro);
  try {
    await database.close();
  } catch (erroFechamento) {
    console.error("Não foi possível fechar o banco de dados:", erroFechamento);
  }
  process.exitCode = 1;
});
