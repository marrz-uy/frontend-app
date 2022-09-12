import React, { useContext } from 'react';
import LenguageContext from '../Context/LenguageContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import { Link } from 'react-router-dom';
import AuthUser from '../Components/AuthUser';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import '../Css/UserBar.css';

const UserBar = ({ isLoggedIn, setIsLoggedIn, setUserSession, setUserBar }) => {
  const { traduccionesBD, lenguage, handleLenguage } =
    useContext(LenguageContext);
  const { logout, token } = AuthUser();
  const navigate = useNavigate();

  const logoutUser = () => {
    if (token) {
      logout();
      sessionStorage.setItem('isLoggedIn', 'false');
      setIsLoggedIn('false');
      console.log('Cerrando sesion...');
      navigate('/');
      setUserBar(false)
    }
  };

  return (
    <nav className="userBar">
      <div className="animate__animated animate__slideInRight animate__faster">
        <FontAwesomeIcon
          icon={faXmark}
          className="userBar__cancel"
          onClick={() => setUserBar(false)}
        />
        <ul className="userBar__link">
          {isLoggedIn === 'false' || isLoggedIn === null ? (
            <>
              <li
                className="userBar__register"
                onClick={() => setUserBar(false)}
              >
                <Link to="/register">
                  {filtrarTraduccion(traduccionesBD, 'registerLabel', lenguage)}
                </Link>
              </li>
              <li className="userBar__login" onClick={() => setUserBar(false)}>
                <Link to="/login">
                  {filtrarTraduccion(traduccionesBD, 'loginLabel', lenguage)}
                </Link>
              </li>
            </>
          ) : (
            ''
          )}

          <li
            onClick={handleLenguage}
            className="userBar__lenguage"
            id="id__lenguage"
          >
            <p>
              {filtrarTraduccion(
                traduccionesBD,
                'changeLanguageLabel',
                lenguage
              )}
            </p>
            <img
              src={filtrarTraduccion(traduccionesBD, 'flag', lenguage)}
              alt="img"
            />
          </li>
          {isLoggedIn === 'true' ? (
            <>
              <li className="userBar__perfil" onClick={() => setUserBar(false)}>
                <Link to="/user">
                  {filtrarTraduccion(
                    traduccionesBD,
                    'userProfileLabel',
                    lenguage
                  )}
                </Link>
              </li>
              <li className="userBar__lenguage" onClick={logoutUser}>
                <p>
                  {filtrarTraduccion(traduccionesBD, 'logoutLabel', lenguage)}
                </p>
              </li>
            </>
          ) : (
            ''
          )}
        </ul>
      </div>
    </nav>
  );
};
export default UserBar;
