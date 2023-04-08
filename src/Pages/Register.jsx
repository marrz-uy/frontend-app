import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Layout } from '../Layout';
import AuthUser from '../Components/AuthUser';
import LenguageContext from '../Context/LenguageContext';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import PageContext from '../Context/PageContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import UserBar from './UserBar';
import { handleUserBar } from '../Helpers/HandUserBarClick';
import Separador from '../Components/Separador';
import '../Css/Register.css';
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
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { http } = AuthUser();
  const { traduccionesBD, lenguage } = useContext(LenguageContext);
  const [refMyElement, widhtMyElemnt] = useWidthElement();
  console.log('anchoMiElemento:', widhtMyElemnt);

  const submitRegister = (e) => {
    e.preventDefault();
    console.log('Me registro!!');
    setRegisterErrorMessage('');
    setLoader(true);
    const provider = 'feeluy';
    http
      .post('/register', {
        email,
        password,
        passwordConfirmation,
        name,
        provider,
      })
      .then((res) => {
        console.log('RESPUESTA ok:', res.data);
        if (res.data) {
          setLoader(false);
        }
        setTimeout(() => {
          if (res.data.status === 201) {
            Swal.fire({
              titleText:
                'Registro exitoso, se envio un enlace de verificacion a su correo electronico',
              showConfirmButton: true,
              showCancelButton: false,
              confirmButtonColor: '#083d99',
              showClass: {
                popup: 'animate__animated animate__fadeInDown',
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp',
              },
            });
          }
        }, 1000);
        navigate('/login');
      })
      .catch(function (error) {
        if (error) {
          setLoader(false);
        }
        /* console.log('RESPUESTA:', error.response.data.errors); */
        let ERRORES = error.response.data.errors;
        // let ERRORES = error.response.data;
        console.log('RESPUESTA errores:', ERRORES);

        if (!email || !password || !passwordConfirmation || !name) {
          setRegisterErrorMessage('Todos los campos son obligatorios');
        } else if (
          error.response.data.errors.email[0] ===
          'The email must be a valid email address.'
        ) {
          setRegisterErrorMessage('Debe ser un correo valido');
        } else if (
          error.response.data.errors.email[0] ===
          'El campo email ya ha sido tomado.'
        ) {
          setRegisterErrorMessage('Existe un usuario con ese correo');
        } else if (error.response.data.errors.email) {
          setRegisterErrorMessage('El email debe ser valido');
        } else if (error.response.data.errors.password) {
          setRegisterErrorMessage(
            'La contraseña debe tener minimo 8 caracteres'
          );
        } else if (error.response.data.errors.passwordConfirmation) {
          setRegisterErrorMessage(
            'La confirmacion de contraseña no concide con su contraseña'
          );
        } else if (error.response.data.errors.name) {
          setRegisterErrorMessage('Debe ingresar un nombre de usuario');
        }
        console.log('registerErrorMessage', registerErrorMessage);
      });
    return registerErrorMessage;
  };

  handleUserBar(userBar);

  const handleregisterGoogle = (credentialResponse) => {
    setLoader(true);
    const details = jwt_decode(credentialResponse.credential);
    sessionStorage.setItem('picture', details.picture);
    http
      .post('/registerUserGoogle', {
        email: details.email,
        name: details.name,
        password: details.name,
        passwordConfirmation: details.name,
        provider: 'google',
      })
      .then((response) => {
        console.log(
          '%cRESPUESTA BACK LOGIN GOOGLE: ',
          'color:blue;',
          response.data
        );
        if (response.data) {
          setLoader(false);
        }
        setTimeout(() => {
          if (response.data.status === 201) {
            Swal.fire({
              titleText: `Registro exitoso, ya puede iniciar sesion con su cuenta de Google como ${response.data.username}`,
              showConfirmButton: true,
              showCancelButton: false,
              confirmButtonColor: '#083d99',
              showClass: {
                popup: 'animate__animated animate__fadeInDown',
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp',
              },
            });
          }
        }, 1000);

        navigate('/login');
      })
      .catch((error) => {
        if (error) {
          setLoader(false);
        }
        console.error(`Error en catch Register GOOGLE: ${error}`);
        let ERRORES = error.response.data.errors;
        // let ERRORES = error.response.data;
        console.log('RESPUESTA errores:', ERRORES);
        if (
          error.response.data.errors.email[0] ===
          'The email has already been taken.'
        ) {
          setRegisterErrorMessage('Existe un usuario con ese correo');
        }
      });

    return registerErrorMessage;
  };

  const handleFailure = () => {
    console.log('Login Failed');
  };

  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>
      <div className="register">
        <form onSubmit={submitRegister}>
          <div>
            <h2 className="title">
              <span>📝</span>{' '}
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
            {loader ? (
              <div className="divLoader">
                <span className="loader"></span>
              </div>
            ) : (
              <input
                type="submit"
                value={filtrarTraduccion(
                  traduccionesBD,
                  'registerButtonValue',
                  lenguage
                )}
                className="btn-register"
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
                onSuccess={handleregisterGoogle}
                onError={handleFailure}
                text="continue_with"
                // useOneTap
              />
            )}
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
