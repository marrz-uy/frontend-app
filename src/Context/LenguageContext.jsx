import { createContext, useState } from 'react';
import { translations } from '../Data/Translate';

const LenguageContext = createContext();
const InitialLenguage = 'es';

const LenguageProvider = ({ children }) => {
  const [lenguage, setLenguage] = useState(InitialLenguage);
  const [textos, setTextos] = useState(translations[lenguage]);

  // console.log('TEXTOS: ', texto);

  const handleLenguage = (e) => {
    e.preventDefault();
    if (lenguage === InitialLenguage) {
      setLenguage('en');
      setTextos(translations.en);
    } else {
      setLenguage('es');
      setTextos(translations.es);
    }
    localStorage.setItem('lenguage', lenguage);
    console.log('LENGUAJE: ', lenguage);
  };

  //Los valores y funciones que se necesitan compartir van en data
  const data = { textos, handleLenguage, lenguage };

  return (
    <LenguageContext.Provider value={data}>{children}</LenguageContext.Provider>
  );
};

export { LenguageProvider };
export default LenguageContext;
