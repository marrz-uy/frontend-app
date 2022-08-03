import { createContext, useState } from 'react';
import { translations } from '../Data/Translate';

const LenguageContext = createContext();

/* if(localStorage.getItem('lenguaje') === null){
  console.log('LOCAL STORAGE LENGUAJE',localStorage.getItem('lenguaje'))
  localStorage.setItem('lenguage', 'es');
} */
const savedLenguage = localStorage.getItem('lenguage')
console.log('LOCAL STORAGE LENGUAJE2',localStorage.getItem('lenguaje'))
const InitialLenguage = savedLenguage
console.log('savedLenguage', savedLenguage)
console.log('InitialLenguage', InitialLenguage)

const LenguageProvider = ({ children }) => {
  const [lenguage, setLenguage] = useState(InitialLenguage);
  const [textos, setTextos] = useState(translations[lenguage]);

  // console.log('TEXTOS: ', texto);

  const handleLenguage = (e) => {
    e.preventDefault();
    if (lenguage === InitialLenguage) {
      setLenguage('en');
      setTextos(translations.en);
      localStorage.setItem('lenguage', 'en');
    } else {
      setLenguage('es');
      setTextos(translations.es);
      localStorage.setItem('lenguage', 'es');
    }
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
