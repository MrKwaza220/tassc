import React from 'react';
import './Workspace.css';
import CreateWorkspaceForm from './components/createworkspaceform/CreateWorkspaceForm';

const Workspace = () => {
    return (
        <div className="workspace">
            <h1>Workspace</h1>
            <p>Welcome to your workspace!</p>

            <CreateWorkspaceForm />
        </div>
        
    );
};

export default Workspace;