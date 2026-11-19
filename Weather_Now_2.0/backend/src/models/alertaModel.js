const pool = require("../db");

const alertaModel = {
  listar() {
    return pool.query(
      "SELECT a.*, u.nome AS usuario_nome FROM alertas_sos a JOIN usuarios u ON u.id = a.usuario_id ORDER BY a.criado_em DESC, a.id DESC"
    );
  },

  buscarPorId(id) {
    return pool.query("SELECT a.*, u.nome AS usuario_nome FROM alertas_sos a JOIN usuarios u ON u.id = a.usuario_id WHERE a.id = $1", [id]);
  },

  criar({ usuario_id, latitude, longitude, data_hora, status, tipo_alerta, localizacao_simulada }) {
    return pool.query(
      "INSERT INTO alertas_sos (usuario_id, latitude, longitude, data_hora, status, tipo_alerta, localizacao_simulada) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [usuario_id, latitude, longitude, data_hora, status, tipo_alerta, localizacao_simulada]
    );
  },

  atualizar(id, { latitude, longitude, data_hora, status, tipo_alerta, localizacao_simulada }) {
    return pool.query(
      "UPDATE alertas_sos SET latitude = $1, longitude = $2, data_hora = $3, status = $4, tipo_alerta = $5, localizacao_simulada = $6 WHERE id = $7 RETURNING *",
      [latitude, longitude, data_hora, status, tipo_alerta, localizacao_simulada, id]
    );
  },

  atualizarStatus(id, status) {
    return pool.query(
      "UPDATE alertas_sos SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
  },

  excluir(id) {
    return pool.query("DELETE FROM alertas_sos WHERE id = $1 RETURNING *", [id]);
  },
};

module.exports = alertaModel;
