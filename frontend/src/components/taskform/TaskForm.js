import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TaskForm.css";


const TaskForm = ({ onClose, task }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (task) {
      setName(task.name);
      setDescription(task.description);
      setStatus(task.status);
      setDueDate(new Date(task.dueDate).toISOString().split("T")[0]);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log("Retrieved token:", token);

    const taskData = { name, description, status, dueDate };
    console.log("Submitting task data:", taskData);
    

    try {
      if (task) {
        // Update task
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
        // Create task
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
      //console.error('Error saving task:', err);
    }
  };

  return (
    <div className="task-form">
      <h2>{task ? "Edit Task" : "Add Task"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Task Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">{task ? "Update Task" : "Add Task"}</button>
        <button type="button" className="cancel-button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
