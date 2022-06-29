import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthUser from '../Components/AuthUser'
import { Layout } from '../Layout'
import '../Css/Login.css'

const Login = ({setIsLoggedIn, setPage}) => {

  useEffect(() => {
    setPage('login')
  }, [setPage])

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { http, setToken } = AuthUser();
  const navigate = useNavigate();

  const submitLogin = (e) => {
    e.preventDefault();
    http.post('/login', { email, password }).then((res) => {
      // console.log(res.data);
      setToken(res.data.user, res.data.access_token);
      setIsLoggedIn('true')
      navigate('/');
    })
    // setIsLoggedIn('true')
    
  };

  return (
    <Layout>
      <div className="login">
        <form onSubmit={submitLogin}>
          <div>
            <h2 className='title'>Login</h2>
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
            <input type="submit" value="Login" className="btn-login" />
          </div>
          <div className="linkAregistro">
            <Link to="/register">Necesitás una cuenta?</Link>
          </div>
          <div className="salir">
            <Link to="/">
              <button className='btn-cerrar'>Cerrar</button>
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
