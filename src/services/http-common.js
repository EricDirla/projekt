import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',  // Ensure this is correct
  headers: {
    'Content-type': 'application/json'
  }
});

export default apiClient;