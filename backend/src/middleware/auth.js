// src/middleware/auth.js
const jwt = require('jsonwebtoken');
const { User } = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'chave_fallback_insegura';

// Middleware para verificar o token JWT
module.exports = async function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    req.user = user; // salva o usuário autenticado na requisição
    next();
  } catch (error) {
    console.error('Erro no middleware de autenticação:', error);
    res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};
