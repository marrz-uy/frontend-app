import { createContext, useState, useEffect } from 'react';
import { translations } from '../Data/Translate'; //! ARCHIVO TEXTOS OBJETO
import { getLanguageStorage } from '../Helpers/GetLenguageStorage';
import axios from 'axios';

const LenguageContext = createContext();

const InitialLanguage = getLanguageStorage();

const LenguageProvider = ({ children }) => {
  const [lenguage, setLenguage] = useState(InitialLanguage);
  const [textos, setTextos] = useState(translations[lenguage]);
  const [traduccionesBD, setTraduccionesBD] = useState([]);

  const getTranslations = () => {
    axios
      .get(`http://localhost:8000/api/translations`)
      .then((response) => {
        const tradBD = response.data;
        setTraduccionesBD(tradBD);
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
  };

  useEffect(() => {
    getTranslations();
  }, []);

  console.log('traduccionesBD: ', traduccionesBD)
  // console.log('traduccionesBD: ', typeof(traduccionesBD) )

  const handleLenguage = (e) => {
    e.preventDefault();
    if (lenguage === 'es') {
      setLenguage('en');
      setTextos(translations.en);
      localStorage.setItem('language', 'en');
    } else {
      setLenguage('es');
      setTextos(translations.es);
      localStorage.setItem('language', 'es');
    }
  };

  const data = { textos, handleLenguage, lenguage, traduccionesBD };

  return (
    <LenguageContext.Provider value={data}>{children}</LenguageContext.Provider>
  );
};

export { LenguageProvider };
export default LenguageContext;
