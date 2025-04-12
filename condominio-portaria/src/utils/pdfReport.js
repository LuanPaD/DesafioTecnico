const PDFDocument = require('pdfkit');
const { Buffer } = require('buffer');

function generateReportPDF(boletos) {
  const doc = new PDFDocument();
  const buffers = [];
  
  doc.on('data', (chunk) => buffers.push(chunk));
  doc.on('end', () => {});
  
  doc.fontSize(18).text('Relatório de Boletos', { align: 'center' });
  doc.moveDown();
  
  doc.fontSize(12);
  doc.text('ID', 50, doc.y, { continued: true });
  doc.text('Nome Sacado', 100, doc.y, { continued: true });
  doc.text('ID Lote', 300, doc.y, { continued: true });
  doc.text('Valor', 400, doc.y, { continued: true });
  doc.text('Linha Digitável', 470, doc.y);
  doc.moveDown();
  
  boletos.forEach(boleto => {
    doc.text(boleto.id.toString(), 50, doc.y, { continued: true });
    doc.text(boleto.nome_sacado, 100, doc.y, { continued: true });
    doc.text(boleto.id_lote.toString(), 300, doc.y, { continued: true });
    doc.text(boleto.valor.toString(), 400, doc.y, { continued: true });
    doc.text(boleto.linha_digitavel, 470, doc.y);
    doc.moveDown();
  });
  
  doc.end();

  return new Promise((resolve, reject) => {
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', reject);
  });
}

module.exports = { generateReportPDF };


/*
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-lib');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

async function generateReportPdf(boletos) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  let y = height - 50;
  page.drawText('Relatório de Boletos:', { x: 50, y, size: 14, font });
  y -= 20;
  for (const b of boletos) {
    page.drawText(`${b.id} | ${b.nome_sacado} | ${b.id_lote} | ${b.valor} | ${b.linha_digitavel}`, {
      x: 50, y, size: 10, font
    });
    y -= 15;
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes).toString('base64');
}

module.exports = { generateReportPdf };
*/