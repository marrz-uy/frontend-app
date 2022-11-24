import React from 'react';
import '../../Css/TourStep2.css';

const TourStep2 = () => {
  return (
    <div className="tourStep2">
      <div className="descripcionTourStep2">
        <p className="descripcionTourStep2Text">
          Arrastre sus puntos de interes hacia la linea de tiempo para comenzar
          a armar su tour
        </p>
      </div>
      <div className='dragNDropContainer'>
        <div className='timelineContainer'>
          <div className='verticalLine'></div>
        </div>
        <div className='resultsContainer'></div>
      </div>
    </div>
  );
};

export default TourStep2;
