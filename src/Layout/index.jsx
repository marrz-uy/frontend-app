import React from 'react';
import Nav from './Nav';
import Footer from './Footer'
import '../Css/Layout.css';

const Layout = (props) => <div className="layout">{props.children}</div>;

export { Layout, Nav, Footer };
