import React, { useContext } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../Components/notificationsDB.js';
import LenguageContext from '../Context/LenguageContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import { Link } from 'react-router-dom';
import AuthUser from '../Components/AuthUser';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import LogoutGoogleButton from '../Components/LogoutGoogleButton';
import '../Css/UserBar.css';

const UserBar = ({ isLoggedIn, setIsLoggedIn, setUserBar }) => {
  const { traduccionesBD, lenguage, handleLenguage } =
    useContext(LenguageContext);
  const { logout, token } = AuthUser();
  const navigate = useNavigate();

  const logoutUser = () => {
    if (token) {
      logout();
      sessionStorage.setItem('isLoggedIn', false);
      sessionStorage.clear();
      setIsLoggedIn(false);
      console.log('Cerrando sesion...');
      console.log('loggedIn: ', setIsLoggedIn);
      navigate('/');
      setUserBar(false);
    }
  };

  const unreadsNotifications = useLiveQuery(async () => {
    return await db.myNotifications.where('read').equals('false').count();
  });

  const userType = sessionStorage?.getItem('userType');

  return (
    <nav className="userBar">
      <div className="animate__animated animate__slideInRight animate__faster">
        <FontAwesomeIcon
          icon={faXmark}
          className="userBar__cancel"
          onClick={() => setUserBar(false)}
        />
        <ul className="userBar__link">
          {!isLoggedIn ? (
            <>
              <li
                className="userBar__register"
                onClick={() => setUserBar(false)}
              >
                <Link to="/register">
                  <span>📝</span>{' '}
                  {filtrarTraduccion(traduccionesBD, 'registerLabel', lenguage)}
                </Link>
              </li>
              <li className="userBar__login" onClick={() => setUserBar(false)}>
                <Link to="/login">
                  <span>🔑</span>{' '}
                  {filtrarTraduccion(traduccionesBD, 'loginLabel', lenguage)}
                </Link>
              </li>
              <li
                className="userBar__notifications"
                onClick={() => setUserBar(false)}
              >
                <Link
                  to="/notifications"
                  className="notificationlink masEspacio"
                >
                  <span className="notificationIcon">📢</span>{' '}
                  {filtrarTraduccion(traduccionesBD, 'notifications', lenguage)}
                </Link>
                <span className="unreadNotification">
                  {unreadsNotifications > 0
                    ? `${filtrarTraduccion(
                        traduccionesBD,
                        'new',
                        lenguage
                      )}(${unreadsNotifications})`
                    : null}
                </span>
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
            <p className="changeLenguageLabel">
              <span className="notificationIcon">🗣️</span>{' '}
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
          {isLoggedIn ? (
            <>
              <li className="userBar__perfil" onClick={() => setUserBar(false)}>
                <Link to="/user" className="linkToUserProfile">
                  <span className="notificationIcon">👤</span>{' '}
                  {filtrarTraduccion(
                    traduccionesBD,
                    'userProfileLabel',
                    lenguage
                  )}
                </Link>
              </li>
              <li
                className="userBar__notifications"
                onClick={() => setUserBar(false)}
              >
                <Link to="/notifications" className="notificationlink">
                  <span className="notificationIcon masEspacio">📢 </span>{' '}
                  {filtrarTraduccion(traduccionesBD, 'notifications', lenguage)}
                </Link>
                <span className="unreadNotification">
                  {unreadsNotifications > 0
                    ? `${filtrarTraduccion(
                        traduccionesBD,
                        'new',
                        lenguage
                      )}(${unreadsNotifications})`
                    : null}
                </span>
              </li>
              <li
                className="userBar__notifications"
                onClick={() => setUserBar(false)}
              >
                <Link to="/favourites" className="notificationlink ">
                  <span className="notificationIcon masEspacio">🤍</span>{' '}
                  {filtrarTraduccion(traduccionesBD, 'favourites', lenguage)}
                </Link>
              </li>
              <li className="userBar__logout" onClick={logoutUser}>
                {userType === 'feel' ? (
                  <p>
                    <span className="notificationIcon">🚪</span>{' '}
                    {filtrarTraduccion(traduccionesBD, 'logoutLabel', lenguage)}
                  </p>
                ) : (
                  <LogoutGoogleButton />
                )}
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
