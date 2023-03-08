import { createContext, useState, useEffect } from 'react';
import AuthUser from '../Components/AuthUser';
const FavouritesContext = createContext();

const FavouritesProvider = ({ isLoggedIn, children }) => {
  const { http } = AuthUser();
  const [user_Id] = useState(sessionStorage?.getItem('id'));
  const [favouritesFromDB, setFavouritesFromDB] = useState();
  const [idsFavouritesFromDB, setIdsFavouritesFromDB] = useState();

  useEffect(() => {
    if (isLoggedIn && user_Id) {
      GetFavouritesFromDB(user_Id);
    }
  }, [isLoggedIn]);

  function GetFavouritesFromDB(user_Id) {
    http
      .get(`/favoritos/${user_Id}`)
      .then((response) => {
        setFavouritesFromDB(response.data.Favoritos);
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
  }

  function GetIdsFavouritesFromDB(user_Id) {
    http
      .get(`/favoritos/${user_Id}`)
      .then((response) => {
        setIdsFavouritesFromDB(response.data.favoritos_ids);
      })
      .catch((error) => console.error(`Error en catch: ${error}`));
  }

  const dataExport = {
    GetFavouritesFromDB /* FUNCION => SOLICITUD a bd devuelve array con favoritos completos */,
    GetIdsFavouritesFromDB /* FUNCION => SOLICITUD a bd, devuelve array con ids de favoritos */,
    favouritesFromDB /* ARRAY de favoritos favoritos completos */,
    idsFavouritesFromDB /* ARRAY de favoritos ids */,
  };

  return (
    <FavouritesContext.Provider value={dataExport}>
      {children}
    </FavouritesContext.Provider>
  );
};

export { FavouritesProvider };
export default FavouritesContext;
