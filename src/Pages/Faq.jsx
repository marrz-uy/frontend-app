import { useEffect, useContext } from 'react';
import LenguageContext from '../Context/LenguageContext';
import { Layout } from '../Layout';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import UserBar from './UserBar';
import { handleUserBar } from '../Helpers/HandUserBarClick';
import Image1 from '../images/imagesFaq/ScreenShot1.png';
import Image2 from '../images/imagesFaq/Screenshot 2023-03-30 144949.png';
import Image3 from '../images/imagesFaq/Screenshot 2023-03-30 145329.png';
import Image4 from '../images/imagesFaq/Screenshot 2023-03-30 145507.png';
import Image5 from '../images/imagesFaq/Screenshot 2023-03-30 145621.png';
import Image6 from '../images/imagesFaq/Screenshot 2023-03-30 145742.png';
import Image7 from '../images/imagesFaq/Screenshot 2023-03-30 145742.png';
import Image8 from '../images/imagesFaq/Screenshot 2023-03-30 150050.png';
import Image9 from '../images/imagesFaq/Screenshot 2023-03-30 150130.png';
import Image10 from '../images/imagesFaq/Screenshot 2023-03-30 150207.png';
import '../Css/Faq.css';
import '../Css/userBarClick.css';

const Faq = ({ setIsLoggedIn, setPage, isLoggedIn, userBar, setUserBar }) => {
  const { traduccionesBD, lenguage } = useContext(LenguageContext);

  useEffect(() => {
    setPage('faq');
    const faqs = document.querySelectorAll('.faq');

    faqs.forEach((faq) => {
      faq.addEventListener('click', () => {
        faq.classList.toggle('activeFaq');
      });
    });
  }, []);

  handleUserBar(userBar);

  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>
      <section className="faq_container">
        <h2 className="faqTitle">FAQs❓</h2>
        <h6>{filtrarTraduccion(traduccionesBD, 'faq', lenguage)}</h6>
        <div className="faq">
          <div className="question">
            <h3>
              {filtrarTraduccion(traduccionesBD, 'QueEsFeelUy', lenguage)}
            </h3>
            <svg width="15" height="10" viewBox="0 0 42 25" fill="#e74d4d">
              <path
                d="M3 3L21 21L39 3"
                stroke="white"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="answer">
            <p>
              {filtrarTraduccion(traduccionesBD, 'QueEsFeelUyAnswer', lenguage)}
            </p>
          </div>
        </div>
        <div className="faq">
          <div className="question">
            <h3>
              {filtrarTraduccion(traduccionesBD, 'ComoDescargo', lenguage)}
            </h3>
            <svg width="15" height="10" viewBox="0 0 42 25" fill="#e74d4d">
              <path
                d="M3 3L21 21L39 3"
                stroke="white"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="answer">
            <p>
              {filtrarTraduccion(
                traduccionesBD,
                'ComoDescargoAnswer',
                lenguage
              )}
            </p>
          </div>
        </div>
        <div className="faq">
          <div className="question">
            <h3>
              {filtrarTraduccion(traduccionesBD, 'ComoCrearUsuario', lenguage)}
            </h3>
            <svg width="15" height="10" viewBox="0 0 42 25" fill="#e74d4d">
              <path
                d="M3 3L21 21L39 3"
                stroke="white"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="answer">
            <p>
              {filtrarTraduccion(
                traduccionesBD,
                'ComoCrearUsuarioAnswer1',
                lenguage
              )}
              <br />
              <img src={Image1} />
              {filtrarTraduccion(
                traduccionesBD,
                'ComoCrearUsuarioAnswer2',
                lenguage
              )}
              <img src={Image2} />
              {filtrarTraduccion(
                traduccionesBD,
                'ComoCrearUsuarioAnswer3',
                lenguage
              )}
              <img src={Image3} />
            </p>
          </div>
        </div>
        <div className="faq">
          <div className="question">
            <h3>
              {filtrarTraduccion(traduccionesBD, 'ComoCambiarIdioma', lenguage)}
            </h3>
            <svg width="15" height="10" viewBox="0 0 42 25" fill="#e74d4d">
              <path
                d="M3 3L21 21L39 3"
                stroke="white"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="answer">
            <p>
              {filtrarTraduccion(
                traduccionesBD,
                'ComoCambiarIdiomaAnswer',
                lenguage
              )}
              <img src={Image4} />
              <img src={Image5} />
            </p>
          </div>
        </div>
        <div className="faq">
          <div className="question">
            <h3>
              {filtrarTraduccion(traduccionesBD, 'ComoCrearTour', lenguage)}
            </h3>
            <svg width="15" height="10" viewBox="0 0 42 25" fill="#e74d4d">
              <path
                d="M3 3L21 21L39 3"
                stroke="white"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="answer">
            <p>
              {filtrarTraduccion(
                traduccionesBD,
                'ComoCrearTourAnswer1',
                lenguage
              )}
              <img src={Image6} />
              {filtrarTraduccion(
                traduccionesBD,
                'ComoCrearTourAnswer2',
                lenguage
              )}
              <img src={Image7} />
            </p>
          </div>
        </div>
        <div className="faq as">
          <div className="question">
            <h3>
              {filtrarTraduccion(traduccionesBD, 'ComoAccederTour', lenguage)}
            </h3>
            <svg width="15" height="10" viewBox="0 0 42 25" fill="#e74d4d">
              <path
                d="M3 3L21 21L39 3"
                stroke="white"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="answer">
            <p>
              {filtrarTraduccion(
                traduccionesBD,
                'ComoAccederTourAnswer1',
                lenguage
              )}
              <img src={Image8} />
              {filtrarTraduccion(
                traduccionesBD,
                'ComoAccederTourAnswer2',
                lenguage
              )}
              <img src={Image9} />
              <img src={Image10} />
            </p>
          </div>
        </div>
      </section>
      {userBar && (
        <UserBar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setUserBar={setUserBar}
        />
      )}
    </Layout>
  );
};

export default Faq;
