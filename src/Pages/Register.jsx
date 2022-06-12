import React from 'react'
import { useState  } from 'react'
import { useNavigate, Link } from "react-router-dom"
import { Layout } from '../Layout'
import AuthUser from '../Components/AuthUser'
import '../Css/Register.css';

const Register = () => {

	const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const { http} = AuthUser();

  const submitRegister = (e) => {
    e.preventDefault();
    http
      .post('/register', {email, password, name })
      .then((res) => {
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
	)
}

export default Register;