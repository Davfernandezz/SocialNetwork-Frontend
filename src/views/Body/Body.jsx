import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { NotFound } from '../NotFound/Notfound';
import { Home } from '../Home/Home';
import Login from "../Login/Login";
import Register from '../Register/Register';
import { Profile } from '../Profile/Profile';
import { Admin } from '../Admin/Admin';

function Body() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
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