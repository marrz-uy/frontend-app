import React, { useContext } from 'react';
/* import InstagramSvg from '../Assets/instagram.svg';
import FacebookSvg from '../Assets/facebook.svg';
import CorreoSvg from '../Assets/envelope-solid.svg'; */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import '../Css/Footer.css';
import '../Css/NewFooter.css';
import FeelUy from '../images/feel2.png';
import { Link } from 'react-router-dom';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import LenguageContext from '../Context/LenguageContext';

const Footer = () => {
  const { traduccionesBD, lenguage } = useContext(LenguageContext);

  return (
    <footer class="pie-pagina">
      <div class="grupo-1">
        <div class="box2">
          <figure>
            <a href="#">
              <img src={FeelUy} alt="" />
            </a>
          </figure>
        </div>
        <div class="box2 redirectFaq">
          <Link to='/faq' className='redirectToFaq'><h2>{filtrarTraduccion(traduccionesBD, 'PreguntasFrecuentes', lenguage)}</h2><FontAwesomeIcon icon={faCircleQuestion} className='iconFaq'/></Link>
        </div>
        <div class="box2 siguenos">
          <h2>{filtrarTraduccion(traduccionesBD, 'Siguenos', lenguage)}</h2>
          <div class="red-social">
            {/* <a href="#" class="fa fa-facebook"></a> */}
            {/*   <FontAwesomeIcon
              icon={faInstagram}
              className="fa fa-facebook"
            /> */}
            <a href="https://www.instagram.com/feeluruguay/" class="fa fa-instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100091526935097&mibextid=LQQJ4d" class="fa fa-twitter">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="mailto:marrz2022@gmail.com?Subject=Aplicacion%20Web" class="fa fa-youtube">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </div>
        </div>
      </div>
      <div class="grupo-2">
        <small>&copy; 2022 <b>MARRZ</b> - {filtrarTraduccion(traduccionesBD, 'TodosDerechosReservados', lenguage)}</small>
      </div>
    </footer>


  );
};

export default Footer;


