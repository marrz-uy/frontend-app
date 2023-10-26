import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import '../Css/SliderEvents.css';
import 'swiper/swiper.min.css';
import 'swiper/modules/free-mode/free-mode.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import { MyLoader, MyLoaderWide } from './LoaderImage';
import AuthUser from '../Components/AuthUser';
import useScreenSize from '../Helpers/ScreenSize';

export const SliderEvents = ({
  sliderPoints,
  title,
  description,
  destination,
  setDestination,
}) => {
  const navigate = useNavigate();
  const { http } = AuthUser();
  const { width } = useScreenSize();

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
      {!sliderPoints ? (
        width <= 450 ? (
          <div className="divSkelton">
            <MyLoader width={355} height={332} />
          </div>
        ) : width >= 451 && width < 900 ? (
          <div className="divSkelton">
            <MyLoaderWide width={700} height={332} />
          </div>
        ) : width >= 900 && width < 1280 ? (
          <div className="divSkelton">
            <MyLoader width={500} height={332} />
            <MyLoader width={500} height={332} />
          </div>
        ) : width >= 1280 && width < 1720 ? (
          <div className="divSkelton">
            <MyLoader width={500} height={332} />
            <MyLoader width={500} height={332} />
            <MyLoader width={500} height={332} />
          </div>
        ) : width >= 1720 ? (
          <div className="divSkelton">
            <MyLoader width={500} height={332} />
            <MyLoader width={500} height={332} />
            <MyLoader width={500} height={332} />
            <MyLoader width={500} height={332} />
          </div>
        ) : null
      ) : (
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
            900: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
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
      )}
    </>
  );
};
