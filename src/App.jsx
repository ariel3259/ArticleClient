import React from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Articles from "./pages/Articles";

function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Index />} />
      <Route path = "/register" element = {<Register />} />
      <Route path = "/articles" element = {<Articles />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
