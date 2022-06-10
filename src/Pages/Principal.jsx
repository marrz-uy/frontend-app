import '../css/Principal.css'
import hotelImg from '../Assets/categoriesImages/hospedaje.png';
import predefTour from '../Assets/categoriesImages/la-carretera.png'; 
import setYourTour from '../Assets/categoriesImages/mosaico.png';
import restaurant from '../Assets/categoriesImages/fast-food 1.png';
import trips from '../Assets/categoriesImages/summer-holidays 1.png';
import transport from '../Assets/categoriesImages/bus.png';

export const Principal = () => {
  return (
    <div className='container'>
      <div className='categories'>
        <img src={predefTour} alt='hotel'></img>
      </div>
      <div className='categories'>
        <img src={setYourTour} alt='hotel'></img>
      </div>
      <div className='categories'>
        <img src={hotelImg} alt='hotel'></img>
      </div>
      <div className='categories'>
        <img src={restaurant} alt='hotel'></img>
      </div>
      <div className='categories'>
        <img src={trips} alt='hotel'></img>
      </div>
      <div className='categories'>
        <img src={transport} alt='hotel'></img>
      </div>
    </div>
  );
};
