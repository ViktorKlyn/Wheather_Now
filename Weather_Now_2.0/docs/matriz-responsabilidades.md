# Matriz de papéis — Weather Now 2.0

> Divisão real de responsabilidades, confirmada pela equipe em 19/11/2026.

| Integrante | Papel | CRUD individual para defesa | Cursa Data Science? | Etapa DS individual | GitHub |
| --- | --- | --- | --- | --- | --- |
| João Victor Klein (Victor) | Back-end, estrutura inicial | Ocorrências (`ocorrencias`): schema, model, controller, rotas, telas `OcorrenciasTela` e `FormularioTela` | Sim | Qualidade dos dados e EDA (limpeza, análise exploratória, gráficos descritivos) | `ViktorKlyn` |
| Gustavo Lira | Front-end, correções finais | Rede de Apoio (`contatos_apoio`): schema, model, controller, rotas, telas `ContatosTela` e `FormularioContatoTela` | Sim | Modelagem e avaliação (regressão logística, GroupKFold, métricas, matriz de confusão) | `gustavoliradeoliveira` |

## Regra do professor

1 CRUD completo por integrante, com modelagem, GET / GET :id / POST / PUT / DELETE e telas integradas a banco real; autoria verificável nos commits e explicação individual. Em Data Science, cada aluno explica a sua etapa do pipeline no notebook e na apresentação.

## Relacionamentos implementados

- `ocorrencias.usuario_id` → `usuarios.id` (FK com ON DELETE CASCADE)
- `contatos_apoio.usuario_id` → `usuarios.id` (FK com ON DELETE CASCADE)
- `alertas_sos.usuario_id` → `usuarios.id` (FK com ON DELETE CASCADE)

O backend obtém o ID da conta fictícia `weather_now_demo` ao iniciar. Todos os registros dos CRUDs são associados a essa conta.

## Operações CRUD — evidência

| Recurso | GET (listar) | GET :id | POST | PUT | DELETE | Tela Expo |
| --- | --- | --- | --- | --- | --- | --- |
| Ocorrências | ✅ | ✅ | ✅ | ✅ | ✅ | `OcorrenciasTela` + `FormularioTela` |
| Rede de Apoio | ✅ | ✅ | ✅ | ✅ | ✅ | `ContatosTela` + `FormularioContatoTela` |
| Alertas SOS | ✅ | ✅ | ✅ | ✅ (body completo) + PATCH (status) | ✅ | `SOSTela` + Dashboard HTML |

Validado por `npm test` (21 verificações HTTP com PGlite em memória).
