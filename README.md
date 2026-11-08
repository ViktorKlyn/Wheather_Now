# Weather Now — Aplicativo de Apoio Camuflado

> Projeto Integrador · 2º Semestre de 2026  
> Tema: violência contra a mulher em contexto de apoio e proteção.

O Weather Now aparenta ser um aplicativo de previsão do tempo e possui uma área
reservada para registrar ocorrências, manter contatos de confiança e simular
alertas SOS em ambiente acadêmico.

## Estrutura

- `backend/`: API Express, esquema PostgreSQL e conexão de banco.
- `dashboard/`: painel web de monitoramento dos alertas.
- `moblie/`: app Expo/React Native (o diretório se chama `moblie` no repositório).
- `src/`: frontend Vite do aplicativo de clima.
- `data-science/` e `docs/`: materiais da entrega acadêmica.

## Requisitos

- Node.js 18+ e NPM.
- PostgreSQL 14+ — requisito da Entrega 2.
- Expo é executado pelos scripts locais do projeto mobile.

## Backend e banco de dados

Inicie o serviço PostgreSQL e crie o banco `weather_now` (por exemplo, pelo
pgAdmin ou com `createdb -U postgres weather_now`). Em seguida:

```powershell
cd backend
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
```

Edite `backend/.env`, mantendo `DB_DRIVER=postgres`, e configure `DATABASE_URL`
ou `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` e `DB_NAME`. Não compartilhe
nem versione credenciais. A inicialização da API aplica o esquema e as
alterações aditivas necessárias; não apaga tabelas ou registros existentes.

```powershell
npm install
npm run dev
```

A API fica em `http://localhost:3001`. PostgreSQL é o modo padrão e o exigido
para demonstrar a Entrega 2. PGlite está disponível apenas como alternativa
local de desenvolvimento, com `DB_DRIVER=pglite`; nesse modo, configure
`PGLITE_DATA_DIR` se desejar escolher outro diretório persistente.

A usuária fictícia é identificada pela chave estável `weather_now_demo`.
O backend resolve o ID existente em cada inicialização e associa ocorrências,
contatos e alertas a esse usuário, sem depender de um ID numérico fixo enviado
pelo aplicativo.

### Endpoints principais

- Ocorrências: `GET/POST /ocorrencias`, `GET/PUT/DELETE /ocorrencias/:id`.
- Rede de apoio: `GET/POST /contatos-apoio`,
  `GET/PUT/DELETE /contatos-apoio/:id`.
- Alertas: `GET/POST /alertas`, `PATCH /alertas/:id/status`.

## Aplicativo de clima (Vite)

Na raiz do repositório:

```powershell
npm install
npm run dev
```

O Vite informa o endereço local da interface pública de clima.

## Aplicativo mobile (Expo)

Mantenha a API iniciada. No navegador do mesmo computador, `localhost` funciona
como endereço da API. Para Android emulador, configure
`EXPO_PUBLIC_API_URL=http://10.0.2.2:3001`; para dispositivo físico, use o IP do
computador na rede local.

```powershell
cd moblie
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
npm install
npm run web
```

O SOS solicita permissão de localização quando acionado. Se ela for negada ou
a posição não puder ser obtida, registra as coordenadas fictícias de demonstração
e identifica o alerta como simulado. Nenhum alerta é enviado a serviços reais.

## Dashboard

Com a API em execução, em outro terminal:

```powershell
cd dashboard
python -m http.server 8000
```

Abra `http://localhost:8000`. O painel consulta `http://localhost:3001/alertas`,
atualiza automaticamente a cada 8 segundos e permite alterar o status dos
alertas demonstrativos. Para usar outra URL da API, informe o parâmetro
`?api=http://host:porta` na URL do painel.

## Passo a passo para demonstração

1. Inicie PostgreSQL, API, Expo Web e dashboard em terminais separados.
2. Abra o app de clima e toque cinco vezes em “Londrina”.
3. Digite o PIN demonstrativo `1234`.
4. Crie, liste, edite e exclua uma ocorrência e um contato de apoio.
5. Registre um SOS demonstrativo e confirme sua aparição no dashboard.
6. Use “Sair” no cabeçalho de uma tela reservada. O app retorna ao clima, limpa
   os dados sensíveis do estado em memória e exige o PIN novamente.

## Limitações

- É um protótipo acadêmico, não um serviço real de emergência.
- Os alertas SOS são demonstrativos e não contatam autoridades.
- A autenticação por PIN é apenas demonstrativa e não substitui autenticação
  apropriada para produção.
