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
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [registerErrorMessage, setRegisterErrorMessage] = useState('');
  const navigate = useNavigate();
  const { http } = AuthUser();
  const { textos, traduccionesBD, lenguage  } = useContext(LenguageContext);
  const userData = JSON.parse(sessionStorage.getItem('user'))


  const submitUpdateName = (e) => {
    e.preventDefault();
    http
      .patch(`/updatePassword/${userData.id}`, { password, passwordConfirmation })
      .then((res) => {
        console.log('RESPUESTA:', res.data.user);
        setRegisterErrorMessage('El Usuario se actualizo correctamente');
        sessionStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/user');
      })
      .catch(function (error) {
        if (error.response.status === SERVIDOR_APAGADO) {
          setRegisterErrorMessage('Servidor apagado');
        }

        if (password === '') {
          setRegisterErrorMessage('Todos los campos son obligatorios');
        }

        if (password.length < 8) {
          setRegisterErrorMessage(error.response.data.password);
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
            <h2 className="title">{filtrarTraduccion(traduccionesBD, 'passwordUpdateTitle', lenguage)}</h2>
          </div>
          <div className="message">{`${registerErrorMessage}`}</div>
          <div className="inputGroup">
            <input
              className="input"
              type="password"
              name="password"
              placeholder={filtrarTraduccion(traduccionesBD, 'registerPasswordPlaceholder', lenguage)}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="input"
              type="password"
              name="passwordConfirm"
              placeholder={filtrarTraduccion(
                traduccionesBD,
                'registerPasswordConfirmationPlaceholder',
                lenguage
              )}
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />

            <input type="submit" value={filtrarTraduccion(traduccionesBD, 'updateLabel', lenguage)}  className="btn-register" />
          </div>
          <div className="linkALogin">
            <Link to="/user">{filtrarTraduccion(traduccionesBD, 'backToUserProfile', lenguage)}</Link>
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