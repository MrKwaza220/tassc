import React, { useState } from 'react';
import axios from 'axios';

const InviteMemberForm = ({ workspaceId }) => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('Member');  // Default role
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem('token');
      
      const memberData = { email, workspaceId, role };
      
      try {
        const response = await axios.post('http://localhost:5000/api/workspaces/invite', memberData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Member invited successfully:', response.data);
      } catch (err) {
        console.error('Error inviting member:', err);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>Email Address:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <label>Role:</label>
        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Member">Member</option>
          <option value="Admin">Admin</option>
          <option value="Owner">Owner</option>
        </select>
        <button type="submit">Invite</button>
      </form>
    );
  };

  export default InviteMemberForm;
