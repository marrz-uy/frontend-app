import React from 'react';
import Select from 'react-select';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthUser from '../Components/AuthUser';
import { Layout } from '../Layout';
import '../Css/UserProfile.css';
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

const UserProfile = ({ setPage }) => {
  useEffect(() => {
    setPage('profile');
  }, [setPage]);

  const preferenciasArray = [];

  const [nacionalidad, setNacionalidad] = useState('');
  const [fechaDeNacimiento, setFechaDeNacimiento] = useState('');
  const [preferencia, setPreferencia] = useState([...preferenciasArray]);

  const handlePreferencias = (selectedOption) => {
    const nuevaPreferencia = {
      id: selectedOption.id,
      categoria: selectedOption.categoria,
      value: selectedOption.value,
      label: selectedOption.label,
    };

    //! agregar nueva preferencia a prefrenciasArray
    // preferenciasArray.push(nuevaPreferencia)

    setPreferencia([...preferencia, nuevaPreferencia]);
    //! ver preferenciasArray
    // console.log('preferenciasArray2:', preferenciasArray);
  };

  // const regex = new RegExp('"', 'g');
  const preferencias = JSON.stringify(preferencia);

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

  const { http, getUser, setUserProfile } = AuthUser();

  const user_id = getUser().id;

  const f_nacimiento = fechaDeNacimiento;

  const submitUserProfile = (e) => {
    e.preventDefault();
    console.group(
      '%cPARAMETROS A ENVIAR: ',
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
          'color: green;',
          res.data.message
        );
        console.log(
          '%cPERFIL RESPONSE:',
          'color: green;',
          res.data.userprofile
        );
        console.groupEnd();
        setUserProfile(res.data.userprofile);
      })
      .catch(function (error) {
        console.log('%cERROR:', 'color: red;', error.message);
      });
  };

  return (
    <Layout>
      <div className="userProfile">
        <div>
          <h2 className="title">Perfil de Usuario</h2>
        </div>
        <form onSubmit={submitUserProfile}>
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
            <label htmlFor="alojamiento">Alojamiento </label>

            <Select
              options={CategoriaAlojamiento}
              styles={styles}
              onChange={handlePreferencias}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="gastronomia">Gastronomia</label>

            <Select
              options={CategoriaGastronomia}
              styles={styles}
              onChange={handlePreferencias}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="espectaculos">Espectaculos</label>

            <Select
              options={CategoriaEspectaculos}
              styles={styles}
              onChange={handlePreferencias}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="actividadesAlAireLibre">
              Actividades Al Aire Libre
            </label>
            <Select
              options={CategoriaActividadesAlAireLibre}
              styles={styles}
              onChange={handlePreferencias}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="actividadesNocturnas">Actividades Nocturnas</label>
            <Select
              options={CategoriaActividadesNocturnas}
              styles={styles}
              onChange={handlePreferencias}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="transporte">Transporte</label>
            <Select
              options={CategoriaTransporte}
              styles={styles}
              onChange={handlePreferencias}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="actividadesInfantiles">
              Actividades Infantiles
            </label>
            <Select
              options={CategoriaActividadesInfantiles}
              styles={styles}
              onChange={handlePreferencias}
            />
          </div>
          <div className="selectIndividual">
            <label htmlFor="serviciosEsenciales">Servicios Esenciales</label>
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

export default UserProfile;
