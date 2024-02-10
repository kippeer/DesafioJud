import React, { useState } from 'react';
import axios from 'axios';
import './Cadastro.css'; // Importe o arquivo CSS

const CadastroCliente = () => {
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
      const response = await axios.post('https://backend-nge53fxkp-kippeer.vercel.app/api/clientes', cliente);
      console.log('Cliente cadastrado:', response.data);
      // Limpar o formulário após o cadastro bem-sucedido
      setCliente({
        nome: '',
        email: '',
        telefone: '',
        coordenada_x: '',
        coordenada_y: '',
      });
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Cliente</h2>
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            name="nome"
            value={cliente.nome}
            onChange={handleChange}
            className="input-field"
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={cliente.email}
            onChange={handleChange}
            className="input-field"
          />
        </label>
        <br />
        <label>
          Telefone:
          <input
            type="text"
            name="telefone"
            value={cliente.telefone}
            onChange={handleChange}
            className="input-field"
          />
        </label>
        <br />
        <label>
          Coordenada X:
          <input
            type="text"
            name="coordenada_x"
            value={cliente.coordenada_x}
            onChange={handleChange}
            className="input-field"
          />
        </label>
        <br />
        <label>
          Coordenada Y:
          <input
            type="text"
            name="coordenada_y"
            value={cliente.coordenada_y}
            onChange={handleChange}
            className="input-field"
          />
        </label>
        <br />
        <div className='space'></div>
        <button type="submit" className="submit-button">
          <p>
            Cadastrar Cliente
          </p>
        </button>
      </form>
    </div>
  );
};

export default CadastroCliente;
