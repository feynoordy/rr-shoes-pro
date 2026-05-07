const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configurar storage do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '..', 'public', 'uploads', 'produtos');
    // Criar diretório se não existir
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'produto-' + uniqueSuffix + ext);
  }
});

// Filtrar apenas imagens
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo não permitido. Use JPEG, PNG, GIF ou WebP.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// Rota de upload
router.post('/', upload.single('imagem'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Nenhum arquivo enviado'
      });
    }

    // Construir URL da imagem
    const imageUrl = `/uploads/produtos/${req.file.filename}`;

    res.json({
      success: true,
      message: 'Upload realizado com sucesso!',
      imageUrl: imageUrl,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao fazer upload: ' + error.message
    });
  }
});

// Rota para listar imagens
router.get('/', (req, res) => {
  const uploadDir = path.join(__dirname, '..', 'public', 'uploads', 'produtos');
  
  if (!fs.existsSync(uploadDir)) {
    return res.json({ success: true, images: [] });
  }

  const images = fs.readdirSync(uploadDir).map(file => ({
    filename: file,
    url: `/uploads/produtos/${file}`,
    date: fs.statSync(path.join(uploadDir, file)).mtime
  }));

  // Ordenar por data (mais recentes primeiro)
  images.sort((a, b) => b.date - a.date);

  res.json({ success: true, images });
});

// Rota para deletar imagem
router.delete('/:filename', (req, res) => {
  const filePath = path.join(__dirname, '..', 'public', 'uploads', 'produtos', req.params.filename);
  
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.json({ success: true, message: 'Imagem removida!' });
  } else {
    res.status(404).json({ success: false, message: 'Imagem não encontrada' });
  }
});

module.exports = router;
