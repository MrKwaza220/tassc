
import React, { useState } from "react";
import "./CreateFolder.css";

const CreateFolder = ({ onClose, onSubmit, isOpen }) => {
  const [folderName, setFolderName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (folderName.trim()) {
      onSubmit({ name: folderName.trim() });
      setFolderName("");
      setErrorMessage("");
      onClose();
    } else {
      setErrorMessage("Folder name is required.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="create-folder-overlay">
      <div className="create-folder-modal">
        <h1>Create Folder</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="folder-name">Folder Name</label>
            <input
              type="text"
              id="folder-name"
              name="folder-name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="form-buttons">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Create Folder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFolder;
