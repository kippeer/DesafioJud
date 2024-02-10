// db.js

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',  // Nome do seu banco de dados
  password: 'adm',
  port: 5432,
});

module.exports = pool;
