import React, { useEffect, useContext } from 'react';
import LenguageContext from '../Context/LenguageContext';
import { Layout } from '../Layout';
import '../Css/SearchResults.css';
import ResultsCard from '../Components/ResultsCard';

const SearchResults = ({ items, setPage, text }) => {
  // console.log('%cITEMS search results:', 'color: orange;', items);
  const { textos } = useContext(LenguageContext);

  useEffect(() => {
    setPage('results');
  }, [setPage]);

  return (
    <Layout>
      <div className="results ">
        <h6 className="resultsText">
          {!items || items.length === 0
            ? textos.ceroResults
            : `${items.length} ${textos.resultsFor} ${text}`}
        </h6>
        <div className="infoResults">
          {!items ? (
            <div className="sinResultado">
              <p>{textos.noResults}</p>
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
