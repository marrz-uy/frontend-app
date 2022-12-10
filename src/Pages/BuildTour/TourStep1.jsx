import React, { useState, useEffect, useContext } from 'react';
import TourContext from '../../Context/TourContext';
import '../../Css/TourStep1.css';

const TourStep1 = () => {
  const { setTourPreferences, getTourPreferences } = useContext(TourContext);
  const savedPreferences = getTourPreferences();
  const [horaInicio, setHoraInicio] = useState(savedPreferences.horaInicio);
  const [tipoDeLugar, seTipoDeLugar] = useState(savedPreferences.tipoDeLugar);
  const [restriccionDeEdad, setRestriccionDeEdad] = useState(
    savedPreferences.restriccionDeEdad
  );
  const [enfoqueDePersonas, setEnfoqueDePersonas] = useState(
    savedPreferences.enfoqueDePersonas
  );
  const [ubicacion, setUbicacion] = useState(savedPreferences.ubicacion);

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

  return (
    <div className="tourStep1">
      <div className="descripcionTourStep1">
        <p className="descripcionTourStep1Text">
          Elija preferencias para que le podamos sugerir lugares para armar su
          tour.
        </p>
      </div>
      <div className="tourPreferences">
        <div className="tourCards tourStart">
          <div className="cardName">
            <p>Hora de comienzo</p>
          </div>
          <div className="cardPreferences">
            <div className="preferencesOptions">
              <p>Elija un hora</p>
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
            <p>Lugares</p>
          </div>
          <div className="cardPreferences">
            <div className="preferencesOptions">
              <p>Espacio cerrado</p>
              <p>Al Aire libre</p>
              <p>Ambos</p>
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
            <p>Restriciones de edad</p>
          </div>
          <div className="cardPreferences">
            <div className="preferencesOptions">
              <p>Todas las edades</p>
              <p>Mayores de 18</p>
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
            <p>Cantidad de personas</p>
          </div>
          <div className="cardPreferences">
            <div className="preferencesOptions">
              <p>Grupo</p>
              <p>Familia</p>
              <p>Pareja</p>
              <p>Solo</p>
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
            <p>Ubicacion</p>
          </div>
          <div className="cardPreferences">
            <div className="preferencesOptions">
              <p>Elija destino</p>
              <input
                type="text"
                className="inputsPreferencias"
                onChange={(e) => setUbicacion(capitalize(e.target.value))}
              ></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourStep1;
