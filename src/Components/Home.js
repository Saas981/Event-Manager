// home.js

import React, { useState } from 'react';
import './Home.css'; // Import the CSS file for styling

const Home = () => {
  const [schedule, setSchedule] = useState([]);
  const [task, setTask] = useState('');

  const addTask = () => {
    if (task.trim() !== '') {
      setSchedule([...schedule, { id: Date.now(), task }]);
      setTask('');
    }
  };

  const removeTask = (taskId) => {
    const updatedSchedule = schedule.filter((item) => item.id !== taskId);
    setSchedule(updatedSchedule);
  };

  return (
    <div className="container">
      <header>
        <h1>Schedule Planner</h1>
      </header>
      <section className="content">
        <div className="schedule-container">
          <h2>Your Schedule</h2>
          <ul>
            {schedule.map((item) => (
              <li key={item.id}>
                {item.task}
                <button onClick={() => removeTask(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="add-task-container">
          <h2>Add Task</h2>
          <input
            type="text"
            placeholder="Enter task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={addTask}>Add Task</button>
        </div>
      </section>
      <footer>
        <p>&copy; {new Date().getFullYear()} Schedule Planner</p>
      </footer>
    </div>
  );
};

export default Home;
