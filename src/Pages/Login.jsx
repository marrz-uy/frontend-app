import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useNavigate, Link } from 'react-router-dom';
import AuthUser from '../Components/AuthUser';
import LenguageContext from '../Context/LenguageContext';
import PageContext from '../Context/PageContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import { Layout } from '../Layout';
import UserBar from './UserBar';
import { handleUserBar } from '../Helpers/HandUserBarClick';
import Separador from '../Components/Separador';
import '../Css/Login.css';
import '../Css/userBarClick.css';

/*# CLIENT_SECRE DE PASSPORT ruta src/Config/config.js */
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
        if (error) {
          setLoader(false);
        }
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

  // const handleFailure = (result) => {
  //   console.log('Error o cambio de cuenta cancelado:', result);
  // };

  const traerIduserGoogle = () => {
    let emailGoogleUser = sessionStorage?.getItem('email');
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

  const handleOAuth = (credentialResponse) => {
    setLoader(true);
    onSuccess: (credentialResponse) => console.log(credentialResponse);
    const details = jwt_decode(credentialResponse.credential);
    console.log('DETAILS', details);
    sessionStorage.setItem('picture', details.picture);
    http
      .post('http://localhost:8000/api/userGoogle', {
        email: details.email,
        name: details.name,
      })
      .then((response) => {
        console.log(
          '%cRESPUESTA BACK LOGIN GOOGLE: ',
          'color:blue;',
          response.data
        );
        if (response?.data) {
          setLoader(false);
        }
        sessionStorage.setItem('id', response?.data.id);
        sessionStorage.setItem('user', response?.data.user);
        sessionStorage.setItem('email', response?.data.email);
        sessionStorage.setItem('userType', 'google');
        sessionStorage.setItem('access_token', response?.data.access_token);
        sessionStorage.setItem('isLoggedIn', true);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        if (error) {
          setLoader(false);
        }
        console.error(`Error en catch LOGIN GOOGLE: ${error}`);
      });

    navigate('/');
  };

  const handleFailure = () => {
    // alert(result);
    onError = () => {
      console.log('Login Failed');
    };
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
            <GoogleLogin onSuccess={handleOAuth} onError={handleFailure} />
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
