import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFolder } from "@fortawesome/free-solid-svg-icons";
import DropDownWorkspace from "../dropdownworkspace/DropDownWorkspace";
import CreateWorkSpaceForm from "../createworkspaceform/CreateWorkSpaceForm";
import ConfirmDelete from "../confirmdelete/ConfirmDelete";
import CreateFolder from "../createfolder/CreateFolder";
import "./CreatedWorkspace.css";
import DropDownFolder from "../dropdownfolder/DropDownFolder";

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
  const [visibleFolderMenu, setVisibleFolderMenu] = useState(null);
  const [deleteFolderId, setDeleteFolderId] = useState(null);
  const [activeWorkspaceForFolder, setActiveWorkspaceForFolder] =
    useState(null);

  //Workspace
  const handleCreateWorkspace = (workspace) => {
    const newWorkspace = { id: Date.now(), ...workspace, folders: [] };
    setWorkspaces([...workspaces, newWorkspace]);
    setIsModalOpen(false);
  };

  const handleCreateFolder = (folderName) => {
    if (!activeWorkspaceForFolder) return;

    const updatedWorkspaces = workspaces.map((workspace) =>
      workspace.id === activeWorkspaceForFolder
        ? {
            ...workspace,
            folders: [
              ...workspace.folders,
              { id: Date.now(), name: folderName },
            ],
          }
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
  };

  const handleDeleteWorkspace = () => {
    const updatedWorkspaces = workspaces.filter(
      (workspace) => workspace.id !== deleteWorkspaceId
    );
    setWorkspaces(updatedWorkspaces);
    setDeleteWorkspaceId(null);
  };

  //Folder
  const handleCreateTask = (folderId) => {
    console.log("Create Task", folderId);
  };

  const handleRenameFolder = (folderId) => {
    console.log("Rename Folder", folderId);
  };

  const handleDeleteFolder = (folderId) => {
    const updatedWorkspaces = workspaces.map((workspace) => ({
      ...workspace,
      folders: workspace.folders.filter((folder) => folder.id !== folderId),
    }));

    setWorkspaces(updatedWorkspaces);
    setDeleteFolderId(null);
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
                  {workspace.name}
                </div>

                <DropDownWorkspace
                  workspaceId={workspace.id}
                  isVisible={workspaceOptionsVisible}
                  onToggleVisibility={setWorkspaceOptionsVisible}
                  onCreateFolder={() => {
                    setActiveWorkspaceForFolder(workspace.id);
                    setIsFolderModalOpen(true);
                  }}
                  onRename={(id) => {
                    handleRenameWorkspace(id, workspace.name);
                  }}
                  onDelete={(id) => {
                    setDeleteWorkspaceId(id);
                    setWorkspaceOptionsVisible(null);
                  }}
                />
              </li>
            ))}

            <li className="created-folder">
              {workspaces.map(
                (workspace) =>
                  workspace.folders &&
                  workspace.folders.length > 0 && (
                    <ul key={workspace.id} className="folder-list">
                      {workspace.folders.map((folder) => (
                        <li key={folder.id} className="folder-item">
                          <FontAwesomeIcon
                            icon={faFolder}
                            style={{ marginRight: "8px" }}
                          />
                          {folder.name}

                          <DropDownFolder
                            folderId={folder.id}
                            isVisible={visibleFolderMenu}
                            onToggleVisibility={setVisibleFolderMenu}
                            onCreateTask={handleCreateTask}
                            onRename={handleRenameFolder}
                            onDelete={handleDeleteFolder}
                          />
                        </li>
                      ))}
                    </ul>
                  )
              )}
            </li>
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
          <ConfirmDelete
            isOpen={!!deleteFolderId}
            onClose={() => setDeleteFolderId(null)}
            onConfirm={handleDeleteFolder}
            message="Are you sure you want to delete this folder?"
          />
        </>
      )}
    </div>
  );
};

export default CreatedWorkSpace;
