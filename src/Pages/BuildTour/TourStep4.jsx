import React, { useContext } from 'react';
import TourContext from '../../Context/TourContext';
import '../../Css/TourStep3.css';

const TourStep3 = () => {
  const { savedTourItems } = useContext(TourContext);

  console.log('STEP 4 - savedTourItems: ', savedTourItems);

  return (
    <div className="tourStep3">
      <div className="descripcionTourStep3">
        <p className="descripcionTourStep3Text">
          Asi quedo su tour, debe guradarlo para consultarlo cuando desee
        </p>
      </div>
      <div className="tourTimeline">

      </div>
      <div className="mensajeInferior">
        <p>
          Puede volver al paso anterior y cambiar alguno o todos los puntod de
          interes para su tour
        </p>
      </div>
    </div>
  );
};

export default TourStep3;
