import '../Css/Faq.css';
import { Layout } from '../Layout';
import { useEffect } from 'react';
// import Image1 from 'frontend-app\src\images\images\Screenshot-2023-03-30 144520.png'
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
const Faq = () => {

    useEffect(() => {
        const faqs = document.querySelectorAll(".faq");

        faqs.forEach(faq => {
            faq.addEventListener("click", () => {
                faq.classList.toggle("activeFaq");
            })
        })
    }, [])

    return (
        <Layout>
            <section className='faq_container'>
                <h2 class="title">FAQs</h2>
                <div class="faq">
                    <div class="question">
                        <h3>¿Cómo descargo FeelUy?</h3>

                        <svg width="15" height="10" viewBox="0 0 42 25">
                            <path
                                d="M3 3L21 21L39 3"
                                stroke="white"
                                stroke-width="7"
                                stroke-linecap="round"
                            />
                        </svg>
                    </div>
                    <div class="answer">
                        <p>
                            FeelUy es una aplicación web, por lo que no es necesario instalarla, solo necesita conexión a internet, abrir un navegador e ingresar al siguiente enlace: estevaaserelenlacedefeeluy.com
                        </p>
                    </div>
                </div>

                <div class="faq">
                    <div class="question">
                        <h3>¿Cómo hago para crearme un usuario?</h3>

                        <svg width="15" height="10" viewBox="0 0 42 25">
                            <path
                                d="M3 3L21 21L39 3"
                                stroke="white"
                                stroke-width="7"
                                stroke-linecap="round"
                            />
                        </svg>
                    </div>
                    <div class="answer">
                        <p>
                            En la página principal debe ir al menú que se encuentra al lado de la bandera (las 3 rayitas)
                            <br />
                            <img src={Image1} />
                            En el menú seleccionar la opción que dice “Registrarse”
                            <img src={Image2} />
                            Se le solicitará que ingrese:
                            Correo
                            Contraseña
                            Repetir la contraseña
                            Nombre
                            <img src={Image3} />
                        </p>
                    </div>
                </div>

                <div class="faq">
                    <div class="question">
                        <h3>¿Cómo cambiar el idioma de FeelUy?</h3>

                        <svg width="15" height="10" viewBox="0 0 42 25">
                            <path
                                d="M3 3L21 21L39 3"
                                stroke="white"
                                stroke-width="7"
                                stroke-linecap="round"
                            />
                        </svg>
                    </div>
                    <div class="answer">
                        <p>
                            FeelUy cuenta con Español e Inglés, si desea cambiar el idioma debe clickear sobre la bandera que se encuentra en la esquina superior derecha.
                            <img src={Image4} />
                            <img src={Image5} />
                        </p>
                    </div>
                </div>

                <div class="faq">
                    <div class="question">
                        <h3>¿Cómo puedo crear un nuevo tour?</h3>

                        <svg width="15" height="10" viewBox="0 0 42 25">
                            <path
                                d="M3 3L21 21L39 3"
                                stroke="white"
                                stroke-width="7"
                                stroke-linecap="round"
                            />
                        </svg>
                    </div>
                    <div class="answer">
                        <p>
                            En el menú principal de FeelUy, seleccionar “Armar Mi Tour”
                            <img src={Image6} />
                            Recordar tener en cuenta que para poder armar un tour debe iniciar sesión previamente
                            <img src={Image7} />
                        </p>
                    </div>
                </div>

                <div class="faq as">
                    <div class="question">
                        <h3>¿Cómo puedo acceder a los tours de la aplicación?</h3>

                        <svg width="15" height="10" viewBox="0 0 42 25">
                            <path
                                d="M3 3L21 21L39 3"
                                stroke="white"
                                stroke-width="7"
                                stroke-linecap="round"
                            />
                        </svg>
                    </div>
                    <div class="answer">
                        <p>
                            En la pantalla principal de FeelUy, seleccionar “Tours Predefinidos”
                            <img src={Image8} />
                            Podrá visualizar un listado de los Tours que se encuentran disponibles en la Aplicación.
                            <img src={Image9} />
                            <img src={Image10} />
                        </p>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Faq;