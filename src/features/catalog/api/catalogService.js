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
  createCategory: async (data) => {
    const response = await axiosInstance.post('/categories', data);
    return response.data;
  },
  updateCategory: async (id, data) => {
    const response = await axiosInstance.put(`/categories/${id}`, data);
    return response.data;
  },
  deleteCategory: async (id) => {
    const response = await axiosInstance.delete(`/categories/${id}`);
    return response.data;
  },
  getLieux: async () => {
    const response = await axiosInstance.get('/lieux');
    return response.data;
  },
  createLieu: async (data) => {
    const response = await axiosInstance.post('/lieux', data);
    return response.data;
  },
  updateLieu: async (id, data) => {
    const response = await axiosInstance.put(`/lieux/${id}`, data);
    return response.data;
  },
  deleteLieu: async (id) => {
    const response = await axiosInstance.delete(`/lieux/${id}`);
    return response.data;
  }
};
