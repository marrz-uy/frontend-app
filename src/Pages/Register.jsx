import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layout } from '../Layout';
import AuthUser from '../Components/AuthUser';
import '../Css/Register.css';
import { BAD_REQUEST, SERVIDOR_APAGADO } from '../Data/HTTPResponseStatusCodes';

const Register = ({ setPage }) => {
  useEffect(() => {
    setPage('register');
  }, [setPage]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [registerErrorMessage, setRegisterErrorMessage] = useState('');

  const navigate = useNavigate();

  const { http } = AuthUser();

  const submitRegister = (e) => {
    e.preventDefault();
    http
      .post('/register', { email, password, name })
      .then((res) => {
        //console.log('RESPUESTA:', res.data);
        navigate('/login');
      })
      .catch(function (error) {
        //console.log('RESP:', error.response.status);

        if (error.response.status === SERVIDOR_APAGADO) {
          //console.log('STATUS:',error.response.status)
          setRegisterErrorMessage('Server off');
        }

        if (email === '' && password === '' && name === '') {
          setRegisterErrorMessage(
            error.response.data.email +
              ' and ' +
              error.response.data.password +
              ' and ' +
              error.response.data.name
          );
        } else if (email === '') {
          setRegisterErrorMessage(error.response.data.email);
        } else if (password === '') {
          setRegisterErrorMessage(error.response.data.password);
        } else if (name === '') {
          setRegisterErrorMessage(error.response.data.name);
        } else {
          if (password.length < 8) {
            setRegisterErrorMessage(error.response.data.password);
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
