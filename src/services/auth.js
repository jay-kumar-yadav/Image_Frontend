import API from './api';

export const authAPI = {
  login: (email, password) => API.post('/auth/login', { email, password }),
  register: (username, email, password) => API.post('/auth/register', { username, email, password }),
};