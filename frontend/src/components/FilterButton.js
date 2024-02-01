import React from 'react';
import { RiUserSearchLine } from "react-icons/ri";
import './FilterButton.css';

const FilterButton = ({ onClick }) => (
  <button onClick={onClick} className="search-button">
    Buscar <RiUserSearchLine />
  </button>
);



export default FilterButton;
