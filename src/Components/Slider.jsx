import { useNavigate } from 'react-router-dom';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MyLoader, MyLoaderWide } from './LoaderImage';
import AuthUser from '../Components/AuthUser';
import useScreenSize from '../Helpers/ScreenSize';

import 'swiper/swiper.min.css';
import 'swiper/modules/free-mode/free-mode.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import '../Css/Slider.css';
import sinImagen from '../Assets/sinimagen.png';

export const Slider = ({
  sliderPoints,
  title,
  description,
  setDestination,
}) => {
  const navigate = useNavigate();
  const { http } = AuthUser();
  const { width } = useScreenSize();

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
  // con
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
      )}
    </>
  );
};
