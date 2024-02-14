import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:4000',

  withCredentials: true,
});

export default instance;
