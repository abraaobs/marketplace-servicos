# 🛠️ Marketserv – Marketplace de Serviços

## 📚 Identificação do Projeto
**Disciplina:** Desenvolvimento Full Stack  
**Curso:** Análise e Desenvolvimento de Sistemas  
**Período:** 2025.2  
**Autor:** Abraão Silva  
**Instituição:** —  
**Orientador:** —  

---

## 🧩 Descrição Geral

O **Marketserv** é um *marketplace de serviços* que conecta clientes a prestadores de forma simples, rápida e acessível.  
A aplicação permite ao usuário visualizar serviços por categoria, realizar buscas filtradas e interagir com um catálogo de prestadores.  

O sistema foi desenvolvido com **arquitetura full-stack**, integrando **frontend em React** com **backend em Node.js e Express**, e banco de dados **SQLite**.  
O projeto representa a aplicação prática dos conhecimentos adquiridos na disciplina de **Desenvolvimento Full Stack**, enfatizando a integração entre camadas, a usabilidade e a persistência de dados.

---

## 🎯 Objetivos do Projeto

- Desenvolver uma aplicação web completa (cliente-servidor).  
- Implementar autenticação, cadastro e listagem de serviços.  
- Criar interface intuitiva e responsiva com React e Bootstrap.  
- Integrar o frontend com API REST no backend Express.  
- Demonstrar práticas de versionamento e modularização com Git e GitHub.

---

## ⚙️ Tecnologias Utilizadas

| Camada | Tecnologias e Ferramentas |
|--------|----------------------------|
| **Frontend** | React, Vite, Bootstrap 5, CSS |
| **Backend** | Node.js, Express, Sequelize, SQLite |
| **Controle de Versão** | Git, GitHub |
| **Ambiente de Desenvolvimento** | Visual Studio Code, Node 18+ |

---

## 🧱 Estrutura de Diretórios

marketplace-servicos/
├── backend/ → servidor Node.js (API REST)
│ ├── src/
│ │ ├── routes/ → rotas de autenticação e serviços
│ │ ├── models/ → modelos Sequelize
│ │ └── server.js → inicialização da API
│ ├── package.json
│ └── .env
│
├── frontend/ → aplicação React (Vite)
│ ├── src/
│ │ ├── components/ → componentes reutilizáveis (cards, categorias)
│ │ ├── pages/ → páginas principais (Home, Login, Register, Painéis)
│ │ ├── api.js → central de chamadas à API
│ │ └── App.jsx → estrutura principal de rotas
│ ├── index.html
│ └── package.json
│
└── README.md


---

## 💡 Funcionalidades Implementadas

- Página inicial com categorias interativas e ícones (Bootstrap).  
- Filtro dinâmico por categoria (“Pintura & Reforma”, “Limpeza”, “Tecnologia”, etc).  
- Botão **“Outros Serviços”** para exibir todos os resultados.  
- Barra de pesquisa funcional com atualização instantânea.  
- Listagem de serviços cadastrados via API.  
- Login e cadastro de usuários (cliente e prestador).  
- Painel de cliente e de prestador com acesso restrito.  
- Layout responsivo e moderno, adaptado para desktop e mobile.  

---

## 🚀 Execução do Projeto

### 🔧 Pré-requisitos
- **Node.js** instalado (versão 18 ou superior)
- **Git** instalado para versionamento

### 🧭 Passos de Instalação e Execução

# Clonar o repositório
git clone https://github.com/abraaobs/marketplace-servicos.git
cd marketplace-servicos

# Backend
cd backend
npm install
npm run dev

# Frontend
cd ../frontend
npm install
npm run dev


