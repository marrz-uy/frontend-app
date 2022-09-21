import { createContext, useState, useEffect } from 'react';
import { getLanguageStorage } from '../Helpers/GetLenguageStorage';
import axios from 'axios';

const LenguageContext = createContext();

const InitialLanguage = getLanguageStorage();

const LenguageProvider = ({ children }) => {
  const [lenguage, setLenguage] = useState(InitialLanguage);
  const [traduccionesBD, setTraduccionesBD] = useState([]);
  localStorage.setItem('language', 'en')

  const getTranslations = () => {
    axios
      .get(`/api/translations`)
      .then((response) => {
        const tradBD = response.data;
        setTraduccionesBD(tradBD);
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
  };

  useEffect(() => {
    getTranslations();
  }, []);

  const handleLenguage = (e) => {
    e.preventDefault();
    if (lenguage === 'es') {
      setLenguage('en');
      localStorage.setItem('language', 'en');
    } else {
      setLenguage('es');
      localStorage.setItem('language', 'es');
    }
  };
  // console.log(lenguage)

  const data = { handleLenguage, lenguage, traduccionesBD };

  return (
    <LenguageContext.Provider value={data}>{children}</LenguageContext.Provider>
  );
};

export { LenguageProvider };
export default LenguageContext;
