import React, { useState, useEffect, useContext } from 'react';
import LenguageContext from '../Context/LenguageContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import logo from '../Assets/logoFeelFuenteBlanca.svg';
import wave from '../Assets/wave.png';
import '../Css/SplashScreen.css';

export const SplashScreen = () => {
  const [mostrarPantallaInicio, setmostrarPantallaInicio] = useState(true);
  const { traduccionesBD, lenguage } = useContext(LenguageContext);

  useEffect(() => {
    setTimeout(() => {
      setmostrarPantallaInicio(!mostrarPantallaInicio);
      setmostrarPantallaInicio(false);
    }, 3000);
    sessionStorage.setItem('splash', null)
  }, [mostrarPantallaInicio]);

  return (
    <div className="splashScreen">
      {mostrarPantallaInicio && (
        <div className="pantalla-inicio">
          <img className="wave" src={wave} alt="wave"></img>
          <div className="content">
            <div className="divTextSuperior">
              <h2 className="textSuperior">
                {filtrarTraduccion(
                  traduccionesBD,
                  'splashScreenTextSup',
                  lenguage
                )}
              </h2>
            </div>
            <div className="divlogoFell">
              <div>
                <img src={logo} alt="logo"></img>
              </div>
              <div className="wrapper">
                <div className="border">
                  <div className="space">
                    <div className="loading"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="divTextInferior">
              <h2 className="textInferior">
                {filtrarTraduccion(
                  traduccionesBD,
                  'splashScreenTextInf',
                  lenguage
                )}
              </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
