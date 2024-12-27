import React, {useState} from 'react';
import Inbox from '../../sidenavcomponents/inbox/Inbox';
import DailyTask from '../../sidenavcomponents/dailytask/DailyTask';
import Workspace from '../../sidenavcomponents/workspace/Workspace';
import './Dashboard.css';

const Dashboard = () => {
    const [activeView, setActiveView] = React.useState('inbox');

    const renderContent = () => {
        switch (activeView){
            case 'inbox':
                return <Inbox />;
            case 'DailyTask':
                return <DailyTask />;
            case 'Workspace':
                return <Workspace />;
            default:
                return <Inbox />;
        }
    }
    return (
        <div className="dashboard-container">
        <aside className="sidebar">
            <h2 className="sidebar-title">Dashboard</h2>
            <ul className="nav-list">
                <li className="nav-item" onClick={() => setActiveView('inbox')} >Inbox</li>
                <li className="nav-item" onClick={() => setActiveView('DailyTask')}>Daily Task</li>
                <li className="nav-item" onClick={() =>setActiveView('Workspace') }>Workspace</li>
            </ul>
        </aside>
        <main className="content">
            {renderContent()}
        </main>
    </div>
    );
};

export default Dashboard;