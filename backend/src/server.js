const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./db');
const authRoutes = require('./routes/authRoutes');
const servicesRoutes = require('./routes/servicesRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/services', servicesRoutes);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Unable to connect to database:', err);
  }
}

start();
