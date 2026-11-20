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

### Celular em outra rede (túnel Cloudflare)

No Expo Go em um aparelho físico, `http://localhost:3001` aponta para o **próprio celular**, não para o computador onde a API roda. Por isso aparece erro do tipo `Failed to connect to localhost/127.0.0.1:3001`.

Há dois cenários distintos:

| Situação | O que usar |
| --- | --- |
| Celular e PC na **mesma Wi-Fi** | IPv4 da máquina no `.env` (ex.: `http://192.168.x.x:3001`) — ver acima |
| Celular em **outra rede** (4G, Wi-Fi diferente, etc.) | Túnel Cloudflare publicando a API (e, se preciso, o Metro) em URL HTTPS temporária |

Fluxo com túnel (dois túneis independentes):

```text
Expo Go (outra rede)
  ├─→ túnel Metro (HTTPS)  → Metro/Expo na máquina (:8081)
  └─→ túnel API  (HTTPS)   → backend Express (:3001)
```

#### O que vai para o Git e o que precisa refazer em cada máquina

**Pode (e deve) ir para o Git:**

- Estas instruções no `README.md`
- O modelo `moblie/.env.example` com **placeholders** (nunca com URL viva)
- O código que lê `EXPO_PUBLIC_API_URL` em `moblie/src/api.js`

**Não entra no Git / não “viaja” pronto entre máquinas:**

- `moblie/.env` — já está no `.gitignore`; cada pessoa copia do example e preenche
- Qualquer URL `*.trycloudflare.com` — **muda toda vez** que o túnel rápido é recriado ou reiniciado
- O processo `cloudflared`, credenciais geradas em `/tmp`, e o binário instalado na máquina

**Conclusão:** ao mudar de computador, ou ao derrubar e subir de novo o túnel, é obrigatório baixar/usar o `cloudflared`, subir a API, abrir o(s) túnel(is), colar a URL **nova** no `.env` local e reiniciar o Expo com cache limpo (`-c`). O repositório guarda só o *como fazer*, não um túnel permanente.

#### Pré-requisitos

1. API rodando: `cd backend && npm start` (deve responder em `http://localhost:3001`).
2. Binário `cloudflared` (Linux amd64). Se ainda não estiver no `PATH`:

```bash
curl -fsSL -o ./cloudflared https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
chmod +x ./cloudflared
```

Em outras plataformas, use o instalador oficial da Cloudflare para o seu sistema.

#### 1) Túnel da API (porta 3001)

Em um terminal separado, com a API já ligada:

```bash
./cloudflared tunnel --url http://localhost:3001
```

Na saída aparece uma URL do tipo `https://….trycloudflare.com`. Copie-a **sem barra no final** e grave em `moblie/.env` (arquivo local, não versionado):

```env
EXPO_PUBLIC_API_URL=https://SEU-SUBDOMINIO.trycloudflare.com
```

Confira se o túnel alcança a API:

```bash
curl https://SEU-SUBDOMINIO.trycloudflare.com/ocorrencias
```

#### 2) Expo e túnel do Metro (porta 8081)

`EXPO_PUBLIC_*` é embutido no bundle na subida do Metro. Depois de alterar o `.env`, reinicie com cache limpo:

```bash
cd moblie
npx expo start -c
```

Se o celular **não** estiver na mesma Wi-Fi do PC, o QR/`exp://192.168…` do Metro também não abre. O comando `npx expo start --tunnel` pode exigir login na conta Expo ou falhar no ngrok. O método que funcionou neste ambiente foi um **segundo** túnel Cloudflare para a porta 8081:

```bash
# terminal A — túnel do Metro (deixe rodando)
./cloudflared tunnel --url http://localhost:8081
```

```bash
# terminal B — Expo apontando o packager para a URL HTTPS do Metro
cd moblie
export EXPO_PACKAGER_PROXY_URL=https://SEU-SUBDOMINIO-METRO.trycloudflare.com
npx expo start -c --lan
```

No Expo Go, use **Enter URL** e cole a URL HTTPS do Metro (`https://SEU-SUBDOMINIO-METRO.trycloudflare.com`).

Ordem prática recomendada: (1) API, (2) túnel da API + `.env`, (3) túnel do Metro, (4) `expo start` com `EXPO_PACKAGER_PROXY_URL`.

#### Contorno se `cloudflared tunnel --url` der timeout

Neste ambiente o cliente `cloudflared` às vezes estourava o tempo ao pedir o *quick tunnel* (`context deadline exceeded`), enquanto um `POST` manual à API demorava ~14s e funcionava. Contorno:

```bash
# 1) Cria o túnel rápido e grava hostname + credenciais
RESP=$(curl -4 -sS --connect-timeout 30 --max-time 90 \
  -X POST https://api.trycloudflare.com/tunnel \
  -H 'Content-Type: application/json' -d '{}')

echo "$RESP" | python3 -c '
import json, sys
r = json.load(sys.stdin)["result"]
print("HOSTNAME=" + r["hostname"])
creds = {
  "AccountTag": r["account_tag"],
  "TunnelSecret": r["secret"],
  "TunnelID": r["id"],
  "TunnelName": r["name"],
}
open("/tmp/cf-creds.json", "w").write(json.dumps(creds))
open("/tmp/cf-tunnel-id.txt", "w").write(r["id"])
open("/tmp/cf-hostname.txt", "w").write(r["hostname"])
'

cat /tmp/cf-hostname.txt

# 2) Sobe o túnel (troque a porta: 3001 = API, 8081 = Metro)
./cloudflared tunnel \
  --credentials-file /tmp/cf-creds.json \
  --url http://localhost:3001 \
  --no-autoupdate \
  run "$(cat /tmp/cf-tunnel-id.txt)"
```

Use o `HOSTNAME` impresso como `EXPO_PUBLIC_API_URL` (API) ou `EXPO_PACKAGER_PROXY_URL` (Metro). Repita o processo em outro diretório/arquivos se precisar dos dois túneis ao mesmo tempo.

#### Segurança e encerramento

- A API **não tem autenticação de produção**. O túnel rápido expõe os endpoints na internet enquanto estiver ligado — use só para teste acadêmico, **sem dados reais**.
- Encerre o(s) processo(s) `cloudflared` (Ctrl+C) ao terminar a demonstração.
- Não faça commit de URL viva, de `moblie/.env` nem de arquivos de credenciais (`cf-creds.json`).
- Avisos no log do tipo timeout de DNS IPv6/`Failed to refresh DNS local resolver` podem aparecer; se `curl` na URL HTTPS ainda responder 200, o túnel segue utilizável.

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
