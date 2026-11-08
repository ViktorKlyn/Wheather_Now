const pool = require("../db");

const contatoApoioModel = {
  listar(usuarioId) {
    return pool.query(
      "SELECT * FROM contatos_apoio WHERE usuario_id = $1 ORDER BY id",
      [usuarioId]
    );
  },

  buscarPorId(id, usuarioId) {
    return pool.query(
      "SELECT * FROM contatos_apoio WHERE id = $1 AND usuario_id = $2",
      [id, usuarioId]
    );
  },

  criar({ nome, telefone, grau_relacionamento, usuario_id }) {
    return pool.query(
      "INSERT INTO contatos_apoio (nome, telefone, grau_relacionamento, usuario_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [nome, telefone, grau_relacionamento, usuario_id]
    );
  },

  atualizar(id, { nome, telefone, grau_relacionamento, usuario_id }) {
    return pool.query(
      "UPDATE contatos_apoio SET nome = $1, telefone = $2, grau_relacionamento = $3, usuario_id = $4 WHERE id = $5 RETURNING *",
      [nome, telefone, grau_relacionamento, usuario_id, id]
    );
  },

  excluir(id, usuarioId) {
    return pool.query(
      "DELETE FROM contatos_apoio WHERE id = $1 AND usuario_id = $2 RETURNING *",
      [id, usuarioId]
    );
  },
};

module.exports = contatoApoioModel;
