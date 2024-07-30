import React, { useState } from 'react';

const TaskForm = ({ onSubmit, task }) => {
  const [formData, setFormData] = useState({
    title: task ? task.title : '',
    description: task ? task.description : '',
    status: task ? task.status : 'pending',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default TaskForm;
