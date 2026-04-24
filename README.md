# CityCode

[![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)](https://github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](https://opensource.org/license/mit)
[![Language: JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow?style=for-the-badge&logo=javascript&logoColor=white)]()

Aplicação web simples para consulta de informações de cidades brasileiras (UF, sigla, localidade, município e DDD). Ideal para estudos, integrações leves ou uso em projetos front-end que precisem de uma API local de consulta geográfica.

## Recursos
- Busca por nome de localidade ou DDD.
- Filtro por Estado (UF).
- Resultados exibidos em tabela responsiva.
- Tratamento de erros no front-end e escape de HTML para segurança.
- Endpoint PHP simples para retorno de dados (pode ser adaptado para outras fontes).

## Tecnologias
- HTML, CSS, JavaScript (front-end)
- PHP & JS (back-end)
- MySQL 

## Estrutura do projeto
- index.html — Interface principal.
- source/css/style.css — Estilos e responsividade.
- source/js/main.js — Lógica de busca e renderização (funções principais: performSearch, preencherTabela, displayResults, escapeHtml).
- source/php/conexao.php — Conexão com o banco de dados.
- source/php/dados.php — Endpoint que fornece os dados.

> Observação: a pasta source/php e o arquivo .env estão listados em .gitignore para proteger credenciais.

## Instalação e uso
1. Clone o repositório: git clone <repo-url>
2. Abra em um servidor local (ex.: PHP/Apache, XAMPP ou similar).
3. Configure suas credenciais no arquivo .env (ou em source/php/conexao.php) — mantenha esse arquivo fora do controle de versão.
4. Acesse index.html via URL do servidor local, insira o termo de busca e pressione Buscar ou Enter.

## Contribuição
- Abra issues para bugs ou sugestões.
- Envie pull requests com descrições claras das mudanças.
- Mantenha commits pequenos e testáveis.

## 👤 Autor

Desenvolvido por **João Britto**. Vamo se conectar?

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/joaobrittodev/)
