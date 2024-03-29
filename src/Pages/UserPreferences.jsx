import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Layout } from '../Layout';
import AuthUser from '../Components/AuthUser';
import LenguageContext from '../Context/LenguageContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import UserBar from './UserBar';
import { handleUserBar } from '../Helpers/HandUserBarClick';
import {
  CategoriaAlojamiento,
  CategoriaGastronomia,
  CategoriaEspectaculos,
  CategoriaActividadesAlAireLibre,
  CategoriaActividadesNocturnas,
  CategoriaTransporte,
  CategoriaActividadesInfantiles,
  CategoriaServiciosEsenciales,
} from '../Data/Categorias';
import {
  LodginCategory,
  GastronomyCategory,
  ShowCategory,
  OutdoorActivitiesCategory,
  NightActivitiesCatergory,
  TransportationCategory,
  ChildrensActivitiesCategory,
  EssentialServicesCategory,
} from '../Data/Categories';
import alojamientoIcono from '../Assets/categoriesImages/hospedaje.png';
import gastronomiaIcono from '../Assets/categoriesImages/fast-food1.png';
import airelibreIcono from '../Assets/categoriesImages/hiking1.png';
import transporteIcono from '../Assets/categoriesImages/bus.png';
import espectaculosIcono from '../Assets/categoriesImages/teatro1.png';
import nocturnaIcono from '../Assets/categoriesImages/cocktail1.png';
import infantilesIcono from '../Assets/categoriesImages/calesita1.png';
import serviciosIcono from '../Assets/categoriesImages/services1.png';
import '../Css/UserPreferences.css';
import '../Css/userBarClick.css';

