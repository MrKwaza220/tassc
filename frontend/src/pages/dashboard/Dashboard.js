import React, { useState } from "react";
import Inbox from "../../sidenavcomponents/inbox/Inbox";
import DailyTask from "../../sidenavcomponents/dailytask/DailyTask";
import Workspace from "../../sidenavcomponents/workspace/Workspace";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
  faInbox,
  faListCheck,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";
import CreatedWorkSpace from "../../sidenavcomponents/workspace/components/createdworkspace/CreatedWorkspace";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("inbox");
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [activeWorkspace, setActiveWorkspace] = useState(null);

  const handleWorkspaceToggle = () => {
    setIsWorkspaceOpen(!isWorkspaceOpen);
    setActiveView("Workspace");
  };

  const renderContent = () => {
    switch (activeView) {
      case "inbox":
        return <Inbox />;
      case "DailyTask":
        return <DailyTask />;
      case "Workspace":
        return <Workspace />;
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
            <FontAwesomeIcon icon={faListCheck} style={{ marginRight: "10px" }} />
            Daily Tasks
          </li>
          <li className="nav-item" onClick={handleWorkspaceToggle}>
            <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: "10px" }} />
            Workspace
            <FontAwesomeIcon
              icon={isWorkspaceOpen ? faChevronDown : faChevronRight}
              style={{ marginLeft: "40px", fontSize: "12px" }}
            />
          </li>
        </ul>

        {/* CreatedWorkSpace handles workspaces and folders */}
        <CreatedWorkSpace
          isWorkspaceOpen={isWorkspaceOpen}
          workspaces={workspaces}
          setWorkspaces={setWorkspaces}
          setActiveWorkspace={setActiveWorkspace}
          setActiveView={setActiveView}
        />
      </aside>

      <main className="content">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
