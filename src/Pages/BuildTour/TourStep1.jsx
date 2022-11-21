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
            <p>Dia</p>
            <p>tarde</p>
            <p>Noche</p>
          </div>
          <div className="cardRadioBtns">
            <input type="radio"></input>
            <input type="radio"></input>
            <input type="radio"></input>
          </div>
        </div>
        <div className="tourCards tourTypes">
          <div className="cardName">
            <p>Tipo de paseo</p>
          </div>
          <div className="cardPreferences">
            <p>Espacios cerrados</p>
            <p>Al aire libre</p>
            <p>Ambos</p>
          </div>
          <div className="cardRadioBtns">
          <input type="radio"></input>
            <input type="radio"></input>
            <input type="radio"></input>
          </div>
        </div>
        <div className="tourCards tourPeople">
          <div className="cardName">
            <p>Cantidad de personas</p>
          </div>
          <div className="cardPreferences">
            <p>Solos</p>
            <p>Familia</p>
            <p>Pareja</p>
            <p>Grupo</p>
          </div>
          <div className="cardRadioBtns">
          <input type="radio"></input>
            <input type="radio"></input>
            <input type="radio"></input>
            <input type="radio"></input>
          </div>
        </div>
        <div className="tourCards tourLocation">
          <div className="cardName">
            <p>Ubicacion</p>
          </div>
          <div className="cardPreferences">
            <p for="ubicacion" className="">Elija destino</p>
            <input type="text" className="ubicacion" name="ubicacion"></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourStep1;
