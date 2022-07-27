import React, { useState, useEffect } from 'react';
import AuthUser from '../Components/AuthUser';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import logo from '../Assets/logoFeelFuenteBlanca.svg';
import backArrow from '../Assets/back.svg';
import searchlogo from '../Assets/searchLogo.png';
import LoginRoute from '../Components/LoginRoute';
import logoutIcon from '../Assets/logout.svg';
import '../Css/Nav.css';
import UserProfile from '../Pages/UserProfile';
import UserRoute from '../Components/UserRoute';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Nav = ({
  text,
  setText,
  setItems,
  isLoggedIn,
  setIsLoggedIn,
  page,
  bars,
  handleClickBars,
}) => {
  const { token, getUser } = AuthUser();
  const [userSession, setUserSession] = useState('');
  const [lenguage, setLenguage] = useState('Spanish');

  /*   useEffect(() => {
    if (isLoggedIn === 'false') {
      setUserSession('Invitado');
    } else {
      var session = sessionStorage.getItem('user');
      const user = JSON.parse(session);
      setUserSession(user.name);
    }
  }, [isLoggedIn]); */

  const navigate = useNavigate();

  const handleText = (e) => {
    e.preventDefault();
    setText(e.target.value.toLowerCase());
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setItems(text);
    navigate('/results');
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      setItems(text);
      navigate('/results');
    }
  };

  /*   const logoutUser = () => {
    if (token !== undefined) {
      logout();
      setIsLoggedIn('false');
      setUserSession('Invitado');
      console.log('Cerrando sesion');
      navigate('/');
    }
  }; */

  const handleLenguage = () => {
    if (lenguage === 'Spanish') {
      localStorage.setItem('lenguage', 'English');
    } else {
      localStorage.setItem('lenguage', 'Spanish');
    }
    setLenguage(localStorage.getItem('lenguage'));
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
              placeholder="Buscá tu proximo destino"
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
        <div className="userLogo">
          {isLoggedIn === 'false' ? (
            <>
              <Link to="/userbar">
                <FontAwesomeIcon icon={faBars} className="userLogo__faBars" />
              </Link>
              <div className="userLogo__contain">
                <div className="userLogo__lenguage" onClick={handleLenguage}>
                  {lenguage === 'Spanish' ? (
                    <img
                      src="https://img.icons8.com/officel/80/000000/uruguay.png"
                      alt="img"
                    />
                  ) : (
                    <img
                      src="https://img.icons8.com/office/80/000000/great-britain.png"
                      alt="img"
                    />
                  )}
                  <p>Idioma</p>
                </div>
                <LoginRoute />
              </div>
            </>
          ) : (
            <UserRoute />
          )}
        </div>
      </div>
      <div className="msgWelcome">Bienvenido a FeelUy {getUser()?.name || 'Invitado'}</div>
    </div>
  );
};

export default Nav;
