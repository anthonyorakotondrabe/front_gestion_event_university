import axiosInstance from '../../../api/axiosInstance';

export const inscriptionService = {
  getUserInscriptions: async (userId) => {
    const response = await axiosInstance.get(`/utilisateurs/${userId}/inscriptions`);
    return response.data;
  },
  getMyInscriptions: async () => {
    const response = await axiosInstance.get('/utilisateurs/me/inscriptions');
    return response.data;
  },
  registerToEvent: async (inscriptionData) => {
    const response = await axiosInstance.post('/inscriptions', inscriptionData);
    return response.data;
  },
  cancelInscription: async (id) => {
    const response = await axiosInstance.delete(`/inscriptions/${id}`);
    return response.data;
  },
  getAllInscriptions: async () => {
    const response = await axiosInstance.get('/inscriptions');
    return response.data;
  },
  updateInscriptionStatus: async (id, status) => {
    const response = await axiosInstance.put(`/inscriptions/${id}`, { statut_inscription: status });
    return response.data;
  },
  getEventInscriptions: async (eventId) => {
    const response = await axiosInstance.get(`/evenements/${eventId}/inscriptions`);
    return response.data;
  }
};
