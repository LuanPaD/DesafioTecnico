const Boleto = require('../models/boleto');
const parseCsv = require('../utils/csvParser');
const idMapeator = require('../utils/idMapeator');

async function importarCSV(filePath) {
  console.info('[importarCSV] - filePath:', filePath);

  await Boleto.destroy({ where: {}, truncate: true });
  
  const dados = await parseCsv(filePath);
  try {
    for (const dado of dados) {
      const unidade = dado.unidade.padStart(4, '0');
      const idLote = idMapeator.getIdLote(unidade);

      console.log(`ID do Lote: ${idLote}`);
      if (!idLote) {
        console.error(`ID do Lote não encontrado para a unidade ${unidade}`);
        throw new Error(`ID do Lote não encontrado para a unidade ${unidade}`);
      }
      await Boleto.create({
        nome_sacado: dado.nome,
        id_lote: idLote,
        valor: parseFloat(dado.valor),
        linha_digitavel: dado.linha_digitavel,
        ativo: true,
        criado_em: new Date(),
      });
    }
  } catch (error) {
    console.error('Erro ao importar CSV:', error);
    throw new Error('Erro ao importar CSV');
  }
}

module.exports = { importarCSV };