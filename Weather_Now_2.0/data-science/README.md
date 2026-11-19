# Data Science — Weather Now 2.0 (Entrega 4)

Base pública **real**, sem dados pessoais, transcrita da **Tabela 21, página 149, do Anuário Brasileiro de Segurança Pública 2026 (FBSP)**. São 54 registros agregados (27 UFs × 2024 e 2025) com contagens e taxas de homicídios de mulheres e feminicídios. Totais conferidos: 2024 = 3.728 homicídios de mulheres e 1.504 feminicídios; 2025 = 3.539 e 1.571, respectivamente.

**Link:** https://img1.wsimg.com/blobby/go/ba03c51c-1e7c-44ed-9bd1-fba715830295/Anuario%20Brasileiro%20de%20Seguran%C3%A7a%20P%C3%BAblica%20-2026.pdf

Arquivos:
- `dados/fbsp_tabela21_2024_2025.csv`: transcrição reduzida e auditável dos dados oficiais, 54 linhas.
- `notebook.ipynb`: notebook **já executado**, EDA, limpeza, gráficos, classificação, métricas, validação cruzada e integração.
- `graficos/`: figuras em PNG geradas pelo notebook.
- `../backend/data-science/indicadores.json`: artefato de integração gerado pelo notebook; a API o expõe em `GET /indicadores`.

Execute os comandos **a partir desta pasta**:

```bash
python -m pip install -r requirements.txt
jupyter notebook notebook.ipynb
```

O alvo de classificação é se a **taxa estadual histórica** de feminicídios é ≥ 1,5 / 100 mil mulheres. Limiar **puramente didático, não oficial**. Regressão logística; `GroupShuffleSplit` com UFs sem sobreposição entre treino/teste; baseline e `GroupKFold` nos estados do treino. A variável usada de taxa de homicídios de mulheres **inclui feminicídios**; há relação entre feature e alvo, limitando a validade preditiva. A publicação fornece apenas dois anos e a amostra é pequena: **não se trata de predição de risco individual, nem de ferramenta operacional.** Métricas honestas e suas limitações estão nas saídas do notebook.

**Governança:** Dados publicamente disponíveis; a licença específica de redistribuição do Anuário não foi encontrada, por isso mantemos atribuição explícita e uso acadêmico. Confirme as condições com o FBSP antes de redistribuir comercialmente. Dados não se vinculam a contas de teste, vítimas ou registros de SOS.

**Autoria:** as etapas realmente conduzidas por João e Gustavo devem ser indicadas na matriz de responsabilidades, antes da entrega. Não atribuir trabalho a um integrante sem confirmação.
