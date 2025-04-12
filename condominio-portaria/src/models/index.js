const sequelize = require('../config/database');
const Lote = require('./lote');
const Boleto = require('./boleto');

Boleto.belongsTo(Lote, { foreignKey: 'id_lote' });

module.exports = {
  sequelize,
  Lote,
  Boleto
};
