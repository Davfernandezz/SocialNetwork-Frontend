import React, { useEffect, useState } from 'react'
import "./Profile.css";
import { CInput } from '../../components/CInput/CInput';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const [profileData, setProfileData] = useState({ name: "", email: "", is_active: "" })

  const passport = JSON.parse(localStorage.getItem("passport"))
  let token;
  const navigate = useNavigate()

  useEffect(() => {
      if (!passport) {
          navigate("/login")
      } else {
          token = passport.token
      }
  }, [])

  const logout = () => {
      localStorage.removeItem("passport")
      console.log("Closed session")
  }

  return (
      <>
          <h1>Profile</h1>
          <p>Name: {profileData.name}</p>
          <p>Email: {profileData.email}</p>
          <p>Created_at: {profileData.is_active}</p>
          <CInput type="button" name="logout" value="logout" emitFunction={logout} />
      </>
  )
}