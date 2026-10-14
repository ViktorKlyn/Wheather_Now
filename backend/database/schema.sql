-- Cria o banco de dados (rode este comando separado no psql se preferir):
-- CREATE DATABASE weather_now;

-- Tabela de ocorrências: registros da área secreta do aplicativo
CREATE TABLE IF NOT EXISTS ocorrencias (
  id SERIAL PRIMARY KEY,          -- identificador gerado automaticamente
  data DATE NOT NULL,             -- data da ocorrência
  descricao TEXT NOT NULL,        -- texto descrevendo o que aconteceu
  usuario_id INTEGER NOT NULL     -- id do usuário (sem tabela de usuários neste momento)
);
