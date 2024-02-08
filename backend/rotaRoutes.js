const express = require('express');
const router = express.Router();
const pool = require('./db');

// Rota para calcular a rota
router.get('/calcula-rota', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM clientes');

        // Adicionando a empresa aos clientes
        const empresa = { coordenada_x: 0, coordenada_y: 0 };
        const clientes = result.rows.map(cliente => ({
            ...cliente,
            coordenadas: { x: cliente.coordenada_x, y: cliente.coordenada_y }
        }));
        clientes.push(empresa);

        // Exibir os clientes antes da ordenação
        console.log("Clientes antes da ordenação:", clientes);

        // Remover clientes sem coordenadas
        const clientesComCoordenadas = clientes.filter(cliente => cliente.coordenadas);

        // Ordenando os clientes com base na proximidade ao ponto de origem
        clientesComCoordenadas.sort((a, b) => {
            const dist_a = Math.hypot(a.coordenadas.x, a.coordenadas.y);
            const dist_b = Math.hypot(b.coordenadas.x, b.coordenadas.y);
            return dist_a - dist_b;
        });

        // Exibir os clientes depois da ordenação
        console.log("Clientes após a ordenação:", clientesComCoordenadas);

        // Exibindo a ordem de visita
        const rota = clientesComCoordenadas;

        // Calculando a distância total
        const distancia_total = clientesComCoordenadas.reduce((total, cliente, index) => {
            if (index < clientesComCoordenadas.length - 1) {
                const proximo_cliente = clientesComCoordenadas[index + 1];
                return total + Math.hypot(proximo_cliente.coordenadas.x - cliente.coordenadas.x, proximo_cliente.coordenadas.y - cliente.coordenadas.y);
            }
            return total;
        }, 0);

        res.json({ rota, distancia_total });
    } catch (error) {
        console.error('Erro ao calcular a rota:', error);
        res.status(500).json({ message: 'Erro ao calcular a rota.' });
    }
});

module.exports = router;
