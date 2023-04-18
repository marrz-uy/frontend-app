import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SplashScreen } from './Pages/SplashScreen';
import { Principal, Login, Register, UserPreferences, UserBar } from './Pages';
import { Nav } from './Layout';
import { LenguageProvider } from '../src/Context/LenguageContext';
import { TourProvider } from '../src/Context/TourContext';
import { PageProvider } from './Context/PageContext';
import { FavouritesProvider } from '../src/Context/FavouritesContext';
import SearchResults from './Pages/SearchResults';
import UserProfile from './Pages/UserProfile';
import UpdateUserEmail from './Pages/UpdateUserEmail';
import UpdateUserName from './Pages/UpdateUserName';
import UpdateUserPassword from './Pages/UpdateUserPassword';
import useGeoLocation from '../src/Helpers/useGeolocation.js';
import PuntoInteresInfo from './Pages/PuntoInteresInfo';
import TourInit from './Pages/BuildTour/TourInit';
import BuildMyTour from '../src/Pages/BuildTour/BuildMyTour';
import PredefinedTour from './Pages/BuildTour/PredefinedTour';
import Notifications from './Pages/Notifications';
import Favourites from './Pages/Favourites';
import Faq from './Pages/Faq';
import Filter from './Pages/Filter';
import ForgetPassword from '../src/Pages/ForgetPassword';
import './App.css';
import '../src/Css/Toast.css';

