const { Sequelize } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(
  process.env.DB_NAME,        // database name
  process.env.DB_USER,        // username
  process.env.DB_PASSWORD,    // password
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT, 
    logging: true, 
  }
);

module.exports = sequelize;