const express = require("express");
const router = express.Router();
const { Order, Service } = require("../db");

// Criar pedido
router.post("/", async (req, res) => {
  try {
    const { serviceId, customerId } = req.body;

    const service = await Service.findByPk(serviceId);

    if (!service) {
      return res.status(404).json({ message: "Serviço não encontrado" });
    }

    const newOrder = await Order.create({
      serviceId,
      customerId,
      providerId: service.providerId
    });

    res.status(201).json(newOrder);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao criar pedido" });
  }
});

// Listar pedidos do prestador
router.get("/provider/:id", async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { providerId: req.params.id },
      include: [{ model: Service, as: "service" }]
    });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar pedidos" });
  }
});

// Atualizar status do pedido
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Pedido não encontrado" });
    }

    order.status = status;
    await order.save();

    res.json(order);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao atualizar pedido" });
  }
});

module.exports = router;
