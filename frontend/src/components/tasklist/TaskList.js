import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "../taskform/TaskForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [viewDetails, setViewDetails] = useState(null);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get("http://localhost:5000/api/tasks", config);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to fetch tasks.");
    }
  };

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
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const closeDetails = () => {
    setViewDetails(null);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="task-container">
      <h2>Tasks</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button className="add-task" onClick={handleAddTaskClick}>
        <FontAwesomeIcon icon={faPlus} /> Add Task
      </button>
      {showForm && <TaskForm onClose={handleTaskFormClose} task={currentTask} />}
      
      {viewDetails && (
        <div className="modal" onClick={closeDetails}>
          <div className="task-details" onClick={(e) => e.stopPropagation()}>
            <h3>Task Details</h3>
            <p><strong>Task Name:</strong> {viewDetails.name}</p>
            <p><strong>Description:</strong> {viewDetails.description}</p>
            <p><strong>Status:</strong> {viewDetails.status}</p>
            <p><strong>Due Date:</strong> {new Date(viewDetails.dueDate).toLocaleDateString()}</p>
            <p><strong>Due Time:</strong> {viewDetails.dueTime}</p>
            <p><strong>Timer:</strong> {viewDetails.timer} hours</p>
            <p><strong>Priority:</strong> {viewDetails.priority}</p>
            <button className="close-button" onClick={closeDetails}>Close</button>
          </div>
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
              <th>Priority</th>
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
                <td>{task.priority}</td>
                <td className="actions">
                  <button className="edit" onClick={() => handleEditClick(task)}>
                    <FontAwesomeIcon icon={faEdit} style={{ fontSize: "14px" }} />
                  </button>
                  <button className="view" onClick={() => handleViewDetailsClick(task)}>
                    <FontAwesomeIcon icon={faEye} style={{ fontSize: "14px" }} />
                  </button>
                  <button className="delete" onClick={() => handleDeleteClick(task._id)}>
                    <FontAwesomeIcon icon={faTrash} style={{ fontSize: "14px" }} />
                  </button>
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
