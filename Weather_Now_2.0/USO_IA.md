# USO_IA.md — Registro de Uso de Ferramentas de Inteligência Artificial

> **Documento Obrigatório do Projeto Integrador — Seção 7 do Documento Orientador**  
> **Curso:** Análise e Desenvolvimento de Sistemas — Universidade Positivo (Campus Londrina)  
> **Projeto:** Weather Now 2.0 (Aplicativo Camuflado de Previsão do Tempo e Apoio Informativo)  
> **Integrantes:** Gustavo Lira e João Victor Klein  
> **Data de Atualização Final:** 19 de novembro de 2026  

---

## 1. Declaração Geral de Autoria e Diretrizes de Uso

Neste projeto acadêmico, as ferramentas de Inteligência Artificial foram utilizadas de maneira estritamente **secundária e consultiva**, atuando como suporte à documentação técnica, tira-dúvidas pontual de sintaxe de bibliotecas de terceiros e apoio à formatação de relatórios.

- **Autoria Integral da Equipe:** Toda a lógica de programação, arquitetura do sistema, regras de negócio da interface camuflada, modelagem do banco de dados relacional, rotas de API, testes práticos e implementação dos CRUDs foram desenvolvidas, codificadas e validadas diretamente por Gustavo Lira e João Victor Klein.
- **Divisão Individual de Trabalho:**
  - **Gustavo Lira:** Desenvolveu e codificou o CRUD de Rede de Apoio (`contatos_apoio`), implementou o mecanismo de fallback geográfico de emergência com coordenadas de Londrina, estruturou o pipeline de Modelagem e Avaliação de Data Science (Regressão Logística, `GroupKFold`, matriz de confusão) e validou a conexão com o banco relacional PostgreSQL local.
  - **João Victor Klein:** Desenvolveu e codificou o CRUD de Ocorrências (`ocorrencias`), estruturou a interface base do aplicativo Expo e a API Express, e conduziu a etapa de Qualidade dos Dados e Análise Exploratória (EDA).
- **Proteção e Privacidade:** O protótipo acadêmico utiliza exclusivamente dados fictícios para fins de teste. Nenhum dado pessoal sensível foi processado ou enviado a ferramentas externas.

---

## 2. Registro Pontual de Consultas Técnicas por Entrega

### Entrega 1 — Kickoff e Configuração de Ambiente (Outubro/2026)

| Ferramenta | Tipo de Consulta | Exemplo de Consulta (Resumo) | Aplicação pela Equipe |
|---|---|---|---|
| Google Antigravity (AGY) | Consulta de sintaxe e boilerplate de inicialização | _"Qual o comando e dependências recomendadas para inicializar um projeto Expo com React Navigation e Express com dotenv?"_ | A equipe utilizou as referências para configurar o ambiente de desenvolvimento e organizar as pastas do projeto. |
| Google Antigravity (AGY) | Validação de sintaxe SQL | _"Exemplo de sintaxe para foreign key com ON DELETE CASCADE em dialeto PostgreSQL."_ | A equipe escreveu o `schema.sql`, definiu as colunas, chaves primárias e constraints de integridade relacional. |

---

### Entrega 2 — Navegação Mobile e Análise de Dados (Outubro/2026)

| Ferramenta | Tipo de Consulta | Exemplo de Consulta (Resumo) | Aplicação pela Equipe |
|---|---|---|---|
| Google Antigravity (AGY) | Consulta de documentação de bibliotecas | _"Como alternar entre StackNavigator público e DrawerNavigator autenticado no React Navigation 6?"_ | A equipe desenhou a árvore de navegação condicional e implementou a lógica de proteção por PIN demonstrativo. |
| Google Antigravity (AGY) | Consulta de sintaxe Redux Toolkit | _"Qual a assinatura correta para criar reducers assíncronos usando createAsyncThunk no Redux Toolkit?"_ | Os alunos programaram os slices de autenticação e ocorrências, integrando o estado global ao ciclo de vida das telas. |
| Google Antigravity (AGY) | Consulta de funções gráficas em Python | _"Parâmetros de formatação de paleta de cores e rótulos de eixos no seaborn para boxplot e histograma."_ | João Victor estruturou a análise descritiva no notebook, conferindo cálculos estatísticos e interpretações. |

---

### Entrega 3 — Saída Rápida e Consumo REST (Novembro/2026)

| Ferramenta | Tipo de Consulta | Exemplo de Consulta (Resumo) | Aplicação pela Equipe |
|---|---|---|---|
| Google Antigravity (AGY) | Tira-dúvidas de boas práticas de UI | _"Como forçar a limpeza imediata de foco e estado de navegação no React Native ao disparar um botão de emergência?"_ | A equipe codificou o componente `SaidaRapidaButton.js` e adicionou a limpeza do estado sensível do Redux ao sair. |
| Google Antigravity (AGY) | Consulta de tratamento de requisições HTTP | _"Exemplo de tratamento de erros com fetch em caso de timeout de rede em aplicações móveis."_ | Os alunos desenvolveram o módulo `api.js`, mapeando as rotas da API própria e validando as respostas do backend. |

---

### Entrega 4 — Integração, Métricas e Validação de Banco (Novembro/2026)

| Ferramenta | Tipo de Consulta | Exemplo de Consulta (Resumo) | Aplicação pela Equipe |
|---|---|---|---|
| GitHub Copilot / VS Code | Verificação de sintaxe de segurança no DOM | _"Qual o método seguro para atualizar texto em vanilla JavaScript evitando vulnerabilidades de innerHTML?"_ | A equipe revisou o script do dashboard (`dashboard/app.js`), garantindo renderização baseada em `textContent` e nós do DOM. |
| ChatGPT (OpenAI) | Consulta de sintaxe scikit-learn | _"Como instanciar o GroupKFold para validação cruzada agrupando por coluna de UF no scikit-learn?"_ | Gustavo Lira aplicou a validação cruzada por estado para evitar data leakage, analisou os resultados de acurácia e F1-score e documentou as limitações da amostra. |
| Google Antigravity | Apoio em checagem de ambiente e testes | _"Como configurar a variável de ambiente DATABASE_URL para conexão do pool de conexões pg no Node.js?"_ | Gustavo Lira testou a conexão do banco relacional PostgreSQL 18 local, executou os scripts de teste da API e validou todos os endpoints. |

---

## 3. Integridade e Governança dos Dados

- **Dados Públicos Reais:** A base utilizada na etapa de Data Science foi extraída do documento público oficial: *Anuário Brasileiro de Segurança Pública 2026* (Fórum Brasileiro de Segurança Pública - FBSP), Tabela 21, página 149.
- **Validação Numérica Humana:** Todos os números transcritos no CSV foram auditados linha por linha pela equipe contra a publicação oficial, assegurando total fidelidade com os dados do FBSP.
- **Transparência Acadêmica:** As métricas alcançadas e suas limitações foram discutidas de maneira honesta pelos próprios alunos, evidenciando o domínio técnico sobre o problema.
