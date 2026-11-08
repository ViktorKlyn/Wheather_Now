# Checklist de Entrega — Weather Now 2.0

Atualizado em 07/11/2026. “Validado” abaixo significa que há uma execução ou
evidência descrita; não equivale a validação em PostgreSQL ou em dispositivos
nativos quando isso não foi possível neste ambiente.

## Requisitos

| Requisito | Situação | Evidência / limite |
|---|---|---|
| Interface pública de clima | Validada no navegador | Expo Web abriu a tela de clima; `npm run build` da interface Vite passou. |
| PIN e navegação protegida | Validada no navegador | Fluxo Londrina ×5, PIN incorreto rejeitado, PIN `1234` aceito e área reservada aberta. |
| Logout e saída rápida | Validada no navegador | Saída no SOS voltou ao clima; PIN foi exigido novamente. As rotas reservadas são removidas ao sair. |
| Limpeza de estado sensível | Implementada | Logout limpa estado Redux de autenticação, ocorrências, contatos e alertas. |
| CRUD de ocorrências | Validado em API e Expo Web | Criar/listar/editar/excluir pela tela; API também testada com validação e busca por ID. |
| CRUD da rede de apoio | Validado em API e Expo Web | Criar/listar/editar/excluir pela tela; API também testada com validação e busca por ID. |
| Usuária demo e relacionamentos | Validado com PGlite em memória | Reexecução do schema idempotente; ID resolvido por `weather_now_demo`; CRUD associou registros ao mesmo usuário mesmo com ID divergente no payload. |
| PostgreSQL tradicional | Configurado, conexão não validada | PostgreSQL é o driver padrão e consta como requisito em `docs/Entrega-2.md`. Não havia serviço/listener PostgreSQL local na porta 5432 neste ambiente. |
| SOS e `expo-location` | Validado no Expo Web com permissão negada | Registrou SOS com coordenadas fictícias, `localizacao_simulada=true` e mensagem informativa; não enviou alerta real. Permissão concedida e dispositivos nativos não foram testados. |
| Dashboard e segurança de renderização | Validado no navegador | Recebeu novos alertas por atualização automática, exibiu status e localização simulada; texto contendo marcação HTML apareceu como texto, sem nós HTML injetados. |
| Alteração de status no dashboard | Validada na API e no painel | Endpoint `PATCH /alertas/:id/status` e atualização manual pelo painel verificados. |
| Exportação web Expo | Validada | `npx expo export --platform web` concluiu. |

## Testes executados

| Comando / método | Resultado |
|---|---|
| `npm run build` (raiz) | PASSOU — Vite gerou o build de produção. |
| `Push-Location moblie; npx expo export --platform web; Pop-Location` | PASSOU — bundle web Expo gerado. |
| `node --check` nos arquivos alterados de API e `dashboard/app.js` | PASSOU — sem erros de sintaxe. |
| `git diff --check` | PASSOU — sem erros de whitespace. |
| API em `DB_DRIVER=pglite`, `PGLITE_DATA_DIR=:memory:`, porta `3101`; script Node usando `fetch` nos endpoints | PASSOU — CRUD integral dos dois recursos, validações, SOS simulado, status e associação do usuário. |
| Inicialização repetida do schema com PGlite em memória | PASSOU — chave estável, usuário único, contatos associados e encerramento limpo. |
| Fluxo de UI no Expo Web via navegador | PASSOU — acesso por PIN, CRUD das ocorrências e contatos, SOS com localização simulada, saída rápida e novo pedido de PIN. |
| Dashboard no navegador contra a API isolada | PASSOU — alerta novo apareceu por polling, recebeu destaque, status atualizou e valores de API foram renderizados como texto. |

## Problemas encontrados e correções

- A rota `Reservada` podia ser alcançada porque permanecia no Stack: agora o
  Stack alterna as rotas públicas/reservadas pelo estado de autenticação e é
  recriado no login/logout.
- O logout tentava resetar uma rota de outro navegador: agora altera o estado
  de autenticação; as telas protegidas são desmontadas e os slices sensíveis
  são limpos.
- Faltava saída rápida em telas sem cabeçalho interno: adicionada também à tela
  SOS; formulários/listas usam o cabeçalho protegido e Sobre mantém o botão.
- O ID `1` era pressuposto: o schema mantém um código estável para a usuária demo
  e o backend resolve o ID real antes de associar registros.
- PGlite era o banco padrão, embora o material da Entrega 2 exija PostgreSQL:
  PostgreSQL passou a ser padrão; PGlite exige configuração explícita.
- SOS usava `navigator.geolocation`: foi substituído por `expo-location`, com
  permissão, timeout, fallback fictício identificado e trava contra duplicação.
- Dashboard interpolava dados da API em `innerHTML`: renderização alterada para
  nós e `textContent`; tratamento de erro, polling e status foram revisados.
- O encerramento do PGlite recursava ao sobrescrever `close`: o módulo de banco
  agora exporta um wrapper de consulta sem substituir o método nativo.

## Pendências / não validados

- Executar conexão, schema e CRUDs em uma instalação PostgreSQL 14+ real; não
  havia serviço PostgreSQL disponível neste ambiente.
- Executar o fluxo em Android/iOS nativos e validar a permissão concedida e a
  captura de posição real. O fluxo testado foi Expo Web com permissão negada.
- Repetir a demonstração acadêmica usando PostgreSQL tradicional; o teste de
  integração desta correção usou PGlite em memória para não tocar em dados locais.

Nenhum dado de banco existente foi removido e nenhum commit ou push foi feito.
