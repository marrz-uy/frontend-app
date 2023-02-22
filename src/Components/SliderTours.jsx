import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import '../Css/SliderTours.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';

export const SliderTours = ({
  arrayimages,
  sliderPoints,
  title,
  description,
}) => {
  const navigate = useNavigate();
  console.log('SLIDER 3-SLIDER: ', sliderPoints);

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
          '@0.00': {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          '@0.75': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '@1.00': {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          '@1.50': {
            slidesPerView: 4,
            spaceBetween: 50,
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
                    <h6 className="dateInImage"></h6>

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