import { Link } from 'react-router-dom';
import { useState } from 'react';
import InputGroup from '../components/InputGroup';
import Error from './Error';
import '../App.css';
import AuthUser from './AuthUser';
import { useNavigate } from 'react-router-dom';

const Form = ({ app }) => {
  const value2 = [];
  const [value, setValue] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(false);

  const handleSet = ([v, b]) => {
    value2.push(b);
    setValue({
      ...value,
      [v]: value2[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (app === 'login') {
      if ([value.email, value.password].includes('')) {
        setError(true);
        return;
      }
    } else {
      if ([value.name, value.email, value.password].includes('')) {
        setError(true);
        return;
      }
    }
    setError(false);
    console.log('VALORES:', value.email, '-', value.password);
    return;
  };

  const { http, setToken } = AuthUser();

  const submitLogin = () => {
    http
      .post('/login', { email: value.email, password: value.password })
      .then((res) => {
        console.log(res.data);
        setToken(res.data.user, res.data.access_token);
      });
  };

  const navigate = useNavigate();

  const submitRegister = () => {
    http
      .post('/register', {
        email: value.email,
        password: value.password,
        name: value.name,
      })
      .then((res) => {
        navigate('/login');
      });
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        {error && <Error />}

        {app === 'register' ? (
          <InputGroup icon="name" value={value} handleSet={handleSet} />
        ) : (
          ''
        )}
        <InputGroup icon="email" value={value} handleSet={handleSet} />
        <InputGroup icon="password" value={value} handleSet={handleSet} />
        <input
          type="submit"
          value={app === 'register' ? 'Registrarse' : 'Iniciar sesion'}
          className="btn-login"
          onClick={app === 'login' ? submitLogin : submitRegister}
        />
        <br />
        {app === 'login' ? (
          <Link to="/register">Necesitas una cuenta?</Link>
        ) : (
          <Link to="/">Volver al login</Link>
        )}
      </form>
    </>
  );
};

export default Form;
