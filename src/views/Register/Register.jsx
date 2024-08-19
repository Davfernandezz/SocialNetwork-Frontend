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
        <>
            <h1>Register</h1>
          <div>
            <CInput type="email" name="email" placeholder='Email' emitFunction={handleChange} />
          </div>
          <div>
            <CInput type="password" name="password" placeholder='Password' emitFunction={handleChange} />
          </div>
          <div>
            <input type="button" value="Register" onClick={register} />
          </div>
        </>
    )
}
export default Register;