import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  verify: () => api.get('/auth/verify')
};

// Members API
export const membersAPI = {
  getAll: () => api.get('/members'),
  getOne: (id) => api.get(`/members/${id}`),
  create: (data) => api.post('/members', { member: data }),
  update: (id, data) => api.put(`/members/${id}`, { member: data }),
  delete: (id) => api.delete(`/members/${id}`)
};

// Payments API
export const paymentsAPI = {
  getAll: () => api.get('/payments'),
  getOne: (id) => api.get(`/payments/${id}`),
  create: (data) => api.post('/payments', { payment: data }),
  update: (id, data) => api.put(`/payments/${id}`, { payment: data }),
  delete: (id) => api.delete(`/payments/${id}`)
};

// Schedules API
export const schedulesAPI = {
  getAll: () => api.get('/schedules'),
  getOne: (id) => api.get(`/schedules/${id}`),
  create: (data) => api.post('/schedules', { schedule: data }),
  update: (id, data) => api.put(`/schedules/${id}`, { schedule: data }),
  delete: (id) => api.delete(`/schedules/${id}`)
};

export default api;
