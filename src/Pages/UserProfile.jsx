import { useEffect, useContext, useState } from 'react';
import { Layout } from '../Layout';
import AuthUser from '../Components/AuthUser';
import LenguageContext from '../Context/LenguageContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/UserProfile.css';
import UserBar from './UserBar';
import '../Css/userBarClick.css';
import { handleUserBar } from '../Helpers/HandUserBarClick';
import LogoutGoogleButton from '../Components/LogoutGoogleButton';

const UserProfile = ({
  setPage,
  setIsLoggedIn,
  setUserBar,
  userBar,
  isLoggedIn,
}) => {
  const { logout, token, getUser, getEmail, getUserProfile } = AuthUser();
  const navigate = useNavigate();
  const [perfilUsuario, setPerfilUsuario] = useState('');
  const { handleLenguage, traduccionesBD, lenguage } =
    useContext(LenguageContext);
  const [setLenguage] = useState('');

  useEffect(() => {
    setPage('userProfile');
    setPerfilUsuario(getUserProfile());
    // eslint-disable-next-line
  }, [setLenguage, setPage, setPerfilUsuario]);

  const logoutUser = () => {
    if (token) {
      logout();
      sessionStorage.setItem('isLoggedIn', 'false');
      setIsLoggedIn('false');
      console.log('Cerrando sesion...');
      navigate('/');
    }
  };
  handleUserBar(userBar);

  const userType = sessionStorage?.getItem('userType');
  console.log('userType: ' + userType);
  console.log('perfilUsuario: ', perfilUsuario);

  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>
      <div className="user-profile">
        <div className="user-profile__container">
          <div className="user-profile__description">
            <div className="user-profile__data">
              <h3>{getUser()}</h3>
            </div>
            <div className="user-profile__data">
              <h3>{getEmail()}</h3>
            </div>
            {userType === 'feel' ? (
              <div className="divBtnUpdates">
                <button className="updateBtn">
                  <Link to="/updateEmail">
                    {filtrarTraduccion(traduccionesBD, 'changeEmail', lenguage)}
                  </Link>
                </button>
                <button className="updateBtn">
                  <Link to="/updateName">
                    {filtrarTraduccion(traduccionesBD, 'changename', lenguage)}
                  </Link>
                </button>
                <button className="updateBtn">
                  <Link to="/updatePassword">
                    {filtrarTraduccion(
                      traduccionesBD,
                      'changePassword',
                      lenguage
                    )}
                  </Link>
                </button>
              </div>
            ) : null}
          </div>

          <div className="user-profile__links">
            <div className="misPreferencias">
              <h3>
                {filtrarTraduccion(
                  traduccionesBD,
                  'myPreferencesTitle',
                  lenguage
                )}
              </h3>
              <h5>
                {filtrarTraduccion(
                  traduccionesBD,
                  'userNationalityText',
                  lenguage
                )}{' '}
                : {perfilUsuario?.nacionalidad}
              </h5>
              <h5>
                {filtrarTraduccion(
                  traduccionesBD,
                  'userDateOfBirthText',
                  lenguage
                )}{' '}
                : {perfilUsuario?.f_nacimiento}
              </h5>
              <ul className="lista">
                {perfilUsuario ? (
                  <>
                    <p>
                      <span>
                        {perfilUsuario?.alojamiento ? (
                          <span className="label">
                            {filtrarTraduccion(
                              traduccionesBD,
                              'preferencesLodginLabel',
                              lenguage
                            )}
                            :{' '}
                          </span>
                        ) : null}
                      </span>
                      <span className="dataLabel">
                        {perfilUsuario?.alojamiento}
                      </span>
                    </p>
                    <p>
                      <span>
                        {perfilUsuario?.gastronomia ? (
                          <span className="label">
                            {filtrarTraduccion(
                              traduccionesBD,
                              'preferencesGastronomyLabel',
                              lenguage
                            )}
                            :{' '}
                          </span>
                        ) : null}
                      </span>
                      <span className="dataLabel">
                        {perfilUsuario?.gastronomia}
                      </span>
                    </p>
                    <p>
                      <span>
                        {perfilUsuario?.espectaculos ? (
                          <span className="label">
                            {filtrarTraduccion(
                              traduccionesBD,
                              'preferencesShowsLabel',
                              lenguage
                            )}
                            :{' '}
                          </span>
                        ) : null}
                      </span>
                      <span className="dataLabel">
                        {perfilUsuario?.espectaculos}
                      </span>
                    </p>
                    <p>
                      <span>
                        {perfilUsuario?.paseos ? (
                          <span className="label">
                            {filtrarTraduccion(
                              traduccionesBD,
                              'preferencesOutdoorActivitiesLabel',
                              lenguage
                            )}
                            :{' '}
                          </span>
                        ) : null}
                      </span>
                      <span className="dataLabel">{perfilUsuario?.paseos}</span>
                    </p>
                    <p>
                      <span>
                        {perfilUsuario?.actividadesNocturnas ? (
                          <span className="label">
                            {filtrarTraduccion(
                              traduccionesBD,
                              'preferencesNightActivitiesLabel',
                              lenguage
                            )}
                            :{' '}
                          </span>
                        ) : null}
                      </span>
                      <span className="dataLabel">
                        {perfilUsuario?.actividadesNocturnas}
                      </span>
                    </p>
                    <p>
                      <span>
                        {perfilUsuario?.transporte ? (
                          <span className="label">
                            {filtrarTraduccion(
                              traduccionesBD,
                              'preferencesTransportLabellabel',
                              lenguage
                            )}
                            :{' '}
                          </span>
                        ) : null}
                      </span>
                      <span className="dataLabel">
                        {perfilUsuario?.transporte}
                      </span>
                    </p>
                    <p>
                      <span>
                        {perfilUsuario?.actividadesInfantiles ? (
                          <span className="label">
                            {filtrarTraduccion(
                              traduccionesBD,
                              'preferencesChildrensActivitiesLabel',
                              lenguage
                            )}
                            :{' '}
                          </span>
                        ) : null}
                      </span>
                      <span className="dataLabel">
                        {perfilUsuario?.actividadesInfantiles}
                      </span>
                    </p>
                    <p>
                      <span>
                        {perfilUsuario?.serviciosEsenciales ? (
                          <span className="label">
                            {filtrarTraduccion(
                              traduccionesBD,
                              'preferencesEssentialsServicesLabel',
                              lenguage
                            )}
                            :{' '}
                          </span>
                        ) : null}
                      </span>
                      <span className="dataLabel">
                        {perfilUsuario?.serviciosEsenciales}
                      </span>
                    </p>
                  </>
                ) : (
                  <h5 style={{ color: '#ffcc05' }}>
                    {filtrarTraduccion(
                      traduccionesBD,
                      'whithoutPreferencesText',
                      lenguage
                    )}
                    *
                  </h5>
                )}
              </ul>
            </div>
            <div className="user-profile__container-item user-profile__container-item--preferences">
              <div className="divBtnPreferencias">
                <Link to="/preferences">
                  <button className="user-profile__item">
                    {perfilUsuario
                      ? filtrarTraduccion(
                          traduccionesBD,
                          'changePreferencesButtonValue',
                          lenguage
                        )
                      : filtrarTraduccion(
                          traduccionesBD,
                          'enterPreferencesButtonValue',
                          lenguage
                        )}
                  </button>
                  <img
                    src="https://img.icons8.com/external-creatype-filed-outline-colourcreatype/64/000000/external-preferences-tools-design-creatype-filed-outline-colourcreatype.png"
                    alt="img"
                  />
                </Link>
              </div>
            </div>
            <div className="divBtnLenguaje" onClick={handleLenguage}>
              <button className="user-profile__item">
                {' '}
                {filtrarTraduccion(
                  traduccionesBD,
                  'changeLanguageLabel',
                  lenguage
                )}
              </button>
              <img
                src={filtrarTraduccion(traduccionesBD, 'flag', lenguage)}
                alt="img"
              />
            </div>

            <div className="divBtnLogout">
              {userType === 'feel' ? (
                <button className="user-profile__logout" onClick={logoutUser}>
                  {filtrarTraduccion(traduccionesBD, 'logoutLabel', lenguage)}
                </button>
              ) : (
                <LogoutGoogleButton />
              )}
            </div>
          </div>
        </div>
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

export default UserProfile;
