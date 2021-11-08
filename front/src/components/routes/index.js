import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';

function index  () {
  return (
  <BrowserRouter>
    <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/Profil" element={ <Profil />} />
        <Route path="/Trending" element={ <Trending />} />
      </Routes>
</BrowserRouter>
  )
}

export default index;

