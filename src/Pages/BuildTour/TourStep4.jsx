import React, { useContext } from 'react';
import TourContext from '../../Context/TourContext';
import LenguageContext from '../../Context/LenguageContext';
import { filtrarTraduccion } from '../../Helpers/FilterTranslate';
import { Chrono } from 'react-chrono';
import '../../Css/TourStep4.css';

const TourStep3 = () => {
  const { savedTourItems } = useContext(TourContext);
  const { traduccionesBD, lenguage } = useContext(LenguageContext);

  console.log('STEP 4 - savedTourItems: ', savedTourItems);

  return (
    <div className="tourStep4">
      <div className="descripcionTourStep4">
        <p className="descripcionTourStep4Text">
          {filtrarTraduccion(traduccionesBD, 'thisIsYourTour', lenguage)}
        </p>
      </div>
      <div
        className="timelineTourFinal"
        // style={{ width: '102%', height: '350px' }}
      >
        <Chrono
          mode="VERTICAL_ALTERNATING"
          scrollable={{ scrollbar: true }}
          hideControls={true}
        >
          {savedTourItems?.map((dat) => {
            return (
              <div className="cardTourFinal" key={dat.id}>
                <div className="divImgTourFinal">
                  <img
                    className="imagenCardTourFinal"
                    id="imagenCardTourFinal"
                    src={dat.imagenes[0].url}
                    alt=""
                  ></img>
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
    </div>
  );
};

export default TourStep3;
