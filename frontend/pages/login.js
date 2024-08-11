import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';
import styles from '../css/Login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/tasks/login', { username, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        router.push('/home');
      } 
    } catch (error) {
      console.error('Error during login:', error);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Task Management System</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>Login</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;