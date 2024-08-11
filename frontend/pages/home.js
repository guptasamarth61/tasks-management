import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../css/Home.module.css';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    axios.get('/api/tasks', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (confirmed){
      axios.delete(`/api/tasks?id=${id}`)
      .then(() => setTasks(tasks.filter(task => task._id !== id)))
      .catch(error => console.error('Error deleting task:', error));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Task Manager</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
      </div>
      <p className={styles.description}>Manage your tasks efficiently and effectively.</p>
      <div className={styles.header}>
        <Link href="/tasks/add" className={styles.addTaskLink}>
          Add New Task
        </Link>
        <Link href="/dashboard" className={styles.dashboardLink}>
          Go to Dashboard
        </Link>
      </div>
      <table className={styles.taskTable}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Title</th>
            <th className={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task._id} className={styles.taskRow}>
              <td className={styles.taskTitle}>{task.title}</td>
              <td className={styles.taskActions}>
                <button onClick={() => handleDelete(task._id)} className={styles.taskButton}>Delete</button>
                <Link href={`/tasks/edit?id=${task._id}`} className={styles.taskLink}>
                  Edit
                </Link>
                <Link href={`/tasks/details?id=${task._id}`} className={styles.taskLink}>
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;