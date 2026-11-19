# Evidências de validação — 15/11/2026

## Testes efetivamente executados aqui

- **Notebook Python:** 10 células de código executadas sem erros; 54 registros reais agregados, 27 UFs, sem ausências/duplicatas. Soma dos dados do CSV coincide com os totais do FBSP. Gráficos gravados e incluídos no `.ipynb`.
- **Modelo:** grupo treino/teste separado por UF (20 UFs no treino, 7 em teste). Acurácia em teste **0,571** (8 acertos em 14 exemplos), sem valor operacional. F1 para a classe ≥ 1,5: **0,700**; média F1 de quatro folds de validação cruzada: **0,645**.
- **API com PGlite em memória e Node.js:** 21 verificações HTTP passaram: `GET /`, `GET /indicadores`, listar/criar/buscar/editar/excluir ocorrências, buscar/criar/editar/excluir contatos, criar/buscar/PATCH/PUT/excluir SOS, inclusive 400 e 404. A suíte reproduzível foi adicionada em `backend/scripts/testar-api.js`, executável com `npm test` após `npm install`. As operações de banco eram reais e transacionais, apenas a instância era temporária.
- **JavaScript da API:** arquivos de controllers/models/routes analisados por `node --check` sem erros.
- **Mobile:** 18 fontes JavaScript/JSX analisadas sintaticamente pelo parser Babel com JSX, sem erros.

## Não foi executado/confirmado neste ambiente

- Fluxo visual completo do aplicativo em Expo no navegador e em Android/iOS físico.
- Instalação `npm install` limpa em computador de aluno ou professor.
- Banco PostgreSQL tradicional com servidor, credenciais e firewall do computador da equipe.
- Histórico de commits, autoria individual ou estado atual do repositório remoto.
- Envio do Blackboard.
- Confiabilidade de geolocalização no dispositivo.

## Roteiro de validação manual da equipe

1. Em terminal novo, `cd backend && npm install && npm start`; abrir `http://localhost:3001/indicadores` e confirmar `indicadores` com 27 estados.
2. Em outro terminal, `cd moblie && npm install && npx expo start`; ajustar `EXPO_PUBLIC_API_URL` ao emulador/rede. Abrir no dispositivo.
3. Fazer cinco toques na cidade, PIN de demonstração `1234`, e confirmar o retorno pelo botão **Sair**.
4. Criar, listar, editar e excluir uma ocorrência, fechar o app, reabrir e confirmar persistência na API.
5. Repetir o CRUD de Rede de Apoio; conferir erro com campos inválidos.
6. Abrir aba **Dados** e conferir Paraná: 2025, 87 feminicídios, taxa observada 1,4 por 100 mil mulheres; o app informa aviso de estimativa acadêmica.
7. Abrir dashboard no navegador; confirmar SOS demonstrativo na API e alteração de status. Não usar pessoas reais nem fazer chamadas reais.
8. Reiniciar API e Expo para verificar persistência com PGlite; se usar PostgreSQL servidor, testar também.
9. Atualizar Kanban, matriz, arquivos de entrega e commits individuais.
