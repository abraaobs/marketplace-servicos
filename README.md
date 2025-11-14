# 🛠️ Marketserv – Marketplace de Serviços

## 📚 Identificação do Projeto
**Disciplina:** Desenvolvimento Full Stack  
**Curso:** Análise e Desenvolvimento de Sistemas  
**Período:** 2025.2  
**Autor:** Abraão Silva  
**Instituição:** UEPB  

---

## 🧩 Descrição Geral

O **Marketserv** é um marketplace de serviços que conecta clientes e prestadores de forma simples e eficiente.  

A plataforma permite:

- Que **prestadores cadastrem e editem serviços**, incluindo **upload de imagens locais**.  
- Que **clientes contratem serviços** diretamente pela interface.  
- Que **pedidos sejam gerenciados** tanto pelo cliente quanto pelo prestador.  
- Que o sistema mantenha todo o fluxo de trabalho de forma organizada, desde o cadastro até a conclusão do pedido.

---

## 🎯 Objetivos do Projeto

- Criar uma aplicação web completa utilizando arquitetura full stack.  
- Implementar autenticação para clientes e prestadores.  
- Fornecer um ambiente de gestão de serviços e pedidos.  
- Integrar frontend e backend através de uma API REST.  
- Utilizar banco de dados relacional com Sequelize.  
- Manter versionamento completo via Git e GitHub.  

---

## ⚙️ Tecnologias Utilizadas

| Camada | Ferramentas |
|--------|-------------|
| **Frontend** | React, Vite, CSS, Context API, Fetch/Axios |
| **Backend** | Node.js, Express, Sequelize, Multer, JWT |
| **Banco de Dados** | SQLite |
| **Ambiente** | VS Code, Node 18+ |
| **Versionamento** | Git + GitHub |

---

## 🧱 Estrutura de Diretórios

```
Marketserv/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/upload.js
│   │   └── server.js
│   ├── uploads/
│   └── database.sqlite
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── api.js
│   │   └── App.jsx
│
└── README.md
```

---

## 💡 Funcionalidades Implementadas

### 👤 Autenticação
- Login e cadastro de usuários (cliente e prestador)
- Proteção de rotas com Context API
- Persistência de sessão

### 🛒 Clientes
- Listagem de serviços
- Contratação
- Histórico de serviços contratados
- Exibição do prestador e status do pedido

### 🧑‍🔧 Prestadores
- Cadastro, edição e exclusão de serviços
- Upload de imagens
- Listagem de pedidos recebidos
- Aceitar, recusar ou concluir pedidos

### 🔗 Backend (API REST)
- CRUD de serviços
- CRUD de pedidos
- Upload de arquivos estáticos

### 🌐 Extras
- Cotação USD, EUR e BTC em tempo real
- Interface responsiva

---

## 🚀 Execução

### Backend
```
cd backend
npm install
npm run dev
```

### Frontend
```
cd frontend
npm install
npm run dev
```

---

## ✔️ Status
Projeto completo e funcional.

---
