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
import SliderMain from '../Components/SliderMain';
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
  // console.log('DESTINATION: ', destination);
  let arrayImagenes = destination.imagenes;
  // console.log('arrayImagenes-INFO: ', arrayImagenes);
  const arrURLS = arrayImagenes?.map((imagen) => imagen?.url.replace(/"/g, ''));
  // console.log('arr-INFO: ', arrURLS);
  // console.log('arr-LARGO: ', arrURLS?.length);

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
        // console.log('%cCANTIDAD DE LIKES: ', 'color:skyblue;', response.data);
        setCantLikes(response.data);
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
  };

  const isFavourite = (array, punto) => {
    if (array && punto) {
      const exists = array.includes(punto);
      console.log('%cEXIST FAVORITO: ', 'color:skyblue;', exists);
      return exists;
    }
  };

  const stars = () => {
    let star = '⭐';
    let allstars = '';
    for (let i = 0; i < destination.Calificaciones; i++) {
      allstars += star;
    }
    // console.log(allstars);
    return allstars;
  };

  useEffect(() => {
    GetIdsFavouritesFromDB(user_Id);
    setTimeout(() => {
      cantMegusta();
    }, 3000);

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

  // console.log('%cINITIAL STATE: ', 'color:red;', initialState);
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

  console.log('INITIAL STATE info: ', initialState);

  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>

      <div className="puntoInteresInfo">
        <div className="divBackbtn">
          <button className="backBtn" onClick={() => handleCategories()}>
            Volver
          </button>
        </div>
        {/* <div className="nombrePunto"> */}
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
            <h2 className="nombreylugar"> {destination.Nombre} </h2>
          </div>
        )}
        {/* </div> */}
        <div className="puntoInteres__container">
          <div className="puntoInteres__imagen">
            {destination.Eventos_id ? (
              <img
                className="imgEventoPinteresinfo"
                alt="img"
                src={destination.ImagenEvento}
              />
            ) : firefox ? (
              <SliderMain array={arrURLS} />
            ) : (
              <Slider2 array={arrURLS} />
            )}
          </div>
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
              {destination.Tipo === 'Hotel'
                ? `${destination.Tipo}${' '}${hotelStars}`
                : `${destination.Tipo}`}
            </h2>
            <h1 className="puntoInteres__info__nombre">{destination.Nombre}</h1>
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
                  {filtrarTraduccion(traduccionesBD, 'placeAddress', lenguage)}:{' '}
                </span>
                {destination.Direccion}
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
                  <a href={destination.Instagram}>
                    <img
                      src="https://img.icons8.com/color/48/000000/instagram-new--v1.png"
                      alt="instagram"
                    />
                  </a>
                  <a href={destination.Faceebok}>
                    <img
                      src="https://img.icons8.com/fluency/48/000000/facebook.png"
                      alt="facebook"
                    />
                  </a>
                </div>
              </div>
            ) : (
              ''
            )}
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
                  <p>
                    <span>
                      {filtrarTraduccion(
                        traduccionesBD,
                        'privateBathroom',
                        lenguage
                      )}
                      :{' '}
                    </span>
                    {destination.BanoPrivad === 1 ? '✅ ' : '❌'}
                  </p>
                  <p>
                    <span>Casino: </span>
                    {destination.Casino === 1 ? '✅ ' : '❌'}
                  </p>
                  <p>
                    <span>Bar: </span>
                    {destination.Bar === 1 ? '✅ ' : '❌'}
                  </p>
                  <p>
                    <span>
                      {filtrarTraduccion(
                        traduccionesBD,
                        'restaurant',
                        lenguage
                      )}
                      :{' '}
                    </span>
                    {destination.Restaurante === 1 ? '✅ ' : '❌'}
                  </p>
                  <p>
                    <span>
                      {filtrarTraduccion(traduccionesBD, 'breakfast', lenguage)}
                      :{' '}
                    </span>
                    {destination.Desayuno === 1 ? '✅ ' : '❌'}
                  </p>
                </div>
                <div className="puntoInteres__especificaciones__datos2">
                  <p>
                    <span>
                      {filtrarTraduccion(traduccionesBD, 'cableTv', lenguage)}:{' '}
                    </span>
                    {destination.TvCable === 1 ? '✅ ' : '❌'}
                  </p>
                  <p>
                    <span>
                      {filtrarTraduccion(
                        traduccionesBD,
                        'swimmingPool',
                        lenguage
                      )}
                      :{' '}
                    </span>
                    {destination.Piscina === 1 ? '✅ ' : '❌'}
                  </p>
                  <p>
                    <span>Wifi: </span>
                    {destination.Wifi === 1 ? '✅ ' : '❌'}
                  </p>
                  <p>
                    <span>
                      {filtrarTraduccion(
                        traduccionesBD,
                        'airConditioner',
                        lenguage
                      )}
                      :{' '}
                    </span>
                    {destination.AireAcondicionado === 1 ? '✅ ' : '❌'}
                  </p>
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
              <div className="puntoInteres__especificaciones__datos__gastronomia">
                <p>
                  <span>
                    {filtrarTraduccion(traduccionesBD, 'especiality', lenguage)}
                    :{' '}
                  </span>{' '}
                  {destination.Especialidad}
                </p>
                <p>
                  <span>
                    {' '}
                    {filtrarTraduccion(
                      traduccionesBD,
                      'veggieFood',
                      lenguage
                    )}:{' '}
                  </span>{' '}
                  {destination.ComidaVegge === 1 ? '✅ ' : '❌'}
                </p>
                <p>
                  <span>Alcohol: </span>{' '}
                  {destination.Alcohol === 1 ? '✅ ' : '❌'}
                </p>
                <p>
                  <span>
                    {filtrarTraduccion(
                      traduccionesBD,
                      'childrenMenu',
                      lenguage
                    )}
                    :{' '}
                  </span>{' '}
                  {destination.MenuInfantil === 1 ? '✅ ' : '❌'}
                </p>
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
