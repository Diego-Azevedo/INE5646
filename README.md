# Frontend - Conversor JSON e Visualizador de Dados

## Sistema de Conversão, Visualização e Autenticação de Usuários

Este projeto fornece uma interface web para conversão de dados JSON em diferentes formatos, visualização por meio de gráficos personalizados e autenticação de usuários.

## Funcionalidades

- **Exportação de Dados**
  - Conversão de JSON para os formatos:
    - CSV
    - Tabela (HTML Table)
    - Gráfico (Chart)

- **Gráficos Personalizados**
  - Geração de gráficos dinâmicos com base nos dados inseridos.

- **Cadastro e Login de Usuários**
  - Sistema de autenticação com páginas de registro e login.

## Infraestrutura de Produção

- AWS EC2
- Nginx
- PM2 (Process Manager)

## Stack Tecnológica

- **Frontend:**
  - Vue.js
  - Quasar Framework (UI e CSS)

- **Backend:**
  - Node.js 18
  - MongoDB

## Configuração da URL da API

O projeto utiliza uma variável de ambiente para definir a URL da API.

No arquivo `.env` da raiz do frontend, é possível alternar entre o ambiente de produção e o ambiente local:

```env
# API de produção
VUE_APP_API_URL=https://jsonconvert.org/api

# API local
VUE_APP_API_URL=http://localhost:3000


## Como Rodar o Projeto Localmente

```bash
# Instale o Quasar globalmente
npm install -g @quasar/cli

# Ative a versão correta do Node.js
nvm use 18

# Instale as dependências na raiz do projeto
npm install

# Inicie o servidor de desenvolvimento local
quasar dev
