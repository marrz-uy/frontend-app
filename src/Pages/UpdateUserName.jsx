import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layout } from '../Layout';
import AuthUser from '../Components/AuthUser';
import LenguageContext from '../Context/LenguageContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import { SERVIDOR_APAGADO } from '../Data/HTTPResponseStatusCodes';
import UserBar from './UserBar';
import { handleUserBar } from '../Helpers/HandUserBarClick';
import '../Css/Register.css';
import '../Css/userBarClick.css';

const UpdateUserData = ({
  setPage,
  userBar,
  setIsLoggedIn,
  isLoggedIn,
  setUserBar,
}) => {
  useEffect(() => {
    setPage('updateUserName');
  }, [setPage]);
  const [name, setName] = useState('');
  const [registerErrorMessage, setRegisterErrorMessage] = useState('');
  const navigate = useNavigate();
  const { http } = AuthUser();
  const { traduccionesBD, lenguage } = useContext(LenguageContext);
  const Id = sessionStorage.getItem('id');

  const submitUpdateName = (e) => {
    e.preventDefault();
    http
      .patch(`/updateName/${Id}`, { name })
      .then((res) => {
        console.log('RESPUESTA:', res.data.user);
        setRegisterErrorMessage('El Usuario se actualizo correctamente');
        sessionStorage.setItem('user', res.data.user.name);
        navigate('/user');
      })
      .catch(function (error) {
        if (error.response.status === SERVIDOR_APAGADO) {
          setRegisterErrorMessage('Servidor apagado');
        }

        if (name === '') {
          setRegisterErrorMessage('Todos los campos son obligatorios');
        }

        if (name.length < 2) {
          setRegisterErrorMessage(error.response.data.name);
        }

        return registerErrorMessage;
      });
  };

  handleUserBar(userBar);

  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>
      <div className="register">
        <form onSubmit={submitUpdateName}>
          <div>
            <h2 className="title">
              {filtrarTraduccion(traduccionesBD, 'nameUpdateTitle', lenguage)}
            </h2>
          </div>
          <div className="message">{`${registerErrorMessage}`}</div>
          <div className="inputGroup">
            <input
              className="input"
              type="text"
              name="name"
              placeholder={filtrarTraduccion(
                traduccionesBD,
                'registerNamePlaceholder',
                lenguage
              )}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="submit"
              value={filtrarTraduccion(traduccionesBD, 'updateLabel', lenguage)}
              className="btn-register"
            />
          </div>
          <div className="linkALogin">
            <Link to="/user">
              {filtrarTraduccion(traduccionesBD, 'backToUserProfile', lenguage)}
            </Link>
          </div>
        </form>
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

export default UpdateUserData;
