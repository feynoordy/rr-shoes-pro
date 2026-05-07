const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// Listar pedidos do usuário
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { usuario_id: req.user.id },
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Buscar pedido por ID
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Pedido não encontrado' });
    }
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Criar pedido (sem autenticação para guest checkout)
router.post('/', async (req, res) => {
  try {
    const { items, subtotal, desconto, frete, total, metodo_pagamento, dados_cliente, endereco_entrega } = req.body;
    
    const order = await Order.create({
      subtotal,
      desconto: desconto || 0,
      frete: frete || 0,
      total,
      metodo_pagamento,
      dados_cliente,
      endereco_entrega,
      itens: items,
      status: 'pending',
      pagamento_status: 'pending'
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Atualizar status do pedido (admin)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByPk(req.params.id);
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Pedido não encontrado' });
    }

    order.status = status;
    await order.save();

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
