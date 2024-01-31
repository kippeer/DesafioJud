// server.js

const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db'); // Importa a configuração do banco de dados

const app = express();

app.use(bodyParser.json());

// Rota para cadastrar um novo cliente com coordenadas X e Y
app.post('/api/clientes', async (req, res) => {
    const { nome, email, telefone, coordenada_x, coordenada_y } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nome, email, telefone, coordenada_x, coordenada_y]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao adicionar um novo cliente.' });
    }
});

// Rota para visualizar todos os clientes
// server.js

// ...

// Rota para visualizar clientes com opções de filtro
app.get('/api/clientes', async (req, res) => {
    try {
        // Parâmetros de consulta opcionais
        const { nome, email, telefone } = req.query;

        let queryString = 'SELECT id, nome, email, telefone, coordenada_x, coordenada_y FROM clientes WHERE 1 = 1';
        const queryParams = [];

        // Adiciona cláusulas WHERE conforme necessário
        if (nome) {
            queryString += ' AND nome ILIKE $1';
            queryParams.push(`%${nome}%`);
        }

        if (email) {
            queryString += ' AND email ILIKE $2';
            queryParams.push(`%${email}%`);
        }

        if (telefone) {
            queryString += ' AND telefone ILIKE $3';
            queryParams.push(`%${telefone}%`);
        }

        const result = await pool.query(queryString, queryParams);
        const clientes = result.rows.map(cliente => ({
            ...cliente,
            coordenadas: { x: cliente.coordenada_x, y: cliente.coordenada_y }
        }));
        res.json(clientes);
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).json({ message: 'Erro ao buscar clientes.' });
    }

});

// ...


// ...

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
