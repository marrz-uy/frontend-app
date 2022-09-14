// HECHO
import React, { useEffect, useContext } from 'react';
import axios from 'axios';
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
  const { getUser, getLoggedIn } = AuthUser();

  const { handleLenguage, traduccionesBD, lenguage } =
    useContext(LenguageContext);

  useEffect(() => {
    setIsLoggedIn(getLoggedIn());
  }, [setIsLoggedIn, getLoggedIn, isLoggedIn]);

  const navigate = useNavigate();

  const getData = (nombre) => {
    axios
      .get(`http://localhost:8000/api/PuntosInteres/nombre/${nombre}`)
      .then((response) => {
        const allDdata = response.data;
        setItems(allDdata);
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
  };

  const handleText = (e) => {
    e.preventDefault();
    let t = e.target.value;
    setText(t);
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
              className="inputSearch"
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
            <img src={filtrarTraduccion(
                traduccionesBD,
                'flag',
                lenguage
              )} alt="img" />
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
          {filtrarTraduccion(
                traduccionesBD,
                'wellcomeMessage',
                lenguage
              )}{' '}
          {getUser()?.name ? getUser()?.name : filtrarTraduccion(
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
