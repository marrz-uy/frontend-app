import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';
import LenguageContext from '../Context/LenguageContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import FeelUy from '../images/feel2.png';
import '../Css/Footer.css';
import '../Css/NewFooter.css';

const Footer = () => {
  const { traduccionesBD, lenguage } = useContext(LenguageContext);

  return (
    <footer className="pie-pagina">
      <div className="grupo-1">
        <div className="box2">
          <figure>
            <a href="#">
              <img src={FeelUy} alt="" />
            </a>
          </figure>
        </div>
        <div className="box2 redirectFaq">
          <Link to="/faq" className="redirectToFaq">
            <h2>
              {filtrarTraduccion(
                traduccionesBD,
                'PreguntasFrecuentes',
                lenguage
              )}
            </h2>
            <FontAwesomeIcon icon={faCircleQuestion} className="iconFaq" />
          </Link>
        </div>
        <div className="box2 siguenos">
          <h2>{filtrarTraduccion(traduccionesBD, 'Siguenos', lenguage)}</h2>
          <div className="red-social">
            <a
              href="https://www.instagram.com/feeluruguay/"
              className="fa fa-instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100091526935097&mibextid=LQQJ4d"
              className="fa fa-twitter"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href="mailto:marrz2022@gmail.com?Subject=Aplicacion%20Web"
              className="fa fa-youtube"
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </div>
        </div>
      </div>
      <div className="grupo-2">
        <small>
          &copy; 2022 <b>MARRZ</b> -{' '}
          {filtrarTraduccion(
            traduccionesBD,
            'TodosDerechosReservados',
            lenguage
          )}
        </small>
      </div>
    </footer>
  );
};

export default Footer;
