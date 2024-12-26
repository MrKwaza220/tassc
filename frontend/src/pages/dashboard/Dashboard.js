import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import SideNavBar from '../../sidenavcomponents/sidenavbar/SideNavBar';
import SideNavHome from '../../sidenavcomponents/sidenavhome/SideNavHome';
import SideDashboard from '../../sidenavcomponents/sidedashboard/SideDashbord';
import Inbox from '../../sidenavcomponents/inbox/Inbox';
import DailyTask from '../../sidenavcomponents/dailytask/DailyTask';
import Workspace from '../../sidenavcomponents/workspace/Workspace';

const Dashboard = () => {
    return (
        <div className="dashboard-page">
            <SideNavBar />
            <div className="dashboard-content">
                <Routes>
                    <Route path="/" element={<SideNavHome />} /> {/* Default route */}
                    <Route path="sidenavhome" element={<SideNavHome />} />
                    <Route path="inbox" element={<Inbox />} />
                    <Route path="dailytask" element={<DailyTask />} />
                    <Route path="sidedashboard" element={<SideDashboard />} />
                    <Route path="workspace" element={<Workspace />} />
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;