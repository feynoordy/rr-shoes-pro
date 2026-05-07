const { sequelize } = require('./database');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

async function initDatabase() {
  try {
    // Forçar criação das tabelas
    await sequelize.sync({ force: false });
    console.log('✅ Tabelas criadas/verificadas com sucesso!');
    
    // Verificar se já existem produtos
    const productCount = await Product.count();
    console.log(`📦 Produtos no banco: ${productCount}`);
    
    if (productCount === 0) {
      console.log('📦 Inserindo produtos de exemplo...');
      await Product.bulkCreate([
        {
          nome: "Nike Air Max 2026",
          marca: "Nike",
          preco: 899.90,
          preco_promo: 749.90,
          categoria: "Lançamento",
          descricao: "Nike Air Max 2026 - A evolução do icônico. Tecnologia Air Max visível, cabedal em Flyknit e design futurista.",
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
          sku: "NIKE-AM-2026",
          ativo: true
        },
        {
          nome: "Air Jordan 4 Retro 2026",
          marca: "Jordan",
          preco: 1299.90,
          preco_promo: 1099.90,
          categoria: "Lançamento",
          descricao: "Air Jordan 4 Retro 2026 - Lendário. Cabedal premium e amortecimento Air.",
          imagem_principal: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=600&h=600&fit=crop",
          imagens: JSON.stringify(["https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=600&h=600&fit=crop"]),
          cores: JSON.stringify(["Preto/Cinza", "Branco"]),
          tamanhos: JSON.stringify([37, 38, 39, 40, 41, 42, 43]),
          estoque: 10,
          destaque: true,
          avaliacao: 5.0,
          num_avaliacoes: 142,
          sku: "AJ4-2026",
          ativo: true
        },
        {
          nome: "Nike Dunk Low Retro 2026",
          marca: "Nike",
          preco: 799.90,
          preco_promo: null,
          categoria: "Lançamento",
          descricao: "Nike Dunk Low Retro 2026 - O clássico das quadras reinventado com materiais sustentáveis.",
          imagem_principal: "https://images.unsplash.com/photo-1607522370275-f14206abe7d3?w=600&h=600&fit=crop",
          imagens: JSON.stringify(["https://images.unsplash.com/photo-1607522370275-f14206abe7d3?w=600&h=600&fit=crop"]),
          cores: JSON.stringify(["Branco/Vermelho", "Azul", "Verde"]),
          tamanhos: JSON.stringify([35, 36, 37, 38, 39, 40, 41, 42]),
          estoque: 15,
          destaque: true,
          avaliacao: 4.8,
          num_avaliacoes: 256,
          sku: "NIKE-DUNK-2026",
          ativo: true
        },
        {
          nome: "Adidas Forum Low 2026",
          marca: "Adidas",
          preco: 549.90,
          preco_promo: 449.90,
          categoria: "Classic",
          descricao: "Adidas Forum Low 2026 - O clássico do basquete reinventado para as ruas.",
          imagem_principal: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop",
          imagens: JSON.stringify(["https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop"]),
          cores: JSON.stringify(["Branco", "Branco/Azul"]),
          tamanhos: JSON.stringify([37, 38, 39, 40, 41, 42, 43]),
          estoque: 32,
          destaque: false,
          avaliacao: 4.6,
          num_avaliacoes: 189,
          sku: "AD-FORUM-2026",
          ativo: true
        },
        {
          nome: "Puma Suede Classic 2026",
          marca: "Puma",
          preco: 399.90,
          preco_promo: 329.90,
          categoria: "Classic",
          descricao: "Puma Suede Classic - Ícone do streetwear desde 1968.",
          imagem_principal: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop",
          imagens: JSON.stringify(["https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop"]),
          cores: JSON.stringify(["Preto", "Azul Marinho", "Vermelho"]),
          tamanhos: JSON.stringify([36, 37, 38, 39, 40, 41]),
          estoque: 40,
          destaque: false,
          avaliacao: 4.5,
          num_avaliacoes: 312,
          sku: "PUMA-SUEDE-2026",
          ativo: true
        },
        {
          nome: "New Balance 574 2026",
          marca: "New Balance",
          preco: 499.90,
          preco_promo: 429.90,
          categoria: "Casual",
          descricao: "New Balance 574 - Conforto incomparável com estilo retrô.",
          imagem_principal: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop",
          imagens: JSON.stringify(["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop"]),
          cores: JSON.stringify(["Cinza", "Azul", "Verde"]),
          tamanhos: JSON.stringify([37, 38, 39, 40, 41, 42, 43]),
          estoque: 28,
          destaque: false,
          avaliacao: 4.7,
          num_avaliacoes: 198,
          sku: "NB-574-2026",
          ativo: true
        }
      ]);
      console.log('✅ 6 produtos inseridos com sucesso!');
    }
    
    // Criar admin se não existir
    const adminCount = await User.count({ where: { email: 'admin@rrshoes.com.br' } });
    if (adminCount === 0) {
      await User.create({
        nome: "Administrador",
        email: "admin@rrshoes.com.br",
        senha: "admin123",
        role: "admin"
      });
      console.log('✅ Usuário admin criado! (admin@rrshoes.com.br / admin123)');
    }
    
    console.log('🎉 Banco de dados inicializado com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao inicializar banco:', error.message);
    console.error(error);
    process.exit(1);
  }
}

initDatabase();
