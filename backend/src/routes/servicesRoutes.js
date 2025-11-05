const express = require("express");
const router = express.Router();
const { Service } = require("../db"); // pega o model exportado

// 🔹 Listar todos os serviços
router.get("/", async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (error) {
    console.error("Erro ao buscar serviços:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

// 🔹 Buscar serviço específico por ID
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ error: "Serviço não encontrado" });
    res.json(service);
  } catch (error) {
    console.error("Erro ao buscar serviço:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

module.exports = router;
