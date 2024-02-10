const { Pool } = require('pg');

// Use as variáveis de ambiente fornecidas pelo Vercel para a conexão com o banco de dados
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432, // ou use process.env.POSTGRES_PORT, se estiver definido
  ssl: {
    rejectUnauthorized: false, // Se você estiver usando SSL, talvez precise configurar isso dependendo das configurações do seu banco de dados
  },
});

module.exports = pool;
