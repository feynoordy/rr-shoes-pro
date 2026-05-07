require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const path = require('path');
const fs = require('fs');

// Importar rotas
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const paymentRoutes = require('./routes/payments');
const uploadRoutes = require('./routes/upload');

const app = express();
const PORT = process.env.PORT || 3000;

// Criar diretório de uploads se não existir
const uploadsDir = path.join(__dirname, 'public', 'uploads', 'produtos');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ===== MIDDLEWARES =====
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
  origin: ['http://localhost:8000', 'http://127.0.0.1:8000', '*'],
  credentials: true
}));
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (IMPORTANTE: antes das rotas da API)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Servir frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// ===== ROTAS DA API =====
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/upload', uploadRoutes);

// ===== ROTA DE SAÚDE =====
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// ===== ROTA PRINCIPAL (SPA) =====
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ===== TRATAMENTO DE ERROS =====
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// ===== INICIAR SERVIDOR =====
app.listen(PORT, () => {
  console.log(`🚀 Servidor RR_SHOEES rodando na porta ${PORT}`);
  console.log(`📦 API: http://localhost:${PORT}/api`);
  console.log(`🏪 Loja: http://localhost:${PORT}`);
  console.log(`📁 Uploads: http://localhost:${PORT}/uploads/produtos`);
});
