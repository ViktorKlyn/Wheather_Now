# Weather Now — Entrega 2

Entrega acadêmica com API Express, PostgreSQL e aplicativo Expo. O frontend
Vite já existente foi preservado; o aplicativo móvel está em `moblie`.

## PostgreSQL e API

PostgreSQL 14+ é o banco exigido nesta entrega.

1. Inicie PostgreSQL e crie o banco `weather_now`.
2. Copie `backend/.env.example` para `backend/.env` sem sobrescrever arquivos
   locais existentes.
3. Configure `DB_DRIVER=postgres` e os parâmetros de conexão.
4. Inicie a API:

   ```powershell
   cd backend
   npm install
   npm run dev
   ```

Ao iniciar, a API aplica as definições e migrações aditivas do
`backend/database/schema.sql`. A inicialização não remove tabelas nem registros.
O banco deve existir previamente. A API fica em `http://localhost:3001`.

PGlite está disponível apenas como alternativa de desenvolvimento local, usando
`DB_DRIVER=pglite`; essa configuração não comprova o requisito acadêmico de
PostgreSQL tradicional.

A usuária fictícia é localizada por `codigo = 'weather_now_demo'`. O backend usa
o ID existente no banco para associar ocorrências, contatos e alertas. O cliente
não precisa enviar um ID numérico fixo.

Rotas:

- Ocorrências: `GET/POST /ocorrencias`,
  `GET/PUT/DELETE /ocorrencias/:id`.
- Rede de apoio: `GET/POST /contatos-apoio`,
  `GET/PUT/DELETE /contatos-apoio/:id`.
- SOS: `GET/POST /alertas`, `PATCH /alertas/:id/status`.

## Aplicativo Expo

Configure o endereço da API em `moblie/.env`, copiando
`moblie/.env.example`. `localhost` funciona no navegador do próprio computador.
No emulador Android use `http://10.0.2.2:3001`; em um aparelho físico use o IP
local do computador.

```powershell
cd moblie
npm install
npm run web
```

O Expo Web normalmente abre em `http://localhost:8081`. O app apresenta clima
fictício; cinco toques em “Londrina” abrem o PIN demonstrativo `1234`.

O SOS solicita permissão com `expo-location`. Sem permissão ou sem posição
disponível, usa coordenadas fictícias e identifica o registro como simulado.
Nenhum alerta é enviado a serviços reais.

## Interface pública e dashboard

Na raiz, `npm run dev` inicia o frontend Vite. Com a API em execução, o dashboard
pode ser aberto servindo `dashboard/`:

```powershell
cd dashboard
python -m http.server 8000
```

O painel fica em `http://localhost:8000`, consulta a API e atualiza os alertas
automaticamente a cada 8 segundos. Também permite alterar o status dos alertas.
