// WorkspaceForm.js
import React, { useState } from "react";

const WorkspaceForm = ({ onSubmit }) => {
  const [workspaceName, setWorkspaceName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (workspaceName.trim()) {
      onSubmit(workspaceName);
      setWorkspaceName("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Workspace</h2>
      <div>
        <label htmlFor="workspaceName">Workspace Name:</label>
        <input
          type="text"
          id="workspaceName"
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default WorkspaceForm;
