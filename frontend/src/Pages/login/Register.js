import React, { useState } from 'react'
import axios from 'axios';
import api from '../../api/diaryApi';
import { useNavigate } from 'react-router-dom';
import './Login.css'

export const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post(`${process.env.REACT_APP_BASE_URL}/auth/register`, { username: username, password: password });
      alert('회원가입 성공!');
      navigate('/Login');
    } catch (err) {
      alert('회원가입에 실패하였습니다.');
      navigate('/Register');
    }
  }

  return (
    <div>
      <form className='login-form' onSubmit={handleRegister}>
        <div className='login-title'>회원가입</div>
        <div className='login-wrapper'>
          <div className='login-inputs'>
          <input className='id' type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input className='password' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className='login-button' type='submit'>Register</button>
        </div>
      </form>
    </div>
  )
}
