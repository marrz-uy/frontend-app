import { useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import LenguageContext from '../Context/LenguageContext';
import '../Css/SearchResults.css';

const Filtros = ({
  puntodeInteresTipo,
  setHandleFilter,
  filtersToSend,
  setFiltersToSend,
  handleGetFIlters,
  tipoToFilter,
  setTipoToFilter,
  handleGetFilterEventos,
}) => {
  const { traduccionesBD, lenguage } = useContext(LenguageContext);

  console.log('TIPO FILTER: ', tipoToFilter);

  useEffect(() => {
    handleTipo();
  }, [puntodeInteresTipo]);

  const handleTipo = () => {
    if (
      puntodeInteresTipo?.categoria?.Tipo === 'Restaurantes' ||
      puntodeInteresTipo?.categoria?.Tipo === 'Bares' ||
      puntodeInteresTipo?.categoria?.Tipo === 'Comida rapida' || //! agregué esto
      puntodeInteresTipo?.categoria?.Tipo === 'Cervecerias' //! agregué esto
    ) {
      /* 'Tipo',['Restaurantes','Bares','Comida rapida','Cervecerias']); */
      setTipoToFilter('Gastronomia');
    } else if (
      puntodeInteresTipo?.categoria?.Tipo === 'Hotel' ||
      puntodeInteresTipo?.categoria?.Tipo === 'Hostel' ||
      puntodeInteresTipo?.categoria?.Tipo === 'Motel' ||
      puntodeInteresTipo?.categoria?.Tipo === 'Estancia' ||
      puntodeInteresTipo?.categoria?.Tipo === 'Camping' ||
      puntodeInteresTipo?.categoria?.Tipo === 'Casa'
    ) {
      /* 'Tipo',['Hotel','Hostel','Motel','Estancia','Camping','Casa']); */
      setTipoToFilter('Alojamiento');
    } else if (
      puntodeInteresTipo?.categoria?.Tipo === 'Cine' ||
      puntodeInteresTipo?.categoria?.Tipo === 'Teatro' ||
      puntodeInteresTipo?.categoria?.Tipo === 'Carnaval' ||
      puntodeInteresTipo?.categoria?.Tipo === 'EventoDeportivo' ||
      puntodeInteresTipo?.categoria?.Tipo === 'EventoMusical'
    ) {
      /* 'Tipo',['Cine','Teatro','Carnaval','EventoDeportivo','EventoMusical']); */
      setTipoToFilter('Eventos');
    } else if (
      puntodeInteresTipo?.categoria?.Tipo === 'Cine' ||
      puntodeInteresTipo?.categoria?.Tipo === 'Obra de teatro' ||
      puntodeInteresTipo?.categoria?.Tipo === 'Murga' ||
      puntodeInteresTipo?.categoria?.Tipo === 'Partido' ||
      puntodeInteresTipo?.categoria?.Tipo === 'Carrera' ||
      puntodeInteresTipo?.categoria?.Tipo === 'Carnaval' ||
      puntodeInteresTipo?.categoria?.Tipo === 'EventoDeportivo'
    ) {
      setTipoToFilter('Espectaculos');
    } else if (
      puntodeInteresTipo?.categoria?.Tipo === 'Playas' ||
      puntodeInteresTipo?.categoria?.Tipo === 'Ejercicios al aire libre' ||
      puntodeInteresTipo?.categoria?.Tipo === 'Lugar turistico' ||
      puntodeInteresTipo?.categoria?.Tipo === 'Cerros' ||
      puntodeInteresTipo?.categoria?.Tipo === 'Sierras'
    ) {
      setTipoToFilter('Paseos');
    } else if (
      puntodeInteresTipo?.categoria?.Tipo === 'Hospitales' ||
      puntodeInteresTipo?.categoria?.Tipo === 'Farmacias' ||
      puntodeInteresTipo?.categoria?.Tipo === 'Cerrajerias' || //! agregué esto
      puntodeInteresTipo?.categoria?.Tipo === 'Estaciones de Servicio' || //! agregué esto
      puntodeInteresTipo?.categoria?.Tipo === 'Seccionales' //! agregué esto
    ) {
      /* { /* 'Tipo',['Hospitales','Farmacias','Cerrajerias','Estaciones de Servicio','Seccionales']) */
      setTipoToFilter('Servicios Esenciales');
    } else if (
      puntodeInteresTipo?.categoria?.Tipo === 'Omnibus' ||
      puntodeInteresTipo?.categoria?.Tipo === 'Taxi'
    ) {
      setTipoToFilter('Transporte');
    } else if (
      puntodeInteresTipo?.categoria?.Tipo === 'Discoteca' ||
      puntodeInteresTipo?.categoria?.Tipo === 'Casino' ||
      puntodeInteresTipo?.categoria?.Tipo === 'Pool' ||
      puntodeInteresTipo?.categoria?.Tipo === 'Cantina' ||
      puntodeInteresTipo?.categoria?.Tipo === 'Bowling'
    ) {
      /* 'Tipo', ['Discoteca','Casino','Pool','Cantina','Bowling']); */
      setTipoToFilter('Actividades Nocturnas');
    } else if (
      puntodeInteresTipo?.categoria?.Tipo === 'Circo' ||
      puntodeInteresTipo?.categoria?.Tipo === 'Calesita' ||
      puntodeInteresTipo?.categoria?.Tipo === 'Maquinitas' || //! agregué esto
      puntodeInteresTipo?.categoria?.Tipo === 'Juegos Infantiles' //! agregué esto
    ) {
      /* 'Tipo', ['Circo','Calesita','Maquinitas','Juegos Infantiles']); */
      setTipoToFilter('Actividades Infantiles');
    }
  };

  const handleClickRadio = (e) => {
    let mm;
    e.persist();
    // console.log(filtersToSend[e.target.name]);

    if (tipoToFilter === 'Eventos') {
      setFiltersToSend((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    } else {
      if (e.target.name !== 'Tipo' && filtersToSend[e.target.name] !== null) {
        mm = document.getElementById(e.target.id);
        mm.checked = false;
        setFiltersToSend((prevState) => ({
          ...prevState,
          [e.target.name]: null,
        }));
        console.log('llamame mimosa');
      } else {
        setFiltersToSend((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      }
    }
  };

  // console.log(filtersToSend);

  return (
    <div className="filtro_results animate__animated animate__slideInLeft animate__faster">
      <FontAwesomeIcon
        icon={faXmark}
        className="userBar_cancel_filter"
        onClick={() => setHandleFilter(false)}
      />
      <div className="filtro_back">
        <h1>{filtrarTraduccion(traduccionesBD, 'FiltrosTitulo', lenguage)}</h1>
        {tipoToFilter === 'Gastronomia' ? (
          <div className="filtro_tipos">
            <h3>
              {filtrarTraduccion(traduccionesBD, 'Tipos', lenguage)} de{' '}
              {tipoToFilter}
            </h3>
            <div className="divXInputs">
              <input
                type="radio"
                name="Tipo"
                id="Restaurantes"
                value="Restaurantes"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Restaurantes">
                {filtrarTraduccion(traduccionesBD, 'Restaurantes', lenguage)}
              </label>
            </div>
            <div className="divXInputs as">
              <input
                type="radio"
                name="Tipo"
                id="Bares"
                value="Bares"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Bares">
                {filtrarTraduccion(traduccionesBD, 'Bares', lenguage)}
              </label>
            </div>
            <div className="especificacionesPunto">
              <h4>Especificaciones</h4>
              <div className="divXInputs as">
                <input
                  type="radio"
                  name="ComidaVegge"
                  id="ComidaVegge"
                  value="1"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="ComidaVegge">
                  {filtrarTraduccion(traduccionesBD, 'ComidaVegge', lenguage)}
                </label>
              </div>

              <div className="divXInputs as">
                <input
                  type="radio"
                  name="Alcohol"
                  id="Alcohol"
                  value="1"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Alcohol">
                  {filtrarTraduccion(traduccionesBD, 'Alcohol', lenguage)}
                </label>
              </div>

              <div className="divXInputs as">
                <input
                  type="radio"
                  name="MenuInfantil"
                  id="MenuInfantil"
                  value="1"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="MenuInfantil">
                  {filtrarTraduccion(traduccionesBD, 'childrenMenu', lenguage)}
                </label>
              </div>
            </div>
            <button className="btnSearch" onClick={(e) => handleGetFIlters()}>
              {filtrarTraduccion(traduccionesBD, 'FiltrosTitulo', lenguage)}
            </button>
          </div>
        ) : tipoToFilter === 'Alojamiento' ? (
          <div div className="filtro_tipos">
            <h3>
              {filtrarTraduccion(traduccionesBD, 'Tipos', lenguage)} de{' '}
              {tipoToFilter}
            </h3>
            <div className="divXInputs">
              <input
                type="radio"
                name="Tipo"
                id="Hotel"
                value="Hotel"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Hotel">
                {filtrarTraduccion(traduccionesBD, 'Hotel', lenguage)}
              </label>
            </div>
            <div className="divXInputs">
              <input
                type="radio"
                name="Tipo"
                id="Hostel"
                value="Hostel"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Hostel">
                {filtrarTraduccion(traduccionesBD, 'Hostel', lenguage)}
              </label>
            </div>
            <div className="divXInputs">
              <input
                type="radio"
                name="Tipo"
                id="Motel"
                value="Motel"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Motel">
                {filtrarTraduccion(traduccionesBD, 'Motel', lenguage)}
              </label>
            </div>
            <div className="divXInputs">
              <input
                type="radio"
                name="Tipo"
                id="Estancia"
                value="Estancia"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Estancia">
                {filtrarTraduccion(traduccionesBD, 'Estancia', lenguage)}
              </label>
            </div>
            <div className="divXInputs">
              <input
                type="radio"
                name="Tipo"
                id="Camping"
                value="Camping"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Camping">
                {filtrarTraduccion(traduccionesBD, 'Camping', lenguage)}
              </label>
            </div>
            <div className="divXInputs as">
              <input
                type="radio"
                name="Tipo"
                id="Casa"
                value="Casa"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Casa">
                {filtrarTraduccion(traduccionesBD, 'Casa', lenguage)}
              </label>
            </div>

            <div className="especificacionesPunto">
              <h4>Especificaciones</h4>
              <div className="divXInputs as">
                <input
                  type="radio"
                  name="TvCable"
                  id="TvCable"
                  value="1"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="TvCable">
                  {filtrarTraduccion(traduccionesBD, 'TVCable', lenguage)}
                </label>
              </div>

              <div className="divXInputs as">
                <input
                  type="radio"
                  name="Piscina"
                  id="Piscina"
                  value="1"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Piscina">
                  {filtrarTraduccion(traduccionesBD, 'Piscina', lenguage)}
                </label>
              </div>

              <div className="divXInputs as">
                <input
                  type="radio"
                  name="Wifi"
                  id="Wifi"
                  value="1"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Wifi">
                  {filtrarTraduccion(traduccionesBD, 'Wifi', lenguage)}
                </label>
              </div>

              <div className="divXInputs as">
                <input
                  type="radio"
                  name="AireAcondicionado"
                  id="AireAcondicionado"
                  value="1"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="AireAcondicionado">
                  {filtrarTraduccion(
                    traduccionesBD,
                    'AireAcondicionado',
                    lenguage
                  )}
                </label>
              </div>

              <div className="divXInputs as">
                <input
                  type="radio"
                  name="BanoPrivado"
                  id="BanoPrivado"
                  value="1"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="BanoPrivado">
                  {filtrarTraduccion(traduccionesBD, 'BanoPrivado', lenguage)}
                </label>
              </div>

              <div className="divXInputs as">
                <input
                  type="radio"
                  name="Casino"
                  id="Casino"
                  value="1"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Casino">
                  {filtrarTraduccion(traduccionesBD, 'Casino', lenguage)}
                </label>
              </div>

              <div className="divXInputs as">
                <input
                  type="radio"
                  name="Bar"
                  id="Bar"
                  value="1"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Bar">
                  {filtrarTraduccion(traduccionesBD, 'Bar', lenguage)}
                </label>
              </div>

              <div className="divXInputs as">
                <input
                  type="radio"
                  name="Restaurante"
                  id="Restaurante"
                  value="1"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Restaurante">
                  {filtrarTraduccion(traduccionesBD, 'Restaurantes', lenguage)}
                </label>
              </div>

              <div className="divXInputs as">
                <input
                  type="radio"
                  name="Desayuno"
                  id="Desayuno"
                  value="1"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Desayuno">
                  {filtrarTraduccion(traduccionesBD, 'Desayuno', lenguage)}
                </label>
              </div>
            </div>
            <button className="btnSearch" onClick={(e) => handleGetFIlters()}>
              {filtrarTraduccion(traduccionesBD, 'filterBtn', lenguage)}
            </button>
          </div>
        ) : tipoToFilter === 'Espectaculos' ? (
          <div className="filtro_tipos">
            <h3>
              {filtrarTraduccion(traduccionesBD, 'Tipos', lenguage)} de{' '}
              {tipoToFilter}
            </h3>
            <div className="divXInputs">
              <input
                type="radio"
                name="Tipo"
                id="Cine"
                value="Cine"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Cine">
                {filtrarTraduccion(traduccionesBD, 'Cine', lenguage)}
              </label>
            </div>
            <div className="divXInputs">
              <input
                type="radio"
                name="Teatro"
                id="Teatro"
                value="Teatro"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Teatro">
                {filtrarTraduccion(traduccionesBD, 'Teatro', lenguage)}
              </label>
            </div>
            <div className="divXInputs">
              <input
                type="radio"
                name="Tipo"
                id="Carnaval"
                value="Carnaval"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Carnaval">
                {filtrarTraduccion(traduccionesBD, 'Carnaval', lenguage)}
              </label>
            </div>
            <div className="divXInputs">
              <input
                type="radio"
                name="Tipo"
                id="EventoDeportivo"
                value="EventoDeportivo"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="EventoDeportivo">
                {filtrarTraduccion(traduccionesBD, 'EventoDeportivo', lenguage)}
              </label>
            </div>
            <button className="btnSearch" onClick={(e) => handleGetFIlters()}>
              {filtrarTraduccion(traduccionesBD, 'filterBtn', lenguage)}
            </button>
          </div>
        ) : tipoToFilter === 'Eventos' ? (
          <div className="filtro_tipos">
            <h3>?</h3>
            <input
              className="inputTipoEvento"
              type="text"
              name="TipoEvento"
              onKeyUp={(e) => handleClickRadio(e)}
            />
            <span className="ejemplo">ejemplo:</span>
            <h3>
              {filtrarTraduccion(traduccionesBD, 'FechaDeInicio', lenguage)}
            </h3>
            <input
              type="date"
              id="FechaInicioEventos"
              className="FechaInicioEventos"
              onClick={(e) => handleClickRadio(e)}
              name="FechaInicio"
            />
            <button
              className="btnSearch"
              onClick={(e) => handleGetFilterEventos()}
            >
              {filtrarTraduccion(traduccionesBD, 'filterBtn', lenguage)}
            </button>
          </div>
        ) : tipoToFilter === 'Paseos' ? (
          <div className="filtro_tipos">
            <h3>
              {filtrarTraduccion(traduccionesBD, 'Tipos', lenguage)} de{' '}
              {tipoToFilter}
            </h3>
            <div className="divXInputs">
              <input
                type="radio"
                name="Tipo"
                id="Playas"
                value="Playas"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Playas">
                {filtrarTraduccion(traduccionesBD, 'beaches', lenguage)}
              </label>
            </div>
            <div className="divXInputs">
              <input
                type="radio"
                name="Tipo"
                id="Ejercicios al aire libre"
                value="Ejercicios al aire libre"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Ejercicios al aire libre">
                {filtrarTraduccion(
                  traduccionesBD,
                  'EjerciciosAlAireLibre',
                  lenguage
                )}
              </label>
            </div>
            <div className="divXInputs">
              <input
                type="radio"
                name="Tipo"
                id="Cerros"
                value="Cerros"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Cerros">
                {filtrarTraduccion(traduccionesBD, 'Cerros', lenguage)}
              </label>
            </div>
            <div className="divXInputs">
              <input
                type="radio"
                name="Tipo"
                id="Sierras"
                value="Sierras"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Sierras">
                {filtrarTraduccion(traduccionesBD, 'Sierras', lenguage)}
              </label>
            </div>
            <button className="btnSearch" onClick={(e) => handleGetFIlters()}>
              {filtrarTraduccion(traduccionesBD, 'filterBtn', lenguage)}
            </button>
          </div>
        ) : tipoToFilter === 'Servicios Esenciales' ? (
          <div className="filtro_tipos">
            <h3>
              {filtrarTraduccion(traduccionesBD, 'Tipos', lenguage)} de{' '}
              {tipoToFilter}
            </h3>
            <div className="divXInputs">
              <input
                type="radio"
                name="Tipo"
                id="Hospitales"
                value="Hospitales"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Hospitales">
                {filtrarTraduccion(traduccionesBD, 'Hospitales', lenguage)}
              </label>
            </div>
            <div className="divXInputs">
              <input
                type="radio"
                name="Tipo"
                id="Farmacias"
                value="Farmacias"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Farmacias">
                {filtrarTraduccion(traduccionesBD, 'Farmacias', lenguage)}
              </label>
            </div>
            <div className="divXInputs">
              <input
                type="radio"
                name="Tipo"
                id="Cerrajerias"
                value="Cerrajerias"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Cerrajerias">
                {filtrarTraduccion(traduccionesBD, 'Cerrajerias', lenguage)}
              </label>
            </div>
            <div className="divXInputs">
              <input
                type="radio"
                name="Tipo"
                id="Estaciones de Servicio"
                value="Estaciones de Servicio"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Estaciones de Servicio">
                {filtrarTraduccion(
                  traduccionesBD,
                  'EstacionesDeServicio',
                  lenguage
                )}
              </label>
            </div>
            <div className="divXInputs">
              <input
                type="radio"
                name="Tipo"
                id="Seccionales"
                value="Seccionales"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Seccionales">
                {filtrarTraduccion(traduccionesBD, 'police', lenguage)}
              </label>
            </div>
            <button className="btnSearch" onClick={(e) => handleGetFIlters()}>
              {filtrarTraduccion(traduccionesBD, 'filterBtn', lenguage)}
            </button>
          </div>
        ) : tipoToFilter === 'Transporte' ? (
          <div className="filtro_tipos">
            <h3>
              {filtrarTraduccion(traduccionesBD, 'Tipos', lenguage)} de{' '}
              {tipoToFilter}
            </h3>
            <div className="divXInputs">
              <input
                type="radio"
                name="Tipo"
                id="Omnibus"
                value="Omnibus"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Omnibus">
                {filtrarTraduccion(traduccionesBD, 'Omnibus', lenguage)}
              </label>
            </div>
            <div className="divXInputs">
              <input
                type="radio"
                name="Tipo"
                id="Taxi"
                value="Taxi"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Taxi">
                {filtrarTraduccion(traduccionesBD, 'Taxi', lenguage)}
              </label>
            </div>
            <button className="btnSearch" onClick={(e) => handleGetFIlters()}>
              {filtrarTraduccion(traduccionesBD, 'filterBtn', lenguage)}
            </button>
          </div>
        ) : tipoToFilter === 'Actividades Infantiles' ? (
          <div className="filtro_tipos">
            <h3>
              {filtrarTraduccion(traduccionesBD, 'Tipos', lenguage)} de{' '}
              {tipoToFilter}
            </h3>
            <div className="divXInputs">
              <input
                type="radio"
                name="Tipo"
                id="Circo"
                value="Circo"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Circo">
                {filtrarTraduccion(traduccionesBD, 'Circo', lenguage)}
              </label>
            </div>
            <div className="divXInputs">
              <input
                type="radio"
                name="Tipo"
                id="Calesita"
                value="Calesita"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Calesita">
                {filtrarTraduccion(traduccionesBD, 'Calesita', lenguage)}
              </label>
            </div>
            <div className="divXInputs">
              <input
                type="radio"
                name="Tipo"
                id="Maquinitas"
                value="Maquinitas"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Maquinitas">
                {filtrarTraduccion(traduccionesBD, 'Maquinitas', lenguage)}
              </label>
            </div>
            <div className="divXInputs">
              <input
                type="radio"
                name="Tipo"
                id="Juegos Infantiles"
                value="Juegos Infantiles"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Juegos Infantiles">
                {filtrarTraduccion(
                  traduccionesBD,
                  'JuegosInfantiles',
                  lenguage
                )}
              </label>
            </div>
            <button className="btnSearch" onClick={(e) => handleGetFIlters()}>
              {filtrarTraduccion(traduccionesBD, 'filterBtn', lenguage)}
            </button>
          </div>
        ) : tipoToFilter === 'Actividades Nocturnas' ? (
          <div className="filtro_tipos">
            <h3>
              {filtrarTraduccion(traduccionesBD, 'Tipos', lenguage)} de{' '}
              {tipoToFilter}
            </h3>
            <div className="divXInputs">
              <input
                type="radio"
                name="Tipo"
                id="Discoteca"
                value="Discoteca"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Discoteca">
                {filtrarTraduccion(traduccionesBD, 'Discoteca', lenguage)}
              </label>
            </div>
            <div className="divXInputs">
              <input
                type="radio"
                name="Tipo"
                id="Casino"
                value="Casino"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Casino">
                {filtrarTraduccion(traduccionesBD, 'Casino', lenguage)}
              </label>
            </div>
            <div className="divXInputs">
              <input
                type="radio"
                name="Tipo"
                id="Pool"
                value="Pool"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Pool">
                {filtrarTraduccion(traduccionesBD, 'Pool', lenguage)}
              </label>
            </div>
            <div className="divXInputs">
              <input
                type="radio"
                name="Tipo"
                id="Cantina"
                value="Cantina"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Cantina">
                {filtrarTraduccion(traduccionesBD, 'canteen', lenguage)}
              </label>
            </div>
            <div className="divXInputs">
              <input
                type="radio"
                name="Tipo"
                id="Bowling"
                value="Bowling"
                onClick={(e) => handleClickRadio(e)}
              />
              <label htmlFor="Bowling">
                {filtrarTraduccion(traduccionesBD, 'Bolos', lenguage)}
              </label>
            </div>
            <button className="btnSearch" onClick={(e) => handleGetFIlters()}>
              {filtrarTraduccion(traduccionesBD, 'filterBtn', lenguage)}
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Filtros;
