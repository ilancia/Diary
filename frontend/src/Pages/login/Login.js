import React, { useState } from 'react'
import api from '../../api/diaryApi';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, { username: username, password: password });
      localStorage.setItem('token', res.data.token);
      alert('로그인 확인');
    } catch (err) {
      alert('아이디와 비밀번호가 일치하지 않습니다.');
    }
  }

  return (
    <div>
      <div>
        <form onSubmit={handleLogin}>
          <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type='submit' onClick={() => navigate('/')}>Login</button>
        </form>
      </div>
    </div>
  )
}
