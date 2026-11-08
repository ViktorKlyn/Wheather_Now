const contatoApoioModel = require("../models/contatoApoioModel");

function idValido(id) {
  return /^\d+$/.test(id) && Number.isSafeInteger(Number(id)) && Number(id) > 0;
}

function usuarioValido(usuarioId) {
  return Number.isSafeInteger(Number(usuarioId)) && Number(usuarioId) > 0;
}

function contatoValido({ nome, telefone, grau_relacionamento, usuario_id }) {
  const nomeValido = typeof nome === "string" && nome.trim().length >= 2;
  const telefoneValido =
    typeof telefone === "string" && /^\+?[0-9()\-\s]{8,20}$/.test(telefone.trim());
  const grauValido =
    typeof grau_relacionamento === "string" && grau_relacionamento.trim().length >= 2;
  return nomeValido && telefoneValido && grauValido && usuarioValido(usuario_id);
}

const contatoApoioController = {
  async listar(req, res) {
    try {
      const usuarioId = Number(req.query.usuario_id ?? 1);
      if (!usuarioValido(usuarioId)) {
        return res.status(400).json({ erro: "usuario_id inválido" });
      }

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
      const usuarioId = Number(req.query.usuario_id ?? 1);
      if (!idValido(id) || !usuarioValido(usuarioId)) {
        return res.status(400).json({ erro: "ID ou usuario_id inválido" });
      }

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
      const { nome, telefone, grau_relacionamento, usuario_id } = req.body || {};

      if (!contatoValido({ nome, telefone, grau_relacionamento, usuario_id })) {
        return res.status(400).json({
          erro: "Informe nome, telefone, grau de relacionamento e usuario_id válidos",
        });
      }

      const resultado = await contatoApoioModel.criar({
        nome: nome.trim(),
        telefone: telefone.trim(),
        grau_relacionamento: grau_relacionamento.trim(),
        usuario_id: Number(usuario_id),
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
      const { nome, telefone, grau_relacionamento, usuario_id } = req.body || {};

      if (!idValido(id) || !contatoValido({ nome, telefone, grau_relacionamento, usuario_id })) {
        return res.status(400).json({
          erro: "Informe dados válidos para atualizar o contato",
        });
      }

      const resultado = await contatoApoioModel.atualizar(id, {
        nome: nome.trim(),
        telefone: telefone.trim(),
        grau_relacionamento: grau_relacionamento.trim(),
        usuario_id: Number(usuario_id),
      });

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
      const usuarioId = Number(req.query.usuario_id ?? 1);

      if (!idValido(id) || !usuarioValido(usuarioId)) {
        return res.status(400).json({ erro: "ID ou usuario_id inválido" });
      }

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
