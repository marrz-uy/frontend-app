import {Swiper, SwiperSlide} from 'swiper/react'
import { FreeMode } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import '../Css/Slider.css'

const Slider = () => {
  return (
    <div className="slider__container">
      <Swiper
        FreeMode={true}
        grabCursor={true}
        modules={[FreeMode]}
        className="slider__swiper"
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
          460: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
          760: {
            slidesPerView: 3,
            spaceBetween: 15,
        },
          1024: {
            slidesPerView: 4,
            spaceBetween: 15,
        },
          1280: {
            slidesPerView: 5,
            spaceBetween: 30,
        }
        }}
      >
        <SwiperSlide>

        </SwiperSlide>

      </Swiper>
    </div>
  )
}

export default Slider