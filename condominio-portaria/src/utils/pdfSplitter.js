const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const path = require('path');
const idMapeator = require('../utils/idMapeator');

async function splitPDFPages(pdfBuffer) {
    console.info('[splitPDFPages] - pdfBuffer:', pdfBuffer);
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const totalPages = pdfDoc.getPageCount();

    const lotesCount = idMapeator.getLotesQuantity();

    if (totalPages !== lotesCount) {
        console.error(`Número de páginas do PDF: ${totalPages}`);
        throw new Error('Número de páginas do PDF não corresponde ao número de boletos.');
    }

    const IdsLote = idMapeator.getAllids();

    try {
        const outDir = path.join(__dirname, '../../splitted_pdfs');
        if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir, { recursive: true });
        }

        for (let i = 0; i < totalPages; i++) {
            const newPdf = await PDFDocument.create();
            const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
            newPdf.addPage(copiedPage);

            const pdfBytes = await newPdf.save();
            const outPath = path.join(outDir, `${IdsLote[i]}.pdf`);
            fs.writeFileSync(outPath, pdfBytes);
        }
    } catch (error) {
        console.error('Erro ao dividir o PDF:', error);
        throw new Error('Erro ao dividir o PDF');
    }
    console.info('PDF dividido com sucesso!');
}

module.exports = { splitPDFPages };