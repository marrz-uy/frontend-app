import React , { useState}from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { SplashScreen } from './Pages/SplashScreen';
import { Principal, Login, Register } from './Pages';
import { Nav } from './Layout';
import SearchResults from './Pages/SearchResults';


function App() {

  const [text, setText] = useState('')
  return (
    <BrowserRouter>
      <SplashScreen />
     
        <Nav text={text}
        setText={setText}/>
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/results" element={<SearchResults text={text} />} />
        </Routes>
     
    </BrowserRouter>
  );
}

export default App;
