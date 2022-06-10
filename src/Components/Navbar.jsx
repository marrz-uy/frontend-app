import React from 'react';
import '../css/Navbar.css';
import logo from '../Assets/logoFeelFuenteBlanca.svg';
import userLogo from '../Assets/user.svg';
import { useModal } from './customHooks/useModal';
import { ModalLogin } from './ModalLogin';

export const Navbar = () => {
  const [isOpenModal, openModal, closeModal] = useModal(false);

  return (
    <>
      <ModalLogin isOpen={isOpenModal} closeModal={closeModal} />
      <div className="navbar">
        <div className="contentNavbar">
          <div className="logoFellUy">
            <img id='feelLogoImg' src={logo} alt="logo"></img>
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
            <img id='userlogoImg' src={userLogo} alt="logo" onClick={openModal}></img>
          </div>
        </div>
      </div>
    </>
  );
};
