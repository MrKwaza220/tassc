import React, { useState } from "react";
import "./CreateWorkSpaceForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

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
      <button type="button" className="btn-cancel" onClick={onClose}>
      
      <FontAwesomeIcon icon={faCircleXmark} />
    </button>
         
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
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-submit">
              Create
              <FontAwesomeIcon icon={faPlus} style={{ marginLeft: "8px" }} />
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWorkSpaceForm;
