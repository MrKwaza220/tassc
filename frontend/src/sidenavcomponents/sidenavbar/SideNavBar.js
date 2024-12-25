import React from 'react';
import { Link } from 'react-router-dom';
import './SideNavBar.css'; 

const SideNavBar = () => {
    return (
        <div className="sidebar">
            <nav className="nav">
                <ul>
                    <li><Link to="/SideNavHome">SideNavHome</Link></li>
                    <li><Link to="/inbox">Inbox</Link></li>
                    <li><Link to="/dailytask">Daily Task</Link></li>
                    <li><Link to="/sidedashboard">Dashboard</Link></li>
                    <li><Link to="/dashboard/workspace">Workspace</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default SideNavBar;


