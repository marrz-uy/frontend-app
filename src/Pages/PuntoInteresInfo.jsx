import { Layout } from "../Layout";
import '../Css/PuntoInteresInfo.css'
import UserBar from './UserBar';
import '../Css/userBarClick.css';
import { handleUserBar } from '../Helpers/HandUserBarClick';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../Css/Slider.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';

const PuntoInteresInfo = ({ setUserBar, userBar, isLoggedIn, setIsLoggedIn, destination }) => {
    handleUserBar(userBar);
    console.log(destination);

    // if x 
    return (
        <Layout>
            <div className="userbar-click" onClick={() => setUserBar(false)}></div>
            <div className="puntoInteres__container">
                <div className="puntoInteres__imagen">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        loop={true}
                        loopFillGroupWithBlank={true}
                        pagination={{
                            clickable: true,
                        }}
                        className="puntoInteres__slider"
                        navigation={true}
                        modules={[Pagination, Navigation]}
                    >
                        <SwiperSlide className="puntoInteres__swiperslider">
                            <img src={destination.imagen} alt="" />
                        </SwiperSlide>
                        <SwiperSlide className="puntoInteres__swiperslider">
                            <img src={destination.imagen} alt="" />
                        </SwiperSlide>
                        <SwiperSlide className="puntoInteres__swiperslider">
                            <img src={destination.imagen} alt="" />
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="puntoInteres__info">
                    <h2 className="puntoInteres__info__tipo">{destination.tipo}Evento</h2>
                    <h1 className="puntoInteres__info__nombre">{destination.nombre}</h1>
                    <div className="puntoInteres__info__datos">
                        <h2 className="puntoInteres__info__ciudad"><span>Direccion: </span>{destination.ciudad}</h2>
                        <h2 className="puntoInteres__info__direccion">{destination.direccion}</h2>
                    </div>
                    <div className="puntoInteres__info__datos2">
                        <p className="puntoInteres__info__descripcion"><span>Descripcion: </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime ex libero ut minima consectetur obcaecati ipsa a ipsam perspiciatis, veniam laboriosam sunt aspernatur neque autem recusandae sit incidunt nam quis?</p>
                    </div>
                    <h2>{destination.contacto}</h2>
                </div>
            </div>
            {userBar && (
                <UserBar
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    setUserBar={setUserBar}
                />
            )}
        </Layout>
    )
}

export default PuntoInteresInfo