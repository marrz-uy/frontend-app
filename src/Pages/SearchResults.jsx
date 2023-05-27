import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { Layout } from '../Layout';
import AuthUser from '../Components/AuthUser';
import LenguageContext from '../Context/LenguageContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import ResultsCard from '../Components/ResultsCard';
import UserBar from './UserBar';
import { handleUserBar } from '../Helpers/HandUserBarClick';
import Filter from './Filter';
import useScreenSize from '../Helpers/ScreenSize';
import {
  CatalogS,
  CatalogM,
  CatalogL,
  CatalogXl,
  CatalogXxl,
} from '../Components/LoaderImage';
import '../Css/SearchResults.css';
import '../Css/userBarClick.css';

const NoResultsForSearch = (props) => {
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowComponent(true);
    }, 1000);

    return () => clearTimeout(timeout);
  });

  return (
    showComponent && (
      <div className="divNoTour">
        <div className="divNoTourMsg">
          <h2 className="messageNoTour">{props.message}</h2>
        </div>
        <div className="divImage">
          <img src={props.image} alt="img" />
        </div>
      </div>
    )
  );
};

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
  // const navigate = useNavigate();
  const { width } = useScreenSize();
  const { http } = AuthUser();
  const { traduccionesBD, lenguage } = useContext(LenguageContext);
  const [datos, setDatos] = useState(items);
  const [cantPaginas, setCantPaginas] = useState('');
  const [limiteCantidadPaginas] = useState(5);
  const [limiteMaximoPaginas, setLimiteMaximoPaginas] = useState(5);
  const [limiteMinimoPaginas, setLimiteMinimoPaginas] = useState(0);
  const [handleFilter, setHandleFilter] = useState(false);
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
    BanoPrivado: null,
    Casino: null,
    Bar: null,
    Restaurante: null,
    Desayuno: null,
    Mascota: null,

    FechaInicio: null,
    TipoEvento: null,
  });

  const [tipoToFilter, setTipoToFilter] = useState('');

  let pages = [];
  for (let p = 0; p < cantPaginas; p++) {
    pages.push(p + 1);
  }

  const [latitudAEnviar, setLatitudAEnviar] = useState('');
  const [longitudAEnviar, setLongitudAEnviar] = useState('');
  const [distanciaAEnviar, setDistanciaAEnviar] = useState(50000);
  const [puntodeInteresTipo, setPuntodeInteresTipo] = useState('');
  const [mobileScreenActive, setMobileScreenActive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPage('results');
    setDatos(items);
    if (datos !== null) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }

    setCantPaginas(items?.last_page);
    if (latitud !== null || longitud !== null) {
      setLatitudAEnviar(+latitud);
      setLongitudAEnviar(+longitud);
      setDistanciaAEnviar(50000);
    }
    if (window.screen.width <= 810) {
      setHandleFilter(false);
      setMobileScreenActive(true);
    }
    // eslint-disable-next-line
  }, [setPage, items, searchType, categoryName, loaded, latitud, longitud]);

  const getData = (numPage) => {
    setDistanciaAEnviar(distanciaAEnviar);
    var puntos;
    if (allFilters) {
      puntos = datos;
    } else {
      puntos = items;
    }
    http
      .post(`${puntos?.path}?page=${numPage}`, {
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
        BanoPrivado: filtersToSend.BanoPrivado,
        Casino: filtersToSend.Casino,
        Bar: filtersToSend.Bar,
        Restaurante: filtersToSend.Restaurante,
        Desayuno: filtersToSend.objectToSend,
        Mascota: filtersToSend.Mascota,
      })
      .then((response) => {
        const allDdata = response?.data;
        setDatos(allDdata);
        window.scrollTo(0, 0);
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
        BanoPrivado: filtersToSend.BanoPrivado,
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
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
    setHandleFilter(false);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 300);
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
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
    // if (mobileScreenActive) {
    setHandleFilter(false);
    // }
  };

  handleUserBar(userBar);

  const getBackgroundSize = () => {
    return { backgroundSize: `${(distanciaAEnviar * 100) / 50000}% 100%` };
  };

  useEffect(() => {
    if (datos?.data && !puntodeInteresTipo) {
      http
        .get(`/PuntosInteres/${datos?.data[0]?.id}`)
        .then((res) => {
          setPuntodeInteresTipo(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [datos]);

  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>
      <div className="contFiltroYresultados">
        <div className="results ">
          <div className="filtro_container_btn">
            <button
              className="btnSearch filters"
              onClick={() => setHandleFilter(!handleFilter)}
            >
              <FontAwesomeIcon icon={faFilter} />
              {''} {filtrarTraduccion(traduccionesBD, 'filterBtn', lenguage)}
            </button>
          </div>
          <h6 className="resultsText">
            {!datos?.data
              ? `${filtrarTraduccion(traduccionesBD, 'ceroResults', lenguage)}`
              : `${datos.total || '0'} ${filtrarTraduccion(
                  traduccionesBD,
                  'resultsFor',
                  lenguage
                )} ${text}, pagina ${datos?.current_page || '1'}`}
          </h6>
          {latitud && longitud ? (
            <div className="filtrarDistancia">
              <div className="etiquetasDistancia">
                <label htmlFor="inputRange">
                  {filtrarTraduccion(traduccionesBD, 'distanceLbel', lenguage)}
                </label>
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
                {filtrarTraduccion(traduccionesBD, 'filterBtn', lenguage)}
              </button>
            </div>
          ) : (
            <div className="sinGeolocalizacion">
              <h6>
                {filtrarTraduccion(
                  traduccionesBD,
                  'localizationNotSupported',
                  lenguage
                )}{' '}
                recargue la aplicacion para volver a activarla.
              </h6>
            </div>
          )}

          <div className="infoResults">
            {loading ? (
              width <= 375 ? (
                <div className="skeltonResults">
                  <CatalogS />
                  <CatalogS />
                  <CatalogS />
                  <CatalogS />
                </div>
              ) : width >= 480 && width < 845 ? (
                <div className="skeltonResults">
                  <CatalogM />
                  <CatalogM />
                  <CatalogM />
                </div>
              ) : width >= 845 && width < 1410 ? (
                <div className="skeltonResults">
                  <CatalogL />
                  <CatalogL />
                  <CatalogL />
                  <CatalogL />
                </div>
              ) : width >= 1410 && width < 1691 ? (
                <div className="skeltonResults">
                  <CatalogXl />
                  <CatalogXl />
                </div>
              ) : width >= 1692 ? (
                <div className="skeltonResults">
                  <CatalogXxl />
                </div>
              ) : null
            ) : datos?.data && datos.data.length > 0 ? (
              datos.data.map((dato) => (
                <ResultsCard
                  key={dato?.Eventos_id ? dato?.Eventos_id : dato?.id}
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
                  tipo={dato?.Tipo}
                  caracteristicas={dato?.Contacto}
                  imagen={dato?.imagenes[0]?.url}
                  setDestination={setDestination}
                  dato={dato}
                />
              ))
            ) : (
              <div className="sinResultado">
                {/* //! NO RESULT FOR THIS SEARCH */}
                <NoResultsForSearch
                  message={filtrarTraduccion(
                    traduccionesBD,
                    'noResults',
                    lenguage
                  )}
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUgT-zon1BIn2mDvSt2Q-lA9oak5RCZBH4ku6T2llIMm_tQTZ4SNvvECVwprRO3nEHalA&usqp=CAU"
                />
              </div>
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
            mobileScreenActive={mobileScreenActive}
          />
        )}
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
          mobileScreenActive={mobileScreenActive}
        />
      )}
    </Layout>
  );
};

export default SearchResults;
