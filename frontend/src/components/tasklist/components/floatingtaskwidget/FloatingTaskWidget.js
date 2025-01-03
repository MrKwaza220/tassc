import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import "./FloatingTaskWidget.css";

const FloatingTaskWidget = ({ tasks }) => {
  const today = new Date().toISOString().split("T")[0]; // Get today's date
  const [widgetPosition, setWidgetPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  // Filter tasks that are due today
  const tasksDueToday = tasks.filter(
    (task) => new Date(task.dueDate).toISOString().split("T")[0] === today
  );

  // Load widget position and visibility from localStorage
  useEffect(() => {
    const storedPosition = JSON.parse(localStorage.getItem("widgetPosition"));
    const storedVisibility = JSON.parse(localStorage.getItem("widgetVisibility"));
    if (storedPosition) setWidgetPosition(storedPosition);
    if (storedVisibility !== null) setIsVisible(storedVisibility);
  }, []);

  // Save widget position to localStorage on drag stop
  const handleDragStop = (e, data) => {
    const newPosition = { x: data.x, y: data.y };
    setWidgetPosition(newPosition);
    localStorage.setItem("widgetPosition", JSON.stringify(newPosition));
  };

  // Toggle widget visibility
  const toggleVisibility = () => {
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);
    localStorage.setItem("widgetVisibility", JSON.stringify(newVisibility));
  };

  return (
    <Draggable position={widgetPosition} onStop={handleDragStop}>
      <div className="widget-wrapper">
        {isVisible ? (
          <div className="floating-widget">
            <div className="widget-header">
              <span>Tasks for Today</span>
              <button onClick={toggleVisibility}>X</button>
            </div>
            <div className="widget-content">
              {tasksDueToday.length > 0 ? (
                <ul>
                  {tasksDueToday.map((task) => (
                    <li key={task._id}>
                      <strong>{task.name}</strong>
                      <br />
                      {task.description}
                      <br />
                      Due Time: {task.dueTime || "Not Set"}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No tasks for today!</p>
              )}
            </div>
          </div>
        ) : (
          <button className="widget-toggle" onClick={toggleVisibility}>
            Show Tasks
          </button>
        )}
      </div>
    </Draggable>
  );
};

export default FloatingTaskWidget;
