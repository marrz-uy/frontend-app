import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import '../Css/SliderTours.css';
import 'swiper/swiper.min.css';
import 'swiper/modules/free-mode/free-mode.min.css';
import 'swiper/modules/navigation/navigation.min.css';

export const SliderTours = ({
  arrayimages,
  sliderPoints,
  title,
  description,
}) => {
  const navigate = useNavigate();
  // console.log('SLIDER 3-SLIDER: ', sliderPoints);

  const goToPredefinedTours = async (e) => {
    navigate('/predefined');
  };

  return (
    <>
      <div className="tituloSlider" id="tituloSlider">
        <div className="titulo">
          <h2>{title}</h2>
        </div>
        <div className="description">
          <span>{description}</span>
        </div>
      </div>
      <Swiper
        id="slider1"
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          375: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          // when window width is >= 900px
          900: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // when window width is >= 1280px
          1280: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          // when window width is >= 1720px
          1720: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {sliderPoints
          ? sliderPoints.map((point) => {
              return (
                <div className="item" key={point.id}>
                  <SwiperSlide key={point.id}>
                    <img
                      src={point.imagenTour}
                      alt=""
                      onClick={goToPredefinedTours}
                    />
                    <span
                      className="titleLink"
                      id={point.id}
                      onClick={goToPredefinedTours}
                    >
                      {point.nombreTourPredefinido}
                    </span>
                  </SwiperSlide>
                </div>
              );
            })
          : arrayimages.map((img, index) => (
              <div className="item" key={img}>
                <SwiperSlide key={img}>
                  <img src={img} alt=""></img>
                  <p className="descriptionInImage">Imagenes ilustrativas</p>
                  <a href={img}>
                    <span>
                      {' '}
                      <h5 className="">{`Nombre de imagen ${index + 1}`}</h5>
                    </span>
                  </a>
                </SwiperSlide>
              </div>
            ))}
      </Swiper>
    </>
  );
};
