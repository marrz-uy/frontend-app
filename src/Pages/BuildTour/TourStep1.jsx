import React, { useState, useEffect, useContext } from 'react';
import TourContext from '../../Context/TourContext';
import '../../Css/TourStep1.css';
const TourStep1 = () => {
  const { tourPreferences, setTourPreferences, getTourPreferences } =
    useContext(TourContext);
  const savedPreferences = getTourPreferences();
  const [franjaHoraria, setFranjaHoraria] = useState(
    savedPreferences.franjaHoraria
  );
  const [horaInicio, setHoraInicio] = useState(savedPreferences.horaInicio);
  const [lugar, setLugar] = useState(savedPreferences.lugar);
  const [edad, setEdad] = useState(savedPreferences.edad);
  const [personas, setPersonas] = useState(savedPreferences.personas);
  const [ubicacion, setUbicacion] = useState(savedPreferences.ubicacion);

  useEffect(() => {
    setTourPreferences({
      franjaHoraria: franjaHoraria,
      horaInicio: !horaInicio ? '': horaInicio,
      lugar: lugar,
      edad: edad,
      personas: personas,
      ubicacion: !ubicacion ? '' : ubicacion,
    });
  }, [
    franjaHoraria,
    horaInicio,
    lugar,
    edad,
    personas,
    ubicacion,
    setTourPreferences,
  ]);
  console.log(
    'SAVED PREFERENCES ',
    savedPreferences
  );

  console.log('TOUR PRFERENCES Step1', tourPreferences);

  return (
    <div className="tourStep1">
      <div className="descripcionTourStep1">
        <p className="descripcionTourStep1Text">
          Elija preferencias para que le podamos sugerir lugares para armar su
          tour
        </p>
      </div>
      <div className="tourPreferences">
        <form>
          <div className="tourCards schedule">
            <div className="cardName">
              <p>Franja horaria</p>
            </div>
            <div className="cardPreferences">
              <div className="preferencesOptions">
                <p>Dia</p>
                <p>Tarde</p>
                <p>Noche</p>
              </div>
              <div className="preferencesInput">
                <input
                  type="radio"
                  name="franjaHoraria"
                  value="dia"
                  onChange={(e) => setFranjaHoraria(e.target.value)}
                ></input>
                <input
                  type="radio"
                  name="franjaHoraria"
                  value="tarde"
                  onChange={(e) => setFranjaHoraria(e.target.value)}
                ></input>
                <input
                  type="radio"
                  name="franjaHoraria"
                  value="noche"
                  onChange={(e) => setFranjaHoraria(e.target.value)}
                ></input>
              </div>
            </div>
          </div>
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
                  onChange={(e) => setHoraInicio(e.target.value)}
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
                  value="espacioCerrado"
                  onChange={(e) => setLugar(e.target.value)}
                ></input>
                <input
                  type="radio"
                  name="tipoDePaseo"
                  value="alAirelibre"
                  onChange={(e) => setLugar(e.target.value)}
                ></input>
                <input
                  type="radio"
                  name="tipoDePaseo"
                  value="ambos"
                  onChange={(e) => setLugar(e.target.value)}
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
                  value="todas"
                  onChange={(e) => setEdad(e.target.value)}
                ></input>
                <input
                  type="radio"
                  name="restriccionesDeEdad"
                  value="mayores"
                  onChange={(e) => setEdad(e.target.value)}
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
                  value="grupo"
                  onChange={(e) => setPersonas(e.target.value)}
                ></input>
                <input
                  type="radio"
                  name="cantPersonas"
                  value="familiar"
                  onChange={(e) => setPersonas(e.target.value)}
                ></input>
                <input
                  type="radio"
                  name="cantPersonas"
                  value="pareja"
                  onChange={(e) => setPersonas(e.target.value)}
                ></input>
                <input
                  type="radio"
                  name="cantPersonas"
                  value="solo"
                  onChange={(e) => setPersonas(e.target.value)}
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
                  onChange={(e) => setUbicacion(e.target.value.toLowerCase())}
                ></input>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TourStep1;
