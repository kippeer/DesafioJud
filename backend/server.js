const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const clientesRoutes = require('./clientesRoutes');
const rotaRoutes = require('./rotaRoutes');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Rotas relacionadas aos clientes
app.use('/api/clientes', clientesRoutes);

// Rotas de cálculo de rota
app.use('/api', rotaRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
