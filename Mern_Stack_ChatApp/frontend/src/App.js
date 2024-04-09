import React from "react";
import { Routes, Route } from "react-router-dom";
import Chats from "./components/Pages/Chats";
import Home from "./components/Pages/Home";
import "./App.css";

const App = () => {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chats" element={<Chats />} />
          {/* <Route path= '/' element = {<Home />}/> */}
          {/* <Route path= '/' element = {<Home />}/> */}
        </Routes>
      </div>
    </>
  );
};

export default App;
