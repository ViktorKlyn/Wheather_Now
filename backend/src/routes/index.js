// Junta as rotas da API em um único arquivo
const express = require("express");
const ocorrenciasRoutes = require("./ocorrencias");
const contatosApoioRoutes = require("./contatosApoio");
const alertasRoutes = require("./alertas");

const router = express.Router();

// GET /  -> teste rápido para ver se a API subiu
router.get("/", (req, res) => {
  res.send("API Weather Now funcionando");
});

// Todas as rotas do projeto ficam em namespaces específicos
router.use("/ocorrencias", ocorrenciasRoutes);
router.use("/contatos-apoio", contatosApoioRoutes);
router.use("/alertas", alertasRoutes);

module.exports = router;
