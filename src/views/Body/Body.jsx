import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from "../Login/Login";
import Register from '../Register/Register';
import { Home } from '../Home/Home';
import { Profile } from '../Profile/Profile';
import { Admin } from '../Admin/Admin';

function Body() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        {/* {role === 2 && <Route path="/admin" element={<Admin />} />} */}
      </Routes>
    </>
  );
}

export default Body;