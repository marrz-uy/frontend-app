import React, { useEffect } from 'react';
import { Layout } from '../Layout';
import '../Css/SearchResults.css';
import ResultsCard from '../Components/ResultsCard';
import { filter } from '../Helpers/FilterByType';

const SearchResults = ({ items, setPage }) => {
  useEffect(() => {
    setPage('results');
  }, [setPage]);

  const data = filter(items);

  return (
    <Layout>
      <div className="results">
        <h6 className="resultsText">
          {data.length} Resultados para {items}
        </h6>
        <div className="infoResults">
          {data.map((item) => {
            return (
              <ResultsCard
                key={item.id}
                nombre={item.nombre}
                ciudad={item.ciudad}
                direccion={item.direccion}
                img={item.img}
                caracteristicas={item.caracteristicas}
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default SearchResults;
