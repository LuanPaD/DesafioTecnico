const fs = require('fs/promises');
const pdfSplitter = require('../utils/pdfSplitter');

async function importarPDF(filePath) {
  try {
    const pdfBuffer = await fs.readFile(filePath);
    await pdfSplitter.splitPDFPages(pdfBuffer);
    console.log('PDF dividido e salvo com sucesso!');
  } catch (error) {
    console.error('Erro ao importar e dividir o PDF:', error);
    throw error;
  }
}

module.exports = { importarPDF };