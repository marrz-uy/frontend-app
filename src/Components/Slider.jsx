import { useNavigate } from 'react-router-dom';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import AuthUser from '../Components/AuthUser';

import 'swiper/swiper.min.css';
import 'swiper/modules/free-mode/free-mode.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import '../Css/Slider.css';
import sinImagen from '../Assets/sinimagen.png';

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
  // console.log('SLIDER 1-SLIDER: ', sliderPoints);

  const goOnPoint = async (e) => {
    e.preventDefault();
    const id = e.target.id;
    console.log('TARGET-ID: ', id);
    const req = await http
      .get(`/PuntosInteres/${id}`, {})
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
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          // when window width is >= 375px
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
                      src={
                        !point?.imagenes[0]
                          ? sinImagen
                          : point?.imagenes[0]?.url
                      }
                      className="imgSliderPoint"
                      alt=""
                      onClick={goOnPoint}
                      id={point.id}
                    />
                    <h6 className="likesLabel">💙 {point.Megusta}</h6>
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
