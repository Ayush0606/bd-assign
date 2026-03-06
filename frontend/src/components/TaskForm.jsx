import React, { useState } from 'react';
import { taskAPI } from '../services/api';
import '../styles/TaskForm.css';

const TaskForm = ({ onTaskCreated, taskToEdit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: taskToEdit?.title || '',
    description: taskToEdit?.description || '',
    status: taskToEdit?.status || 'pending',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { title, description, status } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (taskToEdit) {
        await taskAPI.updateTask(taskToEdit._id, formData);
      } else {
        await taskAPI.createTask(formData);
      }
      onTaskCreated();
      setFormData({ title: '', description: '', status: 'pending' });
    } catch (err) {
      setError(
        err.response?.data?.message || 
        err.response?.data?.errors?.[0]?.msg || 
        'Operation failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-form-container">
      <h3>{taskToEdit ? 'Edit Task' : 'Create New Task'}</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={onSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={onChange}
            required
            placeholder="Enter task title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={onChange}
            required
            rows="4"
            placeholder="Enter task description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={status} onChange={onChange}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Saving...' : taskToEdit ? 'Update Task' : 'Create Task'}
          </button>
          {taskToEdit && onCancel && (
            <button type="button" onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
