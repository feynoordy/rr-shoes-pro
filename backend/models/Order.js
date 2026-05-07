const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.STRING(20),
    primaryKey: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'paid', 'shipped', 'delivered', 'cancelled'),
    defaultValue: 'pending'
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  desconto: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  frete: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  metodo_pagamento: {
    type: DataTypes.ENUM('pix', 'credit_card', 'boleto'),
    allowNull: false
  },
  pagamento_id: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  pagamento_status: {
    type: DataTypes.STRING(50),
    defaultValue: 'pending'
  },
  dados_cliente: {
    type: DataTypes.JSON,
    allowNull: true
  },
  endereco_entrega: {
    type: DataTypes.JSON,
    allowNull: true
  },
  itens: {
    type: DataTypes.JSON,
    allowNull: false
  }
}, {
  tableName: 'pedidos'
});

// Gerar ID do pedido
Order.beforeCreate((order) => {
  if (!order.id) {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    order.id = `RR${timestamp}${random}`;
  }
});

module.exports = Order;
