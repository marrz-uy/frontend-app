import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/Nav.css';
import logo from '../Assets/logoFeelFuenteBlanca.svg';
import userLogo from '../Assets/user.svg';
import searchlogo from '../Assets/searchLogo.png';

const Nav = ({ text, setText }) => {
  return (
    <div className="navbar">
      <div className="contentNavbar">
        <div className="logoFellUy">
          <Link to="/">
            <img id="feelLogoImg" src={logo} alt="logo"></img>
          </Link>
        </div>
        <div className="search">
          <div className="searchIntDiv">
            <input
              className="inputSearch"
              name="categoria"
              type="text"
              placeholder="Busca tu proximo destino"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></input>
            <span>
              <Link to="/results">
                <img
                  className="searchlogo"
                  alt="searchlogImg"
                  src={searchlogo}
                ></img>
              </Link>
            </span>
          </div>
        </div>
        <div className="userLogo">
          <Link to="/login">
            <img id="userlogoImg" src={userLogo} alt="logo"></img>
          </Link>
        </div>
      </div>
    </div>
  );
};
// export { termino };
export default Nav;
