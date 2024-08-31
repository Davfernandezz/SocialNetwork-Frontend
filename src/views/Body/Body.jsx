import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { NotFound } from '../NotFound/Notfound';
import { Home } from '../Home/Home';
import { Login } from "../Login/Login";
import { Register }  from '../Register/Register';
import { Profile } from '../Profile/Profile';
import { Admin } from '../Admin/Admin';
import { CreatePost } from '../CreatePost/CreatePost';
import { AllPosts } from '../AllPosts/AllPosts';
import { MyPosts } from '../MyPosts/MyPosts';
import { PostDetail } from '../PostDetail/PostDetail';

function Body() {
  
  const passport = JSON.parse(localStorage.getItem("passport"));
    let role = null;

    if (passport) {
        role = passport.tokenData.role;
    }

  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/allPosts" element={<AllPosts />} />
        <Route path="/myPosts" element={<MyPosts />} />
        <Route path="/postDetail/:postId" element={<PostDetail />} />
        {role === "admin" && <Route path="/admin" element={<Admin />} />}
      </Routes>
    </>
  );
}

export default Body;