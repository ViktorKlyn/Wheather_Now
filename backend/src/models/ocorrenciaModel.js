// Model: única camada que fala com o banco de dados
const pool = require("../db");

const ocorrenciaModel = {
  // SELECT * : lista todas as ocorrências
  listar(usuarioId) {
    return pool.query(
      "SELECT id, data, descricao, usuario_id FROM ocorrencias WHERE usuario_id = $1 ORDER BY id",
      [usuarioId]
    );
  },

  // Busca uma ocorrência pelo id
  buscarPorId(id, usuarioId) {
    return pool.query(
      "SELECT id, data, descricao, usuario_id FROM ocorrencias WHERE id = $1 AND usuario_id = $2",
      [id, usuarioId]
    );
  },

  // INSERT : cria um novo registro
  criar({ data, descricao, usuario_id }) {
    return pool.query(
      "INSERT INTO ocorrencias (data, descricao, usuario_id) VALUES ($1, $2, $3) RETURNING *",
      [data, descricao, usuario_id]
    );
  },

  // UPDATE : altera um registro existente
  atualizar(id, { data, descricao }, usuarioId) {
    return pool.query(
      "UPDATE ocorrencias SET data = $1, descricao = $2 WHERE id = $3 AND usuario_id = $4 RETURNING *",
      [data, descricao, id, usuarioId]
    );
  },

  // DELETE : remove pelo id
  excluir(id, usuarioId) {
    return pool.query(
      "DELETE FROM ocorrencias WHERE id = $1 AND usuario_id = $2 RETURNING *",
      [id, usuarioId]
    );
  }
};

module.exports = ocorrenciaModel;
