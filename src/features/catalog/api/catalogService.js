import axiosInstance from '../../../api/axiosInstance';

export const catalogService = {
  getFilieres: async () => {
    const response = await axiosInstance.get('/filieres');
    return response.data;
  },
  createFiliere: async (data) => {
    const response = await axiosInstance.post('/filieres', data);
    return response.data;
  },
  updateFiliere: async (id, data) => {
    const response = await axiosInstance.put(`/filieres/${id}`, data);
    return response.data;
  },
  deleteFiliere: async (id) => {
    const response = await axiosInstance.delete(`/filieres/${id}`);
    return response.data;
  },
  getCategories: async () => {
    const response = await axiosInstance.get('/categories');
    return response.data;
  },
  getLieux: async () => {
    const response = await axiosInstance.get('/lieux');
    return response.data;
  }
};
