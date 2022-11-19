import React, { useState, useEffect } from 'react';
import { Layout } from '../../Layout';
import { handleUserBar } from '../../Helpers/HandUserBarClick';
import UserBar from '../../Pages/UserBar';
import '../../Css/BuildMyTour.css';
import '../../Css/userBarClick.css';
import TourStep1 from './TourStep1';
import TourStep2 from './TourStep2';
import TourStep3 from './TourStep3';
import TourFinalStep from './TourFinalStep';

const BuildMyTour = ({
  setPage,
  userBar,
  setUserBar,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  const [step, setstep] = useState(1);
  useEffect(() => {
    setPage('tour-preferences');
  }, [setPage]);

  const nextStep = () => {
		if (step < 4){
			setstep(step + 1);

		}
  };

  const prevStep = () => {
    if (step > 1){
			setstep(step - 1);
		}
  };
	console.log(step)
	

  handleUserBar(userBar);
  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>
      <div className="buildMyTour">
        <div className="tituloTourPreferences">
          <h2 className="tituloTourPreferencesText">Armar Tour</h2>
        </div>
        {step < 2 ? (<TourStep1 />) : step === 2 ? (<TourStep2 />) : step === 3 ? (<TourStep3 /> ): <TourFinalStep/>}
			<div className='buttons'>
				<button onClick={prevStep}>Prev</button>
				<button onClick={nextStep}>Sig</button>
			</div>
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
