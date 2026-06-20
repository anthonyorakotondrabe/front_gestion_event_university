import axiosInstance from '../../../api/axiosInstance';

export const authService = {
  login: async (email, password) => {
    const response = await axiosInstance.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  },
  getMe: async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },
  updateProfile: async (id, data) => {
    const response = await axiosInstance.put(`/utilisateurs/${id}`, data);
    return response.data;
  }
};
