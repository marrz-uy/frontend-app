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
  console.log('anchoMiElemento:', widhtMyElemnt);

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

  const handleLoginGoogle = (credentialResponse) => {
    setLoader(true);
    const details = jwt_decode(credentialResponse.credential);
    sessionStorage.setItem('picture', details.picture);
    http
      .post('http://localhost:8000/api/loginUserGoogle', {
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
      });

    navigate('/');
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
                ref={refMyElement}
              />
            )}
          </div>
          <Separador />
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
