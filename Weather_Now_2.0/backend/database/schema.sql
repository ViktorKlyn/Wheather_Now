-- schema.sql — Banco de dados do Weather Now (Entrega 2 + extensões de apoio)
-- Execute conectado ao banco weather_now:
--   psql -U postgres -d weather_now -f database/schema.sql

-- ── Tabela de usuárias ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS usuarios (
  id         SERIAL PRIMARY KEY,
  nome       VARCHAR(120) NOT NULL,
  pin_hash   VARCHAR(64) NOT NULL,
  codigo     VARCHAR(80),
  criado_em  TIMESTAMP NOT NULL DEFAULT NOW()
);

ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS codigo VARCHAR(80);
CREATE UNIQUE INDEX IF NOT EXISTS idx_usuarios_codigo ON usuarios(codigo);

-- ── Tabela de ocorrências ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ocorrencias (
  id          SERIAL PRIMARY KEY,
  data        DATE NOT NULL,
  descricao   TEXT NOT NULL,
  usuario_id   INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  criado_em   TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ── Tabela de contatos de apoio ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contatos_apoio (
  id                    SERIAL PRIMARY KEY,
  nome                  VARCHAR(120) NOT NULL,
  telefone              VARCHAR(30) NOT NULL,
  grau_relacionamento   VARCHAR(80) NOT NULL,
  usuario_id            INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  criado_em             TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ── Tabela de alertas SOS demonstrativos ───────────────────────────────────
CREATE TABLE IF NOT EXISTS alertas_sos (
  id                    SERIAL PRIMARY KEY,
  usuario_id            INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  latitude              DOUBLE PRECISION NOT NULL,
  longitude             DOUBLE PRECISION NOT NULL,
  data_hora             TIMESTAMP NOT NULL DEFAULT NOW(),
  status                VARCHAR(20) NOT NULL DEFAULT 'PENDENTE' CHECK (status IN ('PENDENTE', 'ATENDIDO', 'IGNORADO')),
  tipo_alerta           VARCHAR(60) NOT NULL DEFAULT 'SOS',
  localizacao_simulada  BOOLEAN NOT NULL DEFAULT FALSE,
  criado_em             TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ── Índices ────────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_ocorrencias_usuario ON ocorrencias(usuario_id);
CREATE INDEX IF NOT EXISTS idx_contatos_apoio_usuario ON contatos_apoio(usuario_id);
CREATE INDEX IF NOT EXISTS idx_alertas_sos_usuario ON alertas_sos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_alertas_sos_status ON alertas_sos(status);

-- ── Usuária de demonstração com identificação estável ────────────────────────
UPDATE usuarios
SET codigo = 'weather_now_demo'
WHERE id = (
  SELECT id FROM usuarios
  WHERE nome = 'Usuária Padrão' AND codigo IS NULL
  ORDER BY id
  LIMIT 1
)
AND NOT EXISTS (
  SELECT 1 FROM usuarios WHERE codigo = 'weather_now_demo'
);

INSERT INTO usuarios (nome, pin_hash, codigo)
VALUES (
  'Usuária Padrão',
  '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
  'weather_now_demo'
)
ON CONFLICT (codigo) DO NOTHING;

-- ── Contatos de demonstração ─────────────────────────────────────────────────
INSERT INTO contatos_apoio (nome, telefone, grau_relacionamento, usuario_id)
SELECT valores.nome, valores.telefone, valores.grau_relacionamento, u.id
FROM (
  VALUES
    ('Mãe', '(11) 99999-1234', 'Família'),
    ('Melhor amiga', '(11) 98888-4321', 'Amiga'),
    ('Vizinha', '(11) 97777-1111', 'Vizinhança')
) AS valores(nome, telefone, grau_relacionamento)
CROSS JOIN usuarios u
WHERE u.codigo = 'weather_now_demo'
  AND NOT EXISTS (
    SELECT 1 FROM contatos_apoio c
    WHERE c.usuario_id = u.id AND c.nome = valores.nome
  );
