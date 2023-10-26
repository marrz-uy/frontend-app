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
  const [itemsHeredados, setItemsHeredados] = useState(null);

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
    tourPreferences,
    setTourPreferences,
    itemsParaTourDB,
    setItemsParaTourDB,
    savedTourItems,
    setSavedTourItems,
    dataTourForSave,
    setDataTourForSave,
    SaveTourPreferences,
    GetTourPreferences,
    SaveTourItems,
    itemsHeredados,
    setItemsHeredados,
  };

  return <TourContext.Provider value={data}>{children}</TourContext.Provider>;
};

export { TourProvider };
export default TourContext;
