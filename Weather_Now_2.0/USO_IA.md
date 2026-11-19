# USO_IA.md — Registro de Uso de Ferramentas de IA

> Arquivo obrigatório do Projeto Integrador (Seção 7 do Documento Orientador).  
> Todas as ferramentas de IA utilizadas pelo grupo e os prompts testados devem ser registrados aqui.

---

## Divisão do trabalho e defesa individual (Entrega 4)

> Fonte: `docs/matriz-responsabilidades.md` (confirmada pela equipe em 19/11/2026) e histórico de commits do GitHub.
> Conforme o Documento Orientador, qualquer integrante pode ser questionado sobre qualquer parte do sistema, inclusive o que foi feito com ajuda de IA.

| Integrante | GitHub | CRUD que defende | Etapa de Data Science que defende | Outras partes que apresenta |
| --- | --- | --- | --- | --- |
| João Victor Klein (Victor) | `ViktorKlyn` | **Ocorrências**: tabela `ocorrencias`, model, controller, rotas, telas `OcorrenciasTela` e `FormularioTela` | **Qualidade dos dados e EDA**: limpeza, análise exploratória e gráficos descritivos | Back-end e estrutura inicial do projeto (API Express, `schema.sql`); SOS simulado e testes da API |
| Gustavo Lira | `gustavoliradeoliveira` | **Rede de Apoio**: tabela `contatos_apoio`, model, controller, rotas, telas `ContatosTela` e `FormularioContatoTela` | **Modelagem e avaliação**: regressão logística, GroupKFold, métricas e matriz de confusão | Front-end e correções finais de integração: `.gitattributes`, coordenadas de Londrina (SOS e front web), rótulos de status do dashboard, validação com PostgreSQL 18 e matriz de responsabilidades |

**Partes compartilhadas (os dois explicam):** disfarce de clima com PIN e saída rápida, tela SOS e dashboard da delegacia, tabela `usuarios` e relacionamentos (`usuario_id`), indicador de Data Science exibido no app (com aviso de estimativa acadêmica).

### Evidência nos commits (estado em 19/11/2026)

| Autor | Commits | O que entregou |
| --- | --- | --- |
| Victor (`ViktorKlyn`) | 2 | `0de1042` (14/10, branch `master`): criação das telas e dados iniciais gerados por IA. `ad998fa` (18/11, `main`): SOS simulado, dados públicos para Data Science, teste de API e teste no Expo. |
| Gustavo (`gustavoliradeoliveira`) | 6 (todos em 19/11) | `f6688bc` `.gitattributes`; `d85afb2` coordenadas de Londrina no SOS; `792aa74` matriz de responsabilidades e `USO_IA.md`; `56038d0` coordenadas de Londrina no front web; `ccb6cdc` rótulos amigáveis de status no dashboard; `e78c565` registro da validação com PostgreSQL 18. |

**Nota de autoria:** O Gustavo escreveu o CRUD de Rede de Apoio (model, controller, rotas e telas) e a modelagem do notebook. O código entrou no repositório pelos commits do Victor porque o celular do Gustavo estava quebrado e ele ficou sem acesso às plataformas da escola, já que o Microsoft Authenticator estava somente nesse celular. Sem esse acesso, ele não conseguia pegar nem acompanhar as diretrizes das entregas do projeto. Os commits feitos pelo Gustavo com a própria conta estão listados na tabela de evidências acima.

### Quem usou cada ferramenta de IA

| Data | Ferramenta | Quem usou | O que a IA fez | O que o integrante fez (revisão e teste) |
| --- | --- | --- | --- | --- |
| Out/2026 (Entregas 1 e 2) | Google Antigravity (AGY) | João Victor Klein | Estrutura inicial do app e da API, schema, refatoração de navegação e Redux, notebook de EDA demonstrativo, tela SOS (detalhes nas tabelas abaixo) | João Victor revisou o código e montou a estrutura inicial do projeto |
| 07/11/2026 | Copilot SDK no VS Code | João Victor Klein | Revisão de navegação protegida, SOS com localização, PostgreSQL, usuário demo, dashboard, CRUDs e documentação | João Victor revisou o código; validações registradas em `CHECKLIST_ENTREGA.md` |
| 15/11/2026 | ChatGPT (OpenAI) | João Victor Klein | Revisão do ZIP, API, tela de indicadores, empacotamento e notebook com a Tabela 21 do FBSP | João Victor revisou o código; CSV conferido pelos totais da Tabela 21; notebook executado sem erro; limitações explícitas |
| 19/11/2026 (manhã) | Google Antigravity (modelos Gemini e Claude Opus) | Gustavo Lira | `.gitattributes`, coordenadas do SOS, matriz de papéis e este registro | Gustavo verificou as falhas e as corrigiu; pediu à IA que revisasse e ajudasse a testar; revisou as sugestões, executou os testes e conferiu os resultados antes de cada commit (`f6688bc`, `d85afb2`, `792aa74`) |
| 19/11/2026 (tarde) | Google Antigravity (modelos Gemini e Claude Opus) | Gustavo Lira | Coordenadas do front web, rótulos de status do dashboard e validação com PostgreSQL 18 | Gustavo verificou as falhas, as corrigiu, revisou e testou o resultado (`56038d0`, `ccb6cdc`, `e78c565`) |
| 19/11/2026 | Claude (Anthropic), pelo claude.ai (modelo Claude Opus, versão mais recente disponível) | Gustavo Lira | Análise do repositório frente ao Documento Orientador, organização do quadro Kanban no Trello, PDF do Kanban, zip do projeto Expo, conferência de testes (`npm test`, build do front web, bundle do Expo, execução do notebook) e rascunho deste registro | Gustavo conferiu os resultados no GitHub e decidiu o que aplicar. O Claude não alterou o código do projeto. |

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

