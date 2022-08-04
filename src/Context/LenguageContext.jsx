import { createContext, useState } from 'react';
import { translations } from '../Data/Translate';
import { getLanguageStorage } from '../Helpers/GetLenguageStorage';

const LenguageContext = createContext();

const InitialLanguage = getLanguageStorage()

const LenguageProvider = ({ children }) => {
  const [lenguage, setLenguage] = useState(InitialLanguage);
  const [textos, setTextos] = useState(translations[lenguage]);

  console.log('getLenguageStorage: ', getLanguageStorage());

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
    // console.log('LENGUAJE: ', lenguage);
  };

  //Los valores y funciones que se necesitan compartir van en data
  const data = { textos, handleLenguage, lenguage };

  return (
    <LenguageContext.Provider value={data}>{children}</LenguageContext.Provider>
  );
};

export { LenguageProvider };
export default LenguageContext;
