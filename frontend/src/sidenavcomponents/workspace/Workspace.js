import React, { useState } from "react";
import CreatedWorkSpace from "./components/createdworkspace/CreatedWorkspace";
import "./Workspace.css";

const Workspace = () => {
//   const [activeView, setActiveView] = useState("inbox");
//   const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
//   const [workspaces, setWorkspaces] = useState([]);
//   const [activeWorkspace, setActiveWorkspace] = useState(null);
  return (
    <div className="workspace-page">
      <div className="workspace">
        <h1>Workspace</h1>
        <p>Welcome to your workspace!</p>
      </div>

      <div className="workspace-container">
        <div className="create-workspace-button">
          <p>Create Workspace</p>
          
        </div>

        <div className="display-assigned-tasks">
          <p>You assigned Tasks</p>
        </div>

        <div className="display-assigned-tasks">
          <p>You assigned Tasks</p>
        </div>
         <div className="workspace-performance">
            Group performance
         </div>
      </div>
    </div>
  );
};

export default Workspace;
