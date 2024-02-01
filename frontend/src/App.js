import React from 'react';
import './App.css';
import ClientesList from './components/ClientesList';
import Footer from './components/Footer';
import Header from './components/Header';
import Cadastro from './components/Cadastro'; // Importe o componente Cadastro
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Rota from './components/Rota';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {/* Defina o path="/" para renderizar o ClientesList */}
          <Route path="/" element={<ClientesList />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/rota" element={<Rota/>} />
          {/* Adicione mais rotas conforme necessário */}
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
