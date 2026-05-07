const express = require('express');
const router = express.Router();
const stripe = require('../config/stripe');
const Order = require('../models/Order');

// ===== CRIAR SESSÃO DE PAGAMENTO STRIPE =====
router.post('/stripe/create-checkout', async (req, res) => {
  try {
    const { items, customer, shipping } = req.body;

    // Criar os line_items para Stripe
    const line_items = items.map((item) => ({
      price_data: {
        currency: 'brl',
        product_data: {
          name: item.nome || 'Produto RR_SHOEES',
          images: [item.imagem || 'https://via.placeholder.com/300'],
          description: `Tamanho: ${item.size || 'Único'} | Cor: ${item.color || 'Padrão'}`,
        },
        unit_amount: Math.round((item.preco || 0) * 100),
      },
      quantity: item.quantity || 1,
    }));

    // Criar sessão de checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:8000'}/obrigado.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:8000'}/checkout.html`,
      customer_email: customer?.email,
      line_items,
      metadata: {
        customer_name: customer?.nome || '',
        customer_cpf: customer?.cpf || '',
      },
    });

    // Criar pedido no banco
    const subtotal = items.reduce((sum, item) => sum + (item.preco * item.quantity), 0);
    const order = await Order.create({
      status: 'pending',
      subtotal,
      desconto: 0,
      frete: shipping?.price || 0,
      total: subtotal + (shipping?.price || 0),
      metodo_pagamento: 'credit_card',
      pagamento_id: session.id,
      pagamento_status: 'pending',
      dados_cliente: customer || {},
      endereco_entrega: shipping || {},
      itens: items
    });

    res.json({
      success: true,
      sessionId: session.id,
      sessionUrl: session.url,
      orderId: order.id
    });
  } catch (error) {
    console.error('Erro Stripe:', error.message);
    res.status(500).json({
      success: false,
      message: 'Erro ao criar sessão de pagamento: ' + error.message,
      error: error.message
    });
  }
});

// ===== PIX (SIMULAÇÃO) =====
router.post('/pix/create', async (req, res) => {
  try {
    const { items, customer } = req.body;
    const subtotal = items.reduce((sum, item) => sum + (item.preco * item.quantity), 0);
    const total = subtotal;

    const pixData = {
      qr_code: '00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426655440000',
      qr_code_base64: 'https://via.placeholder.com/200x200/f5f5f5/333?text=QR+PIX',
      expires_at: new Date(Date.now() + 30 * 60000).toISOString(),
      transaction_id: 'PIX' + Date.now()
    };

    const order = await Order.create({
      status: 'pending',
      subtotal,
      desconto: subtotal * 0.10,
      frete: 0,
      total: subtotal * 0.90,
      metodo_pagamento: 'pix',
      pagamento_id: pixData.transaction_id,
      pagamento_status: 'pending',
      dados_cliente: customer || {},
      itens: items
    });

    res.json({
      success: true,
      pix: pixData,
      orderId: order.id,
      total: order.total
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===== BOLETO =====
router.post('/boleto/create', async (req, res) => {
  try {
    const { items, customer } = req.body;
    const subtotal = items.reduce((sum, item) => sum + (item.preco * item.quantity), 0);
    const total = subtotal;

    const boletoData = {
      barcode: '00190.00009 01234.567890 12345.678901 2 12345678901234',
      url: 'https://via.placeholder.com/400x600/f5f5f5/333?text=BOLETO',
      due_date: new Date(Date.now() + 3 * 24 * 60 * 60000).toISOString(),
      transaction_id: 'BOL' + Date.now()
    };

    const order = await Order.create({
      status: 'pending',
      subtotal,
      desconto: 0,
      frete: 0,
      total,
      metodo_pagamento: 'boleto',
      pagamento_id: boletoData.transaction_id,
      pagamento_status: 'pending',
      dados_cliente: customer || {},
      itens: items
    });

    res.json({
      success: true,
      boleto: boletoData,
      orderId: order.id
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===== VERIFICAR STATUS DO PAGAMENTO =====
router.get('/status/:orderId', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Pedido não encontrado' });
    }

    res.json({
      success: true,
      order: {
        id: order.id,
        status: order.status,
        paymentStatus: order.pagamento_status,
        total: order.total,
        metodo_pagamento: order.metodo_pagamento
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
