import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  const token = req.headers.authorization;

  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  }

  switch (method) {
    case 'GET':
      if (id) {
        try {
          const response = await axios.get(`${apiUrl}/tasks/${id}`);
          res.status(200).json(response.data);
        } catch (error) {
          console.error('Error fetching task:', error);
          res.status(500).json({ message: 'Error fetching task' });
        }
      } else {
        try {
          const response = await axios.get(`${apiUrl}/tasks`);
          res.status(200).json(response.data);
        } catch (error) {
          console.error('Error fetching tasks:', error);
          res.status(500).json({ message: 'Error fetching tasks' });
        }
      }
      break;
    case 'POST':
      try {
        const response = await axios.post(`${apiUrl}/tasks`, req.body);
        res.status(201).json(response.data);
      } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Error creating task' });
      }
      break;
    case 'PUT':
      if (id) {
        try {
          const response = await axios.put(`${apiUrl}/tasks/${id}`, req.body);
          res.status(200).json(response.data);
        } catch (error) {
          console.error('Error updating task:', error);
          res.status(500).json({ message: 'Error updating task' });
        }
      } else {
        res.status(400).json({ message: 'Task ID is required' });
      }
      break;
    case 'DELETE':
      try {
        await axios.delete(`${apiUrl}/tasks/${id}`);
        res.status(204).end();
      } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Error deleting task' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}