import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthUser from '../../Components/AuthUser';
import PageContext from '../../Context/PageContext';
import { Layout } from '../../Layout';
import LenguageContext from '../../Context/LenguageContext';
import TourContext from '../../Context/TourContext';
import { filtrarTraduccion } from '../../Helpers/FilterTranslate';
import UserBar from '../../Pages/UserBar';
import { handleUserBar } from '../../Helpers/HandUserBarClick';
import trash from '../../Assets/trash.svg';
import edit from '../../Assets/edit.svg';
import NoTourMsg from '../../Components/TourComponents/NoTourMsg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import '../../Css/TourInit.css';

const TourInit = ({
  setIsLoggedIn,
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
  const { itemsHeredados, setItemsHeredados } = useContext(TourContext);

  useEffect(() => {
    setPage('tourInit');
    setActivePage('tourInit');
  }, [setPage, setActivePage]);

  const getTours = () => {
    http
      .get(`/tourArmado/${Id}`, {})
      .then((response) => {
        console.log(
          '%cMis Tours:',
          'color: violet;',
          response?.data['0'].length
        );
        console.log('%cMis Tours:', 'color: green;', response?.data['0']);
        // console.log(
        //   '%cMis Tours:',
        //   'color: red;',
        //   response?.data['0']?.map((item) => item?.tour_items)
        // );
        // console.log(
        //   '%cITEMS PARA HEREDAR:',
        //   'color: blue;',
        //   response?.data['0']['0'].tour_items.puntos_interes
        // );
        setMisTours(response?.data['0']);
        setCantTours(response?.data['0'].length);
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
  };

  useEffect(() => {
    getTours();
  }, []);

  handleUserBar(userBar);

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

  const handleEditTour = (e) => {
    console.log('id: ' + e.target.id);
    const tour_items = misTours[e.target.id]?.tour_items;
    console.log('items_heredados: ', tour_items);
    const newArray = tour_items?.map((item) => item?.puntos_interes);
    console.log('NEW ARRAY: ', newArray);
    // setItemsHeredados(tour_items);
    setItemsHeredados(newArray);
    navigate('/buildTour');
  };
  console.log('items_heredados: ', itemsHeredados);

  const goOnPoint = async (e) => {
    e.preventDefault();
    const id = e.target.id;
    const req = await http
      .get(`http://localhost:8000/api/PuntosInteres/${id}`, {})
      .then((response) => {
        console.log('%cDATA:', 'color: blue;', response?.data);
        console.log('%cPUNTO:', 'color: blue;', response?.data.punto);
        console.log('%cTIPO:', 'color: yellow;', response?.data.categoria);
        console.log('%cIMAGENES:', 'color: yellow;', response?.data.categoria);
        let punto = response?.data.punto;
        let categoria = response?.data.categoria;
        const objetoUnido = { ...punto, ...categoria };
        return objetoUnido;
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
    console.log('REQ: ', req);
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
          <h4>{filtrarTraduccion(traduccionesBD, 'yourOwnTours', lenguage)}</h4>
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
              <h4 className="textBlur">
                {filtrarTraduccion(traduccionesBD, 'previouslyTours', lenguage)}
              </h4>
            </div>
          </div>
          <div className="tourList">
            {cantTours > 0 ? (
              misTours?.map((tour, index) => {
                return (
                  <details key={tour.id}>
                    <summary>
                      <span className="summary-title">
                        🗺️ {tour.nombreTour}
                      </span>
                      <div className="summary-chevron-up">
                        <FontAwesomeIcon icon={faArrowDown} />
                      </div>
                    </summary>
                    <div className="summary-content myToursCard">
                      <div className="cardContent">
                        {' '}
                        {tour?.tour_items?.map((tourItem) => {
                          return (
                            <div key={tourItem.puntosinteres_id}>
                              {' '}
                              <li
                                className="puntoInteresLi"
                                id={tourItem.puntosinteres_id}
                                onClick={goOnPoint}
                              >
                                {tourItem.puntos_interes.Nombre}
                              </li>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="summary-chevron-down">
                      <FontAwesomeIcon icon={faArrowUp} />
                    </div>
                    <span className="deleteIcon">
                      <img
                        src={trash}
                        alt="trashCan"
                        id={tour.id}
                        onClick={handleDeleteTour}
                      ></img>
                    </span>
                    <span className="editIcon">
                      <img
                        src={edit}
                        alt="pencil"
                        id={index}
                        onClick={handleEditTour}
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
