import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import '../Css/SliderEvents.css';
import 'swiper/swiper.min.css';
import 'swiper/modules/free-mode/free-mode.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import AuthUser from './AuthUser';

export const SliderEvents = ({
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
      .post(`/sliderDos/evento/${id}`, {})
      .then((response) => {
        let punto = response?.data[0].puntos_interes;
        let evento = response?.data[0];
        let categoria = response?.data[1];
        const objetoUnido = { ...punto, ...evento, ...categoria };
        return objetoUnido;
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
    setDestination(req);
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
        // id="slider1"
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
        {sliderPoints?.map((point, index) => {
          return (
            <div className="item" key={point.Eventos_id}>
              <SwiperSlide key={point.Eventos_id}>
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
        })}
      </Swiper>
    </>
  );
};
