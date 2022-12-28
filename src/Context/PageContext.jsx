import { createContext, useState, useEffect } from 'react';
import backPredefinedTour from '../Assets/backPredefinedTour.png'
import backBuildTour from '../Assets/Group_238.png'
const PageContext = createContext();

const PageProvider = ({ children }) => {
  const [activePage, setActivePage] = useState('')
  const [backGround, setBackGround] = useState('')
  useEffect(() => {
    if(activePage !== 'tourInit' || activePage !==' predefinedTour' ) {
      setBackGround('transparent')
    }
    if(activePage === 'tourInit') {
      setBackGround(backBuildTour)
    }
    if(activePage === 'predefinedTour') {
      setBackGround(backPredefinedTour)
    }
  }, [activePage])
  
  const data = { activePage, setActivePage, backGround };

  return (
    <PageContext.Provider value={data}>{children}</PageContext.Provider>
  );
};

export { PageProvider };
export default PageContext;