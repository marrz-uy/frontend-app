import { useState, useEffect } from 'react';
import { Layout } from '../Layout';
import AuthUser from '../Components/AuthUser';
import '../Css/UserProfile.css';
import { Link, useNavigate } from 'react-router-dom';
import { traerPreferencias } from '../Helpers/TraerPreferencias';
import { traerPerfil } from '../Helpers/TraerPerfil';

const UserProfile = ({
  setPage,
  page,
  setIsLoggedIn,
  isLoggedIn,
  userSession,
  setUserSession,
}) => {
  const [lenguage, setLenguage] = useState('');
  const { logout, token, getUser } = AuthUser();
  const navigate = useNavigate();
  const preferenciasEnArray = traerPreferencias();
  const pefilEnArray = traerPerfil();

  useEffect(() => {
    setPage('user');
  }, [setPage]);

  useEffect(() => {
    localStorage.setItem('lenguage', 'Spanish');
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
    if (token) {
      logout();
      sessionStorage.setItem('isLoggedIn', 'false');
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
            <div className="userName">
              <h2>{getUser()?.name}</h2>
            </div>
            <div className="user-profile__data">
              <h3>{getUser()?.email}</h3>
              <h5>
                Nacionalidad:
                {pefilEnArray?.nacionalidad}
              </h5>
              <h5>
                Fecha de Nacimiento:
                {pefilEnArray?.f_nacimiento}
              </h5>
              {/* <a href="#" className="user-profile__logout">
                Cambiar contraseña
              </a> */}
            </div>
          </div>
          <div className="user-profile__links">
            <div className="misPreferencias">
              <h2>Mis preferencias</h2>
              <ul className="lista">
                {preferenciasEnArray ? (
                  preferenciasEnArray?.map((item) => {
                    return (
                      <p key={item.id}>
                        <span>
                          {item.categoria}:{' '}
                          <span className="label">{item.label}</span>
                        </span>
                      </p>
                    );
                  })
                ) : (
                  <h5 style={{ color: '#ffcc05' }}>
                    Sin preferencias registradas*
                  </h5>
                )}
              </ul>
            </div>
            <div className="user-profile__container-item user-profile__container-item--preferences">
              <div className="divBtnPreferencias">
                <button className="user-profile__item">
                  <Link to="/preferences">
                    {preferenciasEnArray
                      ? `Cambiar Preferencias`
                      : `Ingresar Preferencias`}
                  </Link>
                </button>
                <img
                  src="https://img.icons8.com/external-creatype-filed-outline-colourcreatype/64/000000/external-preferences-tools-design-creatype-filed-outline-colourcreatype.png"
                  alt="img"
                />
              </div>
            </div>
            <div className="divBtnLenguaje" onClick={handleLenguage}>
              <button className="user-profile__item"> Cambiar Idioma</button>
              {lenguage === 'Spanish' ? (
                <img
                  src="https://img.icons8.com/officel/80/000000/uruguay.png"
                  alt="img"
                />
              ) : (
                <img
                  src="https://img.icons8.com/plasticine/100/000000/great-britain.png"
                  alt="img"
                />
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
