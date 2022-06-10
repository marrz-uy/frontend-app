import React from 'react';
import '../css/ModalLogin.css';
// import Login from './Login';

export const ModalLogin = ({ isOpen, closeModal }) => {
  const handleClickClose = (e) => e.stopPropagation();
  return (
    <div
      className={`modal ${
        isOpen && 'is-open'
      }  animate__animated animate__fadeInRight animate__faster`}
      onClick={closeModal}
    >
      <div
        onClick={handleClickClose}
        className="modal-cuerpo"
      >
    





        <button onClick={closeModal} className="btn-modal-cerrar ">
          Cerrar
        </button>
      </div>
    </div>
  );
};
