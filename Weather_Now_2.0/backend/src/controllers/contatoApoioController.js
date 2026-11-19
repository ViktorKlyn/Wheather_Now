const contatoApoioModel = require("../models/contatoApoioModel");
const database = require("../db");

function idValido(id) {
  return /^\d+$/.test(id) && Number.isSafeInteger(Number(id)) && Number(id) > 0;
}

function contatoValido({ nome, telefone, grau_relacionamento }) {
  const nomeValido = typeof nome === "string" && nome.trim().length >= 2;
  const telefoneValido =
    typeof telefone === "string" && /^\+?[0-9()\-\s]{8,20}$/.test(telefone.trim());
  const grauValido =
    typeof grau_relacionamento === "string" && grau_relacionamento.trim().length >= 2;
  return nomeValido && telefoneValido && grauValido;
}

const contatoApoioController = {
  async listar(req, res) {
    try {
      const usuarioId = await database.getDemoUserId();
      const resultado = await contatoApoioModel.listar(usuarioId);
      return res.json(resultado.rows);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ erro: "Erro ao listar contatos de apoio" });
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      if (!idValido(id)) {
        return res.status(400).json({ erro: "ID inválido" });
      }

      const usuarioId = await database.getDemoUserId();
      const resultado = await contatoApoioModel.buscarPorId(id, usuarioId);
      if (resultado.rows.length === 0) {
        return res.status(404).json({ erro: "Contato não encontrado" });
      }

      return res.json(resultado.rows[0]);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ erro: "Erro ao buscar contato" });
    }
  },

  async criar(req, res) {
    try {
      const { nome, telefone, grau_relacionamento } = req.body || {};

      if (!contatoValido({ nome, telefone, grau_relacionamento })) {
        return res.status(400).json({
          erro: "Informe nome, telefone e grau de relacionamento válidos",
        });
      }

      const resultado = await contatoApoioModel.criar({
        nome: nome.trim(),
        telefone: telefone.trim(),
        grau_relacionamento: grau_relacionamento.trim(),
        usuario_id: await database.getDemoUserId(),
      });

      return res.status(201).json(resultado.rows[0]);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ erro: "Erro ao criar contato" });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, telefone, grau_relacionamento } = req.body || {};

      if (!idValido(id) || !contatoValido({ nome, telefone, grau_relacionamento })) {
        return res.status(400).json({
          erro: "Informe dados válidos para atualizar o contato",
        });
      }

      const usuarioId = await database.getDemoUserId();
      const resultado = await contatoApoioModel.atualizar(id, {
        nome: nome.trim(),
        telefone: telefone.trim(),
        grau_relacionamento: grau_relacionamento.trim(),
      }, usuarioId);

      if (resultado.rows.length === 0) {
        return res.status(404).json({ erro: "Contato não encontrado" });
      }

      return res.json(resultado.rows[0]);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ erro: "Erro ao atualizar contato" });
    }
  },

  async excluir(req, res) {
    try {
      const { id } = req.params;
      if (!idValido(id)) {
        return res.status(400).json({ erro: "ID inválido" });
      }

      const usuarioId = await database.getDemoUserId();
      const resultado = await contatoApoioModel.excluir(id, usuarioId);
      if (resultado.rows.length === 0) {
        return res.status(404).json({ erro: "Contato não encontrado" });
      }

      return res.json({ mensagem: "Contato excluído com sucesso" });
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ erro: "Erro ao excluir contato" });
    }
  },
};

module.exports = contatoApoioController;
