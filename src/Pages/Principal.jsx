import { useEffect, useContext, useState } from 'react';
import { Layout } from '../Layout';
import LenguageContext from '../Context/LenguageContext';
import axios from 'axios';
import '../Css/Principal.css';
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


const Principal = ({ setItems, items, setPage, page, setText, userBar, setUserBar,isLoggedIn, setIsLoggedIn }) => {
  const { textos } = useContext(LenguageContext);
  const [seeAll, setSeeAll] = useState(false);
  const [btnText, setBtnText] = useState('');

  const { width } = useScreenSize();

  console.log('WIDTH: ', width);

  useEffect(() => {
    setPage('principal');
    if (page === 'principal') {
      setText('');
    }
  }, [setPage, setText, page]);

  console.log('BTNTXT: ', btnText);

  const getData = (categoria) => {
    axios
      .get(`http://localhost:8000/api/PuntosInteres/categoria/${categoria}`)
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
    setText(`${textos.category} ${e}`);
    getData(e);
    setPage('results');
    navigate('/results');
  };

  handleUserBar(userBar)


  return (
    <Layout>
      <div className='userbar-click' onClick={() => setUserBar(false)}></div>
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
              <span>{textos.predefinedToursLabel}</span>
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
              <span>{textos.buildMyTourLabel}</span>
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
              <span>{textos.lodginLabel}</span>
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
              <span>{textos.gastronomylabel}</span>
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
              <span>{textos.outingLabel}</span>
            </div>
          </div>
          <div
            className="categories"
            // onClick={() => handleCategories('Transporte')}
          >
            <div className="categoriesImage">
              <img src={transport} alt="transportes"></img>
            </div>
            <div className="categoriesText">
              <span>{textos.transportLabel}</span>
            </div>
          </div>
        </div>

        {seeAll || width > 810 ? (
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
                  <span>{textos.showsLabel}</span>
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
                  <span>{textos.nightActivitiesLabel}</span>
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
                  <span>{textos.esentialsServicesLabel}</span>
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
                  <span>{textos.childActivities}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        <div className="seeAllButtonDiv">
          <button className="seeAllButton" onClick={handleSeeAll}>
            {btnText === true ? 'Ver menos categorias' : 'Ver mas categorias'}
          </button>
        </div>
      </div>
      {userBar && <UserBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserBar={setUserBar}/>}
    </Layout>
  );
};

export default Principal;
