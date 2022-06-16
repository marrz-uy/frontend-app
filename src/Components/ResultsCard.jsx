import React from 'react';
import '../Css/ResultCard.css'

const ResultsCard = (props) => {
  return (
    <div className='resultCard'>
      <div className='resultImg'>
        <img src={props.img} alt=''  className='cardImg'></img>
      </div>
      <div className='resultData'>
        <h2>{props.nombre}</h2>
        <h4>{props.ciudad}</h4>
        <h6>{props.direccion}</h6>
      </div>
    </div>
  );
};

export default ResultsCard;
