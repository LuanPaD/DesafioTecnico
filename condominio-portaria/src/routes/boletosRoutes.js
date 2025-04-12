const fastifyPlugin = require('fastify-plugin');
const boletosService = require('../services/boletosService');
const csvService = require('../services/csvService');
const pdfService = require('../services/pdfService');
const path = require('path');
const fs = require('fs');
const { pipeline } = require('stream/promises');

async function boletosRoutes(fastify, opts) {
  fastify.post('/importar-csv', async (request, reply) => {    
    const resultado = await CSVImport(request);
    if (resultado.status === 200) {
      reply.send(resultado.send);
    } else {
      reply.status(resultado.status).send(resultado.send);
    }
  });

  fastify.post('/importar-pdf', async (request, reply) => {  
    const resultado = await PDFImport(request);
    if (resultado.status === 200) {
      reply.send(resultado.send);
    } else {
      reply.status(resultado.status).send(resultado.send);
    }
  });

  fastify.get('/boletos', async (request, reply) => {
    const resultado = await boletosService.listarBoletos(request.query);
    reply.send(resultado);
  });
}

async function CSVImport(request){
  const file = await request.file();
  console.info('[CSVImport] - file: ', file.filename);

    if (!file) {
      return { status: 400, send: { ok: false, message: 'Arquivo não recebido' }};
    }
    
    if (file.mimetype !== 'text/csv') {
      return { status: 400, send: { ok: false, message: 'Arquivo inválido. Envie um arquivo CSV.' }};
    }
    
    const filePath = path.join(__dirname, '../../src/uploads/csv', file.filename);
    
    try {
      await pipeline(file.file, fs.createWriteStream(filePath));
    } catch (error) {
      return { status: 500, send: { ok: false, message: 'Erro ao salvar o arquivo' }};
    }

    try {
      await csvService.importarCSV(filePath);
      return { status: 200, send: { ok: true, message: 'Importado com sucesso' }};
    } catch (error) {
      return { status: 500, send: { ok: false, message: 'Erro ao importar CSV' }};
    }
}

async function PDFImport(request) {
  const file = await request.file();
  console.info('[PDFImport] - file:', file.filename);

    if (!file) {
      return { status: 400, send: { ok: false, message: 'Arquivo não recebido' }};
    }
    
    if (file.mimetype !== 'application/pdf') {
      return { status: 400, send: { ok: false, message: 'Arquivo inválido. Envie um arquivo PDF.' }};
    }
    
    const filePath = path.join(__dirname, '../../src/uploads/pdf', file.filename);
    
    try {
      await pipeline(file.file, fs.createWriteStream(filePath));
    } catch (error) {
      return { status: 500, send: { ok: false, message: 'Erro ao salvar o arquivo' }};
    }

    try {
      await pdfService.importarPDF(filePath);
      return { status: 200, send: { ok: true, message: 'Importado com sucesso' }};
    } catch (error) {
      return { status: 500, send: { ok: false, message: 'Erro ao importar PDF' }};
    }
}

module.exports = fastifyPlugin(boletosRoutes);