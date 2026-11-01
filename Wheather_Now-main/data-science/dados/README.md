# Pasta de Dados — Ligue 180

Coloque aqui os arquivos CSV baixados do Painel Ligue 180.

## Arquivos esperados

- `ligue180_bruto.csv` — arquivo original baixado da fonte (não modificar)
- `ligue180_tratado.csv` — gerado automaticamente pelo notebook após execução

## Como obter a base real

1. Acesse: <https://www.gov.br/mulheres/pt-br/assuntos/ouvidoria-da-mulher/ligue-180>
2. Navegue até "Dados Abertos" ou "Painéis de Dados"
3. Baixe o CSV do período 2014–2023
4. Renomeie para `ligue180_bruto.csv` e coloque nesta pasta
5. Atualize os nomes das colunas no bloco de configuração do `notebook.ipynb`

## Privacidade

Os arquivos CSV **não devem ser versionados** no GitHub se contiverem dados
pessoais identificáveis. A base do Ligue 180 é agregada, mas verifique
os termos de redistribuição antes de commitar.
