import { useEffect, useState } from 'react';
import './Header.css';
import { useNavigate, useLocation } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [location]);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    setToken(null);
    alert('로그아웃 되었습니다.');
    navigate('/Login');
  }

  return (
    <div>
      <div className='header-wrapper'>
        <div className='header-left'>
          <div className='home' onClick={() => navigate('/')}>Home</div>
          <div className='user' onClick={() => navigate('/User')}>User</div>
          <div className='Create' onClick={() => navigate('/Create')}>Create</div>
        </div>
        <div className='header-right'>
          {token == null ?
            (<div className='login' onClick={() => navigate('/Login')}>Login</div>) :
            (<div className='logout' onClick={() => { handleLogout() }}>Logout</div>)
          }
          <div className='signup' onClick={() => navigate('/Register')}>Signup</div>
        </div>
      </div>
    </div>
  )
}
