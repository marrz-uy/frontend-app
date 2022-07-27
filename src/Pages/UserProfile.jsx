import { useState, useEffect } from 'react';
import { Layout } from '../Layout';
import AuthUser from '../Components/AuthUser';
import '../Css/UserProfile.css';
import { Link, useNavigate } from 'react-router-dom';

const UserProfile = ({
  setPage,
  setIsLoggedIn,
  userSession,
  setUserSession,
}) => {
  const [lenguage, setLenguage] = useState('');

  const { logout, token, getUser } = AuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    setPage('user');
    sessionStorage.setItem('isLoggedIn', 'true');
    /* try {
      var traeUsuario = sessionStorage.getUser('user');
      const user = JSON.parse(traeUsuario);
      setUsuario(user);
    } catch (error) {
      console.log('NO HAY NADIE LOGUEADO', error);
    } */
  }, [setPage]);

  useEffect(() => {
    window.localStorage.setItem('lenguage', 'Spanish');
    setLenguage(localStorage.getItem('lenguage'));
  }, []);

  const handleLenguage = () => {
    if (lenguage === 'Spanish') {
      localStorage.setItem('lenguage', 'English');
    } else {
      localStorage.setItem('lenguage', 'Spanish');
    }
    setLenguage(localStorage.getItem('lenguage'));
  };

  const logoutUser = () => {
    if (token !== null) {
      console.log('LOGOUT: ');
      console.log('TOKEN: ', token);
      logout();
      setIsLoggedIn('false');
      setUserSession('Invitado');
      console.log('Cerrando sesion');
      navigate('/');
    }
  };

  return (
    <Layout>
      <div className="user-profile">
        <div className="user-profile__container">
          <div className="user-profile__description">
            <h1>*{}</h1>
            <div className="user-profile__data">
              <h2>*{}</h2>
              {/* <a href="#" className="user-profile__logout">
                Cambiar contraseña
              </a> */}
            </div>
          </div>
          <div className="user-profile__links">
            <div className="user-profile__container-item user-profile__container-item--preferences">
              <button className="user-profile__item">
                <Link to="/preferences">Preferencias</Link>
              </button>
              <img src="https://img.icons8.com/external-creatype-filed-outline-colourcreatype/64/000000/external-preferences-tools-design-creatype-filed-outline-colourcreatype.png" alt='img'/>
            </div>
            <div
              className="user-profile__container-item"
              onClick={handleLenguage}
            >
              <button className="user-profile__item">Cambiar idioma</button>
              {lenguage === 'Spanish' ? (
                <img src="https://img.icons8.com/officel/80/000000/uruguay.png"  alt='img'/>
              ) : (
                <img src="https://img.icons8.com/plasticine/100/000000/great-britain.png" alt='img' />
              )}
            </div>
          </div>
          <button className="user-profile__logout" onClick={logoutUser}>
            Logout
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
