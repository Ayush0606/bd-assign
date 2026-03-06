import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import DarkModeToggle from '../components/DarkModeToggle';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [refreshTasks, setRefreshTasks] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token) {
      navigate('/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleTaskCreated = () => {
    setShowForm(false);
    setRefreshTasks(!refreshTasks);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Task Management Dashboard</h1>
          <div className="user-info">
            <span>
              Welcome, <strong>{user.name}</strong> ({user.role})
            </span>
            <DarkModeToggle />
            <button onClick={handleLogout} className="btn-danger">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-actions">
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
          >
            {showForm ? 'Cancel' : 'Create New Task'}
          </button>
        </div>

        {showForm && <TaskForm onTaskCreated={handleTaskCreated} />}

        <TaskList refresh={refreshTasks} userRole={user.role} />
      </main>
    </div>
  );
};

export default Dashboard;
