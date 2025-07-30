import React, { useState } from 'react'
import api from '../../api/diaryApi';
import { useNavigate } from 'react-router-dom';
import './Login.css';

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
      navigate('/Login');
    }
  }

  return (
    <div>
      <form className='login-form' onSubmit={handleLogin}>
        <span className='login-title'>로그인</span>
        <div className='login-wrapper'>
          <div className='login-inputs'>
            <input className='id' type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input className='password' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className='login-button' type='submit' onClick={() => navigate('/')}>Login</button>
        </div>
      </form>
    </div>
  )
}
