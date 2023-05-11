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
import AndroidInstall1 from '../images/imagesFaq/AndroidInstall1.jpeg';
import AndroidInstall2 from '../images/imagesFaq/AndroidInstall2.jpeg';
import AndroidInstall3 from '../images/imagesFaq/AndroidInstall3.jpeg';
import AndroidInstall4 from '../images/imagesFaq/AndroidInstall4.jpeg';
import AndroidInstall5 from '../images/imagesFaq/AndroidInstall5.jpeg';
import iOSInstall1 from '../images/imagesFaq/iOSInstall1.jpg';
import iOSInstall2 from '../images/imagesFaq/iOSInstall2.jpg';
import iOSInstall3 from '../images/imagesFaq/iOSInstall3.jpeg';
import iOSInstall4 from '../images/imagesFaq/iOSInstall4.jpeg';
import WebInstall1 from '../images/imagesFaq/WebInstall1.jpg';
import WebInstall2 from '../images/imagesFaq/WebInstall2.png';
import LocationPermission from '../images/imagesFaq/UbicacionPermiso.jpeg';

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
            <h3>¿La aplicacion solicita localizacion?</h3>
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
              SI, y es OPCIONAL. La aplicacion unicamente utiliza su
              localizacion para filtrar por distancia y ofrecerle los puntos de
              interés mas cercanos a su ubicación. NUNCA se guardará las
              ubicación de los usuarios. Puede rechazar la solicitúd de
              ubicación y seguir usando la aplicación sin problemas pero la
              experiencia no será la mas óptima en cuanto a los resultados de
              las búsquedas que esta le ofrezca.
            </p>
            <img src={LocationPermission} style={{ maxWidth: '300px' }} />
          </div>
        </div>
        <div className="faq">
          <div className="question">
            <h3>¿Como instalo FeelUy en mi dispositivo?</h3>
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
            <h5>En Android(Chrome)</h5>
            <p>1-Se mostrará un aviso que la app es instalable</p>
            <img src={AndroidInstall1} style={{ maxWidth: '300px' }} />
            <p>2-Luego presione en instalar</p>
            <img src={AndroidInstall2} style={{ maxWidth: '300px' }} />
            <p>La aplicacion comenzara a instalarse</p>
            <img
              src={AndroidInstall3}
              style={{ maxWidth: '500px', marginBottom: '20px' }}
            />
            <img src={AndroidInstall4} style={{ maxWidth: '500px' }} />
            <p>Ya puede ver la App en su pantalla de inicio</p>
            <img src={AndroidInstall5} style={{ maxWidth: '500px' }} />
            <h5>En iOS(Safari)</h5>
            <p>1-Seleccione el icono de opciones en el navegador</p>
            <img src={iOSInstall1} style={{ maxWidth: '300px' }} />
            <p>2-Luego, seleccione "Agregar al Inicio +"</p>
            <img src={iOSInstall2} style={{ maxWidth: '300px' }} />
            <p>
              3-Al final podra escojer el nombre de la App o dejar FeelUY por
              defecto, presione "Agregar"
            </p>
            <img src={iOSInstall3} style={{ maxWidth: '300px' }} />
            <p>Ya puede ver la App en su pantalla de inicio</p>
            <img src={iOSInstall4} style={{ maxWidth: '300px' }} />
            <h5>PC (Chrome, Edge)</h5>
            <p>
              1-Click en el icono que aparece en la barra de direcciones del
              navegador
            </p>
            <img src={WebInstall1} />
            <p>2-Click en "Instalar"</p>
            <img src={WebInstall2} />
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
