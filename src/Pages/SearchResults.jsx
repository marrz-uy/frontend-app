import { useEffect, useContext, useState } from 'react';
import { Layout } from '../Layout';
import AuthUser from '../Components/AuthUser';
import LenguageContext from '../Context/LenguageContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import ResultsCard from '../Components/ResultsCard';
import UserBar from './UserBar';
import { handleUserBar } from '../Helpers/HandUserBarClick';
import Filter from './Filter';
import '../Css/SearchResults.css';
import '../Css/userBarClick.css';

const SearchResults = ({
  items,
  setPage,
  text,
  userBar,
  setIsLoggedIn,
  isLoggedIn,
  setUserBar,
  searchType,
  categoryName,
  setDestination,
  loaded,
  latitud,
  longitud,
}) => {
  const { http } = AuthUser();

  const { traduccionesBD, lenguage } = useContext(LenguageContext);
  const [datos, setDatos] = useState(items);
  const [cantPaginas, setCantPaginas] = useState('');
  const [limiteCantidadPaginas] = useState(5);
  const [limiteMaximoPaginas, setLimiteMaximoPaginas] = useState(5);
  const [limiteMinimoPaginas, setLimiteMinimoPaginas] = useState(0);
  const [handleFilter, setHandleFilter] = useState(true);
  const [allFilters, setAllFilters] = useState([]);
  const [filtersToSend, setFiltersToSend] = useState({
    latitudAEnviar: 3481272,
    longitudAEnviar: 5592842,
    distanciaAEnviar: 50000,
    Tipo: null,
    ComidaVegge: null,
    Alcohol: null,
    MenuInfantil: null,

    Calificaciones: null,
    TvCable: null,
    Piscina: null,
    Wifi: null,
    AireAcondicionado: null,
    BanoPrivad: null,
    Casino: null,
    Bar: null,
    Restaurante: null,
    Desayuno: null,
    Mascota: null,

    FechaInicio: null,
    TipoEvento: null,
  });
  const [tipoToFilter, setTipoToFilter] = useState('');
  const [filtersOn, setFiltersOn] = useState(false);
  const [datosTwo, setDatosTwo] = useState([]);

  let pages = [];
  for (let p = 0; p < cantPaginas; p++) {
    pages.push(p + 1);
  }

  // console.log('SEARCH TYPE:', searchType);
  // console.log('TEXT RESULTS', text, typeof text);
  // console.log('CATEGORIA', text);

  // console.log(
  //   '%cLAST PAGES ITEMS y DATOS:',
  //   'color: yellow;',
  //   items?.last_page,
  //   datos?.last_page
  // );

  // console.log('%cCANTPAGINAS:', 'color: blue;', cantPaginas);

  const [latitudAEnviar, setLatitudAEnviar] = useState('');
  const [longitudAEnviar, setLongitudAEnviar] = useState('');
  const [distanciaAEnviar, setDistanciaAEnviar] = useState(50000);
  const [puntodeInteresTipo, setPuntodeInteresTipo] = useState('');
  const [puntodeInteresId, setPuntodeInteresId] = useState();

  useEffect(() => {
    setPage('results');
    setDatos(items);
    setCantPaginas(items?.last_page);
    if (latitud !== null || longitud !== null) {
      setLatitudAEnviar(+latitud);
      setLongitudAEnviar(+longitud);
      setDistanciaAEnviar(50000);
      // console.log('A ENVIAR: ', loaded, latitud, longitud);
    }
    if (window.screen.width <= 810) {
      setHandleFilter(false);
    }
    // eslint-disable-next-line
  }, [setPage, items, searchType, categoryName, loaded, latitud, longitud]);

  /* const getData = (numPage) => {
    setDistanciaAEnviar(distanciaAEnviar);
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
  }; */

  const getData = (numPage) => {
    setDistanciaAEnviar(distanciaAEnviar);
    var mama;
    if (allFilters) {
      mama = datos;
    } else {
      mama = items;
    }
    http
      .post(`${mama?.path}?page=${numPage}`, {
        latitudAEnviar,
        longitudAEnviar,
        distanciaAEnviar,
        Tipo: filtersToSend.Tipo,
        ComidaVegge: filtersToSend.ComidaVegge,
        Alcohol: filtersToSend.Alcohol,
        MenuInfantil: filtersToSend.MenuInfantil,
        Calificaciones: filtersToSend.Calificaciones,
        TvCable: filtersToSend.TvCable,
        Piscina: filtersToSend.Piscina,
        Wifi: filtersToSend.Wifi,
        AireAcondicionado: filtersToSend.AireAcondicionado,
        BanoPrivad: filtersToSend.BanoPrivad,
        Casino: filtersToSend.Casino,
        Bar: filtersToSend.Bar,
        Restaurante: filtersToSend.Restaurante,
        Desayuno: filtersToSend.objectToSend,
        Mascota: filtersToSend.Mascota,
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
          console.log('DATOSSSSSSSSSSSSSS ALLDATA: ', allDdata);
        })
        .catch((error) => console.error(`Error en catch: ${error}`));
    }
  };

  const handleGetFIlters = () => {
    http
      .post(`/filtrarPuntos/${tipoToFilter}`, {
        latitudAEnviar,
        longitudAEnviar,
        distanciaAEnviar,
        Tipo: filtersToSend.Tipo,
        ComidaVegge: filtersToSend.ComidaVegge,
        Alcohol: filtersToSend.Alcohol,
        MenuInfantil: filtersToSend.MenuInfantil,
        Calificaciones: filtersToSend.Calificaciones,
        TvCable: filtersToSend.TvCable,
        Piscina: filtersToSend.Piscina,
        Wifi: filtersToSend.Wifi,
        AireAcondicionado: filtersToSend.AireAcondicionado,
        BanoPrivad: filtersToSend.BanoPrivad,
        Casino: filtersToSend.Casino,
        Bar: filtersToSend.Bar,
        Restaurante: filtersToSend.Restaurante,
        Desayuno: filtersToSend.objectToSend,
        Mascota: filtersToSend.Mascota,
      })
      .then((res) => {
        setAllFilters(res.data);
        setDatos(res.data);
        setCantPaginas(res.data.last_page);
        // console.log(filtersToSend);
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
  };

  const handleGetFilterEventos = () => {
    http
      .post(`/filtrarEventos`, {
        latitudAEnviar,
        longitudAEnviar,
        distanciaAEnviar,
        FechaInicio: filtersToSend.FechaInicio,
        TipoEvento: filtersToSend.TipoEvento,
      })
      .then((res) => {
        setAllFilters(res.data);
        setDatos(res);
        setCantPaginas(res.data.last_page);
        // console.log(res);
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
  };

  // console.log('page: ', isNaN(pages));
  handleUserBar(userBar);

  const getBackgroundSize = () => {
    return { backgroundSize: `${(distanciaAEnviar * 100) / 50000}% 100%` };
  };

  useEffect(() => {
    if (datos?.data && !puntodeInteresTipo) {
      http
        .get(`/PuntosInteres/${datos?.data[0]?.id}`)
        .then((res) => {
          setPuntodeInteresTipo(res.data.categoria.Tipo);
          console.log('aaaaa', res.data.categoria.Tipo);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [datos]);
  console.log('DATOS.DATA:->', datos?.data);
  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>
      <div className="results ">
        <h6 className="resultsText">
          {!datos?.data
            ? `${filtrarTraduccion(traduccionesBD, 'ceroResults', lenguage)}`
            : `${datos.total || '1'} ${filtrarTraduccion(
                traduccionesBD,
                'resultsFor',
                lenguage
              )} ${text}, pagina ${datos?.current_page || '1'}`}
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
              <div className="divKilometros">
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
            <h5>
              {filtrarTraduccion(
                traduccionesBD,
                'localizationNotSupported',
                lenguage
              )}
            </h5>
            <h6>
              {filtrarTraduccion(traduccionesBD, 'reloadApplication', lenguage)}
            </h6>
          </div>
        )}
        {/* //! NO RESULT FOR THIS SEARCH */}
        <div className="infoResults">
          {!datos?.data ? (
            <div className="sinResultado">
              <p>{filtrarTraduccion(traduccionesBD, 'noResults', lenguage)}</p>
            </div>
          ) : (
            datos?.data?.map((dato, index) => {
              return (
                <ResultsCard
                  key={index}
                  nombre={dato?.Nombre}
                  nombreEvento={dato?.NombreEvento}
                  lugarDeEvento={dato?.Nombre}
                  ciudad={dato?.Ciudad}
                  direccion={dato?.Direccion}
                  fechaInicio={dato?.FechaInicio}
                  fechaFin={dato?.FechaFin}
                  horaInicio={dato?.HoraDeApertura}
                  horaFin={dato?.HoraDeCierre}
                  tipoEvento={dato?.TipoEvento}
                  tipo={dato?.Tipo && puntodeInteresTipo}
                  caracteristicas={dato?.Contacto}
                  imagen={dato?.imagenes[0]?.url}
                  setDestination={setDestination}
                  dato={dato}
                />
              );
            })
          )}
        </div>
      </div>

      {handleFilter && (
        <Filter
          latitud={latitud}
          longitud={longitud}
          distanciaAEnviar={distanciaAEnviar}
          setDistanciaAEnviar={setDistanciaAEnviar}
          getBackgroundSize={getBackgroundSize}
          loaded={loaded}
          handleDistance={handleDistance}
          puntodeInteresTipo={puntodeInteresTipo}
          setHandleFilter={setHandleFilter}
          allFilters={allFilters}
          setAllFilters={setAllFilters}
          filtersToSend={filtersToSend}
          setFiltersToSend={setFiltersToSend}
          handleGetFIlters={handleGetFIlters}
          tipoToFilter={tipoToFilter}
          setTipoToFilter={setTipoToFilter}
          handleGetFilterEventos={handleGetFilterEventos}
        />
      )}

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
