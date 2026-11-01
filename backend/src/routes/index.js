// Junta as rotas da API em um único arquivo
const express = require("express");
const ocorrenciasRoutes = require("./ocorrencias");

const router = express.Router();

// GET /  -> teste rápido para ver se a API subiu
router.get("/", (req, res) => {
  res.send("API Weather Now funcionando");
});

// Todas as rotas de ocorrências ficam em /ocorrencias
router.use("/ocorrencias", ocorrenciasRoutes);

module.exports = router;
