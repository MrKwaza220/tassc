import React, { useState } from "react";
import "./CreateWorkSpaceForm.css";

const CreateWorkSpaceForm = ({ isOpen, onClose, onSubmit }) => {
  const [workspaceName, setWorkspaceName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (workspaceName && description) {
      onSubmit({ name: workspaceName, description });
      setWorkspaceName("");
      setDescription("");
      onClose(); // Close modal after submission
    } else {
      alert("Please fill in all fields.");
    }
  };

  if (!isOpen) return null; // Only render modal if `isOpen` is true

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <h2>Create Workspace</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Workspace Name</label>
            <input
              type="text"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              placeholder="Enter workspace name"
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-submit">
              Create
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWorkSpaceForm;
