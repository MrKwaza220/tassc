import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import "./DropDownFolder.css";

const DropDownFolder = ({
  folderId,
  isVisible,
  onToggleVisibility,
  onCreateTask,
  onRename,
  onDelete,
}) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onToggleVisibility(null); 
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onToggleVisibility]);

  return (
    <div className="workspace-actions">
      <div
        onClick={(e) => {
          e.stopPropagation();
          onToggleVisibility(isVisible === folderId ? null : folderId);
        }}
      >
        <FontAwesomeIcon icon={faEllipsis} />
      </div>
      {isVisible === folderId && (
        <div ref={menuRef} className="workspace-menu">
          <button
            onClick={() => {
              onCreateTask(folderId);
              onToggleVisibility(null);
            }}
          >
            Create Task
          </button>
          <button
            onClick={() => {
              onRename(folderId);
              onToggleVisibility(null);
            }}
          >
            Rename
          </button>
          <button
            onClick={() => {
              onDelete(folderId);
              onToggleVisibility(null);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DropDownFolder;
