import './App.css';
import './index.css';
import { Route, Routes } from 'react-router';
import Home from './pages/home';
import Login from './pages/login';
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
};

export default App;
