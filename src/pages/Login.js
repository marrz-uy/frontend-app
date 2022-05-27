import React from 'react';
import Waves from '../components/Waves';
import LoginData from '../components/LoginData';
import '../App.css';

const Login = () => {
  return (
    <main className="login-design">
      <Waves />
      <div className="login">
        <LoginData app="login" />
      </div>
    </main>
  );
};

export default Login;
