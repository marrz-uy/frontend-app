import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
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
  const [userGoogle, setUserGoogle] = useState('');

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
        navigate('/');
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

  const handleProviderLogin = (provider) => {
    //  e.preventDefault();
    // const cookies = '';
    // const headers = {
    //   accept:
    //     'application/json, text/javascript, image/avif,image/webp, */*; q=0.01',
    //   'accept-language': 'en-US,en;q=0.9,es;q=0.8',
    //   'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //   'User-Agent':
    //     'Mozilla/5.0 (X11; Linux x86_64; rv:105.0) Gecko/20100101 Firefox/105.0',
    //   // 'Accept-Encoding': 'gzip, deflate, br',
    //   'Cache-Control': 'no-cache',
    //   // Connection: 'keep-alive',
    //   // Host: 'localhost:8000',
    //   Pragma: 'no-cache',
    //   // 'sec-fetch-dest': 'image',
    //   // 'sec-fetch-mode': 'no-cors',
    //   // 'sec-fetch-site': 'same-origin',
    //   'x-requested-with': 'XMLHttpRequest',
    //   // cookie: cookies,
    //   // Referer:
    //   //   'http://localhost:8000/api/login/google/callback?code=4%2F0ARtbsJoADTfhBEqG6ylHIeA2e9sGuEXHNRT8dBMqbF_cLd8qT4DoEObyjt0wuQNgzy-sdQ&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=0&prompt=consent',
    //   'Referrer-Policy': 'strict-origin-when-cross-origin',
    // };
    // axios
    //   .get(`/login/${provider}`, { headers })
    //   .then((response) => {
    //     const dataProvider = response.data;
    //     // setUserGoogle(dataProvider);
    //     console.log('Provider: ', provider);
    //     console.log('dataProvider: ', dataProvider);
    //   })
    //   .catch((error) => console.error(`Error en catch: ${error}`));
    navigate('');
  };

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
              placeholder={filtrarTraduccion(
                traduccionesBD,
                'emailPlaceholder',
                lenguage
              )}
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              type="password"
              id="password"
              name="password"
              placeholder={filtrarTraduccion(
                traduccionesBD,
                'passwordPlaceholder',
                lenguage
              )}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="submit"
              value={filtrarTraduccion(traduccionesBD, 'loginLabel', lenguage)}
              className="btn-login"
            />
          </div>
          <div className="linkAregistro">
            <Link to="/register">
              {filtrarTraduccion(traduccionesBD, 'needAnAccountText', lenguage)}
            </Link>
          </div>
          <span> o </span>
          <div className="auth__social-networks">
            <p>Login with social networks</p>
                <a href="https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=714352746420-h2p28su155a6u5vmgide4nhe8728kvvo.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fapi%2Flogin%2Fgoogle%2Fcallback&scope=openid%20profile%20email&response_type=code&flowName=GeneralOAuthFlow" target="_blank" rel="noopener noreferrer" alt='link'>
            <div
              className="google-btn"
              onClick={() => handleProviderLogin('google')}
            >
              <div className="google-icon-wrapper">
                <img
                  className="google-icon"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="google button"
                />
              </div>
              <p className="btn-text">
                <b>Sign in with google</b>
              </p>
            </div>
          
          </a>
          </div>
          <div className="salir">
            <Link to="/">
              <button className="btn-cerrar">
                {filtrarTraduccion(
                  traduccionesBD,
                  'closeButtonValue',
                  lenguage
                )}
              </button>
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
