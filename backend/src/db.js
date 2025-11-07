// src/db.js
const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

// Conexão com o banco SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "..", "database.sqlite"),
  logging: false,
});

// Importa o modelo User (já existe em src/models/user.js)
const defineUser = require("./models/user");
const User = defineUser(sequelize);

// Modelo de Serviços (caso já exista)
const Service = sequelize.define("Service", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  providerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: "Services",
  timestamps: true,
});

// Relacionamento opcional
Service.belongsTo(User, { foreignKey: "providerId", as: "provider" });

module.exports = { sequelize, User, Service };
