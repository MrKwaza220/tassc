import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFolder } from "@fortawesome/free-solid-svg-icons";
import DropDownWorkspace from "../dropdownworkspace/DropDownWorkspace";
import CreateWorkSpaceForm from "../createworkspaceform/CreateWorkSpaceForm";
import ConfirmDelete from "../confirmdelete/ConfirmDelete";
import "./CreatedWorkspace.css";

const CreatedWorkSpace = ({
  isWorkspaceOpen,
  workspaces,
  setWorkspaces,
  setActiveWorkspace,
  setActiveView,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [workspaceOptionsVisible, setWorkspaceOptionsVisible] = useState(null);
  const [deleteWorkspaceId, setDeleteWorkspaceId] = useState(null);
  const [activeWorkspaceForFolder, setActiveWorkspaceForFolder] =
    useState(null);
  const [editingWorkspaceId, setEditingWorkspaceId] = useState(null);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");

  const handleCreateWorkspace = (workspace) => {
    const newWorkspace = { id: Date.now(), ...workspace, folders: [] };
    setWorkspaces([...workspaces, newWorkspace]);
    setIsModalOpen(false);
  };

  const handleRenameWorkspace = (workspaceId, newName) => {
    if (!newName.trim()) return;

    const updatedWorkspaces = workspaces.map((workspace) =>
      workspace.id === workspaceId
        ? { ...workspace, name: newName.trim() }
        : workspace
    );

    setWorkspaces(updatedWorkspaces);
    setEditingWorkspaceId(null);
  };

  const handleDeleteWorkspace = () => {
    const updatedWorkspaces = workspaces.filter(
      (workspace) => workspace.id !== deleteWorkspaceId
    );
    setWorkspaces(updatedWorkspaces);
    setDeleteWorkspaceId(null);
  };

  return (
    <div className="created-workspaces">
      {isWorkspaceOpen && (
        <>
          <ul className="created-workspace">
            {workspaces.map((workspace) => (
              <li key={workspace.id} className="nav-item">
                <div
                  className="workspace-name"
                  onClick={() => {
                    setActiveWorkspace(workspace);
                    setActiveView("Workspace");
                  }}
                >
                  <FontAwesomeIcon
                    icon={faFolder}
                    style={{ marginRight: "10px" }}
                  />

                  {editingWorkspaceId === workspace.id ? (
                    <input
                      type="text"
                      value={newWorkspaceName}
                      onChange={(e) => setNewWorkspaceName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleRenameWorkspace(workspace.id, newWorkspaceName);
                        }
                      }}
                      onBlur={() =>
                        handleRenameWorkspace(workspace.id, newWorkspaceName)
                      }
                      autoFocus
                      className="rename-input"
                    />
                  ) : (
                    <span>{workspace.name}</span>
                  )}
                </div>

                <DropDownWorkspace
                  workspaceId={workspace.id}
                  isVisible={workspaceOptionsVisible}
                  onToggleVisibility={setWorkspaceOptionsVisible}
                  onCreateFolder={(id) => {
                    setActiveWorkspaceForFolder(id);
                    setIsFolderModalOpen(true);
                  }}
                  onRename={(id) => {
                    setEditingWorkspaceId(id);
                    setNewWorkspaceName(
                      workspaces.find((workspace) => workspace.id === id)
                        ?.name || ""
                    );
                  }}
                  onDelete={(id) => {
                    setDeleteWorkspaceId(id);
                    setWorkspaceOptionsVisible(null);
                  }}
                />
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

          <ConfirmDelete
            isOpen={!!deleteWorkspaceId}
            onClose={() => setDeleteWorkspaceId(null)}
            onConfirm={handleDeleteWorkspace}
            message="Are you sure you want to delete this workspace?"
          />
        </>
      )}
    </div>
  );
};

export default CreatedWorkSpace;
