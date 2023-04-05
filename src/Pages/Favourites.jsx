import { useEffect, useContext } from 'react';
import FavouriteCard from '../Components/FavouriteCard';
import { Layout } from '../Layout';
import UserBar from './UserBar';
import LenguageContext from '../Context/LenguageContext';
import FavouritesContext from '../Context/FavouritesContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import AuthUser from '../Components/AuthUser';
import { handleUserBar } from '../Helpers/HandUserBarClick';
import trash from '../Assets/trash.svg';
import '../Css/Favourites.css';
import '../Css/userBarClick.css';

const Favourites = ({
  setIsLoggedIn,
  setPage,
  isLoggedIn,
  userBar,
  setUserBar,
  setDestination,
}) => {
  const { http } = AuthUser();
  const userId = sessionStorage?.getItem('id');
  const { traduccionesBD, lenguage } = useContext(LenguageContext);
  const { GetFavouritesFromDB, favouritesFromDB } =
    useContext(FavouritesContext);

  useEffect(() => {
    GetFavouritesFromDB(userId);
    setPage('favourites');
  }, [setPage]);

  const deleteFavourite = (userId, puntoId) => {
    http
      .delete(`/favoritos`, {
        data: {
          user_Id: userId,
          puntosinteres_id: puntoId,
        },
      })
      .then((response) => {
        console.log(
          '%cFav data - eliminado:',
          'color: violet;',
          response?.data
        );
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
  };

  const handleDeleteFavourite = (e) => {
    deleteFavourite(userId, e.target.id);
    console.log('TARGET ID', e.target.id);
    GetFavouritesFromDB(userId);
  };
  // console.log('FAVORITOS: ', favouritesFromDB[0].imagenes[0]);

  handleUserBar(userBar);

  return (
    <Layout>
      <div className="userbar-click" onClick={() => setUserBar(false)}></div>
      <div className="favourites">
        <div className="favouritesPageTitle">
          <h2>
            {filtrarTraduccion(traduccionesBD, 'favourites', lenguage)}💙{' '}
          </h2>
        </div>
        <div className="favoritosList">
          {!favouritesFromDB || favouritesFromDB.length === 0 ? (
            <div className="sinResultado">
              <p>{filtrarTraduccion(traduccionesBD, 'noResults', lenguage)}</p>
            </div>
          ) : (
            favouritesFromDB?.map((dato, index) => {
              return (
                <div className="cardContainerFav" key={index}>
                  <FavouriteCard
                    nombre={dato.Nombre}
                    nombreEvento={dato.NombreEvento}
                    lugarDeEvento={dato.Nombre}
                    ciudad={dato.Ciudad}
                    direccion={dato.Direccion}
                    fechaInicio={dato.FechaInicio}
                    fechaFin={dato.FechaFin}
                    horaInicio={dato.HoraDeApertura}
                    horaFin={dato.HoraDeCierre}
                    tipoEvento={dato.TipoEvento}
                    tipo={dato.Tipo}
                    caracteristicas={dato.Contacto}
                    imagen={dato.imagenes[0].url}
                    setDestination={setDestination}
                    dato={dato}
                  />
                  <div className="divDeleteFav">
                    <span className="deleteFavourite">
                      <img
                        id={dato.id}
                        onClick={handleDeleteFavourite}
                        src={trash}
                        alt="trashCan"
                      ></img>
                    </span>
                  </div>
                </div>
              );
            })
          )}
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

export default Favourites;
