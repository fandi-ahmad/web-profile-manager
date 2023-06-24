import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const registerUser = async (e) => {
    try {
      const respons = await axios.post('http://localhost:8000/api/v1/register', {
        username: username,
        password: password
      })
      console.log(respons)
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div>
        <h1>Register</h1>
        <input type="text" placeholder='username' 
          value={username} onChange={(e) => setUsername(e.target.value)}
        />
        <br /> <br />
        <input type="password" placeholder='password' 
          value={password} onChange={(e) => setPassword(e.target.value)}
        />
        <br /> <br />
        <button onClick={registerUser}>register</button>
      </div>
    </>
  )
}

export default Register