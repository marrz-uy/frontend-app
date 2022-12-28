import React, { useEffect, useState, useContext } from 'react';
import PageContext from '../../Context/PageContext';
import { Layout } from '../../Layout';
import { Link } from 'react-router-dom';
import AuthUser from '../../Components/AuthUser';
import UserBar from '../../Pages/UserBar';
import { handleUserBar } from '../../Helpers/HandUserBarClick';
import '../../Css/TourInit.css';

const TourInit = ({
  setIsLoggedIn,
  page,
  setPage,
  isLoggedIn,
  userBar,
  setUserBar,
}) => {
  const { setActivePage } = useContext(PageContext);
  useEffect(() => {
    setPage('tourInit');
    setActivePage('tourInit')
  }, [setPage, setActivePage]);
  console.log('PAGE: ', page)
  const { http } = AuthUser();

  const Id = sessionStorage.getItem('id');

  const [misTours, setMisTours] = useState();
  useEffect(() => {
    http
      .get(`/tourArmado/${Id}`, {})
      .then((response) => {
        const toursData = response?.data['0'];
        console.log('%cTOURS DATA - toutInit:', 'color: violet;', toursData);

        setMisTours(toursData);
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
    // eslint-disable-next-line
  }, []);

  console.log('MIS TOURS - var: ', misTours);
  handleUserBar(userBar);

  const hora = (str) => {
    str = str.substring(0, str.length - 3);
    return str;
  };
  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>
      <div className="tourInit">
        <div className="contenedorTitulo">
          <h2 className='textBlur'>Bienvenidos a </h2>
          <h1 className='textBlur'>Arma tu tour</h1>
        </div>
        <div className="pageText">
          <h3>En esta seccion ud podra crear sus propios tours.</h3>
        </div>
        <div className="tourSecciones">
          <div className="btnBuildTourContainer">
            <div className="btnBuildTour">
              <Link to="/buildTour">
                <div className="seccionCrearTour">
                <span className='icons'>🚍</span><p>Crear tour</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="seccionVerMisTours">
            <div className="contenedorTitulo">
              <h1 className='textBlur'>Ver mis tours <span className='icons'></span>🚡</h1>
            </div>
            <div className="pageText">
              <h3 className='textBlur'>
                En esta seccion ud podra ver los tours que creo anteriormente.
              </h3>
            </div>
          </div>
          <div className="tourList">
            {misTours?.map((tour) => {
              return (
                <details key={tour.id}>
                  <summary>
                    <span>{tour.nombreTour}</span>
                  </summary>
                  <div className="myToursCard">
                    <div>
                      <span>🕛</span>Inicio a las {hora(tour.horaInicioTour)} hs
                    </div>
                    <div className="cardContent">
                      {' '}
                      {tour?.tour_items?.map((tourItem) => {
                        return (
                          <div key={tourItem.puntoInteresId}>
                            <li>{tourItem.puntos_interes.Nombre}</li>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </div>
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

export default TourInit;
