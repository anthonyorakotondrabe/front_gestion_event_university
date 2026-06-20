import axiosInstance from '../../../api/axiosInstance';

export const catalogService = {
  getFilieres: async () => {
    const response = await axiosInstance.get('/filieres');
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
