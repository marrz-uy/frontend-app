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
import locationOn from '../Assets/locationOn.png';
import locationOff from '../Assets/locationOff.png';

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
  const { http, getUser, getLoggedIn } = AuthUser();
  const { handleLenguage, traduccionesBD, lenguage } =
    useContext(LenguageContext);

  // const { loaded, latitud, longitud } = useGeoLocation();

  const [latitudAEnviar, setLatitudAEnviar] = useState();
  const [longitudAEnviar, setLongitudAEnviar] = useState();
  const [distanciaAEnviar, setDistanciaAEnviar] = useState('');

  useEffect(() => {
    setIsLoggedIn(getLoggedIn());
    if (latitud !== null || longitud !== null) {
      setLatitudAEnviar(+latitud);
      setLongitudAEnviar(+longitud);
      setDistanciaAEnviar(50000);
      // console.log('A ENVIAR: ', loaded, latitud, longitud);
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

    // let t = e.target.value;
    setText(e.target.value);
  };

  const handleSearch = () => {
    setItems([]);
    if (text.length > 2) {
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
      <div className="locationIcon">
        {latitud && longitud ? (<>
          <div className="hideActive"><p>Geolocalizacion activa</p> </div>
          <img src={ locationOn } alt="sds" id='locOn'></img>
          </>
        ) : (<>
          <div className="hideInactive">Geolocalizacion inactiva</div>
          <img src={ locationOff } alt="sds"></img>

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
                <img id="arrowImg" src={backArrow} alt="back"></img>
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