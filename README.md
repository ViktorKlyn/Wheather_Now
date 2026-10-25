# Weather Now — Aplicativo de Apoio Camuflado

> **Protótipo acadêmico** · Projeto Integrador · 2º Semestre de 2026  
> Tema: Violência contra a Mulher — Aplicativo de Apoio Camuflado

Por fora, um simples aplicativo de previsão do tempo.  
Por dentro, uma ferramenta segura e discreta para registrar ocorrências de violência doméstica e acessar contatos de emergência.

---

## Estrutura do Repositório

```
/
├── moblie/          # Aplicativo Expo (React Native) — tela de clima + área reservada
│   ├── src/
│   │   ├── navigation/  # Stack + Tab + Drawer (react-navigation)
│   │   ├── screens/     # ClimaTela, PinTela, OcorrenciasTela, FormularioTela, SOSTela, SobreTela
│   │   ├── store/       # Redux Toolkit (ocorrenciasSlice, authSlice)
│   │   └── api.js       # Chamadas à API Express
│   └── App.js           # Provider Redux + GestureHandlerRootView + AppNavigator
├── backend/         # API Express + PostgreSQL
│   ├── src/
│   │   ├── controllers/ # ocorrenciasController.js
│   │   ├── routes/      # index.js + ocorrencias.js
│   │   ├── db.js        # Pool de conexão PostgreSQL
│   │   └── index.js     # Ponto de entrada — porta 3001
│   └── database/
│       └── schema.sql   # DDL das tabelas
├── data-science/    # Análise exploratória — Painel Ligue 180
│   ├── dados/           # base bruta + base tratada (geradas pelo notebook)
│   ├── notebook.ipynb   # Pipeline completo de DS
│   └── README.md
├── docs/
│   └── Entrega-2.md     # Instruções de execução do projeto
├── README.md        # Este arquivo
└── USO_IA.md        # Registro de uso de ferramentas de IA
```

---

## Disfarce do Aplicativo

**Disfarce escolhido:** Aplicativo de Previsão do Tempo — *Weather Now*

**Justificativa:** Aplicativos de clima são extremamente comuns, não levantam suspeitas e são consultados diariamente por qualquer pessoa. O mecanismo de acesso oculto (5 toques na cidade + PIN de 4 dígitos) é invisível para quem não conhece o app, garantindo a segurança da usuária em situações de controle pelo agressor.

---

## Navegação (Stack / Tab / Drawer)

```
RootStack (Stack — react-navigation/native-stack)
├── ClimaTela          ← tela pública de disfarce
├── PinTela (modal)    ← Stack: modal deslizante de baixo para cima
└── DrawerReservada (Drawer)
    ├── TabReservada (Tab — Bottom Tabs)
    │   ├── OcorrenciasStack (Stack interno)
    │   │   ├── OcorrenciasTela   ← lista com FlatList + pull-to-refresh
    │   │   └── FormularioTela    ← criar / editar ocorrência
    │   └── SOSTela               ← contatos de emergência com discagem
    └── SobreTela                 ← informações + botão de logout
```

---

## Como Rodar

### Pré-requisitos

- Node.js 18+
- PostgreSQL 14+ (para o backend)
- Expo CLI (`npm install -g expo-cli`)

### Backend (API)

```powershell
cd backend
copy .env.example .env   # ajuste DATABASE_URL
npm install
# Criar banco: psql -U postgres -c "CREATE DATABASE weather_now;"
# Criar tabelas:
psql -U postgres -d weather_now -f database/schema.sql
npm run dev              # API em http://localhost:3001
```

### Aplicativo Mobile

```powershell
cd moblie
copy .env.example .env   # ajuste EXPO_PUBLIC_API_URL
npm install
npm start                # Expo DevTools — escanear QR ou pressionar W para web
```

> **Emulador Android:** use `EXPO_PUBLIC_API_URL=http://10.0.2.2:3001`  
> **Dispositivo físico:** use o IP local do computador

### Data Science

```powershell
pip install pandas numpy matplotlib seaborn jupyter
cd data-science
jupyter notebook notebook.ipynb
```

---

## Banco de Dados (DER resumido)

```
┌──────────────────────────────────────┐
│            ocorrencias               │
├──────────────────────────────────────┤
│  id          SERIAL       PK         │
│  data        DATE         NOT NULL   │
│  descricao   TEXT         NOT NULL   │
│  usuario_id  INTEGER      FK → (*)   │
└──────────────────────────────────────┘

(*) Tabela de usuários será adicionada na Entrega 3.
```

---

## Base de Dados Pública (Data Science)

**Painel Ligue 180 — Central de Atendimento à Mulher**  
Fonte: Ministério das Mulheres / SPM  
Link: <https://www.gov.br/mulheres/pt-br/assuntos/ouvidoria-da-mulher/ligue-180>  
Licença: Dados abertos do Governo Federal (LAI 12.527/2011)

---

## Avisos

- Este é um **protótipo acadêmico**. Não usar em produção sem auditoria de segurança.
- Nenhum dado pessoal real de vítimas está armazenado no repositório.
- O PIN padrão (`1234`) deve ser alterado antes de qualquer uso real.
