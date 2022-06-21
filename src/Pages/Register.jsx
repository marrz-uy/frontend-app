import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layout } from '../Layout';
import AuthUser from '../Components/AuthUser';
import '../Css/Register.css';
<script type='text/javascripit' src='../Pages/validation.js'></script>

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

  return (
    <Layout>
      <div className="register">
        <form onSubmit={submitRegister}>
          
          <div>
            <h2>Registrarse</h2>
          </div>

          <div className="inputGroup">

          <div class='message' className='errorMessage'>
              <p id="errorMessageEmail">
                El email debe ser un mail valido 
              </p>
         </div>

            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

        <div class='message' className='errorMessage'>
              <p id="errorMessagePassword">
                La contraseña debe tener mínimo 8 caracteres, como máximo 20 caracteres, con al menos 1 letra, 1 número y 1 carácter especial 
              </p>
        </div>

            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div class='message' className='errorMessage'>
              <p id="errorMessageName">
                El nombre debe tener mínimo 4 caracteres, como máximo 16 caracteres, con al menos 1 letra 
              </p>
            </div>

            <input
              className="input"
              type="text"
              name="name"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div class='message' className='errorMessageSubmit'>
              <p id="errorMessageSubmit">
                Error al registrarse, por favor revise los campos, y vuelva a intentarlo 
              </p>
            </div>

            <div class='message' className='successMessageSubmit'>
              <p id="successMessageSubmit">
                ¡Te has registrado con éxito!  
              </p>
            </div>

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

