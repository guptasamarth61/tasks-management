import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function handler(req, res) {
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, req.body);
    res.status(200).json({ token: response.data.access_token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}