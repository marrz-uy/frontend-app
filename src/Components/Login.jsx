import React from 'react';
import '../css/Login.css';

const Login = () => {
  return (
    <div className="login">
      <div>
        <h2>Login</h2>
      </div>
      <div className="inputGroup">
        <input className="input" type="email" name="email" id="email" />
        <input className="input" type="password" name="password" id="password" />
        <input type="submit" value="Login" className="btn-login" />
      </div>
      <p>Or Register</p>
    </div>
  );
};

export default Login;
