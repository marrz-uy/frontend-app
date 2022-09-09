import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layout } from '../Layout';
import AuthUser from '../Components/AuthUser';
import LenguageContext from '../Context/LenguageContext';
import '../Css/Register.css';
import '../Css/userBarClick.css';
import { BAD_REQUEST, SERVIDOR_APAGADO } from '../Data/HTTPResponseStatusCodes';
import UserBar from './UserBar';
import { handleUserBar } from '../Helpers/HandUserBarClick';

const UpdateUserData = ({
  setPage,
  userBar,
  setIsLoggedIn,
  isLoggedIn,
  setUserBar,
}) => {
  useEffect(() => {
    setPage('updateUserEmail');
  }, [setPage]);
  const [email, setEmail] = useState('');
  const [registerErrorMessage, setRegisterErrorMessage] = useState('');
  const navigate = useNavigate();
  const { http } = AuthUser();
  const { textos } = useContext(LenguageContext);

  const userData = JSON.parse(sessionStorage.getItem('user'))
  console.log('USERRRRRRRRRR:',userData.id)

  const submitUpdateEmail = (e) => {
    e.preventDefault();
    http
      .patch(`/updateEmail/${userData.id}`, { email })
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

        if (email === '') {
          setRegisterErrorMessage('Todos los campos son obligatorios');
        }

        if (error.response.status === BAD_REQUEST) {
          setRegisterErrorMessage(error.response.data.email);
        }

        return registerErrorMessage;
      });
  };

  handleUserBar(userBar);

  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>
      <div className="register">
        <form onSubmit={submitUpdateEmail}>
          <div>
            <h2 className="title">Actualizar Email</h2>
          </div>
          <div className="message">{`${registerErrorMessage}`}</div>
          <div className="inputGroup">
            <input
              className="input"
              type="text"
              name="email"
              placeholder={textos.registerEmailPlaceholder}
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input type="submit" value="Actualizar" className="btn-register" />
          </div>
          <div className="linkALogin">
            <Link to="/user">Volver a Perfil de Usuario</Link>
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
