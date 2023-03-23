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
              <div
                className="cardTourFinal"
                key={dat?.puntos_interes ? dat?.puntos_interes?.id : dat.id}
              >
                <div className="divImgTourFinal">
                  <img
                    className="imagenCardTourFinal"
                    id="imagenCardTourFinal"
                    src={
                      dat?.puntos_interes
                        ? dat?.puntos_interes?.imagenes[0]?.url
                        : dat.imagenes[0]?.url
                    }
                    alt=""
                  ></img>
                </div>
                <div className="dataTourFinal">
                  {dat?.puntos_interes ? (
                    dat?.puntos_interes?.nombreEvento
                  ) : dat.nombreEvento ? (
                    <h6>
                      {dat?.puntos_interes
                        ? dat?.puntos_interes?.nombreEvento
                        : dat.nombreEvento}{' '}
                      en{' '}
                      {dat?.puntos_interes
                        ? dat?.puntos_interes?.lugarDeEvento
                        : dat.lugarDeEvento}
                    </h6>
                  ) : (
                    <h6>
                      {dat?.puntos_interes
                        ? dat?.puntos_interes?.Nombre
                        : dat.Nombre}
                    </h6>
                  )}
                  <p>
                    -{' '}
                    {dat?.puntos_interes ? dat?.puntos_interes?.Tipo : dat.Tipo}{' '}
                  </p>
                  <p>
                    - Abre {''}
                    {dat?.puntos_interes
                      ? dat?.puntos_interes?.HoraDeApertura
                      : dat.HoraDeApertura}
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
