# USO_IA.md — Registro de Uso de Ferramentas de Inteligência Artificial

> **Documento Obrigatório do Projeto Integrador — Seção 7 do Documento Orientador**  
> **Curso:** Análise e Desenvolvimento de Sistemas — Universidade Positivo (Campus Londrina)  
> **Projeto:** Weather Now 2.0 (Aplicativo Camuflado de Previsão do Tempo e Apoio Informativo)  
> **Integrantes:** Gustavo Lira e João Victor Klein  
> **Data de Atualização Final:** 19 de novembro de 2026  

---

## 1. Declaração Geral de Autoria e Postura Ética

O uso de ferramentas de Inteligência Artificial Generativa neste projeto teve caráter estritamente consultivo e de apoio técnico (*pair programming*, suporte à sintaxe, sugestão de boas práticas e auxílio na elaboração de suítes de testes).

- **Autoria Humana e Responsabilidade:** Toda a concepção arquitetural, modelagem do banco relacional, regras de negócio de camuflagem/saída rápida, depuração de erros, validação dos dados públicos do FBSP e execução dos testes no ambiente local foram conduzidas e validadas diretamente pelos integrantes do grupo.
- **Divisão Individual de Trabalho:**
  - **Gustavo Lira:** Responsável pelo CRUD de Rede de Apoio (`contatos_apoio`), fallback geográfico de emergência com coordenadas de Londrina, pipeline de Modelagem e Avaliação de Data Science (Regressão Logística, `GroupKFold`, matriz de confusão) e validação da conexão com o banco relacional PostgreSQL.
  - **João Victor Klein:** Responsável pelo CRUD de Ocorrências (`ocorrencias`), estrutura base do aplicativo Expo e backend Express, e pipeline de Qualidade dos Dados e Análise Exploratória (EDA).
- **Proteção e Privacidade:** O protótipo acadêmico opera exclusivamente com dados fictícios de cadastro e SOS. Nenhum dado pessoal sensível ou identificador de vítimas reais foi inserido ou processado por ferramentas de IA.

---

## 2. Histórico de Utilização por Entrega

### Entrega 1 — Kickoff e Estrutura Inicial (Outubro/2026)

| Ferramenta | Finalidade do Uso | Prompt Utilizado (Resumo) | Revisão / Validação Humana |
|---|---|---|---|
| Google Antigravity (AGY) | Geração de scaffold inicial do app Expo e do servidor Node.js/Express | _"Gere a estrutura inicial de um app Expo React Native e uma API Express conectada a banco relacional para protótipo de apoio camuflado."_ | A equipe revisou a arquitetura, ajustou a árvore de arquivos, configurou variáveis de ambiente e definiu os endpoints RESTful. |
| Google Antigravity (AGY) | Esboço da modelagem SQL relacional | _"Sugira um schema SQL PostgreSQL para tabela de ocorrências com chave estrangeira vinculada a usuárias."_ | A equipe revisou os tipos de dados, chaves primárias e constraints de integridade relacional. |

---

### Entrega 2 — Análise Exploratória e Refatoração Mobile (Outubro/2026)

| Ferramenta | Finalidade do Uso | Prompt Utilizado (Resumo) | Revisão / Validação Humana |
|---|---|---|---|
| Google Antigravity (AGY) | Apoio na estruturação da navegação (React Navigation: Stack + Tab + Drawer) | _"Como estruturar a navegação no Expo para alternar dinamicamente entre telas públicas e área reservada após autenticação por PIN?"_ | Implementada a separação segura entre rotas públicas e protegidas, garantindo a desmontagem ao acionar a saída rápida. |
| Google Antigravity (AGY) | Estruturação do fluxo Redux Toolkit | _"Sugira um padrão com Redux Toolkit para gerenciar o estado global de autenticação e persistência de ocorrências via createAsyncThunk."_ | Código adaptado para consumir os endpoints da API real da equipe, implementando limpeza de estado no logout. |
| Google Antigravity (AGY) | Estruturação de notebook para análise exploratória | _"Apoie na criação de um roteiro didático de EDA em Python com pandas e matplotlib para estatísticas de violência."_ | João Victor selecionou os indicadores, conferiu cálculos estatísticos e organizou a visualização gráfica. |

---

### Entrega 4 — Refinamento, Integração e Validação Final (Novembro/2026)

| Data | Ferramenta | Finalidade do Uso | Prompt Utilizado (Resumo) | Revisão / Validação Humana |
|---|---|---|---|---|
| 07/11/2026 | GitHub Copilot / VS Code | Auditoria de segurança de navegação e sanitização do dashboard | _"Revise o fluxo de navegação protegida e a renderização do dashboard para prevenir falhas de segurança e garantir sanitização de texto."_ | A equipe eliminou riscos de injeção HTML no dashboard e reforçou o bloqueio de rotas protegidas sem PIN. |
| 15/11/2026 | ChatGPT (OpenAI) | Auxílio na transcrição tabular auditável da Tabela 21 do Anuário FBSP 2026 e cálculo de métricas | _"Auxilie na conferência dos totais da Tabela 21 do FBSP 2026 e na estrutura de validação cruzada GroupKFold por UF para evitar vazamento de dados."_ | Gustavo Lira conferiu cada um dos 54 registros do CSV contra a página 149 do PDF oficial do FBSP; os modelos foram executados e as limitações de acurácia (0,57) explicitadas com rigor acadêmico. |
| 19/11/2026 | Google Antigravity | Normalização de ambiente cross-platform (.gitattributes), alinhamento de coordenadas e validação PostgreSQL | _"Identifique inconsistências de finais de linha CRLF/LF no repositório, alinhe as coordenadas de Londrina e auxilie na configuração de conexão com PostgreSQL 18 local."_ | Gustavo Lira verificou as falhas e as corrigiu; pediu à IA que revisasse e ajudasse a testar; Gustavo revisou as sugestões, executou os testes e conferiu os resultados antes do commit. |

---

## 3. Transparência Sobre a Base de Dados de Data Science

- **Fonte Oficial:** Os dados utilizados no notebook são de domínio público, extraídos do *Anuário Brasileiro de Segurança Pública 2026* (Fórum Brasileiro de Segurança Pública - FBSP), Tabela 21, página 149.
- **Ausência de Alucinação:** A base agregada (54 linhas: 27 UFs × 2 anos) foi conferida e validada numericamente pela equipe (totais nacionais de 2024 e 2025 coincidem exatamente com o relatório publicado).
- **Limitações Declaradas:** O modelo de Regressão Logística foi desenvolvido para fins estritamente pedagógicos e didáticos. A equipe documentou de forma transparente as limitações preditivas decorrentes do tamanho amostral reduzido e do desbalanceamento de classes, deixando claro na apresentação que o sistema não possui finalidade de previsão de risco individual.