## Correção Final — Weather Now 2.0

| Data | Ferramenta | Finalidade | Prompt utilizado (resumo) |
|------|-----------|-----------|--------------------------|
| 07/Nov/2026 | Assistente de IA (Copilot SDK no VS Code) | Revisar e corrigir navegação protegida, SOS com localização, PostgreSQL, usuário demo, dashboard, CRUDs e documentação | _"Analise o workspace existente, corrija os problemas apontados na auditoria, execute os testes possíveis e relate resultados e pendências sem apagar dados ou fazer commits."_ |

As validações realizadas nesta correção estão registradas em
`CHECKLIST_ENTREGA.md`; itens sem evidência não são declarados como testados.

---

## Observações de Uso Ético

- Todos os prompts foram utilizados para **geração de código de apoio** e **estruturação de análises**, não para substituir o raciocínio analítico do grupo.
- Os **dados fictícios** gerados para demonstração do notebook **não representam a realidade** e não foram citados como fatos.
- **Registro histórico da Entrega 2:** a base do Ligue 180 havia sido planejada, mas não foi obtida naquela etapa. **Na Entrega 4, a base real utilizada é a Tabela 21 do Anuário FBSP 2026 (2024–2025)**, explicitada no notebook e em `data-science/README.md`.
- Nenhum dado pessoal de vítimas foi processado ou solicitado a ferramentas de IA.

---

_Última atualização: 19 de novembro de 2026_

---

## Entrega 4 — Finalização assistida (15/11/2026)

| Data | Ferramenta | Finalidade | Prompt utilizado (resumo) | Revisão |
| --- | --- | --- | --- | --- |
| 15/11/2026 | ChatGPT (OpenAI) | Revisar ZIP do Weather Now e comparar com os critérios; editar API, tela de indicadores, documentação e empacotamento | "Consegue terminar para mim?" e requisitos oficiais da Entrega 4 compartilhados na conversa | Testes automatizados descritos em `docs/testes.md`; revisão manual pela equipe ainda necessária |
| 15/11/2026 | ChatGPT (OpenAI) | Produzir e executar notebook Python sobre tabela pública real do FBSP, com EDA, classificação, validação cruzada e geração do JSON para API | "Consegue terminar para mim?" / implementar os itens de Data Science com base legítima | João Victor revisou o código; CSV conferido pelos totais da Tabela 21, execução do notebook sem erro; resultados têm limitações explícitas |

## Entrega 4 — Finalização e Validação Individual (19/11/2026)

| Data | Ferramenta | Finalidade | Prompt utilizado (resumo) | Revisão |
| --- | --- | --- | --- | --- |
| 19/11/2026 | Google Antigravity | Normalização git (.gitattributes), correção de coordenadas de fallback SOS para Londrina, consolidação da matriz de papéis e preparação de entrega | Auditoria técnica e roteiro de correções sem quebra de compatibilidade para fechamento da Entrega 4 | Gustavo Lira verificou as falhas e as corrigiu; pediu à IA que revisasse e ajudasse a testar; Gustavo revisou as sugestões, executou os testes e conferiu os resultados antes do commit |

**Transparência:** a transcrição numérica da Tabela 21 é de dado real publicado pelo FBSP, não dado fictício criado por IA. O modelo e o código do notebook foram produzidos com assistência de IA; a amostra é pequena e a acurácia limitada. A equipe deve revisar o conteúdo, declarar a divisão individual real e dominar os trechos antes da apresentação.

---

## Declaração da equipe

- Cada integrante consegue explicar e demonstrar o CRUD e a etapa de Data Science pelos quais é responsável, e responde também sobre as partes compartilhadas.
- Trechos gerados ou revisados com IA estão registrados nas tabelas acima, com a ferramenta, a data e quem usou.
- O que não foi testado não é declarado como testado.
