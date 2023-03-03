import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import sinImagen from '../Assets/sinimagen.png';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import '../Css/Slider2.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper';

export default function Slider2({ array }) {
  const [thumbsSwiper, setThumbsSwiper] = useState();

  // console.log('ARRAYIMAGENES: ', array);

  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': 'transparent',
          '--swiper-pagination-color': 'transparent',
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {array?.map((imagen, index) => (
          <SwiperSlide key={index}>
            {!imagen ? (
              sinImagen
            ) : (
              <img src={imagen} alt="imagen de punto de interes" />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {!array ? (
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={array?.length}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {array?.map((imagen, index) => (
            <SwiperSlide key={index}>
              <img src={imagen} alt="imagen de punto de interes" />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div>Sin Imagen</div>
      )}
    </>
  );
}
