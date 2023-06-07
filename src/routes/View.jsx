import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Nav_bar from "../components/Nav_bar";
import Explore from "../pages/Explore";
import Search from "../pages/Search";
import Footer from "../components/Footer";
import Detail from "../pages/Detail";

const View = () => {
  return (
    <>
    <Nav_bar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore?" element={<Explore/>}/>
        <Route path="/search/?"  element={<Search/>}/>
        <Route path="/:type/:id" element={<Detail/>}/>
      </Routes>
    <Footer/> 
    </>
  );
};

export default View;
