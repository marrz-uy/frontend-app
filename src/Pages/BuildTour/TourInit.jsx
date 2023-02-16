import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageContext from '../../Context/PageContext';
import { Layout } from '../../Layout';
import AuthUser from '../../Components/AuthUser';
import LenguageContext from '../../Context/LenguageContext';
import { filtrarTraduccion } from '../../Helpers/FilterTranslate';
import UserBar from '../../Pages/UserBar';
import { handleUserBar } from '../../Helpers/HandUserBarClick';
import trash from '../../Assets/trash.svg';
import NoTourMsg from '../../Components/TourComponents/NoTourMsg';
import '../../Css/TourInit.css';

const TourInit = ({
  setIsLoggedIn,
  page,
  setPage,
  isLoggedIn,
  userBar,
  setUserBar,
  destination,
  setDestination,
}) => {
  const { setActivePage } = useContext(PageContext);
  const { http } = AuthUser();
  const Id = sessionStorage.getItem('id');
  const { traduccionesBD, lenguage } = useContext(LenguageContext);
  const [misTours, setMisTours] = useState();
  const [cantTours, setCantTours] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setPage('tourInit');
    setActivePage('tourInit');
  }, [setPage, setActivePage]);

  const getTours = () => {
    http
      .get(`/tourArmado/${Id}`, {})
      .then((response) => {
        // const toursData = response?.data['0'];
        console.log(
          '%cMis Tours:',
          'color: violet;',
          response?.data['0'].length
        );
        setMisTours(response?.data['0']);
        setCantTours(response?.data['0'].length);
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
  };

  useEffect(() => {
    getTours();
    // eslint-disable-next-line
  }, []);

  // console.log('MIS TOURS - var: ', misTours);

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
    deleteTour(e.target.id);
    getTours();
  };

  const goOnPoint = async (e) => {
    e.preventDefault();
    // console.log('TARGET: ');
    const id = e.target.id;
    const req = await http
      .get(`http://localhost:8000/api/PuntosInteres/${id}`, {})
      .then((response) => {
        console.log('%cPUNTO:', 'color: blue;', response?.data.punto);
        console.log('%cPUNTO:', 'color: yellow;', response?.data.tipo);
        let punto = response?.data.punto;
        let tipo = response?.data.tipo;
        const objetoUnido = { ...punto, ...tipo };

        return objetoUnido;
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
    console.log('REQ: ', req);
    // setTimeout(() => {}, 2000);
    setDestination(req);

    console.log('DESTINATION: ', destination);
    navigate('/infoResults');
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
            {cantTours > 0 ? (
              misTours?.map((tour) => {
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
                              <li
                                className="puntoInteresLi"
                                id={tourItem.puntoInteresId}
                                onClick={goOnPoint}
                              >
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
              })
            ) : (
              <NoTourMsg
                message="No ha creado ningun tour"
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

export default TourInit;
