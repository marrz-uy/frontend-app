import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../Layout';
import AuthUser from '../Components/AuthUser';
import UserBar from './UserBar';
import { handleUserBar } from '../Helpers/HandUserBarClick';
import Slider2 from '../Components/Slider2';
import '../Css/PuntoInteresInfo.css';
import '../Css/userBarClick.css';
import '../Css/Slider.css';
import '../Css/SliderPuntoInteresInfo.css';

const PuntoInteresInfo = ({
    setUserBar,
    userBar,
    isLoggedIn,
    setIsLoggedIn,
  destination,
  setPage,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  handleUserBar(userBar);
  const { http } = AuthUser();
  const navigate = useNavigate();
  // console.log(destination)
  const { id } = destination;

  const { puntointeres_id } = destination;
  const [puntodeInteres, setPuntodeInteres] = useState({});
  // console.log(puntodeInteres);
  /* 
        const getPuntoDeInteres = () => {
            http
                .get(`/PuntosInteres/${puntointeres_id}`)
                .then((res) => {
                    setPuntodeInteres(res.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
     */
  useEffect(() => {
    if (!destination.Nombre) {
      navigate('/');
    }
    setPage('infoResults');
    // getPuntoDeInteres()
    // console.log(puntodeInteres)
  }, []);

  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>
      <div className="puntoInteres__container">
        <div className="puntoInteres__imagen">
          <Slider2 />
        </div>
        <div className="puntoInteres__info">
          <h2 className="puntoInteres__info__tipo">{destination.tipo}Evento</h2>
          <h1 className="puntoInteres__info__nombre">{destination.nombre}</h1>
          <div className="puntoInteres__info__datos">
            <h2 className="puntoInteres__info__ciudad">
              <span>Direccion: </span>
              {destination.ciudad}
            </h2>
            <h2 className="puntoInteres__info__direccion">
              {destination.direccion}
            </h2>
          </div>
          <div className="puntoInteres__info__datos2">
            <p className="puntoInteres__info__descripcion">
              <span>Descripcion: </span>Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Maxime ex libero ut minima consectetur obcaecati
              ipsa a ipsam perspiciatis, veniam laboriosam sunt aspernatur neque
              autem recusandae sit incidunt nam quis?
            </p>
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
  );
};

export default PuntoInteresInfo;
