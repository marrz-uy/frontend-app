import { Layout } from '../Layout';
import '../Css/Principal.css';
import hotelImg from '../Assets/categoriesImages/hospedaje.png';
import predefTour from '../Assets/categoriesImages/la-carretera.png';
import setYourTour from '../Assets/categoriesImages/mosaico2.png';
import restaurant from '../Assets/categoriesImages/fast-food 1.png';
import trips from '../Assets/categoriesImages/summer-holidays 1.png';
import transport from '../Assets/categoriesImages/bus.png';
import { useNavigate } from 'react-router-dom';

const Principal = ({ setItems }) => {
  const navigate = useNavigate();

  const handleCategories = (e) => {
    setItems(e);
    navigate('/results');
  };

  return (
    <Layout>
      <div className="container">
        <div className="categories" onClick={() => handleCategories('tours')}>
          <img className="lacarretera" src={predefTour} alt="hotel"></img>
          <span>Tours Predefinidos</span>
        </div>
        <div
          className="categories"
          onClick={() => handleCategories('armar tour')}
        >
          <img src={setYourTour} alt="hotel"></img>
          <span>Armar Tour</span>
        </div>
        <div className="categories" onClick={() => handleCategories('hoteles')}>
          <img src={hotelImg} alt="hotel"></img>
          <span>Hospedaje</span>
        </div>
        <div
          className="categories"
          onClick={() => handleCategories('restaurantes')}
        >
          <img src={restaurant} alt="hotel"></img>
          <span>Gastronomia</span>
        </div>
        <div className="categories" onClick={() => handleCategories('paseos')}>
          <img src={trips} alt="hotel"></img>
          <span>Paseos</span>
        </div>
        <div
          className="categories"
          onClick={() => handleCategories('transportes')}
        >
          <img src={transport} alt="hotel"></img>
          <span>Transporte</span>
        </div>
      </div>
    </Layout>
  );
};

export default Principal;
