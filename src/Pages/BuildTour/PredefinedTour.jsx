import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../Layout';
import LenguageContext from '../../Context/LenguageContext';
import { filtrarTraduccion } from '../../Helpers/FilterTranslate';
import AuthUser from '../../Components/AuthUser';
import UserBar from '../../Pages/UserBar';
import { handleUserBar } from '../../Helpers/HandUserBarClick';
import PageContext from '../../Context/PageContext';
import NoTourMsg from '../../Components/TourComponents/NoTourMsg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import '../../Css/TourInit.css';

const PredefinedTour = ({
  setIsLoggedIn,
  setPage,
  isLoggedIn,
  userBar,
  setUserBar,
  destination,
  setDestination,
}) => {
  const { setActivePage } = useContext(PageContext);
  const [appTours, setAppTours] = useState();
  const { http } = AuthUser();
  const { traduccionesBD, lenguage } = useContext(LenguageContext);
  const [cantTours, setCantTours] = useState();
  const navigate = useNavigate();

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

  handleUserBar(userBar);

  const hora = (str) => {
    str = str.substring(0, str.length - 3);
    return str;
  };

  const goOnPoint = async (e) => {
    try {
      e.preventDefault();
      const id = e?.target?.id;
      const response = await http.get(`/PuntosInteres/${id}`, {});
      const punto = response?.data?.punto;
      const categoria = response?.data?.categoria;
      const objetoUnido = { ...punto, ...categoria };
      setDestination(objetoUnido);
      navigate('/infoResults');
    } catch (error) {
      console.error(`Error en catch: ${error}`);
    }
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
              <h4 className="textBlur">
                {filtrarTraduccion(traduccionesBD, 'predefinedTour', lenguage)}
              </h4>
            </div>
          </div>
          <div className="tourList">
            {cantTours > 0 ? (
              appTours?.map((tour) => {
                return (
                  <details key={tour.id}>
                    <summary>
                      <div
                        className="imagePredefinedTour"
                        style={{ backgroundImage: `url(${tour.imagenTour})` }}
                      ></div>
                      <h4>
                        <span className="summary-title">
                          {tour.nombreTourPredefinido}
                        </span>
                      </h4>
                      <span className="tourPredefinedDescription">
                        {tour.descripcionTourPredefinido}
                      </span>
                      <div className="summary-chevron-up">
                        <FontAwesomeIcon icon={faArrowDown} />
                      </div>
                    </summary>

                    <div className="summary-content myToursCard">
                      <div className="cardContent">
                        {' '}
                        <h5 style={{ color: '#00699d' }}>
                          {filtrarTraduccion(
                            traduccionesBD,
                            'predefinedPlaces',
                            lenguage
                          )}
                        </h5>
                        <div className="cardHour">
                          <span>&#9200;</span> Inicio a las{' '}
                          {hora(tour.horaDeInicioTourPredefinido)} hs
                        </div>
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
                    <div className="summary-chevron-down">
                      <FontAwesomeIcon icon={faArrowUp} />
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
