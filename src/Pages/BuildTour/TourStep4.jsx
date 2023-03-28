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
          {savedTourItems?.map((dato) => {
            return (
              <div
                className="cardTourFinal"
                key={dato?.puntos_interes ? dato?.puntos_interes?.id : dato.id}
              >
                <div className="divImgTourFinal">
                  <img
                    className="imagenCardTourFinal"
                    id="imagenCardTourFinal"
                    src={
                      dato?.puntos_interes
                        ? dato?.puntos_interes?.imagenes[0]?.url
                        : dato.imagenes[0]?.url
                    }
                    alt=""
                  ></img>
                </div>
                <div className="dataTourFinal">
                  {dato?.puntos_interes ? (
                    dato.puntos_interes?.nombreEvento
                  ) : dato.nombreEvento ? (
                    <h6>
                      {dato?.puntos_interes
                        ? dato?.puntos_interes?.nombreEvento
                        : dato.nombreEvento}{' '}
                      en{' '}
                      {dato?.puntos_interes
                        ? dato.puntos_interes?.lugarDeEvento
                        : dato.lugarDeEvento}
                    </h6>
                  ) : (
                    <h6>
                      {dato?.Puntos_interes
                        ? dato.puntos_interes?.Nombre
                        : dato.Nombre}
                    </h6>
                  )}
                  <p>
                    -{' '}
                    {dato?.puntos_interes
                      ? dato.puntos_interes?.Tipo
                      : dato.Tipo}{' '}
                  </p>
                  <p>
                    - Abre {''}
                    {dato?.puntos_interes
                      ? dato?.puntos_interes?.HoraDeApertura
                      : dato.HoraDeApertura}
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
