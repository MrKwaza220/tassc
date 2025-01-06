import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "../taskform/TaskForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash, faPlus, faTable, faTh } from "@fortawesome/free-solid-svg-icons";
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [viewDetails, setViewDetails] = useState(null);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("table"); // Default to table view

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
      console.log(res.data);
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
      console.log("Task deleted successfully");
    } catch (err) {
      console.error("Error deleting task:", err.response || err.message);
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

      <div className="view-toggle">
        <button
          className={viewMode === "table" ? "active" : ""}
          onClick={() => setViewMode("table")}
        >
          <FontAwesomeIcon icon={faTable} /> 
        </button>
        <button
          className={viewMode === "grid" ? "active" : ""}
          onClick={() => setViewMode("grid")}
        >
          <FontAwesomeIcon icon={faTh} /> 
        </button>
      </div>

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
            <p className={`status-${viewDetails.status.toLowerCase().replace(" ", "-")}`}>
              <strong>Status:</strong> {viewDetails.status}
            </p>
            <p><strong>Due Date:</strong> {new Date(viewDetails.dueDate).toLocaleDateString()}</p>
            <p><strong>Due Time:</strong> {viewDetails.dueTime || "N/A"}</p>
            <p><strong>Timer:</strong> {viewDetails.timer ? `${viewDetails.timer} hours` : "N/A"}</p>
            <p className={`priority-${viewDetails.priority.toLowerCase()}`}>
              <strong>Priority:</strong> {viewDetails.priority}
            </p>
            <button className="close-button" onClick={closeDetails}>
              Close
            </button>
          </div>
        </div>
      )}

      {tasks.length === 0 ? (
        <p>No tasks loaded</p>
      ) : viewMode === "table" ? (
        <table className="task-table">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Due Time</th>
              <th>Timer</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td className={`status-${task.status.toLowerCase().replace(" ", "-")}`}>
                  {task.status}
                </td>
                <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                <td>{task.dueTime || "N/A"}</td>
                <td>{task.timer ? `${task.timer} hours` : "N/A"}</td>
                <td className={`priority-${task.priority.toLowerCase()}`}>
                  {task.priority}
                </td>
                <td className="actions">
                  <button className="edit" onClick={() => handleEditClick(task)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="view" onClick={() => handleViewDetailsClick(task)}>
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button className="delete" onClick={() => handleDeleteClick(task._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => (
            <div key={task._id} className="task-card">
              <h3>{task.name}</h3>
              <p><strong>Description:</strong> {task.description}</p>
              <p className={`status-${task.status.toLowerCase().replace(" ", "-")}`}>
                <strong>Status:</strong> {task.status}
              </p>
              <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
              <p><strong>Due Time:</strong> {task.dueTime || "N/A"}</p>
              <p><strong>Timer:</strong> {task.timer ? `${task.timer} hours` : "N/A"}</p>
              <p className={`priority-${task.priority.toLowerCase()}`}>
                <strong>Priority:</strong> {task.priority}
              </p>
              <div className="actions">
                <button className="edit" onClick={() => handleEditClick(task)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="view" onClick={() => handleViewDetailsClick(task)}>
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button className="delete" onClick={() => handleDeleteClick(task._id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
