import React, { useState } from 'react';
import axios from 'axios';

const CreateWorkspaceForm = ({ onCreate }) => {
  const [workspaceName, setWorkspaceName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    const newWorkspace = { name: workspaceName, description };
    
    try {
      const response = await axios.post('http://localhost:5000/api/workspaces', newWorkspace, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onCreate(response.data); // Notify parent to update workspaces list
    } catch (err) {
      console.error('Error creating workspace:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Workspace Name:</label>
      <input 
        type="text" 
        value={workspaceName} 
        onChange={(e) => setWorkspaceName(e.target.value)} 
        required 
      />
      <label>Description:</label>
      <input 
        type="text" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      />
      <button type="submit">Create Workspace</button>
    </form>
  );
};

export default CreateWorkspaceForm;
