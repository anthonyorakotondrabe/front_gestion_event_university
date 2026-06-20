import axiosInstance from '../../../api/axiosInstance';

export const inscriptionService = {
  getUserInscriptions: async (userId) => {
    const response = await axiosInstance.get(`/utilisateurs/${userId}/inscriptions`);
    return response.data;
  },
  registerToEvent: async (inscriptionData) => {
    const response = await axiosInstance.post('/inscriptions', inscriptionData);
    return response.data;
  },
  cancelInscription: async (id) => {
    const response = await axiosInstance.delete(`/inscriptions/${id}`);
    return response.data;
  }
};
