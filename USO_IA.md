# USO_IA.md — Registro de Uso de Ferramentas de IA

> Arquivo obrigatório do Projeto Integrador (Seção 7 do Documento Orientador).  
> Todas as ferramentas de IA utilizadas pelo grupo e os prompts testados devem ser registrados aqui.

---

## Entrega 1 — Kickoff e Estrutura Inicial

| Data | Ferramenta | Finalidade | Prompt utilizado (resumo) |
|------|-----------|-----------|--------------------------|
| Out/2026 | Google Antigravity (AGY) | Estrutura inicial do app Expo + backend Express | _"Crie um app Expo React Native de previsão do tempo que seja disfarce para um app de apoio a mulheres em situação de violência. Deve ter tela de clima, PIN de 4 dígitos e área reservada com CRUD de ocorrências conectado a uma API Express + PostgreSQL."_ |
| Out/2026 | Google Antigravity (AGY) | Geração do schema SQL inicial | _"Crie o schema PostgreSQL para uma tabela de ocorrências com id, data, descricao e usuario_id."_ |
| Out/2026 | Google Antigravity (AGY) | Estrutura de rotas Express | _"Gere um controller e rotas Express para CRUD completo de ocorrências com tratamento de erros."_ |

---

## Entrega 2 — Análise Exploratória e Refatoração Mobile

| Data | Ferramenta | Finalidade | Prompt utilizado (resumo) |
|------|-----------|-----------|--------------------------|
| Out/2026 | Google Antigravity (AGY) | Refatoração do Mobile com react-navigation (Stack + Tab + Drawer) | _"Refatore o App.js monolítico do Expo para usar react-navigation com Stack raiz, Tab (Ocorrências + SOS) e Drawer (menu + sobre). Adicione Redux Toolkit com slices para auth (PIN) e ocorrências (CRUD assíncrono com createAsyncThunk)."_ |
| Out/2026 | Google Antigravity (AGY) | Notebook de Data Science completo | _"Crie um notebook Jupyter completo de análise exploratória para o Painel Ligue 180 cobrindo: ficha de governança, dicionário de dados, diagnóstico de qualidade em 5 dimensões, pipeline de tratamento documentado com tabela antes×depois, EDA com medidas descritivas, histograma, boxplot, frequências, série temporal, heatmap e 3 perguntas respondidas com números."_ |
| Out/2026 | Google Antigravity (AGY) | Geração de dados fictícios para demonstração do notebook | _"Gere um DataFrame pandas demo que simule o Painel Ligue 180 com colunas ano, mes, uf, tipo_violencia e quantidade_atendimentos, incluindo ausentes reais, ausentes disfarçados (9999, -1), duplicatas e outliers para fins de demonstração do pipeline."_ |
| Out/2026 | Google Antigravity (AGY) | Tela SOS com discagem direta | _"Crie uma tela React Native com lista de contatos de emergência (Ligue 180, SAMU, Polícia, Bombeiros, Disque 100) onde cada item abre o discador do celular via Linking.openURL."_ |

---

## Observações de Uso Ético

- Todos os prompts foram utilizados para **geração de código de apoio** e **estruturação de análises**, não para substituir o raciocínio analítico do grupo.
- Os **dados fictícios** gerados para demonstração do notebook **não representam a realidade** e não foram citados como fatos.
- A **análise exploratória real** deverá ser executada sobre a base pública do Ligue 180, disponível em [gov.br/mulheres](https://www.gov.br/mulheres/pt-br/assuntos/ouvidoria-da-mulher/ligue-180).
- Nenhum dado pessoal de vítimas foi processado ou solicitado a ferramentas de IA.

---

_Última atualização: Outubro de 2026_
