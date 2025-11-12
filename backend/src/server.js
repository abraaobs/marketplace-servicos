require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./db");

// Rotas
const authRoutes = require("./routes/authRoutes");
const servicesRoutes = require("./routes/servicesRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Expor imagens locais
app.use("/uploads", express.static("uploads"));

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/services", servicesRoutes);

// Teste
app.get("/", (req, res) => {
  res.send("API Marketplace está rodando 🚀");
});

// Inicialização
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("🔗 Banco conectado com sucesso!");

    await sequelize.sync();
    console.log("🗃️ Tabelas sincronizadas.");

    app.listen(PORT, () => {
      console.log(`⚡ Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
}

startServer();
