import React, { useState, useEffect } from 'react';
import './Rota.css';  // Importe o arquivo CSS
import { FaCalculator } from "react-icons/fa";

const Rota = () => {
    const [clientesOrdenados, setClientesOrdenados] = useState([]);
    const [distanciaTotal, setDistanciaTotal] = useState(null);
    const [calculandoRota, setCalculandoRota] = useState(false);

    const calcularRotaOtimizada = async () => {
        try {
            setCalculandoRota(true);

            const response = await fetch('http://localhost:5000/api/calcula-rota');

            if (!response.ok) {
                throw new Error(`Erro ao calcular a rota otimizada: ${response.statusText}`);
            }

            const { rota, distancia_total } = await response.json();
            setClientesOrdenados(rota);
            setDistanciaTotal(distancia_total);
        } catch (error) {
            console.error(`Erro ao calcular a rota otimizada: ${error.message}`);
        } finally {
            setCalculandoRota(false);
        }
    };

    // Chamada da função ao montar o componente
    useEffect(() => {
        calcularRotaOtimizada();
    }, []);

    return (
        <div className="rota-container">
            <button className="rota-button" onClick={calcularRotaOtimizada} disabled={calculandoRota}>
                <div >
                    <FaCalculator size="18" />
                    
                </div>{calculandoRota ? 'Calculando Rota...' : 'Calcular Rota Otimizada'} 
            </button>
            
            {clientesOrdenados.length > 0 && (
                <div className="rota-result">
                    <h2>Clientes proximos</h2>
                    <table className="cliente-table">
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Coordenada X</th>
                                <th>Coordenada Y</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientesOrdenados.map((cliente, index) => (
                                <tr key={index}>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.coordenadas.x}</td>
                                    <td>{cliente.coordenadas.y}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="distancia-total">Distância Total: {distanciaTotal}</p>
                </div>
                
            )}
        </div>
    );
};

export default Rota;
