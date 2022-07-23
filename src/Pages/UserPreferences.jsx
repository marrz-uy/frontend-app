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

import hotelImg from '../Assets/categoriesImages/hospedaje.png';
import restaurant from '../Assets/categoriesImages/fast-food 1.png';
import airelibre from '../Assets/categoriesImages/hiking 1.png';
import transport from '../Assets/categoriesImages/bus.png';
import teatro from '../Assets/categoriesImages/teatro 1.png';
import nocturna from '../Assets/categoriesImages/cocktail 1.png';
import infantiles from '../Assets/categoriesImages/calesita 1.png';
import servicios from '../Assets/categoriesImages/services 1.png';

const UserPreferences = ({ setPage }) => {
  const { http, getUserProfile, getUser, saveUserProfile } = AuthUser();

  const preferenciasArray = [];
  const [nacionalidad, setNacionalidad] = useState('');
  const [fechaDeNacimiento, setFechaDeNacimiento] = useState('');
  const [preferencia, setPreferencia] = useState([...preferenciasArray]);
  const [user_id, setUser_id] = useState();
  const f_nacimiento = fechaDeNacimiento;
  const [pefilRecuperado, setPefilRecuperado] = useState({});
  console.log('PERFIL RECUPERADO1: ', pefilRecuperado);

  useEffect(() => {
    setPage('profile');
    try {
      setUser_id(getUser().id);
      console.log('ID RECUPERADO: ', user_id);
    } catch (error) {
      console.log('NO HAY NADIE LOGUEADO')
    }
  }, [setPage, getUser, user_id, setUser_id, pefilRecuperado] );

  //!Prueba1
  const recuperarPerfil = () => {
    if (user_id !== null || user_id !== '') {
      //! BORRAR
      // console.log('idddddd: ', user_id);
      try {
        setPefilRecuperado(getUserProfile());
        
        //*********************************************** */
        console.log('PERFIL RECUPERADO2: ',pefilRecuperado );
        
      } catch (error) {
        console.log('NO HAY PERFIL')
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
    console.log('CANT PREFERENCIAS: ', preferencia.length + 1);
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
      console.log('repetidoooooo');
      updatePreferencia(selectedOption);
    } else {
      console.log('nuevooooooooo');
      addPreferencia(selectedOption);
    }
  };

  console.log('PREFERENCIA: ', preferencia);
  const preferencias = JSON.stringify(preferencia) ;


//!OKKKK
  const updateUserProfile = () => {
    // e.preventDefault();
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
        if(res.data.message !== 'NO EXISTE PERFIL PARA EL USUARIO'){
          console.log('%cDATOS UPDATE A GUARDAR EN SESSIONSTORAGE', 'color: pink;',res.data)
          saveUserProfile(res.data.user);
          
        }
      })
      .catch(function (error) {
        console.group('%cERRORES', 'color: red;');
        console.log('%cERROR:', 'color: red;', error.message);
        console.groupEnd();
      });
  };

  const submitUserProfile = () => {
    // e.preventDefault();
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
      })
      .catch(function (error) {
        console.group('%cERRORES', 'color: red;');
        console.log('%cERROR:', 'color: red;', error);
        console.groupEnd();
      });
  };

  const handleUserProfile = (e) => {
    e.preventDefault();

    const sinPreferencias = "{\"preferencias\":\"SIN PREFERENCIAS\"}"
    console.log('sinPreferencias.preferencias: ',sinPreferencias.preferencias );
    console.log('pefilRecuperado3: ', JSON.parse(pefilRecuperado) );
    console.log('pefilRecuperado.preferencias: ', pefilRecuperado );

    if ( pefilRecuperado  === sinPreferencias) {

      console.log('INSERTAR PERFIL NUEVO');
      console.log('pefilRecuperado4: ',pefilRecuperado)
      submitUserProfile()
      setPefilRecuperado(getUserProfile());
      console.log('pefilRecuperado5: ',pefilRecuperado)
    } else {
      updateUserProfile()
      console.log('ACTUALIZARRRRRRRRRRRRRRRRR');
      console.log('pefilRecuperado6: ',pefilRecuperado)
      setPefilRecuperado(getUserProfile());
      console.log('pefilRecuperado7: ',pefilRecuperado)
    }
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

  return (
    <Layout>
      <div className="userProfile" onLoad={recuperarPerfil}>
        <div>
          <h2 className="title">
            {pefilRecuperado.preferencias === 'sin preferencias'
              ? 'Crear Perfil'
              : 'Mi Perfil'}
          </h2>
        </div>
        <form onSubmit={handleUserProfile} >
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
                placeholder="Fecha de Nacimiento"
                required
                value={fechaDeNacimiento}
                onChange={(e) => setFechaDeNacimiento(e.target.value)}
              />
            </div>
          </div>

          <div>
            <h4 className="titlePreferencias">Mis Preferencias</h4>
          </div>
          <div className="selectIndividual">
            <label htmlFor="alojamiento">
              <img src={hotelImg} className="categoryImage" alt="hot"></img>
              Alojamiento{' '}
            </label>

            <Select
              options={CategoriaAlojamiento}
              styles={styles}
              onChange={handlePreferencias}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="gastronomia">
              <img src={restaurant} className="categoryImage" alt="Res"></img>
              Gastronomia
            </label>
            <Select
              options={CategoriaGastronomia}
              styles={styles}
              onChange={handlePreferencias}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="espectaculos">
              <img src={teatro} className="categoryImage" alt="res"></img>
              Espectaculos
            </label>
            <Select
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
              options={CategoriaActividadesNocturnas}
              styles={styles}
              onChange={handlePreferencias}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="transporte">
              <img src={transport} className="categoryImage" alt="Tra"></img>
              Transporte
            </label>
            <Select
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
              options={CategoriaServiciosEsenciales}
              styles={styles}
              onChange={handlePreferencias}
            />
          </div>
          <input type="submit" value="Enviar" className="btn-enviar " />
        </form>
        <div className="linkALoginPreferencias">
          <Link to="/">Volver al Inicio</Link>
        </div>
      </div>
    </Layout>
  );
};

export default UserPreferences;
