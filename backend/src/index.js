// Ponto de entrada da API: sobe o servidor Express
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

// cors: permite que o front-end (Expo) chame esta API
app.use(cors());

// express.json: lê o corpo das requisições POST/PUT em JSON
app.use(express.json());

// Liga as rotas definidas em src/routes/index.js
app.use(routes);

app.listen(PORT, () => {
  console.log(`API Weather Now rodando em http://localhost:${PORT}`);
});
