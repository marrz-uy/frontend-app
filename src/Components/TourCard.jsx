import React from 'react'
import '../Css/TourCard.css';

const TourCard = (props) => {

	return (
		<div className='tourCard'>
			<div className="divImgTour">
        <img className="imagen" src={props.imagen} alt=""></img>
      </div>
			<div className="dataTour">
        {props.nombreEvento ? (
          <h5>{props.nombreEvento} en {props.lugarDeEvento}</h5>
        ) : (
          <h5>{props.nombre}</h5>
        )}
        <h6>{props.direccion}</h6>

        
      </div>
		</div>
	)
}

export default TourCard;