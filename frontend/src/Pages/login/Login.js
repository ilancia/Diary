import React, { useState } from 'react'
import api from '../../api/diaryApi';

export const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/Login', { username, password });
      alert('로그인');
      props.navigate('/');
    } catch (error) {
      alert('아이디와 비밀번호가 일치하지 않습니다.');
    }
  }

  return (
    <div>
      <div>
        <form onSubmit={() => handleLogin()}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}
