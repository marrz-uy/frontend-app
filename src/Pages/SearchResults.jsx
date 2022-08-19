import React, { useEffect, useContext, useState } from 'react';
import LenguageContext from '../Context/LenguageContext';
import { Layout } from '../Layout';
import ResultsCard from '../Components/ResultsCard';
import PageNumbers from '../Components/PageNumbers';
import '../Css/SearchResults.css';

const SearchResults = ({ items, setPage, text, setText }) => {
  console.log('%cITEMS search results:', 'color: orange;', items);
  const { textos } = useContext(LenguageContext);
  const [datos, setDatos] = useState([]);
  const [cantPaginas, setCantPaginas] = useState();

  useEffect(() => {
    setPage('results');
    setDatos(items.data);
    setCantPaginas(items.last_page);
  }, [setPage, items]);

  console.log('%cDATOS search results:', 'color: orange;', datos);
  console.log('%cCANTPAGINAS search results:', 'color: violet;', cantPaginas);

  return (
    <Layout>
      <div className="results ">
        <h6 className="resultsText">
          {!datos || datos.length === 0
            ? textos.ceroResults
            : `${datos.length} ${textos.resultsFor} ${text}`}
        </h6>
        <div className="infoResults">
          {!datos ? (
            <div className="sinResultado">
              <p>{textos.noResults}</p>
            </div>
          ) : (
            datos.map((dato) => {
              return (
                <ResultsCard
                  key={dato.id}
                  nombre={dato.Nombre}
                  ciudad={dato.Ciudad}
                  direccion={dato.Direccion}
                  caracteristicas={dato.Contacto}
                  imagen={dato.Imagen}
                />
              );
            })
          )}
        </div>
        {cantPaginas > 1 ? <PageNumbers cant={cantPaginas} /> : null}
      </div>
    </Layout>
  );
};

export default SearchResults;
