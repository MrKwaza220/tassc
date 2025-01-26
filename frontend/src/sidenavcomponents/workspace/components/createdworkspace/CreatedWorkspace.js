import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFolder } from "@fortawesome/free-solid-svg-icons";
import DropDownWorkspace from "../dropdownworkspace/DropDownWorkspace";
import CreateWorkSpaceForm from "../createworkspaceform/CreateWorkSpaceForm";
import ConfirmDelete from "../confirmdelete/ConfirmDelete";
import CreateFolder from "../createfolder/CreateFolder";
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
  const [activeWorkspaceForFolder, setActiveWorkspaceForFolder] = useState(null);
  const [editingWorkspaceId, setEditingWorkspaceId] = useState(null); // Tracks the workspace being renamed
  const [newWorkspaceName, setNewWorkspaceName] = useState(""); // Temporary storage for renaming

  const handleCreateWorkspace = (workspace) => {
    const newWorkspace = { id: Date.now(), ...workspace, folders: [] };
    setWorkspaces([...workspaces, newWorkspace]);
    setIsModalOpen(false);
  };

  const handleCreateFolder = (folderName) => {
    const updatedWorkspaces = workspaces.map((workspace) =>
      workspace.id === activeWorkspaceForFolder
        ? { ...workspace, folders: [...workspace.folders, { id: Date.now(), name: folderName }] }
        : workspace
    );
    setWorkspaces(updatedWorkspaces);
    setIsFolderModalOpen(false);
    setActiveWorkspaceForFolder(null);
  };

  const handleRenameWorkspace = (workspaceId, newName) => {
    const updatedWorkspaces = workspaces.map((workspace) =>
      workspace.id === workspaceId ? { ...workspace, name: newName } : workspace
    );
    setWorkspaces(updatedWorkspaces);
    setEditingWorkspaceId(null); // Exit rename mode
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
                  <FontAwesomeIcon icon={faFolder} style={{ marginRight: "10px" }} />
                  
                  {/* Inline Rename Logic */}
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
                      onBlur={() => handleRenameWorkspace(workspace.id, newWorkspaceName)}
                      autoFocus
                      className="rename-input"
                    />
                  ) : (
                    workspace.name
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
                    setEditingWorkspaceId(id); // Enable rename mode
                    setNewWorkspaceName(
                      workspaces.find((workspace) => workspace.id === id)?.name || ""
                    ); // Set initial name
                  }}
                  onDelete={(id) => {
                    setDeleteWorkspaceId(id);
                    setWorkspaceOptionsVisible(null);
                  }}
                />

                {/* Render folders */}
                {workspace.folders && workspace.folders.length > 0 && (
                  <ul className="folder-list">
                    {workspace.folders.map((folder) => (
                      <li key={folder.id} className="folder-item">
                        <FontAwesomeIcon icon={faFolder} style={{ marginRight: "8px" }} />
                        {folder.name}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <button className="create-space-btn" onClick={() => setIsModalOpen(true)}>
            Create Space
            <FontAwesomeIcon icon={faPlus} style={{ marginLeft: "8px" }} />
          </button>

          <CreateWorkSpaceForm
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleCreateWorkspace}
          />

          <CreateFolder
            isOpen={isFolderModalOpen}
            onClose={() => setIsFolderModalOpen(false)}
            onSubmit={handleCreateFolder}
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
