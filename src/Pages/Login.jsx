import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import AuthUser from '../Components/AuthUser';
import LenguageContext from '../Context/LenguageContext';
import PageContext from '../Context/PageContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import { Layout } from '../Layout';
import UserBar from './UserBar';
import { handleUserBar } from '../Helpers/HandUserBarClick';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import {
  UNAUTHORIZED,
  UNPROCESABLE,
  SERVIDOR_APAGADO,
} from '../Data/HTTPResponseStatusCodes';
import Separador from '../Components/Separador';
import '../Css/Login.css';
import '../Css/userBarClick.css';

/*#  VARIABLE DE ENTORNO ruta src/Config/config.js */
import { CLIENT_SECRET } from '../Config/config.js';

const Login = ({ setIsLoggedIn, setPage, isLoggedIn, userBar, setUserBar }) => {
  const { http, setToken } = AuthUser();
  const { setActivePage } = useContext(PageContext);
  useEffect(() => {
    setPage('login');
    setActivePage('login');
  }, [setPage, setActivePage, http]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [loader, setLoader] = useState(false);
  const { traduccionesBD, lenguage } = useContext(LenguageContext);
  const navigate = useNavigate();

  const submitLogin = (e) => {
    e.preventDefault();
    setLoader(true);
    sessionStorage.setItem('userType', 'feel');
    http
      .post('/login', { email, password })
      .then((res) => {
        // console.log('%cLOGIN RESPONSE:', 'color: green;', res);
        if (res.data) {
          setLoader(false);
        }
        setToken(
          res.data.user,
          res.data.access_token,
          res.data.email,
          res.data.userProfile
        );
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('id', res?.data.id);
        sessionStorage.setItem(
          'userProfile',
          JSON.stringify(res?.data.userProfile)
        );
        setIsLoggedIn(true);
        navigate('/');
      })
      .catch(function (error) {
        setLoader(false);
        console.log('%cRESP:', 'color: yellow;', error.response.data);
        if (!email || !password) {
          setLoginErrorMessage('Todos los campos son obligatorios');
        } else if (error.response.data.status === 401) {
          setLoginErrorMessage(
            'Error en los datos ingresados o usuario sin registrarse'
          );
        } else if (error.response.data.code === 256) {
          setLoginErrorMessage(
            'Debe verificar su cuenta en su correo electronico'
          );
        }

        return loginErrorMessage;
      });
  };

  handleUserBar(userBar);

  const clientId =
    '714352746420-h2p28su155a6u5vmgide4nhe8728kvvo.apps.googleusercontent.com';
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      });
    };
    gapi.load('client:auth2', initClient);
  });

  const handleFailure = (result) => {
    console.log('Error o cambio de cuenta cancelado:', result);
  };

  const traerIduserGoogle = () => {
    let emailGoogleUser = sessionStorage?.getItem('email');
    // let token = sessionStorage?.getItem('token');
    //
    axios
      .post('http://localhost:8000/api/userGoogleData', {
        email: emailGoogleUser,
      })
      .then((response) => {
        sessionStorage.setItem('id', response?.data.userGoogleId);
        sessionStorage.setItem(
          'userProfile',
          JSON.stringify(response?.data.userProfile)
        );
        sessionStorage.setItem(
          'favourites',
          JSON.stringify(response?.data.favoritos)
        );
      })
      .catch(function (error) {
        setLoader(false);
        console.log('traerIduserGoogle error: ', error);
        setLoginErrorMessage(error);
        return loginErrorMessage;
      });
  };

  const handleOAuth = (googleUser) => {
    setLoader(true);
    sessionStorage.setItem('email', googleUser.profileObj.email);
    sessionStorage.setItem('userType', 'google');
    sessionStorage.setItem('user', googleUser.profileObj.name);
    http
      .post('http://localhost:8000/oauth/token', {
        grant_type: 'social',
        client_id: '2',

        client_secret: CLIENT_SECRET,
        provider: 'google',
        access_token: googleUser.tokenObj.access_token,
      })
      .then((response) => {
        if (response.data) {
          setLoader(false);
        }
        sessionStorage.setItem('token', response?.data.access_token);
        sessionStorage.setItem('refresh_token', response?.data.refresh_token);
        sessionStorage.setItem('isLoggedIn', true);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        setLoader(false);
        console.error(`Error en catch: ${error}`);
      });
    setTimeout(() => {
      traerIduserGoogle();
    }, 500);
    navigate('/');
  };

  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>
      <div className="login">
        <form onSubmit={submitLogin}>
          <div className="titulo">
            <h2 className="title">
              🔑 {filtrarTraduccion(traduccionesBD, 'loginTitle', lenguage)}
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
            <Link to="/forget">
              <span className="forget">Olvidé mi contraseña</span>
            </Link>
            {loader ? (
              <div className="divLoader">
                <span className="loader"></span>
              </div>
            ) : (
              <input
                type="submit"
                value={filtrarTraduccion(
                  traduccionesBD,
                  'loginLabel',
                  lenguage
                )}
                className="btn-login"
              />
            )}
          </div>
          <Separador />
          {loader ? (
            <div className="divLoader">
              <span className="loader"></span>
            </div>
          ) : (
            <GoogleLogin
              clientId={clientId}
              buttonText={filtrarTraduccion(
                traduccionesBD,
                'loginWhithGoole',
                lenguage
              )}
              onSuccess={handleOAuth}
              onFailure={handleFailure}
              cookiePolicy={'single_host_origin'}
              // isSignedIn={true}
            ></GoogleLogin>
          )}
          <div className="linkAregistro">
            <Link to="/register">
              {filtrarTraduccion(traduccionesBD, 'needAnAccountText', lenguage)}
            </Link>
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
