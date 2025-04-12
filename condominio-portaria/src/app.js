const fastify = require('fastify')({ logger: true });
const path = require('path');
const sequelize = require('./config/database');
const boletosRoutes = require('./routes/boletosRoutes');
const fastifyMultipart = require('@fastify/multipart');
const fastifyStatic = require('@fastify/static');

fastify.register(fastifyMultipart);
fastify.register(fastifyStatic, {
    root: path.join(__dirname, '../src/uploads'),
    prefix: '/arquivos/',
});

fastify.register(boletosRoutes);

async function startServer() {
    try {
        await sequelize.sync({ alter: true });
        await fastify.listen({ port: 3000 });
        console.log('\n[Run] - Servidor rodando na porta 3000 \n\n');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

startServer();
