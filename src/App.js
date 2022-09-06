import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { SplashScreen } from './Pages/SplashScreen';
import { Principal, Login, Register, UserPreferences, UserBar } from './Pages';
import { Nav } from './Layout';
import { LenguageProvider } from '../src/Context/LenguageContext'
import SearchResults from './Pages/SearchResults';
import UserProfile from './Pages/UserProfile';

function App() {
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState('true');
  const [page, setPage] = useState('principal');
  const [bars, setBars] = useState(false);
  const [userSession, setUserSession] = useState('');
  const [pefilRecuperado, setPefilRecuperado] = useState('');
  const [userBar, setUserBar] = useState(false)

  const handleClickBars = () => {
    setBars(!bars);
  };

  return (
    <BrowserRouter>
      <LenguageProvider>
        <SplashScreen />
        <Nav
          text={text}
          setText={setText}
          setItems={setItems}
          items={items}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          page={page}
          handleClickBars={handleClickBars}
          userBar={userBar}
          setUserBar={setUserBar}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Principal
                setItems={setItems}
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
            element={<Login setIsLoggedIn={setIsLoggedIn} setPage={setPage} userBar={userBar}
              isLoggedIn={isLoggedIn} setUserBar={setUserBar} />}
          />
          <Route path="/register" element={<Register setPage={setPage} userBar={userBar} setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn} setUserBar={setUserBar} />} />

          <Route
            path="/userbar"
            element={
              <UserBar
                setPage={setPage}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setUserSession={setUserSession}
              />
            }
          />

          <Route
            path="/user"
            element={
              <UserProfile
                setPage={setPage}
                page={page}
                userSession={userSession}
                setUserSession={setUserSession}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                userBar={userBar}
                setUserBar={setUserBar}
              />
            }
          />

          <Route
            path="/results"
            element={<SearchResults items={items} setPage={setPage} userBar={userBar} isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn} setUserBar={setUserBar}
            />}
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
      </LenguageProvider>
    </BrowserRouter>
  );
}

export default App;
