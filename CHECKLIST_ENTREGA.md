# Checklist de Entrega — Weather Now

## Requisitos e status

| Requisito | Status | Evidência |
|---|---|---|
| App disfarçado em clima | Implementado e testado | `src/` e `moblie/src/screens/ClimaTela.js` |
| Acesso por PIN | Implementado e testado | `moblie/src/screens/PinTela.js` |
| CRUD de ocorrências | Implementado | `backend/src/controllers/ocorrenciasController.js` e `moblie/src/store/ocorrenciasSlice.js` |
| CRUD de rede de apoio | Implementado | `backend/src/routes/contatosApoio.js`, `moblie/src/screens/reservada/ContatosTela.js` |
| SOS demonstrativo | Implementado | `moblie/src/screens/reservada/SOSTela.js`, `backend/src/routes/alertas.js` |
| Persistência em PostgreSQL | Implementado | `backend/database/schema.sql` |
| Dashboard de alertas | Implementado | `dashboard/index.html` e `dashboard/app.js` |
| Saída rápida da área reservada | Implementado | `moblie/src/screens/reservada/SobreTela.js` |
| Navegação protegida | Implementado | `moblie/src/src/navigation/index.js` |
| Documentação | Implementado | `README.md` |

## Observações

- O projeto principal foi mantido na raiz do workspace.
- O banco de dados precisa estar disponível localmente para a API funcionar plenamente.
- Os dados de demonstração são fictícios e acadêmicos.
- O painel web depende da API rodando em `http://localhost:3001`.
