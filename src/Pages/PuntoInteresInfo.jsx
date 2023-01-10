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

  // {destination.Tipo ? }
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

  getPuntoDeInteres();

  useEffect(() => {
    if (!destination.Nombre) {
      navigate('/');
    }
    setPage('infoResults');
  }, []);

  // console.log(destination.Tipo);

  // const arr = [destination.Imagen, destination.Imagen, destination.Imagen]
  // console.log(puntodeInteres);
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
              {destination.web === '' ? <></> : (
                <h2>Web: <a href={destination.Web}>{destination.Web}</a></h2>
              )}
              <div className='puntoInteres__info__social__masinfo'>
                <h2>Mas informacion</h2>
                <a href={destination.Instagram}><img src="https://img.icons8.com/color/48/000000/instagram-new--v1.png" alt='instagram' /></a>
                <a href={destination.Faceebok}><img src="https://img.icons8.com/fluency/48/000000/facebook.png" alt='facebook' /></a>
              </div>
            </div>
          ) : ''}

        </div>
        {destination.Tipo === 'Hotel' || destination.Tipo === 'Hostel' ? (
          <div className='puntoInteres__especificaciones'>
            <div className='puntoInteres__especificaciones__info'>
              <h2>Especificaiones del Hotel</h2>
              <p><span>Habitaciones:</span> {destination.Habitaciones === 1 ? 'Si' : 'No'}</p>
              <p><span>Calificaciones:</span> {destination.Calificaciones === 1 ? 'Si' : 'No'}</p>
            </div>
            <div className='puntoInteres__especificaciones__datos'>
              <div className='puntoInteres__especificaciones__datos1'>
                <p><span>Baño privado: </span>{destination.BanoPrivad === 1 ? 'Si' : 'No'}</p>
                <p><span>Casino: </span>{destination.Casino === 1 ? 'Si' : 'No'}</p>
                <p><span>Bar: </span>{destination.Bar === 1 ? 'Si' : 'No'}</p>
                <p><span>Restaurante: </span>{destination.Restaurante === 1 ? 'Si' : 'No'}</p>
                <p><span>Desayuno: </span>{destination.Desayuno === 1 ? 'Si' : 'No'}</p>
              </div>
              <div className='puntoInteres__especificaciones__datos2'>
                <p><span>TvCable: </span>{destination.TvCable === 1 ? 'Si' : 'No'}</p>
                <p><span>Piscina: </span>{destination.Piscina === 1 ? 'Si' : 'No'}</p>
                <p><span>Wifi: </span>{destination.Wifi === 1 ? 'Si' : 'No'}</p>
                <p><span>Aire Acondicionado: </span>{destination.AireAcondicionado === 1 ? 'Si' : 'No'}</p>
              </div>
            </div>
          </div>
        ) : destination.Tipo === 'Restaurantes' ? (
          <div className='puntoInteres__especificaciones__gastronomia'>
            <div className='puntoInteres__especificaciones__info__gastronomia'>
              <h2>Especificaciones del Restaurante</h2>
            </div>
            <div className='puntoInteres__especificaciones__datos__gastronomia'>
              <p><span>Comida: </span> {destination.Comida === 1 ? 'Si' : 'No'}</p>
              <p><span>Comida Vegge: </span> {destination.ComidaVegge === 1 ? 'Si' : 'No'}</p>
              <p><span>Alcohol: </span> {destination.Alcohol === 1 ? 'Si' : 'No'}</p>
              <p><span>Menu infantil: </span> {destination.MenuInfantil === 1 ? 'Si' : 'No'}</p>
            </div>
          </div>
        ) : ''}

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