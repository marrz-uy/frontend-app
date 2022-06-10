import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Principal} from '../Pages/Principal'
import '../css/Main.css';

export const Main = () => {
	return (
		<BrowserRouter>
      <Routes>
        <Route path="*" element={<Principal />} />
      </Routes>
    </BrowserRouter>
	)
}
