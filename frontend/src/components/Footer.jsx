

import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2024 Desafio Facilita Juridico Ltda, Realizado por Fabio Tessaro.</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
    textAlign: 'center',
    
    bottom: 0,
    width: '100%',
  },
};

export default Footer;
