import React, { useEffect, useState, useContext } from 'react';
import { Layout } from '../../Layout';
import LenguageContext from '../../Context/LenguageContext';
import { filtrarTraduccion } from '../../Helpers/FilterTranslate';
import AuthUser from '../../Components/AuthUser';
import UserBar from '../../Pages/UserBar';
import { handleUserBar } from '../../Helpers/HandUserBarClick';
import '../../Css/TourInit.css';
const PredefinedTour = ({
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
  const { traduccionesBD, lenguage } = useContext(LenguageContext);

  const [appTours, setAppTours] = useState();
  useEffect(() => {
    http
      .get(`/tourPredefinido`, {})
      .then((response) => {
        const toursData = response?.data['0'];
        console.log('%cTOURS APP - tourPredef:', 'color: violet;', toursData);

        setAppTours(toursData);
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
    // eslint-disable-next-line
  }, []);

  console.log('MIS TOURS - var: ', appTours);
  handleUserBar(userBar);

  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>
      <div className="touInit">
        <div className="contenedorTitulo">
          <h2> {filtrarTraduccion(traduccionesBD, 'welcomeTo', lenguage)} </h2>
          <h1>
            {filtrarTraduccion(traduccionesBD, 'predefinedTour', lenguage)}
          </h1>
        </div>
        <div className="tourSecciones">
          <div className="seccionVerMisTours">
            <div className="pageText">
              <h3>
                {filtrarTraduccion(traduccionesBD, 'predefinedTour', lenguage)}
              </h3>
            </div>
          </div>
          <div className="tourList">
            {appTours?.map((tour) => {
              return (
                <details key={tour.id}>
                  <summary>
                    <span>{tour.nombreTourPredefinido}</span>
                    <h6>{tour.descripcionTourPredefinido}</h6>
                  </summary>
                  <div className="myToursCard">
                    {/* <div>Inicia a las {hora(tour.horaInicioTour)} hs</div> */}
                    <div>
                      {' '}
                      <h6 style={{ color: '#00699d' }}>
                        {filtrarTraduccion(
                          traduccionesBD,
                          'predefinedPlaces',
                          lenguage
                        )}
                      </h6>
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

export default PredefinedTour;
