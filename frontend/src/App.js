import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskForm from './components/taskform/TaskForm';
import TaskList from './components/tasklist/TaskList';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Home from './pages/home/Home';
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/add-task" element={<TaskForm />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
