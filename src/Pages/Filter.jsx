import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
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
  useEffect(() => {
    const handleTipo = () => {
      if (
        puntodeInteresTipo?.categoria?.Tipo === 'Restaurantes' ||
        puntodeInteresTipo?.categoria?.Tipo === 'Bares'
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
        puntodeInteresTipo?.categoria?.Tipo === 'Teatro'
      ) {
        /* 'Tipo',['Cine','Teatro','Carnaval','EventoDeportivo','EventoMusical']); */
        setTipoToFilter('Espectaculos');
      } else if (
        puntodeInteresTipo?.categoria?.Tipo === 'Cine' ||
        puntodeInteresTipo?.categoria?.Tipo === 'Obra de teatro' ||
        puntodeInteresTipo?.categoria?.Tipo === 'Murga' ||
        puntodeInteresTipo?.categoria?.Tipo === 'Partido' ||
        puntodeInteresTipo?.categoria?.Tipo === 'Carrera' ||
        puntodeInteresTipo?.categoria?.Tipo === 'Carnaval' ||
        puntodeInteresTipo?.categoria?.Tipo === 'EventoDeportivo'
      ) {
        setTipoToFilter('Eventos');
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
        puntodeInteresTipo?.categoria?.Tipo === 'Farmacias'
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
        puntodeInteresTipo?.categoria?.Tipo === 'Casino'
      ) {
        /* 'Tipo', ['Discoteca','Casino','Pool','Cantina','Bowling']); */
        setTipoToFilter('Actividades Nocturnas');
      } else if (
        puntodeInteresTipo?.categoria?.Tipo === 'Circo' ||
        puntodeInteresTipo?.categoria?.Tipo === 'Calesita'
      ) {
        /* 'Tipo', ['Circo','Calesita','Maquinitas','Juegos Infantiles']); */
        setTipoToFilter('Actividades Infantiles');
      }
    };
    handleTipo();
  }, [puntodeInteresTipo]);

  const handleClickRadio = (e) => {
    let mm;
    console.log(filtersToSend[e.target.name]);

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

    // handleGetFIlters()

    console.log(filtersToSend);
  };

  // console.log(filtersToSend);

  return (
    <div className="filtro_results">
      <div className="animate__animated animate__slideInLeft animate__faster">
        <FontAwesomeIcon
          icon={faXmark}
          className="userBar_cancel_filter"
          onClick={() => setHandleFilter(false)}
        />
        <div className="filtro_back">
          <h1>Filtros</h1>
          {tipoToFilter === 'Gastronomia' ? (
            <div className="filtro_tipos">
              <h3>Tipo</h3>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Restaurantes"
                  value="Restaurantes"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Restaurantes">Restaurantes</label>
              </div>
              <div className="llamame_mimosa as">
                <input
                  type="radio"
                  name="Tipo"
                  id="Bares"
                  value="Bares"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Bares">Bares</label>
              </div>
              <br />
              <div className="llamame_mimosa as">
                <input
                  type="radio"
                  name="ComidaVegge"
                  id="ComidaVegge"
                  value="1"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="ComidaVegge">ComidaVegge</label>
              </div>
              <br />
              <div className="llamame_mimosa as">
                <input
                  type="radio"
                  name="Alcohol"
                  id="Alcohol"
                  value="1"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Alcohol">Alcohol</label>
              </div>
              <br />
              <div className="llamame_mimosa as">
                <input
                  type="radio"
                  name="MenuInfantil"
                  id="MenuInfantil"
                  value="1"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="MenuInfantil">MenuInfantil</label>
              </div>
              <br />
              <button className="btnSearch" onClick={(e) => handleGetFIlters()}>
                Filtrar
              </button>
            </div>
          ) : tipoToFilter === 'Alojamiento' ? (
            <div div className="filtro_tipos">
              <h3>Tipo</h3>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Hotel"
                  value="Hotel"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Hotel">Hotel</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Hostel"
                  value="Hostel"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Hostel">Hostel</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Motel"
                  value="Motel"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Motel">Motel</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Estancia"
                  value="Estancia"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Estancia">Estancia</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Camping"
                  value="Camping"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Camping">Camping</label>
              </div>
              <div className="llamame_mimosa as">
                <input
                  type="radio"
                  name="Tipo"
                  id="Casa"
                  value="Casa"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Casa">Casa</label>
              </div>
              <br />
              {/* <input type="text" /> */}
              <br />
              <div className="llamame_mimosa as">
                <input
                  type="radio"
                  name="TvCable"
                  id="TvCable"
                  value="1"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="TvCable">Tv Cable</label>
              </div>
              <br />
              <div className="llamame_mimosa as">
                <input
                  type="radio"
                  name="Piscina"
                  id="Piscina"
                  value="1"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Piscina">Piscina</label>
              </div>
              <br />
              <div className="llamame_mimosa as">
                <input
                  type="radio"
                  name="Wifi"
                  id="Wifi"
                  value="1"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Wifi">Wifi</label>
              </div>
              <br />
              <div className="llamame_mimosa as">
                <input
                  type="radio"
                  name="AireAcondicionado"
                  id="AireAcondicionado"
                  value="1"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="AireAcondicionado">Aire Acondicionado</label>
              </div>
              <br />
              <div className="llamame_mimosa as">
                <input
                  type="radio"
                  name="BanoPrivad"
                  id="BanoPrivad"
                  value="1"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="BanoPrivad">Baño privado</label>
              </div>
              <br />
              <div className="llamame_mimosa as">
                <input
                  type="radio"
                  name="Casino"
                  id="Casino"
                  value="1"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Casino">Casino</label>
              </div>
              <br />
              <div className="llamame_mimosa as">
                <input
                  type="radio"
                  name="Bar"
                  id="Bar"
                  value="1"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Bar">Bar</label>
              </div>
              <br />
              <div className="llamame_mimosa as">
                <input
                  type="radio"
                  name="Restaurante"
                  id="Restaurante"
                  value="1"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Restaurante">Restaurante</label>
              </div>
              <br />
              <div className="llamame_mimosa as">
                <input
                  type="radio"
                  name="Desayuno"
                  id="Desayuno"
                  value="1"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Desayuno">Desayuno</label>
              </div>
              <button className="btnSearch" onClick={(e) => handleGetFIlters()}>
                Filtrar
              </button>
            </div>
          ) : tipoToFilter === 'Espetaculos' ? (
            <div className="filtro_tipos">
              <h3>Tipo</h3>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Cine"
                  value="Cine"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Cine">Cine</label>
              </div>
              <div className="llamame_mimosa">
                <input type="radio" name="Teatro" id="Teatro" value="Teatro" />
                <label htmlFor="Teatro">Teatro</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Carnaval"
                  value="Carnaval"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Carnaval">Carnaval</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="EventoDeportivo"
                  value="EventoDeportivo"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="EventoDeportivo">Evento Deportivo</label>
              </div>
              <button className="btnSearch" onClick={(e) => handleGetFIlters()}>
                Filtrar
              </button>
            </div>
          ) : tipoToFilter === 'Eventos' ? (
            <div className="filtro_tipos">
              <h3>Tipo</h3>
              <div className="llamame_mimosa">
                <input
                  type="text"
                  name="TipoEvento"
                  onKeyUp={(e) => handleClickRadio(e)}
                />
              </div>
              <h3>Fecha de inicio</h3>
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
                Filtrar
              </button>
            </div>
          ) : tipoToFilter === 'Paseos' ? (
            <div className="filtro_tipos">
              <h3>Tipo</h3>
              <div className="llamame_mimosa">
                <input type="radio" name="Playas" id="Playas" value="Playas" />
                <label htmlFor="Playas">Playas</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Ejercicios al aire libre"
                  value="Ejercicios al aire libre"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Ejercicios al aire libre">
                  Ejercicios al aire libre
                </label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Cerros"
                  value="Cerros"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Cerros">Cerros</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Sierras"
                  value="Sierras"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Sierras">Sierras</label>
              </div>
              <button className="btnSearch" onClick={(e) => handleGetFIlters()}>
                Filtrar
              </button>
            </div>
          ) : tipoToFilter === 'Servicios Esenciales' ? (
            <div className="filtro_tipos">
              <h3>Tipo</h3>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Hospitales"
                  value="Hospitales"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Hospitales">Hospitales</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Farmacias"
                  value="Farmacias"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Farmacias">Farmacias</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Cerrajerias"
                  value="Cerrajerias"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Cerrajerias">Cerrajerias</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Estaciones de Servicio"
                  value="Estaciones de Servicio"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Estaciones de Servicio">
                  Estaciones de Servicio
                </label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Seccionales"
                  value="Seccionales"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Seccionales">Seccionales</label>
              </div>
              <button className="btnSearch" onClick={(e) => handleGetFIlters()}>
                Filtrar
              </button>
            </div>
          ) : tipoToFilter === 'Transporte' ? (
            <div className="filtro_tipos">
              <h3>Tipo</h3>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Omnibus"
                  value="Omnibus"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Omnibus">Omnibus</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Taxi"
                  value="Taxi"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Taxi">Taxi</label>
              </div>
              <button className="btnSearch" onClick={(e) => handleGetFIlters()}>
                Filtrar
              </button>
            </div>
          ) : tipoToFilter === 'Actividades Infantiles' ? (
            <div className="filtro_tipos">
              <h3>Tipo</h3>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Circo"
                  value="Circo"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Circo">Circo</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Calesita"
                  value="Calesita"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Calesita">Calesita</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Maquinitas"
                  value="Maquinitas"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Maquinitas">Maquinitas</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Juegos Infantiles"
                  value="Juegos Infantiles"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Juegos Infantiles">Juegos Infantiles</label>
              </div>
              <button className="btnSearch" onClick={(e) => handleGetFIlters()}>
                Filtrar
              </button>
            </div>
          ) : tipoToFilter === 'Actividades Nocturnas' ? (
            <div className="filtro_tipos">
              <h3>Tipo</h3>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Discoteca"
                  value="Discoteca"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Discoteca">Discoteca</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Casino"
                  value="Casino"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Casino">Casino</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Pool"
                  value="Pool"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Pool">Pool</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Cantina"
                  value="Cantina"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Cantina">Cantina</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Bowling"
                  value="Bowling"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label htmlFor="Bowling">Bowling</label>
              </div>
              <button className="btnSearch" onClick={(e) => handleGetFIlters()}>
                Filtrar
              </button>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default Filtros;
