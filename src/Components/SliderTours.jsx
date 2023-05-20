import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import '../Css/SliderTours.css';
import 'swiper/swiper.min.css';
import 'swiper/modules/free-mode/free-mode.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import { MyLoader, MyLoaderWide } from './LoaderImage';
import useScreenSize from '../Helpers/ScreenSize';

export const SliderTours = ({ sliderPoints, title, description }) => {
  const navigate = useNavigate();
  const { width } = useScreenSize();

  const goToPredefinedTours = async (e) => {
    navigate('/predefined');
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
          id="slider1"
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
          {sliderPoints?.map((point) => {
            return (
              <div className="item" key={point.id}>
                <SwiperSlide key={point.id}>
                  <img
                    src={point.imagenTour}
                    alt=""
                    onClick={goToPredefinedTours}
                  />
                  <h6 className="dateInImage"></h6>
                  <span
                    className="titleLink"
                    id={point.id}
                    onClick={goToPredefinedTours}
                  >
                    {point.nombreTourPredefinido}
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
