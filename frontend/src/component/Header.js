import './Header.css';
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate();
  const gotoWhere = (x) => navigate(`/${x}`);
  return (
    <div>
      <div className='header-wrapper'>
        <div className='header-left'>
          <span className='home' onClick={() => gotoWhere('')}>Home</span>
          <span className='user' onClick={() => gotoWhere('User')}>User</span>
          <span className='Create' onClick={() => gotoWhere('Create')}>Create</span>
        </div>
        <div className='header-right'>
          <div className='login' onClick={() => gotoWhere('Login')} gotoWhere={()=>gotoWhere()}>Login</div>
          <div className='signup' onClick={() => gotoWhere('Register')} gotoWhere={()=>gotoWhere()}>Signup</div>
        </div>
      </div>
    </div>
  )
}
