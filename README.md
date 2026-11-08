# Weather Now — Aplicativo de Apoio Camuflado

> Projeto Integrador · 2º Semestre de 2026  
> Tema: violência contra a mulher em contexto de apoio e proteção.

O Weather Now aparenta ser um aplicativo de previsão do tempo, mas oferece uma área reservada para registrar ocorrências, manter contatos de confiança e simular alertas SOS em ambiente acadêmico.

---

## Objetivo

- manter a aparência de um app comum de clima;
- permitir acesso discreto por PIN demonstrativo;
- registrar ocorrências e rede de apoio;
- simular alertas para fins de estudo e demonstração;
- preservar a arquitetura de backend e mobile existentes.

---

## Estrutura do repositório

```text
/
├── backend/                   # API Express + PostgreSQL
│   ├── database/
│   │   └── schema.sql         # tabelas de usuários, ocorrências, contatos e alertas
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── db.js
│   │   ├── index.js
│   │   └── routes/index.js
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
├── dashboard/                 # painel web de monitoramento dos alertas
│   ├── index.html
│   └── app.js
├── moblie/                    # app Expo (React Native)
│   ├── src/
│   ├── .env.example
│   ├── App.js
│   ├── app.json
│   └── package.json
├── src/                       # frontend web de clima (Vite)
├── data-science/
├── docs/
├── README.md
├── USO_IA.md
├── CHECKLIST_ENTREGA.md
└── package.json
```

---

## Tecnologias

- React / Vite (disfarce público do clima)
- Expo + React Native
- React Navigation (Stack / Tab / Drawer)
- Redux Toolkit
- Node.js + Express
- PostgreSQL
- Fetch REST

---

## Pré-requisitos

- Node.js 18+
- NPM
- Expo CLI para execução do app mobile
- PostgreSQL 14+ apenas se optar por usar um banco externo

## Aplicação web (Vite)

O frontend web fica na raiz do repositório. Para iniciá-lo:

```powershell
npm install
npm run dev
```

O Vite informará o endereço local da aplicação. Backend e mobile são projetos
separados e devem ser iniciados em suas respectivas pastas.

---

## Configuração do backend

```powershell
cd backend
npm install
npm run dev
```

A API fica em `http://localhost:3001`. Por padrão, usa PGlite e cria as tabelas
automaticamente; no Windows, os dados locais são persistidos em
`%LOCALAPPDATA%\Weather Now\weather_now_v2`.
Dados de instalações anteriores em `%LOCALAPPDATA%\Weather Now\weather_now`
permanecem preservados e não são migrados automaticamente.
Para usar PostgreSQL externo, copie `.env.example` para `.env`, configure
`DATABASE_URL` ou `DB_HOST` e crie o banco antes de iniciar a API.

### Endpoints principais

- `GET /ocorrencias`
- `GET /ocorrencias/:id`
- `POST /ocorrencias`
- `PUT /ocorrencias/:id`
- `DELETE /ocorrencias/:id`
- `GET /contatos-apoio?usuario_id=1`
- `POST /contatos-apoio`
- `PUT /contatos-apoio/:id`
- `DELETE /contatos-apoio/:id`
- `GET /alertas`
- `POST /alertas`
- `PATCH /alertas/:id/status`

---

## Configuração do mobile

Mantenha o backend iniciado em outro terminal antes de usar os formulários do app.
No navegador do mesmo computador, a URL padrão da API é `http://localhost:3001`.

```powershell
cd moblie
copy .env.example .env
npm install
npm run web
```

Para Android emulador: use `http://10.0.2.2:3001`.
Para dispositivo físico, configure `EXPO_PUBLIC_API_URL` com o IP local do computador.

---

## Dashboard web

```powershell
cd dashboard
python -m http.server 8000
```

Em seguida, abra `http://localhost:8000`.

O painel consulta a API em `http://localhost:3001/alertas` e atualiza automaticamente.

---

## Fluxo de demonstração

1. Abra o app e toque 5 vezes em “Londrina”.
2. Digite o PIN `1234`.
3. Use a área reservada para:
   - cadastrar ocorrências;
   - manter contatos de apoio;
   - enviar SOS demonstrativo;
   - consultar alertas no dashboard.

---

## Limitações do protótipo

- é um protótipo acadêmico;
- não deve ser tratado como serviço real de emergência;
- não envia alertas para autoridades reais;
- os dados são demonstração e devem permanecer fictícios.

---

## Funcionalidades implementadas

- CRUD de ocorrências
- CRUD de rede de apoio
- registro de alertas SOS
- dashboard de monitoramento
- saída rápida da área reservada
- navegação protegida por PIN
- documentação de uso e checklist
