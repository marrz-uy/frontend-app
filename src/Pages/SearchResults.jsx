import React, { useEffect, useContext, useState } from 'react';
import AuthUser from '../Components/AuthUser';
import useGeoLocation from '../Helpers/useGeolocation';
import LenguageContext from '../Context/LenguageContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import { Layout } from '../Layout';
import ResultsCard from '../Components/ResultsCard';
import UserBar from './UserBar';
import { handleUserBar } from '../Helpers/HandUserBarClick';
import '../Css/SearchResults.css';
import '../Css/userBarClick.css';

const SearchResults = ({
  items,
  setPage,
  text,
  setText,
  userBar,
  setIsLoggedIn,
  isLoggedIn,
  setUserBar,
  searchType,
  categoryName,
}) => {
  const location = useGeoLocation();
  const latitud = JSON.stringify(location.coordinates.lat);
  const longitud = JSON.stringify(location.coordinates.lng);

  const [latitudAEnviar, setLatitudAEnviar] = useState('');
  const [longitudAEnviar, setLongitudAEnviar] = useState('');
  const [distanciaAEnviar, setDistanciaAEnviar] = useState(50000);
  let lat = latitud.toString().replace(/[-,.]/gi, '').slice(0, 7);
  if (lat.length === 6) {
    lat = lat + 0;
  }
  let long = longitud.toString().replace(/[-,.]/gi, '').slice(0, 7);
  if (long.length === 6) {
    long = long + 0;
  }
  const [distLabel, setDistLabel] = useState('Total');
  const { http } = AuthUser();

  const { traduccionesBD, lenguage } = useContext(LenguageContext);
  const [datos, setDatos] = useState(items);
  const [cantPaginas, setCantPaginas] = useState('');
  const [limiteCantidadPaginas] = useState(5);
  const [limiteMaximoPaginas, setLimiteMaximoPaginas] = useState(5);
  const [limiteMinimoPaginas, setLimiteMinimoPaginas] = useState(0);

  let pages = [];
  for (let p = 0; p < cantPaginas; p++) {
    pages.push(p + 1);
  }

  useEffect(() => {
    setPage('results');
    setDatos(items);
    setCantPaginas(items?.last_page);
    setLatitudAEnviar(+lat);
    setLongitudAEnviar(+long);
    setDistLabel(distanciaAEnviar / 1000);
    if (searchType === 'categoria') {
      setText(categoryName);
    }
    // eslint-disable-next-line
  }, [setPage, items, lat, long, searchType, categoryName]);

  const getData = (numPage) => {
    setDistanciaAEnviar(distanciaAEnviar);
    /* console.log(
      items.path,
      '------/?page=',
      numPage,
      '///',
      latitudAEnviar,
      longitudAEnviar,
      distanciaAEnviar
    ); */
    http
      .post(`${items?.path}?page=${numPage}`, {
        latitudAEnviar,
        longitudAEnviar,
        distanciaAEnviar,
      })
      .then((response) => {
        const allDdata = response?.data;
        setDatos(allDdata);
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
  };

  const handleChangePrevPage = (e) => {
    e.preventDefault();
    let nuevaData = getData(e.target.value);
    setDatos(nuevaData);
    if (datos.current_page - 2 < limiteMinimoPaginas) {
      setLimiteMinimoPaginas(limiteMinimoPaginas - limiteCantidadPaginas);
      setLimiteMaximoPaginas(limiteMaximoPaginas - limiteCantidadPaginas);
    }
  };

  const handleChangeNextPage = (e) => {
    e.preventDefault();
    let nuevaData = getData(e.target.value);
    setDatos(nuevaData);
    if (datos.current_page + 1 > limiteMaximoPaginas) {
      setLimiteMaximoPaginas(limiteMaximoPaginas + limiteCantidadPaginas);
      setLimiteMinimoPaginas(limiteMinimoPaginas + limiteCantidadPaginas);
    }
  };

  const handlePageChange = (e) => {
    e.preventDefault();
    let nuevaData = getData(e.target.value);
    setDatos(nuevaData);
  };

  const handleDistance = (e) => {
    if (text) {
      e.preventDefault();

      http
        .post(`/PuntosInteresCercanos/${searchType}/${text}`, {
          latitudAEnviar,
          longitudAEnviar,
          distanciaAEnviar,
        })
        .then((res) => {
          const allDdata = res.data;
          setDatos(allDdata);
          setCantPaginas(allDdata?.last_page);
          console.log('%cDATA RESPONSE RESULTS:', 'color: green;', datos);
        })
        .catch((error) => console.error(`Error en catch: ${error}`));
    }
  };
  // console.log('DISTLABEL 3->', distLabel * 1000);

  handleUserBar(userBar);

  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>
      <div className="results ">
        <h6 className="resultsText">
          {!datos?.data
            ? `${filtrarTraduccion(traduccionesBD, 'ceroResults', lenguage)}`
            : `${datos.total} ${filtrarTraduccion(
                traduccionesBD,
                'resultsFor',
                lenguage
              )} ${text}, pagina ${datos.current_page}`}
        </h6>

        <div className="filtrarDistancia">
          <label htmlFor="inputRange">Distancia</label>
          <input
            className="inputRange"
            id="inputRange"
            name="inputRange"
            type="range"
            min="1000"
            max="50000"
            step="1000"
            value={distanciaAEnviar}
            onChange={(e) => setDistanciaAEnviar(Number(e.target.value))}
          ></input>
          {/* <span>{distanciaAEnviar / 1000} Kmts</span> */}
          <button
            onClick={handleDistance}
            className={
              location.loaded === true ? 'btnSearch' : 'btnSearchInactivo'
            }
          >
            {distanciaAEnviar / 1000} Kmts
          </button>
        </div>

        <div className="infoResults">
          {!datos?.data || datos.data?.length === 0 ? (
            <div className="sinResultado">
              <p>{filtrarTraduccion(traduccionesBD, 'noResults', lenguage)}</p>
            </div>
          ) : (
            datos.data?.map((dato) => {
              return (
                <ResultsCard
                  key={dato.id}
                  nombre={dato.Nombre}
                  nombreEvento={dato.NombreEvento}
                  lugarDeEvento={dato.Nombre}
                  ciudad={dato.Ciudad}
                  direccion={dato.Direccion}
                  fechaInicio={dato.FechaInicio}
                  fechaFin={dato.FechaFin}
                  horaInicio={dato.HoraDeApertura}
                  horaFin={dato.HoraDeCierre}
                  tipoEvento={dato.Tipo}
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
                  onClick={handleChangePrevPage}
                >
                  {'< pre'}
                </button>
              </div>
              {pages.map((number) => {
                if (
                  number < limiteMaximoPaginas + 1 &&
                  number > limiteMinimoPaginas
                ) {
                  return (
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
                  );
                } else {
                  return null;
                }
              })}
              <div className="numeroDePagina">
                <button
                  className={
                    datos?.current_page !== datos?.last_page
                      ? 'btnNumero'
                      : 'btnNumero none'
                  }
                  value={datos?.current_page + 1}
                  onClick={handleChangeNextPage}
                >
                  {'sig >'}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      {userBar && (
        <UserBar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setUserBar={setUserBar}
        />
      )}
    </Layout>
  );
};

export default SearchResults;
