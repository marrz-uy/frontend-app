import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { SplashScreen } from './Pages/SplashScreen';
import { Principal, Login, Register, UserPreferences, UserBar } from './Pages';
import { Nav } from './Layout';
import SearchResults from './Pages/SearchResults';
import UserProfile from './Pages/UserProfile';

function App() {
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState('false');
  const [page, setPage] = useState('principal');
  const [bars, setBars] = useState(false);
  const [userSession, setUserSession] = useState('');
  const [pefilRecuperado, setPefilRecuperado] = useState('');
  
  const handleClickBars = () => {
    setBars(!bars);
  };

  return (
    <BrowserRouter>
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
            />
          }
        />

        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} setPage={setPage} />}
        />
        <Route path="/register" element={<Register setPage={setPage} />} />

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
              userSession={userSession}
              setUserSession={setUserSession}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />

        <Route
          path="/results"
          element={<SearchResults items={items} setPage={setPage} />}
        />

        <Route
          path="/preferences"
          element={
            <UserPreferences
              setPage={setPage}
              pefilRecuperado={pefilRecuperado}
              setPefilRecuperado={setPefilRecuperado}
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
    </BrowserRouter>
  );
}

export default App;
