import React from 'react';
import './App.css';
import ClientesList from './components/ClientesList'; // Importa o componente ClientesList

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Gerenciamento de Clientes</h1>
      </header>
      <main>
        <ClientesList />
        {/* Adicione mais componentes ou links aqui conforme necessário */}
      </main>
      <footer>Reservado para</footer>
    </div>
  );
}

export default App;
