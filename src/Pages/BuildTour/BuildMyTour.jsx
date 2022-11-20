import React, { useState, useEffect } from 'react';
import { Layout } from '../../Layout';
import { handleUserBar } from '../../Helpers/HandUserBarClick';
import UserBar from '../../Pages/UserBar';
import '../../Css/BuildMyTour.css';
import '../../Css/userBarClick.css';
// import TourStep1 from './TourStep1';
// import TourStep2 from './TourStep2';
// import TourStep3 from './TourStep3';
// import TourFinalStep from './TourFinalStep';
import TourSteps from '../../Components/TourSteps';

const BuildMyTour = ({
  setPage,
  userBar,
  setUserBar,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  // const [step, setstep] = useState(1);
  useEffect(() => {
    setPage('tour-preferences');
  }, [setPage]);

  /* const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
    nickname: "",
    email: "",
    address: "",
    nationality: "",
    zipcode: "",
    highestQualification: "", 
    occupation: "",
    about: "",
  });


  const nextStep = () => {
		if (step < 4){
			setstep(step + 1);

		}
  };

  const prevStep = () => {
    if (step > 1){
			setstep(step - 1);
		}
  }; */

  // console.log(step)

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
