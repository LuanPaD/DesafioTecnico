const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Lote = sequelize.define('Lote', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: DataTypes.STRING,
  ativo: DataTypes.BOOLEAN,
  criado_em: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'lotes',
  timestamps: false,
});

module.exports = Lote;
