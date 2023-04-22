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
  sliderPoints,
  title,
  description,
  destination,
  setDestination,
}) => {
  const navigate = useNavigate();
  const { http } = AuthUser();

  const goOnPoint = async (e) => {
    e.preventDefault();
    const id = e.target.id;
    const req = await http
      .get(`/PuntosInteres/${id}`, {})
      .then((response) => {
        let punto = response?.data.punto;
        let categoria = response?.data.categoria;
        const objetoUnido = { ...punto, ...categoria };
        return objetoUnido;
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
    setDestination(req);

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
        {sliderPoints?.map((point) => {
          return (
            <div className="item" key={point.id}>
              <SwiperSlide key={point.id}>
                <img
                  src={
                    !point?.imagenes[0] ? sinImagen : point?.imagenes[0]?.url
                  }
                  alt=""
                  onClick={goOnPoint}
                  id={point.id}
                />
                <h6 className="likesLabel">💙 {point.Megusta}</h6>
                <span className="titleLink" id={point.id} onClick={goOnPoint}>
                  {point.Nombre}
                </span>
              </SwiperSlide>
            </div>
          );
        })}
      </Swiper>
    </>
  );
};
