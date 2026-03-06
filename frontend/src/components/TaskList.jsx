import React, { useState, useEffect } from 'react';
import { taskAPI } from '../services/api';
import TaskForm from './TaskForm';
import '../styles/TaskList.css';

const TaskList = ({ refresh, userRole }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [refresh]);

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await taskAPI.getTasks();
      setTasks(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await taskAPI.deleteTask(id);
      setMessage('Task deleted successfully');
      setTimeout(() => setMessage(''), 3000);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleTaskUpdated = () => {
    setEditingTask(null);
    setMessage('Task updated successfully');
    setTimeout(() => setMessage(''), 3000);
    fetchTasks();
  };

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  if (editingTask) {
    return (
      <TaskForm
        taskToEdit={editingTask}
        onTaskCreated={handleTaskUpdated}
        onCancel={() => setEditingTask(null)}
      />
    );
  }

  return (
    <div className="task-list-container">
      <h3>Your Tasks</h3>
      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}

      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks found. Create your first task!</p>
      ) : (
        <div className="tasks-grid">
          {tasks.map((task) => (
            <div key={task._id} className="task-card">
              <div className="task-header">
                <h4>{task.title}</h4>
                <span className={`status-badge ${task.status}`}>
                  {task.status}
                </span>
              </div>
              <p className="task-description">{task.description}</p>
              <div className="task-meta">
                <small>
                  Created: {new Date(task.createdAt).toLocaleDateString()}
                </small>
              </div>
              <div className="task-actions">
                <button
                  onClick={() => handleEdit(task)}
                  className="btn-edit"
                >
                  Edit
                </button>
                {userRole === 'admin' && (
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
