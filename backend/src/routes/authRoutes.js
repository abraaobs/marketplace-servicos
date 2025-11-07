// src/routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../db');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'chave_fallback_insegura';

// ==========================
// Rota de Registro (cadastro)
// ==========================
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email e password são obrigatórios' });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      passwordHash,
      role: role || 'cliente',
    });

    const userSafe = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return res.status(201).json({ message: 'Usuário criado com sucesso', user: userSafe });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// ==========================
// Rota de Login
// ==========================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'email e password são obrigatórios' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    const userSafe = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return res.json({ message: 'Login bem-sucedido', token, user: userSafe });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// ==========================
// Rota /me - Dados do usuário autenticado
// ==========================
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.replace('Bearer ', '');
    const payload = jwt.verify(token, JWT_SECRET);

    const user = await User.findByPk(payload.id, {
      attributes: ['id', 'name', 'email', 'role', 'createdAt'],
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return res.json({ user });
  } catch (error) {
    console.error('Erro no /me:', error);
    res.status(401).json({ message: 'Token inválido ou expirado' });
  }
});

module.exports = router;
