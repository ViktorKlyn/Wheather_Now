# Weather Now — Entrega 2

Entrega acadêmica com uma API Express e PostgreSQL, mais uma interface Expo
simples. O frontend Vite que já existia foi preservado; o aplicativo móvel está
na pasta `moblie`.

## Banco e API

1. Crie um banco PostgreSQL chamado `weather_now`.
2. Copie `backend/.env.example` para `backend/.env` e ajuste os dados locais.
   Não substitua um `.env` existente sem preservar suas configurações.
3. Execute `backend/database/schema.sql` conectado ao banco `weather_now`.
4. No terminal, instale as dependências e inicie a API:

   ```powershell
   cd backend
   npm install
   npm run dev
   ```

A API fica em `http://localhost:3001`. As rotas de ocorrências são:

- `GET /ocorrencias` e `GET /ocorrencias/:id`
- `POST /ocorrencias` e `PUT /ocorrencias/:id` — recebem `data`
  (`AAAA-MM-DD`), `descricao` e `usuario_id` no JSON.
- `DELETE /ocorrencias/:id`

O campo `usuario_id` é informado pelo formulário; como esta entrega não inclui
cadastro de usuários, o valor inicial no app é `1`.

## Aplicativo Expo

Configure o endereço da API em `moblie/.env` copiando `moblie/.env.example`.
`localhost` funciona para simuladores que compartilham o host do computador.
No emulador Android, use `http://10.0.2.2:3001`; em um aparelho físico, use o IP
local do computador na rede Wi-Fi.

```powershell
cd moblie
npm install
npm start
```

Para abrir no navegador, inicie a API em um terminal e, em outro, execute:

```powershell
cd moblie
npm run web
```

O Expo abrirá o app no navegador, normalmente em `http://localhost:8081`.
Na web, o endereço padrão `http://localhost:3001` da API funciona se ela estiver
rodando no mesmo computador.

O app exibe uma previsão fictícia. Cinco toques em “Londrina” abrem a tela do
PIN (`1234`); o menu secreto permite criar, listar, editar e excluir ocorrências
e exibe uma confirmação simples para o botão SOS.
