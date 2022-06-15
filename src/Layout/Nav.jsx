import React from 'react'
import { Link } from "react-router-dom";
import '../Css/Nav.css'
import logo from '../Assets/logoFeelFuenteBlanca.svg';
import userLogo from '../Assets/user.svg';

const Nav = () => (
  <div className="navbar">
    <div className="contentNavbar">
      <div className="logoFellUy">
      <Link to="/"><img id='feelLogoImg' src={logo} alt="logo"></img></Link>
      </div>
      <div className="search">
        <div className="searchIntDiv">
          <input
            className="inputSearch"
            type="text"
            placeholder="Busca tu proximo destino"
          ></input>
        </div>
      </div>
      <div className="userLogo">
      <Link to="/login"><img id='userlogoImg' src={userLogo} alt="logo"></img></Link>
      </div>
    </div>
  </div>
);

export default Nav;
