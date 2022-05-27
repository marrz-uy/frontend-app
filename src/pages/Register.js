import React from 'react';
import Waves from '../components/Waves';
import LoginData from '../components/LoginData';
import '../App.css';

const Register = () => {
  return (
    <main className="login-design">
      <Waves />
      <div className="login">
        <LoginData app="register" />
      </div>
    </main>
  );
};

export default Register;
