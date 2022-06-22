import React, {memo} from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layout } from '../Layout';
import AuthUser from '../Components/AuthUser';
import PropTypes from 'prop-types';
import '../Css/Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const { http } = AuthUser();

  const submitRegister = (e) => {
    e.preventDefault();
    http.post('/register', { email, password, name }).then((res) => {
      navigate('/login');
    });
  };

const text = 'Por favor, ingresa algo';

const getRegExp = (type) => {
  let regx = null;
  switch (type) {
    case 'email':
      regx = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      break;
    case 'password':
      regx = /^.{8,20}$/;// 8 a 20 digitos
      break;
    case 'name':
      regx = /^[a-zA-ZÀ-ÿ\s]{1,40}$/ // Letras y espacios, pueden llevar acentos
      break;
    default:
        console.log(text);
      break;
  }
  return regx;
}

const validationHandlerName = (e, props) => {
  if (!props.onValidateFunc) return;
 
  const { value, name } = e.target;
  let msg = null;
 
  if (!value && props.isReq) {
    msg = `Por favor, ingrese ${props.title}.`;
  } else if (value && props.reqType && !getRegExp(props.reqType).test(value)) {
    msg = `El nombre debe tener entre 1 y 40 letras ${props.title}.`;
  }
 
  props.onValidateFunc(msg, name);
}

const validationHandlerEmail = (e, props) => {
  if (!props.onValidateFunc) return;
 
  const { value, email } = e.target;
  let msg = null;
 
  if (!value && props.isReq) {
    msg = `Por favor, ingrese ${props.title}.`;
  } else if (value && props.reqType && !getRegExp(props.reqType).test(value)) {
    msg = `El mail debe ser un mail valido ${props.title}.`;
  }
 
  props.onValidateFunc(msg, email);
}

const validationHandlerPassword = (e, props) => {
  if (!props.onValidateFunc) return;
 
  const { value, password } = e.target;
  let msg = null;
 
  if (!value && props.isReq) {
    msg = `Por favor, ingrese ${props.title}.`;
  } else if (value && props.reqType && !getRegExp(props.reqType).test(value)) {
    msg = `La contraseña debe tener entre 8 y 20 digitos ${props.title}.`;
  }
 
  props.onValidateFunc(msg, password);
}

  return (
    <Layout>
      <div className="register">
        <form onSubmit={submitRegister}>
          <div>
            <h2 className='title'>Registrarse</h2>
          </div>
          <div className="inputGroup">
            <input
              className="input"
              type="email"
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
