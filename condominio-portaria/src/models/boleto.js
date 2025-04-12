const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Lote = require('./lote');

const Boleto = sequelize.define('Boleto', {
  nome_sacado: DataTypes.STRING,
  id_lote: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Lote, key: 'id' }
  },
  valor: DataTypes.DECIMAL,
  linha_digitavel: DataTypes.STRING,
  ativo: DataTypes.BOOLEAN,
  criado_em: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'boletos',
  timestamps: false,
});

Boleto.belongsTo(Lote, { foreignKey: 'id_lote' });

module.exports = Boleto;
