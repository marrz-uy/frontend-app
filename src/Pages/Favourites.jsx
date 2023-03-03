import React, { useEffect, useContext, useState } from 'react';
import ResultsCard from '../Components/ResultsCard';
import { Layout } from '../Layout';
import UserBar from './UserBar';
import LenguageContext from '../Context/LenguageContext';
import FavouritesContext from '../Context/FavouritesContext';
import { filtrarTraduccion } from '../Helpers/FilterTranslate';
import { handleUserBar } from '../Helpers/HandUserBarClick';
import '../Css/Favourites.css';

const Favourites = ({
  setIsLoggedIn,
  setPage,
  isLoggedIn,
  userBar,
  setUserBar,
  setDestination,
}) => {
  const [user_Id] = useState(sessionStorage?.getItem('id'));
  const { traduccionesBD, lenguage } = useContext(LenguageContext);
  const { GetFavouritesFromDB, favouritesFromDB } =
    useContext(FavouritesContext);
  console.log('DATOS FAVORITOS: ', favouritesFromDB);
  useEffect(() => {
    GetFavouritesFromDB(user_Id);
    setPage('favourites');
    // eslint-disable-next-line
  }, [setPage]);

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
            favouritesFromDB?.map((dato) => {
              return (
                <ResultsCard
                  key={dato.id}
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
                  imagen={dato.Imagen}
                  setDestination={setDestination}
                  dato={dato}
                />
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
