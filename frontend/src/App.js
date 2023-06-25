import './App.css';
import { Link, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './components/HomePage';
import Card from './components/Card';
import Auth from './components/Auth';
import NavBar from './components/Navbar';
import RegisterPage from './components/RegisterPage';


function App() {
  return (
    <div className='App'>
      <header>
        <NavBar />

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/login/" element={<Auth />} />
          <Route path="/my-card/" element={<Card />} />

          {/* <Route path="*" element={<Navigate to="/" />} /> */}

          <Route path="/register" element={<RegisterPage />} />


        </Routes>
      </header>
    </div>
  );
}

export default App;
