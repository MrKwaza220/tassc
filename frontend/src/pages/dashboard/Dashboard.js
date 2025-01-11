import React, { useState } from "react";
import Inbox from "../../sidenavcomponents/inbox/Inbox";
import DailyTask from "../../sidenavcomponents/dailytask/DailyTask";
import Workspace from "../../sidenavcomponents/workspace/Workspace";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import CreateWorkSpaceForm from "../../sidenavcomponents/workspace/components/createworkspaceform/CreateWorkSpaceForm";
import "./Dashboard.css";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("inbox");
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [activeWorkspace, setActiveWorkspace] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWorkspaceToggle = () => {
    setIsWorkspaceOpen(!isWorkspaceOpen);
  };

  const handleCreateWorkspace = (workspace) => {
    const newWorkspace = { id: Date.now(), ...workspace };
    setWorkspaces([...workspaces, newWorkspace]);
    setActiveWorkspace(newWorkspace);
    setActiveView("Workspace");
    setIsModalOpen(false); // Close the modal after creation
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
            Inbox
          </li>
          <li className="nav-item" onClick={() => setActiveView("DailyTask")}>
            Daily Task
          </li>
          <li className="nav-item" onClick={handleWorkspaceToggle}>
            Workspace
            <FontAwesomeIcon
              icon={isWorkspaceOpen ? faChevronDown : faChevronRight}
              style={{ marginLeft: "8px", fontSize: "12px" }}
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
                onClick={() => setIsModalOpen(true)}
              >
                Create Space
                <FontAwesomeIcon icon={faPlus} style={{ marginLeft: "8px" }} />
              </button>

              {/* Modal for Creating Workspace */}
              <CreateWorkSpaceForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateWorkspace}
              />
            </>
          )}
        </ul>
      </aside>
      <main className="content">
        {/* Render content dynamically */}
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
