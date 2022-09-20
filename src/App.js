import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { SplashScreen } from './Pages/SplashScreen';
import { Principal, Login, Register, UserPreferences, UserBar } from './Pages';
import { Nav } from './Layout';
import { LenguageProvider } from '../src/Context/LenguageContext';
import SearchResults from './Pages/SearchResults';
import UserProfile from './Pages/UserProfile';
import UpdateUserEmail from './Pages/UpdateUserEmail';
import UpdateUserName from './Pages/UpdateUserName';
import UpdateUserPassword from './Pages/UpdateUserPassword';

/* import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; */


function App() {
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState('true');
  const [page, setPage] = useState('principal');
  const [bars, setBars] = useState(false);
  const [pefilRecuperado, setPefilRecuperado] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [userBar, setUserBar] = useState(false);
  const [splash, setSplash] = useState();
  const handleClickBars = () => {
    setBars(!bars);
  };

  useEffect(() => {
    setSplash(sessionStorage?.getItem('splash'));
  }, []);

  return (
    <BrowserRouter>
      <LenguageProvider>
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
                setPage={setPage}
                text={text}
                setText={setText}
                paginaActual={paginaActual}
                setPaginaActual={setPaginaActual}
                userBar={userBar}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setUserBar={setUserBar}
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
            path="*"
            element={
              <div>
                <h2>404 Page not found</h2>
              </div>
            }
          />
        </Routes>
        {/* <Footer/> */}
      </LenguageProvider>
    </BrowserRouter>
  );
}

export default App;
