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
        if (token) {
          const decodedToken = jwtDecode(token);
          setPassport({
            token: token,
            tokenData: decodedToken,
          });
          localStorage.setItem("passport", JSON.stringify({ token, tokenData: decodedToken }));
          navigate("/"); 
        } else {
          console.log("Login failed")
        }
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1 className="text-center mb-4">Login</h1>
        <form>
          <div className="mb-3">
            <CInput
              type="email"
              name="email"
              placeholder="Email"
              emitFunction={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <CInput
              type="password"
              name="password"
              placeholder="Password"
              emitFunction={handleChange}
              className="form-control"
            />
          </div>
          <button
            type="button"
            onClick={login}
            className="btn btn-primary w-100"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

