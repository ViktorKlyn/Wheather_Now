const express = require("express");
const alertaController = require("../controllers/alertaController");

const router = express.Router();

router.get("/", alertaController.listar);
router.get("/:id", alertaController.buscarPorId);
router.post("/", alertaController.criar);
router.patch("/:id/status", alertaController.atualizarStatus);
router.delete("/:id", alertaController.excluir);

module.exports = router;
