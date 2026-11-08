# Relatório Final — Weather Now 2.0

**Data:** 07/11/2026  
**Escopo:** consolidação das correções e verificações realizadas no projeto. Este relatório distingue resultados observados de mudanças implementadas que ainda precisam de validação em outro ambiente.

## Resumo

Foram feitas correções na navegação protegida, no SOS, na identificação da usuária demonstrativa, na configuração do banco de dados, no dashboard e nos CRUDs de ocorrências e contatos da rede de apoio. Também foram atualizados os documentos de entrega e execução.

Os testes de integração de API e interface descritos abaixo usaram **PGlite em memória**, não uma instalação PostgreSQL. Os processos temporários usados nos testes foram encerrados. Nenhum commit ou push foi realizado, e nenhum banco de dados persistente foi aberto ou apagado.

## Correções realizadas

### Navegação, autenticação demonstrativa e saída rápida

- A navegação alterna entre as rotas públicas e reservadas conforme o estado de autenticação; a área reservada não fica permanentemente registrada no Stack público.
- A saída rápida encerra a autenticação e retorna à interface pública, sem tentar navegar para uma rota pertencente a outro navegador.
- O estado Redux de autenticação, ocorrências, contatos e alertas é limpo ao sair.
- O botão de saída rápida está disponível nas telas reservadas previstas, inclusive no SOS.
- Foi criado o componente compartilhado `moblie/src/navigation/SaidaRapidaButton.js`.

### SOS e localização

- A obtenção de localização usa `expo-location`, com solicitação de permissão.
- Quando a permissão é negada ou não é possível obter posição, o SOS pode usar coordenadas de demonstração e identifica a localização como simulada.
- Há estado de carregamento, tratamento de erro e proteção contra submissões duplicadas.
- O SOS é demonstrativo e não envia alertas a serviços reais de emergência.

### Banco de dados e usuária demonstrativa

- PostgreSQL tradicional é o driver padrão, conforme o requisito descrito na documentação da Entrega 2.
- PGlite permanece como alternativa de desenvolvimento, ativada explicitamente.
- A usuária fictícia é identificada pela chave estável `weather_now_demo`; o backend resolve o ID existente e usa esse ID nas relações de ocorrências, contatos e alertas.
- O schema foi ajustado para inicialização repetível e alterações aditivas, sem instruções para excluir tabelas ou registros existentes.
- O encerramento do PGlite foi corrigido para não recursar ao sobrescrever `close()`.

### Dashboard e API

- A renderização de valores recebidos da API usa nós DOM e `textContent`, evitando interpolar esses dados em `innerHTML`.
- O dashboard trata erros de consulta, atualiza os alertas automaticamente, destaca alertas novos e permite atualizar o status.
- Os controllers dos alertas, ocorrências e contatos foram ajustados para usar a usuária demonstrativa correta e validar as operações.

### CRUDs

- Foram preservadas as operações de criação, listagem, edição e exclusão de ocorrências e de contatos da rede de apoio.
- Os endpoints incluem operações por ID e validação para os dados recebidos.
- A interface foi ajustada para integrar as operações e atualizar o estado apresentado.

### Documentação e dependências

- README, checklist, registro de uso de IA e documentação da Entrega 2 foram revisados.
- Os comandos de execução e a exigência de PostgreSQL foram documentados.
- Foi adicionada a dependência `expo-location` compatível com a versão instalada do Expo.
- O exemplo de configuração preserva um `.env` existente ao sugerir sua cópia.

## Testes realmente executados e resultados

| Teste | Resultado observado | Limite |
|---|---|---|
| `npm run build` na raiz | **Passou.** Vite gerou o build de produção. | Valida o build da interface Vite, não o backend em PostgreSQL. |
| `npx expo install --check` em `moblie` | **Passou.** Dependências compatíveis com o SDK instalado. | Não valida execução em Android/iOS nativos. |
| `npx expo export --platform web` em `moblie` | **Passou.** Bundle web Expo foi gerado. | Exportação não substitui testes em dispositivo. |
| `node --check` nos arquivos de API e em `dashboard/app.js` | **Passou.** Sem erros de sintaxe nos arquivos verificados. | Não é uma análise estática completa nem teste funcional. |
| `git diff --check` | **Passou.** Sem erros de whitespace no diff verificado. | Foram exibidos avisos de conversão LF/CRLF para os arquivos de pacote mobile; o comando retornou sucesso. |
| Testes HTTP da API com script Node e `fetch`, usando `DB_DRIVER=pglite`, `PGLITE_DATA_DIR=:memory:` e porta 3101 | **Passou.** CRUD completo para ocorrências e contatos, validações, associação à usuária demo, SOS simulado e atualização de status. | Banco em memória, não PostgreSQL; os testes não demonstram persistência após encerrar o processo. |
| Reexecução do schema em PGlite em memória | **Passou.** Inicialização repetida manteve a usuária demo e os relacionamentos esperados. | Não foi executado contra um PostgreSQL tradicional nem contra dados persistentes. |
| Fluxo no navegador com Expo Web | **Passou.** PIN incorreto rejeitado, PIN demonstrativo aceito, telas reservadas acessíveis, CRUDs pela interface, SOS com localização simulada, saída rápida e novo pedido de PIN. | Permissão de localização negada; não testa localização real nem navegação nativa. |
| Dashboard no navegador contra a API de teste | **Passou.** Novo alerta apareceu por atualização automática e recebeu destaque; status pôde ser alterado; conteúdo semelhante a marcação HTML foi exibido como texto, sem criar nós HTML injetados. | Executado contra a API isolada em PGlite, não contra PostgreSQL. |
| Encerramento dos servidores temporários nas portas 3101, 8083 e 8001 | **Confirmado.** Os listeners de teste foram encerrados. | Isso não afeta outros serviços em portas diferentes. |

