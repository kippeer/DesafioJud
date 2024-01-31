import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ClientesList.css';
import FilterButton from './FilterButton';

const ClientesList = () => {
  const [clientes, setClientes] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/clientes');
        setClientes(response.data);
        setClientesFiltrados(response.data); // Initialize filtered state with all clients
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
  };

  const handleBuscarClick = () => {
    // Filter clients based on the provided criteria (ID, nome, email, ou telefone)
    const filteredClients = clientes.filter((cliente) =>
      ['id', 'nome', 'email', 'telefone'].some((key) => {
        const value = String(cliente[key] || '').toLowerCase();
        const regex = new RegExp(filtro.toLowerCase(), 'i');
        return value.match(regex);
      })
    );

    setClientesFiltrados(filteredClients);
  };

  return (
    <div>
      <h2>Lista de Clientes</h2>

      {/* Search input and button */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Filtrar por..."
          value={filtro}
          onChange={handleFiltroChange}
          className="search-input"
        />
        <FilterButton onClick={handleBuscarClick} />
      </div>

      {/* Table displaying filtered clients */}
      <table className="clientes-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Coordenadas Cartesianas</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefone}</td>
              <td>({cliente.coordenada_x}, {cliente.coordenada_y})</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientesList;
