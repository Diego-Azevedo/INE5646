# Projeto - Conversor JSON e Visualizador de Dados

Este projeto tem como objetivo fornecer uma interface web para converter dados JSON em diversos formatos, visualizar os dados em gráficos personalizados e permitir a autenticação de usuários.

---

## Funcionalidades

- **Exportar Dados**  
  Converta JSON para os seguintes formatos:
  - ODT
  - CSV
  - XLSX

- **Gráficos Personalizados**  
  Geração de gráficos com base nos dados fornecidos pelo usuário.

- **Cadastro e Login de Usuários**  
  Sistema de autenticação com página de login e registro.


## Servidor

Aws ec2
Nginx

## Stack Tecnológica

- **Frontend:**
  - [Vue.js](https://vuejs.org/)
  - [Quasar Framework](https://quasar.dev/) (CSS e UI)

- **Backend:**
  - [Node.js 18](https://nodejs.org/) (via NVM)
  - [MongoDB](https://www.mongodb.com/)

---

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
