# Matriz de papéis — Weather Now 2.0

> **Ação obrigatória antes do envio:** equipe deve conferir os fatos e confirmar a autoria individual. Divisão abaixo contém **propostas** para organizar a apresentação, não afirmações de que o autor executou o código.

| Integrante | Papel informado na Entrega 1 | CRUD individual para defesa — PROPOSTA A CONFIRMAR | Cursa Data Science? | Etapa DS individual — PROPOSTA A CONFIRMAR | GitHub |
| --- | --- | --- | --- | --- | --- |
| João Victor Klein | Back-end | Ocorrências (schema, rotas, controller, telas e API) | Sim, conforme Entrega 1 | Qualidade dos dados e EDA | Confirmar usuário |
| Gustavo Lira | Front-end | Rede de Apoio (schema, rotas, controller, telas e API) | Sim, conforme Entrega 1 | Modelagem e avaliação | Confirmar usuário |

**Regra do professor:** 1 CRUD completo por integrante, com modelagem, GET/GET:id/POST/PUT/DELETE e telas integradas a banco real; autoria verificável nos commits e explicação individual. A divisão inicial *back-end/front-end* não substitui a regra de 1 CRUD por aluno. Em Data Science, cada aluno explica a sua etapa do pipeline no notebook e na apresentação.

**Relacionamentos implementados:** `ocorrencias.usuario_id` e `contatos_apoio.usuario_id` referenciam `usuarios.id`. O backend obtém o ID da conta fictícia `weather_now_demo`. `alertas_sos.usuario_id` também referencia `usuarios.id`.

Confirme com o colega (1) qual CRUD cada um realmente fez, (2) qual parte do notebook realmente assumiu, (3) usuário GitHub e commits e (4) ensaios do próprio CRUD. Atualize os campos antes de declarar concluída a entrega.
