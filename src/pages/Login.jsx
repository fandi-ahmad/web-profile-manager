import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../state/state';
import { createGlobalState } from 'react-hooks-global-state';

const Login = () => {

  const [userActive, setUserActive] = useGlobalState('userActive')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()


  const loginUser = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/login', {
        username: username,
        password: password
      })
      localStorage.setItem('accessToken', response.data.accessToken);
      // document.cookie = "nama=John; expires=Sat, 13 Jun 2024 12:00:00 UTC; path=/";
      document.cookie = `accessToken=${response.data.accessToken}`
      setUserActive(response.data.id)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const getCookieValue = (cookieName) => {
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(cookieName + '=')) {
        return cookie.substring(cookieName.length + 1);
      }
    }
    
    return null;
  }
  


  const test = () => {
    const accessToken = getCookieValue('accessToken');
    // console.log(accessToken, '<-- berdasarkan nama');
    // console.log(document.cookie, '<-- semua cookie')
    console.log(userActive)
  }

  return (
    <>
      <div>
        <h1>Login</h1>
        <input type="text" placeholder='username'
          value={username} onChange={(e) => setUsername(e.target.value)}
        />
        <br /> <br />
        <input type="password" placeholder='password'
          value={password} onChange={(e) => setPassword(e.target.value)}
        />
        <br /> <br />
        <button onClick={loginUser}>login</button>
        <button onClick={test}>test</button>
      </div>
    </>
  );
};

export default Login;