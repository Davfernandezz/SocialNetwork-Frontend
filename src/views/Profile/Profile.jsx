import React, { useEffect, useState } from 'react'
import { CInput } from '../../components/CInput/CInput';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateProfile } from '../../services/userApiCalls';
import "./Profile.css";

export const Profile = () => {
  const [profileData, setProfileData] = useState({ name: "", email: "", createdAt: "" })
  const [editData, setEditData] = useState({
    name: "",
    email: ""
  })
  const [editting, setEditing] = useState(false)
  const passport = JSON.parse(localStorage.getItem("passport"))
  const navigate = useNavigate()

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    if (!passport) {
      navigate("/login");
    } else {
      const bringMyProfile = async () => {
        try {
          const response = await getUserProfile(passport.token);
          if (response.success) {
            setProfileData(response.data);
          } else {
            navigate("/login");
          }
        } catch (error) {
          console.log(error);
        }
      };
      bringMyProfile();
    }
  }, [navigate, passport]);

  const editButtonHandler = () => {
    setEditData({
      name: profileData.name,
      email: profileData.email
    })
    setEditing(!editting)
  }

  useEffect(() => {
  }, [profileData])
  const editInputHandler = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    })
  }

  const confirmButtonHandler = async () => {
    const token = passport.token;
    const response = await updateProfile(editData, token)
    if (response.success) {
      const newData = await getUserProfile(token)
      setProfileData(newData.data)
      setEditing(!editting)
    }
  }

  return (
    <div className="profile-wrapper">
        <div className="profile-container">
            <h1>Profile</h1>
            <h2>Welcome, {profileData.email}✨</h2>

            {editting ? (
                <>
                    <CInput
                        type="text"
                        name="name"
                        placeholder="Name"
                        emitFunction={editInputHandler}
                        className="profile-input"
                    />
                    <CInput
                        type="email"
                        name="email"
                        placeholder="Email"
                        emitFunction={editInputHandler}
                        className="profile-input"
                    />
                </>
            ) : (
                <div className="profile-info">
                    <p>Name: {profileData.name || "Not available"}</p>
                    <p>Email: {profileData.email}</p>
                    <p>Created at: {formatDate(profileData.createdAt)}</p>
                </div>
            )}

            <div className="profile-actions">
                <CInput
                    type="button"
                    name="edit"
                    value={!editting ? "Edit" : "Cancel"}
                    emitOnClickButton={editButtonHandler}
                    className={!editting ? "btn btn-edit" : "btn btn-cancel"}
                />
                {editting && (
                    <CInput
                        type="button"
                        name="save"
                        value="Save changes"
                        emitOnClickButton={confirmButtonHandler}
                        className="btn btn-save"
                    />
                )}
            </div>
        </div>
    </div>
);
}