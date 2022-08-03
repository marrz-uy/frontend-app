import React, {useContext } from 'react';
import LenguageContext from '../Context/LenguageContext';
import { Layout } from '../Layout';
import '../Css/UserBar.css';
import { Link } from 'react-router-dom';

const UserBar = () => {
  const { textos, handleLenguage } = useContext(LenguageContext);

  return (
    <Layout>
      <nav className="userBar">
        <div className="animate__animated animate__slideInRight animate__faster">
          <ul className="userBar__link">
            <li>
              <Link to="/register">{textos.registerLabel}</Link>
            </li>
            <li>
              <Link to="/login">{textos.loginLabel}</Link>
            </li>
            <li onClick={handleLenguage}>
              <p>{textos.changeLanguageLabel}</p>
              <img
                src={textos.flag}
                alt="img"
              />
            </li>
          </ul>
        </div>
      </nav>
    </Layout>
  );
};
export default UserBar;
