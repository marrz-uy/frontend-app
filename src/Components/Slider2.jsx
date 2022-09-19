import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import '../Css/Slider2.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';
// import { Imagecard } from './Imagecard';

export const Slider2 = ({ arrayimages, title, description }) => {
  console.log('dataaaa: ', arrayimages)
  return (
    <>
      <div className="tituloSlider">
        <div className="titulo">
          <h4>{title}</h4>
        </div>
        <div className='description'>
          <span>{description}</span>
        </div>
      </div>
      <Swiper
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
        modules={[Pagination]}
        className="mySwiper"
      >
        {arrayimages.map((img, index) => (
          <div className="item" key={img}>
            <SwiperSlide key={img}>
              <a href={img}>
                <img src={img}  alt="" />
              </a>
              <span>Nombre</span>
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </>
  );
};
