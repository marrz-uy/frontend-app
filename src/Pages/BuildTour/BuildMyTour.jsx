import React, { useEffect, useContext, useState } from 'react';
import PageContext from '../../Context/PageContext';
import { Layout } from '../../Layout';
import LenguageContext from '../../Context/LenguageContext';
import { filtrarTraduccion } from '../../Helpers/FilterTranslate';
import { handleUserBar } from '../../Helpers/HandUserBarClick';
import UserBar from '../../Pages/UserBar';
import TourSteps from '../../Components/TourSteps';
import '../../Css/BuildMyTour.css';
import '../../Css/userBarClick.css';

const BuildMyTour = ({
  setPage,
  userBar,
  setUserBar,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  const { setActivePage } = useContext(PageContext);
  const { traduccionesBD, lenguage } = useContext(LenguageContext);
  const [accionTour, setAccionTour] = useState(
    sessionStorage.getItem('accionTour')
  );
  useEffect(() => {
    setPage('tour-preferences');
    setActivePage('tourInit');
  }, [setPage, setActivePage]);

  handleUserBar(userBar);
  return (
    <Layout>
      <div className="buildMyTour">
        <div className="userbar-click" onClick={() => setUserBar(false)}></div>
        <div className="tituloTourPreferences">
          <h2 className="tituloTourPreferencesText">
            {accionTour === 'null'
              ? filtrarTraduccion(traduccionesBD, 'buildTour', lenguage)
              : filtrarTraduccion(traduccionesBD, 'updateTour', lenguage)}
          </h2>
        </div>
        <TourSteps />
      </div>
      {userBar && (
        <UserBar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setUserBar={setUserBar}
        />
      )}
    </Layout>
  );
};

export default BuildMyTour;
