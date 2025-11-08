// src/db.js
const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

// Conexão SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "..", "database.sqlite"),
  logging: false
});

// Importa modelo User
const defineUser = require("./models/user");
const User = defineUser(sequelize);

// Exemplo de outro modelo (Service)
const Service = sequelize.define("Service", {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  price: DataTypes.FLOAT,
  providerId: DataTypes.INTEGER
});

// Relacionamentos
Service.belongsTo(User, { foreignKey: "providerId", as: "provider" });

module.exports = { sequelize, User, Service };