const UserPreferences = ({
  setPage,
  setPefilRecuperado,
  setUserBar,
  userBar,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  const { http, getUserProfile, getUser, saveUserProfile } = AuthUser();
  const pefilExistente = getUserProfile();
  const [user_id, setUser_id] = useState();
  const [submitMessage, setSubmitMessage] = useState('');
  const { traduccionesBD, lenguage } = useContext(LenguageContext);
  const [language, setLenguage] = useState('');
  const [nacionalidad, setNacionalidad] = useState(
    pefilExistente?.nacionalidad
  );
  const [fechaDeNacimiento, setFechaDeNacimiento] = useState(
    pefilExistente?.f_nacimiento
  );
  const [alojamiento, setAlojamiento] = useState(pefilExistente?.alojamiento);
  const [gastronomia, setGastronomia] = useState(pefilExistente?.gastronomia);
  const [espectaculos, setEspectaculos] = useState(
    pefilExistente?.espectaculos
  );
  const [paseos, setPaseos] = useState(pefilExistente?.paseos);
  const [actividadesNocturnas, setActividadesNocturnas] = useState(
    pefilExistente?.actividadesNocturnas
  );
  const [transporte, setTransporte] = useState(pefilExistente?.transporte);
  const [actividadesInfantiles, setActividadesInfantiles] = useState(
    pefilExistente?.actividadesInfantiles
  );
  const [serviciosEsenciales, setServiciosEsenciales] = useState(
    pefilExistente?.serviciosEsenciales
  );
  const f_nacimiento = fechaDeNacimiento;

  useEffect(() => {
    setPage('preferences');
    setLenguage(localStorage.getItem('language'));
    try {
      setUser_id(sessionStorage?.getItem('id'));
    } catch (error) {
      console.error(error.message);
    }
  }, [setPage, getUser, user_id, setUser_id, setLenguage, language]);

  const recuperarPerfil = () => {
    if (user_id) {
      try {
        setPefilRecuperado(getUserProfile());
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const updateUserProfile = () => {
    http
      .patch(`/userProfile/${user_id}`, {
        nacionalidad,
        f_nacimiento,
        alojamiento,
        gastronomia,
        espectaculos,
        paseos,
        actividadesNocturnas,
        transporte,
        actividadesInfantiles,
        serviciosEsenciales,
      })
      .then((res) => {
        if (res.data.message !== 'NO EXISTE PERFIL PARA EL USUARIO') {
          saveUserProfile(res.data.user);
          recuperarPerfil();
        }
      })
      .catch((error) => console.error(error.message));
  };

  const submitUserProfile = () => {
    http
      .post('/userProfile', {
        user_id,
        nacionalidad,
        f_nacimiento,
        alojamiento,
        gastronomia,
        espectaculos,
        paseos,
        actividadesNocturnas,
        transporte,
        actividadesInfantiles,
        serviciosEsenciales,
      })
      .then((res) => {
        saveUserProfile(res.data.userprofile);
        recuperarPerfil();
      })
      .catch((error) => console.error(error.message));
  };

  const handleUserProfile = (e) => {
    e.preventDefault();
    try {
      if (pefilExistente !== null) {
        updateUserProfile();
        setSubmitMessage('Perfil actualizado correctamente');
      } else {
        submitUserProfile();
        setSubmitMessage('Perfil guardado correctamente');
      }
    } catch (error) {
      setSubmitMessage('Perfil no se guardo', error);
    }
  };

  const styles = {
    control: () => ({
      height: 25,
      width: '100%',
      maxWidth: 450,
      backgroundColor: 'rgba(250,250,250)',
      display: 'flex',
      border: '1px solid rgba(190,190,190)',
      borderRadius: '3px',
      boxShadow: '2px 2px 2px rgba(0,0,0, 0.4)',
      fontSize: 11,
      fontWeight: 'bold',
    }),
  };
  const [nationalitiesAndFlags, setNationalitiesAndFlags] = useState([]);

  useEffect(() => {
    http
      .get('https://restcountries.com/v3.1/all')
      .then((res) => {
        setNationalitiesAndFlags(res.data);
      })
      .catch((error) => console.error(error.message));
  }, []);

  const nationalitiesAndFlagsSort = nationalitiesAndFlags.sort((a, b) => {
    return a.ccn3 - b.ccn3;
  });

  const handleChangeNationality = (e) => {
    e.preventDefault();
    setNacionalidad(e.target.value);
  };

  handleUserBar(userBar);

  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>
      <div className="userProfile" onLoad={recuperarPerfil}>
        <div>
          <h2 className="title">
            {pefilExistente === null
              ? filtrarTraduccion(
                  traduccionesBD,
                  'preferencesTitleCreateProfile',
                  lenguage
                )
              : filtrarTraduccion(
                  traduccionesBD,
                  'preferencesTitleUpdateProfile',
                  lenguage
                )}
          </h2>
        </div>
        <form onSubmit={handleUserProfile}>
          <div className="nacionalidadYfchanacimiento">
            <div className="inputGroupPreferencias nacionalidad">
              <label htmlFor="nacionalidad">
                {filtrarTraduccion(
                  traduccionesBD,
                  'userNationalityText',
                  lenguage
                )}
              </label>
              <div>
                <select
                  className="nationalitiesSelect"
                  onChange={handleChangeNationality}
                  value={nacionalidad}
                >
                  {nationalitiesAndFlagsSort?.map((item, index) => {
                    return (
                      <option key={index}>
                        {item.flag}{' '}
                        {language === 'es'
                          ? item.translations.spa.common
                          : item.name.common}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="inputGroupPreferencias fecha">
              <label htmlFor="fechaDeNacimiento">
                {filtrarTraduccion(
                  traduccionesBD,
                  'userDateOfBirthText',
                  lenguage
                )}
              </label>
              <input
                className="inputPreferencias"
                id="fecha"
                type="date"
                name="fechaDeNacimiento"
                value={fechaDeNacimiento}
                onChange={(e) => setFechaDeNacimiento(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <h4 className="titlePreferencias">
              {filtrarTraduccion(
                traduccionesBD,
                'myPreferencesTitle',
                lenguage
              )}
            </h4>
          </div>
          <div className="selectIndividual">
            <label htmlFor="alojamiento">
              <img
                src={alojamientoIcono}
                className="categoryImage"
                alt="hot"
              ></img>
              {filtrarTraduccion(
                traduccionesBD,
                'preferencesLodginLabel',
                lenguage
              )}
            </label>
            <Select
              className="selectProfile"
              defaultValue={{
                value: pefilExistente?.alojamiento,
                label: pefilExistente?.alojamiento,
              }}
              options={
                language === 'es' ? CategoriaAlojamiento : LodginCategory
              }
              onChange={(e) => setAlojamiento(e.value)}
              styles={styles}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="gastronomia">
              <img
                src={gastronomiaIcono}
                className="categoryImage"
                alt="Res"
              ></img>
              {filtrarTraduccion(
                traduccionesBD,
                'preferencesGastronomyLabel',
                lenguage
              )}
            </label>
            <Select
              className="selectProfile"
              defaultValue={{
                value: pefilExistente?.gastronomia,
                label: pefilExistente?.gastronomia,
              }}
              options={
                language === 'es' ? CategoriaGastronomia : GastronomyCategory
              }
              onChange={(e) => setGastronomia(e.value)}
              styles={styles}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="espectaculos">
              <img
                src={espectaculosIcono}
                className="categoryImage"
                alt="res"
              ></img>
              {filtrarTraduccion(
                traduccionesBD,
                'preferencesShowsLabel',
                lenguage
              )}
            </label>
            <Select
              className="selectProfile"
              defaultValue={{
                value: pefilExistente?.espectaculos,
                label: pefilExistente?.espectaculos,
              }}
              options={language === 'es' ? CategoriaEspectaculos : ShowCategory}
              onChange={(e) => setEspectaculos(e.value)}
              styles={styles}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="actividadesAlAireLibre">
              <img
                src={airelibreIcono}
                className="categoryImage"
                alt="Esp"
              ></img>
              {filtrarTraduccion(
                traduccionesBD,
                'preferencesOutdoorActivitiesLabel',
                lenguage
              )}
            </label>
            <Select
              className="selectProfile"
              defaultValue={{
                value: pefilExistente?.paseos,
                label: pefilExistente?.paseos,
              }}
              options={
                language === 'es'
                  ? CategoriaActividadesAlAireLibre
                  : OutdoorActivitiesCategory
              }
              onChange={(e) => setPaseos(e.value)}
              styles={styles}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="actividadesNocturnas">
              <img
                src={nocturnaIcono}
                className="categoryImage"
                alt="Noc"
              ></img>
              {filtrarTraduccion(
                traduccionesBD,
                'preferencesNightActivitiesLabel',
                lenguage
              )}
            </label>
            <Select
              className="selectProfile"
              defaultValue={{
                value: pefilExistente?.actividadesNocturnas,
                label: pefilExistente?.actividadesNocturnas,
              }}
              options={
                language === 'es'
                  ? CategoriaActividadesNocturnas
                  : NightActivitiesCatergory
              }
              onChange={(e) => setActividadesNocturnas(e.value)}
              styles={styles}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="transporte">
              <img
                src={transporteIcono}
                className="categoryImage"
                alt="Tra"
              ></img>
              {filtrarTraduccion(
                traduccionesBD,
                'preferencesTransportLabellabel',
                lenguage
              )}
            </label>
            <Select
              className="selectProfile"
              defaultValue={{
                value: pefilExistente?.transporte,
                label: pefilExistente?.transporte,
              }}
              options={
                language === 'es' ? CategoriaTransporte : TransportationCategory
              }
              onChange={(e) => setTransporte(e.value)}
              styles={styles}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="actividadesInfantiles">
              <img
                src={infantilesIcono}
                className="categoryImage"
                alt="Inf"
              ></img>
              {filtrarTraduccion(
                traduccionesBD,
                'preferencesChildrensActivitiesLabel',
                lenguage
              )}
            </label>
            <Select
              className="selectProfile"
              defaultValue={{
                value: pefilExistente?.actividadesInfantiles,
                label: pefilExistente?.actividadesInfantiles,
              }}
              options={
                language === 'es'
                  ? CategoriaActividadesInfantiles
                  : ChildrensActivitiesCategory
              }
              onChange={(e) => setActividadesInfantiles(e.value)}
              styles={styles}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="serviciosEsenciales">
              <img
                src={serviciosIcono}
                className="categoryImage"
                alt="Ser"
              ></img>
              {filtrarTraduccion(
                traduccionesBD,
                'preferencesEssentialsServicesLabel',
                lenguage
              )}
            </label>
            <Select
              className="selectProfile"
              defaultValue={{
                value: pefilExistente?.serviciosEsenciales,
                label: pefilExistente?.serviciosEsenciales,
              }}
              options={
                language === 'es'
                  ? CategoriaServiciosEsenciales
                  : EssentialServicesCategory
              }
              onChange={(e) => setServiciosEsenciales(e.value)}
              styles={styles}
            />
          </div>
          <input
            type="submit"
            value={filtrarTraduccion(
              traduccionesBD,
              'prefrencesbtnSendValue',
              lenguage
            )}
            className="btn-enviar "
          />
        </form>
        <div className="linkALoginPreferencias">
          <div className="submiMessage">{`${submitMessage}`}</div>
          <Link to="/user">
            {filtrarTraduccion(traduccionesBD, 'preferencesBackText', lenguage)}
          </Link>
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

export default UserPreferences;
