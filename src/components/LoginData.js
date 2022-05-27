import React from 'react';
import imageFeel from '../assets/feelUy-logo-letras.svg';
import Form from './Form';
import '../App.css';

const LoginData = ({ app }) => {
  return (
    <div className="login-data">
      <img src={imageFeel} alt="Feeluy" className="feeluy" />
      <h1>{app === 'login' ? 'Iniciar sesion' : 'Registrese'}</h1>
      <Form app={app} />
    </div>
  );
};

export default LoginData;
