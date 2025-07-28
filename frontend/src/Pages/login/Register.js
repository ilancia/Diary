import React, { useState } from 'react'
import axios from 'axios';
import api from '../../api/diaryApi';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post(`${process.env.REACT_APP_BASE_URL}/auth/register`, { username: username, password: password });
      alert('회원가입 성공!');
    } catch (err) {
      alert('회원가입에 실패하였습니다.');
    }
  }

  return (
    <div>
      <div>
        <form onSubmit={handleRegister}>
          <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type='submit' onClick={() => navigate('/Login')}>Register</button>
        </form>
      </div>
    </div >
  )
}
