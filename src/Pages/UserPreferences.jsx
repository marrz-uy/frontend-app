import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import AuthUser from '../Components/AuthUser';
import { Layout } from '../Layout';
import LenguageContext from '../Context/LenguageContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
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
import alojamiento from '../Assets/categoriesImages/hospedaje.png';
import gastronomia from '../Assets/categoriesImages/fast-food 1.png';
import airelibre from '../Assets/categoriesImages/hiking 1.png';
import transporte from '../Assets/categoriesImages/bus.png';
import espectaculos from '../Assets/categoriesImages/teatro 1.png';
import nocturna from '../Assets/categoriesImages/cocktail 1.png';
import infantiles from '../Assets/categoriesImages/calesita 1.png';
import servicios from '../Assets/categoriesImages/services 1.png';
import { filterData } from '../Helpers/FilterByCategory';
import '../Css/UserPreferences.css';
import UserBar from './UserBar';
import '../Css/userBarClick.css';
import { handleUserBar } from '../Helpers/HandUserBarClick';

const UserPreferences = ({
  setPage,
  pefilRecuperado,
  setPefilRecuperado,
  setUserBar,
  userBar,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  const { http, getUserProfile, getUser, saveUserProfile } = AuthUser();
  const preferenciasArray = [];
  const [nacionalidad, setNacionalidad] = useState('');
  const [fechaDeNacimiento, setFechaDeNacimiento] = useState('');
  const [preferencia, setPreferencia] = useState([...preferenciasArray]);
  const [user_id, setUser_id] = useState();
  const f_nacimiento = fechaDeNacimiento;
  const [submitMessage, setSubmitMessage] = useState('');
  const { traduccionesBD, lenguage } = useContext(LenguageContext);
  const [language, setLenguage] = useState('');

  useEffect(() => {
    setPage('preferences');
    setLenguage(localStorage.getItem('language'));
    try {
      setUser_id(sessionStorage?.getItem('id'));
    } catch (error) {
      console.log('NO HAY NADIE LOGUEADO', error);
    }
  }, [
    setPage,
    getUser,
    user_id,
    setUser_id,
    pefilRecuperado,
    setLenguage,
    language,
  ]);

  const recuperarPerfil = () => {
    if (user_id) {
      try {
        setPefilRecuperado(getUserProfile());
      } catch (error) {
        console.log('NO HAY PERFIL', error);
      }
    }
  };

  const addPreferencia = (selectedOption) => {
    const nuevaPreferencia = {
      id: selectedOption.id,
      categoria: selectedOption.categoria,
      category: selectedOption.category,
      value: selectedOption.value,
      label: selectedOption.label,
      labelEng: selectedOption.labelEng,
      labelEsp: selectedOption.labelEsp,
    };
    setPreferencia([...preferencia, nuevaPreferencia]);
  };

  const updatePreferencia = (selectedOption) => {
    const nuevaPreferencia = preferencia.map((prefe) => {
      if (prefe.categoria === selectedOption.categoria) {
        return {
          ...prefe,
          id: selectedOption.id,
          categoria: selectedOption.categoria,
          category: selectedOption.category,
          value: selectedOption.value,
          label: selectedOption.label,
          labelEng: selectedOption.labelEng,
          labelEsp: selectedOption.labelEsp,
        };
      }
      return prefe;
    });
    setPreferencia(nuevaPreferencia);
  };

  const handlePreferencias = (selectedOption) => {
    if (preferencia.some((e) => e.categoria === selectedOption.categoria)) {
      updatePreferencia(selectedOption);
    } else {
      addPreferencia(selectedOption);
    }
  };

  const preferencias = JSON.stringify(preferencia);

  const updateUserProfile = () => {
    console.group('%cSOLICITUD CORRECTA', 'color: green');
    console.log(
      '%cDATOS UPDATE ENVIADOS: ',
      'color: blue;',
      user_id,
      nacionalidad,
      f_nacimiento,
      preferencias
    );
    http
      .patch(`/userProfile/${user_id}`, {
        nacionalidad,
        f_nacimiento,
        preferencias,
      })
      .then((res) => {
        console.log(
          '%cUPDATE PERFIL RESPONSE MESSAGE:',
          'color: orange;',
          res.data.message
        );
        console.log(
          '%cUPDATE PERFIL RESPONSE .DATA:',
          'color: blue;',
          res.data.user
        );
        console.groupEnd();
        if (res.data.message !== 'NO EXISTE PERFIL PARA EL USUARIO') {
          console.log(
            '%cDATOS UPDATE A GUARDAR EN SESSIONSTORAGE',
            'color: pink;',
            res.data.user
          );
          saveUserProfile(res.data.user);
          recuperarPerfil();
        }
      })
      .catch(function (error) {
        console.group('%cERRORES', 'color: red;');
        console.log('%cERROR:', 'color: red;', error.message);
        console.groupEnd();
      });
  };

  const submitUserProfile = () => {
    console.group('%cSOLICITUD CORRECTA', 'color: green');
    console.log(
      '%cDATOS ENVIADOS: ',
      'color: blue;',
      user_id,
      nacionalidad,
      f_nacimiento,
      preferencias
    );
    http
      .post('/userProfile', {
        user_id,
        nacionalidad,
        f_nacimiento,
        preferencias,
      })
      .then((res) => {
        console.log(
          '%cPERFIL RESPONSE MESSAGE:',
          'color: blue;',
          res.data.message
        );
        console.log('%cPERFIL RESPONSE:', 'color: blue;', res.data.userprofile);
        console.groupEnd();
        saveUserProfile(res.data.userprofile);
        recuperarPerfil();
      })
      .catch(function (error) {
        console.group('%cERRORES', 'color: red;');
        console.log('%cERROR:', 'color: red;', error);
        console.groupEnd();
      });
  };

  const handleUserProfile = (e) => {
    e.preventDefault();
    recuperarPerfil();
    const sinPreferencias = '{}';

    if (pefilRecuperado === sinPreferencias) {
      if (preferencias.length < 3) {
        alert(
          'No selecciono ninguna preferencia de categoria,',
          'seleccione alguna para obtener resultados personalizados en sus busquedas'
        );
      }
      submitUserProfile();
      setPefilRecuperado(getUserProfile());
    } else {
      if (preferencias.length < 3) {
        alert(
          'Las preferencias antiguas se muestran pero no se seleccionan, debe seleccionar al menos una categoria para poder ofrecerle una mejor experiencia en sus busquedas'
        );
        return;
      }
      updateUserProfile();
      setPefilRecuperado(getUserProfile());
    }

    setSubmitMessage('Perfil guardado correctamente');
  };

  const styles = {
    control: (_, { selectProps: { placeholder } }) => ({
      height: 20,
      width: '100%',
      maxWidth: 450,
      backgroundColor: 'rgba(255,255,255)',
      display: 'flex',
      border: '1px solid rgba(190,190,190)',
      borderRadius: '5px',
      boxShadow: '2px 2px 2px rgba(0,0,0, 0.4)',
      fontSize: 10,
      lineHeight: 1.09,
      placeholder: placeholder,
    }),
  };
  handleUserBar(userBar);

  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>
      <div className="userProfile" onLoad={recuperarPerfil}>
        <div>
          <h2 className="title">
            {pefilRecuperado?.preferencias === ''
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
              <input
                className="inputPreferencias"
                type="text"
                name="nacionalidad"
                autoFocus
                autoComplete="off"
                value={nacionalidad}
                onChange={(e) => setNacionalidad(e.target.value)}
                required
              />
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
              <img src={alojamiento} className="categoryImage" alt="hot"></img>
              {filtrarTraduccion(
                traduccionesBD,
                'preferencesLodginLabel',
                lenguage
              )}
            </label>
            <Select
              defaultValue={filterData('Alojamiento')}
              options={
                language === 'es' ? CategoriaAlojamiento : LodginCategory
              }
              styles={styles}
              onChange={handlePreferencias}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="gastronomia">
              <img src={gastronomia} className="categoryImage" alt="Res"></img>
              {filtrarTraduccion(
                traduccionesBD,
                'preferencesGastronomyLabel',
                lenguage
              )}
            </label>
            <Select
              defaultValue={filterData('Gastronomia')}
              options={
                language === 'es' ? CategoriaGastronomia : GastronomyCategory
              }
              styles={styles}
              onChange={handlePreferencias}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="espectaculos">
              <img src={espectaculos} className="categoryImage" alt="res"></img>
              {filtrarTraduccion(
                traduccionesBD,
                'preferencesShowsLabel',
                lenguage
              )}
            </label>
            <Select
              defaultValue={filterData('Espectaculos')}
              options={language === 'es' ? CategoriaEspectaculos : ShowCategory}
              styles={styles}
              onChange={handlePreferencias}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="actividadesAlAireLibre">
              <img src={airelibre} className="categoryImage" alt="Esp"></img>
              {filtrarTraduccion(
                traduccionesBD,
                'preferencesOutdoorActivitiesLabel',
                lenguage
              )}
            </label>
            <Select
              defaultValue={filterData('Actividades Al Aire Libre')}
              options={
                language === 'es'
                  ? CategoriaActividadesAlAireLibre
                  : OutdoorActivitiesCategory
              }
              styles={styles}
              onChange={handlePreferencias}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="actividadesNocturnas">
              <img src={nocturna} className="categoryImage" alt="Noc"></img>
              {filtrarTraduccion(
                traduccionesBD,
                'preferencesNightActivitiesLabel',
                lenguage
              )}
            </label>
            <Select
              defaultValue={filterData('Actividades Nocturnas')}
              options={
                language === 'es'
                  ? CategoriaActividadesNocturnas
                  : NightActivitiesCatergory
              }
              styles={styles}
              onChange={handlePreferencias}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="transporte">
              <img src={transporte} className="categoryImage" alt="Tra"></img>
              {filtrarTraduccion(
                traduccionesBD,
                'preferencesTransportLabellabel',
                lenguage
              )}
            </label>
            <Select
              defaultValue={filterData('Transporte')}
              options={
                language === 'es' ? CategoriaTransporte : TransportationCategory
              }
              styles={styles}
              onChange={handlePreferencias}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="actividadesInfantiles">
              <img src={infantiles} className="categoryImage" alt="Inf"></img>
              {filtrarTraduccion(
                traduccionesBD,
                'preferencesChildrensActivitiesLabel',
                lenguage
              )}
            </label>
            <Select
              defaultValue={filterData('Actividades Infantiles')}
              options={
                language === 'es'
                  ? CategoriaActividadesInfantiles
                  : ChildrensActivitiesCategory
              }
              styles={styles}
              onChange={handlePreferencias}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="serviciosEsenciales">
              <img src={servicios} className="categoryImage" alt="Ser"></img>
              {filtrarTraduccion(
                traduccionesBD,
                'preferencesEssentialsServicesLabel',
                lenguage
              )}
            </label>
            <Select
              defaultValue={filterData('Servicios Esenciales')}
              options={
                language === 'es'
                  ? CategoriaServiciosEsenciales
                  : EssentialServicesCategory
              }
              styles={styles}
              onChange={handlePreferencias}
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
