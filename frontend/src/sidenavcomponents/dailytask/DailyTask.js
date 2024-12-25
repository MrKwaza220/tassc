import React from 'react';
import TaskList from '../../components/tasklist/TaskList';
import "./DailyTask.css";

const DailyTask = () => {
    return (
        <div>
            <h1>Daily Task</h1>
            <ul>
                <li>Task 1</li>
                <li>Task 2</li>
                <li>Task 3</li>
                <li>Set Timer</li>

            </ul>
            <TaskList />
        </div>
    );
};

export default DailyTask;