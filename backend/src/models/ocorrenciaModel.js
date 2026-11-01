// Model: única camada que fala com o banco de dados
const pool = require("../db");

const ocorrenciaModel = {
  // SELECT * : lista todas as ocorrências
  listar() {
    return pool.query(
      "SELECT id, data, descricao, usuario_id FROM ocorrencias ORDER BY id"
    );
  },

  // Busca uma ocorrência pelo id
  buscarPorId(id) {
    return pool.query(
      "SELECT id, data, descricao, usuario_id FROM ocorrencias WHERE id = $1",
      [id]
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
  atualizar(id, { data, descricao, usuario_id }) {
    return pool.query(
      "UPDATE ocorrencias SET data = $1, descricao = $2, usuario_id = $3 WHERE id = $4 RETURNING *",
      [data, descricao, usuario_id, id]
    );
  },

  // DELETE : remove pelo id
  excluir(id) {
    return pool.query("DELETE FROM ocorrencias WHERE id = $1 RETURNING *", [id]);
  }
};

module.exports = ocorrenciaModel;
