import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../Layout';
import AuthUser from '../Components/AuthUser';
import UserBar from './UserBar';
import { handleUserBar } from '../Helpers/HandUserBarClick';
import Slider2 from '../Components/Slider2';
import SliderMain from '../Components/SliderMain'
import { Slider } from '../Components/Slider'
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
  handleUserBar(userBar);
  const { http } = AuthUser();
  const navigate = useNavigate();
  // const { Latitud, Longitud } = destination
  const { Facebook, Instagram } = destination
  // console.log(destination)
  // const { id } = destination;
  console.log(destination)
  const [firefox, setFirefox] = useState(false)


  useEffect(() => {
    var sUsrAg = navigator.userAgent;
    if (sUsrAg.indexOf("Firefox") > -1) {
      setFirefox(true)
    }
  }, [])

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
  }, []);

  const arr = [destination.Imagen, destination.Imagen, destination.Imagen]

  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>
      <div className="puntoInteres__container">
        <div className="puntoInteres__imagen">
          {firefox ? <SliderMain imagen={destination.Imagen} /> : <Slider2 imagen={destination.Imagen} />}
        </div>
        <div className="puntoInteres__info">
          <h2 className="puntoInteres__info__tipo">{destination.Tipo}</h2>
          <h1 className="puntoInteres__info__nombre">{destination.Nombre}</h1>
          <div className="puntoInteres__info__datos">
            <p><span>Ciudad: </span>{destination.Ciudad}</p>
            <p><span>Departamento: </span>{destination.Departamento}</p>
            <p><span>Direccion: </span>{destination.Direccion}</p>
          </div>
          <div className="puntoInteres__info__datos2">
            <p className="puntoInteres__info__descripcion">
              <span>Descripcion: </span>{destination.Descripcion}
            </p>
          </div>
          <div className='puntoInteres__info__horarios'>
            <p><span>Hora de apertura:</span> {destination.HoraDeApertura}</p>
            <p><span>Hora de cierre:</span> {destination.HoraDeCierre}</p>
          </div>
          {Facebook | Instagram !== null ? (
            <div className='puntoInteres__info__social'>
              <h2>Mas informacion</h2>
              <a href={destination.Instagram}><img src="https://img.icons8.com/color/48/000000/instagram-new--v1.png" alt='instagram' /></a>
              <a href={destination.Faceebok}><img src="https://img.icons8.com/fluency/48/000000/facebook.png" alt='facebook' /></a>
            </div>
          ) : ''}
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