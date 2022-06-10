import React from 'react';
import '../App.css';

const Register = () => {
  return (
    <div className="register">
      <div>
        <h2>Login</h2>
      </div>
      <div className="inputGroup">
        <input className="input" type="email" name="email" id="email" />
        <input className="input" type="password" name="password" id="password" />
        <input className="input" type="text" name="name" id="name" />
        <input type="submit" value="Login" className="btn-login" />
      </div>
      <p></p>
    </div>
  );
};

export default Register;
