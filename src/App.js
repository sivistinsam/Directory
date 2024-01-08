// App.js
import React from "react";
import {  Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import UserInfo from "./Components/UserInfo";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/UserInfo" element={<UserInfo />} />
      </Routes>

  );
}

export default App;
