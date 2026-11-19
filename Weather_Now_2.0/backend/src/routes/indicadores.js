// Indicadores agregados, gerados pelo notebook com base pública real.
// Não consulta dados pessoais nem calcula risco de uma usuária.
const express = require("express");
const fs = require("node:fs/promises");
const path = require("node:path");
const router = express.Router();
const arquivo = path.join(__dirname, "..", "..", "data-science", "indicadores.json");

router.get("/", async (req, res) => {
  try {
    const conteudo = JSON.parse(await fs.readFile(arquivo, "utf8"));
    res.set("Cache-Control", "no-store");
    return res.json(conteudo);
  } catch (erro) {
    console.error("Não foi possível carregar o arquivo de indicadores:", erro.message);
    return res.status(503).json({ erro: "Indicadores indisponíveis. Execute o notebook de Data Science." });
  }
});

module.exports = router;
