import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../Layout';
import LenguageContext from '../Context/LenguageContext';
import PageContext from '../Context/PageContext';
import Swal from 'sweetalert2';
import AuthUser from '../Components/AuthUser';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import { handleUserBar } from '../Helpers/HandUserBarClick';
import UserBar from './UserBar';
import { Slider } from '../Components/Slider';
import { SliderEvents } from '../Components/SliderEvents';
import { SliderTours } from '../Components/SliderTours';
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
import useScreenSize from '../Helpers/ScreenSize';
import { gastronomicas, alojamientos } from '../Data/SliderImages.js';
import '../Css/Principal.css';
import '../Css/Toast.css';

const Principal = ({
  setItems,
  setPage,
  page,
  setText,
  userBar,
  setUserBar,
  isLoggedIn,
  setIsLoggedIn,
  setSearchType,
  setCategoryName,
  loaded,
  latitud,
  longitud,
  destination,
  setDestination,
}) => {
  const { setActivePage } = useContext(PageContext);
  const { traduccionesBD, lenguage } = useContext(LenguageContext);
  const [seeAll, setSeeAll] = useState(false);
  const [btnText, setBtnText] = useState('');

  const { width } = useScreenSize();

  const { http } = AuthUser();

  useEffect(() => {
    setPage('principal');
    setActivePage('principal');
    if (page === 'principal') {
      setText('');
    }
  }, [setPage, setText, page]);

  const [latitudAEnviar, setLatitudAEnviar] = useState('');
  const [longitudAEnviar, setLongitudAEnviar] = useState('');
  const [distanciaAEnviar, setDistanciaAEnviar] = useState(50000);

  useEffect(() => {
    if (latitud !== null || longitud !== null) {
      setLatitudAEnviar(+latitud);
      setLongitudAEnviar(+longitud);
      setDistanciaAEnviar(50000);
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
    setText(e);
    getData(e);
    setPage('results');
    setSearchType('categoria');
    setCategoryName(e);
    navigate('/results');
  };

  const handlebuildTour = (e) => {
    e.preventDefault();

    const id = sessionStorage.getItem('id');
    if (id === null) {
      Swal.fire({
        title: filtrarTraduccion(traduccionesBD, 'weAreSorryModal', lenguage),
        text: filtrarTraduccion(
          traduccionesBD,
          'sorryExplanationModal',
          lenguage
        ),
        icon: 'info',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: filtrarTraduccion(
          traduccionesBD,
          'loginBtnModal',
          lenguage
        ),
        cancelButtonText: filtrarTraduccion(
          traduccionesBD,
          'closeBtnModal',
          lenguage
        ),
        confirmButtonColor: '#083d99',
        cancelButtonColor: 'gray',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }
    sessionStorage.setItem(
      'tourPreferences',
      JSON.stringify({
        horaInicio: '',
        tipoDeLugar: '',
        restriccionDeEdad: '',
        enfoqueDePersonas: '',
        ubicacion: '',
      })
    );
    navigate('/tour');
  };

  const handlePredefinedTours = () => {
    navigate('/predefined');
  };

  const [sliderPoints1, setSliderPoints1] = useState('');
  const [sliderPoints2, setSliderPoints2] = useState('');
  const [sliderPoints3, setSliderPoints3] = useState('');

  const getSliderPoints = () => {
    const requests = [
      http.post('/sliderUno', {
        latitudAEnviar,
        longitudAEnviar,
        distanciaAEnviar,
      }),
      http.post('/sliderDos', {
        latitudAEnviar,
        longitudAEnviar,
        distanciaAEnviar,
      }),
      http.get('/sliderTres'),
    ];
    Promise.all(requests)
      .then((responses) => {
        setSliderPoints1(responses[0].data);
        setSliderPoints2(responses[1].data);
        setSliderPoints3(responses[2].data);
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
  };

  useEffect(() => {
    if (latitudAEnviar || longitudAEnviar || distanciaAEnviar)
      getSliderPoints();
  }, [latitudAEnviar, longitudAEnviar, distanciaAEnviar]);

  handleUserBar(userBar);

  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>
      <div className="container">
        <div className="containerCategories">
          <div className="categories" onClick={(e) => handlePredefinedTours(e)}>
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
          <div className="categories" onClick={(e) => handlebuildTour(e)}>
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
            onClick={() => handleCategories('Alojamiento')}
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
            onClick={() => handleCategories('Gastronomia')}
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
            onClick={() => handleCategories('Paseos')}
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
              <div
                className="categories"
                onClick={() => handleCategories('Actividades Nocturnas')}
              >
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
              <div
                className="categories"
                onClick={() => handleCategories('Actividades Infantiles')}
              >
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
          sliderPoints={sliderPoints1.data}
          destination={destination}
          setDestination={setDestination}
        />
        <SliderEvents
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
          sliderPoints={sliderPoints2.data}
          destination={destination}
          setDestination={setDestination}
        />
        <SliderTours
          title={filtrarTraduccion(traduccionesBD, 'Slider3Title', lenguage)}
          description={filtrarTraduccion(
            traduccionesBD,
            'Slider3Description',
            lenguage
          )}
          arrayimages={gastronomicas}
          sliderPoints={sliderPoints3.data}
          destination={destination}
          setDestination={setDestination}
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
