import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Footer from './components/footer/Footer';
import Dashboard from './pages/dashboard/Dashboard';
import AuthForm from './pages/authform/AuthForm';


const App = () => {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" element={
            <>
            <NavBar />
            <Home />
            <About />
            </>
            } 
            />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/authform" element={<AuthForm />} />
          
          
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;
