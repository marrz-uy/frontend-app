import React, { useState, useEffect, useContext } from 'react';
import TourContext from '../../Context/TourContext';
import LenguageContext from '../../Context/LenguageContext';
import AuthUser from '../../Components/AuthUser';
import { filtrarTraduccion } from '../../Helpers/FilterTranslate';
import '../../Css/TourStep1.css';

const TourStep1 = () => {
  const { http } = AuthUser();
  const { setTourPreferences, GetTourPreferences } = useContext(TourContext);
  const savedPreferences = GetTourPreferences();
  const [horaInicio, setHoraInicio] = useState(savedPreferences.horaInicio);
  const [tipoDeLugar, seTipoDeLugar] = useState(savedPreferences.tipoDeLugar);
  const [restriccionDeEdad, setRestriccionDeEdad] = useState(
    savedPreferences.restriccionDeEdad
  );
  const [enfoqueDePersonas, setEnfoqueDePersonas] = useState(
    savedPreferences.enfoqueDePersonas
  );
  const [ubicacion, setUbicacion] = useState(savedPreferences.ubicacion);
  const { traduccionesBD, lenguage } = useContext(LenguageContext);
  const [ciudades, setCiudades] = useState();

  useEffect(() => {
    setTourPreferences({
      horaInicio: !horaInicio ? '' : horaInicio,
      tipoDeLugar: tipoDeLugar,
      restriccionDeEdad: restriccionDeEdad,
      enfoqueDePersonas: enfoqueDePersonas,
      ubicacion: !ubicacion ? '' : ubicacion,
    });
  }, [
    horaInicio,
    tipoDeLugar,
    restriccionDeEdad,
    enfoqueDePersonas,
    ubicacion,
    setTourPreferences,
  ]);

  const capitalize = (string) => {
    let stringLower = string.toLowerCase();
    return stringLower && stringLower[0].toUpperCase() + stringLower.slice(1);
  };

  const getCities = () => {
    http
      .get(`/ciudades/`, {})
      .then((response) => {
        console.log('%cCiudades:', 'color: blue;', response?.data);
        setCiudades(response?.data);
        // console.log('');
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
  };

  useEffect(() => {
    getCities();
    console.log('CIUDADES: ', ciudades);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="tourStep1">
      <div className="descripcionTourStep1">
        <p className="descripcionTourStep1Text">
          {filtrarTraduccion(traduccionesBD, 'choosePreferences', lenguage)}
        </p>
      </div>
      <div className="tourPreferences">
        <div className="tourCards tourStart">
          <div className="cardName">
            <p>{filtrarTraduccion(traduccionesBD, 'startTime', lenguage)}</p>
          </div>
          <div className="cardPreferences">
            <div className="preferencesOptions">
              <p>{filtrarTraduccion(traduccionesBD, 'chooseTime', lenguage)}</p>
              <input
                type="time"
                className="inputsPreferencias"
                name="ubicacion"
                onChange={(e) => setHoraInicio(e.target.value + ':00')}
              ></input>
            </div>
          </div>
        </div>
        <div className="tourCards tourTypes">
          <div className="cardName">
            <p>{filtrarTraduccion(traduccionesBD, 'places', lenguage)}</p>
          </div>
          <div className="cardPreferences">
            <div className="preferencesOptions">
              <p>
                {filtrarTraduccion(traduccionesBD, 'enclosedSpace', lenguage)}
              </p>
              <p>{filtrarTraduccion(traduccionesBD, 'outdoor', lenguage)}</p>
              <p>{filtrarTraduccion(traduccionesBD, 'both', lenguage)}</p>
            </div>
            <div className="preferencesInput">
              <input
                type="radio"
                name="tipoDePaseo"
                value="Espacio cerrado"
                onChange={(e) => seTipoDeLugar(e.target.value)}
              ></input>
              <input
                type="radio"
                name="tipoDePaseo"
                value="Al aire libre"
                onChange={(e) => seTipoDeLugar(e.target.value)}
              ></input>
              <input
                type="radio"
                name="tipoDePaseo"
                value="Ambos"
                onChange={(e) => seTipoDeLugar(e.target.value)}
              ></input>
            </div>
          </div>
        </div>
        <div className="tourCards tourAges">
          <div className="cardName">
            <p>
              {filtrarTraduccion(traduccionesBD, 'ageRestrictions', lenguage)}
            </p>
          </div>
          <div className="cardPreferences">
            <div className="preferencesOptions">
              <p>{filtrarTraduccion(traduccionesBD, 'allAges', lenguage)}</p>
              <p>
                {filtrarTraduccion(traduccionesBD, 'over18Years', lenguage)}
              </p>
            </div>
            <div className="preferencesInput">
              <input
                type="radio"
                name="restriccionesDeEdad"
                value="Todas"
                onChange={(e) => setRestriccionDeEdad(e.target.value)}
              ></input>
              <input
                type="radio"
                name="restriccionesDeEdad"
                value="Mayores"
                onChange={(e) => setRestriccionDeEdad(e.target.value)}
              ></input>
            </div>
          </div>
        </div>
        <div className="tourCards tourPeople">
          <div className="cardName">
            <p>{filtrarTraduccion(traduccionesBD, 'numberPeople', lenguage)}</p>
          </div>
          <div className="cardPreferences">
            <div className="preferencesOptions">
              <p>{filtrarTraduccion(traduccionesBD, 'group', lenguage)}</p>
              <p>{filtrarTraduccion(traduccionesBD, 'family', lenguage)}</p>
              <p>{filtrarTraduccion(traduccionesBD, 'couple', lenguage)}</p>
              <p>{filtrarTraduccion(traduccionesBD, 'only', lenguage)}</p>
            </div>
            <div className="preferencesInput">
              <input
                type="radio"
                name="cantPersonas"
                value="Grupo"
                onChange={(e) => setEnfoqueDePersonas(e.target.value)}
              ></input>
              <input
                type="radio"
                name="cantPersonas"
                value="Familia"
                onChange={(e) => setEnfoqueDePersonas(e.target.value)}
              ></input>
              <input
                type="radio"
                name="cantPersonas"
                value="Pareja"
                onChange={(e) => setEnfoqueDePersonas(e.target.value)}
              ></input>
              <input
                type="radio"
                name="cantPersonas"
                value="Solo"
                onChange={(e) => setEnfoqueDePersonas(e.target.value)}
              ></input>
            </div>
          </div>
        </div>
        <div className="tourCards tourLocation">
          <div className="cardName">
            <p>{filtrarTraduccion(traduccionesBD, 'location', lenguage)}</p>
          </div>
          <div className="cardPreferences">
            <div className="preferencesOptions">
              <p>
                {filtrarTraduccion(
                  traduccionesBD,
                  'chooseDestination',
                  lenguage
                )}
              </p>
              {/* <input
                type="text"
                className="inputsPreferencias"
                onChange={(e) => setUbicacion(capitalize(e.target.value))}
              ></input> */}
              <select
                className="ciudadesSelect"
                onChange={(e) => setUbicacion(e.target.value)}
                // value={nacionalidad}
              >
                {ciudades !== null
                  ? ciudades?.map((item, index) => {
                      return <option key={index}>{item.Ciudad}</option>;
                    })
                  : 'nada'}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourStep1;
