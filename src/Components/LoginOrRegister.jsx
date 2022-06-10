import React from 'react';
import '../css/LoginOrRegister.css';
import Login from './Login';
import Register from './Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const LoginOrRegister = () => {
  return (
    <div className="loginOrRegister">
      <BrowserRouter>
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
};
