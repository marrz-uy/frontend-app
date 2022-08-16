import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import LenguageContext from '../Context/LenguageContext';
import AuthUser from '../Components/AuthUser';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../Assets/logoFeelFuenteBlanca.svg';
import backArrow from '../Assets/back.svg';
import searchlogo from '../Assets/searchLogo.png';
import '../Css/Nav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Nav = ({ text, setText, setItems, isLoggedIn, setIsLoggedIn, page }) => {
  const { getUser, getLoggedIn } = AuthUser();

  const { textos, handleLenguage } = useContext(LenguageContext);

  useEffect(() => {
    setIsLoggedIn(getLoggedIn());
  }, [setIsLoggedIn, getLoggedIn, isLoggedIn]);

  const navigate = useNavigate();
  const url = 'http://localhost:8001/api/PuntosInteres/';

  const getData = (Tipo) => {
    axios
      .get(`${url}${Tipo}`)
      .then((response) => {
        const allDdata = response.data;
        console.log('ALLDATA: ', allDdata);
        setItems(allDdata.data);
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
  };

  const handleText = (e) => {
    // e.preventDefault();
    setText(e.target.value);
  };

  const handleSearch = () => {
    // e.preventDefault();
    setItems([]);
    getData(text);
    navigate('/results');
  };

  const handleEnter = (e) => {
    setItems([]);
    if (e.key === 'Enter') {
      getData(text);
      navigate('/results');
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
              placeholder={textos.searchPlaceholder}
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
            <img src={textos.flag} alt="img" />
          </div>
          <>
            <Link to="/userbar">
              <FontAwesomeIcon icon={faBars} className="userLogo__faBars" />
            </Link>
          </>
        </div>
      </div>
      <div className="divMsgWelcome">
        <span className="msgWelcome">
          {textos.wellcomeMessage}{' '}
          {getUser()?.name ? getUser()?.name : textos.wellcomeMessageUser}
        </span>
      </div>
    </div>
  );
};

export default Nav;
