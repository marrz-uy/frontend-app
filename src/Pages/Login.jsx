import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthUser from '../Components/AuthUser';
import LenguageContext from '../Context/LenguageContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import { Layout } from '../Layout';
import UserBar from './UserBar';
import { handleUserBar } from '../Helpers/HandUserBarClick';
import {
  UNAUTHORIZED,
  UNPROCESABLE,
  SERVIDOR_APAGADO,
} from '../Data/HTTPResponseStatusCodes';
import '../Css/Login.css';
import '../Css/userBarClick.css';

const Login = ({ setIsLoggedIn, setPage, isLoggedIn, userBar, setUserBar }) => {
  sessionStorage.setItem('isLoggedIn', 'false');
  useEffect(() => {
    setPage('login');
  }, [setPage]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const { traduccionesBD, lenguage } = useContext(LenguageContext);

  const { http, setToken } = AuthUser();
  const navigate = useNavigate();

  const submitLogin = (e) => {
    e.preventDefault();
    http
      .post('/login', { email, password })
      .then((res) => {
        console.log('%cLOGIN RESPONSE:', 'color: green;', res.data);
        setToken(res.data.user, res.data.access_token, res.data.userProfile);
        sessionStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn('true');
        navigate('/user');
      })
      .catch(function (error) {
        console.log('%cRESP:', 'color: red;', error.response.data);
        if (error.response.status === SERVIDOR_APAGADO) {
          setLoginErrorMessage('Servidor apagado');
        } else if (!email && !password) {
          setLoginErrorMessage('Todos los campos son obligatorios');
        } else if (!email) {
          setLoginErrorMessage(error.response.data.email);
        } else if (!password) {
          setLoginErrorMessage(error.response.data.password);
        } else {
          if (error.response.status === UNAUTHORIZED) {
            setLoginErrorMessage(
              'Error en suario y/o contraseña. Revise los datos ingresados'
            );
          } else if (
            error.response.status === UNPROCESABLE &&
            error.response.data.email !== undefined
          ) {
            setLoginErrorMessage(error.response.data.email);
          } else {
            setLoginErrorMessage(error.response.data.password);
          }
        }
        return loginErrorMessage;
      });
  };

  handleUserBar(userBar);

  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>
      <div className="login">
        <form onSubmit={submitLogin}>
          <div>
            <h2 className="title">
              {filtrarTraduccion(traduccionesBD, 'loginTitle', lenguage)}
            </h2>
          </div>
          <div className="message">{`${loginErrorMessage}`}</div>
          <div className="inputGroup">
            <input
              className="input"
              type="text"
              id="email"
              name="email"
              placeholder={filtrarTraduccion(traduccionesBD, 'emailPlaceholder', lenguage)}
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              type="password"
              id="password"
              name="password"
              placeholder={filtrarTraduccion(traduccionesBD, 'passwordPlaceholder', lenguage)}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" value={filtrarTraduccion(traduccionesBD, 'loginLabel', lenguage)} className="btn-login" />
          </div>
          <div className="linkAregistro">
            <Link to="/register">{filtrarTraduccion(traduccionesBD, 'needAnAccountText', lenguage)}</Link>
          </div>
          <div className="salir">
            <Link to="/">
              <button className="btn-cerrar">{filtrarTraduccion(traduccionesBD, 'closeButtonValue', lenguage)}</button>
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

export default Login;
