import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import PropertiesOverview from './pages/PropertiesOverview';

function App() {
  return (
    <div>
    <Navbar />
    <Router> 

      <div className="app">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<PropertiesOverview />} />
          <Route path="/optimization/:propertyId" element={<Dashboard />} />
         
        </Routes>
      </div>
    </Router>
    <Footer />
    </div>
  );
}

export default App;
