import React, { useEffect, useState, useContext } from 'react';
import { Layout } from '../../Layout';
import LenguageContext from '../../Context/LenguageContext';
import { filtrarTraduccion } from '../../Helpers/FilterTranslate';
import AuthUser from '../../Components/AuthUser';
import UserBar from '../../Pages/UserBar';
import { handleUserBar } from '../../Helpers/HandUserBarClick';
import PageContext from '../../Context/PageContext';
import NoTourMsg from '../../Components/TourComponents/NoTourMsg';
import '../../Css/TourInit.css';

const PredefinedTour = ({
  setIsLoggedIn,
  page,
  setPage,
  isLoggedIn,
  userBar,
  setUserBar,
}) => {
  const { setActivePage } = useContext(PageContext);
  const [appTours, setAppTours] = useState();
  const { http } = AuthUser();
  const { traduccionesBD, lenguage } = useContext(LenguageContext);
  const [cantTours, setCantTours] = useState();

  useEffect(() => {
    setPage('predefinedTour');
    setActivePage('predefinedTour');
  }, [setPage, setActivePage]);

  useEffect(() => {
    http
      .get(`/tourPredefinido`, {})
      .then((response) => {
        setAppTours(response?.data['0']);
        setCantTours(response?.data['0'].length);
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
    // eslint-disable-next-line
  }, []);

  // console.log('MIS TOURS: ', appTours);

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
          <h2 className="textBlur">
            {' '}
            {filtrarTraduccion(traduccionesBD, 'welcomeTo', lenguage)}{' '}
          </h2>
          <h1 className="textBlur">
            {filtrarTraduccion(traduccionesBD, 'predefinedTourTitle', lenguage)}
          </h1>
        </div>
        <div className="tourSecciones">
          <div className="seccionVerMisTours">
            <div className="pageText">
              <h3 className="textBlur">
                {filtrarTraduccion(traduccionesBD, 'predefinedTour', lenguage)}
              </h3>
            </div>
          </div>
          <div className="tourList">
            {cantTours > 0 ? (
              appTours?.map((tour) => {
                return (
                  <details key={tour.id}>
                    <summary>
                      <span>{tour.nombreTourPredefinido}</span>
                      {' / '}
                      <span>&#9200;</span> Inicio a las{' '}
                      {hora(tour.horaDeInicioTourPredefinido)} hs
                      <h6 className="tourPredefinedDescription">
                        {tour.descripcionTourPredefinido}
                      </h6>
                    </summary>
                    <div className="myToursCard">
                      <div className="cardContent">
                        {' '}
                        <div className="cardHour"></div>
                        <h5 style={{ color: '#00699d' }}>
                          {filtrarTraduccion(
                            traduccionesBD,
                            'predefinedPlaces',
                            lenguage
                          )}
                        </h5>
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
              })
            ) : (
              <NoTourMsg
                message="No tenemos ningun tour para ofrcerle aun"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUgT-zon1BIn2mDvSt2Q-lA9oak5RCZBH4ku6T2llIMm_tQTZ4SNvvECVwprRO3nEHalA&usqp=CAU"
              />
            )}
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
