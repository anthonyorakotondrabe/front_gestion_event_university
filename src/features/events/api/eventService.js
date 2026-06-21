import axiosInstance from '../../../api/axiosInstance';

export const eventService = {
  getEvents: async (params) => {
    const response = await axiosInstance.get('/evenements', { params });
    return response.data;
  },
  getEvent: async (id) => {
    const response = await axiosInstance.get(`/evenements/${id}`);
    return response.data;
  },
  createEvent: async (eventData) => {
    const response = await axiosInstance.post('/evenements', eventData);
    return response.data;
  },
  updateEvent: async (id, eventData) => {
    const response = await axiosInstance.put(`/evenements/${id}`, eventData);
    return response.data;
  },
  deleteEvent: async (id) => {
    const response = await axiosInstance.delete(`/evenements/${id}`);
    return response.data;
  },
  registerToEvent: async (id) => {
    const response = await axiosInstance.post(`/evenements/${id}/inscrire`);
    return response.data;
  }
};
