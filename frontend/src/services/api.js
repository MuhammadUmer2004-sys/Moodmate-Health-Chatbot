import axios from 'axios';

const api = axios.create({
  // Dynamically points to /api if hosted on Vercel together, or falls back to localhost locally
  baseURL: import.meta.env.VITE_API_URL || (window.location.hostname.includes('vercel.app') ? '/api' : 'http://localhost:5000/api'),
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
