import React, { useState, useEffect } from 'react';
import '../Css/SplashScreen.css';
import logo from '../Assets/logoFeelFuenteBlanca.svg';
import wave from '../Assets/wave.png';

export const SplashScreen = () => {
  const [mostrarPantallaInicio, setmostrarPantallaInicio] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setmostrarPantallaInicio(!mostrarPantallaInicio);
      setmostrarPantallaInicio(false);
    }, 3000);
  }, [mostrarPantallaInicio]);

  return (
    <div className="splashScreen">
      {mostrarPantallaInicio && (
        <div className="pantalla-inicio">
          <img className="wave" src={wave} alt="wave"></img>
          <div className="content">
            <div className="divTextSuperior">
              <h2 className="textSuperior">Arma tu tour</h2>
            </div>
            <div className='divlogoFell'>
              <img src={logo} alt="logo"></img>
              <div className="wrapper">
                <div className="border">
                  <div className="space">
                    <div className="loading"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="divTextInferior">
              <h2 className="textInferior">O descubri los del momento</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

