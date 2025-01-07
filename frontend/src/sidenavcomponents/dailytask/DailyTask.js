import React from 'react';
import TaskList from '../../components/tasklist/TaskList';
import "./DailyTask.css";

const DailyTask = () => {
    return (
      <div className="daily-task">
        <div className="daily-header">
          <h1>Daily Task</h1>
          <p>Plan your day here!</p>
        </div>
        <TaskList />
      </div>
    );
};

export default DailyTask;