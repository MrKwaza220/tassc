import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "../taskform/TaskForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faTrash,
  faPlus,
  faTable,
  faTh,
} from "@fortawesome/free-solid-svg-icons";
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
      {/* <h2>Tasks</h2> */}
      {error && <p style={{ color: "red" }}>{error}</p>}

     

      <div className="view-toggle">

      <button className="add-task" onClick={handleAddTaskClick}>
        <FontAwesomeIcon icon={faPlus} /> Add Task
      </button>

        <button
          className={viewMode === "table" ? "active" : ""}
          onClick={() => setViewMode("table")}
        >
          <FontAwesomeIcon icon={faTable} style={{ fontSize: "18px" }} />
        </button>

        <button
          className={viewMode === "grid" ? "active" : ""}
          onClick={() => setViewMode("grid")}
        >
          <FontAwesomeIcon icon={faTh} style={{ fontSize: "18px" }} />
        </button>
      </div>

      {showForm && (
        <TaskForm onClose={handleTaskFormClose} task={currentTask} />
      )}

      {viewDetails && (
        <div className="modal" onClick={closeDetails}>
          <div className="task-details" onClick={(e) => e.stopPropagation()}>
            <h3>TASK DETAILS</h3>
            <p>
              <strong>Task Name:</strong> {viewDetails.name}
            </p>
            <p>
              <strong>Description:</strong> {viewDetails.description}
            </p>
            <p
              className={`status-${viewDetails.status
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              <strong>Status:</strong> {viewDetails.status}
            </p>
            <p>
              <strong>Due Date:</strong>{" "}
              {new Date(viewDetails.dueDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Time:</strong> {viewDetails.dueTime || "N/A"}
            </p>
            {/* <p><strong>Timer:</strong> {viewDetails.timer ? `${viewDetails.timer} hours` : "N/A"}</p> */}
            <p className={`priority-${viewDetails.priority.toLowerCase()}`}>
              <strong>Priority:</strong> {viewDetails.priority}
            </p>
            <button className="close-button" onClick={closeDetails}>
              Cancel
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
              <th className="task-head">Task Name</th>
              <th className="task-head">Description</th>
              <th className="task-head">Status</th>
              <th className="task-head">Due Date</th>
              <th className="task-head">Time</th>
              {/* <th className="task-head">Timer</th> */}
              <th className="task-head">Priority</th>
              <th className="task-head">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td className="task-body">{task.name}</td>
                <td className="task-body">{task.description}</td>
                <td
                  className={`status-${task.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {task.status}
                </td>
                <td className="task-body">
                  {new Date(task.dueDate).toLocaleDateString()}
                </td>
                <td className="task-body">{task.dueTime || "N/A"}</td>
                {/* <td>{task.timer ? `${task.timer} hours` : "N/A"}</td> */}
                <td className={`priority-${task.priority.toLowerCase()}`}>
                  {task.priority}
                </td>
                <td className="actions">
                  <button
                    className="edit"
                    onClick={() => handleEditClick(task)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="view"
                    onClick={() => handleViewDetailsClick(task)}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDeleteClick(task._id)}
                  >
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
            <div
              key={task._id}
              className={`task-card status-${task.status
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              <h3>{task.name}</h3>
              <p className="grid-task">
                <strong>Description:</strong> {task.description}
              </p>
              <p className="grid-task">
                <strong>Status:</strong> {task.status}
              </p>
              <p className="grid-task">
                <strong>Due Date:</strong>{" "}
                {new Date(task.dueDate).toLocaleDateString()}
              </p>
              <p className="grid-task">
                <strong>Time:</strong> {task.dueTime || "N/A"}
              </p>
              {/* <p>
                <strong>Timer:</strong>{" "}
                {task.timer ? `${task.timer} hours` : "N/A"}
              </p> */}
              <p className="grid-task">
                <strong>Priority:</strong> {task.priority}
              </p>
              <div className="grid-actions">
                <button
                  className="grid-edit"
                  onClick={() => handleEditClick(task)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="grid-view"
                  onClick={() => handleViewDetailsClick(task)}
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button
                  className="grid-delete"
                  onClick={() => handleDeleteClick(task._id)}
                >
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
