import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import "./DropDownWorkspace.css";

const DropDownWorkspace = ({
  workspaceId,
  isVisible,
  onToggleVisibility,
  onCreateFolder,
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
          onToggleVisibility(isVisible === workspaceId ? null : workspaceId);
        }}
      >
        <FontAwesomeIcon icon={faEllipsis} />
      </div>
      {isVisible === workspaceId && (
        <div ref={menuRef} className="workspace-menu">
          <button
            onClick={() => {
              onCreateFolder(workspaceId);
              onToggleVisibility(null);
            }}
          >
            Create Folder
          </button>
          <button
            onClick={() => {
              onRename(workspaceId);
              onToggleVisibility(null);
            }}
          >
            Rename
          </button>
          <button
            onClick={() => {
              onDelete(workspaceId);
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

export default DropDownWorkspace;
