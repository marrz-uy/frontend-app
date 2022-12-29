import { createContext, useState, useEffect } from 'react';
import backBuildTour from '../Assets/backBuildTour.png'
const PageContext = createContext();

const PageProvider = ({ children }) => {
  const [activePage, setActivePage] = useState('')
  const [backGround, setBackGround] = useState('')
  useEffect(() => {
    if(activePage === 'tourInit' || activePage === 'predefinedTour') {
      setBackGround(backBuildTour)
    }else{
      setBackGround('transparent')
    }
  }, [activePage])
  
  const data = { activePage, setActivePage, backGround };

  return (
    <PageContext.Provider value={data}>{children}</PageContext.Provider>
  );
};

export { PageProvider };
export default PageContext;