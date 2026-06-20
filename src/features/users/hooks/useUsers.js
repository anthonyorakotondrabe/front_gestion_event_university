import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../api/userService';
import toast from 'react-hot-toast';

/**
 * Hook pour récupérer la liste des utilisateurs.
 */
export const useUsersList = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
  });
};

/**
 * Hook pour la création d'un utilisateur.
 */
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Utilisateur créé avec succès');
    },
    onError: (error) => {
      const detail = error.response?.data?.detail;
      const message = typeof detail === 'string' ? detail : "Erreur lors de la création de l'utilisateur";
      toast.error(message);
    }
  });
};

/**
 * Hook pour la mise à jour d'un utilisateur.
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => userService.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Utilisateur mis à jour avec succès');
    },
    onError: (error) => {
      const detail = error.response?.data?.detail;
      const message = typeof detail === 'string'
        ? detail
        : (Array.isArray(detail) ? detail[0]?.msg : "Erreur lors de la mise à jour");
      toast.error(message);
    }
  });
};

/**
 * Hook pour la suppression d'un utilisateur.
 */
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Utilisateur supprimé avec succès');
    },
    onError: (error) => {
      const message = error.response?.data?.detail || "Erreur lors de la suppression";
      toast.error(message);
    }
  });
};
