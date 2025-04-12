const Boleto = require('../models/boleto');
const gerarRelatorioPDF = require('../utils/pdfReport').generateReportPDF;

async function listarBoletos(query) {
  const { nome, valor_inicial, valor_final, id_lote, relatorio } = query;
  const where = {};
  if (nome) where.nome_sacado = nome;
  if (id_lote) where.id_lote = id_lote;

  if (valor_inicial || valor_final) {
    where.valor = {};
    if (valor_inicial) where.valor.$gte = parseFloat(valor_inicial);
    if (valor_final) where.valor.$lte = parseFloat(valor_final);
  }

  const boletos = await Boleto.findAll({ where, order: [['id', 'ASC']] });

  if (relatorio && relatorio === '1') {
    const pdfBuffer = await gerarRelatorioPDF(boletos);
    return { base64: pdfBuffer.toString('base64') };
  }
  
  return boletos;
}

module.exports = { listarBoletos };
