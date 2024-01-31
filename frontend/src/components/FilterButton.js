import React from 'react';

import './FilterButton.css';

const FilterButton = ({ onClick }) => (
  <button onClick={onClick} className="search-button">
    Buscar
  </button>
);



export default FilterButton;
