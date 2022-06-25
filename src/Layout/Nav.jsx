import React, { useState, useEffect } from 'react';
import AuthUser from '../Components/AuthUser';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../Assets/logoFeelFuenteBlanca.svg';
import backArrow from '../Assets/back.svg'
import searchlogo from '../Assets/searchLogo.png';
import LoginRoute from '../Components/LoginRoute';
import logoutIcon from '../Assets/logout.svg';
import '../Css/Nav.css';

const Nav = ({ text, setText, setItems, isLoggedIn, setIsLoggedIn }) => {
 
 const principalRoute = 'http://localhost:3000/'
 const activeRoute = window.location.href

 console.log(principalRoute)
 
  const { token, logout } = AuthUser();

  const [userSession, setUserSession] = useState('');

  useEffect(() => {
    if (isLoggedIn === 'false') {
      setUserSession('Invitado');
    } else {
      var session = sessionStorage.getItem('user');
      const user = JSON.parse(session);

      setUserSession(user.name);
    }
  }, [isLoggedIn]);

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

  const logoutUser = () => {
    if (token !== undefined) {
      logout();
      setIsLoggedIn('false');
      setUserSession('Invitado');
      console.log('Cerrando sesion');
      navigate('/');
    }
  };

  return (
    <div className="navbar">
      <div className="contentNavbar">
        <div className="logoFellUy">
        {  activeRoute !== principalRoute
            ?
            (<Link to="/">
            <img id="arrowImg" src={backArrow} alt="back"></img>
          </Link>)
          : 
          ( <Link to="/">
            <img id="feelLogoImg" src={logo} alt="logo"></img>
          </Link>)
        }
         
        </div>
        <div className="search">
          <div className="searchIntDiv">
            <input
              className="inputSearch"
              name="categoria"
              type="text"
              placeholder="Busca tu proximo destino"
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
            <LoginRoute />
          ) : (
            <span className="logout" role="button" onClick={logoutUser}>
            <img id='logoutImg' src={logoutIcon} alt="logo"></img>
            </span>
          )}
        </div>
      </div>
      <div className="msgWelcome">Bienvenido a FeelUy {userSession}</div>
    </div>
  );
};

export default Nav;
