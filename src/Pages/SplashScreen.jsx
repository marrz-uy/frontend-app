import React, { useState, useEffect, useContext } from 'react'
import LenguageContext from '../Context/LenguageContext'
import '../Css/SplashScreen.css'
import logo from '../Assets/logoFeelFuenteBlanca.svg'
import wave from '../Assets/wave.png'

export const SplashScreen = () => {
  const [mostrarPantallaInicio, setmostrarPantallaInicio] = useState(true);
  const { textos } = useContext(LenguageContext)

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
              <h2 className="textSuperior">{textos.splashScreenTextSup}</h2>
            </div>
            <div className='divlogoFell'>
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
              <h2 className="textInferior">{textos.splashScreenTextInf}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

