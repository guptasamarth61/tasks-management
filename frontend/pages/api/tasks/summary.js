import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function handler(req, res) {
  const token = req.headers.authorization;

  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  }

  try {
    const response = await axios.get(`${apiUrl}/tasks/summary`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching task summary:', error);
    res.status(500).json({ message: 'Error fetching task summary' });
  }
}