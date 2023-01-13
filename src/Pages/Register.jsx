import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layout } from '../Layout';
import AuthUser from '../Components/AuthUser';
import LenguageContext from '../Context/LenguageContext';
import PageContext from '../Context/PageContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import { BAD_REQUEST, SERVIDOR_APAGADO } from '../Data/HTTPResponseStatusCodes';
import UserBar from './UserBar';
import { handleUserBar } from '../Helpers/HandUserBarClick';
import '../Css/Register.css';
import '../Css/userBarClick.css';

const Register = ({
  setPage,
  userBar,
  setIsLoggedIn,
  isLoggedIn,
  setUserBar,
}) => {
  const { setActivePage } = useContext(PageContext);
  useEffect(() => {
    setPage('register');
    setActivePage('register');
  }, [setPage, setActivePage]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [name, setName] = useState('');
  const [registerErrorMessage, setRegisterErrorMessage] = useState('');
  const navigate = useNavigate();
  const { http } = AuthUser();
  const { traduccionesBD, lenguage } = useContext(LenguageContext);

  const submitRegister = (e) => {
    e.preventDefault();
    http
      .post('/register', { email, password, passwordConfirmation, name })
      .then((res) => {
        console.log('RESPUESTA:', res.data);
        setRegisterErrorMessage('El Usuario se registro correctamente');
        setTimeout(() => {}, 3000);
        navigate('/login');
      })
      .catch(function (error) {
        if (error.response.status === SERVIDOR_APAGADO) {
          setRegisterErrorMessage('Servidor apagado');
        }
        if (
          email === '' &&
          password === '' &&
          passwordConfirmation === '' &&
          name === ''
        ) {
          setRegisterErrorMessage('Todos los campos son obligatorios');
        } else if (email === '') {
          setRegisterErrorMessage(error.response.data.email);
        } else if (password === '') {
          setRegisterErrorMessage(error.response.data.password);
        } else if (passwordConfirmation === '') {
          setRegisterErrorMessage(error.response.data.passwordConfirmation);
        } else if (name === '') {
          setRegisterErrorMessage(error.response.data.name);
        } else {
          if (password.length < 8) {
            setRegisterErrorMessage(error.response.data.password);
          } else if (passwordConfirmation !== password) {
            setRegisterErrorMessage(error.response.data.passwordConfirmation);
          } else if (name.length < 2) {
            setRegisterErrorMessage(error.response.data.name);
          } else if (error.response.status === BAD_REQUEST) {
            setRegisterErrorMessage(error.response.data.email);
          }
        }
        return registerErrorMessage;
      });
  };

  handleUserBar(userBar);

  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>
      <div className="register">
        <form onSubmit={submitRegister}>
          <div>
            <h2 className="title">
              {filtrarTraduccion(traduccionesBD, 'registerTitle', lenguage)}
            </h2>
          </div>
          <div className="message">{`${registerErrorMessage}`}</div>
          <div className="inputGroup">
            <input
              className="input"
              type="text"
              name="email"
              placeholder={filtrarTraduccion(
                traduccionesBD,
                'registerEmailPlaceholder',
                lenguage
              )}
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              type="password"
              name="password"
              placeholder={filtrarTraduccion(
                traduccionesBD,
                'registerPasswordPlaceholder',
                lenguage
              )}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="input"
              type="password"
              name="passwordConfirm"
              placeholder={filtrarTraduccion(
                traduccionesBD,
                'registerPasswordConfirmationPlaceholder',
                lenguage
              )}
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <input
              className="input"
              type="text"
              name="name"
              placeholder={filtrarTraduccion(
                traduccionesBD,
                'registerNamePlaceholder',
                lenguage
              )}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="submit"
              value={filtrarTraduccion(
                traduccionesBD,
                'registerButtonValue',
                lenguage
              )}
              className="btn-register"
            />
          </div>
          <div className="linkALogin">
            <Link to="/login">
              {filtrarTraduccion(traduccionesBD, 'backTologinText', lenguage)}
            </Link>
          </div>
        </form>
      </div>
      {userBar && (
        <UserBar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setUserBar={setUserBar}
        />
      )}
    </Layout>
  );
};

export default Register;