### Observação sobre os logs dos processos

Durante a validação, o servidor do dashboard respondeu às páginas e ao `app.js`; houve um `404` para `/favicon.ico`, que indica ausência de ícone e não impediu o carregamento do painel. A API e o Expo também registraram inicialização e bundle. Inicialização de servidor, isoladamente, **não** foi considerada aprovação de integração: os resultados funcionais acima se baseiam nas operações e fluxos exercitados.

## Implementado, mas ainda não validado

- **PostgreSQL tradicional:** a aplicação está configurada para usá-lo por padrão, mas não havia servidor PostgreSQL local disponível na porta 5432. Conexão, inicialização do schema, operações e persistência nesse banco continuam sem validação.
- **Localização real:** o SOS foi testado no Expo Web com permissão negada e fallback simulado. Permissão concedida, coordenadas reais, Android e iOS não foram testados.
- **Persistência após reinicialização no banco exigido:** os testes de integração usaram PGlite em memória; não comprovam persistência em PostgreSQL.
- **Demonstração completa no ambiente de entrega:** ainda é necessário executar o fluxo com PostgreSQL iniciado, app Expo e dashboard ligados simultaneamente.
- **Dependências:** a instalação mobile reportou 16 avisos de vulnerabilidade (1 baixa, 10 moderadas e 5 altas). Não foi feita atualização ampla automática; a lista deve ser reavaliada antes de uma entrega pública.

## Instruções para executar

### Pré-requisitos

- Node.js 18 ou superior e npm.
- PostgreSQL 14 ou superior para a demonstração acadêmica.
- Python disponível para servir o dashboard.

### 1. Preparar e iniciar a API com PostgreSQL

Inicie PostgreSQL e crie o banco `weather_now`. Em um terminal PowerShell, na raiz do repositório:

```powershell
Set-Location backend
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
```

Edite `backend/.env` com os dados do PostgreSQL, mantendo `DB_DRIVER=postgres`. Configure `DATABASE_URL` ou as variáveis `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` e `DB_NAME`. Não compartilhe nem versione credenciais.

```powershell
npm install
npm run dev
```

A API usa `http://localhost:3001` por padrão. O schema é inicializado pela aplicação com alterações aditivas. Para a entrega, use PostgreSQL; PGlite em memória não comprova persistência.

### 2. Iniciar a interface pública de clima

Em outro terminal, na raiz do repositório:

```powershell
npm install
npm run dev
```

Abra o endereço local informado pelo Vite.

### 3. Iniciar o app Expo Web

Mantenha a API ativa. Em outro terminal:

```powershell
Set-Location moblie
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
npm install
npm run web
```

No computador, `localhost` pode ser usado para a API. Para Android Emulator, configure `EXPO_PUBLIC_API_URL=http://10.0.2.2:3001`; para um dispositivo físico, use o endereço IP do computador na rede local.

### 4. Iniciar o dashboard

Em outro terminal:

```powershell
Set-Location dashboard
python -m http.server 8000
```

Abra `http://localhost:8000`. O painel consulta a API em `http://localhost:3001` e atualiza os alertas automaticamente. Para outra URL, use o parâmetro `?api=http://host:porta`.

## Roteiro de demonstração

1. Inicie PostgreSQL, API, interface pública, Expo Web e dashboard.
2. No app, toque cinco vezes em “Londrina” e informe o PIN demonstrativo `1234`.
3. Crie, liste, edite e exclua uma ocorrência.
4. Crie, liste, edite e exclua um contato da rede de apoio.
5. Registre um SOS demonstrativo e confirme no dashboard que o alerta aparece como simulado.
6. Altere o status do alerta no dashboard.
7. Use a saída rápida no app e confirme que o acesso reservado volta a exigir o PIN.

## Arquivos com alterações relevantes

- Documentação: `README.md`, `CHECKLIST_ENTREGA.md`, `USO_IA.md` e `docs/Entrega-2.md`.
- Banco e API: `backend/.env.example`, `backend/database/schema.sql`, `backend/src/db.js`, controllers de alertas, ocorrências e contatos, e models de ocorrências e contatos.
- Dashboard: `dashboard/app.js` e `dashboard/index.html`.
- Mobile: `moblie/app.json`, `moblie/package.json`, `moblie/package-lock.json`, navegação, API, telas de PIN/SOS/formulários/Sobre e slices Redux.
- Novo componente: `moblie/src/navigation/SaidaRapidaButton.js`.

**Sem commit ou push. Nenhum dado persistente foi apagado.**
