const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

// Usar SQLite (não precisa de servidor MySQL)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'database.sqlite'),
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true
  }
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Banco de dados SQLite conectado com sucesso!');
    
    // Sincronizar modelos
    await sequelize.sync({ alter: true });
    console.log('✅ Modelos sincronizados!');
    
    // Inserir produtos de exemplo se tabela estiver vazia
    const Product = require('../models/Product');
    const count = await Product.count();
    if (count === 0) {
      await Product.bulkCreate([
        {
          nome: "Nike Air Max 2026",
          marca: "Nike",
          preco: 899.90,
          preco_promo: 749.90,
          categoria: "Lançamento",
          descricao: "Nike Air Max 2026 - Tecnologia Air Max visível, cabedal em Flyknit e design futurista.",
          imagem_principal: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
          imagens: JSON.stringify([
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop"
          ]),
          cores: JSON.stringify(["Preto", "Branco", "Vermelho"]),
          tamanhos: JSON.stringify([36, 37, 38, 39, 40, 41, 42, 43, 44]),
          estoque: 20,
          destaque: true,
          avaliacao: 4.9,
          num_avaliacoes: 328,
          sku: "NIKE-AM-2026"
        },
        {
          nome: "Air Jordan 4 Retro 2026",
          marca: "Jordan",
          preco: 1299.90,
          preco_promo: 1099.90,
          categoria: "Lançamento",
          descricao: "Air Jordan 4 Retro 2026 - Lendário. Cabedal premium e amortecimento Air.",
          imagem_principal: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=600&h=600&fit=crop",
          imagens: JSON.stringify([
            "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=600&h=600&fit=crop"
          ]),
          cores: JSON.stringify(["Preto/Cinza", "Branco"]),
          tamanhos: JSON.stringify([37, 38, 39, 40, 41, 42, 43]),
          estoque: 10,
          destaque: true,
          avaliacao: 5.0,
          num_avaliacoes: 142,
          sku: "AJ4-2026"
        },
        {
          nome: "Nike Dunk Low Retro 2026",
          marca: "Nike",
          preco: 799.90,
          categoria: "Lançamento",
          descricao: "Nike Dunk Low Retro 2026 - O clássico das quadras reinventado.",
          imagem_principal: "https://images.unsplash.com/photo-1607522370275-f14206abe7d3?w=600&h=600&fit=crop",
          imagens: JSON.stringify([
            "https://images.unsplash.com/photo-1607522370275-f14206abe7d3?w=600&h=600&fit=crop"
          ]),
          cores: JSON.stringify(["Branco/Vermelho", "Azul", "Verde"]),
          tamanhos: JSON.stringify([35, 36, 37, 38, 39, 40, 41, 42]),
          estoque: 15,
          destaque: true,
          avaliacao: 4.8,
          num_avaliacoes: 256,
          sku: "NIKE-DUNK-2026"
        }
      ]);
      console.log('✅ Produtos de exemplo inseridos!');
    }
  } catch (error) {
    console.error('❌ Erro ao conectar banco de dados:', error.message);
  }
};

module.exports = { sequelize, connectDB };
