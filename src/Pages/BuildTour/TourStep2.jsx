import React, { useContext, useEffect } from 'react';
import TourContext from '../../Context/TourContext';
import '../../Css/TourStep2.css';

const TourStep2 = () => {
  const { setSavedTourItems, tourPreferences } = useContext(TourContext);
  useEffect(() => {
    setSavedTourItems({});
    // eslint-disable-next-line
  }, []);

  return (
    <div className="TourStep2">
      <div className="descripcionTourStep2">
      <div className='tituloSecundarioTourstep2'>
        <h3>Preferencias para el Tour</h3>
      </div>
        <div className="presentacionPreferencias">
          <div className="preferenciasIndividuales">
            <>
              <h4>Su tour comenzara a las {tourPreferences.horaInicio}</h4>
              <span>🕛</span>
            </>
          </div>
          <div className="preferenciasIndividuales">
            {tourPreferences.tipoDeLugar === 'Espacio cerrado' ? (
              <>
                <h4>En espacios cerrados y/o techados</h4>
                <span> 🏠</span>
              </>
            ) : tourPreferences.tipoDeLugar === 'Al aire libre' ? (
              <>
                <h4>En espacios al aire libre</h4>
                <span>🚴🏻‍♂️</span>
              </>
            ) : (
              <>
                <h4>Tanto espacios cerrados como al aire libre</h4>
                <span> 🏠🚴🏻‍♂️</span>
              </>
            )}
          </div>
          <div className="preferenciasIndividuales">
            {tourPreferences.restriccionDeEdad === 'Todas' ? (
              <>
                {' '}
                <h4>Para todas las edades</h4>
                <span>👩🧒🏽</span>
              </>
            ) : (
              <>
                <h4>Solo para mayores de 18 años</h4>
                <span> &#128683;</span>
              </>
            )}
          </div>
          <div className="preferenciasIndividuales">
            {tourPreferences.enfoqueDePersonas === 'Grupo' ? (
              <>
                <h4>Para ir en grupo</h4> <span>👨‍👨‍👦‍👦👨‍👧‍👧👨‍👩‍👦</span>
              </>
            ) : tourPreferences.enfoqueDePersonas === 'Familia' ? (
              <>
                <h4>Para concurrir en familia</h4>
                <span> 👨‍👨‍👦‍👦</span>
              </>
            ) : tourPreferences.enfoqueDePersonas === 'Pareja' ? (
              <>
                <h4>Para concurrir con su pareja</h4>
                <span> 👫🏿</span>
              </>
            ) : (
              <>
                <h4>Que se puede concurrir solo/a</h4>
                <span> 🥷🏽</span>
              </>
            )}
          </div>
          <div className="preferenciasIndividuales">
            <>
              <h4>Y ubicados en {tourPreferences.ubicacion}</h4>
              <span>🇺🇾</span>
            </>
          </div>
        </div>
        <div className="mensajeInferior">
          <p>
            Puede volver al paso anterior y cambiar alguna o todas las
            preferencias elegidas
          </p>
        </div>
      </div>
    </div>
  );
};

export default TourStep2;
