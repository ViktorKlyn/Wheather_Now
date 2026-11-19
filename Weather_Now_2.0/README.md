# Weather Now 2.0 — Projeto Integrador 2026

**Desenvolvimento Mobile + Data Science | Universidade Positivo — campus Londrina**  
**Equipe:** João Victor Klein e Gustavo Lira  
**Tema:** aplicativo de clima com área acadêmica reservada para registros fictícios e apoio informativo.

> **IMPORTANTE:** protótipo acadêmico, não é serviço de emergência e **não deve ser usado com dados reais de vítimas**. O botão SOS registra somente um evento de teste no painel local; não chama polícia ou serviços oficiais. Para emergências reais: **190**; apoio à mulher: **180**. PIN fixo e API sem autenticação de produção não são segurança real.

## O que está implementado

- Aplicativo Expo/React Native em `moblie/` (nome de pasta preservado da equipe): fachada de previsão do tempo, **cinco toques em Londrina**, PIN de demonstração `1234`, área reservada e botão de saída rápida.
- **Ocorrências** e **Rede de Apoio**: duas entidades com `GET`, `GET /:id`, `POST`, `PUT`, `DELETE`, associadas à usuária fictícia pela chave estrangeira `usuario_id`. Dados reais de banco, não arrays locais de demonstração.
- API em `backend/`: Node.js/Express, SQL relacional PostgreSQL compatível. **PGlite persistente por padrão** (sem serviço externo) e suporte opcional a PostgreSQL convencional.
- SOS de demonstração: rota `POST /alertas`, histórico, edição e atualização de status; dashboard HTML em `dashboard/` que faz polling a cada 8 segundos, mostra conta de teste, horário e localização (simulada ou do dispositivo de teste).
- Data Science: notebook Python com **dados reais agregados e públicos** do FBSP, Tabela 21 (2024–2025), EDA, tratamento, classificação experimental, comparação com baseline, métricas, matriz de confusão e validação cruzada por UF; 27 indicadores de 2025 exportados como JSON para `GET /indicadores` e aba **Dados** do Expo.

## 1. Rodar a API — o jeito mais simples

Requisitos: **Node.js 20 ou superior** e npm.

```bash
cd backend
npm install
npm start
```

Abra `http://localhost:3001/` e `http://localhost:3001/indicadores`. O modo padrão é **PGlite**, banco SQL relacional que cria tabelas e guarda os dados no perfil do sistema (pasta `.weather-now` ou equivalente); **não é banco mockado**. Não precisa copiar um `.env` para executar com essa configuração.

### PostgreSQL tradicional (opcional)

Se desejar usar um servidor PostgreSQL instalado, crie o banco `weather_now`, copie `.env.example` para `.env`, defina `DB_DRIVER=postgres` e configure as credenciais do seu computador. **Não envie o arquivo `.env` ao GitHub/Blackboard.** A API aplica `database/schema.sql` ao iniciar.

### Testar as rotas

Com a API ligada, execute comandos no terminal, por exemplo:

```bash
curl http://localhost:3001/ocorrencias
curl http://localhost:3001/contatos-apoio
curl http://localhost:3001/indicadores
```

Execute também `npm test` dentro de `backend/` (a suíte inicia uma API isolada e realiza testes com PGlite em memória). Há um roteiro manual em `docs/testes.md`. A revisão de 15/11 validou 21 respostas HTTP usando o banco PGlite em memória. **Não foram feitos testes com servidor PostgreSQL tradicional nem em celular físico neste ambiente.**

## 2. Rodar o aplicativo Expo

```bash
cd moblie
npm install
npx expo start
```

Para **Expo Web no mesmo PC**, o app usa `http://localhost:3001` como padrão. Para **emulador Android**, crie `moblie/.env` com:

```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:3001
```

Para **celular físico na mesma rede Wi-Fi**, troque pelo IPv4 do seu computador (obtido com `ipconfig` no Windows):

```env
EXPO_PUBLIC_API_URL=http://192.168.1.100:3001
```

O IP acima é **exemplo**, não endereço verificado. Reinicie o Expo após alterar `.env`; libere a porta 3001 no firewall local se necessário. **Nunca use dados reais e não exponha essa API publicamente:** o PIN não protege os endpoints do servidor.

### Demonstrar

1. No app, toque **5 vezes** no nome da cidade **Londrina**, depois digite o PIN demonstrativo `1234`.
2. Em **Registros**, faça criar/listar/editar/excluir ocorrência fictícia.
3. Em **Rede**, faça criar/listar/editar/excluir contato fictício.
4. Em **Dados**, escolha **Paraná** ou outro estado e mostre a taxa observada e a **categoria estatística experimental**, geradas a partir do notebook.
5. Em **SOS**, confirme um alerta acadêmico de teste; verifique sua chegada ao dashboard.
6. Toque em **Sair** para voltar à fachada; os slices de Redux são esvaziados no logout. A API mantém os registros fictícios no banco para a próxima sessão.

## 3. Dashboard SOS

Com a API rodando, abra `dashboard/index.html` em um navegador (ou rode `python -m http.server 8000` dentro de `dashboard` e abra `http://localhost:8000`). O painel usa `http://localhost:3001/alertas` por padrão ou o parâmetro `?api=http://HOST:PORTA`. Atualização automática por polling; conta, local e horário do SOS fictício, com atualização de status.

## 4. Data Science

Em terminal **com Python 3.10+**:

```bash
cd data-science
python -m pip install -r requirements.txt
jupyter notebook notebook.ipynb
```

O notebook já foi salvo **executado, com gráficos e métricas visíveis**. Ao executar novamente dentro de `data-science/`, ele atualiza `backend/data-science/indicadores.json` e os PNGs em `graficos/`. Usar apenas dados oficiais agregados; consulte `data-science/README.md` para fonte, limitação do modelo e ética.

## 5. Estrutura

```text
Weather-Now-2.0/
├── backend/                 # Express, controllers, models, rotas, esquema, indicadores JSON
├── moblie/                  # Expo, telas, navegação, Redux, consumo de API
├── dashboard/               # painel web do SOS
├── data-science/            # notebook executado, CSV real, figuras, requirements.txt
├── docs/                    # matriz, testes, Kanban PNG e checklist para entrega
├── USO_IA.md                # documentação das IAs usadas
└── README.md
```

O front Vite na raiz foi mantido como recurso anterior do repositório; **para a entrega de Mobile use a pasta `moblie/`, não o Vite da raiz**.

## 6. Entrega Blackboard — prazo informado: 19/11/2026, 23h59

Envie o link do GitHub com commits da equipe, ZIP independente do Expo sem `node_modules`, PNG do Kanban, cópia de `USO_IA.md`, o notebook `.ipynb` executado e a resposta com o link público da base. Consulte `docs/ENTREGA_4_LEIA_PRIMEIRO.md`.

**Fica a cargo dos alunos:** indicar e demonstrar o CRUD de autoria de cada um, dividir formalmente o pipeline de Data Science, conferir a execução no dispositivo, revisar o Kanban real, publicar os commits individuais e entregar no Blackboard. Uma auditoria não pode comprovar autoria, histórico do GitHub ou testes em dispositivos de terceiros.

**Fonte do conjunto:** Fórum Brasileiro de Segurança Pública, *Anuário Brasileiro de Segurança Pública 2026*, Tabela 21, p. 149: https://img1.wsimg.com/blobby/go/ba03c51c-1e7c-44ed-9bd1-fba715830295/Anuario%20Brasileiro%20de%20Seguran%C3%A7a%20P%C3%BAblica%20-2026.pdf
