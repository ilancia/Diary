import './Header.css';
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate();
  const goToSignup = () => navigate('/Register');
  const goToLogin = () => navigate('/Login');
  const goToHome = () => navigate('/');
  return (
    <div>
      <div className="header-wrapper">
        <div className="header-left">
          <span className="home" onClick={goToHome}>Home</span>
        </div>
        <div className="header-right">
          <span className="login" onClick={goToLogin} navigate={navigate}>Login</span>
          <span className="signup" onClick={goToSignup} navigate={navigate} >Signup</span>
        </div>
      </div>
    </div>
  )
}
