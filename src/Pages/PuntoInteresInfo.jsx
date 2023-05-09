import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../Layout';
import AuthUser from '../Components/AuthUser';
import PageContext from '../Context/PageContext';
import LenguageContext from '../Context/LenguageContext';
import FavouritesContext from '../Context/FavouritesContext';
import UserBar from './UserBar';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import { handleUserBar } from '../Helpers/HandUserBarClick';
import Slider2 from '../Components/Slider2';
import SliderFirefox from '../Components/SliderFirefox';
import LikeButton from '../Components/LikeButton';
import LikeNumbers from '../Components/LikeQuantity';
import '../Css/PuntoInteresInfo.css';
import '../Css/userBarClick.css';
import '../Css/Slider.css';
import '../Css/SliderPuntoInteresInfo.css';

const PuntoInteresInfo = ({
  setUserBar,
  userBar,
  isLoggedIn,
  setIsLoggedIn,
  destination,
  setPage,
}) => {
  let arrayImagenes = destination.imagenes;
  const arrURLS = arrayImagenes?.map((imagen) => imagen?.url.replace(/"/g, ''));

  const { http } = AuthUser();
  const navigate = useNavigate();
  const { traduccionesBD, lenguage } = useContext(LenguageContext);
  const { setActivePage } = useContext(PageContext);
  const { Facebook, Instagram } = destination;
  handleUserBar(userBar);
  const [firefox, setFirefox] = useState(false);

  const [user_Id] = useState(sessionStorage?.getItem('id'));
  const { GetIdsFavouritesFromDB, idsFavouritesFromDB } =
    useContext(FavouritesContext);
  const [initialState, setInitialState] = useState();

  const [cantLikes, setCantLikes] = useState();
  const [hotelStars, setHotelStars] = useState();

  const cantMegusta = () => {
    http
      .get(`/megusta/${destination.id}`)
      .then((response) => {
        setCantLikes(response.data);
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
  };

  const isFavourite = (array, punto) => {
    if (array && punto) {
      const exists = array.includes(punto);
      return exists;
    }
  };

  const stars = () => {
    let star = '⭐';
    let allstars = '';
    for (let i = 0; i < destination.Calificaciones; i++) {
      allstars += star;
    }
    return allstars;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    GetIdsFavouritesFromDB(user_Id);
    cantMegusta();
    if (destination?.Calificaciones) {
      setHotelStars(stars());
    }
    setActivePage('PuntoInteresInfo');
    var sUsrAg = navigator.userAgent;
    if (sUsrAg.indexOf('Firefox') > -1) {
      setFirefox(true);
    }
    setInitialState(isFavourite(idsFavouritesFromDB, destination.id));
    // eslint-disable-next-line
  }, [setActivePage, destination.id]);

  useEffect(() => {
    if (!destination.Nombre) {
      navigate('/');
    }
    setPage('PuntoInteresInfo');
    // eslint-disable-next-line
  }, []);

  const handleCategories = () => {
    navigate(-1);
  };

  function capitalize(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }

  function formatearFecha(fechaOriginal) {
    const objetoFecha = new Date(fechaOriginal);
    const opciones = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    const nuevaFecha = objetoFecha.toLocaleDateString('es-ES', opciones);
    return capitalize(nuevaFecha);
  }

  function convertirHora(horaOriginal) {
    return horaOriginal.substring(0, horaOriginal.length - 3);
  }

  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>
      <div className="puntoInteresInfo">
        <div className="divBackbtn">
          <button className="backBtn" onClick={() => handleCategories()}>
            Volver
          </button>
        </div>
        <div className="puntoInteres__container">
          <div className="divInfoYSlider">
            <div className="puntoInteres__info">
              <div className="containerLikeButton">
                <LikeButton
                  puntosinteres_id={destination.id}
                  user_Id={user_Id}
                  initialState={initialState}
                  setInitialState={setInitialState}
                  cantLikes={cantLikes}
                  setCantLikes={setCantLikes}
                />
                <LikeNumbers cantLikes={cantLikes} />
              </div>
              <h2 className="puntoInteres__info__tipo">
                {destination.TipoEvento
                  ? destination.TipoEvento
                  : destination.Tipo === 'Hotel'
                  ? `${destination.Tipo}${' '}${hotelStars}`
                  : `${destination.Tipo}`}
              </h2>
              {destination.Eventos_id ? (
                <div className="divEventosNombreYlugar">
                  {' '}
                  <h2 className="nombreylugar">
                    {destination.NombreEvento} - {destination.Nombre}
                  </h2>
                  <h5 className="eventoFechaYHora">
                    📆 {formatearFecha(destination.FechaInicio)},{' '}
                    {convertirHora(destination.HoraInicio)} Hs.
                  </h5>{' '}
                </div>
              ) : (
                <div className="divEventosNombreYlugar">
                  {' '}
                  <h2 className="nombreylugar">
                    {' '}
                    <li className="puntoInteresMarker"></li>
                    {destination.Nombre}{' '}
                  </h2>
                </div>
              )}
              <div className="puntoInteres__info__datos">
                <p>
                  <span>
                    {filtrarTraduccion(traduccionesBD, 'placeCity', lenguage)}:{' '}
                  </span>
                  {destination.Ciudad}
                </p>
                <p>
                  <span>
                    {filtrarTraduccion(traduccionesBD, 'placeState', lenguage)}:{' '}
                  </span>
                  {destination.Departamento}
                </p>
                <p>
                  <span>
                    {filtrarTraduccion(
                      traduccionesBD,
                      'placeAddress',
                      lenguage
                    )}
                    :{' '}
                  </span>
                  {destination.Direccion}
                </p>
                <p>
                  <span>
                    {filtrarTraduccion(traduccionesBD, 'telephone', lenguage)}:{' '}
                  </span>
                  {destination?.telefono?.Telefono ||
                    `${filtrarTraduccion(
                      traduccionesBD,
                      'noNumber',
                      lenguage
                    )}`}
                </p>
              </div>
              <div className="puntoInteres__info__datos2">
                <p className="puntoInteres__info__descripcion">
                  <span>
                    {filtrarTraduccion(
                      traduccionesBD,
                      'placeDescription',
                      lenguage
                    )}
                    :{' '}
                  </span>
                  {destination.Descripcion}
                </p>
              </div>
              <div className="puntoInteres__info__horarios">
                <p>
                  <span>
                    {filtrarTraduccion(
                      traduccionesBD,
                      'placeOpeningTime',
                      lenguage
                    )}
                    :{' '}
                  </span>{' '}
                  {destination.HoraDeApertura}
                </p>
                <p>
                  <span>
                    {filtrarTraduccion(
                      traduccionesBD,
                      'placeClosingTime',
                      lenguage
                    )}
                    :{' '}
                  </span>{' '}
                  {destination.HoraDeCierre}
                </p>
              </div>
            </div>
            <div className="puntoInteres__imagen">
              {destination.Eventos_id ? (
                <img
                  className="imgEventoPinteresinfo"
                  src={destination.ImagenEvento}
                />
              ) : (
                <SliderFirefox array={arrURLS} />
              )}
            </div>
          </div>
          {destination.Tipo === 'Hotel' || destination.Tipo === 'Hostel' ? (
            <div className="puntoInteres__especificaciones">
              <div className="puntoInteres__especificaciones__info">
                <h2>
                  {filtrarTraduccion(traduccionesBD, 'hotelEspec', lenguage)}
                </h2>
              </div>
              <div className="puntoInteres__especificaciones__datos">
                <div className="puntoInteres__especificaciones__datos1">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          {filtrarTraduccion(
                            traduccionesBD,
                            'privateBathroom',
                            lenguage
                          )}
                        </td>
                        <td>{destination.BanoPrivad === 1 ? '✅ ' : '❌'}</td>
                      </tr>
                      <tr>
                        <td>Casino</td>
                        <td>{destination.Casino === 1 ? '✅ ' : '❌'}</td>
                      </tr>
                      <tr>
                        <td>
                          {filtrarTraduccion(
                            traduccionesBD,
                            'restaurant',
                            lenguage
                          )}
                        </td>
                        <td>{destination.Restaurante === 1 ? '✅ ' : '❌'}</td>
                      </tr>
                      <tr>
                        <td>
                          {filtrarTraduccion(
                            traduccionesBD,
                            'breakfast',
                            lenguage
                          )}
                        </td>
                        <td>{destination.Desayuno === 1 ? '✅ ' : '❌'}</td>
                      </tr>
                      <tr>
                        <td>
                          {filtrarTraduccion(
                            traduccionesBD,
                            'cableTv',
                            lenguage
                          )}
                        </td>
                        <td>{destination.TvCable === 1 ? '✅ ' : '❌'}</td>
                      </tr>
                      <tr>
                        <td>
                          {filtrarTraduccion(
                            traduccionesBD,
                            'swimmingPool',
                            lenguage
                          )}
                        </td>
                        <td>{destination.Piscina === 1 ? '✅ ' : '❌'}</td>
                      </tr>
                      <tr>
                        <td>Wifi</td>
                        <td>{destination.Wifi === 1 ? '✅ ' : '❌'}</td>
                      </tr>
                      <tr>
                        <td>
                          {filtrarTraduccion(
                            traduccionesBD,
                            'airConditioner',
                            lenguage
                          )}
                        </td>
                        <td>
                          {destination.AireAcondicionado === 1 ? '✅ ' : '❌'}
                        </td>
                      </tr>
                      <tr>
                        <td>Bar</td>
                        <td>{destination.Bar === 1 ? '✅ ' : '❌'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : destination.Tipo === 'Restaurantes' ? (
            <div className="puntoInteres__especificaciones__gastronomia">
              <div className="puntoInteres__especificaciones__info__gastronomia">
                <h2>
                  {filtrarTraduccion(
                    traduccionesBD,
                    'restaurantEspec',
                    lenguage
                  )}
                </h2>
              </div>
              <div className="puntoInteres__especificaciones__datos1">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        {filtrarTraduccion(
                          traduccionesBD,
                          'especiality',
                          lenguage
                        )}
                      </td>
                      <td>{destination.Especialidad === 1 ? '✅ ' : '❌'}</td>
                    </tr>
                    <tr>
                      <td>
                        {filtrarTraduccion(
                          traduccionesBD,
                          'veggieFood',
                          lenguage
                        )}
                      </td>
                      <td>{destination.ComidaVegge === 1 ? '✅ ' : '❌'}</td>
                    </tr>
                    <tr>
                      <td>Alcohol</td>
                      <td>{destination.Alcohol === 1 ? '✅ ' : '❌'}</td>
                    </tr>
                    <tr>
                      <td>
                        {filtrarTraduccion(
                          traduccionesBD,
                          'childrenMenu',
                          lenguage
                        )}
                      </td>
                      <td>{destination?.MenuInfantil === 1 ? '✅ ' : '❌'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            ''
          )}
          {Facebook | (Instagram !== null) ? (
            <div className="puntoInteres__info__social">
              <h2>
                {filtrarTraduccion(
                  traduccionesBD,
                  'placeMoreInformation',
                  lenguage
                )}
                :{' '}
              </h2>
              <div>
                {destination?.Instagram ? (
                  <a href={destination?.Instagram} target="_blank">
                    <img
                      src="https://img.icons8.com/color/48/000000/instagram-new--v1.png"
                      alt="instagram"
                    />
                  </a>
                ) : null}
                {destination?.Facebook ? (
                  <a href={destination?.Facebook} target="_blank">
                    <img
                      src="https://img.icons8.com/fluency/48/000000/facebook.png"
                      alt="facebook"
                    />{' '}
                    {}
                  </a>
                ) : null}

                {destination?.Web ? (
                  <a href={destination?.Web} target="_blank">
                    <img
                      src="https://img.icons8.com/fluency/48/000000/domain.png"
                      alt="web"
                    />{' '}
                    {}
                  </a>
                ) : null}
              </div>
            </div>
          ) : (
            ''
          )}
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

export default PuntoInteresInfo;
