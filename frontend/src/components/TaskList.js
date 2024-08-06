import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import './TaskList.css';
import { toast } from 'react-toastify';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [viewDetails, setViewDetails] = useState(null);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token'); // Or however you are storing the token
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const res = await axios.get('http://localhost:5000/api/tasks', config);
      console.log(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };
   

  const addTask = async (taskData) => {
    const token = localStorage.getItem('token');
    console.log('Adding task with token:', token);
    
    if (!token) {
      setError('No token found, please login again.');
      return;
    }
  
    try {
      await axios.post('http://localhost:5000/api/tasks', taskData, {
        headers: { 'x-auth-token': token },
      });
      fetchTasks(); // Refresh tasks list after adding a new task
    } catch (err) {
      console.error('Error adding task:', err.response || err.message);
      setError('Failed to add task.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTaskClick = () => {
    setCurrentTask(null);
    setShowForm(true);
  };

  const handleTaskFormClose = () => {
    setShowForm(false);
    fetchTasks();
  };

  const handleEditClick = (task) => {
    setCurrentTask(task);
    setShowForm(true);
  };

  const handleViewDetailsClick = (task) => {
    setViewDetails(task);
  };

  const handleDeleteClick = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchTasks();
      toast.success('Task deleted successfully');
    } catch (err) {
      console.error('Error deleting task:', err);
      toast.error('Error deleting task');
    }
  };

  const closeDetails = () => {
    setViewDetails(null);
  };

  return (
    <div className="task-container">
      <h2>Tasks</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleAddTaskClick}>Add Task</button>
      {showForm && <TaskForm onClose={handleTaskFormClose} task={currentTask} />}
      {viewDetails && (
        <div className="task-details">
          <h3>Task Details</h3>
          <p><strong>Task Name:</strong> {viewDetails.name}</p>
          <p><strong>Description:</strong> {viewDetails.description}</p>
          <p><strong>Status:</strong> {viewDetails.status}</p>
          <p><strong>Due Date:</strong> {new Date(viewDetails.dueDate).toLocaleDateString()}</p>
          <p><strong>Created At:</strong> {new Date(viewDetails.createdAt).toLocaleString()}</p>
          <p><strong>Last Updated:</strong> {new Date(viewDetails.updatedAt).toLocaleString()}</p>
          <button onClick={closeDetails}>Close</button>
        </div>
      )}
      {tasks.length === 0 ? (
        <p>No tasks loaded</p>
      ) : (
        <table className="task-table">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                <td className="actions">
                  <button className="edit" onClick={() => handleEditClick(task)}>Edit</button>
                  <button className="view" onClick={() => handleViewDetailsClick(task)}>View Details</button>
                  <button className="delete" onClick={() => handleDeleteClick(task._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskList;
