import React, { useState } from 'react'
import axios from 'axios';

export const Register = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/register`, { username: `${username}`, password: `${password}` });
      alert('회원가입 성공!');
      props.navigate('/Login');
    } catch (error) {
      alert('회원가입에 실패하였습니다.');
      console.error('회원가입 오류:', error);
      console.log(username, password);
    }
  }

  return (
    <div>
      <div>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" >Register</button>
        </form>
      </div>
    </div >
  )
}
