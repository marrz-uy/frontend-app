import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "../Css/Slider2.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

export default function App({ imagen }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "transparent",
          "--swiper-pagination-color": "transparent",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        <SwiperSlide>
          <img src={imagen} alt="imagen de punto de interes" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={imagen} alt="imagen de punto de interes" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={imagen} alt="imagen de punto de interes" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={imagen} alt="imagen de punto de interes" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={imagen} alt="imagen de punto de interes" />
        </SwiperSlide>

      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={imagen} alt="imagen de punto de interes" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={imagen} alt="imagen de punto de interes" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={imagen} alt="imagen de punto de interes" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={imagen} alt="imagen de punto de interes" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={imagen} alt="imagen de punto de interes" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}