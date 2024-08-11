import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../css/AddTask.module.css';

const EditTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    if (id) {
      axios.get(`/api/tasks?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setDueDate(response.data.dueDate);
          setStatus(response.data.status);
        })
        .catch(error => console.error('Error fetching task:', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/tasks?id=${id}`, { title, description, dueDate, status })
      .then(() => router.push('/home'))
      .catch(error => console.error('Error updating task:', error));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit Task</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Title:
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
        <button type="submit" className={styles.button}>Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;