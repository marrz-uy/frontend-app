import React, { useContext, useState, useEffect } from 'react';
import TourContext from '../../Context/TourContext';
import { Chrono } from 'react-chrono';
import '../../Css/TourStep4.css';

const TourStep3 = () => {
  const { savedTourItems } = useContext(TourContext);
  const [data, setData] = useState();
  /* useEffect(() => {
    setData(savedTourItems);
  }, []); */

  console.log('STEP 4 - savedTourItems: ', savedTourItems);

  return (
    <div className="tourStep4">
      <div className="descripcionTourStep4">
        <p className="descripcionTourStep4Text">
          Asi quedo su tour, debe guradarlo para consultarlo cuando desee
        </p>
      </div>

      <Chrono
        mode="VERTICAL_ALTERNATING"
        // slideShow mode="VERTICAL"
        twoColumns
      >
        {savedTourItems?.map((dat) => {
          return (
            <div className='cardTourFinal' key={dat.id}>
              <div className="divImgTourFinal">
                <img className="imagenCardTourFinal" src={dat.Imagen} alt=""></img>
              </div>
              <div className="dataTourFinal">
                {dat.nombreEvento ? (
                  <h6>
                    {dat.nombreEvento} en {dat.lugarDeEvento}
                  </h6>
                ) : (
                  <h6>{dat.Nombre}</h6>
                )}
                <p>- {dat.Tipo} </p>
                <p>
                  - Abre {''}
                  {dat.HoraDeApertura}
                </p>
              </div>
            </div>
          );
        })}
      </Chrono>
    </div>
  );
};

export default TourStep3;
