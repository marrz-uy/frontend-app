import { useState, useContext, useEffect } from 'react';
import AuthUser from '../../Components/AuthUser';
import TourContext from '../../Context/TourContext';
import LenguageContext from '../../Context/LenguageContext';
import { filtrarTraduccion } from '../../Helpers/FilterTranslate';
import '../../Css/TourFinalStep.css';

const TourFinalStep = () => {
  const { http } = AuthUser();
  const { tourPreferences, savedTourItems, setDataTourForSave } =
    useContext(TourContext);
  const Id = sessionStorage.getItem('id');
  const horaInicio = tourPreferences?.horaInicio;

  const [tourName, setTourName] = useState('');
  const [pInteresString, setPInteresString] = useState('');
  const { traduccionesBD, lenguage } = useContext(LenguageContext);

  const accionTour = sessionStorage.getItem('accionTour');

  const tourId = sessionStorage.getItem('tourActualizar');
  const [nombreTour, setNombreTour] = useState('');

  useEffect(() => {
    if (accionTour === 'actualizar') {
      http
        .get(`/nombreTour/${tourId}`)
        .then((response) => {
          setNombreTour(response.data.tour);
        })
        .catch((error) => console.error(`Error en catch: ${error}`));
    }
  }, [accionTour]);

  function getIdString(objects) {
    let idString = '';
    for (let i = 0; i < objects.length; i++) {
      idString += objects[i].id + ',';
    }
    return idString;
  }

  useEffect(() => {
    let string = getIdString(savedTourItems);
    const newStr = string.substring(0, string.length - 1);
    setPInteresString(newStr);
    setDataTourForSave({
      usuarioId: Id,
      nombreTour: tourName,
      horaInicioTour: horaInicio,
      puntosdeInteresTour: pInteresString,
    });
  }, [
    Id,
    tourName,
    horaInicio,
    pInteresString,
    savedTourItems,
    setDataTourForSave,
  ]);

  return (
    <div className="tourFinalStep">
      {accionTour === 'actualizar' ? (
        <div className="descripcionTourFinalStep">
          <h2>
            {filtrarTraduccion(
              traduccionesBD,
              'updateTextTourFinalStep',
              lenguage
            )}{' '}
            <span>{nombreTour}</span>{' '}
          </h2>
        </div>
      ) : (
        <div className="descripcionTourFinalStep">
          <h1 className="descripcionTourFinalStepText">
            {filtrarTraduccion(traduccionesBD, 'tourName', lenguage)}
          </h1>
          <div className="inputDivTourFinalStep">
            <input
              type="text"
              onChange={(e) => setTourName(e.target.value)}
              required
            ></input>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourFinalStep;
