import React, { useEffect, useContext, useState } from 'react';
import LenguageContext from '../Context/LenguageContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import AuthUser from '../Components/AuthUser';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../Assets/logoFeelFuenteBlanca.svg';
import backArrow from '../Assets/back.svg';
import searchlogo from '../Assets/searchLogo.png';
import '../Css/Nav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import useGeoLocation from '../Helpers/useGeolocation';

const Nav = ({
  text,
  setText,
  setItems,
  isLoggedIn,
  setIsLoggedIn,
  page,
  userBar,
  setUserBar,
}) => {
  const location = useGeoLocation();
  const latitud = JSON.stringify(location.coordinates.lat);
  const longitud = JSON.stringify(location.coordinates.lng);

  const [latitudAEnviar, setLatitudAEnviar] = useState();
  const [longitudAEnviar, setLongitudAEnviar] = useState();
  let lat = latitud.toString().replace(/[-,.]/gi, '').slice(0, 7);
  if (lat.length === 6) {
    lat = lat + 0;
  }

  let long = longitud.toString().replace(/[-,.]/gi, '').slice(0, 7);
  if (long.length === 6) {
    long = long + 0;
  }
  const [distanciaAEnviar, setDistancia] = useState('');
  const { http, getUser, getLoggedIn } = AuthUser();

  console.log('LAT Y LONG', lat.length, long.length);

  const { handleLenguage, traduccionesBD, lenguage } =
    useContext(LenguageContext);

  useEffect(() => {
    setIsLoggedIn(getLoggedIn());
    setLatitudAEnviar(lat);
    setLongitudAEnviar(long);
    setDistancia(50000);
  }, [setIsLoggedIn, getLoggedIn, isLoggedIn, lat, long]);

  const navigate = useNavigate();

  const getData = () => {
    http
      .post(`/PuntosInteresCercanos/nombre/${text}`, {
        latitudAEnviar,
        longitudAEnviar,
        distanciaAEnviar,
      })
      .then((res) => {
        const allDdata = res.data;
        setItems(allDdata);
        console.log('%cDATA RESPONSE NAV:', 'color: green;', allDdata);
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
  };

  const handleText = (e) => {
    e.preventDefault();
    // let t = e.target.value;
    setText(e.target.value);
  };

  const handleSearch = () => {
    setItems([]);
    if (text.length > 2) {
      getData(text);
      navigate('/results');
      return;
    }
    alert('Ingrese un texto mayor a 2 caracteres');
  };

  const handleEnter = (e) => {
    setItems([]);
    if (e.key === 'Enter') {
      if (text.length > 2) {
        getData(text);
        navigate('/results');
        return;
      }
      alert('Ingrese un texto mayor a 2 caracteres');
    }
  };

  return (
    <div className="navbar">
      <div className="contentNavbar">
        <div className="logoFellUy">
          {page !== 'principal' ? (
            <Link to="/">
              <img id="arrowImg" src={backArrow} alt="back"></img>
            </Link>
          ) : (
            <Link to="/">
              <img id="feelLogoImg" src={logo} alt="logo"></img>
            </Link>
          )}
        </div>
        <div className="search">
          <div className="searchIntDiv">
            <input
              className={location.loaded === true ? 'inputSearch' : 'disabled'}
              name="categoria"
              type="text"
              placeholder={
                location.loaded === true
                  ? filtrarTraduccion(
                      traduccionesBD,
                      'searchPlaceholder',
                      lenguage
                    )
                  : 'Buscando...'
              }
              value={text}
              onChange={handleText}
              onKeyPress={handleEnter}
            ></input>
            <span>
              <img
                className="searchlogo"
                alt="searchlogImg"
                src={searchlogo}
                onClick={handleSearch}
              ></img>
            </span>
          </div>
        </div>
        <div className="menuLogo">
          <div
            className="userLogo__lenguage ocultaLenguage"
            onClick={handleLenguage}
          >
            <img
              src={filtrarTraduccion(traduccionesBD, 'flag', lenguage)}
              alt="img"
            />
          </div>

          <>
            <FontAwesomeIcon
              icon={faBars}
              className="userLogo__faBars"
              onClick={() => setUserBar(!userBar)}
            />
          </>
        </div>
      </div>
      <div className="divMsgWelcome">
        <span className="msgWelcome">
          {filtrarTraduccion(traduccionesBD, 'wellcomeMessage', lenguage)}{' '}
          {getUser()?.name
            ? getUser()?.name
            : filtrarTraduccion(
                traduccionesBD,
                'wellcomeMessageUser',
                lenguage
              )}
        </span>
      </div>
    </div>
  );
};

export default Nav;