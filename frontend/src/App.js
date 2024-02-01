import React from 'react';
import './App.css';
import ClientesList from './components/ClientesList';
import Footer from './components/Footer';
import Header from './components/Header';
import Cadastro from './components/Cadastro'; // Importe o componente Cadastro
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/cadastro" element={<Cadastro />} />
          {/* Adicione mais rotas conforme necessário */}
        </Routes>
        <ClientesList />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
