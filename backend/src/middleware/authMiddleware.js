// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'chave-super-secreta';

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const [, token] = authHeader.split(' '); // Espera formato: "Bearer token"

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // Armazena dados do usuário para uso posterior
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};
