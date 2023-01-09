import React, { useEffect, useState } from 'react';
import { Layout } from '../../Layout';
import { Link } from 'react-router-dom';
import AuthUser from '../../Components/AuthUser'
import LenguageContext from '../Context/LenguageContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';;
import UserBar from '../../Pages/UserBar';
import { handleUserBar } from '../../Helpers/HandUserBarClick';
import '../../Css/TourInit.css';

const TourInit = ({
  setIsLoggedIn,
  setPage,
  isLoggedIn,
  userBar,
  setUserBar,
}) => {
  useEffect(() => {
    setPage('tourInit');
  }, [setPage]);
  const { http } = AuthUser();

  const Id = sessionStorage.getItem('id');
  const { traduccionesBD, lenguage } = useContext(LenguageContext);

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
      <div className="touInit">
        <div className="contenedorTitulo">
          <h2>Bienvenidos a </h2>
          <h1>Arma tu tour</h1>
        </div>
        <div className="pageText">
          <p>En esta seccion ud podra crear sus propios tours.</p>
        </div>
        <div className="tourSecciones">
          <Link to="/buildTour">
            <div className="seccionCrearTour">Crear tour</div>
          </Link>
          <div className="seccionVerMisTours">
            <div className="contenedorTitulo">
              <h1>Ver mis tours</h1>
            </div>
            <div className="pageText">
              <p>
                En esta seccion ud podra ver los tours que creo anteriormente.
              </p>
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
                    <div>Inicia a las {hora(tour.horaInicioTour)} hs</div>
                    <div>
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
