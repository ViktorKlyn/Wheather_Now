const express = require("express");
const contatoApoioController = require("../controllers/contatoApoioController");

const router = express.Router();

router.get("/", contatoApoioController.listar);
router.get("/:id", contatoApoioController.buscarPorId);
router.post("/", contatoApoioController.criar);
router.put("/:id", contatoApoioController.atualizar);
router.delete("/:id", contatoApoioController.excluir);

module.exports = router;
