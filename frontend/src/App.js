import './App.css';
import { Link, Routes, Route, Navigate } from "react-router-dom"
import HomePage from './components/HomePage';
import Card from './components/Card';
import Auth  from './components/Auth';
import NavBar from './components/Navbar';

function App() {
  return (
    <div className='App'>

      <header>
        <NavBar />

        <Routes>
          <Route path='/' element={<HomePage />}></Route>


          <Route path="/login/" element={<Auth />}></Route>



          <Route path="*" element={<Navigate to="/" />} />

          <Route path='/our-products/' element={<HomePage  />} />


          <Route path="/my-card/" element={<Card />}></Route>
        </Routes>
      </header>

    </div>
  );
}
export default App;
