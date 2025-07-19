import React, { useState } from 'react'
import api from '../../api/diaryApi';

export const Login = (props) => {
  const [username, setUesrname] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/Login', {
        username,
        password,
      })
      alert('로그인 성공!');
      props.navigate('/');
    } catch (error) {
      alert('아이디와 비밀번호가 일치하지 않습니다.');
    }
  }

  return (
    <div>
      <form onSubmit={() => handleLogin()}>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
