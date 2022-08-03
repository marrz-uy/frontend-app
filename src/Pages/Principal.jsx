import { Layout } from '../Layout';
import { useEffect, useContext } from 'react';
import LenguageContext from '../Context/LenguageContext';
import '../Css/Principal.css';
import hotelImg from '../Assets/categoriesImages/hospedaje.png';
import predefTour from '../Assets/categoriesImages/la-carretera.png';
import setYourTour from '../Assets/categoriesImages/mosaico2.png';
import restaurant from '../Assets/categoriesImages/fast-food 1.png';
import trips from '../Assets/categoriesImages/summer-holidays 1.png';
import transport from '../Assets/categoriesImages/bus.png';
import { useNavigate } from 'react-router-dom';

const Principal = ({ setItems, setPage }) => {
  const { textos } = useContext(LenguageContext);
  useEffect(() => {
    setPage('principal');
  }, [setPage]);

  const navigate = useNavigate();

  const handleCategories = (e) => {
    setItems(e);
    setPage('results');
    navigate('/results');
  };

  return (
    <Layout>
      <div className="container">
        <div className="categories" onClick={() => handleCategories('tours')}>
          <img className="lacarretera" src={predefTour} alt="hotel"></img>
          <span>{textos.predefinedToursLabel}</span>
        </div>
        <div
          className="categories"
          onClick={() => handleCategories('armar tour')}
        >
          <img src={setYourTour} alt="img"></img>
          <span>{textos.buildMyTourLabel}</span>
        </div>
        <div className="categories" onClick={() => handleCategories('hoteles')}>
          <img src={hotelImg} alt="img"></img>
          <span>{textos.lodginLabel}</span>
        </div>
        <div
          className="categories"
          onClick={() => handleCategories('restaurantes')}
        >
          <img src={restaurant} alt="img"></img>
          <span>{textos.gastronomylabel}</span>
        </div>
        <div className="categories" onClick={() => handleCategories('paseos')}>
          <img src={trips} alt="img"></img>
          <span>{textos.outingLabel}</span>
        </div>
        <div
          className="categories"
          onClick={() => handleCategories('transportes')}
        >
          <img src={transport} alt="img"></img>
          <span>{textos.transportLabel}</span>
        </div>
      </div>
    </Layout>
  );
};

export default Principal;
