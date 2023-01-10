import React, { useEffect, useContext, useState } from 'react';
import AuthUser from '../Components/AuthUser';
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
  setItems,
  setPage,
  text,
  setText,
  userBar,
  setIsLoggedIn,
  isLoggedIn,
  setUserBar,
  searchType,
  setSearchType,
  categoryName,
  setCategoryName,
  setDestination,
  loaded,
  latitud,
  longitud,
}) => {
  // const [distLabel, setDistLabel] = useState('Total');
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

  console.log('SEARCH TYPE:', searchType);
  console.log('TEXT RESULTS', text, typeof text);
  console.log('CATEGORIA', text);

  console.log(
    '%cLAST PAGES ITEMS y DATOS:',
    'color: yellow;',
    items?.last_page,
    datos?.last_page
  );

  // console.log('%cCANTPAGINAS:', 'color: blue;', cantPaginas);

  const [latitudAEnviar, setLatitudAEnviar] = useState('');
  const [longitudAEnviar, setLongitudAEnviar] = useState('');
  const [distanciaAEnviar, setDistanciaAEnviar] = useState(50000);

  useEffect(() => {
    setPage('results');
    setDatos(items);
    setCantPaginas(items?.last_page);
    if (latitud !== null || longitud !== null) {
      setLatitudAEnviar(+latitud);
      setLongitudAEnviar(+longitud);
      setDistanciaAEnviar(50000);
      console.log('A ENVIAR: ', loaded, latitud, longitud);
    }
    // eslint-disable-next-line
  }, [setPage, items, searchType, categoryName, loaded, latitud, longitud]);

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
    // console.log('%cCLICK HANDLEDISTANCE:', 'color: orange;');
    // console.log('%cCATEGORY NAME:', 'color: violet;', categoryName);
    // console.log('%cTEXT RESULTS HANDLEDISTANCIA', 'color: pink;', text);

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

  console.log(
    'DATA A enviar',
    latitudAEnviar,
    longitudAEnviar,
    distanciaAEnviar
  );

  const getBackgroundSize = () => {
    return { backgroundSize: `${(distanciaAEnviar * 100) / 50000}% 100%` };
  };

  console.log(datos);
  console.log(datos.Tipo);

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
        {latitud && longitud ? (
          <div className="filtrarDistancia">
            <div className="etiquetasDistancia">
              <label htmlFor="inputRange">Distancia</label>
            </div>
            <div className="box">
              <input
                className="inputRange"
                id="inputRange"
                name="inputRange"
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={distanciaAEnviar}
                style={getBackgroundSize()}
                onChange={(e) => setDistanciaAEnviar(Number(e.target.value))}
              ></input>
              <div className='divKilometros'>
                <p className="kilometros"> {distanciaAEnviar / 1000}Kmts</p>
              </div>
            </div>
            <button
              onClick={handleDistance}
              className={loaded === true ? 'btnSearch' : 'btnSearchInactivo'}
            >
              Filtrar
            </button>
          </div>
        ) : (
          <div className="sinGeolocalizacion">
            <h5>{filtrarTraduccion(traduccionesBD, 'localizationNotSupported', lenguage)}</h5>
            <h6>{filtrarTraduccion(traduccionesBD, 'reloadApplication', lenguage)}</h6>
          </div>
        )}

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
                  tipoEvento={dato.TipoEvento}
                  tipo={dato.Tipo}
                  caracteristicas={dato.Contacto}
                  imagen={dato.Imagen}
                  setDestination={setDestination}
                  dato={dato}
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
