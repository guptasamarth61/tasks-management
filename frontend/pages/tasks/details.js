import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../css/ViewDetails.module.css';

const TaskDetail = () => {
  const [task, setTask] = useState({});
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
        .then(response => setTask(response.data))
        .catch(error => console.error('Error fetching task details:', error));
    }
  }, [id]);

  return (
    <div className={styles.taskDetailContainer}>
      <h1 className={styles.taskDetailHeading}>Task Details</h1>
      <div className={styles.taskDetailContent}>
        <p className={styles.taskDetailItem}><strong>Title:</strong> {task.title}</p>
        <p className={styles.taskDetailItem}><strong>Description:</strong> {task.description}</p>
        <p className={styles.taskDetailItem}><strong>Due Date:</strong> {task.dueDate}</p>
        <p className={styles.taskDetailItem}><strong>Status:</strong> {task.status}</p>
      </div>
    </div>
  );
};

export default TaskDetail;