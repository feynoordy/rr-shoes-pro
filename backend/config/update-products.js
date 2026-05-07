const { sequelize } = require('./database');
const Product = require('../models/Product');

async function updateProducts() {
  try {
    await sequelize.sync({ alter: true });
    
    // Remover produtos antigos
    await Product.destroy({ where: {}, truncate: true });
    console.log('🗑️ Produtos antigos removidos');

    // Inserir novos produtos com imagens reais
    const produtos = [
      // ===== LANÇAMENTOS =====
      {
        nome: "Nike Air Max 2026",
        marca: "Nike",
        preco: 899.90,
        preco_promo: 749.90,
        categoria: "Lançamento",
        descricao: "Nike Air Max 2026 - A evolução do icônico. Tecnologia Air Max visível, cabedal em Flyknit e design futurista que combina conforto e estilo.",
        imagem_principal: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
        imagens: JSON.stringify([
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=600&h=600&fit=crop"
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
        descricao: "Air Jordan 4 Retro 2026 - Lendário. Cabedal premium, amortecimento Air e design que marcou época nas quadras.",
        imagem_principal: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=600&h=600&fit=crop",
        imagens: JSON.stringify([
          "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1607522370275-f14206abe7d3?w=600&h=600&fit=crop"
        ]),
        cores: JSON.stringify(["Preto/Cinza", "Branco", "Vermelho"]),
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
        descricao: "Nike Dunk Low Retro 2026 - O clássico das quadras reinventado com materiais sustentáveis e cores vibrantes para um visual autêntico.",
        imagem_principal: "https://images.unsplash.com/photo-1607522370275-f14206abe7d3?w=600&h=600&fit=crop",
        imagens: JSON.stringify([
          "https://images.unsplash.com/photo-1607522370275-f14206abe7d3?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop"
        ]),
        cores: JSON.stringify(["Branco/Vermelho", "Azul", "Verde"]),
        tamanhos: JSON.stringify([35, 36, 37, 38, 39, 40, 41, 42]),
        estoque: 15,
        destaque: true,
        avaliacao: 4.8,
        num_avaliacoes: 256,
        sku: "NIKE-DUNK-2026",
        ativo: true
      },

      // ===== FEMININO =====
      {
        nome: "Nike Air Force 1 Shadow",
        marca: "Nike",
        preco: 649.90,
        preco_promo: 549.90,
        categoria: "Feminino",
        descricao: "Nike Air Force 1 Shadow - Design ousado com camadas sobrepostas. Conforto icônico do Air Force 1 com um toque feminino e moderno.",
        imagem_principal: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop",
        imagens: JSON.stringify([
          "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop"
        ]),
        cores: JSON.stringify(["Branco/Rosa", "Branco", "Preto"]),
        tamanhos: JSON.stringify([34, 35, 36, 37, 38, 39, 40]),
        estoque: 25,
        destaque: true,
        avaliacao: 4.7,
        num_avaliacoes: 189,
        sku: "NIKE-AF1-SHADOW",
        ativo: true
      },
      {
        nome: "Adidas Ultraboost Feminino",
        marca: "Adidas",
        preco: 799.90,
        preco_promo: 699.90,
        categoria: "Feminino",
        descricao: "Adidas Ultraboost - O tênis de running mais confortável agora em versão feminina. Tecnologia Boost que retorna energia a cada passo.",
        imagem_principal: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop",
        imagens: JSON.stringify([
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop"
        ]),
        cores: JSON.stringify(["Branco", "Preto", "Rosa"]),
        tamanhos: JSON.stringify([34, 35, 36, 37, 38, 39]),
        estoque: 30,
        destaque: true,
        avaliacao: 4.8,
        num_avaliacoes: 245,
        sku: "ADIDAS-UB-FEM",
        ativo: true
      },
      {
        nome: "Puma Cali Dream Feminino",
        marca: "Puma",
        preco: 449.90,
        preco_promo: 379.90,
        categoria: "Feminino",
        descricao: "Puma Cali Dream - Silhueta clean com sola plataforma. Estilo casual perfeito para o dia a dia da mulher moderna.",
        imagem_principal: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop",
        imagens: JSON.stringify([
          "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=600&h=600&fit=crop"
        ]),
        cores: JSON.stringify(["Branco", "Rosa", "Preto"]),
        tamanhos: JSON.stringify([34, 35, 36, 37, 38, 39, 40]),
        estoque: 35,
        destaque: false,
        avaliacao: 4.5,
        num_avaliacoes: 167,
        sku: "PUMA-CALI-FEM",
        ativo: true
      },

      // ===== MASCULINO =====
      {
        nome: "Nike Revolution 7",
        marca: "Nike",
        preco: 449.90,
        preco_promo: 379.90,
        categoria: "Masculino",
        descricao: "Nike Revolution 7 - Conforto e performance para corridas. Amortecimento em espuma macia e cabedal respirável.",
        imagem_principal: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop",
        imagens: JSON.stringify([
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop"
        ]),
        cores: JSON.stringify(["Preto", "Azul", "Cinza"]),
        tamanhos: JSON.stringify([37, 38, 39, 40, 41, 42, 43]),
        estoque: 40,
        destaque: false,
        avaliacao: 4.5,
        num_avaliacoes: 312,
        sku: "NIKE-REV7",
        ativo: true
      },
      {
        nome: "Adidas Forum Low Masculino",
        marca: "Adidas",
        preco: 549.90,
        preco_promo: 449.90,
        categoria: "Masculino",
        descricao: "Adidas Forum Low - Clássico do basquete reinventado. Couro premium e design retrô para um visual autêntico.",
        imagem_principal: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop",
        imagens: JSON.stringify([
          "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1607522370275-f14206abe7d3?w=600&h=600&fit=crop"
        ]),
        cores: JSON.stringify(["Branco", "Preto", "Azul"]),
        tamanhos: JSON.stringify([38, 39, 40, 41, 42, 43]),
        estoque: 22,
        destaque: false,
        avaliacao: 4.6,
        num_avaliacoes: 178,
        sku: "ADIDAS-FORUM-MASC",
        ativo: true
      },

      // ===== CASUAL =====
      {
        nome: "New Balance 574",
        marca: "New Balance",
        preco: 499.90,
        preco_promo: 429.90,
        categoria: "Casual",
        descricao: "New Balance 574 - Conforto incomparável com estilo retrô. Amortecimento ENCAP e materiais premium.",
        imagem_principal: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop",
        imagens: JSON.stringify([
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop"
        ]),
        cores: JSON.stringify(["Cinza", "Azul Marinho", "Verde"]),
        tamanhos: JSON.stringify([37, 38, 39, 40, 41, 42, 43]),
        estoque: 28,
        destaque: false,
        avaliacao: 4.7,
        num_avaliacoes: 198,
        sku: "NB-574",
        ativo: true
      }
    ];

    await Product.bulkCreate(produtos);
    console.log(`✅ ${produtos.length} produtos inseridos com sucesso!`);
    console.log('📊 Categorias: Lançamento, Feminino, Masculino, Casual');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

updateProducts();
