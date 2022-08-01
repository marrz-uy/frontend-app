import React from 'react';
import Select from 'react-select';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthUser from '../Components/AuthUser';
import { Layout } from '../Layout';
import '../Css/UserPreferences.css';
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

import alojamiento from '../Assets/categoriesImages/hospedaje.png';
import gastronomia from '../Assets/categoriesImages/fast-food 1.png';
import airelibre from '../Assets/categoriesImages/hiking 1.png';
import transporte from '../Assets/categoriesImages/bus.png';
import espectaculos from '../Assets/categoriesImages/teatro 1.png';
import nocturna from '../Assets/categoriesImages/cocktail 1.png';
import infantiles from '../Assets/categoriesImages/calesita 1.png';
import servicios from '../Assets/categoriesImages/services 1.png';
import { traerPreferencias } from '../Helpers/TraerPreferencias';
import { filterData } from '../Helpers/FilterByCategory';

const UserPreferences = ({ setPage, pefilRecuperado, setPefilRecuperado }) => {
  const { http, getUserProfile, getUser, saveUserProfile } = AuthUser();
  const preferenciasArray = [];
  const [nacionalidad, setNacionalidad] = useState('');
  const [fechaDeNacimiento, setFechaDeNacimiento] = useState('');
  const [preferencia, setPreferencia] = useState([...preferenciasArray]);
  const [user_id, setUser_id] = useState();
  const f_nacimiento = fechaDeNacimiento;
  const [submitMessage, setSubmitMessage] = useState('');

  // console.log('traerPreferencias()=>', traerPreferencias());

  useEffect(() => {
    setPage('preferences');
    try {
      setUser_id(getUser()?.id);
    } catch (error) {
      console.log('NO HAY NADIE LOGUEADO', error);
    }
  }, [setPage, getUser, user_id, setUser_id, pefilRecuperado]);

  const recuperarPerfil = () => {
    /* if (user_id !== null || user_id !== '') { */
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
      value: selectedOption.value,
      label: selectedOption.label,
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
          value: selectedOption.value,
          label: selectedOption.label,
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
          'Debe seleccionar al menos una categoria para poder ofrecerle una mejor experiencia en sus busquedas'
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

  const recuperarNacionalidaOnFocus = () => {
    if (nacionalidad) {
      setNacionalidad('');
    } else {
      setNacionalidad(getUser()?.profile?.nacionalidad);
    }
  };

  const recuperarFechaNacimientoOnFocus = () => {
    if (f_nacimiento) {
      setFechaDeNacimiento('');
    } else {
      setFechaDeNacimiento(getUser()?.profile?.f_nacimiento);
    }
  };

  return (
    <Layout>
      <div className="userProfile" onLoad={recuperarPerfil}>
        <div>
          <h2 className="title">
            {pefilRecuperado?.preferencias === 'sin preferencias'
              ? 'Crear Perfil'
              : 'Mi Perfil'}
          </h2>
        </div>
        <form onSubmit={handleUserProfile}>
          <div className="nacionalidadYfchanacimiento">
            <div className="inputGroupPreferencias nacionalidad">
              <label htmlFor="nacionalidad">Nacionalidad</label>
              <input
                className="inputPreferencias"
                type="text"
                name="nacionalidad"
                autoFocus
                autoComplete="off"
                value={nacionalidad}
                onChange={(e) => setNacionalidad(e.target.value)}
                onFocus={recuperarNacionalidaOnFocus}
                required
              />
            </div>
            <div className="inputGroupPreferencias fecha">
              <label htmlFor="fechaDeNacimiento">Fecha de Nacimiento</label>
              <input
                className="inputPreferencias"
                id="fecha"
                type="date"
                name="fechaDeNacimiento"
                value={fechaDeNacimiento}
                onChange={(e) => setFechaDeNacimiento(e.target.value)}
                onFocus={recuperarFechaNacimientoOnFocus}
                required
              />
            </div>
          </div>
          <div>
            <h4 className="titlePreferencias">Mis Preferencias</h4>
          </div>
          <div className="selectIndividual">
            <label htmlFor="alojamiento">
              <img src={alojamiento} className="categoryImage" alt="hot"></img>
              Alojamiento
            </label>
            <Select
              defaultValue={filterData('Alojamiento')}
              options={CategoriaAlojamiento}
              styles={styles}
              onChange={handlePreferencias}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="gastronomia">
              <img src={gastronomia} className="categoryImage" alt="Res"></img>
              Gastronomia
            </label>
            <Select
              defaultValue={filterData('Gastronomia')}
              options={CategoriaGastronomia}
              styles={styles}
              onChange={handlePreferencias}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="espectaculos">
              <img src={espectaculos} className="categoryImage" alt="res"></img>
              Espectaculos
            </label>
            <Select
              defaultValue={filterData('Espectaculos')}
              options={CategoriaEspectaculos}
              styles={styles}
              onChange={handlePreferencias}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="actividadesAlAireLibre">
              <img src={airelibre} className="categoryImage" alt="Esp"></img>
              Actividades Al Aire Libre
            </label>
            <Select
              defaultValue={filterData('Actividades Al Aire Libre')}
              options={CategoriaActividadesAlAireLibre}
              styles={styles}
              onChange={handlePreferencias}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="actividadesNocturnas">
              <img src={nocturna} className="categoryImage" alt="Noc"></img>
              Actividades Nocturnas
            </label>
            <Select
              defaultValue={filterData('Actividades Nocturnas')}
              options={CategoriaActividadesNocturnas}
              styles={styles}
              onChange={handlePreferencias}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="transporte">
              <img src={transporte} className="categoryImage" alt="Tra"></img>
              Transporte
            </label>
            <Select
              defaultValue={filterData('Transporte')}
              options={CategoriaTransporte}
              styles={styles}
              onChange={handlePreferencias}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="actividadesInfantiles">
              <img src={infantiles} className="categoryImage" alt="Inf"></img>
              Actividades Infantiles
            </label>
            <Select
              defaultValue={filterData('Actividades Infantiles')}
              options={CategoriaActividadesInfantiles}
              styles={styles}
              onChange={handlePreferencias}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="serviciosEsenciales">
              <img src={servicios} className="categoryImage" alt="Ser"></img>
              Servicios Esenciales
            </label>
            <Select
              defaultValue={filterData('Servicios Esenciales')}
              options={CategoriaServiciosEsenciales}
              styles={styles}
              onChange={handlePreferencias}
            />
          </div>
          <input type="submit" value="Enviar" className="btn-enviar " />
        </form>
        <div className="linkALoginPreferencias">
          <div className="submiMessage">{`${submitMessage}`}</div>
          <Link to="/user">Volver atras</Link>
        </div>
      </div>
    </Layout>
  );
};

export default UserPreferences;
