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
| 15/11/2026 | ChatGPT (OpenAI) | Produzir e executar notebook Python sobre tabela pública real do FBSP, com EDA, classificação, validação cruzada e geração do JSON para API | "Consegue terminar para mim?" / implementar os itens de Data Science com base legítima | CSV conferido pelos totais da Tabela 21, execução do notebook sem erro; resultados têm limitações explícitas |

## Entrega 4 — Finalização e Validação Individual (19/11/2026)

| Data | Ferramenta | Finalidade | Prompt utilizado (resumo) | Revisão |
| --- | --- | --- | --- | --- |
| 19/11/2026 | Google Antigravity | Normalização git (.gitattributes), correção de coordenadas de fallback SOS para Londrina, consolidação da matriz de papéis e preparação de entrega | Auditoria técnica e roteiro de correções sem quebra de compatibilidade para fechamento da Entrega 4 | Gustavo Lira verificou as falhas e as corrigiu; pediu à IA que revisasse e ajudasse a testar; Gustavo revisou as sugestões, executou os testes e conferiu os resultados antes do commit |

**Transparência:** a transcrição numérica da Tabela 21 é de dado real publicado pelo FBSP, não dado fictício criado por IA. O modelo e o código do notebook foram produzidos com assistência de IA; a amostra é pequena e a acurácia limitada. A equipe deve revisar o conteúdo, declarar a divisão individual real e dominar os trechos antes da apresentação.
