import React from "react";
import "./App.css";
import Firstpage from "./gallery/gallery";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Firstpage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
