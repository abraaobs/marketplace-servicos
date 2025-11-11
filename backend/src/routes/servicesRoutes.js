// backend/routes/servicesRoutes.js
const express = require("express");
const router = express.Router();
const { Service, User } = require("../db");

// ==========================
// GET /api/services
// → Lista todos os serviços
// ==========================
router.get("/", async (req, res) => {
  try {
    const services = await Service.findAll({
      include: [{ model: User, as: "provider", attributes: ["id", "name", "email"] }],
    });
    res.json(services);
  } catch (err) {
    console.error("❌ Erro ao buscar serviços:", err);
    res.status(500).json({ message: "Erro ao buscar serviços", error: err.message });
  }
});

// ==========================
// GET /api/services/provider/:id
// → Lista serviços de um prestador específico
// ==========================
router.get("/provider/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const services = await Service.findAll({ where: { providerId: id } });

    if (!services || services.length === 0) {
      return res.status(404).json({ message: "Nenhum serviço encontrado para este prestador." });
    }

    res.json(services);
  } catch (err) {
    console.error("❌ Erro ao buscar serviços do prestador:", err);
    res.status(500).json({ message: "Erro ao buscar serviços do prestador", error: err.message });
  }
});

// ==========================
// POST /api/services
// → Cria um novo serviço (prestador autenticado)
// ==========================
router.post("/", async (req, res) => {
  try {
    const { title, description, price, image, providerId } = req.body;

    if (!title || !description || !price || !providerId) {
      return res.status(400).json({ message: "Campos obrigatórios ausentes." });
    }

    // Verifica se o prestador existe
    const provider = await User.findByPk(providerId);
    if (!provider || provider.role !== "prestador") {
      return res.status(403).json({ message: "Somente prestadores podem cadastrar serviços." });
    }

    const newService = await Service.create({
      title,
      description,
      price,
      image,
      providerId,
    });

    res.status(201).json(newService);
  } catch (err) {
    console.error("❌ Erro ao criar serviço:", err);
    res.status(500).json({ message: "Erro ao criar serviço", error: err.message });
  }
});

// ==========================
// DELETE /api/services/:id
// → Exclui um serviço do prestador
// ==========================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ message: "Serviço não encontrado." });
    }

    await service.destroy();
    res.json({ message: "Serviço removido com sucesso." });
  } catch (err) {
    console.error("❌ Erro ao excluir serviço:", err);
    res.status(500).json({ message: "Erro ao excluir serviço", error: err.message });
  }
});

module.exports = router;
