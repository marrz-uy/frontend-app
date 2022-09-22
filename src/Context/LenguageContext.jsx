import { createContext, useState, useEffect } from 'react';
import { getLanguageStorage } from '../Helpers/GetLenguageStorage';
import AuthUser from '../Components/AuthUser';
const LenguageContext = createContext();

const InitialLanguage = getLanguageStorage();

const LenguageProvider = ({ children }) => {
  const [lenguage, setLenguage] = useState(InitialLanguage);
  const [traduccionesBD, setTraduccionesBD] = useState([]);
  localStorage.setItem('language', 'en')
  const { http } = AuthUser();
  
  // const getTranslations = () => {
    
    /* http
      .post('/translations',)
      .then((response) => {
        const tradBD = response.data;
        setTraduccionesBD(tradBD);
      })
      .catch((error) => console.error(`Error en catch: ${error}`)); */
  // };

  useEffect(() => {
    http
    .post('/translations',)
    .then((response) => {
      const tradBD = response.data;
      setTraduccionesBD(tradBD);
    })
    .catch((error) => console.error(`Error en catch: ${error}`));
    // eslint-disable-next-line
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
