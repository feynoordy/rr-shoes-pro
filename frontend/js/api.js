// ===== API RR_SHOEES =====
const API_URL = 'http://localhost:3000/api';

const api = {
  // Token
  getToken() {
    return localStorage.getItem('rrshoes_token');
  },

  setToken(token) {
    localStorage.setItem('rrshoes_token', token);
  },

  removeToken() {
    localStorage.removeItem('rrshoes_token');
  },

  // Headers
  getHeaders() {
    const headers = { 'Content-Type': 'application/json' };
    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  },

  // ===== PRODUTOS =====
  async getProdutos(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const url = `${API_URL}/products${query ? '?' + query : ''}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Erro ao buscar produtos');
      return await res.json();
    } catch (error) {
      console.error('API Error (getProdutos):', error.message);
      // Fallback para dados locais
      return { success: true, products: [], total: 0 };
    }
  },

  async getProduto(id) {
    try {
      const res = await fetch(`${API_URL}/products/${id}`);
      if (!res.ok) throw new Error('Produto não encontrado');
      return await res.json();
    } catch (error) {
      console.error('API Error (getProduto):', error.message);
      return { success: false, product: null };
    }
  },

  async criarProduto(dados) {
    const res = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(dados)
    });
    return await res.json();
  },

  async atualizarProduto(id, dados) {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(dados)
    });
    return await res.json();
  },

  async deletarProduto(id) {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    return await res.json();
  },

  // ===== AUTH =====
  async login(email, senha) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });
    const data = await res.json();
    if (data.success && data.token) {
      this.setToken(data.token);
      localStorage.setItem('rrshoes_user', JSON.stringify(data.user));
    }
    return data;
  },

  async register(nome, email, senha, cpf, telefone) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha, cpf, telefone })
    });
    const data = await res.json();
    if (data.success && data.token) {
      this.setToken(data.token);
      localStorage.setItem('rrshoes_user', JSON.stringify(data.user));
    }
    return data;
  },

  logout() {
    this.removeToken();
    localStorage.removeItem('rrshoes_user');
  },

  getUser() {
    const user = localStorage.getItem('rrshoes_user');
    return user ? JSON.parse(user) : null;
  },

  isLoggedIn() {
    return !!this.getToken();
  },

  // ===== PAGAMENTOS =====
  async criarCheckoutStripe(items, customer, shipping) {
    const res = await fetch(`${API_URL}/payments/stripe/create-checkout`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ items, customer, shipping })
    });
    return await res.json();
  },

  async criarPIX(items, customer) {
    const res = await fetch(`${API_URL}/payments/pix/create`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ items, customer })
    });
    return await res.json();
  },

  async criarBoleto(items, customer) {
    const res = await fetch(`${API_URL}/payments/boleto/create`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ items, customer })
    });
    return await res.json();
  },

  async verificarStatusPagamento(orderId) {
    const res = await fetch(`${API_URL}/payments/status/${orderId}`);
    return await res.json();
  },

  // ===== PEDIDOS =====
  async getPedidos() {
    const res = await fetch(`${API_URL}/orders`, {
      headers: this.getHeaders()
    });
    return await res.json();
  },

  async getPedido(id) {
    const res = await fetch(`${API_URL}/orders/${id}`, {
      headers: this.getHeaders()
    });
    return await res.json();
  },

  // ===== HEALTH CHECK =====
  async healthCheck() {
    try {
      const res = await fetch(`${API_URL}/health`);
      return await res.json();
    } catch (error) {
      return { status: 'offline' };
    }
  }
};

// Verificar conectividade ao carregar
(async () => {
  const health = await api.healthCheck();
  if (health.status === 'online') {
    console.log('✅ Conectado ao backend RR_SHOEES');
  } else {
    console.warn('⚠️ Backend offline - usando dados locais');
  }
})();
