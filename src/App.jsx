import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router> 
      <div className="app">
        <header className="header">
          <img
            className="header__logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1200px-Airbnb_Logo_B%C3%A9lo.svg.png"
            alt="Airbnb Logo"
          />
          <input type="text" placeholder="Search" className="header__searchInput" />
        </header>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
