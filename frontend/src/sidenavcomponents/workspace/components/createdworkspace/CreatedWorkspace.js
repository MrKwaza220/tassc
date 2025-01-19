import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFolder, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import CreateWorkSpaceForm from "../createworkspaceform/CreateWorkSpaceForm";
import "./CreatedWorkspace.css";

const CreatedWorkSpace = ({
  isWorkspaceOpen,
  workspaces,
  setWorkspaces,
  setActiveWorkspace,
  setActiveView,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workspaceOptionsVisible, setWorkspaceOptionsVisible] = useState(null);
  const [editingWorkspaceId, setEditingWorkspaceId] = useState(null);

  const handleCreateWorkspace = (workspace) => {
    const newWorkspace = { id: Date.now(), ...workspace, tasks: [] };
    setWorkspaces([...workspaces, newWorkspace]);
    setActiveWorkspace(newWorkspace);
    setActiveView("Workspace");
    setIsModalOpen(false);
  };

  const handleEditWorkspace = (workspaceId, updatedDetails) => {
    const updatedWorkspaces = workspaces.map((workspace) =>
      workspace.id === workspaceId
        ? { ...workspace, ...updatedDetails }
        : workspace
    );
    setWorkspaces(updatedWorkspaces);
  };

  const handleDeleteWorkspace = (workspaceId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this workspace?"
    );
    if (confirmDelete) {
      const updatedWorkspaces = workspaces.filter(
        (workspace) => workspace.id !== workspaceId
      );
      setWorkspaces(updatedWorkspaces);
    }
  };

  return (
    <div className="created-workspaces">
      {isWorkspaceOpen && (
        <>
          <ul className="created-workspace">
            {workspaces.map((workspace) => (
              <li key={workspace.id} className="nav-item">
                {editingWorkspaceId === workspace.id ? (
                  <input
                    type="text"
                    defaultValue={workspace.name}
                    onBlur={(e) => {
                      handleEditWorkspace(workspace.id, { name: e.target.value });
                      setEditingWorkspaceId(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleEditWorkspace(workspace.id, { name: e.target.value });
                        setEditingWorkspaceId(null);
                      }
                    }}
                    autoFocus
                  />
                ) : (
                  <div
                    onClick={() => {
                      setActiveWorkspace(workspace);
                      setActiveView("Workspace");
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faFolder}
                      style={{ marginRight: "10px" }}
                    />
                    {workspace.name}
                  </div>
                )}

                <div
                  className="workspace-actions"
                  onClick={(e) => {
                    e.stopPropagation();
                    setWorkspaceOptionsVisible(
                      workspaceOptionsVisible === workspace.id
                        ? null
                        : workspace.id
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faEllipsis} />
                  {workspaceOptionsVisible === workspace.id && (
                    <div className="workspace-menu">
                      <button
                        onClick={() => {
                          setEditingWorkspaceId(workspace.id);
                          setWorkspaceOptionsVisible(null);
                        }}
                      >
                        Rename
                      </button>
                      <button>Add Task</button>
                      <button
                        onClick={() => handleDeleteWorkspace(workspace.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <button
            className="create-space-btn"
            onClick={() => setIsModalOpen(true)}
          >
            Create Space
            <FontAwesomeIcon icon={faPlus} style={{ marginLeft: "8px" }} />
          </button>

          <CreateWorkSpaceForm
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleCreateWorkspace}
          />
        </>
      )}
    </div>
  );
};

export default CreatedWorkSpace;
