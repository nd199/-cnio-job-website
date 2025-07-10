import axios from 'axios';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const GroqClient = axios.create({
  baseURL: 'https://api.groq.com/openai/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${GROQ_API_KEY}`,
  },
});

export default GroqClient;
