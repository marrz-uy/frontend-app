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
  const [emailErrorMEssage, setEmailErrorMEssage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [
    passwordConfirmationErrorMessage,
    setPasswordConfirmationErrorMessage,
  ] = useState('');
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { http } = AuthUser();
  const { traduccionesBD, lenguage } = useContext(LenguageContext);
  const [refMyElement, widhtMyElemnt] = useWidthElement();

  const submitRegister = (e) => {
    e.preventDefault();
    setRegisterErrorMessage('');
    setEmailErrorMEssage('');
    setPasswordErrorMessage('');
    setPasswordConfirmationErrorMessage('');
    setNameErrorMessage('');
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
        }, 500);
        navigate('/login');
      })
      //! *************************************
      .catch(function (error) {
        const errores = error.response.data.errors;
        console.log('sdsdsds', errores);
        if (error) {
          setLoader(false);
        }
        if (!email || !password || !passwordConfirmation || !name) {
          setRegisterErrorMessage('Todos los campos son obligatorios'); //?translate
        }
        if (errores.email?.length > 0) {
          setEmailErrorMEssage(
            'El correo no es valido o ya existe un usuario con este correo electronico'
          ); //?translate
        }
        if (errores.password) {
          setPasswordErrorMessage(
            'El password debe tener 8 caracteres como minimo'
          ); //?translate
        }
        if (errores.passwordConfirmation) {
          setPasswordConfirmationErrorMessage(
            'La confirmacion de password debe coincidir con el password'
          ); //?translate
        }
        if (errores.name) {
          setNameErrorMessage(
            'Debe ingresar un nombre de 2 cararcteres minimos'
          ); //?translate
        }
      });
    console.log('%cERROR MESSAGES', 'color:red;', registerErrorMessage);
    return (
      registerErrorMessage,
      emailErrorMEssage,
      passwordErrorMessage,
      passwordConfirmationErrorMessage,
      nameErrorMessage
    );
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
        if (
          error.response.data.errors.email[0] ===
          'The email has already been taken.'
        ) {
          setRegisterErrorMessage('Existe un usuario con ese correo'); //?translate
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
              title="Debe ingresar un correo electronico valido. Ej: usuario@correo.com" //?translate
              // pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              // required
              placeholder={filtrarTraduccion(
                traduccionesBD,
                'registerEmailPlaceholder',
                lenguage
              )}
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="message">{`${emailErrorMEssage}`}</div>

            <input
              className="input"
              type="password"
              name="password"
              // minLength="8"
              title="La contraseña debe contener al menos 8 caracteres." //?translate
              // required
              placeholder={filtrarTraduccion(
                traduccionesBD,
                'registerPasswordPlaceholder',
                lenguage
              )}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="message">{`${passwordErrorMessage}`}</div>

            <input
              className="input"
              type="password"
              name="passwordConfirm"
              // minLength="8"
              title="La confirmacion de contraseña debe contener al menos 8 caracteres y coincidir con el password." //?translate
              // required
              placeholder={filtrarTraduccion(
                traduccionesBD,
                'registerPasswordConfirmationPlaceholder',
                lenguage
              )}
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <div className="message">{`${passwordConfirmationErrorMessage}`}</div>

            <input
              className="input"
              type="text"
              name="name"
              minLength="2"
              // required
              title="Debe ingresar un nombre." //?translate
              placeholder={filtrarTraduccion(
                traduccionesBD,
                'registerNamePlaceholder',
                lenguage
              )}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="message">{`${nameErrorMessage}`}</div>
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
