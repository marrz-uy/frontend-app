import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import AuthUser from './AuthUser';
import '../Css/SliderEvents.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';

export const SliderEvents = ({
  arrayimages,
  sliderPoints,
  title,
  description,
  destination,
  setDestination,
}) => {
  const navigate = useNavigate();
  const { http } = AuthUser();
  console.log('SLIDER 2-SLIDER: ', sliderPoints);

  const goOnPoint = async (e) => {
    e.preventDefault();
    const id = e.target.id;
    console.log('TARGET-ID: ', id);
    const req = await http
      .post(`http://localhost:8000/api/sliderDos/evento/${id}`, {})
      .then((response) => {
        console.log('%cDATA:', 'color: blue;', response?.data);
        console.log(
          '%cpunto:',
          'color: yellow;',
          response?.data.puntos_interes
        );
        console.log('%cevento:', 'color: pink;', response?.data[0]);
        let punto = response?.data[0].puntos_interes;
        let evento = response?.data[0];
        let categoria = response?.data[1];
        const objetoUnido = { ...punto, ...evento, ...categoria };
        return objetoUnido;
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
    console.log('%cREQ: ', 'color:red;', req);

    setDestination(req);

    console.log('DESTINATION: ', destination);
    navigate('/infoResults');
  };

  function capitalize(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }

  function formatearFecha(fechaOriginal) {
    const objetoFecha = new Date(fechaOriginal);
    const opciones = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    const nuevaFecha = objetoFecha.toLocaleDateString('es-ES', opciones);
    return capitalize(nuevaFecha);
  }

  function convertirHora(horaOriginal) {
    return horaOriginal.substring(0, horaOriginal.length - 3);
  }

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
                      src={point.ImagenEvento}
                      alt=""
                      id={point.Eventos_id}
                      onClick={goOnPoint}
                    />
                    <h6 className="dateInImage">
                      📆 {formatearFecha(point.FechaInicio)},{' '}
                      {convertirHora(point.HoraInicio)} Hs.
                    </h6>

                    <span className="titleLink" onClick={goOnPoint}>
                      {point.NombreEvento}
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
