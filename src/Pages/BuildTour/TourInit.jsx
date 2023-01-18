import React, { useEffect, useState, useContext } from 'react';
import PageContext from '../../Context/PageContext';
import { Layout } from '../../Layout';
import { Link } from 'react-router-dom';
import AuthUser from '../../Components/AuthUser';
import LenguageContext from '../../Context/LenguageContext';
import { filtrarTraduccion } from '../../Helpers/FilterTranslate';
import UserBar from '../../Pages/UserBar';
import { handleUserBar } from '../../Helpers/HandUserBarClick';
import trash from '../../Assets/trash.svg';
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
    setActivePage('tourInit');
  }, [setPage, setActivePage]);
  console.log('PAGE: ', page);
  const { http } = AuthUser();

  const Id = sessionStorage.getItem('id');
  const { traduccionesBD, lenguage } = useContext(LenguageContext);

  const [misTours, setMisTours] = useState();
  const getTours = () => {
    http
      .get(`/tourArmado/${Id}`, {})
      .then((response) => {
        const toursData = response?.data['0'];
        console.log('%cTOURS DATA - toutInit:', 'color: violet;', toursData);

        setMisTours(toursData);
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
  };

  useEffect(() => {
    getTours();
    // eslint-disable-next-line
  }, []);

  console.log('MIS TOURS - var: ', misTours);
  handleUserBar(userBar);

  const hora = (str) => {
    str = str.substring(0, str.length - 3);
    return str;
  };

  const deleteTour = (tourId) => {
    http
      .delete(`/tourArmado/${tourId}`, {})
      .then((response) => {
        console.log(
          '%cTOURS DATA - toutInit:',
          'color: violet;',
          response?.data
        );
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
  };

  const handleDeleteTour = (e) => {
    e.preventDefault();
    console.log('eliminar tour: ');
    console.log(e.target.id);
    let tourID = e.target.id;
    deleteTour(tourID);
    getTours();
  };

  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>
      <div className="tourInit">
        <div className="contenedorTitulo">
          <h2 className="textBlur">
            {filtrarTraduccion(traduccionesBD, 'welcomeTo', lenguage)}:{' '}
          </h2>
          <h1 className="textBlur">
            {filtrarTraduccion(traduccionesBD, 'splashScreenTextSup', lenguage)}
          </h1>
        </div>
        <div className="pageText">
          <h3>{filtrarTraduccion(traduccionesBD, 'yourOwnTours', lenguage)}</h3>
        </div>
        <div className="tourSecciones">
          <div className="btnBuildTourContainer">
            <div className="btnBuildTour">
              <Link to="/buildTour">
                <div className="seccionCrearTour">
                  <span className="icons">🚍</span>
                  <p>
                    {filtrarTraduccion(traduccionesBD, 'createTour', lenguage)}
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <div className="seccionVerMisTours">
            <div className="contenedorTitulo">
              <h1 className="textBlur">
                {filtrarTraduccion(traduccionesBD, 'seeMyTours', lenguage)}{' '}
                <span className="icons"></span>🚡
              </h1>
            </div>
            <div className="pageText">
              <h3 className="textBlur">
                {filtrarTraduccion(traduccionesBD, 'previouslyTours', lenguage)}
              </h3>
            </div>
          </div>
          <div className="tourList">
            {misTours?.map((tour) => {
              return (
                <details key={tour.id}>
                  <div></div>
                  <summary>
                    <span>{tour.nombreTour}</span>
                  </summary>
                  <div className="myToursCard">
                    <div>
                      <span>🕛</span>
                      {filtrarTraduccion(
                        traduccionesBD,
                        'beginsAt',
                        lenguage
                      )}{' '}
                      {hora(tour.horaInicioTour)} hs
                    </div>
                    <div className="cardContent">
                      {' '}
                      {tour?.tour_items?.map((tourItem) => {
                        return (
                          <div key={tourItem.puntoInteresId}>
                            <li className="puntoInteresLi">
                              {tourItem.puntos_interes.Nombre}
                            </li>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <span className="deleteIcon">
                    <img
                      src={trash}
                      alt="trashCan"
                      id={tour.id}
                      onClick={handleDeleteTour}
                    ></img>
                  </span>
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
