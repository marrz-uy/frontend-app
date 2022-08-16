import React, { useEffect } from 'react';
import { Layout } from '../Layout';
import '../Css/SearchResults.css';
import ResultsCard from '../Components/ResultsCard';

const SearchResults = ({ items, setPage, text }) => {
  // console.log('%cITEMS search results:', 'color: orange;', items);
  useEffect(() => {
    setPage('results');
  }, [setPage]);

  return (
    <Layout>
      <div className="results ">
        <h6 className="resultsText">
          {!items || items.length === 0
            ? '0 Resultados'
            : `${items.length} Resultados para ${text}`}
        </h6>
        <div className="infoResults">
          {!items ? (
            <div className="sinResultado">
              <p>Lo sentimos, intente otra busqueda por favor</p>
            </div>
          ) : (
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
            })
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchResults;
