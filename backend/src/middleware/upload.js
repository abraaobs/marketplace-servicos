const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Garante que a pasta uploads existe
const uploadFolder = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}

// Tipos de arquivos permitidos
const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

// Configuração do storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    const fileName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;

    cb(null, fileName);
  }
});

// Filtro para garantir que só imagens sejam enviadas
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedExtensions.includes(ext)) {
    return cb(new Error("Apenas imagens JPG, JPEG, PNG ou WEBP são permitidas!"));
  }

  cb(null, true);
};

// Limite de tamanho (2 MB)
const limits = {
  fileSize: 2 * 1024 * 1024 // 2MB
};

// Configuração final do multer
const upload = multer({
  storage,
  fileFilter,
  limits
});

module.exports = upload;
