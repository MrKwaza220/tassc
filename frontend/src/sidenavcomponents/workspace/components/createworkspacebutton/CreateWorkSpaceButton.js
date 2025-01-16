import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFolder, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import CreateWorkSpaceForm from "../createworkspaceform/CreateWorkSpaceForm";
import "./CreateWorkSpaceButton.css";

const CreateWorkSpaceButton = ({
  isWorkspaceOpen,
  workspaces,
  setWorkspaces,
  setActiveWorkspace,
  setActiveView,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workspaceOptionsVisible, setWorkspaceOptionsVisible] = useState(null);

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
    const updatedWorkspaces = workspaces.filter(
      (workspace) => workspace.id !== workspaceId
    );
    setWorkspaces(updatedWorkspaces);
  };

  return (
    <div className="create-workspace-btn">
      {isWorkspaceOpen && (
        <>
          <ul className="created-workspace">
            {workspaces.map((workspace) => (
              <li key={workspace.id} className="nav-item">
                {/* Workspace name and icon */}
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

                {/* Ellipsis and actions */}
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
                          const newName = prompt(
                            "Edit workspace name:",
                            workspace.name
                          );
                          if (newName) {
                            handleEditWorkspace(workspace.id, {
                              name: newName,
                            });
                          }
                        }}
                      >
                        Edit
                      </button>
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

export default CreateWorkSpaceButton;
