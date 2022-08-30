import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import LenguageContext from '../Context/LenguageContext';
import { Layout } from '../Layout';
import ResultsCard from '../Components/ResultsCard';
import '../Css/SearchResults.css';

const SearchResults = ({ items, setPage, text }) => {
  const { textos } = useContext(LenguageContext);
  const [datos, setDatos] = useState(items);
  const [cantPaginas, setCantPaginas] = useState(items?.last_page);

  let pages = [];
  for (let p = 0; p < cantPaginas; p++) {
    pages.push(p + 1);
  }

  useEffect(() => {
    setPage('results');
    setDatos(items);
    setCantPaginas(items?.last_page);
  }, [setPage, items]);

  const getData = (numPage) => {
    axios
      .get(`${items?.path}?page=${numPage}`)
      .then((response) => {
        const allDdata = response?.data;
        setDatos(allDdata);
        console.log('datos de axios: ', allDdata);
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
  };

  const handlePageChange = (e) => {
    e.preventDefault();
    console.log('%cPAGINA CLICKEADA: ', 'color: green;', e.target.value);
    let nuevaData = getData(e.target.value);
    setDatos(nuevaData);
    console.log('nuevaData: ', datos);
  };

  return (
    <Layout>
      <div className="results ">
        <h6 className="resultsText">
          {!datos?.data || datos.data?.length === 0
            ? textos.ceroResults
            : `${items.total} ${textos.resultsFor} ${text}, pagina ${datos.current_page}`}
        </h6>
        <div className="infoResults">
          {!datos ? (
            <div className="sinResultado">
              <p>{textos.noResults}</p>
            </div>
          ) : (
            datos.data?.map((dato) => {
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
      </div>
      <div className="seccionPaginado">
        {cantPaginas > 1 ? (
          <div className="contenedorPaginado">
            <div className="paginado">
              <div className="numeroDePagina">
                <button
                  className={
                    datos?.current_page !== 1 ? 'btnNumero' : 'btnNumero none'
                  }
                  value={datos?.current_page - 1}
                  onClick={handlePageChange}
                >
                  {'< pre'}
                </button>
              </div>

              {pages.map((number) => (
                <div key={number} className="numeroDePagina">
                  <button
                    className={
                      datos?.current_page === number
                        ? 'btnNumero active'
                        : 'btnNumero'
                    }
                    value={number}
                    onClick={handlePageChange}
                  >
                    {number}
                  </button>
                </div>
              ))}
              <div className="numeroDePagina">
                <button
                  className={
                    datos?.current_page !== datos?.last_page
                      ? 'btnNumero'
                      : 'btnNumero none'
                  }
                  value={datos?.current_page + 1}
                  onClick={handlePageChange}
                >
                  {'sig >'}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default SearchResults;
