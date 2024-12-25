import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskForm from './components/taskform/TaskForm';
import TaskList from './components/tasklist/TaskList';
import NavBar from './components/navbar/NavBar';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Footer from './components/footer/Footer';
import Dashboard from './pages/dashboard/Dashboard';

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={
            <>
            <Home />
            <About />
            </>
            } 
            />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;
