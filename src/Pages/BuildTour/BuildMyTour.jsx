import React, { useEffect } from 'react';
import { Layout } from '../../Layout';
import { handleUserBar } from '../../Helpers/HandUserBarClick';
import UserBar from '../../Pages/UserBar';
import '../../Css/BuildMyTour.css';
import '../../Css/userBarClick.css';
import TourSteps from '../../Components/TourSteps';
// import { TourProvider } from '../../Context/TourContext';

const BuildMyTour = ({
  setPage,
  userBar,
  setUserBar,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  useEffect(() => {
    setPage('tour-preferences');
  }, [setPage]);

  handleUserBar(userBar);
  return (
    <Layout>
      <div className="buildMyTour">
        <div className="userbar-click" onClick={() => setUserBar(false)}></div>
        <div className="tituloTourPreferences">
          <h2 className="tituloTourPreferencesText">Armar Tour</h2>
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
