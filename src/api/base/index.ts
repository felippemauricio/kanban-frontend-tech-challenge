import axios from 'axios';

import { VITE_API_URL } from '../../config';

const axiosClient = axios.create({
  baseURL: VITE_API_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default axiosClient;
