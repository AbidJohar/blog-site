import axios from 'axios';

// Create an Axios instance with base configuration
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Only attach token to headers
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken'); // get token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
