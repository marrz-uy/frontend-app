import { useEffect, useContext, useState } from 'react';
import { Layout } from '../Layout';
import LenguageContext from '../Context/LenguageContext';
import AuthUser from '../Components/AuthUser';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import hotelImg from '../Assets/categoriesImages/hospedaje.png';
import predefTour from '../Assets/categoriesImages/la-carretera.png';
import setYourTour from '../Assets/categoriesImages/mosaico2.png';
import restaurant from '../Assets/categoriesImages/fast-food 1.png';
import trips from '../Assets/categoriesImages/summer-holidays 1.png';
import transport from '../Assets/categoriesImages/bus.png';
import teatro from '../Assets/categoriesImages/teatro 1.png';
import actividaesNocturnas from '../Assets/categoriesImages/cocktail 1.png';
import serviciosEscenciales from '../Assets/categoriesImages/services 1.png';
import serviciosInfantiles from '../Assets/categoriesImages/calesita 1.png';
import { useNavigate } from 'react-router-dom';
import useScreenSize from '../Helpers/ScreenSize';
import { handleUserBar } from '../Helpers/HandUserBarClick';
import UserBar from './UserBar';
import { Slider } from '../Components/Slider';
import {
  gastronomicas,
  alojamientos,
  // turisticas,
} from '../Data/SliderImages.js';
import '../Css/Principal.css';
import useGeoLocation from '../Helpers/useGeolocation';

