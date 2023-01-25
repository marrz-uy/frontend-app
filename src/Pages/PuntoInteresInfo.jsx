import React, { useEffect, useState, useContext } from 'react';
import PageContext from '../Context/PageContext';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../Layout';
import UserBar from './UserBar';
import LenguageContext from '../Context/LenguageContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import { handleUserBar } from '../Helpers/HandUserBarClick';
import Slider2 from '../Components/Slider2';
import SliderMain from '../Components/SliderMain';
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
  categoryName,
}) => {
  const { setActivePage } = useContext(PageContext);
  handleUserBar(userBar);
  const navigate = useNavigate();
  const { Facebook, Instagram } = destination;
  const { traduccionesBD, lenguage } = useContext(LenguageContext);
  const [firefox, setFirefox] = useState(false);
  console.log('CATEGORY NAME: ', categoryName);
  useEffect(() => {
    setActivePage('PuntoInteresInfo');
    var sUsrAg = navigator.userAgent;
    if (sUsrAg.indexOf('Firefox') > -1) {
      setFirefox(true);
    }
  }, [setActivePage]);

  useEffect(() => {
    if (!destination.Nombre) {
      navigate('/');
    }
    setPage('PuntoInteresInfo');

    // eslint-disable-next-line
  }, []);

  // const handleCategories = (e) => {
  //   navigate('/results');
  // };

  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>
      <div className="divBackbtn">
        {/* <button
          className="backBtn"
          onClick={() => handleCategories(categoryName)}
        >
          Volver
        </button> */}
      </div>
      <div className="puntoInteres__container">
        <div className="puntoInteres__imagen">
          {firefox ? (
            <SliderMain imagen={destination.Imagen} />
          ) : (
            <Slider2 imagen={destination.Imagen} />
          )}
        </div>
        <div className="puntoInteres__info">
          <h2 className="puntoInteres__info__tipo">{destination.Tipo}</h2>
          <h1 className="puntoInteres__info__nombre">{destination.Nombre}</h1>
          <div className="puntoInteres__info__datos">
            <p>
              <span>
                {filtrarTraduccion(traduccionesBD, 'placeCity', lenguage)}:{' '}
              </span>
              {destination.Ciudad}
            </p>
            <p>
              <span>
                {filtrarTraduccion(traduccionesBD, 'placeState', lenguage)}:{' '}
              </span>
              {destination.Departamento}
            </p>
            <p>
              <span>
                {filtrarTraduccion(traduccionesBD, 'placeAddress', lenguage)}:{' '}
              </span>
              {destination.Direccion}
            </p>
          </div>
          <div className="puntoInteres__info__datos2">
            <p className="puntoInteres__info__descripcion">
              <span>
                {filtrarTraduccion(
                  traduccionesBD,
                  'placeDescription',
                  lenguage
                )}
                :{' '}
              </span>
              {destination.Descripcion}
            </p>
          </div>
          <div className="puntoInteres__info__horarios">
            <p>
              <span>
                {filtrarTraduccion(
                  traduccionesBD,
                  'placeOpeningTime',
                  lenguage
                )}
                :{' '}
              </span>{' '}
              {destination.HoraDeApertura}
            </p>
            <p>
              <span>
                {filtrarTraduccion(
                  traduccionesBD,
                  'placeClosingTime',
                  lenguage
                )}
                :{' '}
              </span>{' '}
              {destination.HoraDeCierre}
            </p>
          </div>
          {Facebook | (Instagram !== null) ? (
            <div className="puntoInteres__info__social">
              <h2>
                {filtrarTraduccion(
                  traduccionesBD,
                  'placeMoreInformation',
                  lenguage
                )}
                :{' '}
              </h2>
              <div>
                <a href={destination.Instagram}>
                  <img
                    src="https://img.icons8.com/color/48/000000/instagram-new--v1.png"
                    alt="instagram"
                  />
                </a>
                <a href={destination.Faceebok}>
                  <img
                    src="https://img.icons8.com/fluency/48/000000/facebook.png"
                    alt="facebook"
                  />
                </a>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
        {destination.Tipo === 'Hotel' || destination.Tipo === 'Hostel' ? (
          <div className="puntoInteres__especificaciones">
            <div className="puntoInteres__especificaciones__info">
              <h2>
                {filtrarTraduccion(traduccionesBD, 'hotelEspec', lenguage)}
              </h2>
              <p>
                <span>
                  {filtrarTraduccion(traduccionesBD, 'rooms', lenguage)}:
                </span>{' '}
                {/* {destination.Habitaciones === 1 ? 'Si' : 'No'} */}
                {destination.Habitaciones}
              </p>
              <p>
                <span>
                  {filtrarTraduccion(traduccionesBD, 'ratings', lenguage)}:
                </span>{' '}
                {destination.Calificaciones === 1
                  ? filtrarTraduccion(traduccionesBD, 'yes', lenguage)
                  : 'No'}
              </p>
            </div>
            <div className="puntoInteres__especificaciones__datos">
              <div className="puntoInteres__especificaciones__datos1">
                <p>
                  <span>
                    {filtrarTraduccion(
                      traduccionesBD,
                      'privateBathroom',
                      lenguage
                    )}
                    :{' '}
                  </span>
                  {destination.BanoPrivad === 1 ? '✅ ' : '❌'}
                </p>
                <p>
                  <span>Casino: </span>
                  {destination.Casino === 1 ? '✅ ' : '❌'}
                </p>
                <p>
                  <span>Bar: </span>
                  {destination.Bar === 1 ? '✅ ' : '❌'}
                </p>
                <p>
                  <span>
                    {filtrarTraduccion(traduccionesBD, 'restaurant', lenguage)}:{' '}
                  </span>
                  {destination.Restaurante === 1 ? '✅ ' : '❌'}
                </p>
                <p>
                  <span>
                    {filtrarTraduccion(traduccionesBD, 'breakfast', lenguage)}:{' '}
                  </span>
                  {destination.Desayuno === 1 ? '✅ ' : '❌'}
                </p>
              </div>
              <div className="puntoInteres__especificaciones__datos2">
                <p>
                  <span>
                    {filtrarTraduccion(traduccionesBD, 'cableTv', lenguage)}:{' '}
                  </span>
                  {destination.TvCable === 1 ? '✅ ' : '❌'}
                </p>
                <p>
                  <span>
                    {filtrarTraduccion(
                      traduccionesBD,
                      'swimmingPool',
                      lenguage
                    )}
                    :{' '}
                  </span>
                  {destination.Piscina === 1 ? '✅ ' : '❌'}
                </p>
                <p>
                  <span>Wifi: </span>
                  {destination.Wifi === 1 ? '✅ ' : '❌'}
                </p>
                <p>
                  <span>
                    {filtrarTraduccion(
                      traduccionesBD,
                      'airConditioner',
                      lenguage
                    )}
                    :{' '}
                  </span>
                  {destination.AireAcondicionado === 1 ? '✅ ' : '❌'}
                </p>
              </div>
            </div>
          </div>
        ) : destination.Tipo === 'Restaurantes' ? (
          <div className="puntoInteres__especificaciones__gastronomia">
            <div className="puntoInteres__especificaciones__info__gastronomia">
              <h2>
                {filtrarTraduccion(traduccionesBD, 'restaurantEspec', lenguage)}
              </h2>
            </div>
            <div className="puntoInteres__especificaciones__datos__gastronomia">
              <p>
                <span>
                  {filtrarTraduccion(traduccionesBD, 'food', lenguage)}:{' '}
                </span>{' '}
                {destination.Comida === 1 ? '✅ ' : '❌'}
              </p>
              <p>
                <span>
                  {' '}
                  {filtrarTraduccion(
                    traduccionesBD,
                    'veggieFood',
                    lenguage
                  )}:{' '}
                </span>{' '}
                {destination.ComidaVegge === 1 ? '✅ ' : '❌'}
              </p>
              <p>
                <span>Alcohol: </span>{' '}
                {destination.Alcohol === 1 ? '✅ ' : '❌'}
              </p>
              <p>
                <span>
                  {filtrarTraduccion(traduccionesBD, 'childrenMenu', lenguage)}:{' '}
                </span>{' '}
                {destination.MenuInfantil === 1 ? '✅ ' : '❌'}
              </p>
            </div>
          </div>
        ) : (
          ''
        )}
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
