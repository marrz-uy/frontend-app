import React from 'react';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../Css/Slider2.css';
import 'swiper/css';
// import { Imagecard } from './Imagecard';

export const Slider2 = ({ arrayimages, title, description }) => {
  return (
    <>
      <Swiper
        modules={[Pagination]}
       
        pagination={{
          clickable: true,
        }}
        slidesPerView={1}
        spaceBetween={10}
        centeredSlides={true}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          "@1.50": {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        className="mySwiper"
      >
        {arrayimages?.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="pagination"></div>
    </>
  );
};

