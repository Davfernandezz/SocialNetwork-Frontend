import React, { useState } from 'react'
import { CInput } from '../../components/CInput/CInput';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/authApiCalls';
import "./Register.css";

export const Register = () => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState(
        {
            email: "",
            password: ""
        }
    )

    function handleChange(e) {
        setCredentials((prevState) => (
            {
                ...prevState,
                [e.target.name]: e.target.value
            }
        ))
    }

    async function register() {
        try {
            const response = await registerUser(credentials)
            if (response.success) {
                navigate('/login')
            } else {
                alert(response.message)
            }
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="register-wrapper">
          <div className="register-container">
            <h1 className="text-center mb-4">Register</h1>
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
                onClick={register}
                className="btn btn-primary w-100"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      );
    };
    