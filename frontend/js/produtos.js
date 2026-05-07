// ===== BANCO DE PRODUTOS UNIFICADO =====
// Admin e Loja usam a MESMA chave: 'rrshoes_produtos'

const CHAVE_PRODUTOS = 'rrshoes_produtos';

// Produtos padrão iniciais
const PRODUTOS_INICIAIS = [
  { id: 1, nome: "Nike Air Max 2026", marca: "Nike", categoria: "Lançamento", preco: 899.90, preco_promo: 749.90, imagem_principal: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop", imagens: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop"], cores: ["Preto","Branco","Vermelho"], tamanhos: [36,37,38,39,40,41,42,43,44], estoque: 20, avaliacao: 4.9, num_avaliacoes: 328, descricao: "Nike Air Max 2026 - A evolução do icônico. Tecnologia Air Max visível, cabedal em Flyknit e design futurista.", destaque: true, sku: "NIKE-AM-2026" },
  { id: 2, nome: "Air Jordan 4 Retro 2026", marca: "Jordan", categoria: "Lançamento", preco: 1299.90, preco_promo: 1099.90, imagem_principal: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=600&h=600&fit=crop", imagens: ["https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=600&h=600&fit=crop"], cores: ["Preto/Cinza","Branco"], tamanhos: [37,38,39,40,41,42,43], estoque: 10, avaliacao: 5.0, num_avaliacoes: 142, descricao: "Air Jordan 4 Retro 2026 - Lendário. Cabedal premium e amortecimento Air.", destaque: true, sku: "AJ4-2026" },
  { id: 3, nome: "Nike Dunk Low Retro 2026", marca: "Nike", categoria: "Lançamento", preco: 799.90, preco_promo: null, imagem_principal: "https://images.unsplash.com/photo-1607522370275-f14206abe7d3?w=600&h=600&fit=crop", imagens: ["https://images.unsplash.com/photo-1607522370275-f14206abe7d3?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop"], cores: ["Branco/Vermelho","Azul","Verde"], tamanhos: [35,36,37,38,39,40,41,42], estoque: 15, avaliacao: 4.8, num_avaliacoes: 256, descricao: "Nike Dunk Low Retro 2026 - O clássico das quadras reinventado.", destaque: true, sku: "NIKE-DUNK-2026" },
  { id: 4, nome: "Nike Air Force 1 Shadow", marca: "Nike", categoria: "Feminino", preco: 649.90, preco_promo: 549.90, imagem_principal: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop", imagens: ["https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop"], cores: ["Branco/Rosa","Branco","Preto"], tamanhos: [34,35,36,37,38,39,40], estoque: 25, avaliacao: 4.7, num_avaliacoes: 189, descricao: "Nike Air Force 1 Shadow - Design ousado com camadas sobrepostas.", destaque: true, sku: "NIKE-AF1-SHADOW" },
  { id: 5, nome: "Adidas Ultraboost 2026", marca: "Adidas", categoria: "Feminino", preco: 799.90, preco_promo: 699.90, imagem_principal: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop", imagens: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop"], cores: ["Branco","Preto","Rosa"], tamanhos: [34,35,36,37,38,39], estoque: 30, avaliacao: 4.8, num_avaliacoes: 245, descricao: "Adidas Ultraboost - Conforto máximo com tecnologia Boost.", destaque: false, sku: "ADIDAS-UB-2026" },
  { id: 6, nome: "Nike Revolution 7", marca: "Nike", categoria: "Masculino", preco: 449.90, preco_promo: 379.90, imagem_principal: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop", imagens: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop"], cores: ["Preto","Azul","Cinza"], tamanhos: [37,38,39,40,41,42,43], estoque: 40, avaliacao: 4.5, num_avaliacoes: 312, descricao: "Nike Revolution 7 - Performance e conforto para corridas.", destaque: false, sku: "NIKE-REV7" },
  { id: 7, nome: "Adidas Forum Low", marca: "Adidas", categoria: "Masculino", preco: 549.90, preco_promo: 449.90, imagem_principal: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop", imagens: ["https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop"], cores: ["Branco","Preto","Azul"], tamanhos: [38,39,40,41,42,43], estoque: 22, avaliacao: 4.6, num_avaliacoes: 178, descricao: "Adidas Forum Low - Clássico do basquete reinventado.", destaque: false, sku: "ADIDAS-FORUM" },
  { id: 8, nome: "New Balance 574", marca: "New Balance", categoria: "Casual", preco: 499.90, preco_promo: 429.90, imagem_principal: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop", imagens: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop"], cores: ["Cinza","Azul Marinho","Verde"], tamanhos: [37,38,39,40,41,42,43], estoque: 28, avaliacao: 4.7, num_avaliacoes: 198, descricao: "New Balance 574 - Conforto incomparável com estilo retrô.", destaque: false, sku: "NB-574" }
];

// Inicializar banco se estiver vazio
function inicializarBanco() {
  if (!localStorage.getItem(CHAVE_PRODUTOS)) {
    localStorage.setItem(CHAVE_PRODUTOS, JSON.stringify(PRODUTOS_INICIAIS));
    console.log('✅ Banco de produtos inicializado com ' + PRODUTOS_INICIAIS.length + ' produtos');
  }
}

// Obter todos os produtos
function getTodosProdutos() {
  inicializarBanco();
  try {
    const dados = localStorage.getItem(CHAVE_PRODUTOS);
    return JSON.parse(dados) || PRODUTOS_INICIAIS;
  } catch(e) {
    return PRODUTOS_INICIAIS;
  }
}

// Obter produto por ID
function getProdutoPorId(id) {
  return getTodosProdutos().find(p => p.id == id) || null;
}

// Salvar lista de produtos
function salvarProdutos(lista) {
  localStorage.setItem(CHAVE_PRODUTOS, JSON.stringify(lista));
}

// Inicializar ao carregar
inicializarBanco();
