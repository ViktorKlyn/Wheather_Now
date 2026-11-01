-- schema.sql — Banco de dados do Weather Now (Entrega 2)
-- Execute conectado ao banco weather_now:
--   psql -U postgres -d weather_now -f database/schema.sql

-- ── Tabela de usuárias ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS usuarios (
  id         SERIAL PRIMARY KEY,                    -- PK gerada automaticamente
  nome       VARCHAR(120) NOT NULL,                 -- nome da usuária (pode ser apelido)
  pin_hash   VARCHAR(64)  NOT NULL,                 -- hash SHA-256 do PIN (nunca texto puro)
  criado_em  TIMESTAMP    NOT NULL DEFAULT NOW()    -- data de cadastro
);

-- ── Tabela de ocorrências ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ocorrencias (
  id          SERIAL  PRIMARY KEY,                  -- PK gerada automaticamente
  data        DATE    NOT NULL,                     -- data da ocorrência (AAAA-MM-DD)
  descricao   TEXT    NOT NULL,                     -- descrição livre do evento
  usuario_id  INTEGER NOT NULL                      -- FK → usuarios.id
    REFERENCES usuarios(id) ON DELETE CASCADE,
  criado_em   TIMESTAMP NOT NULL DEFAULT NOW()      -- data de registro
);

-- ── Índice para buscas por usuária ──────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_ocorrencias_usuario ON ocorrencias(usuario_id);

-- ── Usuária padrão para testes (PIN = 1234 → hash SHA-256) ──────────────────
-- ATENÇÃO: remover ou alterar antes de uso real
INSERT INTO usuarios (nome, pin_hash)
VALUES (
  'Usuária Padrão',
  '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4'  -- SHA-256("1234")
)
ON CONFLICT DO NOTHING;
