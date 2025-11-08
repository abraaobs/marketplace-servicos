const express = require("express");
const router = express.Router();
const { Service } = require("../db");
const auth = require("../middleware/authMiddleware");

// 🔹 Listar todos os serviços (público)
router.get("/", async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (error) {
    console.error("Erro ao buscar serviços:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

// 🔹 Criar novo serviço (apenas autenticado)
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, price } = req.body;
    if (!title || !description || !price) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes" });
    }

    const service = await Service.create({
      title,
      description,
      price,
      providerId: req.user.id, // vem do token decodificado
    });

    res.status(201).json(service);
  } catch (error) {
    console.error("Erro ao criar serviço:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

// 🔹 Listar serviços do prestador logado
router.get("/meus", auth, async (req, res) => {
  try {
    const services = await Service.findAll({
      where: { providerId: req.user.id },
    });

    if (services.length === 0) {
      return res.status(404).json({ message: "Nenhum serviço encontrado para este usuário" });
    }

    res.json(services);
  } catch (error) {
    console.error("Erro ao buscar serviços do usuário:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

// 🔹 Buscar serviço específico por ID (público)
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

// 🔹 Atualizar serviço (somente o dono pode editar)
router.put("/:id", auth, async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ error: "Serviço não encontrado" });

    if (service.providerId !== req.user.id) {
      return res.status(403).json({ error: "Você não tem permissão para editar este serviço" });
    }

    const { title, description, price } = req.body;
    await service.update({ title, description, price });

    res.json({ message: "Serviço atualizado com sucesso", service });
  } catch (error) {
    console.error("Erro ao atualizar serviço:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

// 🔹 Excluir serviço (somente o dono pode excluir)
router.delete("/:id", auth, async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ error: "Serviço não encontrado" });

    if (service.providerId !== req.user.id) {
      return res.status(403).json({ error: "Você não tem permissão para excluir este serviço" });
    }

    await service.destroy();
    res.json({ message: "Serviço removido com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir serviço:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

module.exports = router;
