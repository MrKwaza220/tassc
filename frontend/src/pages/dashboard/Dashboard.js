import React, { useState } from "react";
import Inbox from "../../sidenavcomponents/inbox/Inbox";
import DailyTask from "../../sidenavcomponents/dailytask/DailyTask";
import Workspace from "../../sidenavcomponents/workspace/Workspace";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
  faPlus,
  faFolder,
  faInbox,
  faListCheck,
  faBriefcase,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import CreateWorkSpaceForm from "../../sidenavcomponents/workspace/components/createworkspaceform/CreateWorkSpaceForm";
import "./Dashboard.css";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("inbox");
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [activeWorkspace, setActiveWorkspace] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workspaceOptionsVisible, setWorkspaceOptionsVisible] = useState(null);

  const handleWorkspaceToggle = () => {
    setIsWorkspaceOpen(!isWorkspaceOpen);
  };

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
    if (activeWorkspace?.id === workspaceId) {
      setActiveWorkspace(null);
      setActiveView("inbox");
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case "inbox":
        return <Inbox />;
      case "DailyTask":
        return <DailyTask />;
      case "Workspace":
        return activeWorkspace ? (
          <Workspace workspace={activeWorkspace} />
        ) : (
          <p>Select a workspace to view its details.</p>
        );
      default:
        return <Inbox />;
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Dashboard</h2>
        <ul className="nav-list">
          <li className="nav-item" onClick={() => setActiveView("inbox")}>
            <FontAwesomeIcon icon={faInbox} style={{ marginRight: "10px" }} />
            Inbox
          </li>
          <li className="nav-item" onClick={() => setActiveView("DailyTask")}>
            <FontAwesomeIcon
              icon={faListCheck}
              style={{ marginRight: "10px" }}
            />
            Daily Tasks
          </li>
          <li className="nav-item" onClick={handleWorkspaceToggle}>
            <FontAwesomeIcon
              icon={faBriefcase}
              style={{ marginRight: "10px" }}
            />
            Workspace
            <FontAwesomeIcon
              icon={isWorkspaceOpen ? faChevronDown : faChevronRight}
              style={{ marginLeft: "40px", fontSize: "12px" }}
            />
          </li>

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
        <FontAwesomeIcon icon={faFolder} style={{ marginRight: "10px" }} />
        {workspace.name}
      </div>

      {/* Ellipsis icon and dropdown menu */}
      <div
        className="workspace-actions"
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the workspace selection
          setWorkspaceOptionsVisible(
            workspaceOptionsVisible === workspace.id ? null : workspace.id
          );
        }}
      >
        <FontAwesomeIcon icon={faEllipsis} />
        {workspaceOptionsVisible === workspace.id && (
          <div className="workspace-menu">
            <button
              onClick={() => {
                const newName = prompt("Edit workspace name:", workspace.name);
                if (newName) {
                  handleEditWorkspace(workspace.id, {
                    name: newName,
                  });
                }
              }}
            >
              Edit
            </button>
            <button onClick={() => handleDeleteWorkspace(workspace.id)}>
              Delete
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
        </ul>
      </aside>
      <main className="content">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
