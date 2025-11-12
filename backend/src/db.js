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

// Modelo Service
const Service = sequelize.define("Service", {
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0
    }
  },

  image: {
    type: DataTypes.STRING,
    allowNull: true // pode ser null, se não enviar imagem
  },

  providerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Relacionamento
Service.belongsTo(User, {
  foreignKey: "providerId",
  as: "provider",
  onDelete: "CASCADE"
});

module.exports = { sequelize, User, Service };
