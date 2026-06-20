import axiosInstance from '../../../api/axiosInstance';

/**
 * Service pour la gestion des utilisateurs via l'API.
 */
export const userService = {
  /**
   * Récupère la liste de tous les utilisateurs.
   */
  getUsers: async () => {
    const response = await axiosInstance.get('/utilisateurs');
    return response.data;
  },

  /**
   * Crée un nouvel utilisateur via l'endpoint d'inscription.
   * @param {Object} userData - Les données de l'utilisateur (nom, email, password, role, id_filiere).
   */
  createUser: async (userData) => {
    const data = {
      nom: userData.nom,
      email: userData.email,
      password: userData.password || 'Temporary123!',
      role: userData.role,
      id_filiere: userData.id_filiere
    };
    const response = await axiosInstance.post('/auth/register', data);
    return response.data;
  },

  /**
   * Met à jour un utilisateur existant.
   * @param {string} id - L'identifiant de l'utilisateur.
   * @param {Object} userData - Les données à mettre à jour.
   */
  updateUser: async (id, userData) => {
    const data = {
      nom: userData.nom,
      email: userData.email,
      role: userData.role,
      id_filiere: userData.id_filiere
    };
    const response = await axiosInstance.put(`/utilisateurs/${id}`, data);
    return response.data;
  },

  /**
   * Supprime un utilisateur.
   * @param {string} id - L'identifiant de l'utilisateur.
   */
  deleteUser: async (id) => {
    const response = await axiosInstance.delete(`/utilisateurs/${id}`);
    return response.data;
  }
};
