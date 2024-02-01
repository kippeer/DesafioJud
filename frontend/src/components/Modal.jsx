import React, { useState, useEffect } from 'react';
import './Modal.css';

const Modal = ({ onClose }) => {
    const [clientesOrdenados, setClientesOrdenados] = useState([]);
    const [distanciaTotal, setDistanciaTotal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
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
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <h2 className="modal-title">Ordem de Visita </h2>
                {loading ? (
                    <p className="loading-message">Carregando...</p>
                ) : (
                    <div className="rota-result">
                        <ul className="cliente-list">
                            {clientesOrdenados.map((cliente, index) => (
                                <li key={index}>
                                    {index + 1} - {cliente.nome}
                                </li>
                            ))}
                        </ul>
                        <button className="fechar-modal-button" onClick={onClose}>
                            Fechar Modal
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
