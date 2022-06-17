import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { SplashScreen } from './Pages/SplashScreen';
import { Principal, Login, Register } from './Pages';
import { Nav } from './Layout';
import SearchResults from './Pages/SearchResults';

function App() {
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);

  return (
    <BrowserRouter>
      <SplashScreen />

      <Nav text={text} setText={setText} setItems={setItems} />
      <Routes>
        <Route index element={<Principal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/results" element={<SearchResults items={items} />} />
        <Route path="*" element={<div> <h2>404 Page not found</h2> </div> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
