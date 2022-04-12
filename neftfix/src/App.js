import "./App.scss";
import React, { useContext } from "react";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Watch from "./pages/watch/Watch";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthContext } from "./authContext/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Navigate replace to="/register" />} />
        <Route path="/register" element={!user ? <Register /> : <Home />} />
        <Route path="/login" element={!user ? <Login /> : <Home />} />
        {user && (
          <>
            <Route path="/movies" element={<Home type={"movies"} />} />
            <Route path="/series" element={<Home type={"series"} />} />
            <Route path="/watch" element={<Watch />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
