import React, { useEffect, useState } from 'react';
import { CInput } from '../../components/CInput/CInput';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { loginUser } from '../../services/authApiCalls';
import { jwtDecode } from 'jwt-decode';
import "./Login.css";

export const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { passport, setPassport } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (passport && passport.token) {
      console.log("User is already logged in, redirecting to home.");
      navigate("/");
    } else {
      console.log("No valid passport found, staying on login page.");
    }
  }, [passport, navigate]);

  function handleChange(e) {
    setCredentials(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
    console.log("Updated credentials:", credentials);
  }

  async function login() {
    try {
      console.log("Attempting to log in with credentials:", credentials);
      const response = await loginUser(credentials);

      if (response.success) {
        const token = response.token; 
        console.log("Received token from API:", token);
        if (typeof token === "string" && token.trim() !== "") {
          const decodedToken = jwtDecode(token); 
          console.log("Decoded token:", decodedToken);
          setPassport({
            token: token,
            tokenData: decodedToken,
          });
          console.log("Passport set with token and token data:", {
            token: token,
            tokenData: decodedToken,
          });
          localStorage.setItem("passport", JSON.stringify({ token, tokenData: decodedToken }));
          console.log("Token saved to localStorage.");
          navigate("/"); 
        } else {
          console.error("Invalid token received:", token);
          alert("Login failed: invalid token received.");
        }
      } else {
        console.error("Login failed with message:", response.message);
        alert(response.message);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      alert("An error occurred during login.");
    }
  }

  return (
    <>
      <h1>Login</h1>
      <div>
        <CInput type="email" name="email" placeholder='Email' emitFunction={handleChange} />
      </div>
      <div>
        <CInput type="password" name="password" placeholder='Password' emitFunction={handleChange} />
      </div>
      <div>
        <input type="button" value="Login" onClick={login} />
      </div>
    </>
  );
}

export default Login;