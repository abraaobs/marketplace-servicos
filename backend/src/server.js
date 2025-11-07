// src/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./db');

// Rotas
const authRoutes = require('./routes/authRoutes');
const servicesRoutes = require('./routes/servicesRoutes'); // se existir

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Usa as rotas
app.use('/api/auth', authRoutes);
if (servicesRoutes) {
  app.use('/api/services', servicesRoutes);
}

// Rota básica de teste
app.get('/', (req, res) => {
  res.send('API Marketplace está rodando 🚀');
});

// Inicializa o servidor e sincroniza o banco
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.sync(); // cria tabelas se não existirem
    app.listen(PORT, () => {
      console.log(`✅ Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
}

startServer();
