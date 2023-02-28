import { useState, useEffect } from 'react';
import '../Css/SearchResults.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import AuthUser from '../Components/AuthUser';

const Filtros = ({
  allFilters,
  setAllFilters,
  latitud,
  longitud,
  distanciaAEnviar,
  setDistanciaAEnviar,
  getBackgroundSize,
  loaded,
  handleDistance,
  puntodeInteresTipo,
  setHandleFilter,
  filtersToSend,
  setFiltersToSend,
  handleGetFIlters,
  tipoToFilter,
  setTipoToFilter,
  handleGetFilterEventos,
}) => {
  const { http } = AuthUser();

  useEffect(() => {
    handleTipo();
  }, [puntodeInteresTipo]);

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

  // const [tipoa, setTipoa] = useState("restaurante")

  const handleText = (e) => {
    if (allFilters.includes(e.target.id + e.target.innerText)) {
      e.target.style.fontWeight = '500';
      let newFilters = allFilters.filter(
        (item) => item !== e.target.id + e.target.innerText
      );
      setAllFilters(newFilters);
    } else if (
      allFilters.find((element) =>
        element.startsWith(e.target.id) ? true : false
      )
    ) {
      let mm = document.querySelectorAll(`.${e.target.id} `);
      Array.from(mm).forEach((el) => (el.style.fontWeight = '500'));
      let newFilters = allFilters.filter((item) =>
        item.startsWith(e.target.id) ? false : true
      );
      setAllFilters([...newFilters, e.target.id + e.target.innerText]);
      e.target.style.fontWeight = '700';
    } else {
      allFilters.find((element) => console.log(element));
      setAllFilters([...allFilters, e.target.id + e.target.innerText]);
      e.target.style.fontWeight = '700';
    }
  };

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
                <label for="Restaurantes">Restaurantes</label>
              </div>
              <div className="llamame_mimosa as">
                <input
                  type="radio"
                  name="Tipo"
                  id="Bares"
                  value="Bares"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label for="Bares">Bares</label>
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
                <label for="ComidaVegge">ComidaVegge</label>
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
                <label for="Alcohol">Alcohol</label>
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
                <label for="MenuInfantil">MenuInfantil</label>
              </div>
              <br />
              <button className="btnSearch" onClick={(e) => handleGetFIlters()}>
                Filtrar
              </button>
              {/* <h3>Distancia</h3>
                            <FilterDistance
                                latitud={latitud}
                                longitud={longitud}
                                distanciaAEnviar={distanciaAEnviar}
                                getBackgroundSize={getBackgroundSize}
                                setDistanciaAEnviar={setDistanciaAEnviar}
                                handleDistance={handleDistance}
                                loaded={loaded}
                            /> */}
            </div>
          ) : tipoToFilter === 'Alojamiento' ? (
            <div div className="filtro_tipos">
              <h3>Tipo</h3>
              {/* <input type="radio" name="Alojamiento" id='Hotel' value="Hotel" /> */}
              {/* <input type="radio" name="Alojamiento" id='Hostel' value="Hostel" /> */}
              {/* <input type="radio" name="Alojamiento" id='Motel' value="Motel" /> */}
              {/* <input type="radio" name="Alojamiento" id='Estancia' value="Estancia" /> */}
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Hotel"
                  value="Hotel"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label for="Hotel">Hotel</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Hostel"
                  value="Hostel"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label for="Hostel">Hostel</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Motel"
                  value="Motel"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label for="Motel">Motel</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Estancia"
                  value="Estancia"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label for="Estancia">Estancia</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Camping"
                  value="Camping"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label for="Camping">Camping</label>
              </div>
              <div className="llamame_mimosa as">
                <input
                  type="radio"
                  name="Tipo"
                  id="Casa"
                  value="Casa"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label for="Casa">Casa</label>
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
                <label for="TvCable">Tv Cable</label>
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
                <label for="Piscina">Piscina</label>
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
                <label for="Wifi">Wifi</label>
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
                <label for="AireAcondicionado">Aire Acondicionado</label>
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
                <label for="BanoPrivad">Baño privado</label>
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
                <label for="Casino">Casino</label>
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
                <label for="Bar">Bar</label>
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
                <label for="Restaurante">Restaurante</label>
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
                <label for="Desayuno">Desayuno</label>
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
                <label for="Cine">Cine</label>
              </div>
              <div className="llamame_mimosa">
                <input type="radio" name="Teatro" id="Teatro" value="Teatro" />
                <label for="Teatro">Teatro</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Carnaval"
                  value="Carnaval"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label for="Carnaval">Carnaval</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="EventoDeportivo"
                  value="EventoDeportivo"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label for="EventoDeportivo">Evento Deportivo</label>
              </div>
              <button className="btnSearch" onClick={(e) => handleGetFIlters()}>
                Filtrar
              </button>
            </div>
          ) : tipoToFilter === 'Eventos' ? (
            <div className="filtro_tipos">
              <h3>Tipo</h3>
              {/* <div className='llamame_mimosa'>
                                <input type="radio" name="TipoEvento" id='Pelicula' value="Pelicula" onClick={(e) => handleClickRadio(e)} />
                                <label for="Pelicula">Pelicula</label>
                            </div>
                            <div className='llamame_mimosa'>
                                <input type="radio" name="TipoEvento" id='Obra de teatro' value="Obra de teatro" onClick={(e) => handleClickRadio(e)} />
                                <label for="Obra de teatro">Obra de teatro</label>
                            </div>
                            <div className='llamame_mimosa'>
                                <input type="radio" name="TipoEvento" id='Murga' value="Murga" onClick={(e) => handleClickRadio(e)} />
                                <label for="Murga">Murga</label>
                            </div>
                            <div className='llamame_mimosa'>
                                <input type="radio" name="TipoEvento" id='Partido' value="Partido" onClick={(e) => handleClickRadio(e)} />
                                <label for="Partido">Partido</label>
                            </div>
                            <div className='llamame_mimosa'>
                                <input type="radio" name="TipoEvento" id='Carrera' value="Carrera" onClick={(e) => handleClickRadio(e)} />
                                <label for="Carrera">Carrera</label>
                            </div> */}
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
                <label for="Playas">Playas</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Ejercicios al aire libre"
                  value="Ejercicios al aire libre"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label for="Ejercicios al aire libre">
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
                <label for="Cerros">Cerros</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Sierras"
                  value="Sierras"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label for="Sierras">Sierras</label>
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
                <label for="Hospitales">Hospitales</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Farmacias"
                  value="Farmacias"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label for="Farmacias">Farmacias</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Cerrajerias"
                  value="Cerrajerias"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label for="Cerrajerias">Cerrajerias</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Estaciones de Servicio"
                  value="Estaciones de Servicio"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label for="Estaciones de Servicio">
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
                <label for="Seccionales">Seccionales</label>
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
                <label for="Omnibus">Omnibus</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Taxi"
                  value="Taxi"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label for="Taxi">Taxi</label>
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
                <label for="Circo">Circo</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Calesita"
                  value="Calesita"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label for="Calesita">Calesita</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Maquinitas"
                  value="Maquinitas"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label for="Maquinitas">Maquinitas</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Juegos Infantiles"
                  value="Juegos Infantiles"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label for="Juegos Infantiles">Juegos Infantiles</label>
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
                <label for="Discoteca">Discoteca</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Casino"
                  value="Casino"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label for="Casino">Casino</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Pool"
                  value="Pool"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label for="Pool">Pool</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Cantina"
                  value="Cantina"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label for="Cantina">Cantina</label>
              </div>
              <div className="llamame_mimosa">
                <input
                  type="radio"
                  name="Tipo"
                  id="Bowling"
                  value="Bowling"
                  onClick={(e) => handleClickRadio(e)}
                />
                <label for="Bowling">Bowling</label>
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
