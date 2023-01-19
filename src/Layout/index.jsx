import React, { useContext } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import PageContext from '../Context/PageContext';
import '../Css/Layout.css';

const Layout = (props) => {
  const { backGround } = useContext(PageContext);
  // console.log(activePage);

  return (
    <div className="layout" style={{ backgroundImage: `url(${backGround})` }}>
      {props.children}
      <Footer />
    </div>
  );
};

export { Layout, Nav, Footer };
