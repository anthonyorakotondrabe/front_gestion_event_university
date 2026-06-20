import axiosInstance from '../../../api/axiosInstance';

export const authService = {
  login: async (email, password) => {
    // FastAPI OAuth2PasswordRequestForm expects x-www-form-urlencoded
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);

    const response = await axiosInstance.post('/auth/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },
  register: async (userData) => {
    // userData should be { nom, email, password }
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
