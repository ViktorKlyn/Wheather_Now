# Data Science — Weather Now / Apoio à Mulher

Esta pasta contém todo o trabalho de Data Science do projeto.

## Estrutura

```
data-science/
├── dados/
│   ├── ligue180_bruto.csv         # Base bruta — NÃO modificar
│   └── ligue180_tratado.csv       # Base tratada gerada pelo notebook
├── notebook.ipynb                 # Notebook principal de análise
└── README.md                      # Este arquivo
```

## Base de Dados

**Painel Ligue 180 — Central de Atendimento à Mulher**
- **Fonte:** Ministério das Mulheres / Secretaria de Políticas para as Mulheres (SPM)
- **Link:** <https://www.gov.br/mulheres/pt-br/assuntos/ouvidoria-da-mulher/ligue-180>
- **Órgão responsável:** Ministério das Mulheres (MGI/SPM)
- **Período:** 2014–2023
- **Granularidade:** Mensal, por Unidade Federativa e categoria de violência
- **Licença:** Dados públicos do Governo Federal (Lei de Acesso à Informação — LAI 12.527/2011)

### Justificativa

O Ligue 180 é a principal central de denúncias de violência contra a mulher no Brasil.
Seus dados de chamadas categorizadas (violência doméstica, assédio, feminicídio, entre outras)
permitem identificar padrões geográficos e temporais relevantes ao tema do aplicativo.
A base é pública, referenciada e atualizada regularmente pelo governo federal.

## Como Executar

```bash
# Instalar dependências
pip install pandas numpy matplotlib seaborn jupyter

# Iniciar Jupyter
jupyter notebook notebook.ipynb
```

> **Aviso:** Este é um protótipo acadêmico. Os dados usados são públicos e agregados;
> nenhum dado pessoal real de vítimas está presente no repositório.
