import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Define fetchTasks outside useEffect
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTaskClick = () => {
    setShowForm(true);
  };

  const handleTaskFormClose = () => {
    setShowForm(false);
    fetchTasks(); // Optionally refetch tasks to update the list
  };

  return (
    <div>
      <h2>Tasks</h2>
      <button onClick={handleAddTaskClick}>Add Task</button>
      {showForm && <TaskForm onClose={handleTaskFormClose} />}
      <table>
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
          {tasks.map(task => (
            <tr key={task._id}>
              <td>{task.name}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{new Date(task.dueDate).toLocaleDateString()}</td>
              <td>
                <button>Edit</button>
                <button>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
