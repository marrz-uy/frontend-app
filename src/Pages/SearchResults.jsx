import React, { useEffect, useState } from 'react';
import { Layout } from '../Layout';
import '../Css/SearchResults.css';
import ResultsCard from '../Components/ResultsCard';
import { getData } from '../Helpers/TraerPuntoInteresDesdeBackoffice';
// import { filter } from '../Helpers/FilterByType';
// import {traerPuntoInteresDesdeBackoffice} from '../Helpers/TraerPuntoInteresDesdeBackoffice'
// import AuthUser from '../Components/AuthUser';

const SearchResults = ({ items, setPage, text }) => {
  const [data, setData] = useState([]);
  // const [categoria, setCategoria] = useState('')

  // const { http } = AuthUser();

  console.log('%cITEMS search results:', 'color: orange;', items);

  useEffect(() => {
    setPage('results');
    if(items !== undefined){

      setData(items);
    }
  }, [setPage, items]);
  try {
    console.log('DATAAAAA: ', data);
    console.log('DATAAAAA TYPE: ', typeof data);
  } catch (error) {
    console.log('error de parseoooooo')
  }
  // // // const data = filter(items);

  return (
    <Layout>
      <div className="results ">
        <h6 className="resultsText">
          {items.length} Resultados para {text}
        </h6>
        <div className="infoResults">
          {items.length === 0 ? 'Intente otra busqueda' :
            items.map((item) => {
            return (
              <ResultsCard
                key={item.id}
                nombre={item.Nombre}
                ciudad={item.Ciudad}
                direccion={item.Direccion}
                caracteristicas={item.Contacto}
                imagen={item.Imagen}
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default SearchResults;
