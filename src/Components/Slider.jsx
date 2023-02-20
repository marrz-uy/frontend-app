import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useNavigate } from 'react-router-dom';
import AuthUser from '../Components/AuthUser';
import '../Css/Slider.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';

export const Slider = ({
  arrayimages,
  sliderPoints,
  title,
  description,
  destination,
  setDestination,
}) => {
  const navigate = useNavigate();
  const { http } = AuthUser();
  console.log('SLIDERPOINT-DATA-SLIDER: ', sliderPoints);

  const goOnPoint = async (e) => {
    e.preventDefault();
    const id = e.target.id;
    console.log('TARGET-ID: ', id);
    const req = await http
      .get(`http://localhost:8000/api/PuntosInteres/${id}`, {})
      .then((response) => {
        console.log('%cDATA:', 'color: blue;', response?.data);
        console.log('%cPUNTO:', 'color: blue;', response?.data.punto);
        console.log('%cTIPO:', 'color: yellow;', response?.data.categoria);
        console.log('%cIMAGENES:', 'color: yellow;', response?.data.categoria);
        let punto = response?.data.punto;
        let categoria = response?.data.categoria;
        const objetoUnido = { ...punto, ...categoria };
        return objetoUnido;
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
    console.log('REQ: ', req);
    // setTimeout(() => {
    setDestination(req);
    // }, 2000);

    console.log('DESTINATION: ', destination);
    navigate('/infoResults');
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
                <div className="item" key={point.id} onClick={goOnPoint}>
                  <SwiperSlide key={point.id}>
                    <img src={point?.imagenes[0].url} alt="" />
                    <h6 className="descriptionInImage">
                      Le gusta a: {point.Megusta}
                    </h6>

                    <span
                      className="titleLink"
                      id={point.id}
                      onClick={goOnPoint}
                    >
                      {point.Nombre}
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
