import React, { useContext } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import PageContext from '../Context/PageContext';
import '../Css/Layout.css';

const Layout = (props) => {
  const { activePage, backGround } = useContext(PageContext);
  console.log('ACTIVE PAGE: ', activePage);
  // console.log('BACKGROUND: ', backGround)

  return (
    <div className="layout" style={{ backgroundImage: `url(${backGround})` }}>
      {props.children}
      <Footer />
    </div>
  );
};

export { Layout, Nav, Footer };
