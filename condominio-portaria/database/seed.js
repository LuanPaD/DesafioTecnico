const { sequelize, Lote } = require('../src/models');

async function seed() {
  try {
    await sequelize.sync();
    await Lote.bulkCreate([
      { id: 303, nome: '0017', ativo: true },
      { id: 404, nome: '0018', ativo: true },
      { id: 505, nome: '0019', ativo: true },
    ]);
    console.log('Seed concluído');
  } catch (err) {
    console.error('Erro na seed:', err);
  } finally {
    await sequelize.close();
  }
}

seed();
