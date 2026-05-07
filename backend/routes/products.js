const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { Op } = require('sequelize');

// Listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const { categoria, destaque, busca } = req.query;
    let where = { ativo: true };

    if (categoria && categoria !== 'all') {
      where.categoria = categoria;
    }
    if (destaque === 'true') {
      where.destaque = true;
    }
    if (busca) {
      where.nome = { [Op.like]: `%${busca}%` };
    }

    const products = await Product.findAll({ 
      where,
      order: [['created_at', 'DESC']]
    });
    
    res.json({ success: true, products, total: products.length });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error.message);
    // Fallback para array vazio
    res.json({ success: true, products: [], total: 0 });
  }
});

// Buscar produto por ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Produto não encontrado' });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
