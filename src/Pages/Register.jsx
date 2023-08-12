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

  return [refElement, width];
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
              titleText: filtrarTraduccion(
                traduccionesBD,
                'registerModal',
                lenguage
              ), //?translate
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
        }, 50000);
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
          setRegisterErrorMessage(
            filtrarTraduccion(traduccionesBD, 'allFielsRequired', lenguage)
          ); //todo translate
        }
        if (errores.email?.length > 0) {
          setEmailErrorMEssage(
            filtrarTraduccion(traduccionesBD, 'errorExistEmail', lenguage)
          ); //todo translate
        }
        if (errores.password) {
          setPasswordErrorMessage(
            filtrarTraduccion(traduccionesBD, 'password8Character', lenguage)
          ); // todo translate
        }
        if (errores.passwordConfirmation) {
          setPasswordConfirmationErrorMessage(
            filtrarTraduccion(
              traduccionesBD,
              'confirmationPasswordMatch',
              lenguage
            )
          ); //todo translate
        }
        if (errores.name) {
          setNameErrorMessage(
            filtrarTraduccion(traduccionesBD, 'name2Character', lenguage)
          ); //todo translate
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
              title: 'Registro exitoso.',
              text:
                filtrarTraduccion(traduccionesBD, 'loginGoogleAs', lenguage) +
                ' ' +
                response.data.username,
              icon: 'success',
              showConfirmButton: true,
              confirmButtonText: filtrarTraduccion(
                traduccionesBD,
                'loginBtnModal',
                lenguage
              ),
              confirmButtonColor: '#083d99',
              showClass: {
                popup: 'animate__animated animate__fadeInDown',
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp',
              },
            }).then((result) => {
              if (result.isConfirmed) {
                navigate('/login');
              }
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
          setRegisterErrorMessage(
            filtrarTraduccion(traduccionesBD, 'emailUserExists', lenguage)
          );
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
              title={filtrarTraduccion(traduccionesBD, 'emailValid', lenguage)} //todo translate
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
              title={filtrarTraduccion(
                traduccionesBD,
                'password8Character',
                lenguage
              )} //todo translate
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
              title={filtrarTraduccion(
                traduccionesBD,
                'confirmationPassword8Andmatch',
                lenguage
              )}
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
              title={filtrarTraduccion(traduccionesBD, 'emailEnter', lenguage)} //todo translate
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
          <h6 className="secondaryTitle">
            {filtrarTraduccion(traduccionesBD, 'registerWith', lenguage)}{' '}
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
