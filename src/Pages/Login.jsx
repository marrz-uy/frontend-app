import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthUser from '../Components/AuthUser';
import { Layout } from '../Layout';
import '../Css/Login.css';
import {
  UNAUTHORIZED,
  UNPROCESABLE,
  SERVIDOR_APAGADO,
} from '../Data/HTTPResponseStatusCodes';

const Login = ({ setIsLoggedIn, setPage, pefilRecuperado, setPefilRecuperado }) => {
  
  useEffect(() => {
    setPage('login');
  }, [setPage]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const { http, setToken } = AuthUser();
  const navigate = useNavigate();

  const submitLogin = (e) => {
    e.preventDefault();
    http
      .post('/login', { email, password })
      .then((res) => {
        console.log('%cLOGIN RESPONSE:', 'color: green;', res.data);
        setToken(res.data.user, res.data.access_token, res.data.userProfile);
        setIsLoggedIn('true');
        navigate('/setprofile');
      })
      .catch(function (error) {
        console.log('%cRESP:', 'color: red;', error.response.data);
        if (error.response.status === SERVIDOR_APAGADO) {
          setLoginErrorMessage('Servidor apagado');
        } else if (email === '' && password === '') {
          setLoginErrorMessage('Todos los campos son obligatorios');
        } else if (email === '') {
          setLoginErrorMessage(error.response.data.email);
        } else if (password === '') {
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

  return (
    <Layout>
      <div className="login">
        <form onSubmit={submitLogin}>
          <div>
            <h2 className="title">Login</h2>
          </div>
          <div className="message">{`${loginErrorMessage}`}</div>
          <div className="inputGroup">
            <input
              className="input"
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" value="Login" className="btn-login" />
          </div>
          <div className="linkAregistro">
            <Link to="/register">Necesitás una cuenta?</Link>
          </div>
          <div className="salir">
            <Link to="/">
              <button className="btn-cerrar">Cerrar</button>
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
