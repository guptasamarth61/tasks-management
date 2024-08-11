import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../css/AddTask.module.css';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending');
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.post('/api/tasks', {title, description, dueDate, status}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => router.push('/home'))
      .catch(error => console.error('Error adding task:', error));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add New Task</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Title of Task: 
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            required
          />
        </label>
        <label className={styles.label}>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.input}
            required
          />
        </label>
        <label className={styles.label}>
          Due Date:
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={styles.input}
            required
          />
        </label>
        <label className={styles.label}>
          Status:
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={styles.input}
            required
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <button type="submit" className={styles.button}>Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;