function App() {
  const [searchType, setSearchType] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState('principal');
  const [bars, setBars] = useState(false);
  const [pefilRecuperado, setPefilRecuperado] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [userBar, setUserBar] = useState(false);
  const [splash, setSplash] = useState();
  const [destination, setDestination] = useState([]);

  const handleClickBars = () => {
    setBars(!bars);
  };
  const { loaded, latitud, longitud } = useGeoLocation();

  useEffect(() => {
    setSplash(sessionStorage?.getItem('splash'));
  }, []);

  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId="714352746420-h2p28su155a6u5vmgide4nhe8728kvvo.apps.googleusercontent.com">
        <PageProvider>
          <LenguageProvider>
            <FavouritesProvider isLoggedIn={isLoggedIn}>
              <TourProvider>
                {splash === null ? <SplashScreen /> : null}
                <Nav
                  text={text}
                  setText={setText}
                  setItems={setItems}
                  items={items}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  page={page}
                  handleClickBars={handleClickBars}
                  paginaActual={paginaActual}
                  setPaginaActual={setPaginaActual}
                  userBar={userBar}
                  setUserBar={setUserBar}
                  searchType={searchType}
                  setSearchType={setSearchType}
                  loaded={loaded}
                  latitud={latitud}
                  longitud={longitud}
                />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Principal
                        items={items}
                        setItems={setItems}
                        setText={setText}
                        page={page}
                        setPage={setPage}
                        bars={bars}
                        userBar={userBar}
                        setUserBar={setUserBar}
                        setIsLoggedIn={setIsLoggedIn}
                        isLoggedIn={isLoggedIn}
                        searchType={searchType}
                        setSearchType={setSearchType}
                        categoryName={categoryName}
                        setCategoryName={setCategoryName}
                        setDestination={setDestination}
                        destination={destination}
                        loaded={loaded}
                        latitud={latitud}
                        longitud={longitud}
                      />
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      <Login
                        setIsLoggedIn={setIsLoggedIn}
                        setPage={setPage}
                        userBar={userBar}
                        isLoggedIn={isLoggedIn}
                        setUserBar={setUserBar}
                      />
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      <Register
                        setPage={setPage}
                        userBar={userBar}
                        setIsLoggedIn={setIsLoggedIn}
                        isLoggedIn={isLoggedIn}
                        setUserBar={setUserBar}
                      />
                    }
                  />
                  <Route
                    path="/updateEmail"
                    element={
                      <UpdateUserEmail
                        setPage={setPage}
                        userBar={userBar}
                        setIsLoggedIn={setIsLoggedIn}
                        isLoggedIn={isLoggedIn}
                        setUserBar={setUserBar}
                      />
                    }
                  />
                  <Route
                    path="/updateName"
                    element={
                      <UpdateUserName
                        setPage={setPage}
                        userBar={userBar}
                        setIsLoggedIn={setIsLoggedIn}
                        isLoggedIn={isLoggedIn}
                        setUserBar={setUserBar}
                      />
                    }
                  />
                  <Route
                    path="/updatePassword"
                    element={
                      <UpdateUserPassword
                        setPage={setPage}
                        userBar={userBar}
                        setIsLoggedIn={setIsLoggedIn}
                        isLoggedIn={isLoggedIn}
                        setUserBar={setUserBar}
                      />
                    }
                  />
                  <Route
                    path="/userbar"
                    element={
                      <UserBar
                        setPage={setPage}
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                      />
                    }
                  />
                  <Route
                    path="/user"
                    element={
                      <UserProfile
                        setPage={setPage}
                        page={page}
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                        userBar={userBar}
                        setUserBar={setUserBar}
                      />
                    }
                  />
                  <Route
                    path="/results"
                    element={
                      <SearchResults
                        items={items}
                        setItems={setItems}
                        setPage={setPage}
                        text={text}
                        setText={setText}
                        paginaActual={paginaActual}
                        setPaginaActual={setPaginaActual}
                        userBar={userBar}
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                        setUserBar={setUserBar}
                        searchType={searchType}
                        setSearchType={setSearchType}
                        categoryName={categoryName}
                        setCategoryName={setCategoryName}
                        setDestination={setDestination}
                        loaded={loaded}
                        latitud={latitud}
                        longitud={longitud}
                      />
                    }
                  />
                  <Route
                    path="/preferences"
                    element={
                      <UserPreferences
                        setPage={setPage}
                        pefilRecuperado={pefilRecuperado}
                        setPefilRecuperado={setPefilRecuperado}
                        userBar={userBar}
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                        setUserBar={setUserBar}
                      />
                    }
                  />
                  <Route
                    path="/infoResults"
                    element={
                      <PuntoInteresInfo
                        setPage={setPage}
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                        userBar={userBar}
                        setUserBar={setUserBar}
                        destination={destination}
                        setDestination={setDestination}
                        categoryName={categoryName}
                        setCategoryName={setCategoryName}
                      />
                    }
                  />
                  <Route
                    path="/tour"
                    element={
                      <TourInit
                        page={page}
                        setPage={setPage}
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                        userBar={userBar}
                        setUserBar={setUserBar}
                        destination={destination}
                        setDestination={setDestination}
                      />
                    }
                  />
                  <Route
                    path="/buildtour"
                    element={
                      <BuildMyTour
                        items={items}
                        setItems={setItems}
                        page={page}
                        setPage={setPage}
                        text={text}
                        setText={setText}
                        paginaActual={paginaActual}
                        setPaginaActual={setPaginaActual}
                        userBar={userBar}
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                        setUserBar={setUserBar}
                        searchType={searchType}
                        setSearchType={setSearchType}
                        categoryName={categoryName}
                        setCategoryName={setCategoryName}
                        setDestination={setDestination}
                        loaded={loaded}
                        latitud={latitud}
                        longitud={longitud}
                      />
                    }
                  />
                  <Route
                    path="/predefined"
                    element={
                      <PredefinedTour
                        page={page}
                        setPage={setPage}
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                        userBar={userBar}
                        setUserBar={setUserBar}
                        destination={destination}
                        setDestination={setDestination}
                      />
                    }
                  />
                  <Route
                    path="/notifications"
                    element={
                      <Notifications
                        setPage={setPage}
                        userBar={userBar}
                        setIsLoggedIn={setIsLoggedIn}
                        isLoggedIn={isLoggedIn}
                        setUserBar={setUserBar}
                      />
                    }
                  />
                  <Route
                    path="/favourites"
                    element={
                      <Favourites
                        page={page}
                        setPage={setPage}
                        userBar={userBar}
                        setIsLoggedIn={setIsLoggedIn}
                        isLoggedIn={isLoggedIn}
                        setUserBar={setUserBar}
                        setDestination={setDestination}
                      />
                    }
                  />
                  <Route
                    path="/forget"
                    element={
                      <ForgetPassword
                        setPage={setPage}
                        userBar={userBar}
                        setIsLoggedIn={setIsLoggedIn}
                        isLoggedIn={isLoggedIn}
                        setUserBar={setUserBar}
                        setDestination={setDestination}
                      />
                    }
                  />
                  <Route
                    path='/faq'
                    element={
                      <Faq />
                    }
                  />
                  <Route
                    path='/filter'
                    element={
                      <Filter
                     /*    latitud={latitud}
                        longitud={longitud}
                        distanciaAEnviar={distanciaAEnviar}
                        setDistanciaAEnviar={setDistanciaAEnviar}
                        getBackgroundSize={getBackgroundSize}
                        loaded={loaded}
                        handleDistance={handleDistance}
                        puntodeInteresTipo={puntodeInteresTipo}
                        setHandleFilter={setHandleFilter}
                        allFilters={allFilters}
                        setAllFilters={setAllFilters}
                        filtersToSend={filtersToSend}
                        setFiltersToSend={setFiltersToSend}
                        handleGetFIlters={handleGetFIlters}
                        tipoToFilter={tipoToFilter}
                        setTipoToFilter={setTipoToFilter}
                        handleGetFilterEventos={handleGetFilterEventos}
                        mobileScreenActive={mobileScreenActive} */
                      />
                    }
                  />
                  <Route
                    path="*"
                    element={
                      <div>
                        <h2 style={{ paddingTop: '150px', marginLeft: '20%' }}>
                          404 Page not found
                        </h2>
                      </div>
                    }
                  />
                </Routes>
              </TourProvider>
            </FavouritesProvider>
          </LenguageProvider>
        </PageProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
