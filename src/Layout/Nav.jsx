import React, { useEffect, useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../Components/notificationsDB.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import AuthUser from '../Components/AuthUser';
import LenguageContext from '../Context/LenguageContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import useScreenSize from '../Helpers/ScreenSize.jsx';
import logo from '../Assets/logoFeelFuenteBlanca.svg';
import backArrow from '../Assets/back.svg';
import searchlogo from '../Assets/searchLogo.png';
import locationOn from '../Assets/locationOn.png';
import locationOff from '../Assets/locationOff.png';
import '../Css/Nav.css';

const Nav = ({
  text,
  setText,
  setItems,
  isLoggedIn,
  setIsLoggedIn,
  page,
  userBar,
  setUserBar,
  setSearchType,
  loaded,
  latitud,
  longitud,
}) => {
  const unreadsNotifications = useLiveQuery(async () => {
    return await db.myNotifications.where('read').equals('false').count();
  });

  const { http, getUser, getLoggedIn } = AuthUser();
  const { handleLenguage, traduccionesBD, lenguage } =
    useContext(LenguageContext);

  const [latitudAEnviar, setLatitudAEnviar] = useState();
  const [longitudAEnviar, setLongitudAEnviar] = useState();
  const [distanciaAEnviar, setDistanciaAEnviar] = useState('');
  const [firefox, setFirefox] = useState(false);
  const { width } = useScreenSize();

  useEffect(() => {
    var sUsrAg = navigator.userAgent;
    if (sUsrAg.indexOf('Firefox') > -1) {
      setFirefox(true);
    }

    setIsLoggedIn(getLoggedIn());
    if (latitud !== null || longitud !== null) {
      setLatitudAEnviar(+latitud);
      setLongitudAEnviar(+longitud);
      setDistanciaAEnviar(50000);
    }
  }, [setIsLoggedIn, getLoggedIn, isLoggedIn, loaded, latitud, longitud]);

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
    setText(e.target.value);
  };

  const handleSearch = () => {
    setItems([]);
    if (text.length >= 3) {
      setSearchType('nombre');
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
        setSearchType('nombre');
        getData(text);
        navigate('/results');
        return;
      }
      alert('Ingrese un texto mayor a 2 caracteres');
    }
  };

  return (
    <div className="navbar">
      <div
        className={
          firefox && width > 1800 ? 'locationIconFfox' : 'locationIcon'
        }
      >
        {latitud && longitud ? (
          <>
            <div className="hideActive">
              <p>Geolocalizacion activa</p>{' '}
            </div>
            <img src={locationOn} alt="sds" id="locOn"></img>
          </>
        ) : (
          <>
            <div className="hideInactive">Geolocalizacion inactiva</div>
            <img src={locationOff} alt="sds"></img>
          </>
        )}
      </div>
      <div className="contentNavbar">
        <div className="logoFellUy">
          {page !== 'principal' ? (
            page === 'infoResults' ? (
              <Link to="/results">
                <img id="arrowImg" src={backArrow} alt="back"></img>
              </Link>
            ) : (
              <Link to="/">
                <img id="arrowImg" src={backArrow} alt="back"></img>{' '}
              </Link>
            )
          ) : (
            <Link to="/">
              <img id="feelLogoImg" src={logo} alt="logo"></img>
            </Link>
          )}
        </div>
        <div className="search">
          <div className="searchIntDiv">
            <input
              className={loaded === true ? 'inputSearch' : 'disabled'}
              name="categoria"
              type="text"
              placeholder={filtrarTraduccion(
                traduccionesBD,
                'searchPlaceholder',
                lenguage
              )}
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
            <div className="divLightNotifications">
              <div
                className={
                  unreadsNotifications > 0 ? 'light' : 'light lightOff'
                }
              ></div>
            </div>
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
          {getUser()
            ? getUser()
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
