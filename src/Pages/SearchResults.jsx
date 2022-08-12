import React, { useEffect, useState } from 'react';
import { Layout } from '../Layout';
import '../Css/SearchResults.css';
import ResultsCard from '../Components/ResultsCard';
// import { filter } from '../Helpers/FilterByType';
// import {traerPuntoInteresDesdeBackoffice} from '../Helpers/TraerPuntoInteresDesdeBackoffice'
import AuthUser from '../Components/AuthUser';

const SearchResults = ({ items, setPage }) => {

  const [data, setData] = useState([])

  const { http } = AuthUser();

  const traerPuntoInteresDesdeBackoffice = () => {
    const datosBackoffice = http
      .get('http://localhost:8001/api/PuntosInteres')
      .then((res) => {
        console.log('%cPUNTOS DE INTERESES RESPONSE:', 'color: green;', res.data);
        setData(res.data)
      });
  
    return datosBackoffice;
  };

  useEffect(() => {
    setPage('results');
    traerPuntoInteresDesdeBackoffice()
  }, [setPage]);
  
  console.log('DATAAAAA: ', data)
  // const data = filter(items);

  return (
    <Layout>
      <div className="results ">
        <h6 className="resultsText">
          {data.length} Resultados para Puntos de Interes{/* {items} */}
        </h6>
        <div className="infoResults">
          {data.map((item) => {
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
