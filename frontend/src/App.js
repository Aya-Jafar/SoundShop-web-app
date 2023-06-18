import './App.css';
import { Link, Routes, Route, Navigate } from "react-router-dom"
import HomePage from './components/HomePage';
import Card from './components/Card';
import Auth from './components/Auth'

function App() {
  return (
    <div className='App'>
      {/* <div id="preloader">
            <div class="jumper">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>  */}

      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to='/' style={{fontSize:"30px"}}>Sound<em>Shop</em></Link>


          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav mr-auto">


              <li className="navbar-nav">
                <Link className="nav-link" to='/our-products/'>OUR PRODUCTS</Link>
              </li>


              <li className="navbar-nav">
                <Link className="nav-link" to="/my-card/">MY CARD</Link>
              </li>
              <li className="navbar-nav active">
                <Link className="nav-link" to="/login/">LOGIN</Link>
              </li>
            </ul>
          </div>
          
        </nav>

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