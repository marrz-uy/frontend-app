import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../Layout';
import UserBar from './UserBar';
import LenguageContext from '../Context/LenguageContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import { handleUserBar } from '../Helpers/HandUserBarClick';
import Slider2 from '../Components/Slider2';
import SliderMain from '../Components/SliderMain'
import '../Css/PuntoInteresInfo.css';
import '../Css/userBarClick.css';
import '../Css/Slider.css';
import '../Css/SliderPuntoInteresInfo.css';


const PuntoInteresInfo = ({
  setUserBar,
  userBar,
  isLoggedIn,
  setIsLoggedIn,
  destination,
  setPage,
}) => {
  handleUserBar(userBar);
  const navigate = useNavigate();
  const { Facebook, Instagram } = destination
  const { traduccionesBD, lenguage } = useContext(LenguageContext);
  const [firefox, setFirefox] = useState(false)

  useEffect(() => {
    var sUsrAg = navigator.userAgent;
    if (sUsrAg.indexOf("Firefox") > -1) {
      setFirefox(true)
    }
  }, [])

  useEffect(() => {
    if (!destination.Nombre) {
      navigate('/');
    }
    setPage('infoResults');
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>
      <div className="puntoInteres__container">
        <div className="puntoInteres__imagen">
          {firefox ? <SliderMain imagen={destination.Imagen} /> : <Slider2 imagen={destination.Imagen} />}
        </div>
        <div className="puntoInteres__info">
          <h2 className="puntoInteres__info__tipo">{destination.Tipo}</h2>
          <h1 className="puntoInteres__info__nombre">{destination.Nombre}</h1>
          <div className="puntoInteres__info__datos">
            <p><span>{filtrarTraduccion(traduccionesBD, 'placeCity', lenguage)}: </span>{destination.Ciudad}</p>
            <p><span>{filtrarTraduccion(traduccionesBD, 'placeState', lenguage)}: </span>{destination.Departamento}</p>
            <p><span>{filtrarTraduccion(traduccionesBD, 'placeAddress', lenguage)}: </span>{destination.Direccion}</p>
          </div>
          <div className="puntoInteres__info__datos2">
            <p className="puntoInteres__info__descripcion">
              <span>{filtrarTraduccion(traduccionesBD, 'placeDescription', lenguage)}: </span>{destination.Descripcion}
            </p>
          </div>
          <div className='puntoInteres__info__horarios'>
            <p><span>{filtrarTraduccion(traduccionesBD, 'placeOpeningTime', lenguage)}: </span> {destination.HoraDeApertura}</p>
            <p><span>{filtrarTraduccion(traduccionesBD, 'placeClosingTime', lenguage)}: </span> {destination.HoraDeCierre}</p>
          </div>
          {Facebook | Instagram !== null ? (
            <div className='puntoInteres__info__social'>
              <h2>{filtrarTraduccion(traduccionesBD, 'placeMoreInformation', lenguage)}: </h2>
              <a href={destination.Instagram}><img src="https://img.icons8.com/color/48/000000/instagram-new--v1.png" alt='instagram' /></a>
              <a href={destination.Faceebok}><img src="https://img.icons8.com/fluency/48/000000/facebook.png" alt='facebook' /></a>
            </div>
          ) : ''}
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

export default PuntoInteresInfo;