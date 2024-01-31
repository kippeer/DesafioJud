// server.js

const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db'); // Importa a configuração do banco de dados
const cors = require('cors');
const app = express();

app.use(cors()); // Use o middleware cors
app.use(bodyParser.json());

// Rota para cadastrar um novo cliente
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


// Rota para buscar todos os clientes
app.get('/api/clientes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM clientes');

        const clientes = result.rows.map(cliente => ({
            ...cliente,
            coordenadas: { x: cliente.coordenada_x, y: cliente.coordenada_y }
        }));

        res.json(clientes);
    } catch (error) {
        console.error('Erro ao buscar todos os clientes:', error);
        res.status(500).json({ message: 'Erro ao buscar todos os clientes.' });
    }
});


//Buscar por ID:


app.get('/api/clientes/id/:id', async (req, res) => {
    try {
        const clienteId = req.params.id;
        const result = await pool.query('SELECT * FROM clientes WHERE id = $1', [clienteId]);

        if (result.rows.length > 0) {
            const cliente = {
                ...result.rows[0],
                coordenadas: { x: result.rows[0].coordenada_x, y: result.rows[0].coordenada_y }
            };
            res.json(cliente);
        } else {
            res.status(404).json({ message: 'Cliente não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao buscar cliente por ID:', error);
        res.status(500).json({ message: 'Erro ao buscar cliente por ID.' });
    }
});

//Buscar por nome:
app.get('/api/clientes/nome/:nome', async (req, res) => {
    try {
        const nome = req.params.nome;
        const result = await pool.query('SELECT * FROM clientes WHERE nome ILIKE $1', [`%${nome}%`]);

        const clientes = result.rows.map(cliente => ({
            ...cliente,
            coordenadas: { x: cliente.coordenada_x, y: cliente.coordenada_y }
        }));
        res.json(clientes);
    } catch (error) {
        console.error('Erro ao buscar clientes por nome:', error);
        res.status(500).json({ message: 'Erro ao buscar clientes por nome.' });
    }
});

// por email
app.get('/api/clientes/email/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const result = await pool.query('SELECT * FROM clientes WHERE email ILIKE $1', [`%${email}%`]);

        const clientes = result.rows.map(cliente => ({
            ...cliente,
            coordenadas: { x: cliente.coordenada_x, y: cliente.coordenada_y }
        }));
        res.json(clientes);
    } catch (error) {
        console.error('Erro ao buscar clientes por email:', error);
        res.status(500).json({ message: 'Erro ao buscar clientes por email.' });
    }
});

// por telefone
app.get('/api/clientes/telefone/:telefone', async (req, res) => {
    try {
        const telefone = req.params.telefone;
        const result = await pool.query('SELECT * FROM clientes WHERE telefone ILIKE $1', [`%${telefone}%`]);

        const clientes = result.rows.map(cliente => ({
            ...cliente,
            coordenadas: { x: cliente.coordenada_x, y: cliente.coordenada_y }
        }));
        res.json(clientes);
    } catch (error) {
        console.error('Erro ao buscar clientes por telefone:', error);
        res.status(500).json({ message: 'Erro ao buscar clientes por telefone.' });
    }
});

// Buscar por coordenadas
app.get('/api/clientes/coordenadas/:coordenada_x/:coordenada_y', async (req, res) => {
    try {
        const coordenada_x = req.params.coordenada_x;
        const coordenada_y = req.params.coordenada_y;

        const result = await pool.query('SELECT * FROM clientes WHERE coordenada_x = $1 AND coordenada_y = $2', [coordenada_x, coordenada_y]);

        if (result.rows.length > 0) {
            const clientes = result.rows.map(cliente => ({
                ...cliente,
                coordenadas: { x: cliente.coordenada_x, y: cliente.coordenada_y }
            }));
            res.json(clientes);
        } else {
            res.status(404).json({ message: 'Nenhum cliente encontrado nessas coordenadas.' });
        }
    } catch (error) {
        console.error('Erro ao buscar clientes por coordenadas:', error);
        res.status(500).json({ message: 'Erro ao buscar clientes por coordenadas.' });
    }
});

app.get('/api/clientes/search', async (req, res) => {
    try {
      const filtro = req.query.filtro;
      const result = await pool.query(`
        SELECT * FROM clientes
        WHERE id::text ILIKE $1
           OR nome ILIKE $1
           OR email ILIKE $1
           OR telefone ILIKE $1
      `, [`%${filtro}%`]);
  
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
