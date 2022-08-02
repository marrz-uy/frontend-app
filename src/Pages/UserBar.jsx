import React from 'react';
import { Layout } from '../Layout';
import '../Css/UserBar.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const UserBar = () => {
  const [lenguage, setLenguage] = useState('Spanish');

  const handleLenguage = () => {
    if (lenguage === 'Spanish') {
      localStorage.setItem('lenguage', 'English');
    } else {
      localStorage.setItem('lenguage', 'Spanish');
    }
    setLenguage(localStorage.getItem('lenguage'));
  };

  return (
    <Layout>
      <nav className="userBar">
        <div className="animate__animated animate__slideInRight animate__faster">
          <ul className="userBar__link">
            <li>
              <Link to="/register">Registrarse</Link>
            </li>
            <li>
              <Link to="/login">Iniciar Sesion</Link>
            </li>
            <li onClick={handleLenguage}>
              <p>Cambiar idioma</p>
              {lenguage === 'Spanish' ? (
                <img
                  src="https://img.icons8.com/officel/80/000000/uruguay.png"
                  alt="img"
                />
              ) : (
                <img
                  src="https://img.icons8.com/office/80/000000/great-britain.png"
                  alt="img"
                />
              )}
            </li>
          </ul>
        </div>
      </nav>
    </Layout>
  );
};
export default UserBar;
