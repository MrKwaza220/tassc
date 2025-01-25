import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFolder, faEllipsis, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
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
  const [workspaceOptionsVisible, setWorkspaceOptionsVisible] = useState(null);
  const [deleteWorkspaceId, setDeleteWorkspaceId] = useState(null);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [activeWorkspaceForFolder, setActiveWorkspaceForFolder] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setWorkspaceOptionsVisible(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCreateWorkspace = (workspace) => {
    const newWorkspace = { id: Date.now(), ...workspace, folders: [] };
    setWorkspaces([...workspaces, newWorkspace]);
    setIsModalOpen(false);
  };

  const handleDeleteWorkspace = () => {
    const updatedWorkspaces = workspaces.filter(
      (workspace) => workspace.id !== deleteWorkspaceId
    );
    setWorkspaces(updatedWorkspaces);
    setDeleteWorkspaceId(null);
  };

  const handleCreateFolder = (folder) => {
    const updatedWorkspaces = workspaces.map((workspace) =>
      workspace.id === activeWorkspaceForFolder
        ? { ...workspace, folders: [...workspace.folders, folder] }
        : workspace
    );
    setWorkspaces(updatedWorkspaces);
    setIsFolderModalOpen(false);
    setActiveWorkspaceForFolder(null);
  };

  return (
    <div className="created-workspaces">
      {isWorkspaceOpen && (
        <>
          <ul className="created-workspace">
            {workspaces.map((workspace) => (
              <li key={workspace.id} className="nav-item">
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
                    <div ref={menuRef} className="workspace-menu">
                      <button
                        onClick={() => {
                          setIsFolderModalOpen(true);
                          setActiveWorkspaceForFolder(workspace.id);
                          setWorkspaceOptionsVisible(null);
                        }}
                      >
                        Create Folder
                      </button>
                      <button
                        onClick={() => {
                          setDeleteWorkspaceId(workspace.id);
                          setWorkspaceOptionsVisible(null);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                {/* Render folders under workspace */}
                {workspace.folders && workspace.folders.length > 0 && (
                  <ul className="folder-list">
                    {workspace.folders.map((folder) => (
                      <li key={folder.id} className="folder-item">
                        <FontAwesomeIcon icon={faFolderPlus} style={{ marginRight: "8px" }} />
                        {folder.name} {/* Fixed rendering */}
                      </li>
                    ))}
                  </ul>
                )}
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
          <CreateFolder
            isOpen={isFolderModalOpen}
            onClose={() => setIsFolderModalOpen(false)}
            onSubmit={(folderName) =>
              handleCreateFolder({ id: Date.now(), name: folderName })
            }
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
