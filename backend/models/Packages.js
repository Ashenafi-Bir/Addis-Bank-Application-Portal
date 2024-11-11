
// models/ExchangeRate.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

class Packages extends Model {}

Packages.init({
    packageImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      packageTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
}, {
    sequelize,
    modelName: 'Packages',
    timestamps: true,
});

module.exports = Packages;