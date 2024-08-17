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

  function handleChange(e) {
    setCredentials(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const { passport, setPassport } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (passport && passport.token) {
      navigate("/");
    }
  }, [passport, navigate]);

  async function login() {
    try {
      const response = await loginUser(credentials);

      if (response.success) {
        const token = response.token; 
        if (typeof token === "string" && token.trim() !== "") {
          const decodedToken = jwtDecode(token);
          setPassport({
            token: token,
            tokenData: decodedToken,
          });
          localStorage.setItem("passport", JSON.stringify({ token, tokenData: decodedToken }));
          navigate("/"); 
        } else {
          console.error("Invalid token:", token);
          alert("Login failed: invalid token received.");
        }
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
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