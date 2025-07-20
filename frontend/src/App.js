
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/diary/Home';
import { Register } from './Pages/login/Register';
import { Read } from './Pages/diary/Read';
import { Create } from './Pages/diary/Create'
import { Login } from './Pages/login/Login';
import Header from './component/Header';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Create' element={<Create />} />
        <Route path='/Read' element={<Read />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
      </Routes>
    </>
  );
}
export default App;
