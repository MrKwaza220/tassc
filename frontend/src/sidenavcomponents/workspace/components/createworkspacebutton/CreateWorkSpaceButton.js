import React from "react";
import "./CreateWorkSpaceButton.css";

const CreateWorkSpaceButton = () =>{
    return(
        <div className="create-workspace-btn">
            {isWorkspaceOpen && (
            <>
              <ul className="created-workspace">
                {workspaces.map((workspace) => (
                  <li
                    key={workspace.id}
                    className={`nav-item ${
                      activeWorkspace?.id === workspace.id ? "active" : ""
                    }`}
                    onClick={() => {
                      setActiveWorkspace(workspace);
                      setActiveView("Workspace");
                    }}
                  >
                    {/* Workspace name and icon */}
                    <div>
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
                        <div className="workspace-menu">
                          <button>
                            Add Task
                          </button>

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

                          <button>
                            Add Task
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <button
                style={{
                  marginLeft: "20px",
                  marginBottom: "10px",
                  padding: "10px",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
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
    )
}
export default CreateWorkSpaceButton;