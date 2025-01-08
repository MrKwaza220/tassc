import React, { useState } from "react";
import Inbox from "../../sidenavcomponents/inbox/Inbox";
import DailyTask from "../../sidenavcomponents/dailytask/DailyTask";
import Workspace from "../../sidenavcomponents/workspace/Workspace";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("inbox");
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false); // Toggle state for workspace
  const [workspaces, setWorkspaces] = useState([]); // List of created workspaces
  const [activeWorkspace, setActiveWorkspace] = useState(null); // Currently active workspace

  // Function to toggle workspace section
  const handleWorkspaceToggle = () => {
    setIsWorkspaceOpen(!isWorkspaceOpen);
  };

  // Function to create a new workspace
  const handleCreateWorkspace = () => {
    const workspaceName = prompt("Enter Workspace Name:");
    if (workspaceName) {
      const newWorkspace = { id: Date.now(), name: workspaceName };
      setWorkspaces([...workspaces, newWorkspace]);
      setActiveWorkspace(newWorkspace);
      setActiveView("Workspace");
    }
  };

  // Function to render main content
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
            Inbox
          </li>
          <li className="nav-item" onClick={() => setActiveView("DailyTask")}>
            Daily Task
          </li>
          <li className="nav-item" onClick={handleWorkspaceToggle}>
            Workspace
            <FontAwesomeIcon
              icon={isWorkspaceOpen ? faChevronDown : faChevronRight}
              style={{ marginLeft: "8px", fontSize: "16px" }}
            />
          </li>

          {isWorkspaceOpen && (
            <>
             <ul style={{ marginLeft: "20px" }}>
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
                    style={{ cursor: "pointer" }}
                  >
                    {workspace.name}
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
                onClick={handleCreateWorkspace}
              >
                Create Space
                <FontAwesomeIcon icon={faPlus} style={{ marginLeft: "8px" }} />
              </button>

             
            </>
          )}
        </ul>
      </aside>
      <main className="content">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
