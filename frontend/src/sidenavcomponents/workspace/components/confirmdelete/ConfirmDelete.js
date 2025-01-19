import React from "react";
import "./ConfirmDelete.css";

const ConfirmDelete = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-delete-overlay">
      <div className="confirm-delete-modal">
        <p className="confirm-delete-message">{message || "Are you sure you want to delete this?"}</p>
        <div className="confirm-delete-buttons">
          <button className="confirm-delete-confirm" onClick={onConfirm}>
            Yes
          </button>
          <button className="confirm-delete-cancel" onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
