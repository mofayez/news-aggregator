import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to attach the token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;