import { createContext, useState } from 'react';

const TourContext = createContext();

const TourProvider = ({ children }) => {
  const [tourPreferences, setTourPreferences] = useState();
  const [itemsParaTourDB, setItemsParaTourDB] = useState();
  const [savedTourItems, setSavedTourItems] = useState();
  const [dataTourForSave, setDataTourForSave] = useState({
    usuarioId: '',
    nombreTour: '',
    horaInicioTour: '',
    puntosdeInteresTour: '',
  });

  const SaveTourPreferences = (tourPreferences) => {
    sessionStorage.setItem('tourPreferences', JSON.stringify(tourPreferences));
  };

  const GetTourPreferences = () => {
    try {
      const preferences = sessionStorage.getItem('tourPreferences');
      return JSON.parse(preferences);
    } catch (err) {
      console.log('No hay tourPreferences en sessionstorages:', err);
    }
  };

  const SaveTourItems = (savedTourItems) => {
    sessionStorage.setItem('tourItems', JSON.stringify(savedTourItems));
  };

  const data = {
    /* VARIABLES */
    tourPreferences /* preferencias para solicitud de puntos de interes al backend */,
    setTourPreferences /*SET de preferencias para solicitar de puntos de interes al backend */,
    itemsParaTourDB /* puntos de interes que vienen del backend para llenar la columna ITEMS */,
    setItemsParaTourDB /* SET de puntos de interes que vienen del backend para llenar la columna ITEMS */,
    savedTourItems /* Puntos de interes elegidos para guardar en el tour */,
    setSavedTourItems /* SET de puntos de interes elegidos para guardar en el tour */,
    dataTourForSave /* datos para guardar tour en bd */,
    setDataTourForSave /* SET de datos para guardar tour en bd */,
    /* FUNCIONES */
    SaveTourPreferences /* FUNCION para guardar las preferencias en sessionStorage */,
    GetTourPreferences /* FUNCION para traer las preferencias guardados en el sessionStorage */,
    SaveTourItems /* FUNCION para guardar puntos de interes traidos de db en sessionStorage */,
  };

  return <TourContext.Provider value={data}>{children}</TourContext.Provider>;
};

export { TourProvider };
export default TourContext;
