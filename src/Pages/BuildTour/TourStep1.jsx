import React from 'react';
import '../../Css/TourStep1.css';

const TourStep1 = () => {
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
                  defaultChecked={true}
                ></input>
                <input type="radio" name="franjaHoraria" value="tarde"></input>
                <input type="radio" name="franjaHoraria" value="noche"></input>
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
                <p>Ambos</p>
                <p>Al Aire libre</p>
              </div>
              <div className="preferencesInput">
                <input
                  type="radio"
                  name="tipoDePaseo"
                  value="espacioCerrado"
                  defaultChecked={true}
                ></input>
                <input type="radio" name="tipoDePaseo" value="ambos"></input>
                <input
                  type="radio"
                  name="tipoDePaseo"
                  value="alAirelibre"
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
                  value="todasLasEdades"
                  defaultChecked={true}
                ></input>
                <input
                  type="radio"
                  name="restriccionesDeEdad"
                  value="mayores"
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
                <p>Solo</p>
                <p>Pareja</p>
                <p>Familia</p>
                <p>Grupo</p>
              </div>
              <div className="preferencesInput">
                <input
                  type="radio"
                  name="cantPersonas"
                  value="solo"
                  defaultChecked={true}
                ></input>
                <input type="radio" name="cantPersonas" value="pareja"></input>
                <input
                  type="radio"
                  name="cantPersonas"
                  value="familiar"
                ></input>
                <input type="radio" name="cantPersonas" value="grupo"></input>
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
                  name="ubicacion"
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
