import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api/tasks';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks(token);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      }
    };

    fetchTasks();
  }, [token]);

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData, token);
      setTasks([...tasks, newTask]);
      setCurrentTask(null);
    } catch (error) {
      console.error('Failed to create task', error);
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const updatedTask = await updateTask(currentTask._id, taskData, token);
      setTasks(
        tasks.map((task) => (task._id === currentTask._id ? updatedTask : task))
      );
      setCurrentTask(null);
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id, token);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
  };

  return (
    <div>
      <h2>Tasks</h2>
      <TaskForm
        onSubmit={currentTask ? handleUpdateTask : handleCreateTask}
        task={currentTask}
      />
      <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
    </div>
  );
};

export default Tasks;
