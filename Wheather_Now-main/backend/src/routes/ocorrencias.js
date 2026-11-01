// Rotas do CRUD de ocorrências
const express = require("express");
const ocorrenciasController = require("../controllers/ocorrenciasController");

const router = express.Router();

// GET    /ocorrencias      -> lista todas
router.get("/", ocorrenciasController.listar);

// GET    /ocorrencias/:id  -> busca uma
router.get("/:id", ocorrenciasController.buscarPorId);

// POST   /ocorrencias      -> cria uma nova
router.post("/", ocorrenciasController.criar);

// PUT    /ocorrencias/:id  -> atualiza
router.put("/:id", ocorrenciasController.atualizar);

// DELETE /ocorrencias/:id  -> remove
router.delete("/:id", ocorrenciasController.excluir);

module.exports = router;