const Principal = ({
  setItems,
  setPage,
  page,
  setText,
  userBar,
  setUserBar,
  isLoggedIn,
  setIsLoggedIn,
  searchType,
  setSearchType,
  categoryName,
  setCategoryName,
}) => {
  // const location = useGeoLocation();
  const { traduccionesBD, lenguage } = useContext(LenguageContext);
  const [seeAll, setSeeAll] = useState(false);
  const [btnText, setBtnText] = useState('');

  const { width } = useScreenSize();

  const { http } = AuthUser();

  useEffect(() => {
    setPage('principal');
    if (page === 'principal') {
      setText('');
    }
  }, [setPage, setText, page]);

  const [latitudAEnviar, setLatitudAEnviar] = useState('');
  const [longitudAEnviar, setLongitudAEnviar] = useState('');
  const [distanciaAEnviar, setDistanciaAEnviar] = useState(50000);

  const { loaded, latitud, longitud, accuracy, altitude, speed } =
    useGeoLocation();

  console.log(
    'LOCATION: ',
    loaded,
    latitud,
    longitud,
    accuracy,
    altitude,
    speed
  );

  useEffect(() => {
    if (latitud !== null || longitud !== null) {
      setLatitudAEnviar(+latitud);
      setLongitudAEnviar(+longitud);
      setDistanciaAEnviar(50000);
      console.log(
        'A ENVIAR: ',
        loaded,
        latitud,
        longitud
      );
    }
  }, [loaded, latitud, longitud]);

  const getData = (categoria) => {
    http
      .post(`/PuntosInteresCercanos/categoria/${categoria}`, {
        latitudAEnviar,
        longitudAEnviar,
        distanciaAEnviar,
      })
      .then((response) => {
        const allDdata = response.data;
        setItems(allDdata);
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
  };

  const navigate = useNavigate();

  const handleSeeAll = () => {
    setSeeAll(!seeAll);
    setBtnText(!btnText);
  };

  const handleCategories = (e) => {
    setItems(e);
    setText(`${filtrarTraduccion(traduccionesBD, 'category', lenguage)} ${e}`);
    console.log('%cTEXT PRINCIPAL:', 'color: green;', e);
    getData(e);
    setPage('results');
    setSearchType('categoria');
    setCategoryName(e);
    navigate('/results');
  };

  handleUserBar(userBar);

  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>
      <div className="container">
        <div className="containerCategories">
          <div
            className="categories"
            // onClick={() => handleCategories('Tours Predefinidos')}
          >
            <div className="categoriesImage">
              <img src={predefTour} alt="hotel"></img>
            </div>
            <div className="categoriesText">
              <span>
                {filtrarTraduccion(
                  traduccionesBD,
                  'predefinedToursLabel',
                  lenguage
                )}
              </span>
            </div>
          </div>
          <div
            className="categories"
            // onClick={() => handleCategories('Armar tour')}
          >
            <div className="categoriesImage">
              <img src={setYourTour} alt="setYourTour"></img>
            </div>
            <div className="categoriesText">
              <span>
                {filtrarTraduccion(
                  traduccionesBD,
                  'buildMyTourLabel',
                  lenguage
                )}
              </span>
            </div>
          </div>
          <div
            className="categories"
            // onClick={() => handleCategories('Alojamiento')}
          >
            <div className="categoriesImage">
              <img src={hotelImg} alt="hotel"></img>
            </div>
            <div className="categoriesText">
              <span>
                {filtrarTraduccion(traduccionesBD, 'lodginLabel', lenguage)}
              </span>
            </div>
          </div>
          <div
            className="categories"
            // onClick={() => handleCategories('Gastronomia')}
          >
            <div className="categoriesImage">
              <img src={restaurant} alt="restaurantes"></img>
            </div>
            <div className="categoriesText">
              <span>
                {filtrarTraduccion(traduccionesBD, 'gastronomylabel', lenguage)}
              </span>
            </div>
          </div>
          <div
            className="categories"
            // onClick={() => handleCategories('Actividades al Aire Libre')}
          >
            <div className="categoriesImage">
              <img src={trips} alt="img"></img>
            </div>
            <div className="categoriesText">
              <span>
                {filtrarTraduccion(traduccionesBD, 'outingLabel', lenguage)}
              </span>
            </div>
          </div>
          <div
            className="categories"
            onClick={() => handleCategories('Transporte')}
          >
            <div className="categoriesImage">
              <img src={transport} alt="transportes"></img>
            </div>
            <div className="categoriesText">
              <span>
                {filtrarTraduccion(traduccionesBD, 'transportLabel', lenguage)}
              </span>
            </div>
          </div>
        </div>

        {seeAll || width > 809 ? (
          <>
            <div className="containerCategories">
              <div
                className="categories"
                onClick={() => handleCategories('Espectaculos')}
              >
                <div className="categoriesImage">
                  <img src={teatro} alt="espectaculos"></img>
                </div>
                <div className="categoriesText">
                  <span>
                    {filtrarTraduccion(traduccionesBD, 'showsLabel', lenguage)}
                  </span>
                </div>
              </div>

              <div className="categories">
                <div className="categoriesImage">
                  <img
                    src={actividaesNocturnas}
                    alt="Actividaes Nocturnas"
                  ></img>
                </div>
                <div className="categoriesText">
                  <span>
                    {filtrarTraduccion(
                      traduccionesBD,
                      'nightActivitiesLabel',
                      lenguage
                    )}
                  </span>
                </div>
              </div>

              <div
                className="categories"
                onClick={() => handleCategories('Servicios Esenciales')}
              >
                <div className="categoriesImage">
                  <img
                    src={serviciosEscenciales}
                    alt="Servicios Esenciales"
                  ></img>
                </div>
                <div className="categoriesText">
                  <span>
                    {filtrarTraduccion(
                      traduccionesBD,
                      'esentialsServicesLabel',
                      lenguage
                    )}
                  </span>
                </div>
              </div>
              <div className="categories">
                <div className="categoriesImage">
                  <img
                    src={serviciosInfantiles}
                    alt="Servicios Infantiles"
                  ></img>
                </div>
                <div className="categoriesText">
                  <span>
                    {filtrarTraduccion(
                      traduccionesBD,
                      'childActivities',
                      lenguage
                    )}
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        <div className="seeAllButtonDiv">
          <button className="seeAllButton" onClick={handleSeeAll}>
            {btnText === true
              ? filtrarTraduccion(traduccionesBD, 'seeLessCategories', lenguage)
              : filtrarTraduccion(
                  traduccionesBD,
                  'seeMoreCategories',
                  lenguage
                )}
          </button>
        </div>
      </div>
      <div className="contenedorSliders">
        <Slider
          title={filtrarTraduccion(traduccionesBD, 'Slider1Title', lenguage)}
          description={filtrarTraduccion(
            traduccionesBD,
            'Slider1Description',
            lenguage
          )}
          arrayimages={alojamientos}
        />
        <Slider
          title={`${filtrarTraduccion(
            traduccionesBD,
            'Slider2Title',
            lenguage
          )} Montevideo`}
          description={`${filtrarTraduccion(
            traduccionesBD,
            'Slider2Description',
            lenguage
          )} Montevideo`}
          arrayimages={alojamientos}
        />
        <Slider
          title={filtrarTraduccion(traduccionesBD, 'Slider3Title', lenguage)}
          description={filtrarTraduccion(
            traduccionesBD,
            'Slider3Description',
            lenguage
          )}
          arrayimages={gastronomicas}
        />
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

export default Principal;
