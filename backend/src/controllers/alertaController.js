const alertaModel = require("../models/alertaModel");
const database = require("../db");

function idValido(id) {
  return /^\d+$/.test(id) && Number.isSafeInteger(Number(id)) && Number(id) > 0;
}

function latitudeValida(valor) {
  if (
    (typeof valor !== "number" && typeof valor !== "string") ||
    (typeof valor === "string" && valor.trim() === "")
  ) return false;
  const numero = Number(valor);
  return Number.isFinite(numero) && numero >= -90 && numero <= 90;
}

function longitudeValida(valor) {
  if (
    (typeof valor !== "number" && typeof valor !== "string") ||
    (typeof valor === "string" && valor.trim() === "")
  ) return false;
  const numero = Number(valor);
  return Number.isFinite(numero) && numero >= -180 && numero <= 180;
}

function alertaValido({
  latitude,
  longitude,
  tipo_alerta,
  status,
  data_hora,
  localizacao_simulada,
}) {
  return (
    latitudeValida(latitude) &&
    longitudeValida(longitude) &&
    typeof tipo_alerta === "string" && tipo_alerta.trim().length > 0 &&
    ["PENDENTE", "ATENDIDO", "IGNORADO"].includes(status) &&
    (data_hora === undefined ||
      (typeof data_hora === "string" && !Number.isNaN(Date.parse(data_hora)))) &&
    (localizacao_simulada === undefined || typeof localizacao_simulada === "boolean")
  );
}

const alertaController = {
  async listar(req, res) {
    try {
      const resultado = await alertaModel.listar();
      return res.json(resultado.rows);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ erro: "Erro ao listar alertas SOS" });
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      if (!idValido(id)) {
        return res.status(400).json({ erro: "ID inválido" });
      }

      const resultado = await alertaModel.buscarPorId(id);
      if (resultado.rows.length === 0) {
        return res.status(404).json({ erro: "Alerta não encontrado" });
      }

      return res.json(resultado.rows[0]);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ erro: "Erro ao buscar alerta" });
    }
  },

  async criar(req, res) {
    try {
      const { latitude, longitude, data_hora, status, tipo_alerta, localizacao_simulada } = req.body || {};
      const statusNormalizado =
        status === undefined
          ? "PENDENTE"
          : typeof status === "string"
            ? status.toUpperCase()
            : "";

      if (!alertaValido({
        latitude,
        longitude,
        tipo_alerta,
        status: statusNormalizado,
        data_hora,
        localizacao_simulada,
      })) {
        return res.status(400).json({
          erro: "Informe localização, data, status e tipo_alerta válidos",
        });
      }

      const resultado = await alertaModel.criar({
        usuario_id: await database.getDemoUserId(),
        latitude: Number(latitude),
        longitude: Number(longitude),
        data_hora: data_hora ?? new Date().toISOString(),
        status: statusNormalizado,
        tipo_alerta: tipo_alerta.trim(),
        localizacao_simulada: localizacao_simulada ?? false,
      });

      return res.status(201).json(resultado.rows[0]);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ erro: "Erro ao registrar alerta SOS" });
    }
  },

  async atualizarStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body || {};
      const statusNormalizado = String(status || "").toUpperCase();

      if (!idValido(id) || !["PENDENTE", "ATENDIDO", "IGNORADO"].includes(statusNormalizado)) {
        return res.status(400).json({ erro: "Status inválido" });
      }

      const resultado = await alertaModel.atualizarStatus(id, statusNormalizado);
      if (resultado.rows.length === 0) {
        return res.status(404).json({ erro: "Alerta não encontrado" });
      }

      return res.json(resultado.rows[0]);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ erro: "Erro ao atualizar status do alerta" });
    }
  },

  async excluir(req, res) {
    try {
      const { id } = req.params;
      if (!idValido(id)) {
        return res.status(400).json({ erro: "ID inválido" });
      }

      const resultado = await alertaModel.excluir(id);
      if (resultado.rows.length === 0) {
        return res.status(404).json({ erro: "Alerta não encontrado" });
      }

      return res.json({ mensagem: "Alerta excluído com sucesso" });
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ erro: "Erro ao excluir alerta" });
    }
  },
};

module.exports = alertaController;
