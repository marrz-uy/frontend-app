import { createContext, useState } from 'react';

const TourContext = createContext();

const TourProvider = ({ children }) => {
  const [tourPreferences, setTourPreferences] = useState();
  const [itemsParaTourDB, setItemsParaTourDB] = useState();
  const [savedTourItems, setSavedTourItems] = useState();

  // console.log('TOURPREFERENCES CONTEXT:', tourPreferences);

  const saveTourPreferences = (tourPreferences) => {
    sessionStorage.setItem('tourPreferences', JSON.stringify(tourPreferences));
  };

  const getTourPreferences = () => {
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
    saveTourPreferences,
    tourPreferences,
    setTourPreferences,
    getTourPreferences,
    itemsParaTourDB,
    setItemsParaTourDB,
    SaveTourItems,
    savedTourItems,
    setSavedTourItems,
  };

  return <TourContext.Provider value={data}>{children}</TourContext.Provider>;
};

export { TourProvider };
export default TourContext;
