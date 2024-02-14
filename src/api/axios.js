import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_PAGE_URL || 'http://localhost:4000',
  port: import.meta.env.VITE_PORT || 4000,
  withCredentials: true,
});

export default instance;
