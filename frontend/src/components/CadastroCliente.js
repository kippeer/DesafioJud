import React, { useState } from 'react';
import axios from 'axios';


const CadastroCliente = ({ history }) => {
  const [cliente, setCliente] = useState({
    nome: '',
    email: '',
    telefone: '',
    coordenada_x: '',
    coordenada_y: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prevCliente) => ({
      ...prevCliente,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/clientes', cliente);
      alert('Cliente cadastrado com sucesso!');
      // Redirecionar para a lista de clientes após o cadastro
      history.push('/clientes');
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      alert('Erro ao cadastrar cliente. Verifique o console para mais detalhes.');
    }
  };

  return (
    <div>
      <h2>Cadastro de Cliente</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome:</label>
        <input type="text" id="nome" name="nome" value={cliente.nome} onChange={handleChange} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={cliente.email} onChange={handleChange} required />

        <label htmlFor="telefone">Telefone:</label>
        <input type="tel" id="telefone" name="telefone" value={cliente.telefone} onChange={handleChange} required />

        <label htmlFor="coordenada_x">Coordenada X:</label>
        <input type="text" id="coordenada_x" name="coordenada_x" value={cliente.coordenada_x} onChange={handleChange} required />

        <label htmlFor="coordenada_y">Coordenada Y:</label>
        <input type="text" id="coordenada_y" name="coordenada_y" value={cliente.coordenada_y} onChange={handleChange} required />

        <button type="submit">Cadastrar Cliente</button>
      </form>
    </div>
  );
};

export default CadastroCliente;
