/* import React from 'react';
import { Layout } from '../Layout';
import '../Css/SearchResults.css';
import ResultsCard from '../Components/ResultsCard';

export const datos = [
  {
    id: '01',
    tipo: 'hoteles',
    nombre: 'Hotel 1',
    ciudad: 'montevideo',
    direccion: 'Yi 1372',
    barrio: 'Centro',
    caracteristicas: 'Desayuno y Wi-Fi gratuitos',
  },
  {
    id: '02',
    tipo: 'hoteles',
    nombre: 'Hotel 2',
    ciudad: 'montevideo',
    direccion: 'Yi 1372',
    barrio: 'Centro',
    caracteristicas: 'Desayuno y Wi-Fi gratuitos',
  },
  {
    id: '03',
    tipo: 'hoteles',
    nombre: 'Hotel 3',
    ciudad: 'montevideo',
    direccion: 'Yi 1372',
    barrio: 'Centro',
    caracteristicas: 'Desayuno y Wi-Fi gratuitos',
  },
  {
    id: '04',
    tipo: 'restaurantes',
    nombre: 'restaurant 1',
    ciudad: 'montevideo',
    direccion: 'Yi 1372',
    barrio: 'Centro',
    caracteristicas: 'Wi-Fi gratuitos',
  },
  {
    id: '05',
    tipo: 'restaurantes',
    nombre: 'restaurant 2',
    ciudad: 'montevideo',
    direccion: 'Yi 1372',
    barrio: 'Centro',
    caracteristicas: 'Desayuno y Wi-Fi gratuitos',
  },
  {
    id: '06',
    tipo: 'restaurantes',
    nombre: 'restaurant 3',
    ciudad: 'montevideo',
    direccion: 'Yi 1372',
    barrio: 'Centro',
    caracteristicas: 'Desayuno y Wi-Fi gratuitos',
  },
  {
    id: '07',
    tipo: 'vacio',
    nombre: 'vacio',
    ciudad: 'vacio',
    direccion: 'vacio',
    barrio: 'vacio',
    caracteristicas: 'vacio',
  },
];

const SearchResults = ({ text, items, setItems }) => {
  
  


   console.log('TEXT en SEARCHRESULTS:', text);
  console.log('ITEMS en SEARCHRESULTS:', items);
  return (
    <Layout>
      <div className="results">
        <h6 className="resultsText">Resultados de busqueda para {items}</h6>
        {items.map((item) => {
          return (
            <ResultsCard
              key={item.id}
              nombre={item.nombre}
              ciudad={item.ciudad}
              direccion={item.direccion}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default SearchResults;
 */