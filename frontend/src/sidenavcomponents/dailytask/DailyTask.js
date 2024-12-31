import React from 'react';
import TaskList from '../../components/tasklist/TaskList';
import "./DailyTask.css";

const DailyTask = () => {
    return (
        <div>
            <h1>Daily Task</h1>
            <TaskList />
        </div>
    );
};

export default DailyTask;