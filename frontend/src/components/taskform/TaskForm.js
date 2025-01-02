import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import "./TaskForm.css";

const TaskForm = ({ onClose, task }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Select status");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [timer, setTimer] = useState(""); // New state for timer (e.g., 2 hours)
  const [priority, setPriority] = useState("Medium"); // New state for priority

  useEffect(() => {
    if (task) {
      setName(task.name);
      setDescription(task.description);
      setStatus(task.status);
      setDueDate(new Date(task.dueDate).toISOString().split("T")[0]);
      setDueTime(task.dueTime ? task.dueTime : ""); 
      setTimer(task.timer ? task.timer : ""); 
      setPriority(task.priority ? task.priority : "Medium"); 
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log("Retrieved token:", token);

    const taskData = {
      name,
      description,
      status,
      dueDate: `${dueDate}T${dueTime}`, 
      timer,
      priority,
    };
    console.log("Submitting task data:", taskData);

    try {
      if (task) {
        console.log("Updating task:", task._id);
        const response = await axios.put(
          `http://localhost:5000/api/tasks/${task._id}`,
          taskData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Task updated successfully:", response.data);
      } else {
        console.log("Creating new task");
        const response = await axios.post(
          "http://localhost:5000/api/tasks",
          taskData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Task created successfully:", response.data);
      }
      onClose();
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="task-form" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h2>{task ? "Edit Task" : "Add Task"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-name">
              <input
                type="text"
                placeholder="Enter task name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-description">
              <textarea
                type="text"
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group-2">
            <div className="input-group">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                {" "}
                <option value="" disabled>
                  Select status
                </option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="input-date">
              <label>Due Date:</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
            <div className="input-due-time">
              <label>Due Time:</label>
              <input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
              />
            </div>
            <div className="input-set-timer">
              <label>Set Timer (hours):</label>
              <input
                type="number"
                value={timer}
                onChange={(e) => setTimer(e.target.value)}
                min="0"
                step="1"
              />
            </div>
            <div className="input-priority">
              <label>Priority:</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
          <button type="submit">{task ? "Update Task" : "Add Task"}</button>
          {/* <button type="button" className="cancel-button" onClick={onClose}>
            Cancel
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
