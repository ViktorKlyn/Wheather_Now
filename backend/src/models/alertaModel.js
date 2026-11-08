const pool = require("../db");

const alertaModel = {
  listar() {
    return pool.query(
      "SELECT * FROM alertas_sos ORDER BY criado_em DESC, id DESC"
    );
  },

  buscarPorId(id) {
    return pool.query("SELECT * FROM alertas_sos WHERE id = $1", [id]);
  },

  criar({ usuario_id, latitude, longitude, data_hora, status, tipo_alerta, localizacao_simulada }) {
    return pool.query(
      "INSERT INTO alertas_sos (usuario_id, latitude, longitude, data_hora, status, tipo_alerta, localizacao_simulada) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [usuario_id, latitude, longitude, data_hora, status, tipo_alerta, localizacao_simulada]
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
