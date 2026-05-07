const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING(200),
    unique: true
  },
  marca: {
    type: DataTypes.STRING(100),
    defaultValue: 'RR_SHOEES'
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  preco_promo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  categoria: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  imagem_principal: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  imagens: {
    type: DataTypes.JSON,
    allowNull: true
  },
  cores: {
    type: DataTypes.JSON,
    allowNull: true
  },
  tamanhos: {
    type: DataTypes.JSON,
    allowNull: true
  },
  estoque: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  destaque: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  avaliacao: {
    type: DataTypes.FLOAT,
    defaultValue: 5.0
  },
  num_avaliacoes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  sku: {
    type: DataTypes.STRING(50),
    unique: true
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'produtos'
});

// Gerar slug automaticamente
Product.beforeCreate((product) => {
  if (product.nome && !product.slug) {
    product.slug = product.nome
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
});

module.exports = Product;
