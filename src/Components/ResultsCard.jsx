import React from 'react';
import '../Css/ResultCard.css';

const ResultsCard = (props) => {
  return (
    <div className="resultCard">
      <div className="divImg">
        <img className="imagen" src={props.imagen} alt=""></img>
      </div>
      <div className="data">
        {props.nombreEvento ? (
          <h3>{props.nombreEvento} en {props.lugarDeEvento}</h3>
        ) : (
          <h3>{props.nombre}</h3>
        )}
        <h6>{props.ciudad}</h6>
        <h6>{props.direccion}</h6>

        <div className="diaYHora">
          {props.nombreEvento ? (
            <h6>
              Fecha:{props.fechaInicio} {/* {props.fechaFin} */} Hora:{' '}
              {props.horaInicio}
            </h6>
          ) : (
            <h6>
              {' '}
              Horario: de {props.horaInicio} a {props.horaFin}
            </h6>
          )}
        </div>
        <h6>{props.tipoEvento}</h6>
        <br />
        <h6>{props.contacto}</h6>
      </div>
    </div>
  );
};

export default ResultsCard;
