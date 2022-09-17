import { useEffect, useContext, useState } from 'react';
import { Layout } from '../Layout';
import AuthUser from '../Components/AuthUser';
import LenguageContext from '../Context/LenguageContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import { Link, useNavigate } from 'react-router-dom';
import { traerPreferencias } from '../Helpers/TraerPreferencias';
import { traerPerfil } from '../Helpers/TraerPerfil';
import { getLanguageStorage } from '../Helpers/GetLenguageStorage';
import '../Css/UserProfile.css';
// let initialLanguage = getLanguageStorage()

const UserProfile = ({ setPage, setIsLoggedIn }) => {
  const { logout, token, getUser } = AuthUser();
  const navigate = useNavigate();
  const [prefeEnArrayInicial, setPrefeEnArrayInicial] = useState('');
  const pefilEnArray = traerPerfil();
  const { handleLenguage, traduccionesBD, lenguage } =
    useContext(LenguageContext);
  const [setLenguage] = useState('');

  useEffect(() => {
    setPage('userProfile');
    setLenguage(getLanguageStorage());
    setPrefeEnArrayInicial(traerPreferencias());
  }, [setLenguage, setPrefeEnArrayInicial, setPage]);

  const logoutUser = () => {
    if (token) {
      logout();
      sessionStorage.setItem('isLoggedIn', 'false');
      setIsLoggedIn('false');
      console.log('Cerrando sesion...');
      navigate('/');
    }
  };

  return (
    <Layout>
      <div className="user-profile">
        <div className="user-profile__container">
          <div className="user-profile__description">
            <div className="user-profile__data">
              <h3>{getUser()?.name}</h3>
            </div>
            <div className="user-profile__data">
              <h3>{getUser()?.email}</h3>
            </div>

            <div className="user-profile__container-item user-profile__container-item--preferences">
              <div className="divBtnPreferencias">
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
            </div>
          </div>

          <div className="user-profile__links">
            <div className="misPreferencias">
              <h2>{filtrarTraduccion(traduccionesBD, 'myPreferencesTitle', lenguage)}</h2>
              <h5>
                {filtrarTraduccion(traduccionesBD, 'userNationalityText', lenguage)} : {pefilEnArray?.nacionalidad}
              </h5>
              <h5>
                {filtrarTraduccion(traduccionesBD, 'userDateOfBirthText', lenguage)} : {pefilEnArray?.f_nacimiento}
              </h5>
              <ul className="lista">
                {prefeEnArrayInicial ? (
                  prefeEnArrayInicial?.map((item) => {
                    return (
                      <p key={item.id}>
                        <span>
                          {getLanguageStorage() === 'es'
                            ? `${item.categoria} :`
                            : `${item.category} :`}
                          <span className="label">
                            {' '}
                            {getLanguageStorage() === 'es'
                              ? `${item.labelEsp}`
                              : `${item.labelEng}`}
                          </span>
                        </span>
                      </p>
                    );
                  })
                ) : (
                  <h5 style={{ color: '#ffcc05' }}>
                    {filtrarTraduccion(traduccionesBD, 'whithoutPreferencesText', lenguage)}*
                  </h5>
                )}
              </ul>
            </div>
            <div className="user-profile__container-item user-profile__container-item--preferences">
              <div className="divBtnPreferencias">
                <button className="user-profile__item">
                  <Link to="/preferences">
                    {prefeEnArrayInicial
                      ? filtrarTraduccion(traduccionesBD, 'changePreferencesButtonValue', lenguage)
                      : filtrarTraduccion(traduccionesBD, 'enterPreferencesButtonValue', lenguage)}
                  </Link>
                </button>
                <img
                  src="https://img.icons8.com/external-creatype-filed-outline-colourcreatype/64/000000/external-preferences-tools-design-creatype-filed-outline-colourcreatype.png"
                  alt="img"
                />
              </div>
            </div>
            <div className="divBtnLenguaje" onClick={handleLenguage}>
              <button className="user-profile__item">
                {' '}
                {filtrarTraduccion(traduccionesBD, 'changeLanguageLabel', lenguage)}
              </button>
              <img src={filtrarTraduccion(traduccionesBD, 'flag', lenguage)} alt="img" />
            </div>
          </div>
          <button className="user-profile__logout" onClick={logoutUser}>
          {filtrarTraduccion(traduccionesBD, 'logoutLabel', lenguage)}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
