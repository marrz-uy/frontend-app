import { useContext } from 'react';
import { Chrono } from 'react-chrono';
import TourContext from '../../Context/TourContext';
import LenguageContext from '../../Context/LenguageContext';
import { filtrarTraduccion } from '../../Helpers/FilterTranslate';
import '../../Css/TourStep4.css';

const TourStep4 = () => {
  const { savedTourItems } = useContext(TourContext);
  const { traduccionesBD, lenguage } = useContext(LenguageContext);

  return (
    <div className="tourStep4">
      <div className="descripcionTourStep4">
        <p className="descripcionTourStep4Text">
          {filtrarTraduccion(traduccionesBD, 'thisIsYourTour', lenguage)}
        </p>
      </div>
      <div className="timelineTourFinal">
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

export default TourStep4;
