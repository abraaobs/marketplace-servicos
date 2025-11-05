const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

// Conexão com o banco SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "..", "database.sqlite"),
  logging: false,
});

// Modelo de Serviços
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
  image: {
    type: DataTypes.STRING,
  },
});

module.exports = { sequelize, Service };
