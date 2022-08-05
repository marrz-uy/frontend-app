import React, { useContext } from 'react';
import LenguageContext from '../Context/LenguageContext';
import '../Css/Footer.css';

const Footer = () => {
  const { textos } = useContext(LenguageContext);

  return (
    <div className="footer oculto">
      <div>
        <h6>&copy; FeelUy</h6>
      </div>

      <div>
        <h6>
          <a href="mailto:marrz2022@gmail.com?Subject=Aplicacion%20Web">
          {textos.contactText}
          </a>
        </h6>
      </div>
    </div>
  );
};

export default Footer;
