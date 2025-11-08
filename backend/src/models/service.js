const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Service = sequelize.define('Service', {
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
  tableName: 'Services',
  timestamps: true,
});

Service.belongsTo(User, { foreignKey: 'providerId', as: 'provider' });

module.exports = Service;
