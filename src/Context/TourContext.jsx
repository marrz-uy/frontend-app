import { createContext, useState } from 'react';

const TourContext = createContext();

const TourProvider = ({ children }) => {
  // const inicialState = sessionStorage.getItem( 'tourPreferences');
  const [tourPreferences, setTourPreferences] = useState();

  // console.log('TOURPREFERENCES CONTEXT:', tourPreferences);

  const saveTourPreferences = (tourPreferences) => {
    sessionStorage.setItem('tourPreferences', JSON.stringify(tourPreferences));
  };

  const getTourPreferences = () => {
		const preferences =  sessionStorage.getItem('tourPreferences');
		return JSON.parse(preferences) 
  };

  const data = { saveTourPreferences, tourPreferences, setTourPreferences, getTourPreferences};

  return <TourContext.Provider value={data}>{children}</TourContext.Provider>;
};
export { TourProvider };
export default TourContext;
