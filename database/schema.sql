-- RR_SHOEES Database Schema

CREATE DATABASE IF NOT EXISTS rrshoes_db;
USE rrshoes_db;

-- Usuários
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cpf VARCHAR(14),
    telefone VARCHAR(15),
    role ENUM('customer', 'admin') DEFAULT 'customer',
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Produtos
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE,
    marca VARCHAR(100) DEFAULT 'RR_SHOEES',
    preco DECIMAL(10, 2) NOT NULL,
    preco_promo DECIMAL(10, 2),
    categoria VARCHAR(50) NOT NULL,
    descricao TEXT,
    imagem_principal VARCHAR(500),
    imagens JSON,
    cores JSON,
    tamanhos JSON,
    estoque INT DEFAULT 0,
    destaque BOOLEAN DEFAULT FALSE,
    avaliacao FLOAT DEFAULT 5.0,
    num_avaliacoes INT DEFAULT 0,
    sku VARCHAR(50) UNIQUE,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Pedidos
CREATE TABLE pedidos (
    id VARCHAR(20) PRIMARY KEY,
    usuario_id INT,
    status ENUM('pending', 'confirmed', 'paid', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    subtotal DECIMAL(10, 2) NOT NULL,
    desconto DECIMAL(10, 2) DEFAULT 0,
    frete DECIMAL(10, 2) DEFAULT 0,
    total DECIMAL(10, 2) NOT NULL,
    metodo_pagamento ENUM('pix', 'credit_card', 'boleto') NOT NULL,
    pagamento_id VARCHAR(100),
    pagamento_status VARCHAR(50) DEFAULT 'pending',
    dados_cliente JSON,
    endereco_entrega JSON,
    itens JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);
