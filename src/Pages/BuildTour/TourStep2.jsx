import React, { useContext, useEffect } from 'react';
import TourContext from '../../Context/TourContext';
import LenguageContext from '../../Context/LenguageContext';
import { filtrarTraduccion } from '../../Helpers/FilterTranslate';
import '../../Css/TourStep2.css';

const TourStep2 = () => {
  const { setSavedTourItems, tourPreferences } = useContext(TourContext);
  const { traduccionesBD, lenguage } = useContext(LenguageContext);
  useEffect(() => {
    setSavedTourItems({});
  }, [setSavedTourItems]);

  return (
    <div className="TourStep2">
      <div className="descripcionTourStep2">
        <div className="tituloSecundarioTourstep2">
          <h3>
            {filtrarTraduccion(traduccionesBD, 'preferencesForTour', lenguage)}
          </h3>
        </div>
        <div className="presentacionPreferencias">
          <div className="preferenciasIndividuales">
            <>
              <h4>
                {filtrarTraduccion(
                  traduccionesBD,
                  'youtTourWillBeginAt',
                  lenguage
                )}{' '}
                {tourPreferences.horaInicio}
              </h4>
              <span>🕛</span>
            </>
          </div>
          <div className="preferenciasIndividuales">
            {tourPreferences.tipoDeLugar === 'Espacio cerrado' ? (
              <>
                <h4>
                  {filtrarTraduccion(traduccionesBD, 'inEnclosed', lenguage)}
                </h4>
                <span> 🏠</span>
              </>
            ) : tourPreferences.tipoDeLugar === 'Al aire libre' ? (
              <>
                <h4>
                  {filtrarTraduccion(traduccionesBD, 'outdoorSpaces', lenguage)}
                </h4>
                <span>🚴🏻‍♂️</span>
              </>
            ) : (
              <>
                <h4>
                  {filtrarTraduccion(
                    traduccionesBD,
                    'indoorsOutdoors',
                    lenguage
                  )}
                </h4>
                <span> 🏠🚴🏻‍♂️</span>
              </>
            )}
          </div>
          <div className="preferenciasIndividuales">
            {tourPreferences.restriccionDeEdad === 'Todas' ? (
              <>
                {' '}
                <h4>
                  {filtrarTraduccion(traduccionesBD, 'forAllAges', lenguage)}
                </h4>
                <span>👩🧒🏽</span>
              </>
            ) : (
              <>
                <h4>
                  {filtrarTraduccion(
                    traduccionesBD,
                    'only18YearsOld',
                    lenguage
                  )}
                </h4>
                <span> &#128683;</span>
              </>
            )}
          </div>
          <div className="preferenciasIndividuales">
            {tourPreferences.enfoqueDePersonas === 'Grupo' ? (
              <>
                <h4>
                  {filtrarTraduccion(traduccionesBD, 'toGoinGroup', lenguage)}
                </h4>{' '}
                <span>👨‍👨‍👦‍👦👨‍👧‍👧👨‍👩‍👦</span>
              </>
            ) : tourPreferences.enfoqueDePersonas === 'Familia' ? (
              <>
                <h4>
                  {filtrarTraduccion(
                    traduccionesBD,
                    'toAttendWithFamily',
                    lenguage
                  )}
                </h4>
                <span> 👨‍👨‍👦‍👦</span>
              </>
            ) : tourPreferences.enfoqueDePersonas === 'Pareja' ? (
              <>
                <h4>
                  {filtrarTraduccion(
                    traduccionesBD,
                    'toAttendWithPartner',
                    lenguage
                  )}
                </h4>
                <span> 👫🏿</span>
              </>
            ) : (
              <>
                <h4>
                  {filtrarTraduccion(
                    traduccionesBD,
                    'thatPossibleAttendAlone',
                    lenguage
                  )}
                </h4>
                <span> 🥷🏽</span>
              </>
            )}
          </div>
          <div className="preferenciasIndividuales">
            <>
              <h4>
                {filtrarTraduccion(traduccionesBD, 'locatedIn', lenguage)}{' '}
                {tourPreferences.ubicacion}
              </h4>
              <span>🇺🇾</span>
            </>
          </div>
        </div>
      </div>
      <div className="mensajeInferior">
        <p>
          {filtrarTraduccion(traduccionesBD, 'goBackThePreviousStep', lenguage)}
        </p>
      </div>
    </div>
  );
};

export default TourStep2;
