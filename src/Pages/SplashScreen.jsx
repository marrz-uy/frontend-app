import React, { useState, useEffect } from 'react';
import '../css/SplashScreen.css';
import logo from '../Assets/logoFeelFuenteBlanca.svg';
import wave from '../Assets/wave.png';

export const SplashScreen = () => {
  const [mostrarPantallaInicio, setmostrarPantallaInicio] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setmostrarPantallaInicio(!mostrarPantallaInicio);
      setmostrarPantallaInicio(false);
    }, 1000);
  }, [mostrarPantallaInicio]);

  return (
    <div className='splashScreen'>
      {mostrarPantallaInicio && (
        <div className="pantalla-inicio">
        <img className='wave' src={wave} alt="wave"></img>
          <div className='content'>
            <div className='textSuperior'>
              <h2>Arma tu tour</h2>
            </div>
            <div>
              <img src={logo} alt="logo"></img>
              <div className="wrapper">
                <div className="border">
                  <div className="space">
                    <div className="loading"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className='textInferior'>
              <h2>O descubri los del momento</h2>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
};
