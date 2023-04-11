import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../Components/notificationsDB.js';
import LenguageContext from '../Context/LenguageContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import AuthUser from '../Components/AuthUser';
import LogoutGoogleButton from '../Components/LogoutGoogleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
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
      navigate('/');
      setUserBar(false);
    }
  };

  const unreadsNotifications = useLiveQuery(async () => {
    return await db.myNotifications.where('read').equals('false').count();
  });

  const userType = sessionStorage?.getItem('userType');
  console.log(userType);

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
              <li onClick={() => setUserBar(false)}>
                <Link to="/qrcode" className="linkToUserProfile">
                  {/* <p className=""> */}
                  <span className="notificationIcon">🔳</span> Compartir QR
                  {/* </p> */}
                </Link>
              </li>
              <li className="userBar__logout" onClick={logoutUser}>
                {userType === 'feel' ? (
                  <p className={userType === 'feel' ? 'marginLeft' : null}>
                    <span className="notificationIcon">🚪</span>{' '}
                    {filtrarTraduccion(traduccionesBD, 'logoutLabel', lenguage)}
                  </p>
                ) : (
                  <LogoutGoogleButton />
                )}
              </li>
            </>
          ) : (
            <li onClick={() => setUserBar(false)}>
              <Link to="/qrcode" className="linkToUserProfile">
                <p className="">
                  <span className="notificationIcon">🔳</span>Compartir QR
                </p>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
export default UserBar;
