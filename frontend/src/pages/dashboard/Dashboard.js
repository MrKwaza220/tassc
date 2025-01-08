import React, { useState } from "react";
import Inbox from "../../sidenavcomponents/inbox/Inbox";
import DailyTask from "../../sidenavcomponents/dailytask/DailyTask";
import Workspace from "../../sidenavcomponents/workspace/Workspace";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("inbox");
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(true); // Toggle state for workspace

  const renderContent = () => {
    switch (activeView) {
      case "inbox":
        return <Inbox />;
      case "DailyTask":
        return <DailyTask />;
      case "Workspace":
        return isWorkspaceOpen ? <Workspace /> : <Workspace />;
      default:
        return <Inbox />;
    }
  };

  const handleWorkspaceToggle = () => {
    // Toggle the workspace section
    setIsWorkspaceOpen(!isWorkspaceOpen);
    setActiveView("Workspace");
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
              style={{ marginLeft: "8px" , fontSize: "16px"}}
            />
          </li>

          {isWorkspaceOpen && (
          <button
          style={{
            marginLeft: "40px",
            marginBottom: "10px",
            padding: "10px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => alert("Open Workspace Modal")}
          title="Create a new workspace" 
        >
          Create Space
          <FontAwesomeIcon icon={faPlus} style={{ fontSize: "16px" }} />
        </button>
        
        )}
        </ul>
      </aside>
      <main className="content">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
