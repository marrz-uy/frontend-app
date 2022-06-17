import React from 'react';
import '../Css/ResultCard.css'

const ResultsCard = (props) => {
  return (
    <div className='resultCard'>
      <div className='divImg'>
        <img className='imagen' src={props.img} alt=''></img>
      </div>
      <div className='data'>
        <h2>{props.nombre}</h2>
        <h4>{props.ciudad}</h4>
        <h6>{props.direccion}</h6>
        <br/>
        <h6>{props.caracteristicas}</h6>
      </div>
    </div>
  );
};

export default ResultsCard;
