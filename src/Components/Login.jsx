import React from 'react';
import { useState } from 'react';
import AuthUser from './AuthUser';
import { Link } from 'react-router-dom';
import '../css/Login.css';

const Login = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { http, setToken } = AuthUser();

  const submitLogin = (e) => {
    e.preventDefault();
    http
      .post('/login', { email, password })
      .then((res) => {
        console.log(res.data);
        setToken(res.data.user, res.data.access_token);       
      });      
  };
  return (
    <div className="login">
      <form onSubmit={submitLogin}>
        <div>
          <h2>Logearse</h2>
        </div>
        <div className="inputGroup">
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input onClick={closeModal} type="submit" value="Login" className="btn-login" />
        </div>
        <div className="linkAregistro">
          <Link to="/register">Necesitas una cuenta?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
