import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../Css/Slider.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';

export const Slider = ({ arrayimages, title, description }) => {
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
        {arrayimages.map((img, index) => (
          <div className="item" key={img}>
            <SwiperSlide key={img}>
              <img src={img} alt="" />
              <a href={img}>
                <span>{`Nombre de imagen ${index + 1}`}</span>
              </a>
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </>
  );
};
