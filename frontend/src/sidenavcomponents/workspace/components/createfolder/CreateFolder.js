import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./CreateFolder.css";

const CreateFolder = ({ onClose, onSubmit, isOpen }) => {
  const [folderName, setFolderName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (folderName.trim()) {
      onSubmit(folderName.trim());
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
        <div type="button" className="close-button" onClick={onClose}>
        <FontAwesomeIcon icon={faCircleXmark} />
        </div>

        <h1>
          {/* <FontAwesomeIcon icon={faFolderPlus} style={{ marginRight: "10px" }} /> */}
          Create Folder
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="folder-name">Folder Name</label>
            <input
              type="text"
              id="folder-name"
              name="folder-name"
              placeholder="Enter folder name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="form-buttons">
            <div type="submit" className="submit-button">
              Create
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFolder;
