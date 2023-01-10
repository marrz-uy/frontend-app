import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import useScreenSize from '../Helpers/ScreenSize';
import '../Css/Layout.css';

const Layout = (props) => {
	const {width, height } = useScreenSize()
	console.log(width, height)
  return (
    <div className="layout"
		// style={{minHeigth:height}}
		>
      {props.children}
      <Footer />
    </div>
  );
};

export { Layout, Nav, Footer };
