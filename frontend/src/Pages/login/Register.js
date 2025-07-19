import React, { useState } from 'react'
import api from '../../api/diaryApi'

export const Register = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/auth/register', { username, password, });
       console.log( response.data);
      alert('회원가입 성공!');
      props.navigate('/Login');
    } catch (error) {
      alert('회원가입에 실패하였습니다.');
      console.log(error);
      console.log(username, password);
    }
  }

  return (
    <div>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
    </div >
  )
}
