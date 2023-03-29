import React, { useState, useContext, useEffect } from 'react';
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
  console.log('accionTour: ', accionTour);

  const tourId = sessionStorage.getItem('tourActualizar');
  const [nombreTour, setNombreTour] = useState('');

  useEffect(() => {
    console.log('accionTour S4: ', accionTour);
    if (accionTour === 'actualizar') {
      http
        .get(`/nombreTour/${tourId}`)
        .then((response) => {
          console.log('nombreTour: ', response.data.tour);
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
    console.log('NEW STRING', newStr);
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
  console.log('savedTourItems- final', savedTourItems);
  return (
    <div className="tourFinalStep">
      {accionTour === 'actualizar' ? (
        <div className="descripcionTourFinalStep">
          <h2>
            Se actualizara el tour de nombre: <span>{nombreTour}</span>{' '}
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
