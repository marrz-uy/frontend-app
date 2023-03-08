import { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Layout } from '../Layout';
import AuthUser from '../Components/AuthUser';
import LenguageContext from '../Context/LenguageContext';
import PageContext from '../Context/PageContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import UserBar from './UserBar';
import { handleUserBar } from '../Helpers/HandUserBarClick';
import '../Css/ForgetPassword.css';

const ForgetPassword = ({
  setIsLoggedIn,
  setPage,
  isLoggedIn,
  userBar,
  setUserBar,
}) => {
  const { setActivePage } = useContext(PageContext);
  useEffect(() => {
    setPage('login');
    setActivePage('login');
  }, [setPage, setActivePage]);
  const [email, setEmail] = useState('');
  const [resetErrorMessage, setResetErrorMessage] = useState('');
  const { traduccionesBD, lenguage } = useContext(LenguageContext);
  const { http } = AuthUser();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const submitReset = (e) => {
    e.preventDefault();
    setLoader(true);
    sessionStorage.setItem('userType', 'feel');
    http
      .post('/password/email', { email })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setLoader(false);
        }
        if (res.data.success === true) {
          Swal.fire({
            titleText:
              'Se envio un enlace de reseteo de contraseña a su correo',
            html: '' /* var afuera */,
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: filtrarTraduccion(
              traduccionesBD,
              'closeBtnModal',
              lenguage
            ),
            cancelButtonColor: 'gray',
            showClass: {
              popup: 'animate__animated animate__fadeInDown',
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp',
            },
          });
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        }
      })
      .catch(function (error) {
        if (error) {
          setLoader(false);
        }
        if (!email) {
          setResetErrorMessage('El email es obligatorio');
        }
      });
    return resetErrorMessage;
  };

  handleUserBar(userBar);

  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>
      <div className="forgetPassword">
        <form onSubmit={submitReset}>
          <div className="titulo">
            <h2 className="title">🔑 Resetear pasword</h2>
          </div>
          <div className="message">{`${resetErrorMessage}`}</div>
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
            {loader ? (
              <div className="divLoader">
                <span className="loader"></span>
              </div>
            ) : (
              <input
                type="submit"
                value="Solicitar reseteo"
                className="btn-login"
              />
            )}
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

export default ForgetPassword;
