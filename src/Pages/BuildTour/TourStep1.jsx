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

        <div className="tourCards schedule">
          <div className="cardName">
            <p>Franja horaria</p>
          </div>
          <div className="cardPreferences">
            <div className="preferencesInput">
              <p>Dia</p>
              <input type="radio"></input>
            </div>
            <div className="preferencesInput">
              <p>Tarde</p>
              <input type="radio"></input>
            </div>
            <div className="preferencesInput">
              <p>Noche</p>
              <input type="radio"></input>
            </div>
          </div>
        </div>
        <div className="tourCards tourLocation">
          <div className="cardName">
            <p>A que hora comenzar</p>
          </div>
          <div className="cardPreferences">
            <p>
              Elija un hora
            </p>
            <input type="time" className="ubicacion" name="ubicacion"></input>
          </div>
        </div>
        <div className="tourCards tourTypes">
          <div className="cardName">
            <p>Tipo de paseo</p>
          </div>
          <div className="cardPreferences">
          <div className="preferencesInput">
              <p>Espacio cerrado</p>
              <input type="radio"></input>
            </div>
            <div className="preferencesInput">
              <p>Al Aire libre</p>
              <input type="radio"></input>
            </div>
            <div className="preferencesInput">
              <p>Ambos</p>
              <input type="radio"></input>
            </div>
          </div>
        </div>
        <div className="tourCards tourPeople">
          <div className="cardName">
            <p>Cantidad de personas</p>
          </div>
          <div className="cardPreferences">
          <div className="preferencesInput">
              <p>Solo</p>
              <input type="radio"></input>
            </div>
            <div className="preferencesInput">
              <p>Familia</p>
              <input type="radio"></input>
            </div>
            <div className="preferencesInput">
              <p>Pareja</p>
              <input type="radio"></input>
            </div>
            <div className="preferencesInput">
              <p>Grupo</p>
              <input type="radio"></input>
            </div>
          </div>
        </div>

        <div className="tourCards tourLocation">
          <div className="cardName">
            <p>Ubicacion</p>
          </div>
          <div className="cardPreferences">
            <p>
              Elija destino
            </p>
            <input type="text" className="ubicacion" name="ubicacion"></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourStep1;
