import React, { useState, useContext, useEffect } from 'react';
import TourContext from '../../Context/TourContext';
import LenguageContext from '../../Context/LenguageContext';
import { filtrarTraduccion } from '../../Helpers/FilterTranslate';
import '../../Css/TourFinalStep.css';

const TourFinalStep = () => {
  const { tourPreferences, savedTourItems, setDataTourForSave } =
    useContext(TourContext);
  const Id = sessionStorage.getItem('id');
  const horaInicio = tourPreferences?.horaInicio;

  const [tourName, setTourName] = useState('');
  const [pInteresString, setPInteresString] = useState('');
  const { traduccionesBD, lenguage } = useContext(LenguageContext);

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
    </div>
  );
};

export default TourFinalStep;
