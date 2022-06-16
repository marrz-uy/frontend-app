import React from 'react';
import { Layout } from '../Layout';
import '../Css/SearchResults.css';

export const hotel = [
  {
    id: '01',
    nombre: 'Hotel 1',
    ciudad: 'montevideo',
    direccion: 'Yi 1372',
  },
  {
    id: '02',
    nombre: 'Hotel 2',
    ciudad: 'montevideo',
    direccion: '8 de Octubre 1372',
  },
  {
    id: '03',
    nombre: 'Hotel 3',
    ciudad: 'montevideo',
    direccion: 'Colonia 1372',
  },
];

const SearchResults = ({ text }) => {
  return (
    <Layout>
      <div className="results">
        <h6>Resultados de busqueda para {text}</h6>
        <div></div>
      </div>
    </Layout>
  );
};

export default SearchResults;
