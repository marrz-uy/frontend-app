import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layout } from '../Layout';
import AuthUser from '../Components/AuthUser';
import '../Css/Register.css';
import { BAD_REQUEST, SERVIDOR_APAGADO } from '../Data/HTTPResponseStatusCodes';

const Register = ({ setPage }) => {
  setPage('register');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [name, setName] = useState('');
  const [registerErrorMessage, setRegisterErrorMessage] = useState('');

  const navigate = useNavigate();

  const { http } = AuthUser();

  const submitRegister = (e) => {
    e.preventDefault();
    console.log(email, password, passwordConfirmation, name);

    http
      .post('/register', { email, password, passwordConfirmation, name })
      .then((res) => {
        console.log('RESPUESTA:', res.data);
        setRegisterErrorMessage('El Usuario se registro correctamente');
        setTimeout(() => {
          
        }, 3000);
        navigate('/login');
      })
      .catch(function (error) {
        if (error.response.status === SERVIDOR_APAGADO) {
          setRegisterErrorMessage('Servidor apagado');
        }
        if (
          email === '' &&
          password === '' &&
          passwordConfirmation === '' &&
          name === ''
        ) {
          setRegisterErrorMessage('Todos los campos son obligatorios');
        } else if (email === '') {
          setRegisterErrorMessage(error.response.data.email);
        } else if (password === '') {
          setRegisterErrorMessage(error.response.data.password);
        } else if (passwordConfirmation === '') {
          setRegisterErrorMessage(error.response.data.passwordConfirmation);
        } else if (name === '') {
          setRegisterErrorMessage(error.response.data.name);
        } else {
          if (password.length < 8) {
            setRegisterErrorMessage(error.response.data.password);
          } else if (passwordConfirmation !== password) {
            setRegisterErrorMessage(error.response.data.passwordConfirmation);
          } else if (name.length < 2) {
            setRegisterErrorMessage(error.response.data.name);
          } else if (error.response.status === BAD_REQUEST) {
            setRegisterErrorMessage(error.response.data.email);
          }
        }
        return registerErrorMessage;
      });
  };

  return (
    <Layout>
      <div className="register">
        <form onSubmit={submitRegister}>
          <div>
            <h2 className="title">Registrarse</h2>
          </div>
          <div className="message">{`${registerErrorMessage}`}</div>
          <div className="inputGroup">
            <input
              className="input"
              type="text"
              name="email"
              placeholder="Email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="input"
              type="password"
              name="passwordConfirm"
              placeholder="Confirmacion de Password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <input
              className="input"
              type="text"
              name="name"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input type="submit" value="Registro" className="btn-register" />
          </div>
          <div className="linkALogin">
            <Link to="/login">Volver al login</Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
