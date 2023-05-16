import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { Layout } from '../Layout';
import AuthUser from '../Components/AuthUser';
import LenguageContext from '../Context/LenguageContext';
import PageContext from '../Context/PageContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import UserBar from './UserBar';
import { handleUserBar } from '../Helpers/HandUserBarClick';
import Separador from '../Components/Separador';
import '../Css/Login.css';
import '../Css/userBarClick.css';

function useWidthElement() {
  const [width, setWidth] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const refElement = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    function actualizarAncho() {
      if (isMounted) {
        const widthBtn = refElement.current.offsetWidth;
        setWidth(widthBtn);
      }
    }
    actualizarAncho();
    window.addEventListener('resize', actualizarAncho);
    return () => {
      window.removeEventListener('resize', actualizarAncho);
    };
  }, [isMounted]);

  return [refElement, width?.toString()];
}

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

  const [refMyElement, widhtMyElemnt] = useWidthElement();
  // console.log('anchoMiElemento:', widhtMyElemnt);

  const submitLogin = (e) => {
    e.preventDefault();
    setLoader(true);
    sessionStorage.setItem('userType', 'feel');
    http
      .post('/login', { email, password })
      .then((res) => {
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
        console.log('%cRESPUESTA BACK LOGIN feel: ', 'color:blue;', res.data);
        setIsLoggedIn(true);
        navigate('/');
      })
      .catch(function (error) {
        if (error) {
          setLoader(false);
        }
        console.log('%cRESP:', 'color: yellow;', error.response.data);
        if (!email || !password) {
          setLoginErrorMessage(
            filtrarTraduccion(traduccionesBD, 'allFielsRequired', lenguage)
          );
        } else if (error.response.data.status === 401) {
          setLoginErrorMessage(
            filtrarTraduccion(traduccionesBD, 'errorDataEntered', lenguage)
          );
        } else if (error.response.data.code === 256) {
          setLoginErrorMessage(
            filtrarTraduccion(traduccionesBD, 'verifyAccount', lenguage)
          );
        }
        return loginErrorMessage;
      });
  };

  handleUserBar(userBar);

  const handleLoginGoogle = (credentialResponse) => {
    setLoader(true);
    const details = jwt_decode(credentialResponse.credential);
    sessionStorage.setItem('picture', details.picture);
    http
      .post('/loginUserGoogle', {
        email: details.email,
        name: details.name,
        password: details.name,
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
        sessionStorage.setItem(
          'userProfile',
          JSON.stringify(response?.data.userProfile)
        );
        sessionStorage.setItem('isLoggedIn', true);

        setIsLoggedIn(true);
      })
      .catch((error) => {
        if (error) {
          setLoader(false);
        }
        console.error(`Error en catch LOGIN GOOGLE: ${error}`);
        console.log(`Error: `, error.response.request.status);

        if (error.response.request.status) {
          setLoginErrorMessage(
            filtrarTraduccion(traduccionesBD, 'userDoesntExists', lenguage)
          );
          setTimeout(() => {
            navigate('/register');
          }, 1500);
        }
      });
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const handleFailure = () => {
    console.log('Login Failed');
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
              title={filtrarTraduccion(traduccionesBD, 'emailValid', lenguage)}
              pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              required
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
              minLength="8"
              title={filtrarTraduccion(
                traduccionesBD,
                'password8Character',
                lenguage
              )}
              required
              placeholder={filtrarTraduccion(
                traduccionesBD,
                'passwordPlaceholder',
                lenguage
              )}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to="/forget">
              <span className="forget">
                {filtrarTraduccion(traduccionesBD, 'forgotPassword', lenguage)}
              </span>
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
                ref={refMyElement}
              />
            )}
          </div>
          <Separador />
          <h6 className="secondaryTitle">
            {filtrarTraduccion(traduccionesBD, 'loginWith', lenguage)}{' '}
            <span className="G">G</span>
            <span className="o">o</span>
            <span className="o2">o</span>
            <span className="g">g</span>
            <span className="l">l</span>
            <span className="e">e</span>
          </h6>
          <div className="googleLoginBtnYloader">
            {loader ? (
              <div className="divLoader">
                <span className="loader"></span>
              </div>
            ) : (
              <GoogleLogin
                width={widhtMyElemnt}
                onSuccess={handleLoginGoogle}
                onError={handleFailure}
                // useOneTap
              />
            )}
          </div>
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
