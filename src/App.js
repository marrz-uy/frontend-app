import React from 'react';
import './App.css';
import { SplashScreen } from './Pages/SplashScreen';
import { Navbar } from './Components/Navbar';
import { Main } from './Pages/Main';

function App() {
  return (
    <div className="App">
      <SplashScreen/>
      <Navbar/>
      <Main/>
    </div>
  );
}

export default App;
