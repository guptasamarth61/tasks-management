import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styles from '../css/Dashboard.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [taskStats, setTaskStats] = useState({ total: 0, completed: 0, pending: 0, inprogress: 0 });
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    axios.get('/api/tasks/summary', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => setTaskStats(response.data))
      .catch(error => {
        console.error('Error fetching task stats:', error);
        setError(error.response ? error.response.statusText : error.message);
      });
  }, []);

  const data = {
    labels: ['Total Tasks', 'Completed', 'Pending', 'InProgress'],
    datasets: [{
      label: 'Task Overview',
      data: [taskStats.total, taskStats.completed, taskStats.pending, taskStats.inprogress],
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(255, 99, 132, 0.2)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Task Overview',
        font: {
          size: 18,
        },
      },
    },
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.dashboardHeading}>Dashboard</h1>
      <button className={styles.backButton} onClick={() => router.push('/home')}>Back to Main Page</button>
      {error ? (
        <p className={styles.error}>Error: {error}</p>
      ) : (
        <div className={styles.chartContainer}>
          <Bar data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;