import React from 'react';
import '../../Css/TourFinalStep.css'

const TourFinalStep = () => {
  return (
    <div className="tourFinalStep">
      <div className="descripcionTourFinalStep">
        <h1 className="descripcionTourFinalStepText">
				Elija un nombre para su tour
        </h1>
        <div className='inputDivTourFinalStep'>
          <input type="text" required></input>
        </div>
      </div>
    </div>
  );
};

export default TourFinalStep;
