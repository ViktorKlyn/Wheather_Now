// Controller: recebe a requisição HTTP, chama o model e devolve a resposta
const ocorrenciaModel = require("../models/ocorrenciaModel");
const database = require("../db");

function idValido(id) {
  return /^\d+$/.test(id) && Number.isSafeInteger(Number(id)) && Number(id) > 0;
}

function dadosValidos({ data, descricao }) {
  const dataValida =
    typeof data === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(data) &&
    !Number.isNaN(Date.parse(`${data}T00:00:00Z`)) &&
    new Date(`${data}T00:00:00Z`).toISOString().slice(0, 10) === data;

  return (
    dataValida &&
    typeof descricao === "string" &&
    descricao.trim().length > 0
  );
}

const ocorrenciasController = {
  // GET /ocorrencias
  async listar(req, res) {
    try {
      const resultado = await ocorrenciaModel.listar(await database.getDemoUserId());
      return res.json(resultado.rows);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ erro: "Erro ao listar ocorrências" });
    }
  },

  // GET /ocorrencias/:id
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      if (!idValido(id)) {
        return res.status(400).json({ erro: "ID inválido" });
      }
      const resultado = await ocorrenciaModel.buscarPorId(
        id,
        await database.getDemoUserId()
      );

      if (resultado.rows.length === 0) {
        return res.status(404).json({ erro: "Ocorrência não encontrada" });
      }

      return res.json(resultado.rows[0]);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ erro: "Erro ao buscar ocorrência" });
    }
  },

  // POST /ocorrencias
  async criar(req, res) {
    try {
      const { data, descricao } = req.body || {};

      if (!dadosValidos({ data, descricao })) {
        return res.status(400).json({
          erro: "Informe uma data válida e uma descrição"
        });
      }

      const resultado = await ocorrenciaModel.criar({
        data,
        descricao: descricao.trim(),
        usuario_id: await database.getDemoUserId()
      });
      return res.status(201).json(resultado.rows[0]);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ erro: "Erro ao criar ocorrência" });
    }
  },

  // PUT /ocorrencias/:id
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { data, descricao } = req.body || {};

      if (!idValido(id)) {
        return res.status(400).json({ erro: "ID inválido" });
      }
      if (!dadosValidos({ data, descricao })) {
        return res.status(400).json({
          erro: "Informe uma data válida e uma descrição"
        });
      }

      const usuarioId = await database.getDemoUserId();
      const resultado = await ocorrenciaModel.atualizar(id, {
        data,
        descricao: descricao.trim(),
      }, usuarioId);

      if (resultado.rows.length === 0) {
        return res.status(404).json({ erro: "Ocorrência não encontrada" });
      }

      return res.json(resultado.rows[0]);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ erro: "Erro ao atualizar ocorrência" });
    }
  },

  // DELETE /ocorrencias/:id
  async excluir(req, res) {
    try {
      const { id } = req.params;
      if (!idValido(id)) {
        return res.status(400).json({ erro: "ID inválido" });
      }
      const resultado = await ocorrenciaModel.excluir(
        id,
        await database.getDemoUserId()
      );

      if (resultado.rows.length === 0) {
        return res.status(404).json({ erro: "Ocorrência não encontrada" });
      }

      return res.json({ mensagem: "Ocorrência excluída com sucesso" });
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ erro: "Erro ao excluir ocorrência" });
    }
  }
};

module.exports = ocorrenciasController;
