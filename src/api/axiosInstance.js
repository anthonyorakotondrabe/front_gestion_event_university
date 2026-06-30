import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api-gestion-v-nement.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Intercepteur de requête pour attacher le jeton d'authentification aux requêtes sortantes.
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Intercepteur de réponse pour gérer les erreurs globales (ex: 401 Non autorisé).
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Logique pour gérer les sessions expirées ou l'accès non autorisé
      localStorage.removeItem('token');
      // Optionnel : window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
