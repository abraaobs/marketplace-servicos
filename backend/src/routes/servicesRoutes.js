const express = require("express");
const router = express.Router();
const { Service, User } = require("../db");
const upload = require("../middleware/upload");

// ==========================
// GET /api/services
// Lista todos os serviços
// ==========================
router.get("/", async (req, res) => {
  try {
    const services = await Service.findAll({
      include: [
        { model: User, as: "provider", attributes: ["id", "name", "email"] }
      ]
    });
    res.json(services);
  } catch (err) {
    console.error("❌ Erro ao buscar serviços:", err);
    res.status(500).json({ message: "Erro ao buscar serviços" });
  }
});

// ==========================
// GET /api/services/provider/:id
// Lista serviços de um prestador
// ==========================
router.get("/provider/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const services = await Service.findAll({
      where: { providerId: id },
      attributes: ["id", "title", "description", "price", "image", "providerId"]
    });

    res.json(services);
  } catch (err) {
    console.error("❌ Erro ao buscar serviços do prestador:", err);
    res.status(500).json({ message: "Erro ao buscar serviços do prestador" });
  }
});

// ==========================
// POST /api/services
// Criar serviço (com upload)
// ==========================
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, price, providerId } = req.body;

    if (!title || !description || !price || !providerId) {
      return res.status(400).json({ message: "Campos obrigatórios faltando." });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newService = await Service.create({
      title,
      description,
      price,
      providerId,
      image: imageUrl
    });

    res.status(201).json(newService);
  } catch (err) {
    console.error("❌ Erro ao criar serviço:", err);
    res.status(500).json({ message: "Erro ao criar serviço" });
  }
});

// ==========================
// PUT /api/services/:id
// Atualizar serviço (com upload opcional)
// ==========================
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, description, price } = req.body;

    const service = await Service.findByPk(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Serviço não encontrado" });
    }

    service.title = title ?? service.title;
    service.description = description ?? service.description;
    service.price = price ?? service.price;

    if (req.file) {
      service.image = `/uploads/${req.file.filename}`;
    }

    await service.save();

    res.json({ message: "Serviço atualizado com sucesso", service });
  } catch (err) {
    console.error("❌ Erro ao atualizar serviço:", err);
    res.status(500).json({ message: "Erro ao atualizar serviço" });
  }
});

// ==========================
// DELETE /api/services/:id
// Excluir serviço
// ==========================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ message: "Serviço não encontrado" });
    }

    await service.destroy();

    res.json({ message: "Serviço removido com sucesso" });
  } catch (err) {
    console.error("❌ Erro ao excluir serviço:", err);
    res.status(500).json({ message: "Erro ao excluir serviço" });
  }
});

module.exports = router;
